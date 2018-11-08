// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import vueScrollBehavior from 'vue-scroll-behavior';
Vue.config.productionTip = false
/*mint-ui组件*/
	import { Header,Actionsheet,Cell,Field,DatetimePicker,Popup,Checklist,Button,Radio,Picker,Spinner,Indicator } from 'mint-ui';
	Vue.component(Header.name, Header);
	Vue.component(Field.name, Field);
	Vue.component(Cell.name, Cell);
	Vue.component(Actionsheet.name, Actionsheet);
	Vue.component(Popup.name, Popup);
	Vue.component(DatetimePicker.name, DatetimePicker);
    Vue.component(Checklist.name, Checklist);
	Vue.component(Button.name, Button);
	Vue.component(Radio.name, Radio);
	Vue.component(Spinner.name, Spinner);
	Vue.component(Picker.name, Picker);
// Using vueScrollBehavior
Vue.use(vueScrollBehavior, {
  router: router,
  // maxLength: 3,
  // ignore: [/\/b/, /\/m/],
})
/* eslint-disable no-new */
new Vue({
//    el: '#app',
    router,
    template: '<App/>',
//    components: { App },
	render: h => h(App),
    mounted(){

        this.$router.afterEach(function(to,from) {

            if (to.path == '/') { 
            	if(window.yksapp){
            		yksapp.closeWebPage(); 
            	}
            }
            var medal=/medal/;//勋章墙正则
            if(medal.test(to.path)){
                $('html').addClass("resetHaB");
                $('body').addClass("resetHaB");
                $('#app').addClass("resetHaB");
            }else{
                $('html').removeClass("resetHaB");
                $('body').removeClass("resetHaB");
                $('#app').removeClass("resetHaB");
            }
        });
    }
}).$mount('#app')
