import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Music, MessageSquare, Settings, Info } from 'lucide-react';

interface JazzSessionServiceProps {
  conversationId?: string;
}

const JazzSessionService = ({ conversationId }: JazzSessionServiceProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<'active' | 'inactive'>('inactive');

  // Check if the service is active
  useEffect(() => {
    const checkServiceStatus = async () => {
      try {
        setIsLoading(true);
        
        // Call Supabase function to check service status
        const { data, error } = await supabase.functions.invoke('service-status', {
          body: { conversationId }
        });
        
        if (error) throw error;
        
        setServiceStatus(data?.active ? 'active' : 'inactive');
      } catch (error) {
        console.error('Error checking service status:', error);
        toast({
          title: 'サービス状態の確認に失敗しました',
          description: error instanceof Error ? error.message : '不明なエラーが発生しました',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkServiceStatus();
  }, [conversationId, toast]);

  const activateService = async () => {
    try {
      setIsLoading(true);
      
      // Call Supabase function to activate the service
      const { data, error } = await supabase.functions.invoke('activate-service', {
        body: { conversationId }
      });
      
      if (error) throw error;
      
      setServiceStatus('active');
      toast({
        title: 'サービスが有効化されました',
        description: 'AIジャズセッションサービスが正常に開始されました。',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error activating service:', error);
      toast({
        title: 'サービスの有効化に失敗しました',
        description: error instanceof Error ? error.message : '不明なエラーが発生しました',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          AIジャズセッションサービス
        </CardTitle>
        <CardDescription>
          AIを活用した旅館・ホテルの業務改善サービス
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              チャット
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              設定
            </TabsTrigger>
            <TabsTrigger value="info">
              <Info className="h-4 w-4 mr-2" />
              情報
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-sm font-medium mb-2">サービス状態</h3>
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${serviceStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm">
                  {serviceStatus === 'active' ? 'アクティブ' : '停止中'}
                </span>
              </div>
              
              {serviceStatus === 'inactive' && (
                <Button 
                  onClick={activateService} 
                  className="mt-4 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      処理中...
                    </>
                  ) : (
                    'サービスを有効化する'
                  )}
                </Button>
              )}
            </div>
            
            {serviceStatus === 'active' && (
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-sm">
                  AIジャズセッションサービスが有効です。チャットインターフェースを使用して質問やリクエストを送信できます。
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-sm font-medium mb-2">サービス設定</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AIジャズセッションの動作をカスタマイズします
              </p>
              
              {/* Settings would go here */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">自動レスポンス</span>
                  <div className="h-4 w-8 bg-primary/30 rounded-full relative">
                    <div className="absolute right-0 top-0 h-4 w-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">データ分析</span>
                  <div className="h-4 w-8 bg-primary/30 rounded-full relative">
                    <div className="absolute right-0 top-0 h-4 w-4 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">多言語サポート</span>
                  <div className="h-4 w-8 bg-primary/30 rounded-full relative">
                    <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-sm font-medium mb-2">サービス情報</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AIジャズセッションサービスについて
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">バージョン:</span>
                  <span className="col-span-2">1.0.0</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">最終更新:</span>
                  <span className="col-span-2">2025年3月12日</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">開発者:</span>
                  <span className="col-span-2">シュンスケの旅</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">ライセンス:</span>
                  <span className="col-span-2">プロプライエタリ</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          © 2025 シュンスケの旅
        </div>
        <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/ShunsukeHayashi/ai-jazz-session', '_blank')}>
          GitHub
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JazzSessionService;
