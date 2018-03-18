// @flow
import * as React from 'react'

import style from './canvas.css'
import type { Coords, Pixel, PixelGrid } from '../types'
import * as pixelGrid from '../util/pixel-grid'

const PALETTE = ['#FFFFFF', '#999999', '#444444', '#000000']

type Props = {
  height: number, // in pixels
  width: number, // in pixels
}

type State = {
  canvas: PixelGrid,
}

class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // eslint-disable-next-line semi-style
    ;(this: any).updatePixel = this.updatePixel.bind(this)

    const { height, width } = this.props
    const canvas = pixelGrid.mkGrid({ height, width })
    this.state = { canvas }
  }

  updatePixel({ x, y }: Coords, pixel: Pixel) {
    const { canvas } = this.state
    canvas[y][x] = pixel
    this.setState({ canvas })
  }

  render() {
    const { height, width } = this.props
    const rows = []
    for (let y = 0; y < height; y++) {
      const pixels = []
      for (let x = 0; x < width; x++) {
        const pixel = this.state.canvas[y][x]
        const pixelStyle = {
          backgroundColor: PALETTE[pixel.color],
        }

        const onClick = () =>
          this.updatePixel({ x, y }, { color: pixel.color ? 0 : 1 })

        pixels.push(
          <td
            className={style.pixel}
            key={`${y}-${x}`}
            onClick={onClick}
            style={pixelStyle}
          />
        )
      }

      rows.push(
        <tr key={y}>
          {pixels}
        </tr>
      )
    }

    return (
      <table className={style.canvas}>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default Canvas
