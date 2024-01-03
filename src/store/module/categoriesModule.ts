import { Module } from "vuex";
import { QuizService } from "@/services/fetchServices";

const quizService = new QuizService();
const categoriesModule: Module<any, any> = {
  state: { categories: [], selectedCategory: "" },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
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
  },
};

export default categoriesModule;
