import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    difficulty: ["easy", "medium", "hard"],
    setting: {
      amount: "",
      categoryId: "",
      difficulty: "",
    },
    setupData: [],
    quizSetup: {
      quizCount: 0,
      maxCountValue: 0,
    },
    userAnswers: [],
    quizResult: JSON.parse(localStorage.getItem("answerHistory")),
  },
  getters: {
    allState(state) {
      return state;
    },
    allCategories(state) {
      return state.categories;
    },
    allDifficulty(state) {
      return state.difficulty;
    },
    getSetUpData(state) {
      return state.setupData;
    },
    getQuizSetup(state) {
      return state.quizSetup;
    },
    getUsersAnswers(state) {
      return state.userAnswers;
    },
    getResultAnswers(state) {
      return state.quizResult;
    },
  },
  mutations: {
    setState(state, data) {
      state = data;
    },
    setCategories(state, data) {
      state.categories = data;
    },
    setSetupData(state, data) {
      localStorage.setItem("quizData", JSON.stringify(state));
      state.setupData = data;
    },
    setQuizAnswers(state, date) {
      state.quizSetup = date;
    },
    setMaxCount(state, date) {
      state.quizSetup.maxCountValue = date;
    },
    countAction(state, date) {
      state.quizSetup.quizCount += date;
    },
    resetQuiz(state) {
      state.quizSetup.quizCount = 0;
      state.userAnswers = [];
    },
    userAnswersPush(state, data) {
      state.userAnswers.push(data);
    },
    setUserQuizResult(state, data) {
      state.quizResult = localStorage.getItem(data);
    },
  },
  actions: {
    async getCategories(ctx) {
      try {
        const res = await axios.get("https://opentdb.com/api_category.php");
        const data = res.data.trivia_categories;
        ctx.commit("setCategories", data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
