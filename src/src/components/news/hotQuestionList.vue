<template>
	<div class="hot-question-list">
		<!-- <mt-header fixed title="热门问题列表">
		            <router-link to="/" slot="left">
		                <mt-button icon="back" slot="left" v-tap="{methods:route_contol}"></mt-button>
		            </router-link>
		        </mt-header> -->
        <div class="hot-question-list-del">
        	<div v-if="has_data" class="has-no-data">
        		暂无数据
        	</div>
        	<div class="inner-list" v-else>
	        	<ul>
	        		<li v-for="(item,index) in hotQuestionList" v-tap="{methods:gotoDatail,qaID:item.qaID}">
	    				<span>{{index+1}}.</span>
	    				{{item.qDesc}}
	    				<i class="icon"></i>
	        		</li>
	        	</ul>
        	</div>
        </div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import Vue from 'vue';
	import {
	    Header,
	    Button
	} from 'mint-ui';
	Vue.component(Header.name, Header);
	export default{
		name:"hotQuestion",
		data(){
			return{
				hotQuestionList:[],
				has_data:false
			}
		},
		mounted(){
			var that=this;
			var url="news,/api/m/auth/question/hotQuestionList.htm";
			var data={};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url, data,function(d){
				Indicator.close();
				if(d.success && d.datas.list.length>0){
					that.has_data=false;
					that.hotQuestionList=d.datas.list;
				}
				if(d.success && d.datas.list.length == 0){
					that.has_data=true
				}
			})
		},
		methods:{
			gotoDatail:function(par){
				this.$router.push({path:"/hotQuestion",query:{qaID:par.qaID}})
			},
			route_contol:function(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style scoped>
	.hot-question-list-del{background: #fff;font-size:.2rem;position:fixed;top:0rem;left:0;right:0;bottom:0;overflow: auto;}
	.inner-list ul li{padding:.2rem .45rem .2rem .2rem;border-bottom:1px solid #ddd;position: relative;font-size:.25rem;}
	.inner-list ul li .icon{position:absolute;top:50%;right:.2rem;transform: translate(0,-50%) rotate(135deg);width:.18rem;height:.18rem;border-left:1px solid #4DC7FF;border-top:1px solid #4DC7FF;}
	.has-no-data{padding:.3rem;text-align:center;font-size:.3rem;}
</style>