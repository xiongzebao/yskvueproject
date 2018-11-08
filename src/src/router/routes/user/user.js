const routeList=[
		/*信息完善*/
		{
			path: '/Inforperfect',
	 		name: 'Inforperfect',
			component: require('@/components/user/InforPerfect.vue'),
			children: [
				{
					path: '/',
					name: 'BaseInforPefect',
					component: resolve =>require(['@/components/user/BaseInforPefect.vue'],resolve)  
				},
				{
					path: '/Inforperfect/ExtendInforPefect',
					name: 'ExtendInforPefect',
				component:  resolve =>require(['@/components/user/ExtendInforPefect.vue'],resolve)  
				},
				{
					path: '/Inforperfect/FamilyInformation',
					name: 'FamilyInformation',
				component:  resolve =>require(['@/components/user/FamilyInformation.vue'],resolve)
				},
                /*高考地区*/
                {
                    path: '/Inforperfect/CollegeZone',
					name: 'CollegeZone',
				component: resolve =>require(['@/components/public/CollegeZone.vue'],resolve)  
                },
                /*民族*/
                {
					path: '/Inforperfect/Nation',
					name: 'Nation',
				component: resolve =>require(['@/components/public/NationalChoose.vue'],resolve)
                   
				},
                /*省份*/
				{
					path: '/Inforperfect/Province',
					name: 'Province',
				component: resolve =>require(['@/components/public/Province.vue'],resolve)
				},
				/*特长选择*/
				{
					path: '/Inforperfect/ExamSkills',
					name: 'ExamSkills',
				component: resolve => require(['@/components/user/ExamSkills.vue'],resolve)
				},
                /*考生确认*/
                {
                    path: '/Inforperfect/InfoConfirm',
                    name: 'InfoConfirm',
                component: resolve => require(['@/components/user/InfoConfirm.vue'],resolve)
                },
				/*声明*/
                {
                    path: '/Inforperfect/Statement',
                    name: 'Statement',
                component: resolve => require(['@/components/public/Statement.vue'],resolve)
                }
			]
		},
		/*我的服务*/
		{
			path: '/Myservice',
			name: 'Myservice',
			component: resolve => require(['@/components/user/Myservice.vue'], resolve),
			beforeEnter(to,from,next){
            	if(from.path=='/UrgentServe'){
	                let getRouter=yksapp.getValueByKey("goBack");
	                if(getRouter=='1'){
	                	next(false);
	                	if(getRouter!='2'){
	                		next(false);
	                	}else{
	                		var H5Strkey = 'goBack';
							var H5Strval= 0;
							yksapp.setKeyValue(H5Strkey,H5Strval);
							next();
	                	}
	                }else{
	                	var H5Strkey = 'goBack';
						var H5Strval= 0;
						yksapp.setKeyValue(H5Strkey,H5Strval);
						next();
	                }
					return ;
	            }
				next();
            }
		},
		/*认证界面*/
		{
			path: '/PortraitAuthenti',
            name: '/PortraitAuthenti',
            component: resolve => require(['@/components/user/PortraitAuthenti.vue'], resolve)
		},
		/*加急界面*/
		{
			path: '/UrgentServe',
            name: '/UrgentServe',
            component: resolve => require(['@/components/user/UrgentServe.vue'], resolve)
		},
		/*艺考助手界面*/
		{
			path: '/ArtHelp',
            name: '/ArtHelp',
            component: resolve => require(['@/components/user/ArtHelp.vue'], resolve)
		},
		/*订阅报名院校界面*/
		{
			path: '/SubscribeCollege',
            name: '/SubscribeCollege',
            component: resolve => require(['@/components/user/SubscribeCollege.vue'], resolve)
		},
		/*服务订阅界面*/
		{
			path: '/Servicesub',
            name: '/Servicesub',
            component: resolve => require(['@/components/user/serviceSub.vue'], resolve),
            beforeEnter(to,from,next){
            	if(from.path=='/usePortal'){
            		var H5Strkey = 'toBack';
					var H5Strval= 1;
					yksapp.setKeyValue(H5Strkey,H5Strval);
					next();
            	};
            	if(from.path=='/SubscribeCollege'){
            		var H5Strkey = 'toBack';
					var H5Strval= 0;
					yksapp.setKeyValue(H5Strkey,H5Strval);
					next();
            	};
            	if(from.path=='/Myservice'){
            		alert(11)
            		var H5Strkey = 'toBack';
					var H5Strval= 0;
					yksapp.setKeyValue(H5Strkey,H5Strval);
					next();
            	};
            }
		},
		/*支付界面*/
		{
			path: '/Payoff',
            name: '/Payoff',
            component: resolve => require(['@/components/user/Payoff.vue'], resolve)
		},
		/*引导使用入口界面*/
		{
			path:'/usePortal',
			name: '/usePortal',
            component: resolve => require(['@/components/user/usePortal.vue'], resolve)
		},
		/*没有收到短信界面*/
		{
			path:'/Noreceivemegs',
			name: '/Noreceivemegs',
            component: resolve => require(['@/components/user/Noreceivemegs.vue'], resolve)
		},
		/*添加自定义提醒界面*/
		{
			path:'/AddReminders',
			name: '/AddReminders',
            component: resolve => require(['@/components/user/AddReminders.vue'], resolve)
		},
		/*添加自定义提醒界面*/
		{
			path:'/CustomDetails',
			name: '/CustomDetails',
            component: resolve => require(['@/components/user/CustomDetails.vue'], resolve)
		},
		/*新增自定义提醒详情界面*/
		{
			path:'/NewaddRemind',
			name: '/NewaddRemind',
            component: resolve => require(['@/components/user/NewaddRemind.vue'], resolve)
		},
		/*设置界面*/
		{
			path:'/Setup',
			name: '/Setup',
            component: resolve => require(['@/components/user/Setup.vue'], resolve)
		},
		/*号码修改界面*/
		{
			path:'/ModifyphoneNum',
			name: '/ModifyphoneNum',
            component: resolve => require(['@/components/user/ModifyphoneNum.vue'], resolve)
		}
];
export default{
	routeList
}
	