import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState,handleSelectAnswer}) {
    const shuffleAns = useRef();
    if (!shuffleAns.current){
        shuffleAns.current = [...answers];
        shuffleAns.current.sort(() => Math.random - 0.5);
    }
  return (
    <ul id="answers">
      {shuffleAns.current.map((ans) => {
        const isSelected = selectedAnswer === ans;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={ans} className="answer">
            <button
              className={cssClass}
              onClick={() => handleSelectAnswer(ans)}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
