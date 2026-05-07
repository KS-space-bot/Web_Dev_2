import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../features/quiz/quizSlice';
import Layout from '../components/Common/Layout';

export default function Results() {
  const { score, history, difficulty } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Score Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-800 mb-2">Quiz Complete!</h1>
          <p className="text-slate-500 uppercase tracking-widest font-bold">Final Score</p>
          <div className="text-7xl font-black text-blue-600 my-4">{score}</div>
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
            Reached Level: {difficulty.toUpperCase()}
          </span>
        </div>

        {/* Chart Section - Advanced Feature[cite: 2] */}
        <div className="w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100 mb-10">
          <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center">
            <span className="mr-2">📈</span> Performance Analytics
          </h3>
          <div className="h-72 w-full">
            {history.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                No data points collected yet.
              </div>
            )}
          </div>
          <p className="mt-4 text-sm text-slate-400 text-center italic">
            This graph tracks your score growth as difficulty scaled.
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button 
            onClick={handleRestart}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-white text-slate-600 border border-slate-200 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            Download Report
          </button>
        </div>
      </div>
    </Layout>
  );
}