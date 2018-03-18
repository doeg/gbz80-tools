// @flow
import type { PixelGrid } from '../types'

export const mkPixel = () => ({
  color: 0,
})

export const mkGrid = (opts: { height: number, width: number }): PixelGrid => {
  const grid = []
  for (let y = 0; y < opts.height; y++) {
    grid[y] = new Array(opts.width)
    for (let x = 0; x < opts.width; x++) {
      grid[y][x] = mkPixel()
    }
  }
  return grid
}
