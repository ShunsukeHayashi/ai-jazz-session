
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ChatInterface from '@/components/ChatInterface';
import ChatSidebar from '@/components/ChatSidebar';
import JazzSessionService from '@/components/JazzSessionService';
import ServiceDashboard from '@/components/ServiceDashboard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BarChart3, Settings } from 'lucide-react';

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

  const handleConversationCreated = async (conversationId: string) => {
    setActiveConversation(conversationId);
    // Refresh the conversation list
    setIsLoading(true);
    
    try {
      // Fix: Using async/await pattern properly
      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });
          
      if (error) throw error;
      if (data) setConversations(data);
    } catch (error) {
      console.error('Error refreshing conversations:', error);
      toast({
        title: "エラー",
        description: "会話リストの更新に失敗しました",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* パディングを増やして、ヘッダーと十分な間隔を確保 (pt-20) */}
      <main className="flex-1 flex flex-col pt-20">
        <div className="container mx-auto px-4 mb-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                チャット
              </TabsTrigger>
              <TabsTrigger value="service">
                <Settings className="h-4 w-4 mr-2" />
                サービス管理
              </TabsTrigger>
              <TabsTrigger value="dashboard">
                <BarChart3 className="h-4 w-4 mr-2" />
                ダッシュボード
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-6">
              <div className="flex flex-col md:flex-row">
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
              </div>
            </TabsContent>
            
            <TabsContent value="service" className="mt-6">
              <JazzSessionService conversationId={activeConversation} />
            </TabsContent>
            
            <TabsContent value="dashboard" className="mt-6">
              <ServiceDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
