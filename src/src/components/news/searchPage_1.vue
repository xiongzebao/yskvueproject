<template>
	<div class="search-page">
		<mt-header fixed title="问题搜索">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back" slot="left" v-tap="{methods:route_contol}"></mt-button>
            <!-- </router-link> -->
        </mt-header>
        <div class="search-del">
			<mt-search class="search-ipt"
				v-model="qusetionVal" 
				cancel-text="取消"
	  			placeholder="搜索"
	  			autofocus
			>
				<mt-cell
			    	v-for="(item,index) in show_result"
			    	:title="item.title"
					v-tap="{methods:ads,item:item.value}"
					:key="index"
			    	>
			  	</mt-cell>
			</mt-search>
        </div>
	</div>
</template>
<script>
	import { Search } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import Vue from 'vue';
	Vue.component(Search.name, Search);
	Vue.component(Cell.name, Cell);
	export default{
		name:"help",
		data(){
			return{
				qusetionVal:"",
				result:[],
				show_result:[],
			}
		},
		mounted(){
			var that=this;
			// var url="news,/api/m/auth/question/questionList.htm";
			var url="news,/api/m/auth/question/hotQuestionList.htm";
			var data={keyword:this.keyword};
			ajaxMethod.doAjax(url, data,function(d){
				var dd=d.datas.list;
				dd.forEach(function(value,index){
					that.result.push({
						title:value.qDesc,
						value:value.qaID
					});
				})
			});
			console.log(that.result)
		},
		watch:{
			qusetionVal:function(n,o){
				var that=this;
				that.show_result=[];
				this.result.forEach(function(value,index){
					if(that.result[index].title.indexOf(n)!=-1){
						that.show_result.push({
							title:value.title,
							value:value.value	
						})
					}
				})
				if(that.show_result.length==0){
					that.show_result.push({
						title:"暂无结果",
						value:0	
					})
				}
			}
		},
		methods:{
			ads:function(par){
				if(par.item!=0){
					this.$router.push({path:"/hotQuestion",query:{qaID:par.item}})
				}
			},
			route_contol:function(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style scoped>
	.search-del{padding-top:.8rem;}
	.search-ipt{font-size:.3rem;}
	.mint-search-list{top:96px!important;}
</style>