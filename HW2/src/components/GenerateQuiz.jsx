import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const GenerateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [categories, setCategories] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    axios.get('https://the-trivia-api.com/api/categories')
      .then(response => {
        setCategories(Object.keys(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${numberOfQuestions}&difficulty=${difficulty}`)
      .then(response => {
        const quizId = uuidv4();
        localStorage.setItem(quizId, JSON.stringify(response.data));
        setQuizQuestions(response.data);
        setShareLink(`${window.location.origin}/play-quiz/${quizId}`);
      })
      .catch(error => {
        console.error('There was an error generating the quiz!', error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      {!quizQuestions ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded shadow-md">
          <h2 className="text-2xl mb-4">Generate a Quiz</h2>
          <div className="mb-4">
            <label className="block mb-2">Select Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Any Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Number of Questions</label>
            <input
              type="number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              min="1"
              max="50"
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Generate Quiz
          </button>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-2xl mb-4">Generated Quiz</h2>
          {quizQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg mb-2">{question.question}</h3>
              <ul>
                {[...question.incorrectAnswers, question.correctAnswer].map((answer, idx) => (
                  <li key={idx} className="border p-2 mb-2">{answer}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg">Share this link:</h3>
            <input
              type="text"
              value={shareLink}
              readOnly
              className="border p-2 w-full mt-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQuiz;
