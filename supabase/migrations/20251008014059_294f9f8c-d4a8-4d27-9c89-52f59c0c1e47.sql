-- Drop the overly permissive SELECT policy that exposes all lead data
DROP POLICY IF EXISTS "Authenticated users can view all leads" ON public.leads;

-- Leads should only be accessible through the backend
-- No SELECT policies means only service role can read the data
-- This protects client personal information (emails, phone numbers, messages)