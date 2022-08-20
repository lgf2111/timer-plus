import React from 'react'

import Option from './Option'

export default function OptionList({options}) {
  return (
    <>
      <Option key="hour" option={options.hour}/>:
      <Option key="minute" option={options.minute}/>:
      <Option key="second" option={options.second}/>
    </>
  )
}
