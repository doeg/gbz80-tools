// @flow
/* eslint-disable semi-style, react/no-array-index-key */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapCanvas.css'
import PixelGrid from './PixelGrid'
import { setMapTile, clearMapTile } from '../actions'
import {
  getActivePalette,
  getActiveTileMap,
  getActiveTile,
  getTiles,
} from '../selectors'
import type { AppState, Palette, Tile, TileMap } from '../types'

type MappedProps = {
  activePalette: ?Palette,
  activeTile: ?Tile,
  tileMap: ?TileMap,
  tiles: Tile[],
}

type DispatchProps = {
  setMapTile: Function,
  clearMapTile: Function,
}

type Props = DispatchProps & MappedProps

class TileMapCanvas extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    ;(this: any).onClickCell = this.onClickCell.bind(this)
    ;(this: any).renderCell = this.renderCell.bind(this)
  }

  onClickCell(rowIdx: number, colIdx: number, e: Event) {
    const { activeTile, tileMap } = this.props
    if (!activeTile || !tileMap) {
      return
    }

    if (e.shiftKey) {
      this.props.clearMapTile({
        tileMapID: tileMap.id,
        coords: { y: rowIdx, x: colIdx },
      })
    } else {
      this.props.setMapTile({
        tileMapID: tileMap.id,
        coords: { y: rowIdx, x: colIdx },
        tileID: activeTile.id,
      })
    }
  }

  renderCell(rowIdx: number, colIdx: number) {
    const { activePalette, tileMap, tiles } = this.props
    if (!activePalette || !tileMap) {
      return null
    }

    const tileID = tileMap.tiles[rowIdx][colIdx]
    const tile = (tiles || []).find(t => t.id === tileID)

    let contents = null
    if (tile) {
      contents = <PixelGrid grid={tile.grid} palette={activePalette} />
    }

    const onClick = (e: Event) => this.onClickCell(rowIdx, colIdx, e)
    return (
      <div className={style.cell} key={`${rowIdx}-${colIdx}`} onClick={onClick}>
        {contents}
      </div>
    )
  }

  render() {
    const { tileMap } = this.props
    if (!tileMap) {
      return null
    }

    const rows = tileMap.tiles.map((row, rowIdx) => (
      <div className={style.row} key={rowIdx}>
        {row.map((cell, colIdx) => this.renderCell(rowIdx, colIdx))}
      </div>
    ))

    return <div className={style.grid}>{rows}</div>
  }
}

const mapState = (state: AppState): MappedProps => ({
  activePalette: getActivePalette(state),
  activeTile: getActiveTile(state),
  tileMap: getActiveTileMap(state),
  tiles: getTiles(state),
})

const mapDispatch: DispatchProps = {
  setMapTile,
  clearMapTile,
}

export default connect(mapState, mapDispatch)(TileMapCanvas)
