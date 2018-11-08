<template>
	<div class="help-index">
		<!-- <mt-header fixed title="帮助与反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="questions">
        	<div class="outter-search">
	        	<div class="search-ipt">
	        		<div class="wrap-search" v-tap="{methods:goSerarch}">
		        		<span class="iconfont icon-sousuo"></span>
		        		<span>请输入关键字</span>
	        		</div>
	        	</div>
        	</div>
	        <!-- 热门问题 -->
	        <div class="reduce-div">
		        <div class="wrap-div">
			        <div class="hot-quqestion">
			        	<h1 class="question-title">
			        		<span class="border-l"></span>
			        		热门问题
			        	</h1>
			        	<ul class="question-list usual-li">
			        		<li v-for="(item,index) in hot_question" v-tap="{methods:hotClick,item:item}">
			        			<span>{{index+1}}.</span>
			        			{{item.qDesc}}
			        			<i class="icon"></i>
			        		</li>
			        	</ul>
			        	<div class="load-more" v-tap="{methods:loadMore}">查看更多</div>
			        </div>
		        </div>
	        </div>
	        <!-- 常见问题分类 -->
	        <div class="wrap-div">
		        <div class="usual-question">
		        	<h1 class="question-title">
		        		<span class="border-l"></span>
		        		常见问题分类
		        	</h1>
		        	<ul class="question-list hot-list">
		        		<li v-for="(item,index) in usual_question" v-tap="{methods:usualClick,item:item}">
		        			<span>{{index+1}}.</span>
		        			{{item.typeName}}
		        			<i class="icon"></i>
		        		</li>
		        	</ul>
		        </div>
	        </div>
	        <div class="btm">
	        	<mt-button type="primary" size="normal" v-tap="{methods:touch_custom}">
	        		联系客服
	        	</mt-button>
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
	Vue.component(Button.name, Button);

	export default{
		name:"help",
		data(){
			return{
				hot_question:[],//热门问题
				usual_question:[],//常见问题
				handle_usual_question:[]
			}
		},
		mounted(){
			var that=this;
			var url="news,/api/m/auth/question/helpAndfeedbackIndex.htm";
			var data={};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url, data,function(d){
				Indicator.close();
				that.hot_question=d.datas.hotQuestionList;
				that.usual_question=d.datas.questionTypeList;
			});
		},
		watch:{
			hot_question:function(n,o){
				var that=this
				var searchH=$(".outter-search").height();
				var titleHei=$(".question-title").height()*2;
				var loadMore=$(".load-more").height();
				var headH=$(".mint-header").height();
				var cliHei=(document.body.clientHeight-headH-searchH-titleHei-loadMore)/2;
				var liHei;
				var ss=setInterval(function(){
					var liS=$(".usual-li li");
					if(liS.length>0){
						$(".usual-li").css({"maxHeight":cliHei,"overflow":"hidden"});
						liHei=$(".usual-li li").height();
						var hwo=parseInt(cliHei/liHei);
						that.hot_question=that.hot_question.slice(0,hwo);
						// $(".usual-question").css("minHeight",document.body.clientHeight-$(".reduce-div").height()-$(".outter-search").height()-$(".mint-header").height());
						clearInterval(ss);
					}
				},10)
			}
		},
		methods:{
			// 热门问题跳转
			hotClick:function(par){
				this.$router.push({path:"/hotQuestion",query:{qaID:par.item.qaID}})
			},
			// 常见问题跳转
			usualClick:function(par){
				this.$router.push({path:"/usualQuestion",query:{qCategory:par.item.id,title_U:par.item.typeName}})
			},
			//加载更多
			loadMore:function(){
				this.$router.push({path:"/hotQuestionList"})
			},
			// 联系客服
			touch_custom:function(){
				this.$router.push({path:"/touchCustom"})
			},
			// 搜索页面
			goSerarch:function(){
				this.$router.push({path:"/searchPage"})
			},
		}
	}
</script>
<style scoped>
	.help-index .question-title{font-size:.3rem;font-style: normal;font-weight:normal;padding:.1rem 0;position:relative;padding-left:.2rem;}
	.help-index .question-title .border-l{position:absolute;top:50%;left:0;transform: translate(0,-50%);width:.15rem;height:.25rem;background: #35BBF2}
	.questions{background:#fff;position:fixed;top:0rem;left:0;right:0;bottom:0;font-size:.25rem;overflow: auto;}
	.questions .question-list li{border-bottom:1px solid #f8f8f8;padding:.2rem 1rem .1rem .2rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;position:relative;}
	.questions .question-list li .icon{position:absolute;top:50%;right:.2rem;transform: translate(0,-50%) rotate(135deg);width:.18rem;height:.18rem;border-left:1px solid #4DC7FF;border-top:1px solid #4DC7FF;}
	.wrap-div{background: #f4f4f4;background:#fff;}
	.wrap-div:last-child{margin-top:.2rem}
	.load-more{color:#3300FF;background: #F8F8F8;color:#727272;padding:.1rem .2rem;}
	.btm{text-align:center;margin:.2rem 0;}
	.search-ipt{background: #fff;text-align:center;padding-top:.1rem;}
	.wrap-search{border:1px solid #42cefc;width:80%;margin:0 auto;color:#C1BFC4;padding:.1rem 0;border-radius:2px;}
	.icon-sousuo{font-size:.3rem;}
	.reduce-div{border-top: 1px solid transparent;}
	.btm button{width:50%;}
</style>