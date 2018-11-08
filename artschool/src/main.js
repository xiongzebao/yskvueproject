// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill";
Vue.config.productionTip = false
require ('./components/MintuiComponent/MintuiComponent.js');
import vueTap from 'v-tap';
Vue.use(vueTap);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
