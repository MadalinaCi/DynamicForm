import Vue from "vue";
import VueRouter from "vue-router";
import Questionnaire from "../views/Questionnaire.vue";
import CreateForm from "../views/CreateForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Questionnaire",
    component: Questionnaire,
    props: { prop: 'yes'}
  },
  {
    path: "/create",
    name: "CreateForm",
    component: CreateForm
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
