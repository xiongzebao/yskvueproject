<template>
	<div id="signEntrance">
		<mt-header fixed title="院校报名">
		  <router-link to="/signUpInfo" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<Search></Search>
		<div class="seeAcademy lineHeight">
			<span>查看院校列表</span>
			<i class="iconfont icon-xiangxiajiantou"></i>
		</div>
		<div class="sign-up">
			<div class="sign-up-type">
				<ul>
					<li class="type-item" v-for='item in typeList'>{{item.typeName}}</li>
				</ul>
			</div>
			<div class="sign-up-Academy">
				<ul>
					<li class="Academy-Item" v-for='item in collegeList'>
						<span>
							<img :src="item.logo" />
						</span>
						<h3>{{item.xueXiaoMC}}</h3>
						<i class="iconfont icon-xiayiye"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="seeTestCenter lineHeight" v-tap='{methods:seeSite}'>
			查看报名考点 
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Search from './Search';
	import { Toast } from 'mint-ui';
	export default{
		name:'signEntrance',
		data(){
			return{
				typeList:[],//院校类型
				collegeList:[],//学校列表
				
			}
		},
		components:{
			Search
		},
		mounted(){
			var url = "befexam,/api/m/auth/college/query.htm";
			var datas = {};
			ajaxMethod.doAjax(url,datas,this.fixeData);
		},
		
		methods:{
			toast(mes){
				Toast({
				  message: mes,
				  position: 'middle',
				  duration: 3000
				});
			},
			fixeData(data){
				var that = this;
				console.log(data)
				if(data.success){
					if(data.datas.obj){
						that.typeList = data.datas.obj.typeList;
						that.collegeList = data.datas.obj.collegeList;
					}
				}else{
					that.toast(data.message);
				}
			},
			seeSite(){
				
			}
			
		}
	}
</script>
<style>
#signEntrance{
	width: 100%;
	height: 100%;
}
#signEntrance .seeAcademy{
	width: 94%;
    border-radius: 0.1rem;
    background: #42cefc;
}
#signEntrance .seeAcademy .icon-xiangxiajiantou{
	margin-left: 0.1rem;
}
#signEntrance  .sign-up{
	width: 100%;
    height: 72%;
    font-size: 0.28rem;
    margin-top: 0.08rem;
}
#signEntrance  .sign-up .sign-up-type{
	float: left;
	width: 1.2rem;
    height: 100%;
    overflow-y: scroll;
}
#signEntrance .sign-up-type .type-item{
	text-align: center;
	padding: 0.16rem 0;
    border-bottom: 1px solid #ddd;
}
#signEntrance  .sign-up .sign-up-Academy{
	float: left;
    width: 80.8%;
    height: 100%;
    border: 1px solid #ddd;
    border-right: 0;
    overflow-y: scroll;
}
#signEntrance .sign-up-Academy .Academy-Item{
	height: 0.6rem;
	padding: 0.16rem 0.1rem;
    border-bottom: 1px solid #ddd;
}
#signEntrance .sign-up-Academy .Academy-Item span{
	float: left;
	width: 0.6rem;
    height: 0.6rem;
    margin: 0 0.16rem;
}
#signEntrance .sign-up-Academy .Academy-Item img{
	width: 100%;
	height: 100%;
}
#signEntrance .sign-up-Academy .Academy-Item h3{
	float: left;
	font-size: 0.28rem;
	font-weight: normal;
    line-height: 0.6rem;
}
#signEntrance .sign-up-Academy .Academy-Item .icon-xiayiye{
	position: absolute;
    top: 0.3rem;
    right: 0.1rem;
    color: #42cefc;
}
#signEntrance .seeTestCenter{
	position: fixed;
    bottom: 0;
    left: 0.1rem;    
	width: 94%;
}	
#signEntrance .lineHeight{
	height: 0.6rem;
	font-size: 0.28rem;
	text-align: center;
    line-height: 0.6rem;
    border-radius: 0.1rem;
    border: 1px solid #999;
    margin: 0 auto;
}
</style>