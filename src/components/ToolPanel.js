/* eslint-disable */
import * as React from 'react'

import style from './toolPanel.css'
import Icon from './Icon'
import Panel from './Panel'

const ToolPanel = () => (
  <Panel height={300} id="ToolPanel" title="Tools" width={120}>
    <div className={style.tools}>
      <div className={style.tool}>
        <button type="button">
          <Icon icon="pointer" /> pointer
        </button>
      </div>

      <div className={style.tool}>
        <button type="button">
          <Icon icon="pencil" /> pencil
        </button>
      </div>

      <div className={style.tool}>
        <button type="button">
          <Icon icon="eraser" /> eraser
        </button>
      </div>

      <div className={style.tool}>
        <button type="button">
          <Icon icon="fill" /> fill
        </button>
      </div>

      <div className={style.tool}>
        <button type="button">
          <Icon icon="wand" /> wand
        </button>
      </div>

      <div className={style.tool}>
        <button type="button">
          <Icon icon="marquee" /> select
        </button>
      </div>
    </div>
  </Panel>
)

export default ToolPanel
