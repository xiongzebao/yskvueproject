<template>
	<div id='service'>
		<mt-header fixed title="我的服务">
		  <router-link  to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<div class="Myservice" slot="content">
			<div class='service' v-for="item in list" v-tap="{methods:inforComfirm,serviceCode:item.serviceCode}">
				<template v-if="item.serviceCode=='001'">
					<img class="itemLogo" src="../../../static/img/myServices/services001.png"/>
				</template>
				<template v-else-if="item.serviceCode=='002'">
					<img class="itemLogo" src="../../../static/img/myServices/services002.png"/>
				</template>
				<template v-else-if="item.serviceCode=='003'">
					<img class="itemLogo" src="../../../static/img/myServices/services003.png"/>
				</template>
				<template v-else-if="item.serviceCode=='004'">
					<img class="itemLogo" src="../../../static/img/myServices/services004.png"/>
				</template>
				<div class="servicesItem">
					<p class="serviceName">
						{{item.serviceName}}
					</p>
					<p class="serviceIntro">
						{{item.intro}}
					</p>
					<span class="serviceFee">￥{{item.fee}}</span>
					<template v-if="item.hasPay==true">
						<span class="AlreadyUsed">已使用</span>
					</template>
					<template v-else-if="item.hasPay==false">
						<template v-if="item.hasBuy==true">
							<mt-button type="primary"  size="small" v-tap="{methods:AlreadyUsed,serCode:item.serviceCode}">
								已选择
							</mt-button>
						</template>
						<template v-else-if="item.hasBuy==false">
							<mt-button type="primary"  size="small" v-tap="{methods:userIt,serviceCode:item.serviceCode}">
								我要使用
							</mt-button>
						</template>
					</template>
					<p class="artCard" v-if='artCardFlag'>
						（您是艺考服务卡用户，可直接使用该服务）
					</p>
					<template v-if='item.userNumber'>
						<span class="userNum">使用人数：{{item.userNumber}}</span>
					</template>
				</div>
			</div>
		</div>
		<datenote v-show='datalength' dataNoteMessage='暂时没有信息'></datenote>
       	<Loading v-show="loading"></Loading>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Loading from '../public/Loading.vue';
	import Datenote from '../public/DataNote.vue';
    import { Indicator } from 'mint-ui';
	import VueBus from 'vue-bus';
	import VueDND from 'awe-dnd';
	Vue.use(VueDND);
	Vue.use(VueBus);
	export default {
		name:'Myservice',
		data(){
			return {
				list:'',//服务项目data
				sId:'',//服务交费sIds参数
				checkDate:[],//服务项目检查
				artCardFlag:'',//艺享服务卡
				feeLimit:'',//金额上限
				meg:'',
				datalength:false,
				loading:true
			}
		},
		components:{
			Loading:Loading,
			Datenote:Datenote
		},
		mounted(){
			let that = this;
			let data={
				"flag":  "true",// true 返回hasPay false 则不返回hasPay 字段
			}
			/*服务项目列表*/
			ajaxMethod.doAjax("user,/api/m/auth/service/query.htm",data,function(data){
				console.log(data) 
				if(data.success){
					if(data.datas.list){
						that.datalength=false;
						that.list=data.datas.list;
						for(var i = 0; i <that.list.length; i++){
							that.sId=that.list[i].sId;
							that.feeLimit = that.list[2].feeLimit;
						}
					}else{
						that.datalength=true;
					}
				}else{
					that.datalength=true;
					that.toast(data.message);
				}
			},function(){
				that.loading=false;
			});
			//服务项目检查
			ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/check.htm",{},function(checkDate){
				console.log(checkDate);
				if(checkDate.success){
					that.checkDate = checkDate;
					that.artCardFlag = checkDate.datas.artCardFlag;//艺享卡 
				}else{
                  	that.toast(checkDate.message);
              	}
			})
		},
		methods:{
			toast(meg){
				Toast({
                    message:meg,
                    position: 'middle',
                    duration: 3000
                });
			},
			/*点击当前项对应的跳转*/
			inforComfirm(Code){
				if(Code.serviceCode=='001'){//跳转到肖像认证
					this.$router.push('/PortraitAuthenti');
				}else if(Code.serviceCode=='002'){//跳转到服务协议
					this.$router.push('/UrgentServe');
				}else if(Code.serviceCode=='003'){//跳到艺考助手说明
                    /*服务项目检查*/
                    var that=this;
	                if(that.checkDate.code=="helper_flag_1"){/*未订阅院校*/
	                    that.$router.push('/ArtHelp');
	                }else if(that.checkDate.code=="helper_flag_2"){/*付清*/
	                    that.$router.push({path:'usePortal'})
	                }else if(that.checkDate.code=="helper_flag_3"){/*未付清*/
	                    let dataschool=that.checkDate.datas.obj;
	                    if(dataschool){
	                          /*费用*/
	                        let addSchooList={
	                            serviceCharge:dataschool.serviceCharge,
	                            allowSendWelcomeSms:dataschool.allowSendWelcomeSms,
	                            orderId:dataschool.orderId,
	                            artCardFlag:that.checkDate.datas.artCardFlag,
	                            subscribeID:dataschool.subscribeID  
	                        };
	                		that.$router.push({path:'/Payoff',query:{dataStr:JSON.stringify(addSchooList)}}) 
	                     }
	                  }
				}
			},
			/*已选择按钮*/
			AlreadyUsed(code){
				if(code.serCode=='001'){
					yksapp.goPageWithParams('rzIndex',null);
					return ;
				}else if(code.serCode=='002'){
					this.$router.push('Payrecord');
				}
			},
			/*我要使用按钮*/
			userIt(param){
				var that = this;
				if(param.serviceCode=='001'){//跳到肖像认证
					that.$router.push('/PortraitAuthenti');
				}else if(param.serviceCode=='002'){//跳到审核加速
					that.$router.push('/UrgentServe');
				}else if(param.serviceCode=='003'){
					/*服务项目检查*/
                Indicator.open('加载中...');
                    var that=this;
                  	if(that.checkDate.code=="helper_flag_1"){/*未订阅院校*/
                      that.$router.push('/ArtHelp');
                  	}else if(that.checkDate.code=="helper_flag_2"){/*付清*/
                      	that.$router.push({path:'usePortal'})
                  	}else if(that.checkDate.code=="helper_flag_3"){/*未付清*/
                      	let dataschool=that.checkDate.datas.obj;
                      	if(dataschool){
                          	/*费用*/
                          	let addSchooList={
                                serviceCharge:dataschool.serviceCharge,
                                allowSendWelcomeSms:dataschool.allowSendWelcomeSms,
                                orderId:dataschool.orderId,
                                artCardFlag:that.checkDate.datas.artCardFlag,
                                subscribeID:dataschool.subscribeID  
                            };
                       	that.$router.push({path:'/Payoff',query:{dataStr:JSON.stringify(addSchooList)}}) 
                      	}
                       
                  	}    	
				}
			}
		}
	}
</script>

<style scoped>
#service{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#service .Myservice{
	margin-top: 1.08rem;
}
#service .Myservice .service{
	height: 1.8rem;
	background: #fff;
	margin-bottom: 0.25rem;
	padding-left: 0.18rem;
	position: relative;
}
/*服务项目图标样式*/
#service .Myservice .service .itemLogo{
	position: absolute;
    top: 0.28rem;
    left: 0.2rem;
    width: 1rem;
    height: 1rem;
}
#service .service .servicesItem{
	font-size: 0.28rem;
	padding-left: 1.3rem;
}
#service .service .serviceName{
	line-height: 0.28rem;
	padding-top: 0.28rem;
}
#service .service .serviceIntro{
	width: 2.6rem;
	font-size: 0.24rem;
	color: #8d8d8d;
	padding-top: 0.08rem;
}
#service .service .artCard{
	font-size: 0.22rem;
    padding: 0.08rem 0;
    margin-left: -0.06rem;
    color: rgba(77, 249, 9, 0.92);
}
#service .service .serviceFee{
	position: absolute;
    top: 0.36rem;
    right: 1.5rem;
	font-size: 0.26rem;
    color: #ffc747;
}
#service .service .AlreadyUsed{
	color: #ffa200;
	font-size: 0.24rem;
	position: absolute;
	top: 0.6rem;
    right: 0.2rem;
    font-weight: 600;
}
#service .service .userNum{
	position: absolute;
    top: 1rem;
    right: 0.2rem;
	font-size: 0.22rem;
	color: #6e6e6e;
}
#service .service .mint-button--small{
	position: absolute;
    top: 0.36rem;
    right: 0.18rem;
    height: 0.56rem;
    font-size: 0.22rem;
    line-height: 0.56rem;
    padding: 0 0.1rem;
    background: #ffa200;
}
/*MessageBox 确认按钮样式*/
#service .mint-msgbox .mint-msgbox-btns{
	color: rgba(90, 90, 90, 0.84);
}
</style>