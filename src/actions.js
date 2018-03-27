// @flow
import * as factory from './factory'
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
  TileMapTileClearedAction,
  TileMapCreatedAction,
  TileMapTileSetAction,
  Tool,
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

export const duplicateTile = (tile: Tile): Object => ({
  payload: { tile },
  type: 'TILE_DUPLICATED',
})

export const flipTileHorizontal = (tileID: UUID): Object => ({
  payload: { tileID },
  type: 'TILE_FLIPPED_X',
})

export const flipTileVertical = (tileID: UUID): Object => ({
  payload: { tileID },
  type: 'TILE_FLIPPED_Y',
})

export const resetWorkspace = (): Object => ({
  type: 'WORKSPACE_RESET',
})

export const createTileMap = (): TileMapCreatedAction => ({
  payload: {
    tileMap: factory.makeTileMap({ height: 18, width: 20 }),
  },
  type: 'TILE_MAP_CREATED',
})

export const setMapTile = (opts: {
  tileMapID: UUID,
  coords: Coords,
  tileID: UUID,
}): TileMapTileSetAction => ({
  payload: opts,
  type: 'TILE_MAP_TILE_SET',
})

export const clearMapTile = (opts: {
  tileMapID: UUID,
  coords: Coords,
}): TileMapTileClearedAction => ({
  payload: opts,
  type: 'TILE_MAP_TILE_CLEARED',
})

export const setActiveTool = (tool: Tool): Object => ({
  payload: { tool },
  type: 'ACTIVE_TOOL_SET',
})
