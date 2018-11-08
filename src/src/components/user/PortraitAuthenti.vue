<template>
	<div id="PortraitAuthenti">
		<mt-header class="header" title="肖像认证">
		  <router-link to="/Myservice" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="Portrait-wrap">
			<div class="PortraitImg">
				<img src="../../../static/img/portrait01.png" />
				<img src="../../../static/img/portrait02.png" />
				<img src="../../../static/img/portrait03.png" />
			</div>
			<div class="ServiceAgreement" v-show='scrviceItem'>
				<template v-if="hasPay==true">
					<mt-checklist v-model="chooseService" :options="serviceDisab">
						
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
					<span>我同意并理解</span>《肖像认证使用服务协议》
				</div>
			</div>
		</div>
		
		<div class="confirmUser clear" v-show='scrviceItem'>
			<p>服务费用：<span>￥{{fee}}</span></p>
			<template v-if="hasPay">
				<span class="AlreadyUsed">已使用</span>
			</template>
			<template v-else>
				<template v-if="hasBuy">
					<mt-button class="nextStap" type="primary"  size="small" 						v-tap="{methods:AlreadyUsed}">
						已选择
					</mt-button>
				</template>
				<template v-else>
					<template v-if="chooseService==1">
						<mt-button class="nextStap colorChange" type="primary" size="large" v-tap="{methods:TorzIndex}">
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
	import { Button } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { Toast,Checklist } from 'mint-ui';
	
	Vue.component(Button.name, Button);
	Vue.component(Checklist.name, Checklist);
	export default {
		name:'PortraitAuthenti',
		data(){
			return {
				chooseService:['1'],
				serviceDisab:[{
				    label: '被禁用',
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
				listData:'',//服务项目列表
				protocolUrl:''//服务协议
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
							that.fee = d.datas.list[0].fee;
							that.protocolUrl = d.datas.list[0].protocolUrl;
							that.hasBuy = d.datas.list[0].hasBuy;
							that.hasPay = d.datas.list[0].hasPay;
							console.log(d.datas.list[0].hasBuy);
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
			AlreadyUsed(){//已选择
				yksapp.goPageWithParams('rzIndex',null);
			},
			TorzIndex(){//我要使用
				yksapp.goPageWithParams('rzIndex',null);
			}
			
		}
	}
</script>

<style>
#PortraitAuthenti{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
#PortraitAuthenti .header{
    flex-shrink: 0;
}
#PortraitAuthenti .Portrait-wrap{
	width: 100%;
	height: auto;
	overflow-y: scroll;
	overflow-scrolling : touch;
	flex-grow: 1;
}
#PortraitAuthenti .PortraitImg{
	width: 100%;
	height: auto;
	overflow-y: scroll;
}
#PortraitAuthenti .PortraitImg img{
	width: 100%;
	/*height: 100%;*/
}
#PortraitAuthenti .ServiceAgreement{
	position: relative;
	font-size: 0.3rem;
}
#PortraitAuthenti .ServiceAgreement .mint-cell{
	height: 0.8rem;
	background: #f4f4f4;
}
#PortraitAuthenti .ServiceAgreement .mint-cell-wrapper{
	background-size: 120% 0px;
	background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0);
}
#PortraitAuthenti .ServiceAgreement .mint-cell .mint-checkbox-label{
	font-size: 0;
    color: #26a2ff;
    margin-left: 0.1rem;
}
#PortraitAuthenti .ServiceAgreement .mint-cell  .mint-checkbox-core{
	width: 0.3rem;
    height: 0.3rem;
}
#PortraitAuthenti .ServiceAgreement .mint-cell .mint-checkbox-core:after{
	top: 0.04rem;
    left: 0.08rem;
    width: 0.06rem;
    height: 0.14rem;
}
#PortraitAuthenti .ServiceAgreement .Agreement{
	position: absolute;
    top: 0.24rem;
    left: 0.9rem;
	font-size: 0.24rem;
	line-height: 0.4rem;
    color: #26a2ff;
}
#PortraitAuthenti .confirmUser{
	flex-shrink: 0;
	width: 100%; 
	font-size: 0.28rem;
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
   	background: #fff;
}
#PortraitAuthenti .ServiceAgreement .Agreement span{
	color: rgba(0, 0, 0, 0.84);
}
#PortraitAuthenti .confirmUser p{
	float: left;
    margin-left: 0.4rem;
    line-height: 0.7rem;
}
#PortraitAuthenti .confirmUser p span{
	color: red;
}
#PortraitAuthenti .confirmUser .nextStap{
	width: 1.8rem;
    margin-right: 0.5rem;
    font-size: 0.28rem;
    height: 0.7rem;
    float: right;
    padding: 0;
}
#PortraitAuthenti .confirmUser .colorChange{
	background: #ffa200;
}
#PortraitAuthenti .confirmUser .AlreadyUsed{
	float: right;
	color: #ffa200;
	font-size: 0.26rem;
    font-weight: 600;
    margin: 0.16rem 0.6rem 0 0;
}
/*#PortraitAuthenti .confirmUser .haveChose{
	width: 1.4rem;
    height: 0.65rem;
    float: right;
    background: #ffa200;
    padding: 0;
    margin-top: 0.04rem;
    margin-right: 0.3rem;
}*/
</style>