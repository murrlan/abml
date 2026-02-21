-- Chatbot conversations: stores each exchange for history/analytics
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid NOT NULL,
  user_message text NOT NULL,
  bot_message text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_conversation_id
  ON chatbot_conversations (conversation_id);

ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert chatbot conversations"
  ON chatbot_conversations FOR INSERT
  WITH CHECK (true);
