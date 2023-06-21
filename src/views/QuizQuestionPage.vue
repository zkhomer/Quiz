<template>
  <div class="quiz-question-page">
    <h2 class="title">Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}</h2>
    <h3 v-html="currentQuestion.question" class="question">{{ currentQuestion.question }}</h3>
    <div class="answers">
      <label v-for="(answer, index) in currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer)" :key="index">
        <input type="radio" :value="answer" v-model="selectedAnswer" />
        {{ answer }}
      </label>
    </div>
    <div class="error" v-if="!selectedAnswer">Please select an answer to continue.</div>
    <div class="buttons">
      <BaseButton v-if="currentQuestionIndex === 0" @click="restartQuiz">Restart Quiz</BaseButton>
      <BaseButton v-else @click="prevQuestion">Prev</BaseButton>
      <BaseButton @click="nextQuestion" :disabled="!selectedAnswer">
        {{ isLastQuestion ? "Finish" : "Next" }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "QuizQuestionPage",

  components: {
    BaseInput,
    BaseButton
  },

  data() {
    return {
      selectedAnswer: ""
    };
  },

  computed: {
    currentQuestion() {
      return this.$store.getters.currentQuestion;
    },
    currentQuestionIndex() {
      const questionIndex = parseInt(this.$route.params.questionIndex);
      const maxIndex = this.totalQuestions;
      if (isNaN(questionIndex) || questionIndex < 1 || questionIndex > maxIndex) {
        this.$router.push("/");
      }
      return questionIndex - 1;
    },
    totalQuestions() {
      return this.$store.getters.totalQuestions;
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.totalQuestions - 1;
    }
  },

  methods: {
    restartQuiz() {
      this.$store.dispatch("resetQuiz");
      this.$router.push("/setup");
    },
    prevQuestion() {
      this.$store.commit("setSelectedAnswer", this.selectedAnswer);
      const prevQuestionIndex = this.currentQuestionIndex - 1;
      if (prevQuestionIndex >= 0) {
        this.$store.commit("setCurrentQuestionIndex", prevQuestionIndex);
        this.selectedAnswer = this.$store.state.selectedAnswers[prevQuestionIndex];
        this.$router.push(`/quiz/${prevQuestionIndex + 1}`);
      }
    },
    nextQuestion() {
      if (!this.selectedAnswer) {
        alert("Please select an answer to continue.");
        return;
      }

      this.$store.commit("setSelectedAnswer", this.selectedAnswer);
      const nextQuestionIndex = this.currentQuestionIndex + 1;
      if (nextQuestionIndex >= this.totalQuestions) {
        this.$router.push("/results");
      } else {
        this.$store.commit("setCurrentQuestionIndex", nextQuestionIndex);
        this.selectedAnswer = "";
        this.$router.push(`/quiz/${nextQuestionIndex + 1}`);
      }
    }
  }
};
</script>

<style>
.quiz-question-page {
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

.question {
  font-size: 18px;
  margin-bottom: 20px;
}

.answers {
  text-align: left;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="radio"] {
  margin-right: 5px;
}

.buttons {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
