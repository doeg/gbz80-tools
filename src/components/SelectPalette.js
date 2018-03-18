// @flow
/* eslint-disable */
import cx from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

import style from './selectPalette.css'
import { setActiveColor } from '../actions'
import type { AppState, Color, Palette } from '../types'

type OwnProps = {
  activePalette: Palette,
}

type MappedProps = {
  activeColor: Color,
}

type DispatchProps = {
  setActiveColor: Color => any,
}

type Props = OwnProps & MappedProps & DispatchProps

const SelectPalette = ({ activeColor, activePalette, ...props }: Props) => {
  const renderSwatch = (color, idx) => {
    const swatchClass = cx(style.swatch, {
      [style.active]: activeColor === idx,
    })

    const onClick = () => props.setActiveColor(idx)

    return (
      <div
        className={swatchClass}
        key={color}
        onClick={onClick}
        style={{ backgroundColor: color }}
      >
        {idx}
      </div>
    )
  }

  return (
    <div className={style.palette}>
      {activePalette.map(renderSwatch)}
    </div>
  )
}

const mapState = ({ activeColor }: AppState): MappedProps => ({
  activeColor,
})

const mapDispatch: DispatchProps = {
  setActiveColor,
}

export default connect(mapState, mapDispatch)(SelectPalette)
