<template>
	<div id="signUpInfo">
		<mt-header fixed title="院校报名">
		  <router-link to="/" slot="left">
		    <mt-button>返回</mt-button>
		  </router-link>
		</mt-header>
		<Search></Search>
		<div class="wrap-div">
			<div class="seeExam" v-tap="{methods:gotoKD}">
				查看报名考点
			</div>
			<div class="seeExam seeAcademy" v-tap="{methods:gotoYX}">
				查看院校列表
			</div>
			<div class="hotAcademy">
				<h3>热门院校</h3>
				<ul class="academy-list clear">
					<li v-for="item in hotSchool" class="academy-Item" v-tap="{methods:gotoBm,pasd:{xueXiaoMC:item.xueXiaoMC,xueXiaoID:item.xueXiaoID}}">
						{{item.xueXiaoMC}}
					</li>
				</ul>
			</div>
			<div class="more-academy" v-tap="{methods:goLetters}">
				更多院校 >>
			</div>
		</div>
	</div>
</template>

<script>
	import {Indicator,MessageBox } from 'mint-ui';
	import Search from './Search'; 
	export default {
		name:'signUpInfo',
		data(){
			return {
				seachVal:'',
				hotSchool:[]
			}
		},
		components:{
			Search
		},
		mounted(){
			Indicator.open('加载中...');
			var that=this;
			var url="befexam,/api/m/auth/college/hot/query.htm"; 
			var data={};
			ajaxMethod.doAjax(url, data,function(d){
				Indicator.close();
				that.hotSchool=d.datas.list;
			});
		},
		methods:{
			searchSch(){
				
			},
			gotoBm(p){
				console.log(p)
				// this.$router.push({path:"/"})
				var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	console.log(p.pasd.xueXiaoMC)
	        	var datas={xueXiaoID:p.pasd.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:p.pasd.xueXiaoMC,
	        		xueXiaoID:p.pasd.xueXiaoID
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
			goLetters(){
				this.$router.push({path:"/indexListSchool"})
			},
			gotoKD(){
				this.$router.push({path:"/testCenter"})
			},
			gotoYX(){
				this.$router.push({path:"/ListOfInstitutions"})
			}
		}
	}
</script>

<style scoped>
#signUpInfo{
	/*position:fixed;
	top:.8rem;
	bottom:0;
	left:0;
	right:0;*/
	height:100%;
	overflow: auto;
	background: #fff;
}
#signUpInfo .seeExam{
	height: 0.6rem;
	font-size: 0.3rem;
	text-align: center;
    line-height: 0.6rem;
    border: 1px solid #ddd;
	margin-top: 0.18rem;
	background: #ddd;
}
#signUpInfo .hotAcademy{
	width: 100%;
	/*padding: 0 0.4rem;*/
}
#signUpInfo .hotAcademy h3{
	font-size: 0.32rem;
	margin-top: 0.5rem;
	margin-left: 0.4rem;
}
#signUpInfo .hotAcademy .academy-list{
	padding:0 .2rem;
}
#signUpInfo .hotAcademy .academy-list .academy-Item{
	float: left;
    font-size: 0.28rem;
    border: 1px solid #888;
    padding: 0.1rem;
    border-radius: 0.1rem;
    margin: 0.3rem 0 0.3rem 1.5%;
    width:30%;
    text-align:center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
}
#signUpInfo .more-academy{
	position: fixed;
    bottom: 0.4rem;
    right: 0.4rem;
    font-size: 0.24rem;
}
.wrap-div{position:fixed;top:1.6rem;bottom:0;right:0;left:0;}
</style>














