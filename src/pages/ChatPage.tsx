
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('conversations')
          .select('id, title, created_at')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.warn("Error fetching conversations:", error);
          // Don't throw error here - just set conversations to empty array
          setConversations([]);
        } else {
          setConversations(data || []);
          
          // Set active conversation to the most recent one if available
          if (data && data.length > 0 && !activeConversation) {
            setActiveConversation(data[0].id);
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching conversations:', error);
        setError('会話履歴の読み込み中にエラーが発生しました。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [activeConversation]);

  const handleNewConversation = () => {
    setActiveConversation(null);
  };

  const handleConversationSelect = (conversationId: string) => {
    setActiveConversation(conversationId);
  };

  const handleConversationCreated = (conversationId: string) => {
    setActiveConversation(conversationId);
    // Refresh the conversation list 
    setIsLoading(true);
    
    // Fix: Use a proper async/await pattern with try/catch for error handling
    const refreshConversations = async () => {
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('id, title, created_at')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        if (data) setConversations(data);
      } catch (error) {
        console.error('Error refreshing conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    refreshConversations();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* パディングを増やして、ヘッダーと十分な間隔を確保 (pt-20) */}
      <main className="flex-1 flex flex-col md:flex-row pt-20">
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
