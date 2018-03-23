// @flow
import type { AppState, Tile, TileMap, UUID } from './types'

export const getActiveTileID = ({ activeTile }: AppState): ?UUID => activeTile

export const getActiveTile = ({ activeTile, tiles }: AppState): ?Tile =>
  tiles.find(({ id }) => id === activeTile) || null

export const getPanelCoords = (state: AppState, panelID: string): Object =>
  state.panels[panelID]

// eslint-disable-next-line no-confusing-arrow
export const getActiveTileMap = (state: AppState): ?TileMap =>
  state.tileMaps.length ? state.tileMaps[0] : null
