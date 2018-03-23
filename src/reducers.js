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
} from './types'

const makeDefaultState = (): AppState => {
  const defaultTile = factory.makeTile()
  return {
    activeColor: 3,
    activePalette: ['#FFFFFF', '#999999', '#444444', '#000000'],
    activeTile: defaultTile.id,
    panels: {
      CanvasPanel: { top: 0, left: 260 },
      TileMapCanvasPanel: { top: 0, left: 260 },
      TilePanel: { top: 0, left: 0 },
    },
    tiles: [defaultTile],
    tileMaps: [factory.makeTileMap()],
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
    case 'TILE_MAP_SIZE_UPDATED':
      return updateTileMapSize(state, action)
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

const updateTileMapSize = (state: AppState, action: Object): AppState => {
  const { height, tileMapID, width } = action.payload

  const tileMapIdx = state.tileMaps.findIndex(t => t.id === tileMapID)
  const tileMap = state.tileMaps[tileMapIdx]

  if (tileMapIdx < 0 || !tileMap) {
    return state
  }

  let nextMap = tileMap.map || []

  // Need to resize rows to be wider
  const widthDiff = width - tileMap.width
  if (widthDiff > 0) {
    nextMap = tileMap.map.map(row => {
      const nextRow = []
      for (let i = 0; i < width; i++) {
        const nextCell = i < row.length ? row[i] : null
        nextRow.push(nextCell)
      }
      return nextRow
    })
  }

  // Need to resize map to be taller
  const heightDiff = height - tileMap.height
  for (let i = 0; i < heightDiff; i++) {
    nextMap.push(Array(width).fill(null))
  }

  return update(state, {
    tileMaps: {
      [tileMapIdx]: {
        height: { $set: height },
        map: { $set: nextMap },
        width: { $set: width },
      },
    },
  })
}

export default rootReducer
