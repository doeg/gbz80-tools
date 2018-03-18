// @flow
import update from 'immutability-helper'
import { makeEmptyGrid } from './util/pixel-grid'
import type {
  Action,
  ActiveColorSetAction,
  ActiveTileSetAction,
  AppState,
  TileCreatedAction,
} from './types'

const makeDefaultState = (): AppState => {
  const defaultTile = {
    grid: makeEmptyGrid({ height: 8, width: 8 }),
    name: 'tile-0',
  }

  return {
    activeColor: 3,
    activePalette: ['#FFFFFF', '#999999', '#444444', '#000000'],
    activeTile: defaultTile.name,
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
    case 'TILE_CREATED':
      return createTile(state, action)
    default:
      return state
  }
}

const createTile = (
  state: AppState,
  { payload: { tile } }: TileCreatedAction
): AppState => update(state, { tiles: { $push: [tile] } })

const setActiveColor = (
  state: AppState,
  { payload }: ActiveColorSetAction
): AppState => update(state, { activeColor: { $set: payload } })

const setActiveTile = (
  state: AppState,
  { payload: { name } }: ActiveTileSetAction
): AppState => update(state, { activeTile: { $set: name } })

export default rootReducer
