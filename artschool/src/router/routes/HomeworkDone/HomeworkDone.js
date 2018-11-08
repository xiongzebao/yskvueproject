const routeList=[
		{
			path: '/homeWork',
			name: "homeWork",
			component: resolve => require(['@/components/HomeWork/HomeWork.vue'], resolve)
		},
		{
			path: '/CommitWork',
			name: "CommitWork",
			component: resolve => require(['@/components/HomeWork/CommitWorkItem.vue'], resolve)
		},
	
];
export default{
	routeList
}
	