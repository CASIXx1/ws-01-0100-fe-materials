/**
 *  3.1 二段にネストした配列を一段にして返す関数を実装してください。
 *
 *   [[1, 2], [3, 4], [5, 6]] => [1, 2, 3, 4, 5, 6]
 *
 */

function flatten(list) {
  let flattenArray = [];

  for (let i = 0; i < list.length; i++) {
    let listItem = list[i];

    if (Array.isArray(listItem)) {
      for (let j = 0; j < listItem.length; j++) {
        flattenArray.push(listItem[j]);
      }
    } else {
      flattenArray.push(listItem);
    }
  }

  return flattenArray;
}

/**
 *  3.2 id の配列を各要素がキーの値が true なオブジェクトに変換する関数を実装してください。
 *
 *  input
 *    [1, 3, 4, 5, 9]
 *
 *  output
 *  {
 *    1: true,
 *    3: true,
 *    4: true,
 *    5: true,
 *    9: true,
 *  }
 *
 */

function toMap(list) {
  let map = {};

  for (const value of list) {
    map[value] = true;
  }

  return map;
}

/**
 *  3.3 オブジェクトが引数で与えられる場合に、それぞれの key と value を順番に配列として返す関数を実装してください。
 *
 *  example:
 *    { a: 1, b: 2 } => ['a', 1, 'b', 2]
 *    {} => []
 *
 */

function toList(obj) {
  let list = [];

  for (const key in obj) {
    list.push(key);
    list.push(obj[key]);
  }

  return list;
}

/**
 *  3.4 オブジェクトの配列のid だけを取り出して配列として返す関数を実装してください。
 *
 *  input:
 *    [
 *      { id: 1, category: 'kitchen', name: 'knife' },
 *      { id: 2, category: 'office', name: 'pen' },
 *      { id: 3, category: 'bath', name: 'soap' },
 *      { id: 4, category: 'kitchen', name: 'knife' },
 *      { id: 5, category: 'kitchen', name: 'knife' },
 *    ]
 *
 *  input:
 *    [1, 2, 3, 4, 5]
 *
 */

function ids(obj) {
  let ids = [];

  for (let value of obj) {
    ids.push(value['id']);
  }

  return ids;
}

/**
 *  3.5 二つの配列をマージする関数を実装してください。
 *      ただし、重複する値はまとめた配列になるように実装してください。
 *
 *  example:
 *    [1, 2], [3, 4] => [1, 2, 3, 4]
 *    [1, 2, 3], [3, 4, 5] => [1, 2, 3, 4, 5]
 *    [3, 2, 1], [3, 4, 5] => [3, 2, 1, 4, 5]
 *    [3, 1, 2], [1, 2, 3] => [3, 1, 2]
 *    [3, 1, 2], [1, 2, 5] => [3, 1, 2, 5]
 *
 */

function merge(a, b) {
  let mergeList = [];

  for (let value of a) {
    mergeList.push(value);
  }

  for (let value of b) {
    if (!mergeList.includes(value)) {
      mergeList.push(value);
    }
  }

  return mergeList;
}

/**
 *  3.6 二つの配列のどちらにも存在する要素を返す関数を実装してください。
 *      要素は全て数字とします。
 *
 *  example:
 *    [1, 2], [3, 4] => []
 *    [1, 2, 3], [3, 4, 5] => [3]
 *    [3, 1, 2], [1, 2, 3] => [3, 1, 2]
 *    [3, 1, 2], [1, 2, 5] => [1, 2]
 *
 */

function intersection(a, b) {
  let intersectionList = [];

  for (let value of b) {
    if(a.includes(value)) {
      intersectionList.push(value);
    }
  }

  return intersectionList;
}

/**
 *  3.7 二つのオブジェクトの配列をマージする関数を実装してください。
 *      id が同じだったらオブジェクトをマージしてください。
 *
 *  input:
 *    [{ id: 1, a: 1 }, { id: 2, b: 1 }], [{ id: 1, c: 1 }, {id: 3, d: 4}]
 *      => [[id: 1, a: 1, c: 1], { id: 2, b: 1 }, {id: 3, d: 4}]
 *
 *    [{ id: 1, a: 1 }, { id: 2, b: 1 }], [{ id: 3, c: 1 }, {id: 4, d: 4}]
 *      => [{ id: 1, a: 1 }, { id: 2, b: 1 }, { id: 3, c: 1 }, { id: 4, d: 4 }]
 *
 */

function mergeObjOfArray(a, b) {
  let idMap = new Map();

  for (let value of a) {
    idMap.set(value.id, value);
  }

  for (let value of b) {
    if (idMap.has(value.id)) {
      const aValue = idMap.get(value.id);
      idMap.set(value.id, Object.assign({}, aValue, value));
    } else {
      idMap.set(value.id, value);
    }
  }

  return Array.from(idMap.values());
}

/**
 *  3.8 渡されたデータの合計(count プロパティの和) を求める関数を実装してください。
 *
 *  example:
 *    [{ count: 1 , a: [{ count: 2 }, { count: 3 }], b: { count: 4 }}, { count: 5 }]
 *      => 15
 *
 *    [{ count: 1 }, { count: 2 }, { count: 3 }]
 *      => 6
 *
 */

function sum(data) {
  let sum = 0;
  let stack = [];

  stack.push(...data);

  while (stack.length > 0) {
    let popValue = stack.pop();

    if (Array.isArray(popValue)) {
      for (const item of popValue) {
        stack.push(item);
      }
    } else if (popValue !== null && typeof popValue === 'object') {
      for (let [key, value] of Object.entries(popValue)) {
        if (key === 'count') {
          sum += value;
        } else {
          stack.push(value);
        }
      }
    }
  }

  return sum;
}

module.exports = {
  flatten,
  toMap,
  toList,
  ids,
  merge,
  intersection,
  mergeObjOfArray,
  sum
}
