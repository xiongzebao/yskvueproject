<template>
	<div id="noteList">
		<mt-header fixed title="公告列表">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<scroller style="top:0.8rem;" :on-refresh="refresh"  :on-infinite="infinite" ref="my_scroller" class="my-scroller"  refresh-layer-color="#4b8bf4" loading-layer-color="#9c9c9c">
		    <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
	    <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
			<ul class='noteList'>
				<li v-for='item in newslist' @click='newsListIntro(item.newsUrl)'>
					<div class='title'>{{item.title}}</div>
					<template v-if='item.des'>
						<div class='des'>{{item.des}}</div>
					</template>
					<template v-else>
						<div class='des'>{{item.title}}</div>
					</template>
					<div class='date'>{{item.issueDateStr}}</div>
				</li>
			</ul>
		</scroller>
		<!--<Loading v-show="loading"></Loading>-->
	</div>
</template>

<script>
	import Vue from 'vue';
//	import { Header } from 'mint-ui';
//	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Loading from '../public/Loading.vue'
	import VueScroller from 'vue-scroller'
	Vue.use(VueScroller);
//	Vue.component(Button.name, Button);
//	Vue.component(Header.name, Header);
	export default{
		name:'noteList',
		data(){
			return {
				newslist:'',
				loading: true,
				currentPage:0,//开始标志
				endPage:0,//结束标志
				totalPage:''
			}
		},
		mounted(){
			this.fixdata(1);
		},
		methods:{
			fixdata(page){
			var that=this;
			var data={
				 "curPage":page
			};
			
			ajaxMethod.doAjax("sys,/api/m/schoolNews/query.htm", data, function(database) {
                console.log(database)
				if(database.success) {
					if(database.datas){
						that.newslist = database.datas.list;
						that.currentPage=database.datas.page.curPage;
						that.endPage=database.datas.page.endPage;
					}
					
				} else {
					Toast({
						message: database.message,
						position: 'middle',
						duration: 3000
					});
				}
			},function(){
				that.loading = false;
				
			});
			},
			newsListIntro(newsurl){
                yksapp.goPageWithParams('webPage', newsurl);	
			},
			/*下拉刷新和加载更多*/
			refresh(done) {
				this.currentPage=1;
				 setTimeout(() => {		
				    this.fixdata(this.currentPage);
				          setTimeout(() => {
						         done()
						   })
				  }, 1500)
			},
			infinite(done){
					if(this.endPage<this.currentPage+1){
						setTimeout(() => {
					            done(true)
					          }, 1500)
					    return;
					}
					setTimeout(() => {
						 this.fixdata(this.currentPage++)
						  setTimeout(() => {
							     done()
							   })
				         
				        }, 1500)
				
//				 
			}
		},
		components: {
			Loading: Loading
		}
	}
</script>

<style>
	#noteList .noteList {
		background: #fff;
	}
	#noteList .noteList li {
		overflow: hidden;
		padding: 0px 10px 0px 15px;
		box-sizing: border-box;
		border-bottom: 1px solid #ececec;
	}
	#noteList .noteList li:last-child{
		border: none;
		border: 0;
	}
	#noteList .noteList li .title {
		height: 0.7rem;
		line-height: 0.7rem;
		font-size: 0.34rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 500;
	}
	
	#noteList .noteList li .des,
	#noteList .noteList li .date {
		font-size: 0.25rem;
		color: #9c9c9c;
	}
	
	#noteList .noteList li .des {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 0.48rem;
	}
	#noteList .noteList li  .date{
		float: right;
		padding: 0.15rem 0px;
	}
</style>