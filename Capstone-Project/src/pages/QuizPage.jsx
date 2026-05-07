import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processAnswer } from '../features/quiz/quizSlice';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../hooks/useTimer';
import Layout from '../components/Common/Layout';
import OptionButton from '../components/Common/OptionButton';
import ProgressBar from '../components/Quiz/ProgressBar';

export default function QuizPage() {
  const { domain, difficulty, score, streak } = useSelector((state) => state.quiz);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Hook Integration
  const { timeLeft, resetTimer } = useTimer(30, () => handleChoice(null));

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=1&category=${domain.id}&difficulty=${difficulty}&type=multiple`);
      const data = await res.json();
      setQuestion(data.results[0]);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!domain) {
      navigate('/');
      return;
    }
    fetchQuestion();
  }, [difficulty]);

  const handleChoice = (choice) => {
    const isCorrect = question && choice === question.correct_answer;
    dispatch(processAnswer(isCorrect));
    resetTimer(); 
    fetchQuestion();
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-bold animate-pulse">
      Scaling Difficulty to {difficulty}...
    </div>
  );

 
  const answers = question ? [...question.incorrect_answers, question.correct_answer].sort() : [];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Current Score</span>
            <span className="text-3xl font-black text-blue-600">{score}</span>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-bounce' : 'text-slate-700'}`}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
            <p className="text-xs text-slate-400">Time Remaining</p>
          </div>
        </div>

        {/* Progress & Level Info */}
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold text-orange-600">Level: {difficulty.toUpperCase()}</span>
          <span className="text-xs text-slate-500">Streak: {streak} / 10</span>
        </div>
        <ProgressBar current={streak} total={10} />

        {/* Question Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h2
            className="text-2xl font-semibold mb-8 leading-snug text-slate-800"
            dangerouslySetInnerHTML={{ __html: question?.question }}
          />

          <div className="grid grid-cols-1 gap-4">
            {answers.map((ans) => (
              <OptionButton
                key={ans}
                text={ans}
                onClick={() => handleChoice(ans)}
              />
            ))}
          </div>
        </div>

        {/* Quit Action */}
        <button
          onClick={() => navigate('/results')}
          className="mt-8 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium w-full text-center"
        >
          End Quiz and See Results
        </button>
      </div>
    </Layout>
  );
}