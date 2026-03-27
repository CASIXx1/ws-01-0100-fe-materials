// 下記指定の通りそれぞれの関数を実装してください。
//
// ※1 any 型を使用せずに具体的な型を用いて実装して下さい。
// ※2 関数はテストコードのために必ず export して下さい。

/* 1.1 以下の関数を実装して下さい
   関数名: add
   引数: number, number
   返り値: number
   振る舞い: 引数で渡された2つの数値を足し算して返す
*/


/* [ここに実装] */
export function add(a: number, b: number): number {
    return a + b;
}

/* 1.2 以下の関数を実装して下さい
   関数名: sum
   引数: number[]
   返り値: number
   振る舞い: 配列の中身の数を全て足し算して返す
*/

/* [ここに実装] */
export function sum(array: number[]): number {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/* 1.3 以下の関数を実装して下さい
   関数名: format
   引数: Date
   返り値: string
   振る舞い: 引数で渡されたDate型の日付をYYYY/MM/DDの形式にして返す
*/

/* [ここに実装] */
export function format(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
}

/* 1.4 以下の関数を実装して下さい
   関数名: merge
   引数: Record<string, number>, Record<string, number>
   返り値: Record<string, number>
   振る舞い: 引数で渡された2つのオブジェクトのキーと値をマージして返す。
             (同じキーがある場合は足し算する)

   例:
   merge({a: 1}, {b: 2}) => {a: 1, b: 2}
   merge({a: 1}, {a: 1, b: 2}) => {a: 2, b: 2}
   merge({a: 1, c: 1}, {a: 1, b: 2}) => {a: 2, b: 2, c: 1}
   merge({a: 1, c: 1}, {a: 1, b: 2}) => {a: 2, b: 2, c: 1}
   merge({}, {}) => {}
*/

/* [ここに実装] */
export function merge(a: Record<string, number>, b: Record<string, number>): Record<string, number> {
    const mergedValue: Record<string, number> = {...a};
    
    for (const key in b) {
        mergedValue[key] = (mergedValue[key] ?? 0) + b[key];
    }

    return mergedValue;
}

/* 1.5 以下の関数を実装して下さい
   関数名: stringify
   引数: string | number | boolean | null | undefined
   返り値: string
   振る舞い: 引数で渡された値を文字列にして返す
             (引数は引数の欄にリストされた型が入る可能性があります)

   例:
   stringify("a") => "a"
   stringify(1) => "1"
   striingify(true) => "true"
   stringify(null) => "null"
   stringify(undefined) => "undefined"
*/

/* [ここに実装] */
export function stringify(
  value: string | number | boolean | null | undefined
): string {
  return String(value);
}