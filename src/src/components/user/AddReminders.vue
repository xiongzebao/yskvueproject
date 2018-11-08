<template>
	<div id="AddReminders">
		<mt-header fixed title="艺考助手">
          	<div slot="left" v-tap='{methods:Goback}'>
                <mt-button icon="back"></mt-button>
          	</div>
		</mt-header>
		<div class="addRemind">
			<p>添加自定义提醒</p>
			<i class="iconfont icon-add" v-tap='{methods:addAcademy}'></i>
		</div>
		<!--使用说明-->
		<div class="Instructions" v-show="Instructions">
			<p class="useInstruction">使用说明：</p>
			<p class="Remind">1、考生可在此界面管理不在平台报名院校的日程提醒</p>
			<p class="Remind">2、点击‘+’可以自定义添加提醒项目</p>
			<p class="Remind">3、在已保存列表点击 ‘-’ 删除已保存的提醒项目</p>
		</div>
		<!--考试日程-->
		<div class="saveSchedule" v-show="getCustom">
			<p>已保存的考试日程</p>
			<div class="schedule clear" v-for="(item,index) in basicData">
				<span class="fLeft">提醒{{index+1}}：</span>
				<div class="remind-list fLeft">
					<p>{{item.itemName}}</p>
					<p>{{item.xueXiaoMC}}</p>
					<p>{{item.kaoDianMC}}</p>
					<p>{{item.zhuanYeMC}}</p>
				</div>
				<i class="iconfont icon-jianqu" v-tap="{methods:deleteItem}"></i>
			</div>
		</div>
		<!--<NewaddRemind class="NewaddRemind" v-if="addRemind_show"></NewaddRemind>-->
	</div>
</template>

<script>
	import Vue from 'vue';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import NewaddRemind from './NewaddRemind.vue';
	import VueBus from 'vue-bus';
	
	Vue.use(VueBus);
	export default {
		name:'AddReminders',
		data(){
			return {
				addRemind_show:false,//控制添加自定义提醒
				Instructions:true,//使用说明
				getCustom:false,//考试日程
				basicData:[],//自定义院校基础数据
				custTipID:''//提醒ID
			}
		},
//		components:{
//			NewaddRemind:NewaddRemind
//		},
		mounted(){
			this.baseDatas();
		},
		methods:{
			Goback(){//返回上一页
				this.$router.go(-1);
			},
			baseDatas(){
				var that = this;
				//自定义院校基础数据
				ajaxMethod.doAjax("befexam,/api/m/auth/helper/customtip/get_customtip_detail.htm",{},function(d){
					console.log(d)
					if(d.success){
						if(d.datas.list.length!=0){
							that.getCustom = true;
							that.Instructions = false;
							that.basicData = d.datas.list;
							that.basicData.forEach(function(value){
								that.custTipID = value.custTipID;
							})
						}else{
							that.Instructions = true;
							that.getCustom = false;
						}
					}else{
						Toast({
						  message: d.message,
						  position: 'middle',
						  duration: 3000
						});
					}
				})
			},
			addAcademy(){//添加自定义提醒
				this.$router.push('NewaddRemind');
			},
			deleteItem(){//删除以保存的考试日程
				
				var that = this;
				MessageBox({
					title: '温馨提示',
					message: '确定要删除该项提醒吗？',
					showCancelButton: true
				}).then(action => {
				  	if(action=='confirm'){
				  		var params={  
				    		"custTipID" : this.custTipID//提醒ID（必填）
				        }
						ajaxMethod.doAjax("befexam,/api/m/auth/helper/customtip/del_customtip_detail.htm",params,function(d){
							if(d.success){
								MessageBox({
									title: '温馨提示',
									message: d.message,
									showCancelButton: true
								}).then(action => {
									that.baseDatas();
								});
							}else{
								var title = '温馨提示'
								MessageBox.alert(d.message, title);
							}
							
						})
					}
				})
			}
		}
	}
</script>

<style>
#AddReminders{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	background: #fff;
}
#AddReminders .fLeft{
	float: left;
}
/*#AddReminders .NewaddRemind{
	position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    background: #f4f4f4;
}*/
#AddReminders .addRemind{
	position: relative;
	width: 100%;
    min-height: 2.6rem;
    margin-top: 0.8rem;
    border-bottom: 1px solid rgba(51, 51, 51, 0.56)
}
#AddReminders .addRemind p{
	font-size: 0.34rem;
	text-align: center;
    padding-top: 0.4rem;
}
#AddReminders .addRemind .icon-add{
	position: absolute;
    top: 1.2rem;
    left: 2.8rem;
    font-size: 0.7rem;
    color: #25c4ff;
}
#AddReminders .Instructions{
	padding-top: 0.3rem;
    padding-left: 0.3rem;
}
#AddReminders .Instructions p{
	line-height: 0.4rem;
}  
#AddReminders .Instructions .useInstruction{
	font-size: 0.3rem;
	margin-bottom: 0.2rem;
}
#AddReminders .Instructions .Remind{
	font-size: 0.25rem;	
}
/*保存日程提醒样式*/
#AddReminders .saveSchedule{
	height: 6.7rem;
	font-size: 0.28rem;
    padding: 0.2rem;
    overflow-y: scroll;
}
#AddReminders .saveSchedule p{
	font-size: 0.34rem;
	line-height: 0.6rem;
}
#AddReminders .saveSchedule .schedule{
	width: 100%;
	/*height: 0.5rem;*/
	font-size: 0.25rem;
	line-height: 0.5rem;
	position: relative;
}
#AddReminders .saveSchedule .schedule .remind-list{
	width: 4.4rem;
}
#AddReminders .saveSchedule .schedule p{
	float: left;
	font-size: 0.25rem;
	margin-right: 0.1rem;
}
#AddReminders .saveSchedule .schedule .icon-jianqu{
	font-size: 0.38rem;
    color: red;
    position: absolute;
    top: 0.04rem;
    right: 0.2rem;
}
</style>