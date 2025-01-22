import { useState } from "react";
import questions from "../questions";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIdx = userAnswer.length;
  const shuffleAns = [...questions[activeQuestionIdx].answers];
  shuffleAns.sort(() => Math.random() - 0.5);
  const handleAnswer = (selectedAnswer) => {
    setUserAnswer((prev) => {
      return [...prev, selectedAnswer];
    });
  };
  return (
    <div id="quiz">
      <div id="question">
        <h2>{questions[activeQuestionIdx].text}</h2>
        <ul id="answers">
          {shuffleAns.map((ans) => (
            <li key={ans} className="answer">
              <button onClick={() => handleAnswer(ans)}>{ans}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
