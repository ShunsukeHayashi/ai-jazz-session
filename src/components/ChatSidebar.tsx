
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onNewConversation: () => void;
  onConversationSelect: (id: string) => void;
  isLoading: boolean;
}

const ChatSidebar = ({
  conversations,
  activeConversation,
  onNewConversation,
  onConversationSelect,
  isLoading
}: ChatSidebarProps) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteTarget(id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', deleteTarget);
      
      if (error) {
        throw error;
      }
      
      toast({
        description: '会話が削除されました',
      });
      
      // If the deleted conversation was active, select a new one or create new chat
      if (activeConversation === deleteTarget) {
        const remainingConversations = conversations.filter(c => c.id !== deleteTarget);
        if (remainingConversations.length > 0) {
          onConversationSelect(remainingConversations[0].id);
        } else {
          onNewConversation();
        }
      }
      
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast({
        title: 'エラーが発生しました',
        description: '会話の削除に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
      setDeleteTarget(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ja });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <div className="w-80 h-full bg-muted/30 border-r border-border flex flex-col">
        <div className="p-4">
          <Button 
            className="w-full gap-2" 
            onClick={onNewConversation}
          >
            <Plus className="h-4 w-4" />
            新しい会話
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              会話履歴がありません
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`
                    flex justify-between items-center p-3 rounded-lg cursor-pointer
                    ${activeConversation === conversation.id 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-accent/50'}
                  `}
                  onClick={() => onConversationSelect(conversation.id)}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div className="overflow-hidden">
                      <div className="truncate font-medium">{conversation.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(conversation.created_at)}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => handleDeleteClick(conversation.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">削除</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-medium">AIアシスタントのヒント</p>
            <ul className="list-disc list-inside space-y-1">
              <li>具体的な課題や状況を説明しましょう</li>
              <li>AIの活用方法について質問できます</li>
              <li>ハッカソンの詳細を聞くこともできます</li>
            </ul>
          </div>
        </div>
      </div>
      
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>会話を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は元に戻せません。この会話とすべてのメッセージが削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  削除中...
                </>
              ) : (
                '削除する'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChatSidebar;
