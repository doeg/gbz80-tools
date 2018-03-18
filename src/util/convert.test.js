import * as convert from './convert'

const TILE = [
  [0, 3, 3, 3, 3, 3, 0, 0],
  [2, 2, 0, 0, 0, 2, 2, 0],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [2, 2, 2, 2, 2, 2, 2, 0],
  [3, 3, 0, 0, 0, 3, 3, 0],
  [2, 2, 0, 0, 0, 2, 2, 0],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

describe('to2BPP', () => {
  it('converts a tile to a 2BPP array pair', () => {
    const expected = [
      [[0, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 0, 0]],
      [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0]],
      [[1, 1, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
      [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0]],
      [[1, 1, 0, 0, 0, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1, 0]],
      [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0]],
      [[1, 1, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
      [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
    ]

    const result = convert.to2BPP(TILE)
    result.forEach((row, idx) => {
      expect(row).toEqual(expected[idx])
    })
  })
})

describe('toHex', () => {
  it('converts a tile to an array of 2-byte hex digits', () => {
    expect(convert.toHex(TILE)).toEqual([
      '7c',
      '7c',
      '00',
      'c6',
      'c6',
      '00',
      '00',
      'fe',
      'c6',
      'c6',
      '00',
      'c6',
      'c6',
      '00',
      '00',
      '00',
    ])
  })
})