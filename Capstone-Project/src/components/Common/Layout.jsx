import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center px-8">
        <span className="font-bold text-xl text-blue-600">AdaptiveQuiz 🚀</span>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;