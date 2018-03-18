// @flow

type Color = 0 | 1 | 2 | 3

/*
 * An array of four color strings.
 * Order is important! A color's array index will also be its palette bit.
 * Generally the color at index 0 is the lightest color, and the color
 * at index 3 is the darkest color.
 *
 * Example: ['#000', '#444', '#8888', '#FFF']
 */
type Palette = string[]

export type Coords = {
  x: number, // pixels
  y: number, // pixels
}

export type Pixel = {
  color: 0 | 1 | 2 | 3,
}

export type PixelGrid = Array<Array<Pixel>>
