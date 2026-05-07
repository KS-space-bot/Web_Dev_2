import React from 'react';


const OptionButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-5 text-left border-2 border-slate-100 rounded-2xl 
               hover:border-brand-600 hover:bg-brand-50 hover:pl-7
               active:scale-95 transition-all duration-200 
               font-medium text-slate-700 flex justify-between items-center group"
  >
    <span dangerouslySetInnerHTML={{ __html: text }} />
    <span className="opacity-0 group-hover:opacity-100 text-brand-600 transition-opacity">→</span>
  </button>
);

export default OptionButton;