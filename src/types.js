// @flow

export type UUID = string

export type AppState = {
  activeColor: Color,
  activePalette: Palette,
  activeTile: UUID,
  tiles: Tile[],
  tileMaps: TileMap[],
}

export type ActiveColorSetAction = {
  payload: Color,
  type: 'ACTIVE_COLOR_SET',
}

export type ActiveTileSetAction = {
  payload: {
    id: UUID,
  },
  type: 'ACTIVE_TILE_SET',
}

export type TileClearedAction = {
  payload: {
    id: UUID,
  },
  type: 'TILE_CLEARED',
}

export type TileCreatedAction = {
  payload: {
    tile: Tile,
  },
  type: 'TILE_CREATED',
}

export type TileDeletedAction = {
  payload: {
    id: UUID,
  },
  type: 'TILE_DELETED',
}

export type TileUpdatedAction = {
  payload: {
    tile: Tile,
  },
  type: 'TILE_UPDATED',
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
  id: UUID,
  name: string,
}

export type TileMap = {
  height: number, // in tiles
  id: UUID,
  name: string,
  map: Array<Array<?UUID>>,
  width: number, // in tiles
}
