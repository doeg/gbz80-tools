// @flow
/* eslint-disable react/prefer-stateless-function, no-unused-vars */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tileMapCanvas.css'
import { getActiveTileMap } from '../selectors'
import type { AppState, TileMap } from '../types'

type MappedProps = {
  tileMap: ?TileMap,
}

type Props = MappedProps

class TileMapCanvas extends React.Component<Props> {
  render() {
    const { tileMap } = this.props
    if (!tileMap) {
      return null
    }

    return (
      <div className={style.canvas}>{JSON.stringify(tileMap, null, 2)}</div>
    )
  }
}

const mapState = (state: AppState): MappedProps => ({
  tileMap: getActiveTileMap(state),
})

export default connect(mapState)(TileMapCanvas)
