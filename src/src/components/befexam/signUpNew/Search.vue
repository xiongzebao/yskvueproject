<template>
	<div>
		<div class="search">
			<div class="wrap">
				<input type="text" placeholder="院校名称" class="search-iput" v-model="seachVal" v-on:input="ipt">
			</div>
			<div>
	            <mt-button class="search-btn" type="primary" size="small" v-tap="{methods:searchSch}">
	                搜索
	            </mt-button>
            </div>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import VueBus from 'vue-bus';
	Vue.use(VueBus);
	export default {
		name:'Search',
		data(){
			return {
				seachVal:'',
			}
		},
		methods:{
			searchSch(){
				this.$bus.emit("seaVal",this.seachVal);
				this.$router.push({path:"/indexListSchool",query:{q:this.seachVal}})
			},
			ipt(){
				this.$bus.emit("seaVal",this.seachVal);
			}
		}
	}
</script>

<style scoped>
.search{
	height:.8rem;
	width:100%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	margin-top: 0.8rem;
	background: #fff;
}
.search .search-iput{
	border: 1px solid #44CEFC;
    height: .6rem;
    font-size: .25rem;
    text-align: center;
    width: 100%;
    border-radius: .35rem;
    margin-right: 0.2rem;
}
.search .search-btn{
	width: 0.9rem;
    height: 0.56rem;
    padding: 0;
    font-size: 0.26rem;
}
.mint-button--small{display:block;}
.wrap{width:60%;margin-right:.1rem;}
</style>