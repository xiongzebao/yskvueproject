const routeList=[
		{
			path: '/share',
			name: "share",
			component: resolve => require(['@/components/Share/Share.vue'], resolve)
		}
		
];
export default{
	routeList
}
	