// @flow
/* eslint-disable */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapCanvasPanel.css'
import CanvasSizeInput from './CanvasSizeInput'
import Panel from './Panel'
import PixelGrid from './PixelGrid'
import { setTileMapTile } from '../actions'
import {
  getActivePalette,
  getActiveTileID,
  getActiveTileMap,
  getTiles,
} from '../selectors'

type MappedProps = {
  tileMap: ?TileMap,
}

type DispatchProps = {
  setTileMapTile: Function,
}

type Props = MappedProps & DispatchProps

class TileMapCanvasPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onClickCell = this.onClickCell.bind(this)
    this.renderCell = this.renderCell.bind(this)
  }

  onClickCell(row, col) {
    const { activeTileID, tileMap } = this.props
    if (!activeTileID || !tileMap) {
      return
    }

    this.props.setTileMapTile({
      coords: {
        x: col,
        y: row,
      },
      tileID: activeTileID,
      tileMapID: tileMap.id,
    })
  }

  renderCell(row, col) {
    const { activePalette, tiles, tileMap } = this.props
    const onClick = this.onClickCell(row, col)

    const tileID = tileMap.map[row][col]
    const tile = tiles.find(t => t.id === tileID)
    return (
      <div className={style.cell} key={`${row}-${col}`}>
        <PixelGrid grid={tile.grid} palette={activePalette} />
      </div>
    )
  }

  render() {
    const { tileMap } = this.props
    const title = tileMap ? `${tileMap.name} - Tile Map` : 'Tile Map'

    return (
      <Panel height={720} id="TileMapCanvasPanel" title={title} width={720}>
        <CanvasSizeInput />
        <div className={style.grid}>
          {tileMap.map.map((row, rdx) => (
            <div className={style.row} key={rdx}>
              {row.map((cell, cdx) => this.renderCell(rdx, cdx))}
            </div>
          ))}
        </div>
      </Panel>
    )
  }
}

const mapState = (state: AppState): MappedProps => ({
  activePalette: getActivePalette(state),
  activeTileID: getActiveTileID(state),
  tileMap: getActiveTileMap(state),
  tiles: getTiles(state),
})

const mapDispatch = {
  setTileMapTile,
}

export default connect(mapState, mapDispatch)(TileMapCanvasPanel)
