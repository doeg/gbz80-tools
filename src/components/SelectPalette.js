// @flow
import cx from 'classnames'
import * as React from 'react'

import style from './selectPalette.css'
import type { Color, Palette } from '../types'

type Props = {
  activeColor: Color,
  activePalette: Palette,
  onClickColor: (color: string, idx: number) => any,
}

const SelectPalette = ({ activeColor, activePalette, onClickColor }: Props) => {
  const renderSwatch = (color, idx) => {
    const swatchClass = cx(style.swatch, {
      [style.active]: activeColor === idx,
    })
    return (
      <div
        className={swatchClass}
        key={color}
        onClick={() => onClickColor(color, idx)}
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
export default SelectPalette
