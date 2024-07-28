import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlayQuiz = () => {
  const { quizId } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const quizData = localStorage.getItem(quizId);
    if (quizData) {
      setQuizQuestions(JSON.parse(quizData));
    } else {
      console.error('Quiz not found');
    }
  }, [quizId]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newScore = 0;
    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl mb-4">Quiz Results</h2>
        <p className="text-lg mb-4">Your Score: {score} / {quizQuestions.length}</p>
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-2xl">
          {quizQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg mb-2">{question.question}</h3>
              <ul>
                {question.incorrectAnswers.concat(question.correctAnswer).map((answer, idx) => (
                  <li
                    key={idx}
                    className={`border p-2 mb-2 ${answers[index] === answer ? (answer === question.correctAnswer ? 'bg-green-100' : 'bg-red-100') : ''}`}
                  >
                    {answer}
                  </li>
                ))}
              </ul>
              {answers[index] !== question.correctAnswer && (
                <p className="text-red-500">Correct Answer: {question.correctAnswer}</p>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => setShowResults(false)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl mb-4">Play the Quiz</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-2xl">
        {quizQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg mb-2">{question.question}</h3>
            <ul>
              {question.incorrectAnswers.concat(question.correctAnswer).map((answer, idx) => (
                <li key={idx} className="border p-2 mb-2">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={answer}
                      onChange={() => handleAnswerChange(index, answer)}
                      className="mr-2"
                    />
                    {answer}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default PlayQuiz;
