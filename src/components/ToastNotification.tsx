import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toast, ToastProvider, ToastTitle, ToastDescription } from '@/components/ui/toast';

interface ToastNotificationProps {
  toasts: Array<{
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
  }>;
  dismiss: (id: string) => void;
}

export function ToastNotification({ toasts, dismiss }: ToastNotificationProps) {
  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant} onDismiss={() => dismiss(toast.id)}>
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
        </Toast>
      ))}
    </ToastProvider>
  );
}

export function Notifications() {
  const { toasts, dismiss } = useToast();
  
  return <ToastNotification toasts={toasts} dismiss={dismiss} />;
}

export function useNotification() {
  const { toast } = useToast();
  
  const showSuccess = (title: string, description?: string) => {
    return toast({
      title,
      description,
      variant: 'success',
    });
  };
  
  const showError = (title: string, description?: string) => {
    return toast({
      title,
      description,
      variant: 'destructive',
    });
  };
  
  const showInfo = (title: string, description?: string) => {
    return toast({
      title,
      description,
      variant: 'default',
    });
  };
  
  return {
    showSuccess,
    showError,
    showInfo,
  };
}

export function useJapaneseNotification() {
  const { showSuccess, showError, showInfo } = useNotification();
  
  // 日本語通知用のヘルパー関数
  const formatJapaneseDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // 成功通知（敬語）
  const notifySuccess = (message: string, details?: string) => {
    const title = `${message}しました`;
    const description = details ? `${details}` : undefined;
    return showSuccess(title, description);
  };
  
  // エラー通知（敬語）
  const notifyError = (message: string, details?: string) => {
    const title = `${message}できませんでした`;
    const description = details ? `${details}。お手数ですが、再度お試しください。` : 'お手数ですが、再度お試しください。';
    return showError(title, description);
  };
  
  // 情報通知（敬語）
  const notifyInfo = (message: string, details?: string) => {
    return showInfo(message, details);
  };
  
  // 処理中通知
  const notifyProcessing = (message: string) => {
    return showInfo(`${message}処理中です...`, '少々お待ちください');
  };
  
  // 完了通知
  const notifyComplete = (message: string, timestamp?: Date) => {
    const timeInfo = timestamp ? `（${formatJapaneseDate(timestamp)}）` : '';
    return showSuccess(`${message}が完了しました ${timeInfo}`, 'ありがとうございます');
  };
  
  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyProcessing,
    notifyComplete,
    formatJapaneseDate,
  };
}
