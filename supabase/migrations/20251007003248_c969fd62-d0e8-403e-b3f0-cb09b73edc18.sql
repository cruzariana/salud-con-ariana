-- Create leads table to capture all contact form interactions
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  source TEXT, -- where the user came from (referrer)
  submitted BOOLEAN DEFAULT FALSE, -- true if they clicked submit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (we want to capture all leads, even anonymous)
CREATE POLICY "Anyone can insert leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users can view leads (for future admin panel)
CREATE POLICY "Authenticated users can view all leads" 
  ON public.leads 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_submitted ON public.leads(submitted);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_leads_timestamp
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_leads_updated_at();