import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl mb-8">Welcome, {name}!</h1>
      <div className="space-y-4">
        <Link to="/enter-quiz-id">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Play a Quiz</button>
        </Link>
        <Link to="/generate-quiz">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Generate a Quiz</button>
        </Link>
        <Link to="/create-quiz">
          <button className="bg-red-500 text-white px-4 py-2 rounded">Create a Quiz</button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
