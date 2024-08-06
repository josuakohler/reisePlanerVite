// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import RouteListView from './RouteListView.vue';


const routes = [
  { path: '/', component: App, name: 'Home' },
  { path: '/view', component: RouteListView, name: 'View' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
