// @flow
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './toolPanel.css'
import Panel from './Panel'
import { getActiveTool } from '../selectors'
import { tools } from '../types'
import type { AppState, Tool } from '../types'

type MappedProps = {
  activeTool: Tool,
}

type Props = MappedProps

const ToolPanel = ({ activeTool }: Props) => {
  const renderTool = (tool: Tool) => {
    const toolClass = cx(style.tool, style[tool], {
      [style.active]: tool === activeTool,
    })

    return (
      <button className={toolClass} key={tool} type="button">
        {tool}
      </button>
    )
  }

  return (
    <Panel height={200} id="ToolPanel" title="Tools" width={80}>
      <div className={style.tools}>{Object.keys(tools).map(renderTool)}</div>
    </Panel>
  )
}

const mapState = (state: AppState): MappedProps => ({
  activeTool: getActiveTool(state),
})

export default connect(mapState)(ToolPanel)
