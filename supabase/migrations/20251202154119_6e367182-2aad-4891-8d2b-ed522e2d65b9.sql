-- Create storage bucket for digital products
INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-products', 'digital-products', false)
ON CONFLICT (id) DO NOTHING;

-- Allow edge functions to read from this bucket (service role access)
CREATE POLICY "Service role can read digital products"
ON storage.objects
FOR SELECT
USING (bucket_id = 'digital-products');