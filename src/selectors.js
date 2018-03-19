// @flow
import type { AppState, Tile } from './types'

export const getActiveTile = ({ activeTile, tiles }: AppState): ?Tile =>
  tiles.find(({ name }) => name === activeTile)
