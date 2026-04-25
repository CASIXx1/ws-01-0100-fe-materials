# express-ts-app

TypeScript で実装されたシンプルな Express API サンプルです。ユーザー一覧の取得、単一ユーザー取得、作成、更新、削除と、動作確認用のエンドポイントを備えています。

## 前提環境

- Node.js
- npm

## セットアップ

依存関係をインストールします。

```bash
npm install
```

すでに `node_modules` がある場合でも、環境を作り直すときは再実行してください。

## 起動方法

### 本番相当の起動

TypeScript をビルドしてから起動します。

```bash
npm run build
npm run start
```

起動後は `http://localhost:3000` でアクセスできます。

### 開発用の起動

ファイル変更を監視しながら開発します。

```bash
npm run dev
```

このプロジェクトの `dev` スクリプトは `tsc --watch` と `nodemon dist/index.js` を並列で実行します。初回起動で `dist/` が未生成なら、先に `npm run build` を一度実行しておくと安定します。

## 動作確認方法

### ルート確認

```bash
curl http://localhost:3000/
```

期待されるレスポンス:

```text
Hello Express + TypeScript!
```

### ヘルスチェック相当の確認

```bash
curl http://localhost:3000/api/v1/health
```

レスポンスにはランダム生成されたユーザーデータが `data` 配列で返ります。

### ユーザー一覧取得

```bash
curl "http://localhost:3000/api/v1/users?page=1&limit=10"
```

### ユーザー単体取得

```bash
curl http://localhost:3000/api/v1/users/1
```

### ユーザー作成

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Taro","age":20}'
```

### ユーザー更新

```bash
curl -X PATCH http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Taro Yamada","age":21}'
```

### ユーザー削除

```bash
curl -X DELETE http://localhost:3000/api/v1/users/1
```

## 開発方法

### ソースコード配置

- `src/index.ts`: Express アプリケーション本体
- `dist/index.js`: ビルド後の出力

### 主な npm スクリプト

- `npm run build`: TypeScript を `dist/` にビルド
- `npm run start`: ビルド済みのアプリを起動
- `npm run dev`: TypeScript 監視と `nodemon` による自動再起動

### テストについて

現状、`npm test` は未実装です。動作確認は `curl` などで API を直接叩いて行ってください。

## API エンドポイント

### `GET /`

疎通確認用のプレーンテキストを返します。

レスポンス例:

```text
Hello Express + TypeScript!
```

### `GET /api/v1/health`

ランダム生成した 10,000 件のユーザーデータを返します。

レスポンス例:

```json
{
  "data": [
    {
      "id": 1,
      "name": "SampleName",
      "age": 24
    }
  ]
}
```

### `GET /api/v1/users`

ユーザー一覧をページング付きで返します。

クエリパラメータ:

- `page`: ページ番号。デフォルトは `1`
- `limit`: 1 ページあたりの件数。デフォルトは `10`

レスポンス例:

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "age": 30
    }
  ]
}
```

### `GET /api/v1/users/:id`

指定 ID のユーザーを返します。

成功時レスポンス例:

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "age": 30
  }
}
```

存在しない ID の場合:

```json
{
  "error": "User not found"
}
```

### `POST /api/v1/users`

ユーザーを新規作成します。

リクエストボディ:

```json
{
  "name": "Taro",
  "age": 20
}
```

成功時レスポンス例:

```json
{
  "data": {
    "id": 4,
    "name": "Taro",
    "age": 20
  }
}
```

`name` または `age` が不足している場合:

```json
{
  "error": "Name and age are required"
}
```

### `PATCH /api/v1/users/:id`

指定 ID のユーザー情報を更新します。

リクエストボディ例:

```json
{
  "name": "Taro Yamada",
  "age": 21
}
```

成功時レスポンス例:

```json
{
  "data": {
    "id": 1,
    "name": "Taro Yamada",
    "age": 21
  }
}
```

### `DELETE /api/v1/users/:id`

指定 ID のユーザーを削除します。

成功時レスポンス例:

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "age": 30
    }
  ]
}
```

存在しない ID の場合:

```json
{
  "error": "User not found"
}
```
