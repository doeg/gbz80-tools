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
    case 'TILE_CLEARED':
      return clearTile(state, action)
    case 'TILE_CREATED':
      return createTile(state, action)
    case 'TILE_DELETED':
      return deleteTile(state, action)
    case 'TILE_UPDATED':
      return updateTile(state, action)
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

export default rootReducer
