<template>
  <div class="setup-quiz-page">
    <h2 class="title">Setup Quiz</h2>
    <form @submit.prevent="startQuiz">
      <div class="form-group">
        <label for="category">Category:</label>
        <BaseSelect id="category" v-model="selectedCategory" required>
          <option value="" disabled selected>Select a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </BaseSelect>
      </div>
      <div class="form-group">
        <label for="difficulty">Difficulty:</label>
        <BaseSelect
          id="difficulty"
          v-model="selectedDifficulty"
          required
          :disabled="!selectedCategory"
        >
          <option value="" disabled selected>Select a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </BaseSelect>
      </div>
      <div class="form-group">
        <label for="num-questions">Number of Questions:</label>
        <BaseInput
          type="number"
          id="num-questions"
          v-model="numQuestions"
          :min="1"
          :max="maxNumQuestions"
          required
          :disabled="!selectedCategory || !selectedDifficulty"
        ></BaseInput>
      </div>
      <button type="submit">Start Quiz</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
import { QuizService } from "@/services/fetchServices";

export default defineComponent({
  name: "SetupQuizPage",
  components: {
    BaseSelect,
    BaseInput,
  },
  data() {
    return {
      categories: [],
      selectedCategory: "",
      selectedDifficulty: "",
      numQuestions: null,
      maxNumQuestions: 116,
      formSubmitted: false,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const quizService = new QuizService();
        this.categories = await quizService.fetchCategories();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async startQuiz() {
      this.formSubmitted = true;
      if (
        !this.selectedCategory ||
        !this.selectedDifficulty ||
        !this.numQuestions
      ) {
        return;
      }

      try {
        const quizService = new QuizService();
        const questions = await quizService.startQuiz(
          this.numQuestions,
          this.selectedCategory,
          this.selectedDifficulty
        );
        this.$store.commit("setQuestions", questions);
        this.$store.commit("setCurrentQuestionIndex", 0);
        this.$router.push(`/quiz/1`);
      } catch (error) {
        console.error("Error starting quiz:", error);
      }
    },
  },
});
</script>

<style>
.setup-quiz-page {
  text-align: center;
  border: 1px solid #000;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

select,
input[type="number"] {
  padding: 5px;
  font-size: 16px;
  width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
