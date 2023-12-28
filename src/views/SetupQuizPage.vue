<template>
  <div class="setup-quiz-page">
    <h2 class="title">Setup Quiz</h2>
    <form @submit.prevent="startQuiz">
      <div class="form-group">
        <label for="category">Category:</label>
        <BaseSelect id="category" v-model="selectedCategory" required>
          <option value="" disabled selected>Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </BaseSelect>
      </div>
      <div class="form-group">
        <label for="difficulty">Difficulty:</label>
        <BaseSelect id="difficulty" v-model="selectedDifficulty" required :disabled="!selectedCategory">
          <option value="" disabled selected>Select a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </BaseSelect>
      </div>
      <div class="form-group">
        <label for="num-questions">Number of Questions:</label>
        <BaseInput type="number" id="num-questions" v-model="numQuestions" :min="1" :max="maxNumQuestions" required :disabled="!selectedCategory || !selectedDifficulty"></BaseInput>
      </div>
      <button type="submit" :disabled="!selectedCategory || !selectedDifficulty || !numQuestions">Start Quiz</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseInput from '@/components/BaseInput.vue';

export default {
  name: 'SetupQuizPage',
  components: {
    BaseSelect,
    BaseInput,
  },
  data() {
    return {
      categories: [],
      selectedCategory: '',
      selectedDifficulty: '',
      numQuestions: null,
      maxNumQuestions: 116,
      errorFetchingCategories: false,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        this.categories = response.data.trivia_categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.errorFetchingCategories = true;
      }
    },
    async startQuiz() {
      if (this.numQuestions < 1 || this.numQuestions > 116) {
        alert('Number of Questions should be between 1 and 116');
        return;
      }
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${this.numQuestions}&category=${this.selectedCategory}&difficulty=${this.selectedDifficulty}&type=multiple`);
        const questions = response.data.results.map((question) => {
          return {
            question: question.question,
            correctAnswer: question.correct_answer,
            incorrectAnswers: question.incorrect_answers,
          };
        });
        this.$store.commit('setQuestions', questions);
        this.$store.commit('setCurrentQuestionIndex', 0);
        this.$router.push(`/quiz/1`);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    },
  },
};
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
