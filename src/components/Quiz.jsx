import { useCallback, useState } from "react";
import questions from "../questions";
import QuizComplete from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIdx = userAnswer.length;
  const quizComplete = activeQuestionIdx === questions.length;
  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswer((prev) => {
      return [...prev, selectedAnswer];
    });
  }, []);
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
        index={activeQuestionIdx}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
