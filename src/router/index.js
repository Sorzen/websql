import Vue from 'vue';
import Router from 'vue-router';
import demo from '@/components/demo';
import menu from '@/components/menu';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: demo,
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
    },
  ],
});
