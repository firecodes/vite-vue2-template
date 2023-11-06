import Vue from 'vue';
import VueRouter from 'vue-router';

import demoRouters from './modules/demo';

Vue.use(VueRouter);

const routes = [...demoRouters];

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
