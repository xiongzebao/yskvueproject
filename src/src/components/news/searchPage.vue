<template>
	<div class="search-page">
		<!-- <mt-header fixed title="问题搜索">
		            <router-link to="/" slot="left">
		                <mt-button icon="back" slot="left" v-tap="{methods:route_contol}"></mt-button>
		            </router-link>
		        </mt-header> -->
        <div class="search-del">
        	<div class="search-btn">
				<input type="text" v-model="search_val" class="ipt-val">
				<span v-tap="{methods:search_cli}" class="search-btn_q">搜索</span>
			</div>
			<div class="wenti-all">
				<p v-show="if_has_data" class="has-no-data">暂无数据</p>
				<div class="wenti_ifShow" v-show="wenti_ifShow" v-for="(item,index) in wenti_list" v-tap="{methods:gotoDetail,parmer:{qaid:item.qaID}}">
					<span>{{index+1}}</span>
					<span>{{item.qDesc}}</span>
				</div>
			</div>
        </div>
        <keep-alive>
        	<router-view></router-view>
        </keep-alive>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import { Search } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import Vue from 'vue';
	Vue.component(Search.name, Search);
	Vue.component(Cell.name, Cell);
	export default{
		name:"help",
		data(){
			return{
				search_val:"",
				wenti_ifShow:false,
				wenti_list:[],
				if_has_data:false,
			}
		},
		mounted(){
			$(".ipt-val").trigger('focus');
			this.ipt_click();
			console.log($(".ipt-val"))
		},
		methods:{
			ipt_click:function(){
				$(".ipt-val").click();
			},
			search_cli:function(){
				var that=this;
				if(this.search_val==""){
					// alert(123)
					return;
				}
				Indicator.open('加载中...');
				var url="news,/api/m/auth/question/questionList.htm";
				var data={
					"keyword":this.search_val
				};
				ajaxMethod.doAjax(url, data,function(d){
					Indicator.close();
					if(d.success && d.datas.list.length>0){
						that.wenti_ifShow=true;
						that.if_has_data=false;
						that.wenti_list=d.datas.list;
					}
					if(d.success && d.datas.list.length==0){
						that.wenti_list=[];
						that.if_has_data=true;
					}
				})
			},
			route_contol:function(){
				this.$router.go(-1)
			},
			gotoDetail:function(parmer){
				console.log(parmer.parmer.qaid)
				// this.$router.push({path:"/hotQuestion",query:{qaID:parmer.parmer.qaid}})
				this.$router.push({path:"/hotQuestion_2",query:{qaID:parmer.parmer.qaid}})
			}
		}
	}
</script>
<style scoped>
	/*.search-del{padding-top:.8rem;}*/
	.search-btn{display:flex;justify-content: center;align-items: center;padding-top:.1rem;font-size:.3rem;}
	.search-btn input{width:60%;border:none;border-radius: 4px;padding:.1rem;margin-right:.2rem;}
	.search-btn_q{background: #26a2ff;color:#fff;padding:.07rem .1rem;border-radius:5px;font-size:.3rem;}
	.wenti_ifShow{font-size:.3rem;background: #fff;padding:.3rem;border-bottom:1px solid #f4f4f4;}
	.wenti-all{margin-top:.1rem;}
	.has-no-data{font-size:.3rem;text-align:center;background: #fff;padding:.3rem;}
</style>