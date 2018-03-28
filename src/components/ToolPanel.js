// @flow
/* eslint-disable */
import cx from 'classnames'
import keycode from 'keycode'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './toolPanel.css'
import Panel from './Panel'
import { setActiveTool } from '../actions'
import { getActiveTool } from '../selectors'
import { tools } from '../types'
import type { AppState, Tool } from '../types'

const KEYMAP = {
  e: tools.eraser,
  p: tools.pencil,
  v: tools.cursor,
}

type MappedProps = {
  activeTool: Tool,
}

type DispatchProps = {
  setActiveTool: Function,
}

type Props = DispatchProps & MappedProps

class ToolPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    ;(this: any).handleHotkey = this.handleHotkey.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleHotkey)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleHotkey)
  }

  handleHotkey(e: Event) {
    const key = keycode(e)
    if (key in KEYMAP) {
      this.props.setActiveTool(KEYMAP[key])
    }
  }

  render() {
    const { activeTool, ...props } = this.props
    const renderTool = (tool: Tool) => {
      const toolClass = cx(style.tool, style[tool], {
        [style.active]: tool === activeTool,
      })

      const onClick = () => props.setActiveTool(tool)
      return (
        <button
          className={toolClass}
          key={tool}
          onClick={onClick}
          type="button"
        >
          {tool}
        </button>
      )
    }

    return (
      <Panel height={200} id="ToolPanel" title="Tools" width={80}>
        <div className={style.tools}>
          {Object.values(tools).map(tool => renderTool(((tool: any): Tool)))}
        </div>
      </Panel>
    )
  }
}

const mapState = (state: AppState): MappedProps => ({
  activeTool: getActiveTool(state),
})

const mapDispatch: DispatchProps = {
  setActiveTool,
}

export default connect(mapState, mapDispatch)(ToolPanel)
