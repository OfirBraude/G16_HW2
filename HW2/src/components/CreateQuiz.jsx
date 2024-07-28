import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [categories, setCategories] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
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

  const fetchQuestions = (e) => {
    e.preventDefault();
    axios.get(`https://the-trivia-api.com/api/questions?categories=${category}&difficulty=${difficulty}`)
      .then(response => {
        setAvailableQuestions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  };

  const toggleQuestionSelection = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else if (selectedQuestions.length < numberOfQuestions) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const saveQuiz = () => {
    if (selectedQuestions.length === numberOfQuestions) {
      const quizId = uuidv4();
      localStorage.setItem(quizId, JSON.stringify(selectedQuestions));
      setShareLink(`${window.location.origin}/play-quiz/${quizId}`);
    } else {
      alert(`Please select exactly ${numberOfQuestions} questions.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl mb-4">Create a Quiz</h2>
        <form onSubmit={fetchQuestions}>
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Fetch Questions
          </button>
        </form>
        {availableQuestions.length > 0 && (
          <div>
            <h3 className="text-lg mb-2">Select Questions (Select up to {numberOfQuestions})</h3>
            <ul className="mb-4">
              {availableQuestions.map((question, index) => (
                <li key={index} className={`border p-2 mb-2 ${selectedQuestions.includes(question) ? 'bg-green-100' : ''}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question)}
                      onChange={() => toggleQuestionSelection(question)}
                      className="mr-2"
                    />
                    {question.question}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={saveQuiz} className="bg-green-500 text-white px-4 py-2 rounded">
              Save Quiz
            </button>
            {shareLink && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
