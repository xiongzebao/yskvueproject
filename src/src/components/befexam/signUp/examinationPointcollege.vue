<template>
	<div>
				<mt-header fixed title="考点院校">
		            <router-link to="/examinationPoint_1" slot="left">
		                <mt-button icon="back"></mt-button>
		            </router-link>
		        </mt-header>
		<div class='examination-college'>
			<!-- <div> -->
		        <Loading v-if="load_flag"></Loading>
		        <pulldown v-else>
		        	<div slot="content">
				        <div>
				        	<ul class="school-list">
				        		<li v-for="item in examination_college" @click="goBm(item)">
				        			<div class="img-con-wrap">
					        			<div class="img-wrap">
					        				<img v-bind:src="item.logo" alt="" class="sch-logo">
					        			</div>
					        			<h3 class="sch-name">{{item.xueXiaoMC}}</h3>
				        			</div>
				        		</li>
				        	</ul>
				        </div>
			        </div>
		        </pulldown>
			<!-- </div> -->
		</div>
		<!-- <router-link :to="{path:'/selectProf'}">回去</router-link> -->
		<!-- <keep-alive> -->
			<router-view></router-view>
		<!-- </keep-alive> -->
	</div>
</template>
<script>
import Vue from 'vue';
import { Toast,Lazyload } from 'mint-ui';
import VueBus from 'vue-bus';
import pulldown from "../../public/loadmore";
import Loading from '../../public/Loading'
Vue.use(VueBus);
Vue.use(Lazyload);
	export default{
		data(){
			return{
				examination_college:[],
				load_flag:true
			}
		},
		mounted(){
			// console.log(this.$route.params.kaoDianID);
			var url="befexam,/api/m/auth/site/school/query.htm";
			var data={kaoDianID:this.$route.query.kaoDianID};
			ajaxMethod.doAjax(url, data, this.loadExamtion);
			this.$bus.on("pulldown", this.relaodData_123);
		},
		methods:{
			relaodData_123(){
				var that=this;
				var url="befexam,/api/m/auth/site/school/query.htm";
				var data={kaoDianID:this.$route.query.kaoDianID};
				var reLoad=function(d){
					that.examination_college=d.datas.list;
					// console.log(that.examination_college)
				}
				ajaxMethod.doAjax(url, data,reLoad);
			},
			loadExamtion(data){
				if(data.success){
					this.load_flag=false;
					this.examination_college=data.datas.list;
				}else{
					Toast({
						message: data.message,
						duration: 5000
					});
				}
				// console.log(this.examination_college)
			},
			goBm(item){
				// console.log(item)
				// if(){

				// }else{
				// 	this.$router.push({path:"/examinationPointcollege/selectProf",query:item})
				// }
				window.localStorage.removeItem("BMkaoDianID");
				window.localStorage.setItem("BMkaoDianID",this.$route.query.kaoDianID);
				var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	var datas={xueXiaoID:item.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	ajaxMethod.doAjax(url,datas,function(d){
	        		// 填过专业跳转到院校已选专业
	        		if(!d.datas.list.length>0){
	        			that.$router.push({path:"/examinationPointcollege/testCenterProf",query:item})
	        		}else{
	        			that.$router.push({path:"/examinationPointcollege/selectProf",query:item})
	        		}
	        	});
			}
		},
		components:{
			pulldown,
			Loading
		}
	}
</script>
<style scoped>
	.lf {
	    float: left;
	}

	.rf {
	    float: right;
	}

	.f-fixed:after {
	    content: '\200b';
	    display: block;
	    height: 0;
	    clear: both;
	}
	.examination-college{position:absolute;top:0rem;left:0;right:0;bottom:0;overflow: auto;background: #fff;}
	.examination-college .school-list{font-size:.2rem;}
	.examination-college .school-list li{border-bottom:1px solid #ddd;padding:.2rem;display:flex;align-items: center;}
	.examination-college .school-list li .img-wrap{width:.6rem;height:.6rem;}
	.examination-college .school-list li .sch-logo{max-width:100%;max-height:100%;}
	.examination-college .school-list li .sch-name{margin-left:.2rem;}
	.img-con-wrap{display:flex;align-items: center;}
</style>