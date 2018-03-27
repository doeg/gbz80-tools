// @flow

export type UUID = string

export type AppState = {
  activeColor: Color,
  activePalette: Palette,
  activeTile: UUID,
  activeTool: Tool,
  panels: {
    [panelID: string]: {
      left: number,
      top: number,
    },
  },
  tileMaps: TileMap[],
  tiles: Tile[],
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

export type TileMapCreatedAction = {
  payload: {
    tileMap: TileMap,
  },
  type: 'TILE_MAP_CREATED',
}

export type TileMapTileSetAction = {
  payload: {
    tileMapID: UUID,
    tileID: UUID,
    coords: Coords,
  },
  type: 'TILE_MAP_TILE_SET',
}

export type TileMapTileClearedAction = {
  payload: {
    tileMapID: UUID,
    coords: Coords,
  },
  type: 'TILE_MAP_TILE_CLEARED',
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
  id: UUID,
  name: ?string,
  // A grid of tile IDs
  tiles: Array<Array<?UUID>>,
}

export const tools = {
  cursor: 'cursor',
  pencil: 'pencil',
}

export type Tool = 'cursor' | 'pencil'
