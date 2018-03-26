// @flow
/* eslint-disable react/no-array-index-key */
import cx from 'classnames'
import * as React from 'react'

import style from './pixelGrid.css'
import type {
  Coords,
  Palette,
  Pixel,
  PixelGrid as PixelGridType,
} from '../types'

type Props = {
  className?: string,
  grid: PixelGridType,
  onClickPixel?: (c: Coords, p: Pixel) => any,
  onMouseEnterPixel?: (c: Coords, p: Pixel) => any,
  palette: Palette,
  size?: number,
}

const PixelGrid = ({
  className,
  grid,
  onClickPixel,
  onMouseEnterPixel,
  palette,
  size,
  ...props
}: Props) => {
  const rows = grid.map((row: Pixel[], y: number) => {
    const pixels = row.map((pixel: Pixel, x: number) => {
      const coords = { x, y }
      const onClick = () => {
        if (typeof onClickPixel === 'function') {
          onClickPixel(coords, pixel)
        }
      }

      const onMouseEnter = () => {
        if (typeof onMouseEnterPixel === 'function') {
          onMouseEnterPixel(coords, pixel)
        }
      }

      return (
        <td
          className={style.pixel}
          key={JSON.stringify(coords)}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          style={{
            backgroundColor: palette[pixel.color],
            height: size,
            width: size,
          }}
        />
      )
    })

    return <tr key={y}>{pixels}</tr>
  })

  return (
    <table className={cx(style.grid, className)} {...props}>
      <tbody>{rows}</tbody>
    </table>
  )
}

PixelGrid.defaultProps = {
  className: '',
  onClickPixel: () => {},
  onMouseEnterPixel: () => {},
  size: 4,
}

export default PixelGrid
