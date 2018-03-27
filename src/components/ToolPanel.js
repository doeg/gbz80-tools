// @flow
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './toolPanel.css'
import Panel from './Panel'
import { setActiveTool } from '../actions'
import { getActiveTool } from '../selectors'
import { tools } from '../types'
import type { AppState, Tool } from '../types'

type MappedProps = {
  activeTool: Tool,
}

type DispatchProps = {
  setActiveTool: Function,
}

type Props = DispatchProps & MappedProps

const ToolPanel = ({ activeTool, ...props }: Props) => {
  const renderTool = (tool: Tool) => {
    const toolClass = cx(style.tool, style[tool], {
      [style.active]: tool === activeTool,
    })

    const onClick = () => props.setActiveTool(tool)
    return (
      <button className={toolClass} key={tool} onClick={onClick} type="button">
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

const mapDispatch: DispatchProps = {
  setActiveTool,
}

export default connect(mapState, mapDispatch)(ToolPanel)
