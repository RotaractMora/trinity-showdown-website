-- Create a public view that excludes PII (captain_email and captain_phone)
CREATE VIEW public.public_teams AS
SELECT 
  id, 
  team_name, 
  game, 
  captain_name, 
  captain_game_id, 
  player_2_name, 
  player_2_game_id, 
  player_3_name, 
  player_3_game_id,
  player_4_name, 
  player_4_game_id, 
  player_5_name, 
  player_5_game_id,
  substitute_name, 
  substitute_game_id, 
  status, 
  created_at
FROM team_registrations
WHERE status = 'approved';