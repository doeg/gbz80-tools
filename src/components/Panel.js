// @flow
import * as React from 'react'
import style from './panel.css'

type Props = {
  children: any,
  height: number,
  left: number,
  top: number,
  width: number,
}

const Panel = ({ children, ...positioning }: Props) => (
  <div className={style.panel} style={positioning}>
    {children}
  </div>
)

export default Panel
