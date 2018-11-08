<template>
	<div class="lorem">
		<mt-header fixed title="院校搜索">
            <mt-button icon="back" slot="left" @click="asd"></mt-button>
        </mt-header>
		<div class='indexList'>
			<Search></Search>
			<div :style="{height:Aheight+'px'}" class="list-wrap" v-if="!seaV">
				<mt-index-list height=Aheight slot="characters" showIndicator=false>
	  				<mt-index-section name="characters" v-for="(item,index) in characters" :index="item.Aletters" :key="index">
	    				<mt-cell v-for="(sa,s) in item.schools" :key="s" :title="sa.xueXiaoMC" v-tap="{methods:gotoBm,par:{xs:sa}}">
	    					<img slot="icon" :src="sa.logo"  width="24" height="24">
	    					<span v-if="sa.typeNme" class="label-i">
	    						<i v-for="sas in sa.typeNme">
	    							{{sas}}
	    						</i>
	    					</span>
	    				</mt-cell>
					</mt-index-section> 
				</mt-index-list>
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
	import Vue from "vue";
	import Search from './Search'; 
	import 'mint-ui/lib/style.css';
	import {
	    Header,Cell,IndexList,IndexSection,MessageBox,Indicator 
	} from 'mint-ui';
	Vue.component(Header.name, Header);
	Vue.component(IndexList.name, IndexList);
	Vue.component(IndexSection.name, IndexSection);
	Vue.component(Cell.name, Cell);
	export default{
		name:"asdas",
		data(){
			return{
				Aheight:0,
				characters:[],
				seaV:"",
				filterSch:[],
				allSchool:[],
			}
		},
		mounted(){
			this.$bus.on("seaVal",this.iptval);
			var that=this;
			var url="befexam,/api/m/auth/college/query.htm";
			var data={};
			var unique={};
			var arr=[];
			var letters=[];
			var schAdn=[];//符合条件的院校的名称，全拼，学校ID，logo
			ajaxMethod.doAjax(url, data,function(d){
				d.datas.obj.collegeList.forEach(function(value,index){
					// 全称数据操作
					var type_Name=[];
					d.datas.obj.stcList.forEach(function(v,i){
						if(v.xueXiaoID==value.xueXiaoID){
							type_Name.push(v.typeName);
						}
					})
					d.datas.obj.typeList.forEach(function(a,s){
						if(a.xueXiaoID==value.xueXiaoID){
							type_Name.push(a.typeName);
						}
					})
					if(value.nameFullSpell != null){
						arr.push(value.nameFullSpell.charAt(0))
						schAdn.push({
							xueXiaoMC:value.xueXiaoMC,
							nameFullSpell:value.nameFullSpell,
							xueXiaoID:value.xueXiaoID,
							logo:value.logo,
							typeNme:type_Name
						})
					}else{
						console.log(value.xueXiaoMC)
					}
				})
				// 字母去重
				arr.forEach(function(vale,inex){
					if(!unique[vale]){
						letters.push(vale);
						unique[vale]=1;
					}
				})
				letters=letters.sort();
				letters.forEach(function(value,index){
					var le=schAdn.filter(cur => cur.nameFullSpell.charAt(0)===value);
					that.characters.push({
						Aletters:value,
						schools:le
					})
				})
				var s=$(".search").height();
				var h=$(".mint-header").height();
				var w=$(window).height();
				that.Aheight=w-h-s;
				that.allSchool=d.datas.obj.collegeList;
				that.seaV=that.$route.query.q;
				that.allSchool.forEach(function(value,index){
					if(value.xueXiaoMC.indexOf(that.seaV) != -1){
						that.filterSch.push(value)
					}
				})
				// that.iptval()
			})
		},
		methods:{
			asd(){
				this.$router.go(-1);
			},
			iptval(s){
				this.seaV=s;
				var that=this;
				that.filterSch=[];
				that.allSchool.forEach(function(value,index){
					if(value.xueXiaoMC.indexOf(that.seaV) != -1){
						that.filterSch.push(value)
					}
				})
			},
			gotoBm(g){
				console.log(g)
				var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	var datas={xueXiaoID:g.par.xs.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:g.par.xs.xueXiaoMC,
	        		xueXiaoID:g.par.xs.xueXiaoID
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
			},
			gotoBM(g){
				var that=this;
				console.log(g)
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	var datas={xueXiaoID:g.p.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:g.p.xueXiaoMC,
	        		xueXiaoID:g.p.xueXiaoID
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
			Search
		},
	}
</script>
<style scoped>
	.lorem{position:fixed;top:0rem;left:0;right:0;bottom:0;overflow: auto;}
	.indexList{overflow: auto;}
	.list-wrap{overflow: auto;}
	.mint-indexlist{height:100%;overflow: auto;}
	.mint-indexlist-content{height:100%;} 
	.label-i i{font-style: normal;color:#f00;font-size:.2rem;border:1px solid #f00;box-sizing: border-box;padding:.1rem;height:.4rem;border-radius:.2rem;margin-left:.01rem;}
	.sch-list{font-size:.25rem;margin-top:1px;}
	.sch-list li{border-bottom:1px solid #f4f4f4;padding:.2rem;background: #fff;}
	.no-result{background: #fff;font-size: .25rem;text-align: center;padding:.2rem;margin-top:1px;}
	.loading .iconfont{font-size:.7rem;color:#777;display:block;animation:rotat 2s infinite;}
	@keyframes rotat{
		from{transform: rotate(0);}
		to{transform: rotate(360deg);}
	}
</style>