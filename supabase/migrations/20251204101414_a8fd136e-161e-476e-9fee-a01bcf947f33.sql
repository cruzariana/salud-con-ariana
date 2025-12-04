-- Add columns for welcome email series tracking
ALTER TABLE public.checkout_sessions
ADD COLUMN IF NOT EXISTS welcome_day1_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS welcome_day1_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS welcome_day2_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS welcome_day2_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS welcome_day3_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS welcome_day3_sent_at TIMESTAMP WITH TIME ZONE;