// @flow

import type {
  ActiveColorSetAction,
  ActiveTileSetAction,
  Color,
  Tile,
  TileClearedAction,
  TileCreatedAction,
  TileDeletedAction,
  TileUpdatedAction,
  UUID,
} from './types'

export const setActiveColor = (color: Color): ActiveColorSetAction => ({
  payload: color,
  type: 'ACTIVE_COLOR_SET',
})

export const setActiveTile = (id: UUID): ActiveTileSetAction => ({
  payload: { id },
  type: 'ACTIVE_TILE_SET',
})

export const clearTile = (id: UUID): TileClearedAction => ({
  payload: { id },
  type: 'TILE_CLEARED',
})

export const deleteTile = (id: UUID): TileDeletedAction => ({
  payload: { id },
  type: 'TILE_DELETED',
})

export const createTile = (tile: Tile): TileCreatedAction => ({
  payload: { tile },
  type: 'TILE_CREATED',
})

export const updateTile = (tile: Tile): TileUpdatedAction => ({
  payload: { tile },
  type: 'TILE_UPDATED',
})

export const updatePanel = ({ id, top, left }: Object): Object => ({
  payload: { id, top, left },
  type: 'PANEL_UPDATED',
})

export const resetWorkspace = (): Object => ({
  type: 'WORKSPACE_RESET',
})

export const updateTileMapSize = (opts: {
  height: number,
  tileMapID: string,
  width: number,
}): Object => ({
  payload: opts,
  type: 'TILE_MAP_SIZE_UPDATED',
})
