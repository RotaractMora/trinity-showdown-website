-- Make user_id nullable to allow anonymous registrations
ALTER TABLE public.team_registrations 
ALTER COLUMN user_id DROP NOT NULL;

-- Drop the existing authenticated user insert policy
DROP POLICY IF EXISTS "Authenticated users can insert their own teams" ON public.team_registrations;

-- Create new policy to allow anyone to register teams
CREATE POLICY "Anyone can register a team"
ON public.team_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);