<template>
	<div id="registerDetails">
		<mt-header fixed title="我的报考详情">
		  <router-link to="/registerRecord" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<template v-if='item.baoKaoBZ==1'>
			<i v-tap="{methods:delprof}" class="delprof"></i>
		</template>
		<div class="content-wrap" :id="root" v-if='item'>
			<div class="college">
				<div class="details">
					<div class="scholl-name">
						<h2>{{item.xueXiaoMC}}</h2>
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
							<div class="imgdiv" :style="{backgroundImage:'url('+item.logo+')'}">
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
				</div>
				<template v-if="item.baoKaoBZ==3">
				<template v-if="item.confirm">
				<template v-if="item.print">
				<template v-if="item.complete==false">
				<span class="reminder">
					温馨提示：准考证请用电脑登录www.artstudent.cn打印。
				</span>
				</template>
				</template>
				<template v-else>
					<span class="reminder">
						温馨提示：准考证请用电脑登录www.artstudent.cn打印。
					</span>
				</template>
				</template>
				</template>
				<div v-for="dateMark in getProf" class="flow clear">
					<div class="dealTime">
						{{dateMark.dealTime}}	
					</div>
					<div class="remark">
						<i class="iconfont icon-xian"></i>
						<ul>
							<li class="remark-list">
								<template v-if="dateMark.status==2">
									<i class="iconfont icon-blue-dot"></i>
								</template>
								<template v-else-if="dateMark.status==1">
									<i class="iconfont icon-blue-dot icon-red-dot"></i>
								</template>
								
								<p class="title">{{dateMark.title}}</p>
								<template v-if="dateMark.status==2">
									<span class="point-gray">{{dateMark.remark}}</span>
								</template>
								<template v-if="dateMark.status==1">
									<span class="point-red">{{dateMark.remark}}</span>
								</template>
								<i class="iconfont icon-xian line-down"></i>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="handleBtn">
				<template v-if="item.baoKaoBZ==1">
					<mt-button class="operateBtn"  type="primary" size="large" v-tap.stop="{methods:Topay}">
						去支付
					</mt-button>
				</template>
				<template v-if="item.baoKaoBZ==2">
					<mt-button class="operateBtn"  type="primary" size="large" v-tap.stop="{methods:pay}">
						支付
					</mt-button>
				</template>
				<template v-if="item.baoKaoBZ==3">
					<template v-if="item.confirm==false">
					<template v-if="item.queRenFS==null||item.queRenFS==0">
					<template v-if="item.canConfirm!=null&&item.canConfirm==true">
					<template v-if="item.fatherSchedule==true">
						<mt-button class="ChooseRiCheng operateBtn" type="primary" size="large" v-tap.stop="{methods:Choicetime}">
							选择时间
						</mt-button>
					<!--弹出层-->
					<template v-for="data in dataslist">
						<mt-popup v-model="popupVisblei">
							<div class="confirmTime">
								选择确认时间
							</div>
							<mt-radio v-model="dateVal" :options="chooseDate">
								
							</mt-radio>
						    <div class="btnBg">
							    <mt-button class="confirm" type="primary" size="normal" v-tap.stop="{methods:confirmMajor}">
									确定
								</mt-button>
							</div>
						</mt-popup>
					</template>
					</template>
					
					<template v-else-if="item.fatherSchedule==false">
						<mt-button type="primary" size="large" class="confirmBtn operateBtn"
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
		<Loading v-show="loading"></Loading>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import Loading from '../public/Loading.vue';
export default {
	name:'registerDetails',
	computed:{
	    root(){
	     	return 'registerDetails'+this.index;
	    }
	},
	data(){
		return {
			getProf:'',//获取报考进程
			item:'',
			index:'',//数据索引
			dateVal:'',
			dataslist:'',
			riChengDate:'',//选中的日程
			popupVisblei:false,
			loading:true,
			chooseDate :[],//选择时间确认时间
			profName:[]
		}
	},
	components:{
		Loading:Loading
	},
	created(){
		//报考记录页面传过来的数据
		this.index=this.$route.query.idx;
	},
	mounted(){
		this.queryProf();
	},
	watch:{
		dateVal:function(n,o){
			this.riChengDate=n.split(',')[0];
		}
	},
	methods:{
		queryProf(){
			var that =this;
			var d={
			"includeProfVol":true
			}
			/*个人报考专业查询*/
			ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_prof.htm",d,function(d){
				that.item = d.datas.list[that.index];
				if(d.success){
					if(d.datas.list.length>0){
						that.course();
					}
				}
			},function(){
				that.loading=false;
			})
		},
		course(){
			let that = this;
		 	/*我的报考详情接口*/
			let dUrl = "befexam,/api/m/auth/apply/get_prof_bef_process.htm";
			let d={
				"bId":this.item.baoKaoID//报考ID，不能为空
			}
			ajaxMethod.doAjax(dUrl,d,function(d){
				console.log(d)
				that.getProf=d.datas.list;
			})
		},
		megsBox(meg){
			MessageBox({
			  title: '温馨提示',
			  message: meg,
			  showCancelButton: true
			})
		},
		delprof(){//右上角删除当前订单功能
			let that = this;
			MessageBox({
				title:'温馨提示',
				message:'确定要删除此项吗？',
				showCancelButton: true
			}).then(action => {
				if(action=='confirm'){
					let delprof = 'befexam,/api/m/auth/apply/delete_prof.htm';
					let del={
						"baoKaoID":that.item.baoKaoID ,
						"xueXiaoID":that.item.xueXiaoID
					} 
					ajaxMethod.doAjax(delprof,del,function(d){
						if(d.success){
							that.$router.push('registerRecord');
						}
					})
				}
			});
			
		},
		/*去支付*/
		Topay(){
			let obj = {
				xuexiaoID:this.item.xueXiaoID,
				xuexiaoMC:this.item.xueXiaoMC
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
					this.$router.push('Payrecord');
				}
			});
		},
		Choicetime(){//选择时间
			var that = this;
			this.popupVisblei=true;
			that.chooseDate = [];
			var subUrl = "befexam,/api/m/auth/apply/query_sub_schedule.htm";
			var d={
				"riChengID":this.item.riChengID
			}
			ajaxMethod.doAjax(subUrl,d,function(d){
				if(d.success){
					if(d.datas.list.length>0){
						that.dataslist=d.datas.list;
						for(var i=0; i<that.dataslist.length; i++){
							var riChengID = ''+that.dataslist[i].profName+','+that.dataslist[i].riChengID;
							that.chooseDate.push({
								label:that.dataslist[i].profName,
								value:riChengID
							})
						}
					}
				}else{
					that.megsBox(d.message);
				}
			})
		},
		confirmMajor(){//确定专业时间
			let that = this;
			var id = "#"+this.root;
			var $root =  $(id);
			var ChooseRiCheng = $root.find('.ChooseRiCheng');
			var examDate = $root.find('.Register-details p');
			this.popupVisblei=false;
			var riChengID = that.dateVal.split(',')[1];
			var saveUrl = "befexam,/api/m/auth/apply/save_exam_time.htm";
			var d={
				"baoKaoID":this.item.baoKaoID,
				"riChengID":riChengID
			}
			ajaxMethod.doAjax(saveUrl,d,function(d){
				if(d.success){
					that.queryProf();
				}else{
					if(d.code=='312'){
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
						that.megsBox(d.message);
					}
				}
			})
		},
		Apply(){//确认报考
			var that = this;
			var id = "#"+that.root;
	        var $root =  $(id);
	       	var confirmBtn =  $root.find('.confirmBtn');
	       	var fatherSchedule = that.item.fatherSchedule;
	       	if(!(fatherSchedule)){
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
		                var d = {'baoKaoIDs':[that.item.baoKaoID]};
		                var lineUrl = "befexam,/api/m/auth/apply/commit_online_confirm.htm";
						ajaxMethod.doAjax(lineUrl,d,function(d){
							if(d.success==true){
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
                               			that.course();//更新数据
                            		 });
	                            }else{
	                            	that.queryProf();
	                              	clearInterval(timer);
	                            }
	                          },1000); 
		                    }else{
		                    	confirmBtn.css("background-color","#26a2ff");
			                    confirmBtn.removeAttr("disabled");
			                    confirmBtn.attr("isclick","0");
			                    confirmBtn.text('确认报考');
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
		                      		that.megsBox(d.message);
		                      	}
							}
						})
					}
	       		})
			}
		}
	}
}
</script>

<style scoped>
#registerDetails{
	width: 100%;
	height: 100%;
}
#registerDetails .delprof{
	position: fixed;
	top: 0.13rem;
    right: 0.16rem;
    z-index: 2222;
    width: 0.5rem;
    height: 0.5rem;
    background: url(../../../static/img/ic_del_white.png);
    background-size: 100% 100%;
}

#registerDetails .content-wrap{
    height: 90%;
	margin-top: 0.81rem;
	padding: 0.16rem 0.16rem 0;
	overflow-y: scroll;
}
#registerDetails .college{
	padding-bottom: 1.6rem;
	background: #fff;
}
#registerDetails .college .details{
	padding: 0 0.2rem;
}
#registerDetails .college .details .scholl-name{
	height: 0.56rem;
	padding-top: 0.2rem;
	border-bottom: 1px solid #f8f8f8;
	position: relative;
}
#registerDetails .college .details .scholl-name h2{
	font-size: 0.29rem;
	font-weight: 100;
}
#registerDetails .college .details .scholl-name span{
	position: absolute;
	top: 0.24rem;
    right: 0.48rem;
	font-size: 0.25rem;
	color: red;
}
#registerDetails .scholl-details{
	padding-top: 0.18rem;
}
#registerDetails  .scholl-details .scholl-logo{
   	float: left;
	padding: 0.3rem 0.26rem 0 0.16rem;
}
#registerDetails .scholl-details .scholl-logo .imgdiv{
	width: 1.02rem;
	height: 1.02rem;
	background-size: 100% 100%;
	background-repeat:no-repeat;
}
#registerDetails .Register-details{
	float: left;
	width: 4.1rem;
}
#registerDetails .Register-details p{
	font-size: 0.25rem;
	line-height: 0.46rem;
}
#registerDetails .Register-details .bgImg{
	position: absolute;
	top: 1rem;
    right: 0.6rem;
	width: 2.75rem;
    height: 1.98rem;
    background-size: 70% 70%;
    background-repeat: no-repeat;
}
#registerDetails .Register-details .examLayout{
	font-size: 0.25rem;
	line-height: 0.42rem;
}
#registerDetails .Register-details .examLayout p{
	float: left;
}
#registerDetails .Register-details .examLayout span{
	float: left;
	width: 2.3rem;
	font-size: 0.25rem;
}
#registerDetails .Register-details .Desire-major{
	font-size: 0.14rem;
	padding:0.08rem 0;
}
#registerDetails .Register-details .Desire-major p{
	float: left;
	width: 1.3rem;
}
#registerDetails .Register-details .Desire-major .major{
	float: left;
}
#registerDetails .Register-details .Desire-major .major span{
	display: block;
	color: #999999;
	line-height: 0.36rem;
    font-size: 0.25rem;
}
#registerDetails .Register-details .date{
	color: red;
}
#registerDetails .college .status{
	display: block;
	width: 100%;
	height: 0.68rem;
	font-size: 0.22rem;
	line-height: 0.68rem;
	background: #fffdd2;
}
#registerDetails .college .reminder{
	display: block;
	height: 0.66rem;
	padding-left: 0.14rem;
	font-size: 0.18rem;
	color:#9d9d9c;
	line-height: 0.67rem;
	background: rgba(255, 250, 149, 0.85);
}
#registerDetails .college .flow{
	width: 100%;
	height: 1.18rem;
}
#registerDetails .college .flow .dealTime{
	float: left;
	width: 1.26rem;
	text-align: center;
	font-size: 0.22rem;
	color: #a7a7a7;
	margin-top: 0.44rem;
}
#registerDetails .college .flow .remark{
	width: 4rem;
	height: 100%;
	float: left;
	overflow: hidden;
	position: relative;
}
#registerDetails .flow .remark .icon-xian{
	position: absolute;
	top: -0.5rem;
	left: -0.1rem;
	font-size: 0.6rem;
	color: #f6f6f6;
}
#registerDetails .flow .remark .remark-list{
	font-size: 0.18rem;
}
#registerDetails .flow .remark .remark-list .icon-blue-dot{
	position: absolute;
	top: 0.06rem;
	left: -0.09rem;
	font-size: 0.56rem;
	color:#1ca7f8;
}
#registerDetails .flow .remark .remark-list .icon-red-dot{
	color: red;
	font-size: 0.66rem;
	position: absolute;
	top: 0.02rem;
	left: -0.13rem;
}
#registerDetails .flow .remark .remark-list .line-down{
	position: absolute;
	top: 0.5rem;
	left: -0.2rem;
	color: #f6f6f6;
	font-size: 0.8rem;
}
#registerDetails .flow .remark .remark-list .title{
	margin-left: 0.5rem;
    margin-top: 0.15rem;
    font-size: 0.26rem;
    font-weight: 600;
}
#registerDetails .flow .remark .remark-list .point-gray{
	font-size: 0.24rem;
	color: #9a9a9a;
	margin-left: 0.42rem;
	margin-top: 0.1rem;
	display: block;
}
#registerDetails .flow .remark .remark-list .point-red{
	font-size: 0.22rem;
	color: red;
	margin-left: 0.42rem;
	margin-top: 0.1rem;
	display: block;
}
/*popup样式更改*/
#registerDetails  .mint-popup{
	width: 5rem;
}
/*popup里面按钮样式更改*/
#registerDetails .btnBg{
    height: 0.9rem;
    position: relative;
    padding-top: 0.16rem;
    background: #eee;
}
#registerDetails .btnBg .confirm{
	width: 4.4rem;
	height:0.76rem;
    position: absolute;
    bottom: 0.16rem;
    left: 0.26rem;
}
#registerDetails .confirmTime{
	padding: 0.22rem 0;
    text-align: center;
    font-size: 0.32rem;
    margin: 0;
    background: #eee;
}
/*按钮外围样式*/
#registerDetails .handleBtn{
	position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
	background: #f4f4f4;
	z-index: 999;
}
/*底部按钮样式*/
#registerDetails .handleBtn .mint-button--large{
	width: 5.8rem;
    height: 0.82rem;
    font-size: 0.3rem;
    margin: 0.24rem auto;
}
</style>













































