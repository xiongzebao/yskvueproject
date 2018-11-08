const routeList=[
		{
			path: '/AttendentClass',
			name: "AttendentClass",
			component: resolve => require(['@/components/AttendentClass/AttendentClass.vue'], resolve)
		},
		{
			path: '/AttendentCalendar',
			name: "AttendentCalendar",
			component: resolve => require(['@/components/public/Calendar.vue'], resolve)
		}
];
export default{
	routeList
}
	