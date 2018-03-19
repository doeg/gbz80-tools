// @flow
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tilePanel.css'
import Panel from './Panel'
import PixelGrid from './PixelGrid'
import { createTile, setActiveTile } from '../actions'
import type { AppState, Palette, Tile } from '../types'
import { makeEmptyGrid } from '../util/pixel-grid'

type MappedProps = {
  activePalette: Palette,
  activeTile: ?string,
  tiles: Tile[],
}

type DispatchProps = {
  createTile: (tile: Tile) => any,
  setActiveTile: string => any,
}

const TilePanel = ({
  activePalette,
  activeTile,
  tiles,
  ...props
}: DispatchProps & MappedProps) => {
  const onClickCreate = () => {
    const createTileAction = props.createTile({
      grid: makeEmptyGrid({ height: 8, width: 8 }),
      name: `tile-${tiles.length}`,
    })

    props.setActiveTile(createTileAction.payload.tile.name)
  }

  const renderTile = ({ grid, name }: Tile) => {
    const tileClass = cx({ [style.active]: name === activeTile })
    return (
      <li
        className={tileClass}
        key={name}
        onClick={() => props.setActiveTile(name)}
      >
        <div className={style.gridContainer}>
          <PixelGrid grid={grid} palette={activePalette} />
        </div>
        {name}
      </li>
    )
  }

  return (
    <Panel>
      <h2>Tiles</h2>
      <ul className={style.tileList}>
        {tiles.map(renderTile)}
      </ul>
      <button onClick={onClickCreate} type="button">
        + New Tile
      </button>
    </Panel>
  )
}
const mapState = ({
  activePalette,
  activeTile,
  tiles,
}: AppState): MappedProps => ({
  activePalette,
  activeTile,
  tiles,
})

const mapDispatch: DispatchProps = {
  createTile,
  setActiveTile,
}

export default connect(mapState, mapDispatch)(TilePanel)
