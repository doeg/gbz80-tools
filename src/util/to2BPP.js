const rowTo2BPP = (row: number[]): Array<Array<number>> => {
  const byte0 = []
  const byte1 = []

  row.forEach(pixel => {
    byte0.push(pixel & 1)
    byte1.push(pixel >> 1)
  })

  return [byte0, byte1]
}

export default (tile: Array<Array<number>>): Array<Array<number>> =>
  tile.map(row => rowTo2BPP(row))
