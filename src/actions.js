// @flow

import type {
  ActiveColorSetAction,
  ActiveTileSetAction,
  Color,
  Tile,
  TileClearedAction,
  TileCreatedAction,
  TileUpdatedAction,
} from './types'

export const setActiveColor = (color: Color): ActiveColorSetAction => ({
  payload: color,
  type: 'ACTIVE_COLOR_SET',
})

export const setActiveTile = (tileName: string): ActiveTileSetAction => ({
  payload: {
    name: tileName,
  },
  type: 'ACTIVE_TILE_SET',
})

export const clearTile = (name: string): TileClearedAction => ({
  payload: { name },
  type: 'TILE_CLEARED',
})

export const createTile = (tile: Tile): TileCreatedAction => ({
  payload: { tile },
  type: 'TILE_CREATED',
})

export const updateTile = (tile: Tile): TileUpdatedAction => ({
  payload: { tile },
  type: 'TILE_UPDATED',
})
