// @flow

import type {
  ActiveColorSetAction,
  ActiveTileSetAction,
  Color,
  Coords,
  Tile,
  TileClearedAction,
  TileCreatedAction,
  TileDeletedAction,
  TileUpdatedAction,
  TileMap,
  TileMapTileClearedAction,
  TileMapCreatedAction,
  TileMapTileSetAction,
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

export const createTileMap = (tileMap: TileMap): TileMapCreatedAction => ({
  payload: { tileMap },
  type: 'TILE_MAP_CREATED',
})

export const setMapTile = (
  tileMapID: UUID,
  coords: Coords,
  tileID: UUID,
): TileMapTileSetAction => ({
  payload: { tileMapID, tileID, coords },
  type: 'TILE_MAP_TILE_SET',
})

export const clearMapTile = (
  tileMapID: UUID,
  coords: Coords,
): TileMapTileClearedAction => ({
  payload: { tileMapID, coords },
  type: 'TILE_MAP_TILE_CLEARED',
})
