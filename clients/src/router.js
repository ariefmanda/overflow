import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import admin from './views/Admin.vue';
import Question from './views/Question.vue';
import Jumbotron from './views/Jumbotron.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  history: true,
  routes: [
    {
      path: '/',
      name: 'jumbotron',
      component: Jumbotron,
    },
    {
      path: '/category',
      name: 'category',
      component: Home,
    },
    {
      path: '/category/:id',
      name: 'category',
      component: Home,
      props: true,
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question,
      props: true,
    },
  ],
});

export default router;
