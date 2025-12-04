-- Remove any existing SELECT policies on leads table (there are none currently)
-- The table already has RLS enabled and an INSERT policy

-- Create a policy that prevents public SELECT (no one can read leads except via service role)
-- Since there's no authentication in this app, we restrict all SELECT access
-- The leads can only be accessed via the Supabase dashboard or service role key

-- Note: The INSERT policy already exists and allows anyone to insert
-- We just need to ensure no SELECT/UPDATE/DELETE policies exist for public access
-- RLS is already enabled, so by default SELECT/UPDATE/DELETE are blocked

-- Verify RLS is enabled (it should be)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner as well (extra security)
ALTER TABLE public.leads FORCE ROW LEVEL SECURITY;