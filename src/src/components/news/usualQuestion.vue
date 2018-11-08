<template>
	<div class="usual-question">
		<!-- <mt-header fixed :title="title_U">
		            <router-link to="/" slot="left" >
		                <mt-button icon="back" slot="left" v-tap="{methods:route_contol}"></mt-button>
		            </router-link>
		        </mt-header> -->
        <div class="usual-qeestion-list">
        	<div v-if="hasData">
	        	<div class="question-wrap">
	        		<div v-for="(item,index) in questions">
	        			<div class="question-tit">
	        				{{index+1}}.{{item.qDesc}}
	        			</div>
	        			<div class="question-ans">
	        				答：
	        				<span v-if="item.context">{{item.context}}</span>
	        				<span class="contextExt-item" v-if="item.contextExt" v-html="item.contextExt"></span>
	        			</div>
	        			<!-- <div class="question-ans" v-if="item.contextExt" v-html="item.contextExt"></div> -->
	        		</div>
	        	</div>
        	</div>
        	<div v-else class="no-result">
        		<p>暂无数据</p>
        	</div>
        </div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
	    Header,
	    Button
	} from 'mint-ui';
	Vue.component(Header.name, Header);
	export default{
		data(){
			return{
				qCategory:'',
				title_U:"",
				questions:[],
				hasData:true,
			}
		},
		mounted(){
			this.title_U=this.$route.query.title_U
			if(window.yksapp){
				yksapp.setTopTitle(this.title_U);
			}else{
				document.title=this.title_U;
			}
			// alert(this.title_U)
			this.qCategory=this.$route.query.qCategory;
			var that=this;
			var url="news,/api/m/auth/question/questionListByType.htm";
			var data={qCategory:this.qCategory};
			ajaxMethod.doAjax(url, data,function(d){
				if(d.success && d.datas.list.length>0){
					that.questions=d.datas.list;
				}else if(d.success && d.datas.list.length==0){
					that.hasData=false;
				}
			});
		},
		methods:{
			route_contol:function(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style>
	.usual-qeestion-list{position:fixed;top:0rem;left:0;right:0;bottom:0;overflow: auto;font-size:.25rem;background: #fff;}
	.question-wrap{padding:.2rem;background:#fff;word-wrap: break-word;}
	.question-tit{margin: .3rem 0 .15rem;font-size:.25rem;}
	.question-ans{margin-bottom:.2rem;font-size:.2rem;}
	.no-result{padding:.2rem;background: #fff;text-align:center;}
	.contextExt-item img{max-width:100%!important;height:auto!important;}
</style>