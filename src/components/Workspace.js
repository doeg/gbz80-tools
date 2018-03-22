// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'

import style from './workspace.css'
import { updatePanel } from '../actions'

type Props = {
  children: ?any,
  connectDropTarget: Function,
}

class Workspace extends React.Component<Props> {
  render() {
    return this.props.connectDropTarget(
      <div className={style.workspace}>{this.props.children}</div>,
    )
  }
}

const panelTargetSpec = {
  // eslint-disable-next-line no-unused-vars
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
    const left = Math.round(item.left + delta.x)
    const top = Math.round(item.top + delta.y)
    props.updatePanel({
      id: item.id,
      left,
      top,
    })
  },
}

const collect = dndConnect => ({
  connectDropTarget: dndConnect.dropTarget(),
})

const mapDispatch = {
  updatePanel,
}

export default connect(null, mapDispatch)(
  DragDropContext(HTML5Backend)(
    DropTarget('PANEL', panelTargetSpec, collect)(Workspace),
  ),
)
