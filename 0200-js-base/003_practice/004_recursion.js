/**
 *
 *  ※※※ こちらのファイルの問題は全て再帰処理を用いて解いてください。 ※※※
 *
 */

/**
 *  4.1 数列の和
 *
 *  再帰処理を用いて、0からnまでの数列の和を返す関数を実装してください
 *
 *  example:
 *    3 => 6
 *    10 => 55
 *    30 => 55
 */

function sumSequence (n, sum = 0) {
  if (0 <= n) {
    return sumSequence(n - 1, sum + n);
  } else {
    return sum;
  }
}

/**
 *  4.2 フィボナッチ数
 *
 *  指定された数のフィボナッチ数を返却する関数を実装してください。
 *  https://www.studyplus.jp/445
 *
 *  example:
 *    input: 10 => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
 */

function fibonacci (num) {
  if (num === 0) {
    return [];
  } else if (num === 1) {
    return [1];
  } else if (num === 2) {
    return [1, 1];
  } else if (3 <= num) {
    const addNum = fibonacci(num - 1);
    addNum.push(addNum[addNum.length - 1] + addNum[addNum.length - 2]);
    return addNum;
  }
}

/**
 *  4.3 多次元配列を一次元配列に変換する関数を実装してください。
 *
 *  example:
 *    [[[1, 2], [3, 4, [5, 6]]], [[7, 8]]]
 *      => [1, 2, 3, 4, 5, 6, 7, 8]
 *    [[[[[[[[1, 2, [3, 4]]]]]]]]]
 *      => [1, 2, 3, 4]
 *
 */

function flatten (data) {
  let flattenData = [];

  for (const value of data) {
    if (Array.isArray(value)) {
      flattenData.push(...flatten(value));
    } else {
      flattenData.push(value);
    }
  }

  return flattenData;
}


/**
 *  4.4 ディレクトリに含まれるファイルサイズの合計
 *
 *  ツリー上のオブジェクトで渡されるディレクトリの
 *  ファイルサイズの合計を求める関数を実装してください。
 *
 *  example:
 *    {
 *      type: 'folder',
 *      size: 0,
 *      children: [
 *        {
 *          type: 'folder',
 *          size: 0,
 *          children: [
 *            {
 *              type: 'folder',
 *              size: 0,
 *              children: [
 *                {
 *                  type: 'file',
 *                  size: 5
 *                },
 *                {
 *                  type: 'file',
 *                  size: 7
 *                },
 *                {
 *                  type: 'file',
 *                  size: 9
 *                },
 *              ]
 *            }
 *          ]
 *        },
 *        {
 *          type: 'file',
 *          size: 3
 *        },
 *        {
 *          type: 'file',
 *          size: 4
 *        },
 *        {
 *          type: 'file',
 *          size: 10
 *        },
 *      ]
 *    }
 *    => 38
 */

function fileSize (node, sum = 0) {
  if (node.type === 'folder') {
    sum = fileSize(node.children, sum);
  } else if (Array.isArray(node)) {
    for (const item of node) {
      sum = fileSize(item, sum);
    }
  } else if (node.type === 'file') {
    sum += node.size;
  }

  return sum;
}

module.exports = {
  sumSequence,
  fibonacci,
  flatten,
  fileSize
}
