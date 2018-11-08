<template>
		<li class="scholl-list clear" v-show="itemShow" v-tap="{methods:hadleTuch}"  :id="rootId">
			<div class="scholl-name">
				<h2>{{item.xueXiaoMC}}</h2>
				<i class="iconfont icon-xiayiye" v-tap='{methods:hadleTuch}'></i>
				<template>
					<template v-if="item.baoKaoBZ==1||item.baoKaoBZ==2">
						<span class="state">（待交费）</span>
					</template>
					<template v-if="item.baoKaoBZ==3">
						<template v-if="item.confirm">
							<template v-if="item.print">
								<template v-if="item.complete">
									<span class="state">（已完成）</span>
								</template>
								<template v-else>
									<span class="state">（未完成）</span>
								</template>
							</template>
							<template v-else>
								<span class="state">（待打印）</span>
							</template>
						</template>
						<template v-else>
							<template v-if="item.queRenFS==null||item.queRenFS==0">
								<template v-if="item.canConfirm!=null&&item.canConfirm==true">
									<span class="state">（待确认）</span>
								</template>
							</template>
						</template>
						<template v-else-if="item.queRenFS==3||item.queRenFS==4">
							<span class="state">（确认中）</span>
						</template>
					</template>
					<template v-else-if="item.baoKaoBZ==4">
						<span class="state">（已关闭）</span>
					</template>
					<template v-else-if="item.baoKaoBZ==5">
						<span class="state">（已作废）</span>
					</template>
				</template>
			</div>
			<div class="scholl-details clear">
				<div class="scholl-logo">
					<div class="imgdiv" 
						:style="{backgroundImage:'url('+item.logo+')'}">
					</div>
				</div>
				<div class="Register-details">
					<template v-show="item.confirm">
						<template v-if="item.print">
							<div class="bgImg" v-if="item.complete" :style="{backgroundImage:'url(../../static/img/bgStatus.png)'}">
								
							</div>	
						</template>
					</template>
					<div class="examLayout clear">
						<p>考试：</p>
						<span>{{item.kaoShiMC}}</span>
					</div>
					<div class="examLayout clear">
						<p>考试专业：</p>
						<span>{{item.zhuanYeMC}}</span>
					</div>
					<!--<p>{{item.zhuanYeMC}}</p>-->
					<div v-show="item.profVol"  class="Desire-major clear">
						<p>志愿专业：</p>
						<div class="major">
							<span v-for="(a,key,index) in item.profVol">
								{{key+1+"."}}			
								{{a.profName}}
							</span>
						</div>
					</div>
					<div class="examLayout clear">
						<p>考点：</p>
						<span>{{item.kaoDianMC}}</span>
					</div>
					<div class="examLayout clear">
						<p>考试日期：</p>
						<span>{{item.kaoShiRQSM}}</span>
					</div>
					<template v-if="item.baoKaoBZ==1||item.baoKaoBZ==2">
						<p v-if="item.baoMingFei" class="date feeView">
							报名费：￥{{item.baoMingFei}}
						</p>
					</template>
				</div>
			</div>
			
			<div class="btn clear">
				<div class="handleBtn">
					<template v-if="item.baoKaoBZ==1">
						<template v-if="item.zhiYuanShu>0">
							<template v-if="item.ymvol==true">
								<mt-button class="majorBtn" size="small" 
									v-tap.stop="{methods:InfoMajor}">
									专业兼报
								</mt-button>
							</template>
							<template v-else-if="item.ymvol==false">
								<template v-if="item.profVol!=null">
									<mt-button class="majorBtn" size="small" 
										v-tap.stop="{methods:InfoMajor}">
										志愿专业 
									</mt-button>
								</template>
								<template v-else-if="item.profVol==null">
									<mt-button class="majorBtn" size="small" 
									v-tap.stop="{methods:InfoMajor}">
										志愿专业
									</mt-button>
								</template>
							</template>
						</template>
					</template>
					<template v-if="item.baoKaoBZ==1">
					<mt-button class="operateBtn" size="small" v-tap.stop="{methods:Topay}">
						去支付
					</mt-button>
					</template>
					<template v-else-if="item.baoKaoBZ==2">
					<mt-button class="operateBtn" size="small" v-tap.stop="{methods:pay}">
						支付
					</mt-button>
					</template>
					<template v-if="item.baoKaoBZ==3">
						<template v-if="item.confirm==false">
							<template v-if="item.queRenFS==null||item.queRenFS==0">
								<template v-if="item.canConfirm!=null&&item.canConfirm==true">
									<template v-if="item.fatherSchedule==true">
										<mt-button class="operateBtn"
											size="small" 											v-tap.stop="{methods:Choicetime}">
											选择时间
										</mt-button>
									</template>
									<template v-else-if="item.fatherSchedule==false">
										<mt-button size="small" 											class="operateBtn"
											v-tap.stop="{methods:Apply}">
											确认报考
										</mt-button>
									</template>
								</template>
							</template>
						</template>
					</template>
				</div>
			</div>
			<span class="showReminder" v-show='showReminder'>
				温馨提示：准考证请用电脑登录www.artstudent.cn打印。
			</span>
			<template v-if="item.baoKaoBZ==3">
				<template v-if="item.confirm">
				<template v-if="item.print==true">
				<template v-if="item.complete==false">
				<span class="reminder">
					温馨提示：准考证请用电脑登录www.artstudent.cn打印。
				</span>
				</template>
				</template>
				<template v-else-if="item.print==false">
					<span class="reminder">
						温馨提示：准考证请用电脑登录www.artstudent.cn打印。
					</span>
				</template>
				</template>
			</template>
		</li>
</template>

<script>
	import Vue from 'vue'
	import {Toast, MessageBox,Popup } from 'mint-ui';
	import VolunterMajor from './volunterMajor.vue'
	import VueBus from 'vue-bus';
	
	Vue.use(VueBus);
	
	export default {
		name:'Collegelist',
		props:['_item','index','profVol'],
		computed:{
		    rootId(){
		      return 'Record'+this.index;
		    }
	   	},
		components:{
			VolunterMajor
		},
		data(){
			return {
				list:'',
				value:'',
				major:'',
				itemShow:true,
				showReminder:false,//显示温馨提示
				profHed:false,
				popupVisblei:false,
				disabled:'',
				dataslist:'',
				options :[]
			}
		},
		created(){
			this.item = this._item;
		},
		mounted(){
			this.$bus.on("volunterMajorEvent"+this.index,this.onVolunterMajorBack);
			var BaoKaoBZ = this.item.baoKaoBZ;
			
			/*BaoKaoBZ==4（已关闭）时整项不显示*/
			if(BaoKaoBZ==4){
				this.itemShow = false;
			}
		},
		methods:{
			hadleTuch(){
				var that = this;
				var BaoKaoBZ = this.item.baoKaoBZ;
				if(BaoKaoBZ=='5'){
					Toast({
					  message: '该报考记录已作废',
					  position: 'center',
					  duration: 2000
					});
				}else{
					this.$router.push({path:'/registerDetails',query:{idx:that.index}})
				}
			},
			/*志愿专业按钮*/
			InfoMajor(){
				var p ={};
				p.item = this.item;
				p.index = this.index;
				this.$bus.emit("CollegelistEvent",p);
			},
			onVolunterMajorBack(meg){
				this.item.profVol = meg;
			},
			/*去支付*/
			Topay(){
				let obj = {
					xueXiaoID:this.item.xueXiaoID,
					xueXiaoMC:this.item.xueXiaoMC
				}
				this.$router.push({path:'/signEntrance/selectProf',query:obj});
			},
			/*支付*/
			pay(){
				MessageBox({
					title:'温馨提示',
					message:'所报该专业已经生成订单，请到交费记录中支付！',
					showCancelButton: true
				}).then(action => {
					if(action=='confirm'){
						yksapp.goPageWithParams('myPay',null);
					}
				});
			},
			Choicetime(){//选择时间
				this.$bus.emit("showTimepopup",this.index);
			},
			Apply(){//确认报考
				var that = this;
				var id = "#"+that.rootId;
		        var  $root =  $(id);
		       	var confirmBtn =  $root.find('.operateBtn');
		       	var fatherSchedule = that.item.fatherSchedule;
		       	var hedState = $root.find('.state');
		       	var tipView = $root.find('.showReminder');//温馨提示
		       
		       	if(fatherSchedule){
		       		this.Choicetime();
		       	}else{
		       		var tip = '确定参加 '+that.item.kaoDianMC+' '+that.item.zhuanYeMC+' 考试吗?';
		       		MessageBox({
						title:'温馨提示',
						message:tip,
						showCancelButton: true
						}).then(action => {
							if(action=='confirm'){
								if(confirmBtn.attr("isclick")==1){
				                    return;
				                }
								confirmBtn.css("background-color","#aaa");
				                confirmBtn.attr("disabled","disabled");
				                confirmBtn.attr("isclick","1");
				                confirmBtn.text('确认中');
				                
								//提交在线确认 
						        var lineUrl = "befexam,/api/m/auth/apply/commit_online_confirm.htm";
				                var d = {'baoKaoIDs':[that.item.baoKaoID]};
							ajaxMethod.doAjax(lineUrl,d,function(d){
								if(d.success){
			                        var timer =   setInterval(function(){
		                            var queRenFS  = that.item.queRenFS;
		                            if(queRenFS!==1&&queRenFS!==2){
		                            	/*在线确认查询*/
		                            	var baoKaoID = [that.item.baoKaoID];
		                            	var qUrl = "befexam,/api/m/auth/apply/query_online_confirm.htm";
		                            	var data = {
		                            		"baoKaoBZ":3,
		                            		"baoKaoIDs":baoKaoID
		                            	}
		                            	ajaxMethod.doAjax(qUrl,data,function(data){
	                               			that.item = data.datas.list[0];//只请求当前项
	                            		});
		                            }else{
		                            	hedState.text('（待打印）');
		                            	that.showReminder = true;
		                            	tipView.remove();
		                            	confirmBtn.remove();
		                              	clearInterval(timer);
		                            }
		                          },1000); 
			                    }else{
			                    	confirmBtn.css("background-color","#ff9f37");
				                    confirmBtn.removeAttr("disabled");
				                    confirmBtn.attr("isclick","0");
				                    confirmBtn.text("确认报考");
			                      	if(d.code=="312"){
										MessageBox({
											title:'温馨提示',
											message:d.message,
											showCancelButton: true
										}).then(action => {
											if(action=='confirm'){
												yksapp.goPageWithParams('rzIndex',null);
											}
										});
			                      	}else{
			                      		MessageBox({
				                           title: '温馨提示',
				                           message: d.message,
				                           showCancelButton: false
				                        });
			                      	}
								}
							},function(){//请求完成
		                     
		                	})
						}
					});
				}
			}
		}
	}
</script>

<style>
#registRecord .scholl-list{
	background: #fff;
	border-radius: 2%;
	padding: 0 0.2rem;
	margin-bottom: 0.2rem;
}
.scholl-list .scholl-name{
	height: 0.56rem;
	padding-top: 0.2rem;
	border-bottom: 1px solid #f8f8f8;
	position: relative;
}
.scholl-list .scholl-name h2{
	width: 3.7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: normal;
	font-size: 0.29rem;
	float: left;
	padding-left: 0.12rem;
}
.scholl-list .scholl-name .icon-xiayiye{
	color: #42cefc;
	float: right;
	padding-top: 0.06rem;
	padding-right: 0.1rem;
}
.scholl-list .scholl-name span{
	position: absolute;
	top: 0.24rem;
    right: 0.6rem;
	font-size: 0.25rem;
	color: red;
}
.scholl-details{
	padding-top: 0.18rem;
}
.scholl-details .scholl-logo{
   	float: left;
	padding: 0.3rem 0.26rem 0 0.16rem;
}
.scholl-details .scholl-logo .imgdiv{
	width: 1.02rem;
	height: 1.02rem;
	background-size: 100% 100%;
	background-repeat:no-repeat;
}
.scholl-details .Register-details{
	float: left;
	/*width: 3.6rem;*/
	position: relative;
}
.scholl-details .Register-details .bgImg{
	position: absolute;
	top: 0;
    right: 0;
	width: 2.75rem;
    height: 1.98rem;
    background-size: 70% 70%;
    background-repeat: no-repeat;
}
.scholl-details .Register-details .examLayout{
	font-size: 0.25rem;
	line-height: 0.42rem;
}
.scholl-details .Register-details .examLayout p{
	float: left;
}
.scholl-details .Register-details .examLayout span{
	float: left;
	width: 2.3rem;
	font-size: 0.25rem;
}
.scholl-details .Register-details .date{
	padding-bottom: 0.06rem;
	font-size: 0.25rem;
	color: red;
}
.scholl-details .Register-details .Desire-major{
	font-size: 0.14rem;
	padding:0.08rem 0;
}
.scholl-details .Register-details .Desire-major p{
	float: left;
	width: 1.3rem;
	font-size: 0.25rem;
}
.scholl-details .Register-details .Desire-major .major{
	float: left;
}
.scholl-details .Register-details .Desire-major .major span{
	display: block;
	width: 2.3rem;
	color: #999999;
	line-height: 0.36rem;
    font-size: 0.25rem;
}
.scholl-list .btn{
	padding-bottom: 0.16rem;
}
/*志愿专业按钮样式修改*/
.scholl-list .btn .majorBtn{
	height: 0.56rem;
    font-size: 0.25rem;
    color:#fff;
    padding: 0 0.2rem;
    margin-right: 0.26rem;
	background-color: #42cefc;
}
.scholl .scholl-list .handleBtn{
	float: right;
	font-size: 0.3rem;
	padding-bottom: 0.06rem;
}
/*去支付、支付、选择时间、确认报考按钮样式修改*/
.scholl .scholl-list .handleBtn .operateBtn{
	height: 0.56rem;
    font-size: 0.25rem;
	color:#fff;
	padding: 0 0.2rem;
	margin-right: 0.1rem;
	background-color: #ff9f37;
}
/*确认中样式修改*/
/*.scholl .scholl-list .handleBtn .Inconfirm{
	background-color:#aaa;
}*/
.scholl .scholl-list .reminder,.showReminder{
	font-size: 0.18rem;
	display: block;
	color: #ffa602;	
	padding-bottom: 0.2rem;
}
</style>