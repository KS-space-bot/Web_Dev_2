import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDomain, resetQuiz } from '../features/quiz/quizSlice';
import { Cpu, Trophy, History, Leaf } from 'lucide-react';
import Layout from '../components/Common/Layout';

const DOMAINS = [
  { id: 18, name: 'Computers', icon: <Cpu />, color: 'bg-blue-500' },
  { id: 21, name: 'Sports', icon: <Trophy />, color: 'bg-orange-500' },
  { id: 23, name: 'History', icon: <History />, color: 'bg-amber-600' },
  { id: 17, name: 'Science', icon: <Leaf />, color: 'bg-emerald-500' },
];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = (domain) => {
    dispatch(resetQuiz());
    
    dispatch(setDomain({ id: domain.id, name: domain.name }));
    navigate('/quiz');
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-tight">
            Quiz <span className="text-blue-600">Platform</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Choose your domain below. Difficulty scales
            in real-time based on your performance. Reach the 'Hard' tier to win.
          </p>
        </div>

        {/* Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              onClick={() => handleStart(d)}
              className="group relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden text-left"
            >
              {/* Icon Circle */}
              <div className={`w-14 h-14 ${d.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100`}>
                {d.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-800">{d.name}</h3>
              <div className="flex items-center text-blue-600 font-bold text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Start Training <span className="ml-2">→</span>
              </div>

              {/* Faded Background Icon for Design Depth */}
              <div className="absolute -right-4 -bottom-4 text-slate-200 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                {React.cloneElement(d.icon, { size: 120 })}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}