// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './app.css'
import Canvas from './Canvas'
import Panel from './Panel'
import SelectPalette from './SelectPalette'
import TilePanel from './TilePanel'
import Workspace from './Workspace'
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

const App = (props: Props) => {
  const onClear = () => {
    if (props.activeTileID) {
      props.clearTile(props.activeTileID)
    }
  }

  return (
    <div className={style.app}>
      <header className={style.header}>
        <h1>GameBoy Z80 Tools</h1>
      </header>

      <Workspace>
        <Panel id="CanvasPanel" left={300} top={0}>
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

        <TilePanel />
      </Workspace>
    </div>
  )
}

const mapState = (state: AppState) => ({
  activeTileID: getActiveTileID(state),
})

const mapDispatch = {
  clearTile,
}

export default connect(mapState, mapDispatch)(App)
