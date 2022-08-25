import React from 'react'

import { SelectProps } from './model'

const Select: React.FC<SelectProps> = ({select, idx}) => {
    const ref = select.ref
    const opts = select.opts  

  return (
    <select ref={ref}>
      {opts.map(opt => {
        return <option key={opt} value={opt} selected={opts.indexOf(opt)===idx}>
          {opt.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
          </option>
      })}
    </select>
  )
}

export default Select