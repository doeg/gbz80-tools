// @flow
import * as React from 'react'

import style from './app.css'
import Canvas from './Canvas'
import SelectPalette from './SelectPalette'
import type { Palette } from '../types'

const PALETTE: Palette = ['#FFFFFF', '#999999', '#444444', '#000000']

type Props = {}
type State = {
  activePalette: Palette,
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activePalette: PALETTE,
    }
  }

  render() {
    const { activePalette } = this.state

    return (
      <div className={style.app}>
        <header className={style.header}>
          <h1>GameBoy Z80 Tools</h1>
        </header>

        <div className={style.container}>
          <SelectPalette activePalette={activePalette} />
          <Canvas height={8} width={8} />
        </div>
      </div>
    )
  }
}

export default App
