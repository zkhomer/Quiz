import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import SetupQuizPage from "../views/SetupQuizPage.vue";
import QuizQuestionPage from "../views/QuizQuestionPage.vue";
import QuizResultsPage from "../views/QuizResultsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/setup",
    component: SetupQuizPage,
  },
  {
    path: "/quiz/:questionIndex",
    component: QuizQuestionPage,
    props: true,
  },
  {
    path: "/results",
    component: QuizResultsPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
