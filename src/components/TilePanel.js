// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tilePanel.css'
import { createTile, setActiveTile } from '../actions'
import type { AppState, Tile } from '../types'
import { makeEmptyGrid } from '../util/pixel-grid'

type MappedProps = {
  tiles: Tile[],
}

type DispatchProps = {
  createTile: (tile: Tile) => any,
  setActiveTile: string => any,
}

const TilePanel = ({ tiles, ...props }: DispatchProps & MappedProps) => {
  console.log(props)
  const onClickCreate = () =>
    props.createTile({
      grid: makeEmptyGrid({ height: 8, width: 8 }),
      name: `tile-${tiles.length}`,
    })

  return (
    <div className={style.panel}>
      <h2>Tiles</h2>
      <ul>
        {tiles.map(({ name }) =>
          <li key={name} onClick={() => props.setActiveTile(name)}>
            {name}
          </li>
        )}
      </ul>
      <button onClick={onClickCreate} type="button">
        + New Tile
      </button>
    </div>
  )
}
const mapState = ({ activeTile, tiles }: AppState): MappedProps => ({
  activeTile,
  tiles,
})

const mapDispatch: DispatchProps = {
  createTile,
  setActiveTile,
}

export default connect(mapState, mapDispatch)(TilePanel)
