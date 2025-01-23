import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainTime, setRemainTime] = useState(timeout);
  useEffect(() => {
    console.log("Setting timeout")
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);
  useEffect(() => {
    console.log("Setting interval")
    setInterval(() => {
      setRemainTime((prev) => prev - 10);
    }, 10);
  }, []);
  return <progress id="question-time" value={remainTime} max={timeout} />;
}
