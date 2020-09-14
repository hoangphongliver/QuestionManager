import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import VueRouter from 'vue-router'
import { routes } from './router/routes';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import Toasted from 'vue-toasted';
import "./assets/_global.scss";
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBO3I4ahxKWyBsYfpw0dCDPPli5WsPTYtU",
  authDomain: "app-pwa-dcc636.firebaseapp.com",
  databaseURL: "https://app-pwa-dcc636.firebaseio.com",
  projectId: "app-pwa-dcc636",
  storageBucket: "app-pwa-dcc636.appspot.com",
  messagingSenderId: "340387587623",
  appId: "1:340387587623:web:eeddd9170dca07342f9002",
  measurementId: "G-91J8KTGWSR"
})

Vue.use(Toasted)

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  template: '',
  routes: routes
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
