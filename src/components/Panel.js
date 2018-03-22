// @flow
import * as React from 'react'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'

import style from './panel.css'
import { getPanelCoords } from '../selectors'

type Props = {
  children: any,
  connectDragSource: Function,
  height: number,
  id: string,
  left: number,
  top: number,
  width: number,
}

const Panel = ({ children, connectDragSource, ...positioning }: Props) =>
  connectDragSource(
    <div className={style.panel} style={positioning}>
      {children}
    </div>,
  )

const spec = {
  beginDrag({ id, left, top }: Props) {
    return { id, left, top }
  },
}

const collect = (dndConnect, monitor) => ({
  connectDragSource: dndConnect.dragSource(),
  isDragging: monitor.isDragging(),
})

const mapState = (state, ownProps) => ({
  ...getPanelCoords(state, ownProps.id),
})

export default connect(mapState)(DragSource('PANEL', spec, collect)(Panel))
