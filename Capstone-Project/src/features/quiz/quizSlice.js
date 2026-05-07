import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  domain: null, // Stores { id, name }
  difficulty: 'easy',
  score: 0,
  streak: 0,
  history: [], // For the Performance Trend chart
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    processAnswer: (state, action) => {
      const isCorrect = action.payload;
      
      if (isCorrect) {
        // Points based on current difficulty
        const points = state.difficulty === 'hard' ? 30 : state.difficulty === 'medium' ? 20 : 10;
        state.score += points;
        state.streak += 1;
      } else {
        state.streak = 0; // Reset streak on wrong answer
      }

      // Dynamic Difficulty Scaling logic
      if (state.streak >= 3 && state.difficulty === 'easy') {
        state.difficulty = 'medium';
      } else if (state.streak >= 6 && state.difficulty === 'medium') {
        state.difficulty = 'hard';
      }
      
      // Captures data point for the Results chart
      state.history.push({ 
        name: `Q${state.history.length + 1}`, 
        score: state.score, 
        difficulty: state.difficulty 
      });
    },
    resetQuiz: () => initialState,
  },
});

export const { setDomain, processAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;