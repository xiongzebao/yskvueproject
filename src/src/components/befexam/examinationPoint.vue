<template>	
	<div class="diy-header">
		<i>
			<span href="" @click="asd">返回</span>
		</i>
		<div class="condition">
			<router-link :to="{path:'/signEntrance'}">
				<span>院校</span>
			</router-link>
			<router-link :to="{path:'/examinationPoint'}">
				<span>考点</span>
			</router-link>
		</div>
	</div>
</template>
<script>
	export default{
		name:"examinationPoint",
		data(){
			return{
				sdf:'asd'
			}
		},
		mounted(){
			var url="befexam,/api/m/auth/site/page/query.htm";
			var data={};
			// 加载当前考点的所有院校
			var yrl="befexam,/api/m/auth/site/school/query.htm";
			var daata={kaoDianID:12}
			ajaxMethod.doAjax(url, data, this.loadExamtion)
			ajaxMethod.doAjax(yrl, daata, this.loadmore)
		},
		methods:{
			// 加载考点列表
			loadExamtion(datas){
				console.log(datas)
			},
			// 加载当前考点的所有院校
			loadmore(data){
				console.log(data)
			}
		}
	}
</script>
<style>
	.diy-header{height:.8rem;background: #42cefc;position:fixed;top:0;left:0;right:0;padding:0 10px;display: flex;align-items: center;}
	.diy-header i{flex:.5;font-size:.3rem;color:#fff;font-style:normal;}
	.diy-header i a{color:#fff;}
	.diy-header .condition{font-size:.3rem;border:1px solid #fff;border-radius:2px;}
	.diy-header .condition span{padding:0 .15rem;color:#fff;}
	.diy-header .condition span:first-child{border-right:1px solid #fff;}
	.router-link-exact-active{color:#42CEFC;background: #fff;}
	.diy-header .condition .router-link-exact-active span{color:#42CEFC;}
</style>