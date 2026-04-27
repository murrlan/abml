-- Contact form leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Useful for sorting/recent reads and dedup investigations.
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- This app inserts with the anon key from a server route.
-- Policy allows insert only; reads remain blocked to anon users.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'leads'
      AND policyname = 'Allow anonymous lead inserts'
  ) THEN
    CREATE POLICY "Allow anonymous lead inserts"
      ON public.leads
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END$$;
