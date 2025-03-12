import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class JapaneseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('エラーが発生しました:', error);
    console.error('コンポーネントスタック:', errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive">
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <h3 className="font-medium">エラーが発生しました 🙇‍♂️</h3>
          </div>
          <p className="text-sm mb-2">
            申し訳ございませんが、予期せぬエラーが発生いたしました。
          </p>
          <div className="text-xs bg-background/50 p-2 rounded-md mb-2 font-mono">
            {this.state.error?.message}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-sm px-3 py-1 bg-background rounded-md hover:bg-muted transition-colors"
          >
            ページを再読み込み
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default JapaneseErrorBoundary;
