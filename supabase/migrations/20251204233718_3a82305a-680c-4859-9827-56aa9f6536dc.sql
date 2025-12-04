-- Enable RLS on checkout_sessions table
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owner as well (extra security)
ALTER TABLE public.checkout_sessions FORCE ROW LEVEL SECURITY;