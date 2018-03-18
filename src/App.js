// @flow
import * as React from 'react'

import style from './app.css'
import Canvas from './canvas/Canvas'

type Props = {}
type State = {}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={style.app}>
        <header className={style.header}>
          <h1>GameBoy Z80 Tools</h1>
        </header>

        <div className={style.container}>
          <Canvas height={8} width={8} />
        </div>
      </div>
    )
  }
}

export default App
