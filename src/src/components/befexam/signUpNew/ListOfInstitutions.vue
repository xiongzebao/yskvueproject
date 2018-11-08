<template>
	<div class="testCenter">
		<mt-header fixed title="院校报名">
		  <router-link to="/signUpInfo" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<Search></Search>
		<div class="sd">
			<div class="seeTestCenter lineHeight">
				<span>查看院校列表 </span>
				<i class="iconfont icon-xiangxiajiantou"></i>
			</div>
		</div>
		<div class="kaodianList">
			<!-- 所有考点 -->
			<div class="kaodian_mc">
				<ul>
					<li class="sch-list" @click="choiceSch({'typeFlag':3},-1)" :class="{curMenu:allC}">
                		<span>全部</span>
                	</li>
                    <li v-for="(item,index) in selfData" @click="choiceSch(item,index)" class="sch-list" :class="{curMenu:item.isCurList}">
                        <span> {{item.typeName}}</span>
                    </li>
				</ul>
			</div>
			<!-- 对应考点的院校 -->
			<div class="kd-xuexiao">
				<div v-if="schools.length>0">
	        		<ul class="filter-sch">
	        			<li v-for="filter_sch in schools" class="filter-sch-li" v-tap="{methods:choiceProf,filterSch:filter_sch}">
	        				<div class="admin-del">
	        					<div class="img-span">
	        						<img v-bind:src="filter_sch.logo" alt="">
	        					</div>
	        					<div class="sch-name">{{filter_sch.xueXiaoMC}}</div>
	        					<!-- <span class="left-icon"></span> -->
	        				</div>
	        			</li>
	        		</ul>
	            </div>
	            <div v-else >
	                <img src="../../../../static/img/no_school.jpg" alt="" class="no-school">
	            </div>
			</div>
		</div>
		<div class="seeAcademy lineHeight" v-tap="{methods:gotoKDL}">
			 查看报名考点
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import Search from './Search';
	import { Button,Toast,Indicator,MessageBox,Lazyload } from 'mint-ui';
	Vue.component(Button.name, Button);
	Vue.use(Lazyload);
	export default {
		name:'testCenter',
		data(){
			return {
				seachVal:'',
				allC:true,
				selfData: [], // 左侧学校名称列表
				schools:[],   // 根据条件过滤出来显示在右侧供用户选择的学校
				nosch:false,
				loading_flag:true,//加载动画
			}
		},
		components:{
			Search
		},
		mounted(){
			var url="befexam,/api/m/auth/college/query.htm";
			var data={};
			ajaxMethod.doAjax(url,data,this.loadCollegeData);
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
			loadCollegeData(data) {
	            var that = this;
	            var res = [];
	            var res_2 = [];
	            var obj = {};
	            var obj_2 = {};
	            // if(!!data.datas.obj.typeList){
	            // 	// alert(!!data.datas.obj.typeList)
	            // 	this.loading_flag=false;
	            // }
	            if(data.success){
	            	this.loading_flag=false;
		            data.datas.obj.typeList.forEach(function(value, index) {
		                res.push(value.typeName)
		                res_2.push({
		                    'typeName': value.typeName,
		                    'typeId': value.typeId,
		                    "typeFlag": 0 //typeFlag为0的话是通过 value.typeId 
		                        //去 tcList 中找所有typeId一样的学校ID
		                })
		            })
		            data.datas.obj.collegeList.forEach(function(value, index) {
		                res.push(value.provChName)
		                res_2.push({
		                    'typeName': value.provChName, //省份名称
		                    'typeId': value.prov, // 学校ID
		                    "typeFlag": 1 //typeFlag为1的话是通过 value.prov 去collegeList学校过滤
		                })
		            });
		            for (var uniq = 0; uniq < res_2.length; uniq++) {
		                if (res_2[uniq].typeName == '' || res_2[uniq].typeName == null || res_2[uniq].typeName == "-") {
		                    res_2.splice(uniq, 1);
		                }
		                if (!obj_2[res_2[uniq].typeName]) {
		                    this.selfData.push(res_2[uniq]);
		                    obj_2[res_2[uniq].typeName] = 1;
		                    this.selfData.forEach(function(v,i){
		                        Vue.set(that.selfData[i],"isCurList",false);
		                    })
		                }
		            }
		            this.allSchool=data.datas.obj.collegeList;
		            this.stcList=data.datas.obj.stcList;
		            this.schools=this.allSchool;
		            console.log(this.selfData)
	            }else{
	            	this.loading_flag=false;
	            	Toast(data.message);
	            }
	        },
			gotoBm(p){
				// this.$router.push({path:"/"})
				var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	console.log(p.xueXiaoMC)
	        	var datas={xueXiaoID:p.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:p.xueXiaoMC,
	        		xueXiaoID:p.xueXiaoID
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
			choiceSch(data,index) {
	        	var that=this;
	            var choiceF = data.typeFlag;
	            var prov;//通过学校过滤的参数
	            var typeId;//通过类别过滤的参数
	            this.schools=[];
	            //左侧学校切换时选中效果
	            this.selfData.forEach(function(v,i){
	                if(index == i) {
	                    Vue.set(that.selfData[i],"isCurList",true);
	                    that.allC=false;
	                }else if(index==-1){
	                    that.allC=true;
	                    Vue.set(that.selfData[i],"isCurList",false);
	                }else{
	                    Vue.set(that.selfData[i],"isCurList",false);
	                }
	            })
	            if (choiceF == 0) {
	                // 通过类别过滤
	                typeId=data.typeId;
	                that.category_arr=[];
	                this.stcList.forEach(function(value,index){
	                	if(value.typeId==typeId){
	                		that.category_arr.push(value)
	                	}
	                })
	                // for(var i=0;i<that.category_arr.length;i++){
	                // 	console.log(that.category_arr[i].xueXiaoID)
	                // }
	                for(var p=0;p<this.allSchool.length;p++){
	                	for(var s=0;s<this.category_arr.length;s++){
	                		if(this.allSchool[p].xueXiaoID == this.category_arr[s].xueXiaoID){
	                			this.schools.push(this.allSchool[p])
	                		}
	                	}
	                }
	            } else if (choiceF == 1) {
	                // 通过学校过滤
	                prov=data.typeId;
	                this.allSchool.forEach(function(value,index){
	                	if(value.prov==prov){
	                		that.schools.push(value);
	                	}
	                })
	            } else if (choiceF == 2) {
	            	// 浏览历史和收藏，暂时没有代码
	            }else{
	            	// 点击全部的情况
	            	this.schools=this.allSchool;
	            }
	        },
	        choiceProf(filter_sch){
	        	var that=this;
	        	console.log(filter_sch)
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	console.log(filter_sch.xueXiaoMC)
	        	var datas={xueXiaoID:filter_sch.filterSch.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:filter_sch.filterSch.xueXiaoMC,
	        		xueXiaoID:filter_sch.filterSch.xueXiaoID
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
			gotoKDL(){
				this.$router.push({path:"/testCenter"})
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
    box-sizing: border-box;
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
    overflow: auto;
    border-right:1px solid #ddd;
    box-sizing: border-box;
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
.kaodianList{display:flex;overflow: auto;/* height:calc(100% - 3rem); */position:absolute;top:2.4rem;bottom:.6rem;flex-direction: row;}
.sd{border:1px solid transparent;box-sizing: border-box;}
.kaodian_mc{width:1.2rem;height:100%;overflow:auto;font-size:.25rem;}
.kaodian_mc li{text-align:center;padding:.15rem 0.01rem;}
.kd-xuexiao{font-size:0.2rem;height:100%;overflow: auto;width:calc(100% - 1.2rem);}
.kd-xuexiao li{font-size: .25rem;padding: .2rem 0 .2rem .1rem;border-bottom: 1px solid #ddd;}
.kaodian-detail{text-align:center;}
.curKoadian{background: #ddd;}
.admin-del{display:flex;align-items: center;justify-content: left;padding-right:.35rem;position:relative;}
.img-span{display:inline-block;width:.6rem;height:.6rem;position:relative;margin-right:.15rem;overflow: hidden;}
.img-span img{position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);max-width: .6rem;max-height: .6rem;}
.no-school{max-width:100%;}
.curMenu{background:#ccc;}
.sch-name{width:calc(100% - 0.75rem);}
</style>