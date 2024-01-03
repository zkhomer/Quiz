import { Module } from "vuex";
import router from "@/router";
import { QuizState } from "@/types/quiz";
import { QuizService } from "@/services/fetchServices";
import Vue from "vue";

const quizService = new QuizService();

const initialState: QuizState = {
  categories: [],
  selectedCategory: "",
  difficulties: [],
  selectedDifficulty: "",
  numQuestions: null,
  currentQuestionIndex: 0,
  questions: [],
  selectedAnswers: [],
};

const quizModule: Module<QuizState, any> = {
  state: { ...initialState },
  mutations: {
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
      state.selectedCategory = "";
      state.selectedDifficulty = "";
      state.numQuestions = null;
      state.currentQuestionIndex = 0;
      state.questions = [];
      state.selectedAnswers = [];
    },
  },
  actions: {
    async startQuiz({ state, commit, dispatch }) {
      try {
        const numQuestions = state.numQuestions || 0;
        const questions = await quizService.startQuiz(
          numQuestions,
          state.selectedCategory,
          state.selectedDifficulty
        );
        commit("setQuestions", questions);
        dispatch("nextQuestion");
      } catch (error) {
        console.error("Error starting quiz:", error);
      }
    },
    nextQuestion({ state, commit }) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        commit("setCurrentQuestionIndex", state.currentQuestionIndex + 1);
        const questionIndex = state.currentQuestionIndex + 1;
        router.push(`/quiz/${questionIndex}`);
      }
    },
    prevQuestion({ state, commit }) {
      if (state.currentQuestionIndex > 0) {
        commit("setCurrentQuestionIndex", state.currentQuestionIndex - 1);
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
      commit("resetQuiz");
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
};
export default quizModule;
