<template>
  <div class="home">
    <h1>Last correct answers : {{ getResultAnswers }}</h1>
    <router-link to="/setup-page"> start new quiz </router-link>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "ResultPage",
  components: {},
  computed: {
    ...mapGetters(["getResultAnswers"]),
  },
});

</script>
