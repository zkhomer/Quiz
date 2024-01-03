import { Module } from "vuex";
import { QuizService } from "@/services/fetchServices";

const quizService = new QuizService();

const difficultiesModule: Module<any, any> = {
  state: { difficulties: [], selectedDifficulty: "" },
  mutations: {
    setDifficulties(state, difficulties) {
      state.difficulties = difficulties;
    },
    setSelectedDifficulty(state, difficulty) {
      state.selectedDifficulty = difficulty;
    },
  },
  actions: {
    async fetchDifficulties({ commit }) {
      try {
        const difficulties = await quizService.fetchDifficulties();
        commit("setDifficulties", difficulties);
      } catch (error) {
        console.error("Error fetching difficulties:", error);
      }
    },
  },
};

export default difficultiesModule;
