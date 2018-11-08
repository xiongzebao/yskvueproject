<template>
	<div id="testCenter">
		<mt-header fixed title="考点">
		  <router-link to="/signUpInfo" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<Search></Search>
		<div class="sd">
			<div class="seeTestCenter lineHeight">
				<span>查看报名考点 </span>
				<i class="iconfont icon-xiangxiajiantou"></i>
			</div>
		</div>
		<div class="lorem">
			<ul>
				<li class="testCenter-Item"  v-for='item in baseData' v-tap="{methods:gotoKDL,p:item.kaoDianID}">
					<h2 class="width-re">{{item.kaoDianMC}}</h2>
					<p class="width-re">{{item.kaoDianDZ}}</p>
					<span class="schCount">{{item.schCount}}所</span>
				</li>
			</ul>
		</div>
		<div class="seeAcademy lineHeight" v-tap="{methods:gotoYX}">
			查看院校列表
		</div>
	</div>
</template>

<script>
	import Search from './Search';
	import { Toast } from 'mint-ui';
	export default {
		name:'testCenter',
		data(){
			return {
				baseData:[]
			}
		},
		components:{
			Search
		},
		mounted(){
			var url="befexam,/api/m/auth/site/page/query.htm";
			var data={};
			// 加载当前考点的所有院校
			ajaxMethod.doAjax(url, data, this.fixedData)
		},
		methods : {
			fixedData(data){
				console.log(data)
				var that = this;
				var kdAdnbm=[];
				if(data.success){
					if(data.datas.list.length>0){
						that.baseData = data.datas.list;
						data.datas.list.forEach(function(value,index){
							kdAdnbm.push({
								kaoDianBM:value.kaoDianBM,
								kaoDianMC:value.kaoDianMC,
								kaoDianID:value.kaoDianID,
								schCount:value.schCount
							})
						})
						localStorage.KD_list=JSON.stringify(kdAdnbm);
					}
				}else{
					that.toast(data.message);
				}
			},
			toast(mes){
				Toast({
				  message: mes,
				  position: 'middle',
				  duration: 3000
				});
			},
			gotoYX(){
				this.$router.push({path:"/ListOfInstitutions"})
			},
			gotoKDL(p){
				this.$router.push({path:"/examList",query:{kaoDianID:p.p}})
			}
		}
		
	}
</script>

<style scoped>
#testCenter{
	width: 100%;
	height:100%;
	overflow: auto;
	background: #fff;
}
#testCenter .lineHeight{
	height: 0.6rem;
	font-size: 0.28rem;
	text-align: center;
    line-height: 0.6rem;
    border: 1px solid #999;
}
.sd{border:1px solid transparent;box-sizing: border-box;}
#testCenter  .seeTestCenter{
	position: relative;
	width: 94%;
    border-radius: 0.1rem;
    margin: 0.1rem 0.2rem;
    background: #42cefc;
}
#testCenter  .seeTestCenter .icon-xiangxiajiantou{
	margin-left: 0.1rem;
}
#testCenter  ul .testCenter-Item{
	font-size: .2rem;
    border-bottom: 1px solid #EAEAEA;
    padding: .2rem;
    position:relative;
}
#testCenter  ul{
	width: 100%;
    height: 70%;
    overflow-y: scroll;
}
#testCenter  ul .testCenter-Item h2{
	font-size: 0.3rem;
	font-weight: normal;
}
#testCenter .seeAcademy{
	position: fixed;
    bottom: 0;
    left: 0.1rem;    
    width: 96%;
    background: #ddd;
}
.width-re{width:90%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
.schCount{position:absolute;top:50%;right:0.2rem;transform: translateY(-50%);color:#f00;}
.lorem{position:fixed;top:2.4rem;bottom:.6rem;left:0;right:0;}
</style>