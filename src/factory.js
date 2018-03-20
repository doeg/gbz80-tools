import { Pixel, PixelGrid, Tile } from './types'

export const makePixel = (): Pixel => ({
  color: 0,
})

export const makePixelGrid = (opts: {
  height: number,
  width: number,
}): PixelGrid => {
  const grid = []
  for (let y = 0; y < opts.height; y++) {
    grid[y] = new Array(opts.width)
    for (let x = 0; x < opts.width; x++) {
      grid[y][x] = makePixel()
    }
  }
  return grid
}

export const makeTile = (): Tile => ({
  grid: makePixelGrid({ height: 8, width: 8 }),
  name: 'untitled',
})
