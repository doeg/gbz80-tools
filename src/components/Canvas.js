// @flow
import * as React from 'react'
import style from './canvas.css'

type Props = {
  height: number, // in pixels
  width: number, // in pixels
}

const Canvas = ({ height, width }: Props) => {
  const rows = []
  for (let y = 0; y < height; y++) {
    const pixels = []
    for (let x = 0; x < width; x++) {
      pixels.push(<td className={style.pixel} key={`${y}-${x}`} />)
    }

    rows.push(
      <tr key={y}>
        {pixels}
      </tr>
    )
  }

  return (
    <table className={style.canvas}>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default Canvas
