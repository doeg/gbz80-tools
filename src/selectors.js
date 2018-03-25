// @flow
/* eslint-disable */
import flatten from 'lodash/flatten'
import { createSelector } from 'reselect'

import type { AppState, Palette, Tile, TileMap, UUID } from './types'
import * as convert from './util/convert'

export const getActiveTileID = ({ activeTile }: AppState): ?UUID => activeTile

export const getActiveTile = ({ activeTile, tiles }: AppState): ?Tile =>
  tiles.find(({ id }) => id === activeTile) || null

export const getPanelCoords = (state: AppState, panelID: string): Object =>
  state.panels[panelID]

export const getActiveTileMap = (state: AppState): ?TileMap => state.tileMaps[0]

export const getTiles = (state: AppState): Tile[] => state.tiles

export const getActivePalette = (state: AppState): ?Palette =>
  state.activePalette

// Exports an array of hex strings. Each hex string corresponds to a tile.
export const exportActiveTileMap: (
  state: AppState,
) => string[][] = createSelector(
  [getActiveTileMap, getTiles],
  (tileMap: ?TileMap, tiles: Tile[]) => {
    if (!tileMap) {
      return [[]]
    }

    return flatten(
      // $FlowFixMe
      tileMap.tiles.map((row: UUID[]) =>
        row.map((tileID: UUID) => {
          const tile = tileID ? tiles.find(t => t.id === tileID) : null
          if (!tile) {
            return []
          }

          const colorMap = tile.grid.map(row => row.map(({ color }) => color))
          return convert.toHex(colorMap).map(h => `$${h}`)
        }),
      ),
    )
  },
)
