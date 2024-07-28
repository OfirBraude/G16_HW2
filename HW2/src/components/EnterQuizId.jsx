import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterQuizId = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/play-quiz/${quizId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Enter Quiz ID</h2>
        <input
          type="text"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="Enter the quiz ID"
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Play Quiz
        </button>
      </form>
    </div>
  );
};

export default EnterQuizId;
