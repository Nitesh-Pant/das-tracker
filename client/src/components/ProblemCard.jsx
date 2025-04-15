// src/components/ProblemCard.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

const ProblemCard = ({ problem, topicId, completed, onProgressUpdate }) => {
  const [isChecked, setIsChecked] = useState(completed);

  useEffect(() => {
    setIsChecked(completed); // Sync with parent on refresh
  }, [completed]);

  const handleCheckbox = async () => {
    try {
      const newStatus = !isChecked;
      setIsChecked(newStatus);

      await API.post('/progress', {
        topicId,
        problemId: problem._id,
        completed: newStatus,
      });

      onProgressUpdate(problem._id, newStatus);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2 border">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">{problem.title}</h4>
        <input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {problem.youtube && (
          <a href={problem.youtube} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            YouTube
          </a>
        )}
        {problem.leetcode && (
          <a href={problem.leetcode} target="_blank" rel="noreferrer" className="text-green-600 underline">
            Leetcode
          </a>
        )}
        {problem.article && (
          <a href={problem.article} target="_blank" rel="noreferrer" className="text-purple-600 underline">
            Article
          </a>
        )}
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            problem.level === 'Easy' ? 'bg-green-500' : problem.level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
          }`}
        >
          {problem.level}
        </span>
      </div>
    </div>
  );
};

export default ProblemCard;
