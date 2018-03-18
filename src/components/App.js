// @flow
import * as React from 'react'

import style from './app.css'
import Canvas from './Canvas'
import SelectPalette from './SelectPalette'
import TilePanel from './TilePanel'

const App = () =>
  <div className={style.app}>
    <header className={style.header}>
      <h1>GameBoy Z80 Tools</h1>
    </header>

    <div className={style.container}>
      <TilePanel />

      <div className={style.canvas}>
        <SelectPalette />
        <Canvas height={8} width={8} />
      </div>
    </div>
  </div>

export default App
