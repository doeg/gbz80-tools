// @flow

import * as React from 'react'

import style from './selectPalette.css'
import type { Palette } from '../types'

type Props = {
  activePalette: Palette,
  onClickColor: (color: string, idx: number) => any,
}

const SelectPalette = ({ activePalette, onClickColor }: Props) =>
  <div className={style.palette}>
    {activePalette.map((color, idx) =>
      <div
        className={style.swatch}
        key={color}
        onClick={() => onClickColor(color, idx)}
        style={{ backgroundColor: color }}
      >
        {idx}
      </div>
    )}
  </div>

export default SelectPalette
