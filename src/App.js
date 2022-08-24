import React, {useState, useRef, useEffect} from 'react'
import { useTimer } from 'react-timer-hook';

import Timer from './Timer';
import OptionList from './OptionList'
import TimesUp from './TimesUp';

function App() {
  const [expiryTimestamp, setExpiryTimestamp] = useState(0)
  const [stopTimer, setStopTimer] = useState(true)
  const [msg, setMsg] = useState(new SpeechSynthesisUtterance())
  const [done, setDone] = useState(false)
  const [spoken, setSpoken] = useState("")

  const divRef = useRef() // Div for actual timer to change className

  const options =  {hour:   {ref: useRef(), values: [...Array(25).keys()]},
                    minute: {ref: useRef(), values: [...Array(60).keys()]},
                    second: {ref: useRef(), values: [...Array(60).keys()]}}

  // Check if TTS is done
  useEffect(() => {
    const checkDone = setInterval(() => {
      setDone(false)
    }, 0);
    return () => clearInterval(checkDone);
  }, []);

  useEffect(() => {
    if (spoken !== msg.text) {
      window.speechSynthesis.speak(msg)
      setSpoken(msg.text)
    }
  }, [msg])

  const {
    seconds, minutes, hours, days,
    isRunning,
    start, pause, resume, restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => {
    setStopTimer(false)
    divRef.current.className = "timer expired"
  } });

  if (isRunning && seconds===0 && !done) {
    let msg = ""
    if (hours) {
      if (hours!==1) msg += `${hours} hours `
      else msg += "1 hour "
    }
    if (minutes) {
      if (msg.length) msg += "and "
      if (minutes!==1) msg += `${minutes} minutes `
      else msg += "1 minute "
    }
    msg += "left"
    setMsg(new SpeechSynthesisUtterance(msg))
    setDone(true)
  }
  
  if (isRunning && hours+minutes===0 && !done) {
    let msg = ""
    if (seconds<=10) msg += `${seconds}`
    else if (seconds%10===0) msg += `${seconds} seconds left`
    setMsg(new SpeechSynthesisUtterance(msg))
    setDone(true)
  }

  function handleStartTimer() {
    const hour = parseInt(options.hour.ref.current.value)
    const minute = parseInt(options.minute.ref.current.value)
    const second = parseInt(options.second.ref.current.value)
    const totalSecond = hour*3600 + minute*60 + second
    if (totalSecond === 0) return alert("Insert time required!")
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalSecond)
    setExpiryTimestamp(expiryTimestamp)
    divRef.current.className = "timer active"
    restart(expiryTimestamp)
  }

  function handleResumeTimer() {
    resume()
    divRef.current.className = "timer active"
  }

  function handlePauseTimer() {
    pause()
    divRef.current.className = "timer idle"
  }

  function handleResetTimer() {
    setStopTimer(true)
    divRef.current.className = "timer idle"
    restart()
    pause()
  }

  return (
    <>
    {(()=>{
      if (!isRunning && !stopTimer) return <TimesUp/>
    })()}

    <div ref={divRef} className="timer idle">
      {(()=>{
        if (hours+minutes+seconds!==0) return <Timer hours={hours} minutes={minutes} seconds={seconds}/>
        else return <OptionList options={options}/>
      })()}
    </div>
    <br/>
    <div className="buttons">
      {(()=>{
        if (hours+minutes+seconds===0 && stopTimer) return <button onClick={handleStartTimer}>Start Timer</button>
        else return <button onClick={handleResetTimer}>Reset Timer</button>
      })()}
      {(()=>{
        if (isRunning && stopTimer) return <button onClick={handlePauseTimer}>Pause Timer</button>
        else return <button onClick={handleResumeTimer} disabled={hours+minutes+seconds===0}>Resume Timer</button>
      })()}
    </div>
    </>
  )
}

export default App;
