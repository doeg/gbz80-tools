// @flow
/* eslint-disable */
import * as React from 'react'
import { connect } from 'react-redux'

import { updateTileMapSize } from '../actions'
import { getActiveTileMap } from '../selectors'

type MappedProps = {
  tileMapID: ?string,
  initialHeight?: ?number,
  initialWidth?: ?number,
}

type DispatchProps = {
  updateTileMapSize: Function,
}

type Props = MappedProps & DispatchProps

type State = {
  height: number,
  isPristine: boolean,
  width: number,
}

class CanvasSizeInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      height: props.initialHeight,
      isPristine: true,
      width: props.initialWidth,
    }
  }

  render() {
    const onChangeInput = (e: Event, attr: 'height' | 'width') => {
      this.setState({ [attr]: e.target.value, isPristine: false })
    }
    const onChangeHeight = (e: Event) => onChangeInput(e, 'height')
    const onChangeWidth = (e: Event) => onChangeInput(e, 'width')

    const onSubmit = (e: Event) => {
      e.preventDefault()
      this.props.updateTileMapSize({
        height: parseInt(this.state.height),
        tileMapID: this.props.tileMapID,
        width: parseInt(this.state.width),
      })
    }

    return (
      <form onSubmit={onSubmit}>
        <input
          name="width"
          onChange={onChangeWidth}
          type="number"
          value={this.state.width}
        />
        x
        <input
          name="height"
          onChange={onChangeHeight}
          type="number"
          value={this.state.height}
        />
        tiles
        {this.state.isPristine ? null : (
          <button type="submit">Update canvas</button>
        )}
      </form>
    )
  }
}

const mapState = (state: AppState): MappedProps => {
  const tileMap = getActiveTileMap(state)
  return {
    tileMapID: tileMap ? tileMap.id : null,
    initialHeight: tileMap ? tileMap.height : null,
    initialWidth: tileMap ? tileMap.width : null,
  }
}

const mapDispatch = {
  updateTileMapSize,
}

export default connect(mapState, mapDispatch)(CanvasSizeInput)
