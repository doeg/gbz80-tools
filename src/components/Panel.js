// @flow
import * as React from 'react'
import { DragSource } from 'react-dnd'

import style from './panel.css'

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

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

export default DragSource('PANEL', spec, collect)(Panel)
