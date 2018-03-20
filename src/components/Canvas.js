// @flow
/* eslint-disable */
import cloneDeep from 'lodash/cloneDeep'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './canvas.css'
import PixelGrid from './PixelGrid'
import { updateTile } from '../actions'
import { getActiveTile } from '../selectors'
import type {
  AppState,
  Color,
  Coords,
  Palette,
  Pixel,
  PixelGrid as PixelGridType,
  Tile,
} from '../types'
import * as factory from '../factory'
import * as convert from '../util/convert'

// $FlowFixMe
const toColorGrid = (canvas: PixelGrid): Array<Array<number>> =>
  // $FlowFixMe
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

    const onMouseDown = () => this.setState({ isClicking: true })
    const onMouseUp = () => this.setState({ isClicking: false })
    const onMouseEnterPixel = (coords: Coords) => {
      if (this.state.isClicking) {
        this.updatePixel(coords)
      }
    }

    return (
      <div className={style.container}>
        <PixelGrid
          className={style.canvas}
          grid={activeTile.grid}
          onClickPixel={this.updatePixel}
          onMouseDown={onMouseDown}
          onMouseEnterPixel={onMouseEnterPixel}
          onMouseUp={onMouseUp}
          palette={activePalette}
        />
        <h3>{activeTile.name}</h3>
        <pre>{hex}</pre>
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
