// @flow
/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapPanel.css'
import Panel from './Panel'
import TileMapCanvas from './TileMapCanvas'
import { createTileMap } from '../actions'
import { getActiveTileMap, exportActiveTileMap } from '../selectors'
import type { AppState, TileMap } from '../types'

type MappedProps = {
  exportData: string[][],
  tileMap: ?TileMap,
}

type DispatchProps = {
  createTileMap: Function,
}

type Props = DispatchProps & MappedProps

const TileMapPanel = ({ exportData, tileMap, ...props }: Props) => {
  let title = 'Tile Map'
  if (tileMap) {
    title = `${tileMap.name || 'untitled'} - ${title}`
  }

  return (
    <Panel height={960} left={200} title={title} top={0} width={720}>
      <div className={style.controls}>
        <button
          className={style.newMapButton}
          onClick={props.createTileMap}
          type="button"
        >
          + New Tile Map
        </button>
      </div>
      <div className={style.canvasContainer}>
        <div>
          <TileMapCanvas />
        </div>
        <p className="hint">
          click to place active tile, shift+click to remove tile
        </p>
      </div>

      <div className={style.export}>
        <h3>tiles</h3>
        <pre>
          {exportData.map((s, idx) => <div key={idx}>{s.join(' ')}</div>)}
        </pre>
      </div>
    </Panel>
  )
}

const mapState = (state: AppState): MappedProps => ({
  exportData: exportActiveTileMap(state),
  tileMap: getActiveTileMap(state),
})

const mapDispatch: DispatchProps = {
  createTileMap,
}

export default connect(mapState, mapDispatch)(TileMapPanel)
