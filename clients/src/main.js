import Vue from 'vue';
import notifications from 'vue-notification';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(notifications);
Vue.prototype.$axios = require('axios').create({
  baseURL: 'http://localhost:3004/api',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
