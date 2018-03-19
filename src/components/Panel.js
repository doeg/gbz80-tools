// @flow
import * as React from 'react'
import style from './panel.css'

type Props = {
  children: any,
}

const Panel = ({ children }: Props) =>
  <div className={style.panel}>
    {children}
  </div>

export default Panel
