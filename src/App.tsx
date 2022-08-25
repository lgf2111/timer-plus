import React, { useRef, useState } from 'react';
import {useTimer} from 'react-timer-hook'

import SelectList from './components/SelectList'
import TTS from './components/TTS';
import TimesUp from './components/TimesUp';

import './styles/App.css';


const App: React.FC = () => {
  const [stopTimer, setStopTimer] = useState(true)
  const [spoken, setSpoken] = useState("")

  const timerDivRef = useRef<HTMLDivElement>(null)

  const selects =  {hour:   {ref: useRef<HTMLSelectElement>(null), opts: Array.from(Array(24).keys())},
                    minute: {ref: useRef<HTMLSelectElement>(null), opts: Array.from(Array(60).keys())},
                    second: {ref: useRef<HTMLSelectElement>(null), opts: Array.from(Array(60).keys())}}

  const {
    seconds, minutes, hours, isRunning, 
    pause, resume, restart,
  } = useTimer({expiryTimestamp: new Date(), autoStart: false, onExpire: () => {
    setStopTimer(false)
    timerDivRef.current!.className = "timer expired"
  }})

  const idxs = {hour: hours, minute: minutes, second: seconds}
  const totalSeconds = hours*3600 + minutes*60 + seconds

  const handleStart = () => {
    timerDivRef.current!.className = "timer active"
    if (totalSeconds) return resume()
    let totalSelectedSeconds = 0
    totalSelectedSeconds += parseInt(selects.hour.ref.current?.value!) * 3600
    totalSelectedSeconds += parseInt(selects.minute.ref.current?.value!) * 60
    totalSelectedSeconds += parseInt(selects.second.ref.current?.value!)
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalSelectedSeconds)
    restart(expiryTimestamp)
  }

  const handlePause = () => {
    let className = "timer "
    if (totalSeconds) className += "paused"
    else className += "idle"
    timerDivRef.current!.className = className
    pause()
  }

  const handleReset = () => {
    setStopTimer(true)
    setSpoken("")
    timerDivRef.current!.className = "timer idle"
    const expiryTimestamp = new Date()
    restart(expiryTimestamp)
    pause()
  }

  return (
    <>
    {(()=>{
      if (!isRunning && !stopTimer) return <TimesUp/>
                                    return <TTS idxs={idxs} isRunning={isRunning} spoken={spoken} setSpoken={setSpoken}/>

    })()}
    <div ref={timerDivRef} className="timer idle">
      {(()=>{if (isRunning || !stopTimer) return <div className="screen"></div> })()}
      <SelectList selects={selects} idxs={idxs}/>
    </div>
    <div className="buttons">
      {(()=>{if(!isRunning) return <button onClick={handleStart} disabled={!stopTimer}><i className="bi bi-play-fill"></i></button>
                            return <button onClick={handlePause}><i className="bi bi-pause"></i></button>})()}
      <button onClick={handleReset} disabled={totalSeconds===0 && stopTimer}><i className='bi bi-x'></i></button>
    </div>
    </>
  )
}

export default App;
