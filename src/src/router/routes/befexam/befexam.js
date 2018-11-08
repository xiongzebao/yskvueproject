const routeList=[
	/*初试成绩*/
	{
	
		path: '/Firstest',
		name: "Firstest",
		component: resolve => require(['@/components/befexam/Firstest.vue'], resolve)
	},
	{
		path: '/Listintro/:id',
		name: "Listintro",
		component: resolve => require(['@/components/befexam/listIntro.vue'], resolve)
	},
	// 报名
	{
        path: '/signUp',
        name: 'signUp',
        component: resolve => require(['@/components/befexam/signUp.vue'], resolve)
    },
    {
    	path:"/commitmentRead",
    	name:"commitmentRead",
    	component: resolve => require(['@/components/befexam/commitmentRead.vue'], resolve)
    },
    {
    	path:"/examinationPoint",
    	name:"examinationPoint",
    	component: resolve => require(['@/components/befexam/examinationPoint.vue'], resolve)
    },
    // newAdd
	{
		path: '/signEntrance',
		name: "signEntrance",
		component: resolve => require(['@/components/befexam/signUp/signEntrance.vue'], resolve),
		children:[
			{
				path: '/signEntrance/selectProf',
				name: "selectProf",
				component: resolve => require(['@/components/befexam/signUp/selectProf.vue'], resolve),
			},
			{
				path: '/signEntrance/testCenterProf',
				name: "testCenterProf_1",
				component: resolve => require(['@/components/befexam/signUp/testCenterProf.vue'], resolve),
			}
		]
	},
	{
		path: '/examinationPoint_1', 
		name: "examinationPoint_1",
		component: resolve => require(['@/components/befexam/signUp/examinationPoint.vue'], resolve),
	},
	// 志愿填报
	{
		path: '/professionalVoluntary',
		name: "professionalVoluntary",
		component: resolve => require(['@/components/befexam/signUp/professionalVoluntary.vue'], resolve),
	},
	// 志愿排序
	{
        path: '/profSort',
        name: 'profSort',
        component: resolve => require(['@/components/befexam/signUp/profSort.vue'], resolve)
    },
	{
		path: '/examinationPointcollege',
		name: "examinationPointcollege",
		component: resolve => require(['@/components/befexam/signUp/examinationPointcollege.vue'], resolve),
		children:[
			{
				path: '/examinationPointcollege/selectProf',
				name: "selectProf_P",
				component: resolve => require(['@/components/befexam/signUp/selectProf_P.vue'], resolve),
			},
			{
				path: '/examinationPointcollege/testCenterProf',
				name: "testCenterProf_P",
				component: resolve => require(['@/components/befexam/signUp/testCenterProf_P.vue'], resolve),
			}
		]
	},
	// 报名最新入口
	{
		path:'/signUpinfo',
		name:'signUpinfo',
		component: resolve => require(['@/components/befexam/signUpNew/signUpinfo.vue'],resolve)
	},
	// 查看报名考点
	{
		path:'/testCenter',
		name:'testCenter',
		component: resolve => require(['@/components/befexam/signUpNew/testCenter.vue'],resolve)
	},
	// 查看院列表
	{
		path:'/ListOfInstitutions',
		name:'ListOfInstitutions',
		component: resolve => require(['@/components/befexam/signUpNew/ListOfInstitutions.vue'],resolve)
	},
	// 搜索列表
	{
		path:'/indexListSchool',
		name:'indexListSchool',
		component: resolve => require(['@/components/befexam/signUpNew/indexListSchool.vue'],resolve)
	},
	// 考点院校列表
	{
		path:'/examList',
		name:'examList',
		component: resolve => require(['@/components/befexam/signUpNew/examList.vue'],resolve)
	},
	// 传媒信息完善
	{
		path:'/MediaInforPerfect',
		name:'MediaInforPerfect',
		component: resolve => require(['@/components/befexam/signUp/MediaInforPerfect.vue'],resolve)
	},
	/*附中报考资料*/
   	{
    	path:"/HighSchoolExam",
    	name:"HighSchoolExam",
    	component: resolve => require(['@/components/befexam/HighSchoolExam.vue'], resolve)
    },
    {
    	path:"/fuZhong",
    	name:"fuZhong",
    	component: resolve => require(['@/components/befexam/signUp/informationFilling/fuZhong.vue'], resolve)
    },
    {
    	path:"/xianNodeType",
    	name:"xianNodeType",
    	component: resolve => require(['@/components/befexam/signUp/xianNodeType.vue'], resolve)
    },
	/*等级考试*/
	{
		path: '/Rankexam',
		name: "Rankexam",
		component: resolve => require(['@/components/befexam/Rankexam.vue'], resolve)
	},
	/*考试日程*/
	{
		path: '/examSchedule',
		name: 'examSchedule',
		component: resolve => require(['@/components/befexam/examSchedule.vue'], resolve)
	},
	/*考场查询*/
	{
		path: '/checkRoom',
		name: "checkRoom",
		component: resolve => require(['@/components/befexam/checkRoom.vue'], resolve)
	},
	/*报考记录*/
	{
		path: '/RegisterRecord',
		name: 'RegisterRecord',
		component: resolve => require(['@/components/befexam/registerRecord.vue'], resolve)
	},
	/*报考详情*/
	{
		path: '/registerDetails',
		name: 'registerDetails',
		component: resolve => require(['@/components/befexam/registerDetails.vue'], resolve)
	},
	/*在线确认*/
	{
			path: '/Onconfirme',
			name: 'Onconfirme',
			component: resolve => require(['@/components/befexam/OnlineConfirm.vue'], resolve)
	},
	{
			path: '/WishInfo',
			name: 'WishInfo',
			component: resolve => require(['@/components/aftexam/wish/WishInfo.vue'], resolve)
	},
	{
			path: '/WishInfoDetail',
			name: 'WishInfoDetail',
			component: resolve => require(['@/components/aftexam/wish/WishInfoDetail.vue'], resolve)
	},
		
	{
			path: '/volunterMajor',
			name: "volunterMajor",
			component: resolve => require(['@/components/befexam/volunterMajor.vue'], resolve)
	}
		
];
export default{
	routeList
}
	