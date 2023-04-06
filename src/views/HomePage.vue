<template>
  <div class="home">
    <h1>Welcome to quiz app</h1>
    <span class="description">Quiz app description</span>
    <router-link to="/setup-page">SetupPage</router-link>
  </div>
</template>

<script lang="js">
import Vue from "vue";

export default Vue.extend({
  name: "HomePage",
  components: {},
});
</script>

<style lang="scss" scoped>
.home {
  .description {
    display: block;
  }
}
</style>
