/* eslint-disable */
import * as React from 'react'
import { connect } from 'react-redux'

import style from './toolPanel.css'
import Icon from './Icon'
import Panel from './Panel'
import SelectPalette from './SelectPalette'
import { getActiveColor, getActivePalette } from '../selectors'
import type { Color, Palette } from '../types'

type MappedProps = {
  activeColor: Color,
  activePalette: Palette,
}

type Props = MappedProps

const ToolPanel = (props: Props) => (
  <Panel height={540} id="ToolPanel" title="Tools" width={160}>
    <div className={style.container}>
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

        <div className={style.tool}>
          <button type="button">
            <Icon icon="zoomIn" /> zoom out
          </button>
        </div>

        <div className={style.tool}>
          <button type="button">
            <Icon icon="zoomOut" /> zoom out
          </button>
        </div>
      </div>

      <div className={style.palette}>
        <SelectPalette />
      </div>

      <div className={style.activePalette}>
        <div className={style.background} style={{ backgroundColor: '#fff' }} />
        <div
          className={style.foreground}
          style={{ backgroundColor: props.activePalette[props.activeColor] }}
        />
      </div>
    </div>
  </Panel>
)

const mapState = (state: AppState): MappedProps => ({
  activeColor: getActiveColor(state),
  activePalette: getActivePalette(state),
})

export default connect(mapState)(ToolPanel)
