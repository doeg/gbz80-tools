// @flow
/* eslint-disable */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapCanvasPanel.css'
import CanvasSizeInput from './CanvasSizeInput'
import Panel from './Panel'
import { getActiveTileMap } from '../selectors'

type MappedProps = {
  tileMap: ?TileMap,
}
type Props = MappedProps

class TileMapCanvasPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onClickCell = this.onClickCell.bind(this)
  }

  onClickCell(row, col) {
    console.log('clicked', row, col)
  }

  render() {
    const { tileMap } = this.props
    const title = tileMap ? `${tileMap.name} - Tile Map` : 'Tile Map'

    return (
      <Panel height={600} id="TileMapCanvasPanel" title={title} width={540}>
        <CanvasSizeInput />
        <div className={style.grid}>
          {tileMap.map.map((row, rdx) => (
            <div className={style.row}>
              {row.map((cell, cdx) => (
                <div
                  className={style.cell}
                  onClick={() => this.onClickCell(rdx, cdx)}
                >
                  {tileMap.map[rdx][cdx]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Panel>
    )
  }
}

const mapState = (state: AppState): MappedProps => ({
  tileMap: getActiveTileMap(state),
})

export default connect(mapState)(TileMapCanvasPanel)
