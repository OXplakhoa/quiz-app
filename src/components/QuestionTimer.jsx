import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainTime, setRemainTime] = useState(timeout);
  useEffect(() => {
    console.log("Setting timeout")
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    }
  }, [timeout, onTimeout]);
  useEffect(() => {
    console.log("Setting interval")
    const interval = setInterval(() => {
      setRemainTime((prev) => prev - 10);
    }, 10);
    return () => {
      clearInterval(interval)
    }
  }, []);
  return <progress id="question-time" value={remainTime} max={timeout} />;
}
