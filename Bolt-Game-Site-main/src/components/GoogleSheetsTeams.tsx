import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Team {
  team_name: string;
  game: string;
}

interface GoogleSheetsTeamsProps {
  onTeamsLoaded: (teams: Team[]) => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

const GoogleSheetsTeams = ({ onTeamsLoaded, isLoading, onLoadingChange }: GoogleSheetsTeamsProps) => {
  const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/1-B-aAjXju41h_iWpX314DVrcLostS0WhwawD5J25uus/gviz/tq?tqx=out:json";

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        onLoadingChange(true);
        const response = await fetch(GOOGLE_SHEETS_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch data from Google Sheets");
        }

        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));

        const teams: Team[] = [];
        if (json.table && json.table.rows) {
          json.table.rows.forEach((row: any) => {
            if (row.c && row.c[0] && row.c[1]) {
              teams.push({
                team_name: row.c[0].v || "",
                game: row.c[1].v || ""
              });
            }
          });
        }

        onTeamsLoaded(teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast.error("Failed to load team data. Please try again later.");
        onTeamsLoaded([]);
      } finally {
        onLoadingChange(false);
      }
    };

    fetchTeams();

    const interval = setInterval(fetchTeams, 30000);
    return () => clearInterval(interval);
  }, [onTeamsLoaded, onLoadingChange, GOOGLE_SHEETS_URL]);

  return null;
};

export default GoogleSheetsTeams;
