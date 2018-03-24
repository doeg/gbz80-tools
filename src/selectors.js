// @flow
import type { AppState, Palette, Tile, TileMap, UUID } from './types'

export const getTiles = ({ tiles }: AppState): Tile[] => tiles

export const getActiveTileID = ({ activeTile }: AppState): ?UUID => activeTile

export const getActiveTile = ({ activeTile, tiles }: AppState): ?Tile =>
  tiles.find(({ id }) => id === activeTile) || null

export const getPanelCoords = (state: AppState, panelID: string): Object =>
  state.panels[panelID]

// eslint-disable-next-line no-confusing-arrow
export const getActiveTileMap = (state: AppState): ?TileMap =>
  state.tileMaps.length ? state.tileMaps[0] : null

export const getActivePalette = ({ activePalette }: AppState): ?Palette =>
  activePalette
