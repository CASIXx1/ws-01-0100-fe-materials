# express-jwt

Express + TypeScript で JWT 認証を試せるサンプルアプリです。  
ユーザー登録、サインイン、サインアウト、ログインユーザー取得・更新を確認できます。

## 前提環境

- Node.js 20 以上を推奨
- npm

## セットアップ

```bash
npm install
```

## 起動方法

### 開発起動

```bash
npm run dev
```

`tsc --watch` で `src/` を `dist/` にビルドしつつ、`nodemon` で `dist/index.js` を再起動します。  
初回は `dist/` が未生成でも動作できますが、安定して始めたい場合は先に `npm run build` を 1 回実行してください。

### 本番相当の起動

```bash
npm run build
npm start
```

起動すると `http://localhost:3000` で待ち受けます。

## 開発方法

- 実装は `src/` 配下にあります
- TypeScript のビルド成果物は `dist/` に出力されます
- API の認証は Cookie の `accessToken` または `Authorization: Bearer <token>` を利用します
- ユーザー情報はアプリ内メモリに保存されるため、サーバー再起動で消えます

主要ファイル:

- `src/index.ts`: ルーティングと認証 API の本体
- `src/middleware.ts`: JWT 検証ミドルウェア
- `src/auth.ts`: Cookie 保存とトークン取得処理
- `src/types.ts`: `req.user` を含む拡張 Request 型

## 動作確認方法

### 1. サーバー起動

```bash
npm run dev
```

### 2. ユーザー登録

```bash
curl -i -X POST http://localhost:3000/api/v1/auth/sign_up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "taro",
    "age": 20,
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### 3. サインインして Cookie を保存

```bash
curl -i -c cookie.txt -X POST http://localhost:3000/api/v1/auth/sign_in \
  -H "Content-Type: application/json" \
  -d '{
    "name": "taro",
    "password": "password123"
  }'
```

レスポンスには `accessToken` とユーザー情報が含まれ、同時に Cookie にも保存されます。

### 4. ログイン中ユーザー取得

```bash
curl -i -b cookie.txt http://localhost:3000/api/v1/users/me
```

### 5. ユーザー情報更新

```bash
curl -i -X PATCH http://localhost:3000/api/v1/users/me \
  -H "Content-Type: application/json" \
  -b cookie.txt \
  -d '{
    "age": 21
  }'
```

### 6. サインアウト

```bash
curl -i -X POST http://localhost:3000/api/v1/auth/sign_out \
  -b cookie.txt
```

### Bearer トークンで確認する場合

`/api/v1/auth/sign_in` のレスポンスで返る `accessToken` を使ってアクセスできます。

```bash
curl -i http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer <accessToken>"
```

## API エンドポイント

### `POST /api/v1/auth/sign_up`

ユーザー登録を行います。

リクエスト例:

```json
{
  "name": "taro",
  "age": 20,
  "password": "password123",
  "password_confirmation": "password123"
}
```

バリデーション:

- `name` は 3 文字以上
- `age` は 0 より大きい数値
- `password` と `password_confirmation` は一致必須
- 同じ `name` は登録不可

成功時:

- `201 Created`

レスポンス例:

```json
{
  "data": {
    "id": 1,
    "name": "taro",
    "age": 20
  }
}
```

### `POST /api/v1/auth/sign_in`

サインインして JWT を発行します。

リクエスト例:

```json
{
  "name": "taro",
  "password": "password123"
}
```

成功時:

- `200 OK`
- レスポンス JSON に `accessToken` を返却
- Cookie `accessToken` を設定

レスポンス例:

```json
{
  "accessToken": "<jwt>",
  "data": {
    "id": 1,
    "name": "taro",
    "age": 20
  }
}
```

失敗時:

- `401 Unauthorized`: ユーザー名またはパスワード不正

### `POST /api/v1/auth/sign_out`

サインアウトし、Cookie `accessToken` を削除します。

成功時:

- `200 OK`

レスポンス例:

```json
{
  "data": "Successfully signed out"
}
```

### `GET /api/v1/users/me`

認証済みユーザーの情報を取得します。

認証方法:

- Cookie `accessToken`
- `Authorization: Bearer <token>`

成功時:

- `200 OK`

レスポンス例:

```json
{
  "data": {
    "id": 1,
    "name": "taro",
    "age": 20
  }
}
```

失敗時:

- `401 Unauthorized`: トークンなし
- `401 Unauthorized`: 無効または期限切れトークン
- `404 Not Found`: 該当ユーザーなし

### `PATCH /api/v1/users/me`

認証済みユーザーの年齢を更新します。

リクエスト例:

```json
{
  "age": 21
}
```

成功時:

- `200 OK`

レスポンス例:

```json
{
  "data": {
    "id": 1,
    "name": "taro",
    "age": 21
  }
}
```

失敗時:

- `400 Bad Request`: `age` が 0 以下または数値でない
- `401 Unauthorized`: トークンなし
- `401 Unauthorized`: 無効または期限切れトークン
- `404 Not Found`: 該当ユーザーなし

## 補足

- JWT の秘密鍵はコード内で `"your_secret_key"` に固定されています
- 本番運用では秘密鍵を環境変数などで管理してください
- サインアップ時点ではトークンは発行されず、サインイン時に発行されます
