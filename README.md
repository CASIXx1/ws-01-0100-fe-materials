
# フロントエンドコース課題

こちらは [MENTA 上で提供しているコース](https://menta.work/plan/1608/4274) の課題の一覧です。


### 基本の進め方

1. 週一回でビデオ通話＆チャットで課題をレビュー&チェックしながら進めていきます。
2. JavaScript や TypeScript の課題以外はデモサイトがあるので、そのデモサイトを見様見真似で作る形になります。
3. 各課題の進め方は、ディレクトリトップにある REDAME.md を参照ください

### AI エージェントの使用について

各課題での AI エージェント (Claude Code, Codex など) の使用可否は課題一覧の表を参照してください。
◯ のついてない課題でもChatGPT 等にチャットわからない部分を聞いたりするのは問題ないです。

AIエージェントを使用してコードを書かせる場合には、「理解」を前提にコーディングエージェントを使用してください。

## 課題について

[見本アプリ](https://github.com/version1-workspace/ws-01-000-real-todo)

下記課題は、この見本アプリの要素を分解したもので、シンプルにしたものです。（課題で完全に同じものを作るわけではありません。）
将来的に見本アプリと同じようなものを作れるようにそれぞれ分解して学習を進めていきます。

※ 見本アプリは自由に触って頂いて大丈夫です。

### 一覧

| No | 課題名 | AIエージェント使用 |
|----|--------|--------------------|
| 1 | [HTML/CSS (Sass, BEM) 課題](./0100-html-css) | - |
| 2 | [JavaScript 課題]( ./0200-js-base) | - |
| 3 | [TODO アプリ (HTML/CSS, JS) 課題](./0300-js-dom-todo) | - |
| 4 | [TODO アプリ (React) 課題](./0400-react-todo) | - |
| 5 | [TypeScript 課題](./0500-ts-base) | - |
| 6 | [TODO アプリ (Next.js, Context API, HTTP) 課題](./0600-next-context-api) | ◯ |
| 7 | [サーバサイド ・ Web API (Express.js + PostgreSQL) 課題](./0700-express-web-api) | ◯ |



## 課題リポジトリをローカルにクローン

それぞれの課題始める前にこちらのリポジトリを下記の手順でクローンして始めてください。

※ Gitが初めての方は下記を参照ください。
- [プログラミングを学ぶ前に始めるGit入門](https://version-1workspace.gitbook.io/git/)

### 1. 課題を始める前にリポジトリ をフォーク

- [GitHubフォークのやり方](https://version-1workspace.gitbook.io/github/how-to-fork)

本体のリポジトリに更新が入った場合は下記手順でブランチを更新してください。
[フォークを同期する](https://docs.github.com/ja/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui)

### 2. リポジトリ をクローン

フォークをリポジトリしてクローン

```bash
git clone [fork したリポジトリの URL]
```

[Github | リポジトリをクローンする](https://docs.github.com/ja/repositories/creating-and-managing-repositories/cloning-a-repository)

### 3. 課題を開始

上記コマンドでリポジトリがクローンされたことを確認して課題を始めてください。
