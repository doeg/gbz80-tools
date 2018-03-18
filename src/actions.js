// @flow

import type { ActiveColorSetAction, Color } from './types'

export const setActiveColor = (color: Color): ActiveColorSetAction => ({
  payload: color,
  type: 'ACTIVE_COLOR_SET',
})
