-- Create team_registrations table
CREATE TABLE public.team_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  team_name TEXT NOT NULL,
  game TEXT NOT NULL CHECK (game IN ('PUBG MOBILE', 'COD MOBILE', 'MOBILE LEGENDS')),
  captain_name TEXT NOT NULL,
  captain_email TEXT NOT NULL,
  captain_phone TEXT NOT NULL,
  captain_game_id TEXT NOT NULL,
  player_2_name TEXT NOT NULL,
  player_2_game_id TEXT NOT NULL,
  player_3_name TEXT NOT NULL,
  player_3_game_id TEXT NOT NULL,
  player_4_name TEXT NOT NULL,
  player_4_game_id TEXT NOT NULL,
  player_5_name TEXT,
  player_5_game_id TEXT,
  substitute_name TEXT,
  substitute_game_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.team_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view approved teams"
ON public.team_registrations
FOR SELECT
USING (status = 'approved');

CREATE POLICY "Authenticated users can insert their own teams"
ON public.team_registrations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own teams"
ON public.team_registrations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_team_registrations_updated_at
BEFORE UPDATE ON public.team_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();