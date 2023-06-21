<template>
  <div class="quiz-results-page">
    <h2 class="title">Quiz Results</h2>
    <p class="score">Your Score: {{ correctAnswersCount }} / {{ totalQuestions }}</p>

    <table class="questions-table">
      <thead>
      <tr>
        <th>Question</th>
        <th>Correct Answer</th>
        <th>Your Answer</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(question, index) in questions" :key="index">
        <td v-html="question.question">{{ question.question }}</td>
        <td v-html="question.correctAnswer">{{ question.correctAnswer }}</td>
        <td
          v-html="selectedAnswers[index]"
          :class="(isAnswerCorrect(question, index)) ? 'correct-answer' : 'incorrect-answer'"
        >
          {{ selectedAnswers[index] }}
        </td>
      </tr>
      </tbody>
    </table>
    <router-link to="/" class="home-link">Home</router-link>
  </div>
</template>

<script>
export default {
  name: "QuizResultsPage",

  computed: {
    totalQuestions() {
      return this.$store.getters.totalQuestions;
    },
    questions() {
      return this.$store.state.questions;
    },
    selectedAnswers() {
      return this.$store.state.selectedAnswers;
    },
    correctAnswersCount() {
      return this.questions.filter((question, index) => this.isAnswerCorrect(question, index)).length;
    }
  },

  methods: {
    isAnswerCorrect(question, index) {
      const selectedAnswer = this.selectedAnswers[index];
      return selectedAnswer === question.correctAnswer;
    }
  }
};
</script>

<style>
.quiz-results-page {
  text-align: center;
  border: 1px solid #000;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.score {
  font-size: 18px;
  margin-bottom: 20px;
}

.questions-table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.questions-table th,
.questions-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.questions-table th {
  background-color: #f0f0f0;
}

.correct-answer {
  background-color: #c6efc6;
}

.incorrect-answer {
  background-color: #fba7a7;
}

.home-link {
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;
}
</style>
