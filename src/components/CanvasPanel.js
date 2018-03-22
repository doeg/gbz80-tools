// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './canvasPanel.css'
import Canvas from './Canvas'
import Panel from './Panel'
import SelectPalette from './SelectPalette'

import { clearTile } from '../actions'
import { getActiveTileID } from '../selectors'
import type { AppState, UUID } from '../types'

type MappedProps = {
  activeTileID: ?UUID,
}

type DispatchProps = {
  clearTile: UUID => any,
}

type Props = DispatchProps & MappedProps

const CanvasPanel = (props: Props) => {
  const onClear = () => {
    if (props.activeTileID) {
      props.clearTile(props.activeTileID)
    }
  }

  return (
    <Panel id="CanvasPanel" title="Tile Canvas">
      <div className={style.canvas}>
        <div className={style.controls}>
          <SelectPalette />
          <div>
            <button onClick={onClear} type="button">
              Clear
            </button>
          </div>
        </div>
        <Canvas height={8} width={8} />
      </div>
    </Panel>
  )
}

const mapState = (state: AppState) => ({
  activeTileID: getActiveTileID(state),
})

const mapDispatch = {
  clearTile,
}

export default connect(mapState, mapDispatch)(CanvasPanel)