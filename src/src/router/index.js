import Vue from 'vue';
import Router from 'vue-router';
import 'babel-polyfill';
import vueTap from 'v-tap';
Vue.use(Router);
Vue.use(vueTap);
import  main  from './routes/main/main.js';/*报考面板*/
import  befexam  from './routes/befexam/befexam.js';/*考前*/
import  user  from './routes/user/user.js';/*用户*/
import  pay  from './routes/pay/pay.js';/*支付*/
import  aftexam  from './routes/aftexam/aftexam.js';/*考后*/
import  hulaquan  from './routes/hulaquan/hulaquan.js';/*呼啦圈*/
import  news  from './routes/news/news.js';/*资讯*/
//import  notice  from './routes/notice/notice.js';/**/
import  sys  from './routes/sys/sys.js';/*资讯*/
export default new Router({
	routes: [
		...main.routeList,
		...befexam.routeList,
		...user.routeList,
		...pay.routeList,
		...aftexam.routeList,
		...hulaquan.routeList,
		...news.routeList,
		...sys.routeList,
		{
			path: '/jump',
			name: "jump",
			component: resolve => require(['@/components/aftexam/jump.vue'], resolve)
		}
		
	]
    
})