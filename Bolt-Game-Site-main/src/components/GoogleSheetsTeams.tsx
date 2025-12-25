import { useEffect } from "react";
import { toast } from "sonner";

interface Team {
  team_name: string;
  game: string;
  logo_url?: string;
}

interface GoogleSheetsTeamsProps {
  onTeamsLoaded: (teams: Team[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

type SheetsCell = { v?: string } | null;
type SheetsRow = { c?: SheetsCell[] };
type SheetsResponse = { table?: { rows?: SheetsRow[] } };

const GoogleSheetsTeams = ({ onTeamsLoaded, onLoadingChange }: GoogleSheetsTeamsProps) => {
  const GOOGLE_SHEETS_URL =
    "https://docs.google.com/spreadsheets/d/1-B-aAjXju41h_iWpX314DVrcLostS0WhwawD5J25uus/gviz/tq?tqx=out:json";

  useEffect(() => {
    const extractDriveFileId = (pathname: string): string => {
      const parts = pathname.split("/").filter(Boolean);
      // supported:
      // - /file/d/<id>/view
      // - /open (with ?id=)
      // - /uc (with ?id=)
      // - /d/<id>/...
      const fileIndex = parts.indexOf("file");
      if (fileIndex >= 0 && parts[fileIndex + 1] === "d" && parts[fileIndex + 2]) {
        return parts[fileIndex + 2];
      }
      const dIndex = parts.indexOf("d");
      if (dIndex >= 0 && parts[dIndex + 1]) {
        return parts[dIndex + 1];
      }
      return "";
    };

    const toDisplayableLogo = (raw?: string): string | undefined => {
      if (!raw) return undefined;

      // If the sheet stores images via =IMAGE("url"), the raw value could include quotes.
      const cleaned = raw.trim().replace(/^"|"$/g, "");

      try {
        const url = new URL(cleaned);
        const host = url.hostname;

        // Google Drive share links need conversion to a direct image URL
        if (host.includes("drive.google.com")) {
          const id = url.searchParams.get("id") || extractDriveFileId(url.pathname);
          if (id) {
            // This format is generally the most reliable for rendering inside <img>
            return `https://drive.google.com/thumbnail?id=${id}&sz=w512`;
          }
        }

        return cleaned;
      } catch {
        return cleaned;
      }
    };

    const fetchTeams = async () => {
      try {
        onLoadingChange(true);
        const response = await fetch(GOOGLE_SHEETS_URL);
        if (!response.ok) {
          toast.error("Failed to fetch team data from Google Sheets.");
          onTeamsLoaded([]);
          return;
        }

        const data = await response.text();
        const parsed: unknown = JSON.parse(data.substring(47).slice(0, -2));
        const json = parsed as SheetsResponse;

        const teams: Team[] = [];
        const rows = json.table?.rows ?? [];

        rows.forEach((row) => {
          const nameCell = row.c?.[0];
          const gameCell = row.c?.[1];
          const logoCell = row.c?.[2];

          if (nameCell?.v && gameCell?.v) {
            teams.push({
              team_name: nameCell.v,
              game: gameCell.v,
              logo_url: toDisplayableLogo(logoCell?.v),
            });
          }
        });

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
