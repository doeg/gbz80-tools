// @flow
import type { AppState, Palette, Tile, TileMap, UUID } from './types'

export const getActiveTileID = ({ activeTile }: AppState): ?UUID => activeTile

export const getActiveTile = ({ activeTile, tiles }: AppState): ?Tile =>
  tiles.find(({ id }) => id === activeTile) || null

export const getPanelCoords = (state: AppState, panelID: string): Object =>
  state.panels[panelID]

export const getActiveTileMap = (state: AppState): ?TileMap => state.tileMaps[0]

export const getTiles = (state: AppState): Tile[] => state.tiles

export const getTile = (state: AppState, id: UUID): ?Tile =>
  getTiles(state).find(t => t.id === id) || null

export const getActivePalette = (state: AppState): ?Palette =>
  state.activePalette
