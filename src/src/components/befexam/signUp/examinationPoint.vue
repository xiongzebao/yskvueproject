<template>
	<div>
		<diyHeader></diyHeader>
		<Loading v-if="load_flag"></Loading>
		<div v-else class="site-list">
			<ul class="school-list-ul">
				<li v-for="item in schoolList" v-tap="{methods:getSchList,item:item}">
					<h4 class="kaoDianMC">{{item.kaoDianMC}}</h4>
					<p>{{item.kaoDianDZ}}</p>
				</li>
			</ul>
		</div>
		<!-- <keep-alive>
			<router-view></router-view>
		</keep-alive> -->
	</div>
</template>
<script>
	import diyHeader from "./diyHeader";
	import { Toast } from 'mint-ui';
	import Loading from '../../public/Loading'
	export default{
		data(){
			return{
				schoolList:[],
				load_flag:true
			}
		},
		mounted(){
			var url="befexam,/api/m/auth/site/page/query.htm";
			var data={};
			// 加载当前考点的所有院校
			ajaxMethod.doAjax(url, data, this.loadExamtion)
		},
		methods:{
			loadExamtion(data){
				if(data.success){
					this.load_flag=false;
					this.schoolList=data.datas.list
				}else{
					Toast({
						message: data.message,
						duration: 5000
					});
				}
			},
			getSchList(par){
				var yrl="befexam,/api/m/auth/site/school/query.htm";
				if(localStorage.getItem("kaoDianBM")){
					localStorage.setItem("kaoDianBM",par.item.kaoDianBM);
				}else{
					localStorage.setItem("kaoDianBM",par.item.kaoDianBM);
				}
				this.$router.push({path:"/examinationPointcollege",query:{kaoDianID:par.item.kaoDianID}})
			},
		},
		components: {
			diyHeader:diyHeader,
			Loading:Loading
		}
	}
</script>
<style scoped>
.site-list{background:#fff;padding-top:.8rem;}
.school-list-ul li{font-size:.2rem;border-bottom:1px solid #EAEAEA;padding:.2rem;}
.school-list-ul li .kaoDianMC{font-size:.3rem;font-weight:normal;}
</style>