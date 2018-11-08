const routeList=[
		/*信息公告*/
		{
			path: '/NoteList',
            name: '/NoteList',
            component: resolve => require(['@/components/sys/NoteList.vue'], resolve)
		}
];
export default{
	routeList
}
	