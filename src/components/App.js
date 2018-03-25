// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './app.css'
import CanvasPanel from './CanvasPanel'
import HotkeysPanel from './HotkeysPanel'
import TileMapPanel from './TileMapPanel'
import TilePanel from './TilePanel'
import Workspace from './Workspace'
import { clearTile, resetWorkspace } from '../actions'
import { getActiveTileID } from '../selectors'
import type { AppState, UUID } from '../types'

type MappedProps = {
  activeTileID: ?UUID,
}

type DispatchProps = {
  clearTile: UUID => any,
  resetWorkspace: () => any,
}

type Props = DispatchProps & MappedProps

const App = (props: Props) => (
  <div className={style.app}>
    <header className={style.header}>
      <h1>GameBoy Z80 Tools</h1>
      <button onClick={props.resetWorkspace} type="button">
        Reset Layout
      </button>
    </header>

    <Workspace>
      <CanvasPanel />
      <TilePanel />
      <TileMapPanel />
      <HotkeysPanel />
    </Workspace>
  </div>
)

const mapState = (state: AppState) => ({
  activeTileID: getActiveTileID(state),
})

const mapDispatch = {
  clearTile,
  resetWorkspace,
}

export default connect(mapState, mapDispatch)(App)
