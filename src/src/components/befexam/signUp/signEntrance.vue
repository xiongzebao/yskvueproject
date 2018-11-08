<template>
	<div>
		<diyHeader></diyHeader>
		<div class="content">
			<div class="search">
				<div class="search-wrap">
					<div class="ipt-wrap">
		            	<input type="text" placeholder="搜索院校" class="search-ipt" v-model="seachVal">
		            </div>
		            <div class="search-btn-diy" v-tap="{methods:searchSch_as}">
		            	搜索
		            </div>
	            </div>
	        </div>
	        <!-- <keep-alive> -->
	        	<router-view class="site-page"></router-view>
	        <!-- </keep-alive> -->
	        <Loading v-if="loading_flag"></Loading>
	        <div v-else class="sign-up">
	            <div class="choice-sch">
	                <div class="sch-lists">
	                    <ul class="sch-ul">
	                    	<li class="sch-list" @click="choiceSch({'typeFlag':3},-1)" :class="{curMenu:allC}">
	                    		<span>全部</span>
	                    	</li>
	                        <li v-for="(item,index) in selfData" @click="choiceSch(item,index)" class="sch-list" :class="{curMenu:item.isCurList}">
	                            <span> {{item.typeName}}</span>
	                        </li>
	                    </ul>
	                </div>
	                <div class="sch-del-filter">
	                	<div class="sch-del-fil">
	                        <div v-if="schools.length>0">
	                    		<ul class="filter-sch">
	                    		<!-- v-tap="{methods:choiceProf,filter_sch:filter_sch}" -->
	                    			<li v-for="filter_sch in schools" class="filter-sch-li" v-tap="{methods:choiceProf,filterSch:filter_sch}">
	                    				<div class="admin-del">
	                    					<div class="img-span">
	                    						<img v-lazy="filter_sch.logo">
	                    					</div>
	                    					<div class="sch-name">{{filter_sch.xueXiaoMC}}</div>
	                    					<span class="left-icon"></span>
	                    				</div>
	                    			</li>
	                    		</ul>
	                        </div>
	                        <div v-else >
	                            <img src="../../../../static/img/no_school.jpg" alt="" class="no-school">
	                        </div>
	                	</div>
	                </div>
	            </div>
	        </div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
	    Button,Toast,Indicator,MessageBox,Lazyload    
	} from 'mint-ui';
	// import {
	//    Toast,Indicator,MessageBox   
	// } from 'mint-ui';
	import Loading from '../../public/Loading'
	Vue.component(Button.name, Button);
	Vue.use(Lazyload);
	import diyHeader from "./diyHeader";
	export default{
		data(){
			return{
				seachVal:'',
				allC:true,
				selfData: [], // 左侧学校名称列表
				schools:[],   // 根据条件过滤出来显示在右侧供用户选择的学校
				nosch:false,
				loading_flag:true,//加载动画
			}
		},
		mounted(){
			var url = "befexam,/api/m/auth/college/query.htm";
			var datas = {};
			ajaxMethod.doAjax(url,datas,this.loadCollegeData);
		},
		methods:{
			// 加载学校
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
	            }else{
	            	this.loading_flag=false;
	            	Toast(data.message);
	            }
	        },
			// 搜索学校
	        searchSch_as(){
	            var that=this;
	            that.schools=[];
	            var reg=new RegExp(this.seachVal);
	            this.allSchool.forEach(function(value,index){
	                if(value.xueXiaoMC.match(reg)){
	                    that.schools.push(value)
	                }
	            })
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
	        /*
			*selectProf页面需要xueXiaoMC和xueXiaoID参数
			*testCenterProf页面需要
			*
			*
			*
	        */
	        choiceProf(filterSch){
	        	var that=this;
	        	var url="befexam,/api/m/auth/apply/query_prof.htm";
	        	var datas={xueXiaoID:filterSch.filterSch.xueXiaoID,"baoKaoBZList":[1,2,3]};
	        	var parmers={
	        		xueXiaoMC:filterSch.filterSch.xueXiaoMC,
	        		xueXiaoID:filterSch.filterSch.xueXiaoID
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
		components: {
			diyHeader:diyHeader,
			Loading:Loading
		}
	}
</script>
<style scoped>
	.content{padding-top:.8rem;}
	.search{position:fixed;top:.8rem;background: #F9F9F9;height:.8rem;width:100%;padding:4px 0;box-sizing: border-box;}
	.search .search-ipt{border:1px solid #44CEFC;height:.6rem;font-size:.25rem;text-align:center;width:100%;border-radius: .35rem;box-sizing: border-box;}
	.search-btn-diy{font-size:.25rem;color:#fff;background:#26a2ff;padding:.1rem .2rem;border-radius:.1rem;}
	.sign-up {
		position:absolute;
		top:1.6rem;
		bottom:0;
		width:100%;
	}
	.sign-up .choice-sch{height:100%;}
	.sign-up .choice-sch .sch-lists{width:1.2rem;position:absolute;top:0;bottom:0;overflow-y: auto;}
	.sign-up .choice-sch .sch-lists .sch-ul{text-align:center;}
	.sign-up .choice-sch .sch-lists .sch-ul .curMenu{background: #CCCCCC;}
	.sign-up .choice-sch .sch-lists .sch-ul{text-align:center;}
	.sign-up .choice-sch .sch-lists .sch-ul .curMenu{background: #CCCCCC;}
	.sch-ul .cur-li{background:#ccc;}
	.sch-list {
	    font-size: .25rem;
	    line-height:.35rem;
	    padding:.15rem 0.01rem;
	    /*letter-spacing: .015rem;*/
	}
	.sch-del-filter{width:calc(100% - 1.2rem);position:absolute;top:0;bottom:0;left:1.2rem;overflow-y: auto;background: #fff;}
	.sch-del-filter .sch-del-fil{border-top:1px solid #ddd;border-left:1px solid #ddd;height:100%;}
	.sch-del-filter .sch-del-fil>div{height:100%;}
	.sch-del-filter .sch-del-fil .no-sch{background: #fff;font-size:.3rem;text-align:center;padding:.35rem;margin-top:.3rem;}
	.sch-del-filter .sch-del-fil .filter-sch{height:100%;overflow-y:auto;}
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li{font-size:.3rem;padding: .2rem 0 .2rem .1rem;border-bottom:1px solid #ddd;}
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li img{max-width:.6rem;max-height:.6rem;}
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del{display:flex;align-items: center;padding-right:.35rem;position:relative;}
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del .left-icon{position:absolute;top:50%;right:.13rem;width:.15rem;height:.15rem;transform:translateY(-50%) rotate(135deg);border-top:2px solid #42cefc;border-left:2px solid #42cefc; }
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del .img-span{width:.6rem;height:.6rem;margin-right:.15rem;}
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del .sch-name{word-break: break-all;display:flex;align-items: center;width:calc(100% - 0.58rem);}
	.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del .img-span img{max-width:100%;max-height:100%;}
	.search-wrap{width:100%;height:100%;display: flex;align-items: center;justify-content: center;}
	.ipt-wrap{margin-right:5px;width:60%;}
	.no-school{max-width:100%;}
</style>