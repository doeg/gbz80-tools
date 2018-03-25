// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import style from './canvasPanel.css'
import Canvas from './Canvas'
import Panel from './Panel'
import SelectPalette from './SelectPalette'

import { clearTile } from '../actions'
import * as select from '../selectors'
import type { AppState, PixelGrid, Tile, UUID } from '../types'
import * as convert from '../util/convert'

// $FlowFixMe
const toColorGrid = (canvas: PixelGrid): Array<Array<number>> =>
  // $FlowFixMe
  canvas.map(row => row.map(({ color }) => color))

type MappedProps = {
  activeTile: ?Tile,
}

type DispatchProps = {
  clearTile: UUID => any,
}

type Props = DispatchProps & MappedProps

const CanvasPanel = (props: Props) => {
  const { activeTile } = props
  if (!activeTile) {
    return null
  }

  const onClear = () => {
    props.clearTile(activeTile.id)
  }

  const hex = convert
    .toHex(toColorGrid(activeTile.grid))
    .map(h => `${h}`)
    .join(' ')

  return (
    <Panel id="CanvasPanel" title="Tile Canvas">
      <div className={style.canvas}>
        <div className={style.controls}>
          <SelectPalette />
          <div>
            <button onClick={onClear} type="button">
              Clear
            </button>
          </div>
        </div>
        <Canvas id={activeTile.id} />

        <h3>{activeTile.name}</h3>
        <pre>{hex}</pre>
      </div>
    </Panel>
  )
}

const mapState = (state: AppState) => ({
  activeTile: select.getActiveTile(state),
})

const mapDispatch = {
  clearTile,
}

export default connect(mapState, mapDispatch)(CanvasPanel)
