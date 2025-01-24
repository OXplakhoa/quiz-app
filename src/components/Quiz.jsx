import { useCallback, useState } from "react";
import questions from "../questions";
import QuizComplete from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
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
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx}
        questionText={questions[activeQuestionIdx].text}
        answers={questions[activeQuestionIdx].answers}
        answerState={answerState}
        selectedAnswer={userAnswer[userAnswer.length - 1]}
        handleSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
