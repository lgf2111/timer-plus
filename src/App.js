import React, {useState, useRef} from 'react'

import Timer from './Timer'

function App() {
  // useState & useRef
  const [initTime, setInitTime] = useState(0)
  
  const [hour1, setHour1] = useState(0)
  const hour1Ref = useRef()
  
  const [hour2, setHour2] = useState(0)
  const hour2Ref = useRef()
  
  const [minute1, setMinute1] = useState(0)
  const minute1Ref = useRef()

  const [minute2, setMinute2] = useState(0)
  const minute2Ref = useRef()

  const [second1, setSecond1] = useState(0)
  const second1Ref = useRef()

  const [second2, setSecond2] = useState(0)
  const second2Ref = useRef()


  // Handle Changes
  function handleHour1Change(e) {
    let value = hour1Ref.current.value
    if (value.length > 1) value = value.slice(1, 2)
    if (value.length === 0) value = 0
    if (value < 0) value = 0
    if (value > 9) value = 9
    setHour1(value)
  }

  function handleHour2Change(e) {
    let value = hour2Ref.current.value
    if (value.length > 1) value = value.slice(1, 2)
    if (value.length === 0) value = 0
    if (value < 0) value = 0
    if (value > 9) value = 9
    setHour2(value)
  }
  
  function handleMinute1Change(e) {
    let value = minute1Ref.current.value
    if (value.length > 1) value = value.slice(1, 2)
    if (value.length === 0) value = 0
    if (value < 0) value = 0
    if (value > 5) value = 5
    setMinute1(value)
  }
  
  function handleMinute2Change(e) {
    let value = minute2Ref.current.value
    if (value.length > 1) value = value.slice(1, 2)
    if (value.length === 0) value = 0
    if (value < 0) value = 0
    if (value > 9) value = 9
    setMinute2(value)
  }
  
  function handleSecond1Change(e) {
    let value = second1Ref.current.value
    if (value.length > 1) value = value.slice(1, 2)
    if (value.length === 0) value = 0
    if (value < 0) value = 0
    if (value > 5) value = 5
    setSecond1(value)
  }
  
  function handleSecond2Change(e) {
    let value = second2Ref.current.value
    if (value.length > 1) value = value.slice(1, 2)
    if (value.length === 0) value = 0
    if (value < 0) value = 0
    if (value > 9) value = 9
    setSecond2(value)
  }
  
  function handleStartTimer(e) {
    const hour = parseInt(hour1Ref.current.value)*10 + parseInt(hour2Ref.current.value)
    const minute = parseInt(minute1Ref.current.value)*10 + parseInt(minute2Ref.current.value)
    const second = parseInt(second1Ref.current.value)*10 + parseInt(second2Ref.current.value)
    const totalSeconds = hour*3600 + minute*60 + second
    const initTime = new Date()
    initTime.setSeconds(initTime.getSeconds() + totalSeconds)

    hour1Ref.current.value = 0
    hour2Ref.current.value = 0
    minute1Ref.current.value = 0
    minute2Ref.current.value = 0
    second1Ref.current.value = 0
    second2Ref.current.value = 0

    setInitTime(initTime)
  }

  function handleRestartTimer(e) {
    setInitTime(0)
  }

  return (
    <>
    {(() => {
      if (initTime === 0) return <><span>00:00:00</span><br/></>
      return <Timer expiryTimestamp={initTime}/>
    })()}
    <input ref={hour1Ref} type="number" className="time-input" value={hour1} onChange={handleHour1Change}/>
    <input ref={hour2Ref} type="number" className="time-input" value={hour2} onChange={handleHour2Change}/>:
    <input ref={minute1Ref} type="number" className="time-input" value={minute1} onChange={handleMinute1Change}/>
    <input ref={minute2Ref} type="number" className="time-input" value={minute2} onChange={handleMinute2Change}/>:
    <input ref={second1Ref} type="number" className="time-input" value={second1} onChange={handleSecond1Change}/>
    <input ref={second2Ref} type="number" className="time-input" value={second2} onChange={handleSecond2Change}/>
    <br />
    <button onClick={handleStartTimer}>Start Timer</button>
    <button onClick={handleRestartTimer}>Restart Timer</button>
    </>
  )
}

export default App;
