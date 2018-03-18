// @flow

export type AppState = {
  activeColor: Color,
  activePalette: Palette,
  activeTile: string,
  tiles: Tile[],
}

export type ActiveColorSetAction = {
  payload: Color,
  type: 'ACTIVE_COLOR_SET',
}

export type ActiveTileSetAction = {
  payload: {
    name: string,
  },
  type: 'ACTIVE_TILE_SET',
}

export type TileCreatedAction = {
  payload: {
    tile: Tile,
  },
  type: 'TILE_CREATED',
}

export type Action = ActiveColorSetAction

/*
 * An index into a Palette.
 */
export type Color = 0 | 1 | 2 | 3

/*
 * An array of four color strings.
 * Order is important! A color's array index will also be its palette bit.
 * Generally the color at index 0 is the lightest color, and the color
 * at index 3 is the darkest color.
 *
 * Example: ['#000', '#444', '#8888', '#FFF']
 */
export type Palette = string[]

export type Coords = {
  x: number, // pixels
  y: number, // pixels
}

export type Pixel = {
  color: 0 | 1 | 2 | 3,
}

export type PixelGrid = Array<Array<Pixel>>

export type Tile = {
  grid: PixelGrid,
  name: string,
}
