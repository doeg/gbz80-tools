// @flow
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tilePanel.css'
import Panel from './Panel'
import PixelGrid from './PixelGrid'
import {
  createTile,
  deleteTile,
  duplicateTile,
  setActiveTile,
} from '../actions'
import * as factory from '../factory'
import type { AppState, Palette, Tile, UUID } from '../types'

type MappedProps = {
  activePalette: Palette,
  activeTile: ?string,
  tiles: Tile[],
}

type DispatchProps = {
  createTile: (tile: Tile) => any,
  deleteTile: (id: UUID) => any,
  duplicateTile: (tile: Tile) => any,
  setActiveTile: string => any,
}

const TilePanel = ({
  activePalette,
  activeTile,
  tiles,
  ...props
}: DispatchProps & MappedProps) => {
  const onClickCreate = () => {
    const newTile = factory.makeTile()
    props.createTile(newTile)
  }

  const renderTile = (tile: Tile) => {
    const { grid, id, name } = tile
    const tileClass = cx({ [style.active]: id === activeTile })

    const onClickDelete = (e: Event) => {
      // Otherwise the event bubbles & sets the deleted tile to active tile
      e.stopPropagation()
      props.deleteTile(id)
    }

    const onClickDuplicate = (e: Event) => {
      e.stopPropagation()
      props.duplicateTile(tile)
    }

    return (
      <li
        className={tileClass}
        key={id}
        onClick={() => props.setActiveTile(id)}
      >
        <div className={style.gridContainer}>
          <PixelGrid grid={grid} palette={activePalette} />
        </div>
        <div className={style.tileName}>{name}</div>
        <div className={style.buttons}>
          <button onClick={onClickDuplicate} type="button">
            Copy
          </button>
          <button onClick={onClickDelete} type="button">
            x
          </button>
        </div>
      </li>
    )
  }

  return (
    <Panel height={500} id="TilePanel" title="Tiles" width={300}>
      <ul className={style.tileList}>{tiles.map(renderTile)}</ul>
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
  deleteTile,
  duplicateTile,
  setActiveTile,
}

export default connect(mapState, mapDispatch)(TilePanel)
