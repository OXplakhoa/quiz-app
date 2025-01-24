import { useCallback, useRef, useState } from "react";
import questions from "../questions";
import QuizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const shuffleAns = useRef();
  const [answerState, setAnswerState] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIdx =
    answerState === "" ? userAnswer.length : userAnswer.length - 1;
  const quizComplete = activeQuestionIdx === questions.length;
  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswer((prev) => {
        return [...prev, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === questions[activeQuestionIdx].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIdx]
  );
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (quizComplete) {
    return (
      <div id="summary">
        <img src={QuizComplete} alt="Quiz Complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  if (!shuffleAns.current){
    shuffleAns.current = [...questions[activeQuestionIdx].answers];
    shuffleAns.current.sort(() => Math.random() - 0.5);
  }
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={questions[activeQuestionIdx].id}
          timeout={5000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{questions[activeQuestionIdx].text}</h2>
        <ul id="answers">
          {shuffleAns.current.map((ans) => {
            const isSelected = userAnswer[userAnswer.length-1] === ans;
            let cssClass = '';
            if (answerState === 'answered' && isSelected){
              cssClass = 'selected';
            }
            if ((answerState === 'correct' || answerState === 'wrong') && isSelected ){
              cssClass = answerState
            }
            return (
              (
                <li key={ans} className="answer">
                  <button className={cssClass} onClick={() => handleSelectAnswer(ans)}>{ans}</button>
                </li>
              )
            )
          })}
        </ul>
      </div>
    </div>
  );
}
