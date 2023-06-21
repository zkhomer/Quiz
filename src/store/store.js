import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const STORAGE_KEY = 'quiz-app-state';

export default new Vuex.Store({
  state: {
    categories: [],
    selectedCategory: '',
    difficulties: [],
    selectedDifficulty: '',
    numQuestions: null,
    currentQuestionIndex: 0,
    questions: [],
    selectedAnswers: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setDifficulties(state, difficulties) {
      state.difficulties = difficulties;
    },
    setSelectedDifficulty(state, difficulty) {
      state.selectedDifficulty = difficulty;
    },
    setNumQuestions(state, numQuestions) {
      state.numQuestions = numQuestions;
    },
    setCurrentQuestionIndex(state, index) {
      state.currentQuestionIndex = index;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setSelectedAnswer(state, answer) {
      Vue.set(state.selectedAnswers, state.currentQuestionIndex, answer);
    },
    resetQuiz(state) {
      state.selectedCategory = '';
      state.selectedDifficulty = '';
      state.numQuestions = null;
      state.currentQuestionIndex = 0;
      state.questions = [];
      state.selectedAnswers = [];
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        commit('setCategories', data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchDifficulties({ commit }) {
      try {
        const response = await fetch('https://opentdb.com/api_config.php');
        const data = await response.json();
        commit('setDifficulties', data.difficulty_levels);
      } catch (error) {
        console.error('Error fetching difficulties:', error);
      }
    },
    async startQuiz({ state, commit, dispatch }) {
      try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${state.numQuestions}&category=${state.selectedCategory}&difficulty=${state.selectedDifficulty}`
        );
        const data = await response.json();
        const questions = data.results.map((question) => {
          return {
            question: question.question,
            correctAnswer: question.correct_answer,
            incorrectAnswers: question.incorrect_answers,
          };
        });
        commit('setQuestions', questions);
        dispatch('nextQuestion');
      } catch (error) {
        console.error('Error starting quiz:', error);
      }
    },
    nextQuestion({ state, commit }) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        commit('setCurrentQuestionIndex', state.currentQuestionIndex + 1);
        const questionIndex = state.currentQuestionIndex + 1;
        router.push(`/quiz/${questionIndex}`);
      }
    },
    prevQuestion({ state, commit }) {
      if (state.currentQuestionIndex > 0) {
        commit('setCurrentQuestionIndex', state.currentQuestionIndex - 1);
        const questionIndex = state.currentQuestionIndex - 1;
        router.push(`/quiz/${questionIndex}`);
      }
    },
    finishQuiz({ state, commit }) {
      let numCorrectAnswers = 0;
      state.questions.forEach((question, index) => {
        const selectedAnswer = state.selectedAnswers[index];
        if (selectedAnswer === question.correctAnswer) {
          numCorrectAnswers++;
        }
      });
      commit('resetQuiz');
      return numCorrectAnswers;
    },
  },
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentQuestionIndex];
    },
    totalQuestions(state) {
      return state.questions.length;
    },
  },
  plugins: [localStoragePlugin],
});

function localStoragePlugin(store) {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    store.replaceState(JSON.parse(savedState));
  }

  store.subscribe((mutation, state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });
}
