# AIジャズセッション - ホテル・旅館向けAIサポートサービス

AIジャズセッションは、ホテルや旅館の経営者やスタッフ向けに、ビジネス改善のためのAIチャットインターフェースを提供するサービスです。

## 機能概要

- **AIチャットインターフェース**: ホテル・旅館の運営に関する質問や相談ができます
- **サービス管理**: サービスの有効化・無効化、設定の管理
- **ダッシュボード**: 利用状況、カテゴリ分析、ユーザー分析などの統計情報

## 技術スタック

- **フロントエンド**: React, TypeScript, Vite, Shadcn/ui
- **バックエンド**: Supabase (Edge Functions, Database, Auth)
- **AI**: OpenAI API
- **データ分析**: Recharts

## 始め方

### 前提条件

- Node.js 18以上
- npm または pnpm
- Supabase アカウント
- OpenAI API キー

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/ShunsukeHayashi/ai-jazz-session.git
cd ai-jazz-session

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 環境変数の設定

`.env` ファイルを作成し、以下の環境変数を設定してください：

```
VITE_SUPABASE_URL=あなたのSupabaseプロジェクトURL
VITE_SUPABASE_ANON_KEY=あなたのSupabaseの匿名キー
OPENAI_API_KEY=あなたのOpenAI APIキー
```

## サービスの使い方

### チャットインターフェース

1. アプリケーションにアクセスし、「チャット」タブを選択します
2. 新しい会話を開始するには、サイドバーの「新しい会話」ボタンをクリックします
3. テキスト入力欄に質問や相談内容を入力し、送信ボタンをクリックします
4. AIからの回答が表示されます

### サービス管理

1. 「サービス管理」タブを選択します
2. 「サービスを有効化」ボタンをクリックしてサービスを開始します
3. サービス設定タブでは、各種設定を変更できます
4. サービス情報タブでは、現在のサービス状態を確認できます

### ダッシュボード

1. 「ダッシュボード」タブを選択します
2. 利用状況、カテゴリ分析、ユーザー分析の各タブで統計情報を確認できます
3. グラフや数値で、サービスの利用状況を視覚的に把握できます

## Supabase Edge Functions

### デプロイ方法

```bash
# Supabase CLIのインストール
npm install -g supabase

# ログイン
supabase login

# Edge Functionsのデプロイ
cd supabase
supabase functions deploy --project-ref あなたのプロジェクトID
```

### 主要なEdge Functions

- **chat**: AIとの会話を処理します
- **service-status**: サービスの状態を確認します
- **activate-service**: サービスを有効化します
- **generate-embeddings**: ドキュメントの埋め込みを生成します
- **seed-documents**: 初期ドキュメントをデータベースに登録します

## データベース構造

主要なテーブル：

- **conversations**: 会話履歴を管理します
- **messages**: 各会話内のメッセージを保存します
- **documents**: ベクトル埋め込みを使用した知識ベースを提供します

## 貢献方法

1. このリポジトリをフォークします
2. 新しいブランチを作成します (`git checkout -b feature/amazing-feature`)
3. 変更をコミットします (`git commit -m '素晴らしい機能を追加'`)
4. ブランチをプッシュします (`git push origin feature/amazing-feature`)
5. プルリクエストを作成します

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

## Lovable プロジェクト情報

**URL**: https://lovable.dev/projects/dc1774e3-e79c-407e-9b59-032131b6b162

### Lovableでの編集方法

[Lovable プロジェクト](https://lovable.dev/projects/dc1774e3-e79c-407e-9b59-032131b6b162)にアクセスしてプロンプトを開始できます。Lovableを通じて行われた変更は、このリポジトリに自動的にコミットされます。

### デプロイ方法

[Lovable](https://lovable.dev/projects/dc1774e3-e79c-407e-9b59-032131b6b162)を開き、「共有」→「公開」をクリックするだけです。
