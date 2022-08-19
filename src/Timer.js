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
    let text = "Time's Up!"
    speak(text)
    console.log(text)
  }

  function speak(text) {
    const msg = new SpeechSynthesisUtterance()
    msg.text = text
    window.speechSynthesis.speak(msg)
  }

  const totalSeconds = hours*3600 + minutes*60 + seconds
  console.log(totalSeconds)

  const [hours_, minutes_, seconds_] = [hours, minutes, seconds].map(el => {
    return el.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  })

  const timerState = totalSeconds === 0 ? 'expired' : 'active'
  const timerClass = `timer ${timerState}`

  return (
    <div className={timerClass}><span>{hours_}</span>:<span>{minutes_}</span>:<span>{seconds_}</span><br/></div>
  );
}