
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';
import { formatRelative } from 'date-fns';
import { ja } from 'date-fns/locale';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatInterfaceProps {
  conversationId: string | null;
  onConversationCreated: (conversationId: string) => void;
}

const ChatInterface = ({ conversationId, onConversationCreated }: ChatInterfaceProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch messages for the active conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) {
        setMessages([]);
        return;
      }
      
      try {
        setFetchError(null);
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error('Error fetching messages:', error);
          setFetchError('メッセージの読み込みに失敗しました');
          return;
        }
        
        // Cast the role to ensure it conforms to our Message type
        const typedMessages = data?.map(msg => ({
          ...msg,
          role: msg.role as 'user' | 'assistant'
        })) || [];
        
        setMessages(typedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setFetchError('メッセージの読み込みに失敗しました');
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setIsLoading(true);
    
    // Add optimistic user message to the UI
    const optimisticUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, optimisticUserMsg]);
    
    try {
      // Call chat endpoint
      const response = await supabase.functions.invoke('chat', {
        body: { 
          message: userMessage,
          conversationId,
          agentMode: true // Enable agent functionality
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message || '不明なエラーが発生しました');
      }
      
      const data = await response.data;
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const newConversationId = data.conversationId;
      
      // If this was a new conversation, notify parent
      if (!conversationId && newConversationId) {
        onConversationCreated(newConversationId);
      }
      
      // Refresh messages to get the full history including the AI response
      const { data: updatedMessages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', newConversationId)
        .order('created_at', { ascending: true });
      
      if (messagesError) {
        throw messagesError;
      }
      
      // Cast the role to ensure it conforms to our Message type
      const typedMessages = updatedMessages?.map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant'
      })) || [];
      
      setMessages(typedMessages);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'メッセージの送信に失敗しました',
        description: error instanceof Error ? error.message : '不明なエラーが発生しました',
        variant: 'destructive',
      });
      
      // Remove optimistic message on error
      setMessages((prev) => prev.filter(msg => msg.id !== optimisticUserMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatRelative(new Date(dateString), new Date(), { locale: ja });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full max-h-screen bg-background/50 border-l border-border">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-medium">
          {conversationId ? '会話を続ける' : '新しい会話を始める'}
        </h2>
        <p className="text-sm text-muted-foreground">
          旅館・ホテルのAI活用について質問してみましょう
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {fetchError && (
          <div className="p-4 mb-4 rounded-md bg-destructive/10 text-destructive">
            <p>{fetchError}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              再読み込み
            </Button>
          </div>
        )}
        
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🎷</span>
            </div>
            <h3 className="text-lg font-medium mb-2">シュンスケのAIサポート</h3>
            <p className="text-muted-foreground max-w-md mb-4">
              AIを活用した旅館・ホテルの業務改善、課題解決について質問してみましょう。
              具体的な質問ほど、より役立つ回答が得られます。
            </p>
            <div className="space-y-2 w-full max-w-md">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => setInput('AIを使って宿泊予約のキャンセル率を下げる方法はありますか？')}
              >
                AIを使って宿泊予約のキャンセル率を下げる方法は？
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => setInput('客室稼働率を上げるためのAI活用方法を教えてください')}
              >
                客室稼働率を上げるためのAI活用方法を教えてください
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => setInput('シュンスケの旅のハッカソンで解決できる一般的な旅館の課題は何ですか？')}
              >
                ハッカソンで解決できる旅館の課題は何ですか？
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 md:max-w-2/3 rounded-lg p-4 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-12' 
                      : 'bg-muted mr-12'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {formatDate(message.created_at)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">送信</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
