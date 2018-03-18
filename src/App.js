// @flow
import * as React from 'react'
import style from './app.css'

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
        <h1>Hello, world!</h1>
        <p>Welcome to the web skeleton ^..^</p>
      </div>
    )
  }
}

export default App
