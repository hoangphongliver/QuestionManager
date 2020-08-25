import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import VueRouter from 'vue-router'
import { routes } from './router/routes';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  template: '',
  routes: routes
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
