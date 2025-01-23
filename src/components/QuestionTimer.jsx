import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainTime, setRemainTime] = useState(timeout);
  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);
  useEffect(() => {
    setInterval(() => {
      setRemainTime((prev) => prev - 10);
    }, 10);
  }, []);
  return <progress id="question-time" value={remainTime} max={timeout} />;
}
