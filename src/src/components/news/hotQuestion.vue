<template>
	<div class="hot-question">
		<!-- <mt-header fixed title="热门问题">
		            <router-link to="/" slot="left">
		                <mt-button icon="back" slot="left" v-tap="{methods:route_contol}"></mt-button>
		            </router-link>
		        </mt-header> -->
        <div class="hot-question-del">
        	<div class="question-content">
				<h3 class="question-t">{{qDesc}}</h3>
				<div class="hot-question-del-p">
					答：<span v-if="context">{{context}}</span>
					<span class="hot-question-ext" v-if="contextExt" v-html="contextExt"></span>
				</div>
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
				qaID:'',
				qDesc:'',//问题题目
				context:'',//纯文本
				contextExt:''//富文本
			}
		},
		mounted(){
			var that=this;
			this.qaID=this.$route.query.qaID;
			// debugger
			var url='news,/api/m/auth/question/questionDetail.htm';
			var data={qaID:this.qaID};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url, data,function(d){
				Indicator.close();
				if(d.success){
					that.qDesc=d.datas.obj.qDesc
					that.context=d.datas.obj.context
					that.contextExt=d.datas.obj.contextExt
				}
			});
		},
		methods:{
			route_contol:function(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
	.question-t{font-weight: normal;font-size:.25rem;padding:.2rem 0;}
	.hot-question-del{position:fixed;top:0rem;left:0;right:0;bottom:0;overflow:auto;background: #fff;font-size:.2rem;}
	.question-content{padding:.2rem;}
	.hot-question-ext{word-break: break-word;}
	.hot-question-del-p{font-size:.2rem;}
</style>