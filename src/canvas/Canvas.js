// @flow
import * as React from 'react'
import style from './canvas.css'

type Props = {
  height: number, // in pixels
  width: number, // in pixels
}

const Canvas = ({ height, width }: Props) => {
  const rows = []
  for (let row = 0; row < height; row++) {
    const pixels = []
    for (let pixel = 0; pixel < width; pixel++) {
      pixels.push(
        <td className={style.pixel}>
          {pixel}
        </td>
      )
    }

    rows.push(
      <tr key={row}>
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
