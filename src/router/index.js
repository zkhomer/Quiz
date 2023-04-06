import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import QuestionPage from "../views/QuestionPage.vue";
import ResultPage from "../views/ResultPage.vue";
import SetupPage from "../views/SetupPage.vue";
import QuizForm from "@/views/QuizForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/question-page",
    name: "question",
    component: QuestionPage,
  },
  {
    path: "/result-page",
    name: "result",
    component: ResultPage,
  },
  {
    path: "/setup-page",
    name: "setup",
    component: SetupPage,
  },
  {
    path: "/setup-page/quiz/:count",
    name: "QuizForm",
    component: QuizForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
