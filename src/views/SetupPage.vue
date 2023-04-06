<template>
  <div class="home">
    <h1>SetupPage</h1>
    <form @submit.prevent class="setupForm">
      <h3 v-if="valid">pls fill all inputs!!!!</h3>
      <BaseSelect v-on:select-value="setSelectValue" :options="allCategories" />
      <BaseSelect
        v-on:select-value="setDifficultyValue"
        :options="allDifficulty"
      />
      <BaseInput
        placeholder="Select a number of questions of"
        type="number"
        :minValue="minValue"
        :maxValue="maxValue"
        v-on:input-value="setQuestions"
      />
      <div>
        <button :disabled="valid" @click="setupQuiz">Start a quiz</button>
      </div>
    </form>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseInput from "@/components/BaseInput.vue";
import axios from "axios";

export default Vue.extend({
  name: "SetupPage",
  components: { BaseSelect, BaseInput },
  data() {
    return {
      categories: [],
      setup: {
        categoriesValue: "",
        difficultyValue: "",
        questions: ""
      },
      valid: true,
      minValue: 1,
      maxValue: 116
    };
  },
  computed: {
    ...mapGetters(["allCategories", "allDifficulty"])
  },
  methods: {
    ...mapActions(["getCategories", "getSetupData"]),
    setPost() {
      this.getCategories();
    },
    setSelectValue(value) {
      this.setup.categoriesValue = value;
    },
    setDifficultyValue(value) {
      this.setup.difficultyValue = value;
    },
    setQuestions(value) {
      this.setup.questions = value;
    },
    check() {
      console.log("asdasd");
    },
    async setupQuiz() {
      try {
        if (!(Number(this.setup.questions) > 0) || Number(this.setup.questions) > 116) {
          return;
        }
        const res = await axios.get(
          `https://opentdb.com/api.php?amount=${this.setup.questions}&category=${this.setup.categoriesValue.id}&difficulty=${this.setup.difficultyValue}&type=multiple`);
        const data = res.data;
        this.categories = data.results;
        this.$store.commit("setSetupData", this.categories);
        this.valid = !this.valid;
        await this.$router.push({
          name: "QuizForm",
          params: {
            count: 1,
            name: name + this.count
          }
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  watch: {

    setup: {
      handler() {
        if (Object.values(this.setup).every(el => el)) {
          this.valid = false;
        } else {
          this.valid = true;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.setPost();
  }
});
</script>

<style lang="scss">
.setupForm {
  max-width: 650px;
  margin: 0 auto;
  border: 1px solid #000;
  padding: 20px;
  border-radius: 20px;
}
</style>
