<template>
	<div id="testPointList">
		<mt-header fixed title="院校报名">
		  <router-link to="/testCenter" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<Search class="seahiFixed"></Search>
		<div class="sign-up">
			<div class="sign-up-type">
				<ul class="sign-up-left">
					<li class="sign-up-Item" v-tap='{methods:checkSite}'>
						<p>{{sitList.siteName}}</p>
						<p class="smallSiez">（{{sitList.siteBM}}）</p>
					</li>
				</ul>
			</div>
			<div class="sign-up-Academy">
				<ul class="Academy_right">
					<li class="Academy-Item" v-for='data in baseData_school'>
						<span>
							<img :src="data.logo" />
						</span>
						<h3>{{data.xueXiaoMC}}</h3>
						<i class="iconfont icon-xiayiye"></i>
					</li>
				</ul>
			</div>
			<div class="seeTestCenter" v-tap='{methods:seeSite}'>
				查看报名考点 
			</div>
		</div>
	</div>
</template>

<script>
	import Search from './Search';
	import { Toast } from 'mint-ui';
	export default {
		name:'testPointList',
		data(){
			return {
				baseData_site:[],
				baseData_school:[],
				sitList:'',//考点列表
			}
		},
		components:{
			Search
		},
		mounted(){
			this.sitList = this.$route.query;
			var school_url="befexam,/api/m/auth/site/school/query.htm";
			var pram={kaoDianID:this.sitList.siteId};
			ajaxMethod.doAjax(school_url, pram, this.fixedData_school);
		},
		methods:{
			toast(mes){
				Toast({
				  message: mes,
				  position: 'middle',
				  duration: 3000
				});
			},
			fixedData_school(data){//获取学校展示数据
				var that = this;
				console.log(data)
				if(data.success){
					if(data.datas.list){
						that.baseData_school = data.datas.list;
					}
				}else{
					that.toast(data.message);
				}
			},
			checkSite(){//点击当前项报名
				
			},
			seeSite(){
				
			}
		}
	}
</script>

<style scoped>
#testPointList{
	width: 100%;
	height: 100%;
	background: #fff;
}
#testPointList .seahiFixed{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;	
}
#testPointList .sign-up{
	width: 100%;
	position: fixed;
    top: 1.7rem;
    bottom: 0.86rem;
}
#testPointList .sign-up-type{
	float: left;
	height: 100%;
	width: 1.2rem;
}
#testPointList .sign-up-type .sign-up-left{
	height: 100%;
	text-align: center;
	overflow-y: scroll;
}
#testPointList .sign-up-left .sign-up-Item{
	padding: 0.2rem 0;
	background: #f4f4f4;
}
#testPointList .sign-up-left .sign-up-Item p{
	font-size: 0.26rem;
}
#testPointList .sign-up-left .sign-up-Item .smallSiez{
	font-size: 0.22rem;
}
#testPointList .sign-up .sign-up-Academy{
	float: left;
    width: 80.8%;
    height: 100%;
    border: 1px solid #ddd;
    border-right: 0;
    background: #f4f4f4;
}
#testPointList .sign-up .Academy_right{
	width: 100%;
    height: 100%;
    overflow: auto;
}
#testPointList .sign-up .Academy_right .Academy-Item{
    height: 0.6rem;
    padding: 0.16rem 0;
    border-bottom: 1px solid #ddd;
    position: relative;
}
#testPointList .sign-up .Academy_right .Academy-Item:last-child{
	border-bottom:0;
}
#testPointList .sign-up .Academy_right .Academy-Item span{
	float: left;
	width: 0.6rem;
    height: 0.6rem;
    margin: 0 0.16rem;
}
#testPointList .sign-up .Academy-Item img{
	width: 100%;
	height: 100%;
}
#testPointList .sign-up .Academy-Item h3{
	float: left;
	font-size: 0.28rem;
	font-weight: normal;
    line-height: 0.6rem;
}
#testPointList .sign-up .Academy-Item .icon-xiayiye{
	position: absolute;
    top: 0.3rem;
    right: 0.1rem;
    color: #42cefc;
}
#testPointList .seeTestCenter{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 94%;
	height: 0.6rem;
	border: 1px solid #ddd;
	font-size: 0.26rem;
	line-height: 0.6rem;
    text-align: center;
    border-radius: 0.1rem;
    margin: 0.1rem 0.2rem;
    background: #fff;
}
</style>