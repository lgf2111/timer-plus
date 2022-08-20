import {useEffect} from "react";

export default function TimesUp() {
  useEffect(() => {
    const interval = setInterval(() => {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Time's Up!"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
}
