import React from 'react';

/**
 * ProgressBar Component
 * Visualizes the user's progress toward the next difficulty spike[cite: 1].
 */
const ProgressBar = ({ current, total }) => {
  // Ensure we don't exceed 100%
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full mb-6">
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Progress to next tier</span>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;