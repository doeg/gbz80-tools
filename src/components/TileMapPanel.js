// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapPanel.css'
import Panel from './Panel'
import TileMapCanvas from './TileMapCanvas'
import { createTileMap } from '../actions'
import { getActiveTileMap } from '../selectors'
import type { AppState, TileMap } from '../types'

type MappedProps = {
  tileMap: ?TileMap,
}

type DispatchProps = {
  createTileMap: Function,
}

type Props = DispatchProps & MappedProps

const TileMapPanel = ({ tileMap, ...props }: Props) => {
  let title = 'Tile Map'
  if (tileMap) {
    title = `${tileMap.name || 'untitled'} - ${title}`
  }

  return (
    <Panel height={720} left={200} title={title} top={0} width={800}>
      <div className={style.controls}>
        <button
          className={style.newMapButton}
          onClick={props.createTileMap}
          type="button"
        >
          + New Tile Map
        </button>
      </div>
      <TileMapCanvas />
    </Panel>
  )
}

const mapState = (state: AppState): MappedProps => ({
  tileMap: getActiveTileMap(state),
})

const mapDispatch: DispatchProps = {
  createTileMap,
}

export default connect(mapState, mapDispatch)(TileMapPanel)
