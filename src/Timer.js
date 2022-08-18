import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    // days,
    // isRunning,
    // start,
    // pause,
    // resume,
    // restart,
  } = useTimer({ expiryTimestamp, autoStart: true, onExpire: onExpire });
  
  function onExpire() {
    speak("Time's Up")
    console.log("Time's Up")
  }

  function speak(msg) {
    // TODO: mobile audio support
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg))
  }

  const totalSeconds = hours*3600 + minutes*60 + seconds
  console.log(totalSeconds)

  const hours_ = hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  
  const minutes_ = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  
  const seconds_ = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  
  const timerState = totalSeconds === 0 ? 'expired' : 'active'
  const timerClass = `timer ${timerState}`

  return (
    <div className={timerClass}><span>{hours_}</span>:<span>{minutes_}</span>:<span>{seconds_}</span><br/></div>
  );
}