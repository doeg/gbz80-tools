// @flow
import * as React from 'react'

import style from './app.css'
import Canvas from './Canvas'
import SelectPalette from './SelectPalette'
import type { Color, Palette } from '../types'

const PALETTE: Palette = ['#FFFFFF', '#999999', '#444444', '#000000']

type Props = {}
type State = {
  activeColor: Color,
  activePalette: Palette,
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeColor: 0,
      activePalette: PALETTE,
    }
  }

  render() {
    const { activeColor, activePalette } = this.state

    const onClickColor = (color, idx) =>
      this.setState({
        activeColor: ((idx: any): Color),
      })

    return (
      <div className={style.app}>
        <header className={style.header}>
          <h1>GameBoy Z80 Tools</h1>
        </header>

        <div className={style.container}>
          <SelectPalette
            activeColor={activeColor}
            activePalette={activePalette}
            onClickColor={onClickColor}
          />
          <Canvas activeColor={activeColor} height={8} width={8} />
        </div>
      </div>
    )
  }
}

export default App
