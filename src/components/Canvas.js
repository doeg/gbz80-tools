// @flow
/* eslint-disable */
import cloneDeep from 'lodash/cloneDeep'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './canvas.css'
import { updateTile } from '../actions'
import { getActiveTile } from '../selectors'
import type {
  AppState,
  Color,
  Coords,
  Palette,
  Pixel,
  PixelGrid,
  Tile,
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
  activeTile: Tile,
}

type DispatchProps = {
  updateTile: Tile => any,
}

type Props = OwnProps & MappedProps & DispatchProps

type State = {
  isClicking: boolean,
}

class Canvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // eslint-disable-next-line semi-style
    ;(this: any).updatePixel = this.updatePixel.bind(this)

    this.state = {
      isClicking: false,
    }
  }

  updatePixel({ x, y }: Coords) {
    const { activeColor } = this.props
    const activeTile = cloneDeep(this.props.activeTile)
    activeTile.grid[y][x] = {
      ...activeTile.grid[y][x],
      color: activeColor,
    }
    this.props.updateTile(activeTile)
  }

  render() {
    const { activeColor, activePalette, activeTile, height, width } = this.props

    const hex = convert
      .toHex(toColorGrid(activeTile.grid))
      .map(h => `${h}`)
      .join(' ')

    const rows = []
    for (let y = 0; y < height; y++) {
      const pixels = []
      for (let x = 0; x < width; x++) {
        const pixel = activeTile.grid[y][x]
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
        <h3>
          {activeTile.name}
        </h3>
        <pre>
          {hex}
        </pre>
      </div>
    )
  }
}

const mapState = (state: AppState) => ({
  activeColor: state.activeColor,
  activePalette: state.activePalette,
  activeTile: getActiveTile(state),
})

const mapDispatch: DispatchProps = {
  updateTile,
}

export default connect(mapState, mapDispatch)(Canvas)
