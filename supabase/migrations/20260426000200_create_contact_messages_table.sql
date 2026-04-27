-- Chatbot email captures / lightweight contact intake
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_email
  ON public.contact_messages (email);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_messages'
      AND policyname = 'Allow anonymous contact inserts'
  ) THEN
    CREATE POLICY "Allow anonymous contact inserts"
      ON public.contact_messages
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END$$;
