import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnToMainMenuButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
    >
      Return to Main Menu
    </button>
  );
};

export default ReturnToMainMenuButton;
