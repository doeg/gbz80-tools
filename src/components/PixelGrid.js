// @flow
/* eslint-disable react/no-array-index-key */

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
      {grid.map((row, rowIdx) =>
        <tr key={rowIdx}>
          {row.map(({ color }, pixelIdx) =>
            <td
              className={style.pixel}
              key={`${rowIdx}-${pixelIdx}`}
              style={{ backgroundColor: palette[color] }}
            />
          )}
        </tr>
      )}
    </tbody>
  </table>

export default PixelGrid
