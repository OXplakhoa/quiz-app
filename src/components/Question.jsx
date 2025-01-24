import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({
  questionText,
  answers,
  handleSelectAnswer,
  selectedAnswer,
  answerState,
  handleSkipAnswer,
}) {
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={5000} onTimeout={handleSkipAnswer} />
        <h2>{questionText}</h2>
        <Answers
          answerState={answerState}
          selectedAnswer={selectedAnswer}
          answers={answers}
          handleSelectAnswer={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
