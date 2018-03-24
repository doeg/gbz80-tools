// @flow
/* eslint-disable react/prefer-stateless-function, no-unused-vars, react/no-array-index-key */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapCanvas.css'
import { getActiveTileMap } from '../selectors'
import type { AppState, TileMap } from '../types'

type MappedProps = {
  tileMap: ?TileMap,
}

type Props = MappedProps

class TileMapCanvas extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.renderCell = this.renderCell.bind(this)
  }

  renderCell(rowIdx: number, colIdx: number) {
    console.log(this, rowIdx, colIdx)
    return <div className={style.cell} key={`${rowIdx}-${colIdx}`} />
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
  tileMap: getActiveTileMap(state),
})

export default connect(mapState)(TileMapCanvas)
