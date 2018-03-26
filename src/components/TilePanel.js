// @flow
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './tilePanel.css'
import Panel from './Panel'
import Tile from './Tile'
import {
  createTile,
  deleteTile,
  duplicateTile,
  flipTileHorizontal,
  flipTileVertical,
  setActiveTile,
} from '../actions'
import * as factory from '../factory'
import type { AppState, Palette, Tile as TileObj, UUID } from '../types'

type MappedProps = {
  activePalette: Palette,
  activeTile: ?string,
  tiles: TileObj[],
}

type DispatchProps = {
  createTile: (tile: TileObj) => any,
  deleteTile: (id: UUID) => any,
  duplicateTile: (tile: TileObj) => any,
  flipTileHorizontal: UUID => any,
  flipTileVertical: UUID => any,
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

  const renderTile = (tile: TileObj) => {
    const { id, name } = tile
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

    const onFlipX = (e: Event) => {
      e.stopPropagation()
      props.flipTileHorizontal(id)
    }

    const onFlipY = (e: Event) => {
      e.stopPropagation()
      props.flipTileVertical(id)
    }

    return (
      <li
        className={tileClass}
        key={id}
        onClick={() => props.setActiveTile(id)}
      >
        <div className={style.gridContainer}>
          <Tile id={id} />
        </div>
        <div className={style.tileName}>{name}</div>
        <div className={style.buttons}>
          <button onClick={onFlipX} type="button">
            flipX
          </button>
          <button onClick={onFlipY} type="button">
            flipY
          </button>
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
      <div className={style.container}>
        <div className={style.controls}>
          <button onClick={onClickCreate} type="button">
            + New Tile
          </button>
        </div>
        <div className={style.content}>
          <ul className={style.tileList}>{tiles.map(renderTile)}</ul>
        </div>
      </div>
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
  flipTileHorizontal,
  flipTileVertical,
  setActiveTile,
}

export default connect(mapState, mapDispatch)(TilePanel)
