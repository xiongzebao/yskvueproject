<template>
	<div id="UrgentServe">
		<mt-header class="header" title="审核加速">
		  <router-link  to="/Myservice" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="Urgent-wrap">
			<div class="UrgentImg">
				<img src="../../../static/img/urgent01.png" />
				<img src="../../../static/img/urgent02.png" />
				<img src="../../../static/img/urgent03.png" />
			</div>		
			<div class="ServiceAgreement" v-show='scrviceItem'>
				<template v-if="hasPay==true">
					<mt-checklist class="check" 
						v-model="chooseService" :options="serviceDisab">
						
					</mt-checklist>
				</template>
				<template v-else>
				<template v-if="hasBuy">
					<mt-checklist class="check" 
						v-model="chooseService" :options="serviceDisab">
						
					</mt-checklist>
				</template>
				<template v-else>
					<mt-checklist class="check" 
						v-model="chooseService" :options="service">
						
					</mt-checklist>
				</template>
				</template>
				<div class="Agreement" v-tap="{methods:checkService}">
					<span>我同意并理解</span>《审核加速使用服务协议》
				</div>
			</div>
		</div>
		<div class="confirmUser clear" v-show='scrviceItem'>
			<p>服务费用：<span>￥{{fee}}</span></p>
			<template v-if="hasPay==true">
				<span class="AlreadyUsed">已使用</span>
			</template>
			<template v-else-if="hasPay==false">
				<template v-if="hasBuy">
					<mt-button class="nextStap" type="primary"  size="small" 						v-tap="{methods:AlreadyUsed}">
						已选择
					</mt-button>
				</template>
				<template v-else>
					<template v-if="chooseService==1">
						<mt-button class="nextStap colorChange" type="primary" size="large" v-tap="{methods:toUsed}">
							我要使用
						</mt-button>
					</template>
					<template v-else>
						<mt-button class="nextStap" type="default" size="large">
							我要使用
						</mt-button>
					</template>
				</template>
			</template>
			
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { MessageBox } from 'mint-ui';
	import { Toast,Checklist  } from 'mint-ui';
	
	Vue.component(Checklist.name, Checklist);
	export default {
		name:'UrgentServe',
		data(){
			return {
				listData:[],//服务项目列表
				serviceDisab:[{
				    label: '1',
				    value: '1',
				    disabled: true
				  }],
				service:[{
				    label: '1',
				    value: '1'
				  }],
				scrviceItem:false,
				hasBuy:'',
				hasPay:'',
				fee:'',//服务费
				protocolUrl:'',//服务协议
				sId:'',//服务项目id
				chooseService:['1']
			}
		},
		mounted(){
			var that = this;
			var data = {
				"flag":  "true",// true 返回hasPay false 则不返回hasPay 字段
			}
			/*服务项目列表*/
			ajaxMethod.doAjax("user,/api/m/auth/service/query.htm",data,function(d){
				console.log(d)
				if(d.success){
					if(d.datas.list){
						that.listData = d.datas.list;
						that.scrviceItem = true;
						for(var idx in d.datas.list){
							that.fee = d.datas.list[1].fee;
							that.protocolUrl = d.datas.list[1].protocolUrl;
							that.sId = d.datas.list[1].sId;
							that.hasBuy = d.datas.list[1].hasBuy;
							that.hasPay = d.datas.list[1].hasPay;
							console.log(d.datas.list[1].hasBuy);
						}
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
			Toast(mes){
				Toast({
				  message: mes,
				  position: 'middle',
				  duration: 3000
				});
			},
			checkService(){//跳到服务协议
				yksapp.goPageWithParams('webPage',this.protocolUrl);
			},
			AlreadyUsed(){
				this.$router.push('Payrecord');
			},
			toUsed(){//服务缴费
				var that = this;
				
				var H5Strkey = 'goBack';
				var H5Strval= 1;
				yksapp.setKeyValue(H5Strkey,H5Strval);
				/*服务交费接口*/
				var Sdata={
					"sIds":[that.sId]//服务项目IDs
				}
				ajaxMethod.doAjax("user,/api/m/auth/service/add_service_order.htm",Sdata,function(Sdata){
					console.log(Sdata)
					if(Sdata.success){
						var serverData = Sdata.datas.obj.orderId;
						if(serverData){
							if(serverData!=null&&serverData>0){
								var url=window.location.href;
								yksapp_user.reqOrderCallback(serverData,url);
							}
						}
					}else{
						if(Sdata.code=='320'){
							MessageBox({
								title:'温馨提示',
								message:Sdata.message,
								confirmButtonText:'前往支付',
								closeOnClickModal:false,
								showCancelButton: true
							}).then(action => {
								var H5Strkey = 'goBack';
								var H5Strval= 2;
								yksapp.setKeyValue(H5Strkey,H5Strval);
								if(action=='confirm'){
									that.$router.push('Payrecord');
								}
							});
						}else if(Sdata.code=='328'){
							MessageBox({
								title:'温馨提示',
								message:Sdata.message,
								closeOnClickModal:false,
								confirmButtonText:'知道了',
								showCancelButton: true
							}).then(action => {
								var H5Strkey = 'goBack';
								var H5Strval= 2;
								yksapp.setKeyValue(H5Strkey,H5Strval);
								if(action=='confirm'){
									yksapp.goPageWithParams('rzIndex',null);
								}
							});
						}else if(Sdata.code=='319'){
							MessageBox({
								title:'温馨提示',
								message:Sdata.message,
								closeOnClickModal:false,
								confirmButtonText:'知道了',
								showCancelButton: true
							}).then(action => {
								var H5Strkey = 'goBack';
								var H5Strval= 2;
								yksapp.setKeyValue(H5Strkey,H5Strval);
								if(action=='confirm'){
									yksapp.goPageWithParams('rzIndex',null);
								}
							});
						}else{
							MessageBox({
							 	title: '温馨提示',
							 	message: Sdata.message,
							  	closeOnClickModal:false,
								confirmButtonText:'知道了',
								showCancelButton: true
							}).then(action => {
								var H5Strkey = 'goBack';
								var H5Strval= 2;
								yksapp.setKeyValue(H5Strkey,H5Strval);
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
#UrgentServe{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
#UrgentServe .header{
    flex-shrink: 0;
}
#UrgentServe .Urgent-wrap{
	width: 100%;
	height: auto;
	overflow-y: scroll;
	flex-grow: 1;
}
#UrgentServe .UrgentImg{
	width: 100%;
	height: auto;
	overflow-y: scroll;
}
#UrgentServe .UrgentImg img{
	width: 100%;
}
#UrgentServe .ServiceAgreement{
	position: relative;
	font-size: 0.3rem;
}
#UrgentServe .ServiceAgreement .mint-cell{
	height: 0.8rem;
	background: #f4f4f4;
}
#UrgentServe .ServiceAgreement .mint-cell-wrapper{
	background-size: 120% 0px;
	background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0);
}
#UrgentServe .ServiceAgreement .mint-cell .mint-checkbox-label{
	font-size: 0;
    color: #26a2ff;
    margin-left: 0.1rem;
}
#UrgentServe .ServiceAgreement .mint-cell  .mint-checkbox-core{
	width: 0.3rem;
    height: 0.3rem;
}
#UrgentServe .ServiceAgreement .mint-cell .mint-checkbox-core:after{
	top: 0.04rem;
    left: 0.08rem;
    width: 0.06rem;
    height: 0.14rem;
}
#UrgentServe .ServiceAgreement .Agreement{
	position: absolute;
    top: 0.24rem;
    left: 0.9rem;
	font-size: 0.24rem;
	line-height: 0.4rem;
    color: #26a2ff;
}
#UrgentServe .ServiceAgreement .Agreement span{
	color: rgba(0, 0, 0, 0.84);
}
#UrgentServe .confirmUser{
	flex-shrink: 0;
	width: 100%; 
	font-size: 0.28rem;
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
   	background: #fff;
}
#UrgentServe .confirmUser p{
	float: left;
    margin-left: 0.4rem;
    line-height: 0.7rem;
}
#UrgentServe .confirmUser p span{
	color: red;
}
#UrgentServe .confirmUser .AlreadyUsed{
	float: right;
	color: #ffa200;
	font-size: 0.26rem;
    font-weight: 600;
    margin: 0.16rem 0.6rem 0 0;
}
#UrgentServe .confirmUser .nextStap{
	width: 1.8rem;
    margin-right: 0.5rem;
    font-size: 0.28rem;
    height: 0.7rem;
    float: right;
    padding: 0;
}
#UrgentServe .confirmUser .colorChange{
	background: #ffa200;
}
</style>