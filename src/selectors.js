// @flow
import type { AppState, Color, Palette, Tile, TileMap, UUID } from './types'

export const getActiveTileID = ({ activeTile }: AppState): ?UUID => activeTile

export const getActiveTile = ({ activeTile, tiles }: AppState): ?Tile =>
  tiles.find(({ id }) => id === activeTile) || null

export const getPanelCoords = (state: AppState, panelID: string): Object =>
  state.panels[panelID]

export const getActiveTileMap = (state: AppState): ?TileMap => state.tileMaps[0]

export const getTiles = (state: AppState): Tile[] => state.tiles

export const getActivePalette = (state: AppState): ?Palette =>
  state.activePalette

export const getActiveColor = ({ activeColor }: AppState): Color => activeColor
