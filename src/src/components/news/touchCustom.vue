<template>
	<div class="touchCustom">
		<!-- <mt-header fixed title="联系客服">
		            <router-link to="/help" slot="left">
		                <mt-button icon="back"></mt-button>
		            </router-link>
		        </mt-header> -->
        <div class="question-list">
			<h1 class="type-list">选择您想咨询的问题分类</h1>
			<div v-if="hasData">
				<div class="question-list-box-wrap">
					<div class="f-fixed question-list-box">
						<div v-for="item in questionTypeList" v-tap="{methods:gotoAssis,qaId:{qaId:item.id}}" class="question-list-del">
							{{item.typeName}}
						</div>
					</div>
				</div>
			</div>
			<div v-else class='no-result'>
				<p>暂无数据</p>
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
		data(){
			return{
				questionTypeList:[],
				hasData:true,
			}
		},
		mounted(){
			var that=this;
			var url="news,/api/m/auth/question/questionTypeList.htm";
			var data={};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url, data,function(d){
				Indicator.close();
				if(d.success && d.datas.list.length>0){
					that.questionTypeList=d.datas.list;
				}else if(d.success && d.datas.list==0){
					that.hasData=false;
				}
				console.log(that.questionListTop5)
			});
		},
		methods:{
			gotoAssis:function(par){
				this.$router.push({path:"/assistant",query:{qaId:par.qaId.qaId}})
			}
		},
	}
</script>
<style scoped>
	.f-fixed:after {
	    content: '\200b';
	    display: block;
	    height: 0;
	    clear: both;
	}
	/*.question-list{padding-top:.8rem;}*/
	.type-list{font-weight: normal;font-size: .3rem;text-align:center;padding:.5rem .3rem;color:#454545;}
	.no-result{padding:.2rem;}
	.question-list-del{text-align:center;font-size:.3rem;padding:.2rem 0;width:48%;float:left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;background: #fff; color:#56CAFF;margin:0 0 .5rem 0;border-radius: 1px;}
	.question-list-del:nth-child(2n+1){margin-right:4%;}
	.question-list-box-wrap{padding:0 .8rem;}
</style>