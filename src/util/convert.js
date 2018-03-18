require('babel-polyfill')

const rowTo2BPP = (row: number[]): Array<Array<number>> => {
  const byte0 = []
  const byte1 = []

  row.forEach(pixel => {
    byte0.push(pixel & 1)
    byte1.push(pixel >> 1)
  })

  return [byte0, byte1]
}

export const to2BPP = (tile: Array<Array<number>>): Array<Array<number>> =>
  tile.map(row => rowTo2BPP(row))

const binaryToHex = (binary: Array<number>): string =>
  parseInt(binary.join(''), 2).toString(16).padStart(2, '0')

const rowToHex = (row: Array<Array<number>>): string[] => row.map(binaryToHex)

export const toHex = (tile: Array<Array<number>>): Array<string> =>
  to2BPP(tile).reduce((acc, row) => acc.concat(rowToHex(row)), [])
