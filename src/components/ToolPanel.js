// @flow
import cx from 'classnames'
import * as React from 'react'

import style from './toolPanel.css'
import Panel from './Panel'
import { tools } from '../types'

// type Props = {}

const ToolPanel = () => (
  <Panel height={200} id="ToolPanel" title="Tools" width={80}>
    <div className={style.tools}>
      {Object.keys(tools).map(tool => (
        <button
          className={cx(style.button, style[tool])}
          key={tool}
          type="button"
        >
          {tool}
        </button>
      ))}
    </div>
  </Panel>
)

export default ToolPanel
