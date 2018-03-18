// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tilePanel.css'
import type { AppState, Tile } from '../types'

type MappedProps = {
  tiles: Tile[],
}

const TilePanel = ({ tiles }: MappedProps) =>
  <div className={style.panel}>
    <h2>Tiles</h2>
    <ul>
      {tiles.map(({ name }) =>
        <li>
          {name}
        </li>
      )}
    </ul>
  </div>

const mapState = ({ tiles }: AppState): MappedProps => ({
  tiles,
})

export default connect(mapState)(TilePanel)
