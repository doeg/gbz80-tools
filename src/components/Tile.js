// @flow
import cloneDeep from 'lodash/cloneDeep'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tile.css'
import PixelGrid from './PixelGrid'
import { updateTile } from '../actions'
import * as select from '../selectors'
import type { AppState, Color, Coords, Palette, Tile, UUID } from '../types'

type OwnProps = {
  editable?: boolean,
  id: UUID,
}

type MappedProps = {
  activeColor: Color,
  activePalette: Palette,
  tile: Tile,
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
    const { activeColor, editable } = this.props
    if (!editable) {
      return
    }

    const tile = cloneDeep(this.props.tile)
    tile.grid[y][x] = {
      ...tile.grid[y][x],
      color: activeColor,
    }
    this.props.updateTile(tile)
  }

  render() {
    const { activePalette, tile } = this.props

    if (!tile) {
      return null
    }

    const onMouseDown = () => this.setState({ isClicking: true })
    const onMouseUp = () => this.setState({ isClicking: false })
    const onMouseEnterPixel = (coords: Coords) => {
      if (this.state.isClicking) {
        this.updatePixel(coords)
      }
    }

    return (
      <div>
        <PixelGrid
          className={style.canvas}
          grid={tile.grid}
          onClickPixel={this.updatePixel}
          onMouseDown={onMouseDown}
          onMouseEnterPixel={onMouseEnterPixel}
          onMouseUp={onMouseUp}
          palette={activePalette}
        />
      </div>
    )
  }
}

const mapState = (state: AppState, { id }: OwnProps) => ({
  activeColor: state.activeColor,
  activePalette: state.activePalette,
  tile: select.getTile(state, id),
})

const mapDispatch: DispatchProps = {
  updateTile,
}

export default connect(mapState, mapDispatch)(Canvas)
