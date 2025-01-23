import { useCallback, useState } from "react";
import questions from "../questions";
import QuizComplete from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIdx = userAnswer.length;
  const quizComplete = activeQuestionIdx === questions.length;
  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswer((prev) => {
      return [...prev, selectedAnswer];
    });
  },[])
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer])
  if(quizComplete){
    return <div id="summary">
      <img src={QuizComplete} alt="Quiz Complete" />
      <h2>Quiz Completed!</h2>
    </div>
  }
  const shuffleAns = [...questions[activeQuestionIdx].answers];
  shuffleAns.sort(() => Math.random() - 0.5);
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={5000} onTimeout={handleSkipAnswer}/>
        <h2>{questions[activeQuestionIdx].text}</h2>
        <ul id="answers">
          {shuffleAns.map((ans) => (
            <li key={ans} className="answer">
              <button onClick={() => handleSelectAnswer(ans)}>{ans}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
