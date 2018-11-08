const routeList=[
	// 帮助中心与反馈
	{
		path:'/help',
		name:'help',
		component: resolve => require(['@/components/news/help.vue'],resolve)
	},
	// 热门问题
	{
		path:'/hotQuestion',
		name:'hotQuestion',
		component: resolve => require(['@/components/news/hotQuestion.vue'],resolve)
	},
	// 常见问题
	{
		path:'/usualQuestion',
		name:'usualQuestion',
		component: resolve => require(['@/components/news/usualQuestion.vue'],resolve)
	},
	// 热门问题列表
	{
		path:'/hotQuestionList',
		name:'hotQuestionList',
		component: resolve => require(['@/components/news/hotQuestionList.vue'],resolve)
	},
	// 联系客服
	{
		path:'/touchCustom',
		name:'touchCustom',
		component: resolve => require(['@/components/news/touchCustom.vue'],resolve)
	},
	// 联系客服
	{
		path:'/searchPage',
		name:'searchPage',
		component: resolve => require(['@/components/news/searchPage.vue'],resolve),
		children: [
			{
				path:"/hotQuestion_2",
				name:"hotQuestion_2",
				component: resolve => require(['@/components/news/hotQuestion_2.vue'],resolve)
			}
		]
	},
	// 艺考升助手
	{
		path:'/assistant',
		name:'assistant',
		component: resolve => require(['@/components/news/assistant.vue'],resolve)
	},	
];
export default{
	routeList
}
	