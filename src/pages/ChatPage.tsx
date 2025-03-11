
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ChatInterface from '@/components/ChatInterface';
import ChatSidebar from '@/components/ChatSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

const ChatPage = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('conversations')
          .select('id, title, created_at')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setConversations(data || []);
        
        // Set active conversation to the most recent one if available
        if (data && data.length > 0 && !activeConversation) {
          setActiveConversation(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
        toast({
          title: 'エラーが発生しました',
          description: 'チャット履歴の読み込みに失敗しました。',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [activeConversation, toast]);

  const handleNewConversation = () => {
    setActiveConversation(null);
  };

  const handleConversationSelect = (conversationId: string) => {
    setActiveConversation(conversationId);
  };

  const handleConversationCreated = (conversationId: string) => {
    setActiveConversation(conversationId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex">
        <ChatSidebar 
          conversations={conversations}
          activeConversation={activeConversation}
          onNewConversation={handleNewConversation}
          onConversationSelect={handleConversationSelect}
          isLoading={isLoading}
        />
        
        <ChatInterface 
          conversationId={activeConversation}
          onConversationCreated={handleConversationCreated}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
