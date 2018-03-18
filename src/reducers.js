// @flow
import update from 'immutability-helper'
import { makeEmptyGrid } from './util/pixel-grid'
import type { Action, ActiveColorSetAction, AppState } from './types'

const makeDefaultState = (): AppState => ({
  activeColor: 3,
  activePalette: ['#FFFFFF', '#999999', '#444444', '#000000'],
  tiles: [
    {
      grid: makeEmptyGrid({ height: 8, width: 8 }),
      name: 'tile-0',
    },
  ],
})

const initialState = makeDefaultState()

const rootReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case 'ACTIVE_COLOR_SET':
      return setActiveColor(state, action)
    default:
      return state
  }
}

const setActiveColor = (
  state: AppState,
  { payload }: ActiveColorSetAction
): AppState => update(state, { activeColor: { $set: payload } })

export default rootReducer
