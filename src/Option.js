import React from 'react'

export default function Option({option}) {
  return (
    <select ref={option.ref}>
      {option.values.map(value => {
        return <option key={value} value={value}>{value.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}</option>
      })}
    </select>
  )
}
