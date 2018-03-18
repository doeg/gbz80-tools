// @flow
import * as React from 'react'

import style from './pixelGrid.css'
import type { Palette, PixelGrid as PixelGridType } from '../types'

type Props = {
  grid: PixelGridType,
  palette: Palette,
}

const PixelGrid = ({ grid, palette }: Props) =>
  <table className={style.grid}>
    <tbody>
      {grid.map(row =>
        <tr>
          {row.map(({ color }) =>
            <td
              className={style.pixel}
              style={{ backgroundColor: palette[color] }}
            />
          )}
        </tr>
      )}
    </tbody>
  </table>

export default PixelGrid
