// @flow
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './toolPanel.css'
import Panel from './Panel'
import { setActiveTool } from '../actions'
import { TOOLS } from '../constants'
import { getActiveTool } from '../selectors'
import type { AppState, Tool } from '../types'

type DispatchProps = {
  setActiveTool: Function,
}

type MappedProps = {
  activeTool: Tool,
}

type Props = DispatchProps & MappedProps

const getButtonClass = ({ activeTool }: Props, t: Tool) =>
  cx(style.tool, style[t], {
    [style.activeTool]: activeTool === t,
  })

const ToolPanel = (props: Props) => (
  <Panel height={320} id="ToolPanel" title="Tools" width={120}>
    <div className={style.buttonContainer}>
      {Object.keys(TOOLS).map((t: Tool) => (
        <button
          className={getButtonClass(props, t)}
          key={t}
          onClick={() => props.setActiveTool(t)}
          type="button"
        >
          {t}
        </button>
      ))}
    </div>
  </Panel>
)

const mapState = (state: AppState): MappedProps => ({
  activeTool: getActiveTool(state),
})

const mapDispatch: DispatchProps = {
  setActiveTool,
}

export default connect(mapState, mapDispatch)(ToolPanel)
