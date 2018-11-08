<template>
	<div class="search-value">
		<mt-header fixed title="院校搜索">
		  	<router-link to="/signUpInfo" slot="left">
		    	<mt-button icon="back"></mt-button>
		  	</router-link>
		</mt-header>
		<Search></Search>
		<div class="display-filter">
			<div v-if="orgin" class="no-result loading">
				<span class="icon-mihao iconfont"></span>
			</div>
			<div v-else>
				<div v-if="filterSch.length>0">
					<ul class="sch-list">
						<li v-for="item in filterSch" v-tap="{methods:gotoBM,p:item}">
							<div>
								{{item.xueXiaoMC}}
							</div>
						</li>
					</ul>
				</div>
				<div v-else class="no-result">
					暂无数据
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Search from './Search';
	import { Button,Toast,Indicator,MessageBox,Lazyload } from 'mint-ui';
	export default{
		data(){
			return {
				allSchool:[],
				filterSch:[],
				keyWord:"",
				orgin:true
			}
		},
		mounted(){
			var that=this;
			this.keyWord=this.$route.query.q;
			var url="befexam,/api/m/auth/college/query.htm";
			var data={};
			ajaxMethod.doAjax(url,data,this.loaddata);
			this.$bus.on("seaVal",this.iptval);
		},
		methods:{
			iptval(s){
				this.keyWord=s
				var that=this;
				that.filterSch=[];
				that.allSchool.forEach(function(value,index){
					if(value.xueXiaoMC.indexOf(that.keyWord) != -1){
						that.filterSch.push(value)
					}
				})
			},
			loaddata(d){
				var that=this;
				if(d.success){
					that.allSchool=d.datas.obj.collegeList;
					that.filterSch=[];
					that.allSchool.forEach(function(value,index){
						that.orgin=false;
						if(value.xueXiaoMC.indexOf(that.keyWord) != -1){
							that.filterSch.push(value)
						}
					})
				}
				console.log(that.filterSch)
			},
			gotoBM(p){
				var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	var datas={xueXiaoID:p.p.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:p.p.xueXiaoMC,
	        		xueXiaoID:p.p.xueXiaoID
	        	}
	        	Indicator.open('加载中...');
	        	ajaxMethod.doAjax(url,datas,function(d){
	        		// 填过专业跳转到院校已选专业
	        		if(d.success){
		        		if(!d.datas.list.length>0){
		        			that.$router.push({path:"/signEntrance/testCenterProf",query:parmers})
		        		}else{
		        			that.$router.push({path:"/signEntrance/selectProf",query:parmers})
		        		}
	        		}else{
	        			MessageBox({
						  	title: '提示',
						  	message: d.message,
						  	showCancelButton: false
						});
	        		}
	        		Indicator.close();
	        	});
			}
		},
		components:{
			Search,
		}
	}
</script>
<style scoped>
	.display-filter{position:fixed;top:1.6rem;bottom:0;left:0;right:0;overflow: auto;}
	.sch-list{font-size:.25rem;margin-top:1px;}
	.sch-list li{border-bottom:1px solid #f4f4f4;padding:.2rem;background: #fff;}
	.no-result{background: #fff;font-size: .25rem;text-align: center;padding:.2rem;margin-top:1px;}
	.loading .iconfont{font-size:.7rem;color:#777;display:block;animation:rotat 2s infinite;}
	@keyframes rotat{
		from{transform: rotate(0);}
		to{transform: rotate(360deg);}
	}
</style>