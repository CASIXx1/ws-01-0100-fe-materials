# Postgres + Docker Tutorial

`postgres:16-bookworm` をベースに、日本語ロケール付きの PostgreSQL イメージを作るサンプルです。
この構成では、コンテナ起動時に `mydb` データベースが作成され、ホスト側の `54321` ポートから接続できます。

## ビルド

```bash
docker build -t postgres-tutorial .
```

## コマンド

以下のコマンドで PostgreSQL コンテナを起動します。

```bash
docker run  \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydb \
  -p 54321:5432 \
  postgres-tutorial
```

各オプションの意味は次のとおりです。

- `POSTGRES_USER=postgres`: 初期作成される PostgreSQL ユーザー名です。
- `POSTGRES_PASSWORD=password`: 上記ユーザーのパスワードです。
- `POSTGRES_DB=mydb`: コンテナ初回起動時に作成されるデータベース名です。
- `-p 54321:5432`: ホストの `54321` 番ポートを、コンテナ内の PostgreSQL 標準ポート `5432` に転送します。

### 接続

起動後は `psql` から次のように接続できます。

```bash
psql -h localhost -p 54321 -U postgres -d mydb
```

パスワードの入力を求められたら、`docker run` 時に指定した `password` を入力してください。
