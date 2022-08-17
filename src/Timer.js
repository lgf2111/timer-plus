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
  } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => {
    speak("Time's Up!")
    console.log("Time's Up!")
  } });
  
  function speak(msg) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg))
  }

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
  

  return (
    <>
      <span>{hours_}</span>:<span>{minutes_}</span>:<span>{seconds_}</span><br/>
    </>
  );
}