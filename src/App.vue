<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="js">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
