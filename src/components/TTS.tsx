import React, { useEffect, useState } from 'react'
import { TTSProps } from './model'

const TTS: React.FC<TTSProps> = ({idxs, isRunning, spoken, setSpoken}) => {
  const [msg, setMsg] = useState(new SpeechSynthesisUtterance())
  const [done, setDone] = useState(false)

  useEffect(() => {
    const checkDone = setInterval(() => {
      setDone(false)
    }, 0);
    return () => clearInterval(checkDone);
  }, []);

  useEffect(()=>{
    if (spoken !== msg.text) {
      window.speechSynthesis.speak(msg)
      setSpoken(msg.text)
    }  
  }, [msg, spoken, setSpoken])

  const [hours, minutes, seconds] = [idxs.hour, idxs.minute, idxs.second]
  
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

  return null
}

export default TTS