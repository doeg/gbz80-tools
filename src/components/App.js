// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './app.css'
import Canvas from './Canvas'
import Panel from './Panel'
import SelectPalette from './SelectPalette'
import TilePanel from './TilePanel'
import { clearTile } from '../actions'
import { getActiveTile } from '../selectors'
import type { AppState } from '../types'

type MappedProps = {
  activeTileName: string,
}

type DispatchProps = {
  clearTile: string => any,
}

type Props = DispatchProps & MappedProps

const App = (props: Props) => {
  const onClear = () => props.clearTile(props.activeTileName)

  return (
    <div className={style.app}>
      <header className={style.header}>
        <h1>GameBoy Z80 Tools</h1>
      </header>

      <div className={style.container}>
        <Panel>
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
      </div>
    </div>
  )
}

const mapState = (state: AppState) => ({
  activeTileName: (getActiveTile(state) || {}).name,
})

const mapDispatch = {
  clearTile,
}

export default connect(mapState, mapDispatch)(App)
