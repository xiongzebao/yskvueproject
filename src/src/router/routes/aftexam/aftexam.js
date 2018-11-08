const routeList=[
	/*复试缴费*/
	{
		path: '/Retestpay',
		name: "Retestpay",
		component: resolve => require(['@/components/befexam/Retestpay.vue'], resolve)
	},
	/* 勋章墙 */
	{
		path: '/queryResults',
		name: "queryResults",
		component: resolve => require(['@/components/aftexam/queryResults.vue'], resolve)
	},
	{
		path: '/medal/:userId',
		name: 'medal',
		component: resolve => require(['@/components/aftexam/medal.vue'], resolve)
	},
	/*录取查询*/
		{
			path: '/Admissionquery',
			name: 'Admissionquery',
			component: resolve => require(['@/components/aftexam/Admissionquery.vue'], resolve)
		}, 
		{
			path: '/Admission',
			name: 'Admission',
			component: resolve => require(['@/components/aftexam/Admission.vue'], resolve)
		}, 
		{
			path: '/Noadmission',
			name: 'Noadmission',
			component: resolve => require(['@/components/aftexam/Noadmission.vue'], resolve)
		},
		// 文化分测算
		{
			path: '/Cultrue',
			name: 'Cultrue',
			component: resolve => require(['@/components/aftexam/cultrue/cultrue_1.vue'], resolve)
		}
];
export default{
	routeList
}
	