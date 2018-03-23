// @flow
/* eslint-disable */
import * as React from 'react'
import { connect } from 'react-redux'

import CanvasSizeInput from './CanvasSizeInput'
import Panel from './Panel'
import { getActiveTileMap } from '../selectors'

type MappedProps = {
  tileMap: ?TileMap,
}
type Props = MappedProps

class TileMapCanvasPanel extends React.Component<Props> {
  render() {
    const { tileMap } = this.props
    const title = tileMap ? `${tileMap.name} - Tile Map` : 'Tile Map'

    return (
      <Panel height={500} id="TileMapCanvasPanel" title={title} width={750}>
        <CanvasSizeInput />
        <pre>
          {tileMap.map.map((row, idx) => (
            <p key={idx}>{JSON.stringify(row)}</p>
          ))}
        </pre>
      </Panel>
    )
  }
}

const mapState = (state: AppState): MappedProps => ({
  tileMap: getActiveTileMap(state),
})

export default connect(mapState)(TileMapCanvasPanel)
