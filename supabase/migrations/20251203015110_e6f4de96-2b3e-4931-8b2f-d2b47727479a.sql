-- Table to track checkout sessions and purchases for email automation
CREATE TABLE public.checkout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id TEXT NOT NULL UNIQUE,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, abandoned
  amount_total INTEGER,
  currency TEXT DEFAULT 'usd',
  product_name TEXT DEFAULT 'Starter Kit Giro180',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  -- Email tracking for abandoned cart sequence
  abandoned_email_1_sent BOOLEAN DEFAULT false,
  abandoned_email_1_sent_at TIMESTAMP WITH TIME ZONE,
  abandoned_email_2_sent BOOLEAN DEFAULT false,
  abandoned_email_2_sent_at TIMESTAMP WITH TIME ZONE,
  abandoned_email_3_sent BOOLEAN DEFAULT false,
  abandoned_email_3_sent_at TIMESTAMP WITH TIME ZONE,
  -- Email tracking for post-purchase sequence
  post_purchase_day3_sent BOOLEAN DEFAULT false,
  post_purchase_day3_sent_at TIMESTAMP WITH TIME ZONE,
  post_purchase_day7_sent BOOLEAN DEFAULT false,
  post_purchase_day7_sent_at TIMESTAMP WITH TIME ZONE,
  post_purchase_day14_sent BOOLEAN DEFAULT false,
  post_purchase_day14_sent_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow edge functions to manage checkout sessions (using service role)
-- No public access needed, all operations happen server-side

-- Index for faster queries on status and email flags
CREATE INDEX idx_checkout_sessions_status ON public.checkout_sessions(status);
CREATE INDEX idx_checkout_sessions_created_at ON public.checkout_sessions(created_at);
CREATE INDEX idx_checkout_sessions_completed_at ON public.checkout_sessions(completed_at);

-- Enable pg_cron and pg_net extensions for scheduled email jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;