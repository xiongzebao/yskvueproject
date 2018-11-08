import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import  AttendentClass  from './routes/AttendentClass/AttendentClass.js';/*出勤课时*/
import  HomeworkDone  from './routes/HomeworkDone/HomeworkDone.js';/*已交作业*/
import  Gradechart  from './routes/Gradechart/Gradechart.js';/*成绩表*/
import  Share  from './routes/Share/Share.js';/*分享*/
import  AskLeave  from './routes/AskLeave/AskLeave.js';/*分享*/
export default new Router({
  routes: [
	...AttendentClass.routeList,
	...HomeworkDone.routeList,
	...Gradechart.routeList,
	...Share.routeList,
	...AskLeave.routeList,
	 {
		 path:'/',
		 name:"index",
		 component: resolve => require(['@/components/index.vue'], resolve)
	 }
  ]
})
