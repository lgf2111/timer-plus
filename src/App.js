import React, {useState, useRef} from 'react'
import { useTimer } from 'react-timer-hook';

import OptionList from './OptionList'

function App() {
  const [expiryTimestamp, setExpiryTimestamp] = useState(0)

  const divRef = useRef()

  const options =  {hour:   {ref: useRef(), values: [...Array(25).keys()]},
                    minute: {ref: useRef(), values: [...Array(60).keys()]},
                    second: {ref: useRef(), values: [...Array(60).keys()]}}
    
  const {
    seconds, minutes, hours, days,
    isRunning,
    start, pause, resume, restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => {
    let text = "Time's Up!"
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    // TODO: fix expire className
    divRef.current.className = "timer expired"
  } });
  
  const [hours_, minutes_, seconds_] = [hours, minutes, seconds].map(el => {
    return el.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  })

  function handleStartTimer() {
    const hour = parseInt(options.hour.ref.current.value)
    const minute = parseInt(options.minute.ref.current.value)
    const second = parseInt(options.second.ref.current.value)
    const totalSecond = hour*3600 + minute*60 + second
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalSecond)
    setExpiryTimestamp(expiryTimestamp)
    restart(expiryTimestamp)
  }

  return (
    <>
    <div ref={divRef} className={`timer ${isRunning?'active':'idle'}`}><span>{hours_}</span>:<span>{minutes_}</span>:<span>{seconds_}</span><br/></div>
    <OptionList options={options}/>
    <br />
    <button onClick={handleStartTimer}>Start Timer</button>
    </>
  )
}

export default App;
