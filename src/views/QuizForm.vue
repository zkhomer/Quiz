<template>
  <form @submit.prevent>
    <span>{{ getQuizSetup.quizCount + 1 }}/ {{ getSetUpData.length }}</span>
    <h1 v-if="getSetUpData[getQuizSetup.quizCount].question">
      {{ getSetUpData[getQuizSetup.quizCount].question }}
    </h1>
    <div v-show="!finishQiz">
      <template v-for="(item, index) of answers">
        <input
          :value="item"
          name="answer"
          @change="(item) => changeHandler(index, item)"
          :id="item"
          :key="item + Math.random()"
          type="radio"
        />
        <label :for="item" :key="item"> {{ item }} </label>
      </template>
    </div>
    <div class="controls">
      <button :disabled="prevBlock" @click="resetQuizHandler">
        Restart this Quiz
      </button>
      <button v-if="!finishQiz" @click="countHandlerNext">next</button>
      <button v-else @click="getAnswers">Finish</button>
    </div>
    <div v-if="errMsg">pls select answer</div>
  </form>
</template>

<script lang="js">
import Vue from "vue";
import { mapGetters } from "vuex";

Vue.component("ValidationProvider");

export default Vue.extend({
  props: {},
  data() {
    return {
      answers: [],
      correctAnswers: [],
      prevBlock: true,
      finishQiz: false,
      userAnswer: "",
      userAnswersCollection: [],
      selectedAnswer: false,
      errMsg: false,
      countStep: 1
    };
  },
  computed: {
    ...mapGetters(["getSetUpData", "getQuizSetup"])
  },
  methods: {
    ...mapGetters(["getUsersAnswers"]),
    countHandlerNext() {
      if (!this.selectedAnswer) {
        this.errMsg = true;
        return;
      }
      if (this.countStep < this.getSetUpData.length) {
        this.countStep++;
      }
      this.selectedAnswer = false;
      this.errMsg = false;
      this.prevBlock = false;
      this.$router.push(
        {
          name: "QuizForm",
          params: {
            count: this.countStep,
            name: name + this.count
          }
        }
      ).catch(err => {
        console.log(err);
      });

      this.$store.commit("userAnswersPush", this.userAnswer);
      if (this.getQuizSetup.quizCount === this.getSetUpData.length - 1) {
        this.finishQiz = true;
        return;
      } else {
        this.finishQiz = false;
        this.$store.commit("countAction", 1);
        this.answers = [
          this.getSetUpData[this.getQuizSetup.quizCount].correct_answer,
          ...this.getSetUpData[this.getQuizSetup.quizCount].incorrect_answers
        ];
      }

    },
    resetQuizHandler() {
      this.prevBlock = true;
      this.finishQiz = false;
      this.countStep = 1
      this.$store.commit("resetQuiz");
      this.$router.push(
        {
          name: "QuizForm",
          params: {
            count: this.countStep,
            name: name +  this.countStep,
          }
        }
      ).catch(err => {
        console.log(err);
      });
    },
    changeHandler(e, item) {
      this.selectedAnswer = true;
      this.userAnswer = item.target.value;
      this.getSetUpData[this.getQuizSetup.quizCount].correct_answer;
    },
    async getAnswers() {
      this.userAnswersCollection = this.getUsersAnswers();
      const result = [...new Set(this.userAnswersCollection.filter(el => this.correctAnswers.includes(el)))];
      await localStorage.setItem("answerHistory", JSON.stringify(result));
      this.$store.commit("setUserQuizResult", "answerHistory");
      await this.$router.push("/result-page");
      this.$store.commit("resetQuiz");
    }
  },
  watch: {
    answers() {
      localStorage.setItem("quizState", JSON.stringify(this.$store.getters.allState));
      localStorage.setItem("quizLocation", this.$router.currentRoute.path);
    }
  },
  created() {
    this.correctAnswers = [...this.getSetUpData.map(el => el.correct_answer)];
    this.answers = [
      this.getSetUpData[0].correct_answer,
      ...this.getSetUpData[0].incorrect_answers
    ];
  },
  mounted() {
    this.$store.commit("setState", JSON.parse(localStorage.getItem("quizState")));
  }

});
</script>

<style></style>
