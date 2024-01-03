<template>
  <div class="homepage">
    <h1 class="title">Quiz App</h1>
    <p class="description">Test your knowledge with our quiz!</p>
    <router-link to="/setup" class="setup-link">Setup Quiz</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style>
.homepage {
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

.description {
  font-size: 18px;
  margin-bottom: 20px;
}

.setup-link {
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}
</style>
