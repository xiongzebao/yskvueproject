<template>
	<div id="ArtHelp">
		<mt-header class="header" title="艺考助手">
		  	<div slot="left" v-tap='{methods:Goback}'>
                <mt-button icon="back"></mt-button>
          	</div>
		</mt-header>
		<div class="art-wrap">
			<div class="artImg">
				<img src="../../../static/img/artHelp01.png" />
				<img src="../../../static/img/artHelp02.png" />
			</div>
			<div class="ServiceAgreement">
				<mt-checklist
				  v-model="chooseService"
				  :options="['1']">
				</mt-checklist>
				<div class="Agreement" v-tap="{methods:checkService}">
					<span>我同意并理解</span>《艺考助手使用服务协议》
				</div>
			</div>
		</div>
		<div class="confirmUser">
			<template v-if="chooseService==1">
				<mt-button class="nextStap" type="primary" size="large" v-tap="{methods:Toart}">
					我要使用
				</mt-button>
			</template>
			<template v-else>
				<mt-button class="nextStap" type="default" size="large">
					我要使用
				</mt-button>
			</template>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast,Checklist } from 'mint-ui';
	Vue.component(Checklist.name, Checklist);
	export default {
		name:'ArtHelp',
		data(){
			return {
				fee:'',//服务费
				parmDatas:'',
				protocolUrl:'',//服务协议
				chooseService:['1']
			}
		},
		mounted(){
			var that = this;
			let data={
				"flag":  "true",// true 返回hasPay false 则不返回hasPay 字段
			}
			/*服务项目列表*/
			ajaxMethod.doAjax("user,/api/m/auth/service/query.htm",data,function(d){
				console.log(d)
				if(d.success){
					if(d.datas.list){
						for(var i=0,len=d.datas.list.length;i<len;i++){
							that.fee = d.datas.list[2].fee;
							that.protocolUrl = d.datas.list[2].protocolUrl;
						}
					}
				}else{
					Toast({
					  message: d.message,
					  position: 'middle',
					  duration: 3000
					});
				}
			});
		},
		methods:{
			Goback(){
				this.$router.go(-1);
			},
			Toast(mes){
				Toast({
				  message: mes,
				  position: 'middle',
				  duration: 3000
				});
			},
			checkService(){
				var that = this;
				var service = String(this.chooseService);
				if(service==1){
					yksapp.goPageWithParams('webPage',this.protocolUrl);
				}else{
					that.Toast('请先选择艺考助手使用服务协议！');
				}
			},
			Toart(){
				this.$router.push({path:'SubscribeCollege'});
			}
		}
	}
</script>

<style>
#ArtHelp{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
#ArtHelp .header{
    flex-shrink: 0;
}
#ArtHelp .art-wrap{
	flex-grow: 1;
	width: 100%;
	overflow-y: scroll;
	overflow-scrolling: touch;
}
#ArtHelp .artImg{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
}
#ArtHelp .artImg img{
	width: 100%;
}
#ArtHelp .ServiceAgreement{
	position: relative;
	font-size: 0.3rem;
}
#ArtHelp .ServiceAgreement .mint-cell{
	height: 0.8rem;
	background: #f4f4f4;
}
#ArtHelp .ServiceAgreement .mint-cell-wrapper{
	background-size: 120% 0px;
	background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0);
}
#ArtHelp .ServiceAgreement .mint-cell .mint-checkbox-label{
	font-size: 0;
    color: #26a2ff;
    margin-left: 0.1rem;
}
#ArtHelp .ServiceAgreement .mint-cell  .mint-checkbox-core{
	width: 0.3rem;
    height: 0.3rem;
}
#ArtHelp .ServiceAgreement .mint-cell .mint-checkbox-core:after{
	top: 0.04rem;
    left: 0.08rem;
    width: 0.06rem;
    height: 0.14rem;
}
#ArtHelp .ServiceAgreement .Agreement{
	position: absolute;
    top: 0.24rem;
    left: 0.9rem;
	font-size: 0.24rem;
	line-height: 0.4rem;
    color: #26a2ff;
}
#ArtHelp .ServiceAgreement .Agreement span{
	color: rgba(0, 0, 0, 0.84);
}
#ArtHelp .confirmUser{
	flex-shrink: 0;
	width: 100%; 
	padding-top: 0.2rem;
	padding-bottom: 0.2rem;
    background: #fff;
}
#ArtHelp .confirmUser .nextStap{
	width: 82%;
    margin-left: 0.58rem;
    font-size: 0.3rem;
    height: 0.7rem;
}
</style>