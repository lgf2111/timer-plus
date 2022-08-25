import { useEffect } from "react";

const TimesUp = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Time's Up!"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default TimesUp;
