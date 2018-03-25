// @flow
/* eslint-disable */
import * as React from 'react'
import * as faIcons from 'react-icons/lib/fa'
import * as ioIcons from 'react-icons/lib/io'

// See:
//  - https://github.com/gorangajic/react-icons/tree/master/fa
//  - https://fontawesome.com/icons?d=gallery
const icons = {
  eraser: 'FaEraser',
  fill: 'IoPaintbucket',
  marquee: 'IoQrScanner',
  pencil: 'FaPencil',
  pointer: 'FaMousePointer',
  wand: 'IoWand',
  zoomIn: 'FaSearchPlus',
  zoomOut: 'FaSearchMinus',
}

type Props = {
  icon: string,
}

const Icon = ({ icon, ...props }: Props) => {
  const iconComponent = icons[icon]
  if (!iconComponent) {
    console.warn('nonexistent icon', icon)
    return null
  }

  let IconComponent = faIcons[iconComponent]
  if (!IconComponent) {
    IconComponent = ioIcons[iconComponent]
  }

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}

export default Icon
