// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBus from 'vue-bus';
import vueTap from 'v-tap';
import "babel-polyfill";
Vue.use(VueBus);
Vue.use(vueTap);
Vue.config.productionTip = false

/* eslint-disable no-new */
import { Header,Cell,Button,Field,Popup } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(Field.name, Field);
Vue.component(Popup.name, Popup);
export default {
  name: 'app'
}
  window.typeIndex=0;
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// router.beforeEnter((to, from, next) => {
//     // 动态修改页面的title
//     // setTitleHack(to.meta.title);
//     document.title=to.meta.title;
//     // 根据自定义的路由元信息来做判断： 
//     if (to.meta.isNeedAuth !== false) {
//         // do something
//     } else {
//         // do something
//     }
//     next();
// });