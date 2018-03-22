// @flow
import * as React from 'react'

import style from './workspace.css'

type Props = {
  children: ?any,
}

const Workspace = ({ children }: Props) => (
  <div className={style.workspace}>{children}</div>
)

export default Workspace
