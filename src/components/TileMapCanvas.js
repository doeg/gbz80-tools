// @flow
/* eslint-disable semi-style, react/no-array-index-key, object-curly-newline */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapCanvas.css'
import Tile from './Tile'
import { setActiveTile, setMapTile, clearMapTile } from '../actions'
import * as select from '../selectors'
import { tools } from '../types'
import type {
  AppState,
  Coords,
  Palette,
  Tile as TileObj,
  TileMap,
  Tool,
} from '../types'

type MappedProps = {
  activePalette: ?Palette,
  activeTile: ?TileObj,
  activeTool: ?Tool,
  tileMap: ?TileMap,
  tiles: TileObj[],
}

type DispatchProps = {
  setMapTile: Function,
  clearMapTile: Function,
  setActiveTile: Function,
}

type State = {
  hoverCell: ?Coords,
}

type Props = DispatchProps & MappedProps

class TileMapCanvas extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    ;(this: any).onClickCell = this.onClickCell.bind(this)
    ;(this: any).onMouseEnterCell = this.onMouseEnterCell.bind(this)
    ;(this: any).onMouseLeaveGrid = this.onMouseLeaveGrid.bind(this)
    ;(this: any).renderCell = this.renderCell.bind(this)

    this.state = {
      hoverCell: null,
    }
  }

  onClickCell(rowIdx: number, colIdx: number, e: Event) {
    const { activeTile, activeTool, tileMap } = this.props
    if (!activeTile || !tileMap) {
      return
    }

    const coords = { x: colIdx, y: rowIdx }

    if (activeTool === tools.cursor) {
      const clickedTile = tileMap.tiles[rowIdx][colIdx]
      if (clickedTile) {
        this.props.setActiveTile(clickedTile)
      }
    } else if (activeTool === tools.pencil) {
      if (e.shiftKey) {
        this.props.clearMapTile({
          tileMapID: tileMap.id,
          coords,
        })
      } else {
        this.props.setMapTile({
          tileMapID: tileMap.id,
          coords,
          tileID: activeTile.id,
        })
      }
    }
  }

  onMouseEnterCell(coords: Coords) {
    this.setState({ hoverCell: coords })
  }

  onMouseLeaveGrid() {
    this.setState({ hoverCell: null })
  }

  renderCell(rowIdx: number, colIdx: number) {
    const { activePalette, activeTile, tileMap, tiles } = this.props
    if (!activePalette || !tileMap) {
      return null
    }

    const coords = { x: colIdx, y: rowIdx }
    const { hoverCell } = this.state
    let isHovered = false
    if (hoverCell) {
      isHovered = coords.y === hoverCell.y && coords.x === hoverCell.x
    }

    const tileID = tileMap.tiles[rowIdx][colIdx]
    const tile = (tiles || []).find(t => t.id === tileID)

    let contents = null
    if (isHovered && activeTile) {
      contents = <Tile id={activeTile.id} size={4} />
    } else if (tile) {
      contents = <Tile id={tile.id} size={4} />
    }

    const onClick = (e: Event) => this.onClickCell(rowIdx, colIdx, e)
    const onMouseEnterCell = () => this.onMouseEnterCell(coords)

    return (
      <td
        className={style.cell}
        key={`${rowIdx}-${colIdx}`}
        onClick={onClick}
        onMouseEnter={onMouseEnterCell}
      >
        {contents}
      </td>
    )
  }

  render() {
    const { tileMap } = this.props
    if (!tileMap) {
      return null
    }

    const rows = tileMap.tiles.map((row, rowIdx) => (
      <tr
        className={style.row}
        key={rowIdx}
        onMouseLeave={this.onMouseLeaveGrid}
      >
        {row.map((cell, colIdx) => this.renderCell(rowIdx, colIdx))}
      </tr>
    ))

    return (
      <table className={style.grid}>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

const mapState = (state: AppState): MappedProps => ({
  activePalette: select.getActivePalette(state),
  activeTile: select.getActiveTile(state),
  activeTool: select.getActiveTool(state),
  tileMap: select.getActiveTileMap(state),
  tiles: select.getTiles(state),
})

const mapDispatch: DispatchProps = {
  setMapTile,
  clearMapTile,
  setActiveTile,
}

export default connect(mapState, mapDispatch)(TileMapCanvas)
