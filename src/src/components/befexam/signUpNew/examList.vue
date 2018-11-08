<template>
	<div class="testCenter">
		<mt-header fixed title="考点列表">
		  <router-link to="/testCenter" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<Search></Search>
		<div class="seeTestCenter lineHeight">
			<span>查看报名考点 </span>
			<i class="iconfont icon-xiangxiajiantou"></i>
		</div>
		<div class="kaodianList">
			<!-- 所有考点 -->
			<div class="kaodian_mc">
				<ul>
					<li class="testCenter-Item" :class="{curKoadian:item.kaoDianID==asd}" v-for='item in baseData' v-tap="{methods:search_sch,p:item.kaoDianID}">
						<div class="kaodian-detail">{{item.kaoDianMC}}</div>
						<div class="kaodian-detail">({{item.kaoDianBM}})</div>
					</li>
				</ul>
			</div>
			<!-- 对应考点的院校 -->
			<div class="kd-xuexiao">
				<ul>
					<li v-for="item in sch_list" v-tap="{methods:gotoBm,p:item}">
						<div class="sch-detail">
							<div class="kaodian-img-wrap">
								<img :src="item.logo" alt="">
							</div>
							<div>
								{{item.xueXiaoMC}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="seeAcademy lineHeight" v-tap="{methods:gotoYX}">
			查看院校列表
		</div>
	</div>
</template>

<script>
	import Search from './Search';
	import { Toast,Indicator } from 'mint-ui';
	export default {
		name:'testCenter',
		data(){
			return {
				baseData:[],
				sch_list:[],
				kaoDianID:{p:""},
				asd:""
			}
		},
		components:{
			Search
		},
		mounted(){
			this.kaoDianID.p=this.$route.query.kaoDianID;
			this.asd=this.$route.query.kaoDianID;
			this.baseData=JSON.parse(localStorage.getItem("KD_list"));
			this.search_sch(this.kaoDianID)
		},
		methods : {
			toast(mes){
				Toast({
				  message: mes,
				  position: 'middle',
				  duration: 3000
				});
			},
			gotoYX(){
				this.$router.push({path:"/ListOfInstitutions"})
			},
			search_sch(p){
				this.asd=p.p
				var that=this;
				var url="befexam,/api/m/auth/site/school/query.htm";
				var data={
					kaoDianID:p.p
				};
				ajaxMethod.doAjax(url, data, function(d){
					that.sch_list=d.datas.list;
				})
			},
			gotoBm(p){
				console.log(p)
				// this.$router.push({path:"/"})
				var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	console.log(p.p.xueXiaoMC)
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
		}
		
	}
</script>

<style scoped>
.testCenter{
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: auto;
}
.testCenter .lineHeight{
	height: 0.6rem;
	font-size: 0.28rem;
	text-align: center;
    line-height: 0.6rem;
    border: 1px solid #999;
}
.testCenter  .seeTestCenter{
	position: relative;
	width: 94%;
    border-radius: 0.1rem;
    margin: 0.1rem 0.2rem;
    background: #42cefc;
}
.testCenter  .seeTestCenter .icon-xiangxiajiantou{
	margin-left: 0.1rem;
}
.testCenter  ul .testCenter-Item{
	font-size: .2rem;
    border-bottom: 1px solid #EAEAEA;
    padding: .2rem .1rem;
    position:relative;
}
.testCenter  ul{
	width: 100%;
    overflow-y: scroll;
    border-right:1px solid #ddd;
}
.testCenter  ul .testCenter-Item h2{
	font-size: 0.3rem;
	font-weight: normal;
}
.testCenter .seeAcademy{
	position: fixed;
    bottom: 0;
    left: 0.1rem;    
    width: 96%;
    background: #ddd;
}
.width-re{width:90%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
.schCount{position:absolute;top:50%;right:0.2rem;transform: translateY(-50%);color:#f00;}
.kaodianList{display:flex;overflow: auto;height:70%;}
.kaodian_mc{width:1.2rem;height:100%;overflow:auto;}
.kd-xuexiao{font-size:0.2rem;height:100%;overflow: auto;width:calc(100% - 1.2rem);}
.kd-xuexiao li{padding:0.2rem;border-bottom:1px solid #ddd;}
.kaodian-detail{text-align:center;}
.curKoadian{background: #ddd;}
.sch-detail{display:flex;align-items: center;}
.kaodian-img-wrap{width:.6rem;height:.6rem;margin-right:.1rem;}
.kaodian-img-wrap img{max-width:100%;max-height: 100%;}
</style>