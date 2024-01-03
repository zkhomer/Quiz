import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import router from "@/router";
import { Question, QuizState } from "@/types/quiz";
import { QuizService } from "@/services/fetchServices";
Vue.use(Vuex);

const STORAGE_KEY = "quiz-app-state";

const quizService = new QuizService();

const storeOptions: StoreOptions<QuizState> = {
  state: {
    categories: [],
    selectedCategory: "",
    difficulties: [],
    selectedDifficulty: "",
    numQuestions: null,
    currentQuestionIndex: 0,
    questions: [],
    selectedAnswers: [],
  },

  mutations: {
    setCategories(state: QuizState, categories) {
      state.categories = categories;
    },
    setSelectedCategory(state: QuizState, category) {
      state.selectedCategory = category;
    },
    setDifficulties(state: QuizState, difficulties) {
      state.difficulties = difficulties;
    },
    setSelectedDifficulty(state: QuizState, difficulty) {
      state.selectedDifficulty = difficulty;
    },
    setNumQuestions(state: QuizState, numQuestions) {
      state.numQuestions = numQuestions;
    },
    setCurrentQuestionIndex(state: QuizState, index) {
      state.currentQuestionIndex = index;
    },
    setQuestions(state: QuizState, questions) {
      state.questions = questions;
    },
    setSelectedAnswer(state: QuizState, answer) {
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
    async fetchCategories({ commit }) {
      try {
        const categories = await quizService.fetchCategories();
        commit("setCategories", categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchDifficulties({ commit }) {
      try {
        const difficulties = await quizService.fetchDifficulties();
        commit("setDifficulties", difficulties);
      } catch (error) {
        console.error("Error fetching difficulties:", error);
      }
    },
    async startQuiz({ state, commit, dispatch }) {
      try {
        const numQuestions: number = state.numQuestions || 0;
        const questions: Question[] = await quizService.startQuiz(
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
  plugins: [localStoragePlugin],
};

function localStoragePlugin(store: any) {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    store.replaceState(JSON.parse(savedState));
  }

  store.subscribe((mutation: any, state: QuizState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });
}

export default new Vuex.Store<QuizState>(storeOptions);
