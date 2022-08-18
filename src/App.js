import React, {useState, useRef} from 'react'

import Timer from './Timer'
import OptionList from './OptionList'

function App() {
  // useState & useRef
  const [expiryTimestamp, setExpiryTimestamp] = useState(0)

  const options =  {hour:   {ref: useRef(), values: [...Array(25).keys()]},
                    minute: {ref: useRef(), values: [...Array(60).keys()]},
                    second: {ref: useRef(), values: [...Array(60).keys()]}}

  function handleStartTimer() {
    const hour = parseInt(options.hour.ref.current.value)
    const minute = parseInt(options.minute.ref.current.value)
    const second = parseInt(options.second.ref.current.value)
    const totalSecond = hour*3600 + minute*60 + second
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalSecond)
    setExpiryTimestamp(expiryTimestamp)
  }

  return (
    <>
    {(() => {
      if (expiryTimestamp === 0) return <div className='timer idle'><span>00</span>:<span>00</span>:<span>00</span><br/></div>
      return <Timer expiryTimestamp={expiryTimestamp}/>
    })()}
    <OptionList options={options}/>
    <br />
    <button onClick={handleStartTimer}>Start Timer</button>
    </>
  )
}

export default App;
