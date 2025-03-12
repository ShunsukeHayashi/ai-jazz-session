-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT 'New Conversation',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create documents table for embeddings
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding VECTOR(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policy for conversations
CREATE POLICY "Users can view their own conversations"
    ON public.conversations
    FOR SELECT
    USING (user_id = auth.uid() OR user_id = 'anonymous-user');

CREATE POLICY "Users can insert their own conversations"
    ON public.conversations
    FOR INSERT
    WITH CHECK (user_id = auth.uid() OR user_id = 'anonymous-user');

CREATE POLICY "Users can update their own conversations"
    ON public.conversations
    FOR UPDATE
    USING (user_id = auth.uid() OR user_id = 'anonymous-user');

CREATE POLICY "Users can delete their own conversations"
    ON public.conversations
    FOR DELETE
    USING (user_id = auth.uid() OR user_id = 'anonymous-user');

-- Create policy for messages
CREATE POLICY "Users can view messages in their conversations"
    ON public.messages
    FOR SELECT
    USING (conversation_id IN (
        SELECT id FROM public.conversations
        WHERE user_id = auth.uid() OR user_id = 'anonymous-user'
    ));

CREATE POLICY "Users can insert messages in their conversations"
    ON public.messages
    FOR INSERT
    WITH CHECK (conversation_id IN (
        SELECT id FROM public.conversations
        WHERE user_id = auth.uid() OR user_id = 'anonymous-user'
    ));

CREATE POLICY "Users can update messages in their conversations"
    ON public.messages
    FOR UPDATE
    USING (conversation_id IN (
        SELECT id FROM public.conversations
        WHERE user_id = auth.uid() OR user_id = 'anonymous-user'
    ));

CREATE POLICY "Users can delete messages in their conversations"
    ON public.messages
    FOR DELETE
    USING (conversation_id IN (
        SELECT id FROM public.conversations
        WHERE user_id = auth.uid() OR user_id = 'anonymous-user'
    ));

-- Create policy for documents (public read, admin write)
CREATE POLICY "Anyone can view documents"
    ON public.documents
    FOR SELECT
    USING (true);

-- Create function for similarity search
CREATE OR REPLACE FUNCTION match_documents(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    match_count INT
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    metadata JSONB,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        documents.id,
        documents.content,
        documents.metadata,
        1 - (documents.embedding <=> query_embedding) AS similarity
    FROM documents
    WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
END;
$$;

-- Create index for faster similarity search
CREATE INDEX ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
