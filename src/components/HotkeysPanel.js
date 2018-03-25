// @flow
/* eslint-disable */
import * as React from 'react'

import style from './hotkeysPanel.css'
import Panel from './Panel'

const hotkeys = {
  eraser: 'e',
  pencil: 'p',
}

const HotkeysPanel = () => (
  <Panel height={540} id="HotkeysPanel" title="Hotkeys" width={200}>
    <ul className={style.list}>
      {Object.keys(hotkeys).map(label => (
        <li key={label}>
          <span className={style.label}>{label}</span>
          <span className={style.hotkey}>{hotkeys[label]}</span>
        </li>
      ))}
    </ul>
  </Panel>
)

export default HotkeysPanel
