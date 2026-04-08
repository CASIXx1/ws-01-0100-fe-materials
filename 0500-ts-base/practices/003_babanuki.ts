/* 下記に指定した仕様のばば抜きアプリを作成して下さい。
 *
 *  参加プレイヤーは4名: Alice, Bob, Charlie, David
 *
 *  1. ジョーカーを含む52+1枚のトランプを用意し、プレイヤーに2枚ずつ配る
 *  2. プレイヤーは手札から同じ数字のカードを捨てることができる
 *  3. 手札のが配られた場合、全部のプレイヤーが手札から全てのペアのカードを捨てる。
 *  4. プレイヤーはAlice => Bob => Charlie => David の順番でカードを引く
 *  5. プレイヤーはカードを引いた後に、手札にペアがあるか確認し、あれば捨てる
 *
 *  [勝利条件]
 *  1. 手札がなくなったプレイヤーが勝利。最後の1人が残るまで続ける。
 *
 *  [敗北条件]
 *  1. 自分以外のプレイヤーが全て抜けた場合。
 *  2. ジョーカーのみの手札を持っている場合。その人を負けとして即時にゲームを終了する。
 *
 *  [実行例]
 *  - ./docs/003_babanuki_example.md を参照してください。
 *
 *  [出力内容]
 *  - 実行例を参考に、ゲームの進行状況を Logger クラスを使って出力してください。
 *  - 出力はテストコードでも検証するので例にならって出力を行ってください。
 *
 *  [そのほか]
 *  - ロジックの実装の際は、IPlayer と IGameMaster のインターフェースを実装して仕様を満たす Player, GameMaster クラスを実装して下さい。
 *  - Card クラスなどすでに実装済みの部分もあるので、lib/babanuki.ts のコードも活用しながら実装してください。
 *  - GameMaster クラスの run メソッドが実行されるとゲームが実行できるようにしてください。
 */

import { Card, getRandomIndex, IPlayer, IGameMaster, ILogger, Logger } from "../lib/babanuki";

export class Player implements IPlayer {
  hands: Card[] = [];
  name: string = 'デフォルトネーム';
  done: boolean = false;

  constructor(name: string) {
    this.name = name;
  }

  get onlyJoker(): boolean {
    return this.hands.length === 1 && this.hands[0].isJoker;
  }

  discard(): Card[] {
    const discardedCards: Card[] = [];
    const checkedCards: Card[] = [];

    for (const currentCard of this.hands) {
      if (currentCard.isJoker) {
        checkedCards.push(currentCard);
        continue;
      }

      const pairIndex = checkedCards.findIndex(c => c.value === currentCard.value);

      if (pairIndex === -1) {
        checkedCards.push(currentCard);
      } else {
        const pairedCard = checkedCards.splice(pairIndex, 1)[0];
        discardedCards.push(pairedCard, currentCard);
      }
    }

    this.hands = checkedCards;

    if (this.hands.length === 0) {
      this.done = true;
    }

    return discardedCards;
  }

  assign(card: Card) {
    this.hands.push(card);
  }

  draw(targetPlayer: IPlayer): Card {
    const index = getRandomIndex(targetPlayer.hands.length);
    const drawnCard = targetPlayer.hands.splice(index, 1)[0];

    this.assign(drawnCard);

    if (targetPlayer.hands.length === 0) {
      targetPlayer.done = true;
    }

    return drawnCard;
  }
}

export class GameMaster implements IGameMaster {
  logger: ILogger;
  cards: Card[];
  players: IPlayer[];
  rank: IPlayer[];
  turn: number;

  constructor(logger: ILogger, players: IPlayer[]) {
    this.logger = logger;
    this.players = players;
    this.cards = Card.prepare();
    this.rank = [];
    this.turn = 1;
  }

  private dealCards() {
    const totalCardLength = this.cards.length;

    for (let i = 0; i < totalCardLength; i++) {
      const randomCard = this.cards.splice(getRandomIndex(this.cards.length), 1)[0];
      this.players[i % this.players.length].assign(randomCard);
    }

    this.logger.firstDiscard();

    for (const player of this.players) {
      this.logger.currentState(this.turn, player);
      const discardedCard = player.discard();
      this.logger.discard(player, discardedCard);

      if (player.done) {
        this.handleDonePlayer(player);
      }

      if (player.onlyJoker) {
        this.logger.end(player, this.rank);
        return;
      }

      this.turn++;
    }

  }

  private handleDonePlayer(player: IPlayer) {
    this.rank.push(player);
    this.players.splice(this.players.indexOf(player), 1);
    this.logger.done(player);
  }

  run() {
    this.dealCards();
    this.logger.start();

    while (this.players.length > 1) {
      console.log(`${this.turn} ===========`);
      const currentPlayer = this.players[(this.turn - 1) % this.players.length];
      const nextPlayer = this.players[this.turn % this.players.length];

      this.logger.currentState(this.turn, currentPlayer);
      this.logger.draw(currentPlayer, nextPlayer, currentPlayer.draw(nextPlayer));

      if (nextPlayer.done) {
        this.handleDonePlayer(nextPlayer);
      }

      const discardedCard = currentPlayer.discard();
      this.logger.discard(currentPlayer, discardedCard);

      if (currentPlayer.done) {
        this.handleDonePlayer(currentPlayer);
      }

      if (currentPlayer.onlyJoker) {
        this.logger.end(currentPlayer, this.rank);
        return;
      }

      if (nextPlayer.onlyJoker) {
        this.logger.end(nextPlayer, this.rank);
        return;
      }

      this.turn++;
    }
  }
}

// [編集不要] ターミナルでの実行用の関数。
export function run() {
  const gameMaster = new GameMaster(new Logger(), [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
    new Player("David"),
  ]);
  gameMaster.run();
}
