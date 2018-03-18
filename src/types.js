// @flow

export type Coords = {
  x: number, // pixels
  y: number, // pixels
}

export type Pixel = {
  color: 0 | 1 | 2 | 3,
}

export type PixelGrid = Array<Array<Pixel>>
