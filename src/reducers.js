// @flow
import update from 'immutability-helper'

import * as factory from './factory'
import type {
  Action,
  ActiveColorSetAction,
  ActiveTileSetAction,
  AppState,
  TileClearedAction,
  TileCreatedAction,
  TileDeletedAction,
  TileUpdatedAction,
  TileMapTileClearedAction,
  TileMapCreatedAction,
  TileMapTileSetAction,
} from './types'

const makeDefaultState = (): AppState => {
  const defaultTile = factory.makeTile()
  return {
    activeColor: 3,
    activePalette: ['#FFFFFF', '#999999', '#444444', '#000000'],
    activeTile: defaultTile.id,
    panels: {
      TilePanel: { top: 0, left: 0 },
      CanvasPanel: { top: 0, left: 260 },
    },
    tileMaps: [],
    tiles: [defaultTile],
  }
}

const initialState = makeDefaultState()

const rootReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case 'ACTIVE_COLOR_SET':
      return setActiveColor(state, action)
    case 'ACTIVE_TILE_SET':
      return setActiveTile(state, action)
    case 'PANEL_UPDATED':
      return updatePanel(state, action)
    case 'TILE_CLEARED':
      return clearTile(state, action)
    case 'TILE_CREATED':
      return createTile(state, action)
    case 'TILE_DELETED':
      return deleteTile(state, action)
    case 'TILE_UPDATED':
      return updateTile(state, action)
    case 'TILE_MAP_CREATED':
      return createTileMap(state, action)
    case 'TILE_MAP_TILE_SET':
      return setMapTile(state, action)
    case 'TILE_MAP_TILE_CLEARED':
      return clearMapTile(state, action)
    case 'WORKSPACE_RESET':
      return resetWorkspace(state)
    default:
      return state
  }
}

const clearTile = (
  state: AppState,
  { payload: { id } }: TileClearedAction,
): AppState =>
  // FIXME this is janky
  updateTile(state, {
    payload: {
      tile: {
        ...factory.makeTile(),
        id,
      },
    },
    type: 'TILE_UPDATED',
  })

const createTile = (
  state: AppState,
  { payload: { tile } }: TileCreatedAction,
): AppState =>
  update(state, {
    activeTile: { $set: tile.id },
    tiles: { $push: [tile] },
  })

const deleteTile = (
  state: AppState,
  { payload: { id } }: TileDeletedAction,
): AppState => {
  const tileIndex = state.tiles.findIndex(tile => id === tile.id)
  if (tileIndex < 0) {
    return state
  }

  const tile = state.tiles[tileIndex]
  let activeTile = {}
  if (state.activeTile === tile.id) {
    const nextTileIdx = Math.max(tileIndex - 1, 0)
    const nextTileID = (state.tiles[nextTileIdx] || {}).id
    activeTile = { $set: nextTileID }
  }

  return update(state, {
    activeTile,
    tiles: { $splice: [[tileIndex, 1]] },
  })
}

const setActiveColor = (
  state: AppState,
  { payload }: ActiveColorSetAction,
): AppState => update(state, { activeColor: { $set: payload } })

const setActiveTile = (
  state: AppState,
  { payload: { id } }: ActiveTileSetAction,
): AppState => update(state, { activeTile: { $set: id } })

const updateTile = (
  state: AppState,
  { payload: { tile } }: TileUpdatedAction,
): AppState => {
  const tileIndex = state.tiles.findIndex(({ id }) => id === tile.id)

  // no-nop
  if (tileIndex < 0) {
    return state
  }

  return update(state, {
    tiles: {
      [tileIndex]: { $set: tile },
    },
  })
}

const updatePanel = (
  state: AppState,
  { payload: { id, top, left } }: Object,
): AppState =>
  update(state, {
    panels: {
      [id]: { $set: { top, left } },
    },
  })

const resetWorkspace = (state: AppState): AppState =>
  update(state, {
    panels: { $set: makeDefaultState().panels },
  })

const createTileMap = (
  state: AppState,
  { payload }: TileMapCreatedAction,
): AppState =>
  update(state, {
    tileMaps: { $push: [payload.tileMap] },
  })

const clearMapTile = (
  state: AppState,
  { payload: { tileMapID, coords } }: TileMapTileClearedAction,
): AppState => {
  const tileMapIdx = state.tileMaps.findIndex(({ id }) => id === tileMapID)
  if (tileMapIdx < 0) {
    return state
  }

  return update(state, {
    tileMaps: {
      [tileMapIdx]: {
        tiles: {
          [coords.y]: {
            [coords.x]: { $set: null },
          },
        },
      },
    },
  })
}

const setMapTile = (
  state: AppState,
  { payload: { coords, tileID, tileMapID } }: TileMapTileSetAction,
): AppState => {
  const tileMapIdx = state.tileMaps.findIndex(({ id }) => id === tileMapID)
  if (tileMapIdx < 0) {
    return state
  }

  return update(state, {
    tileMaps: {
      [tileMapIdx]: {
        tiles: {
          [coords.y]: {
            [coords.x]: { $set: tileID },
          },
        },
      },
    },
  })
}

export default rootReducer
