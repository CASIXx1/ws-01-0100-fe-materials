
# 006-next-context-api

このレポジトリは下記の内容を学習します。

1. Next.js 基礎
2. React Context API
3. Web API 統合(HTTP, REST API, Promise)
   
## 課題内容

下記デモと同様のものを作成してください。

### デモ

[デモ](https://next-context-api.netlify.app/)

## 使用するAPIについて

使用するAPIはこちらのリポジトリにある api.zip を展開した後、　Next.js プロジェクトの app/api に配置をしてそちらの APIを使うようにしてください。
(Next のリクエストハンドラの機能を使って実装しています。）

```zsh
$ unzip api.zip
```

### API 仕様書

Swagger UI を使用して仕様を管理しています。
上記の api  の セットアップを行った後に、下記URLにアクセスして Swagger UI を確認してください。

```
npm run dev
```

http://localhost:3000/api/v1/spec

![Swagger UI](./images/swagger-ui.png)

## 課題の進め方


#### 1. 課題の最終ゴールを確認する

デモを確認したり、メンターに確認してこの課題で達成すべき内容を確認してください。

#### 2. 必要な概念を確認する

課題でやる全体像を把握した上で課題に必要な概念を学んで取り組んでください。
この課題ではリポジトリをフォークするのではなく、自分のリポジトリを作成して取り組んでください。

[参考資料](./docs/documents.md)

#### 3. 実装に取り組む

実装量が多いので適切なタイミングでメンターに方向性のチェックを依頼するようにしてください。

Hint: 方向性のチェックを行う際は、プルリクエストを使用して現時点のコードを共有しながら進めましょう。

- [プルリクエストを出す上での注意点](https://lab.ver-1-0.net/posts/pr-points/)


#### 4. 実装が完了したら、Netlify にアップロードする。
https://www.netlify.com/

#### 5. メンターに最終レビューを依頼する

## 実装のチェックリスト

- [ ] Next.js(TypeScript) プロジェクトを作成する
- [ ] ESlint, Prettier を設定する
- [ ] api.zip を解答して next.js プロジェクトの app/api に配置。
- [ ] api.zip で実装された API を使用して、デモと同等のUIを実装する
    - [ ] ダッシュボード画面(/)の実装。(グラフの表示部分は [Chart.js](https://www.chartjs.org/docs/latest/getting-started/installation.html#npm) を使用)
    - [ ] タスク一覧画面(tasks)の実装。
    - [ ] プロジェクト一覧画面(tasks)の実装。

各種アイコンにはこちらの　[react-icons | ionicon5] (https://react-icons.github.io/react-icons/icons/io5/) を使用しています。

