// @flow
/* eslint-disable */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './canvas.css'
import type {
  AppState,
  Color,
  Coords,
  Palette,
  Pixel,
  PixelGrid,
} from '../types'
import * as pixelGrid from '../util/pixel-grid'
import * as convert from '../util/convert'

const toColorGrid = (canvas: PixelGrid): Array<Array<number>> =>
  canvas.map(row => row.map(({ color }) => color))

type OwnProps = {
  height: number, // in pixels
  width: number, // in pixels
}

type MappedProps = {
  activeColor: Color,
  activePalette: Palette,
}

type Props = OwnProps & MappedProps

type State = {
  canvas: PixelGrid,
  isClicking: boolean,
}

class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // eslint-disable-next-line semi-style
    ;(this: any).updatePixel = this.updatePixel.bind(this)

    const { height, width } = this.props
    const canvas = pixelGrid.mkGrid({ height, width })
    this.state = {
      canvas,
      isClicking: false,
    }
  }

  updatePixel({ x, y }: Coords) {
    const { activeColor } = this.props
    const { canvas } = this.state
    canvas[y][x] = {
      ...canvas[y][x],
      color: activeColor,
    }
    this.setState({ canvas })
  }

  render() {
    const { activeColor, activePalette, height, width } = this.props

    const hex = convert
      .toHex(toColorGrid(this.state.canvas))
      .map(h => `${h}`)
      .join(' ')

    const rows = []
    for (let y = 0; y < height; y++) {
      const pixels = []
      for (let x = 0; x < width; x++) {
        const pixel = this.state.canvas[y][x]
        const pixelStyle = {
          backgroundColor: activePalette[pixel.color],
        }

        const update = () => this.updatePixel({ x, y })

        const onMouseEnter = () => {
          if (this.state.isClicking) {
            update()
          }
        }

        pixels.push(
          <td
            className={style.pixel}
            key={`${y}-${x}`}
            onClick={update}
            onMouseEnter={onMouseEnter}
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

    const onMouseDown = () => this.setState({ isClicking: true })
    const onMouseUp = () => this.setState({ isClicking: false })

    return (
      <div className={style.container}>
        <table
          className={style.canvas}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <tbody>
            {rows}
          </tbody>
        </table>
        <pre>
          {hex}
        </pre>
      </div>
    )
  }
}

const mapState = ({ activeColor, activePalette }: AppState) => ({
  activeColor,
  activePalette,
})

export default connect(mapState)(Canvas)
