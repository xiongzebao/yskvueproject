<template>
	<div id="customDetails">
		<mt-header fixed title="艺考助手">
		  <router-link to="/NewaddRemind" slot="left">
		  	<mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="addRemind">
			<p>添加自定义提醒</p>
			<i class="iconfont icon-add" v-tap='{methods:addAcademy}'></i>
		</div>
		<div class="saveSchedule">
			<p>已保存的考试日程</p>
			<div class="schedule" v-for="(item,index) in basicData">
				<span>提醒{{index+1}}：</span>
				<span>{{item.itemName}}</span>
				<span>{{item.xueXiaoMC}}</span>
				<i class="iconfont icon-jianqu" v-tap="{methods:deleteItem}"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name:'CustomDetails',
		data(){
			return {
				basicData:'',//页面渲染数据
				custTipID:''//提醒id
			}
		},
		mounted(){
			var that = this;
			this.data = this.$route.query;
			ajaxMethod.doAjax("befexam,/api/m/auth/helper/customtip/get_customtip_detail.htm",{},function(d){
				console.log(d)
				if(d.success){
					if(d.datas.list){
						that.basicData = d.datas.list;
						that.basicData.forEach(function(value){
							that.custTipID = value.custTipID;
						})
						 
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
		methods:{
			addAcademy(){
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
							console.log(d)
							if(d.success){
								Toast({
								  message: d.message,
								  position: 'middle',
								  duration: 3000
								});
								window.location.reload() 
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
#customDetails{
	width: 100%;
	height: 100%;
}
#customDetails .addRemind{
	width: 100%;
    min-height: 3rem;
    margin-top: 0.8rem;
    border-bottom: 1px solid rgba(51, 51, 51, 0.56)
}
#customDetails .addRemind p{
	font-size: 0.34rem;
	text-align: center;
    padding-top: 0.4rem;
}
#customDetails .addRemind .icon-add{
	position: fixed;
    top: 2.2rem;
    left: 2.8rem;
    font-size: 0.7rem;
}
/*保存日程提醒样式*/
#customDetails .saveSchedule{
	font-size: 0.28rem;
	padding: 0.2rem;
}
#customDetails .saveSchedule p{
	font-size: 0.3rem;
	line-height: 0.6rem;
}
#customDetails .saveSchedule .schedule{
	height: 0.6rem;
	line-height: 0.6rem;
	position: relative;
}
#customDetails .saveSchedule .schedule .icon-jianqu{
	font-size: 0.38rem;
	color: red;
    position: absolute;
    top: 0;
    right: 0.3rem;
}
</style>