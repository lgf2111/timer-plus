import React from 'react'

import Select from './Select'

import { SelectListProps } from './model'

const SelectList: React.FC<SelectListProps>= ({selects, idxs}) => {
  return (
    <>
        <Select select={selects.hour} idx={idxs.hour}/>
        <span className="colon">:</span>
        <Select select={selects.minute} idx={idxs.minute}/>
        <span className="colon">:</span>
        <Select select={selects.second} idx={idxs.second}/>
    </>
  )
}

export default SelectList 