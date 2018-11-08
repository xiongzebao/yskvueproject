<template>
	<div id="Servicesub">
		<mt-header fixed title="艺考助手">
            <router-link  to="/SubscribeCollege" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
        </mt-header>
        <div class="academySub clear">
          <template v-if='recordList'>
            <div class="academySub-school">
               <h3>您已订阅报名以下院校</h3>
                <div class="academySub-academyList">
                   <template v-for='item in recordList'>
                       <span>{{item.xueXiaoMC}}</span>
                   </template>
                </div>
           	</div>
          </template>			
		</div>
		<!--<div class="serviceShow">
			<p>您订阅的院校报名通知信息将在当天7点钟通知到您，请确认手机号码和通知类型</p>
		</div>-->
		<p class="receivMode">请选择您需要的提醒类型</p>
		<div class="choose">
			<mt-checklist
			  v-model="tipWays"
			  :options="remindDate">
			</mt-checklist>
		</div>
		<p class="receivMode">请确认接收提醒的号码</p>
		<!--<div class="inputVal">-->
			<template v-if="allowModifyTelephone">
				<input class="inputVal" type="tel" maxlength="11" placeholder="请输入您的手机号" v-model="telephone"/>
			</template>
			<template v-else>
				<input class="inputVal" type="tel" maxlength="11" placeholder="请输入您的手机号" disabled="disabled" v-model="telephone"/>
			</template>
			
			<mt-button v-tap="{methods:confirm}" class="confirm" type="primary" size="normal">
				确认
			</mt-button>
		<!--</div>-->
		<!--接收信息提示页面-->
        <mt-popup
         class='smspopup'
          v-model="smspopupVisible"
          :closeOnClickModal='clickClosed'
          position="middle">
          		<h2>温馨提示</h2>
               <p class="sendMegs countDown">服务订阅成功,小助已经发送了一条欢迎短信给您，请查收</p>
               <p class="countDown">{{timeDownCom}}</p>
               <div class="smspopup-footer">
                    <span class="noReceived" v-tap="{methods:NoreceiveMegs}">还没收到</span>
                    <span v-tap="{methods:receiveMegs}">我收到了</span>
               </div>
        </mt-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
    import { Indicator } from 'mint-ui';

	export default {
		name:'Servicesub',
		data(){
			return {
				telephone:'',//用户电话
				recordList:[],
				schoolList:[],
				schoolArr:[],
				tipWays:[1,2],/*提醒方式*/
				orderDatas:'',//订单接口数据
				timeDown:'',/*倒计时*/
				allowModifyTelephone:'',//是否发送欢迎短信
				smspopupVisible:false,/*短信接收提示*/
				clickClosed:false,/*禁用model层*/
				disabled:false,
                /*提醒数据*/
				remindDate:[
					{
					    label: '接收app提醒',
					    value: '1'
					},
					{
					    label: '接收短信提醒',
					    value: '2'
					},
					{
					    label: '接听电话提醒',
					    value: '3'
					}
				]
			}
		},
		computed:{
            timeDownCom(){
                return this.timeDown
            }
        },
		mounted(){
			var that = this;
			this.orderDatas = JSON.parse(this.$route.query.dataStr);
			this.telephone = this.orderDatas.telephone;
			this.allowModifyTelephone = this.orderDatas.allowModifyTelephone;
            this.schoolList=this.orderDatas.school;/*学校列表*/
            this.serviceCharge=this.orderDatas.serviceCharge;/*价格*/
            this.schoolIdlist=[];/*提交时学校的id*/
            for(let index in this.schoolList){ 
            	this.recordList.push(JSON.parse(this.schoolList[index]));
            	var schoolId = JSON.parse(this.schoolList[index]);
              	this.schoolIdlist[index]= schoolId.xueXiaoID;
            }; 
            //第一次支付弹出提示框
            var markId = yksapp.getValueByKey('toBack');
            if(markId!=1){
            	if(this.orderDatas.allowSendWelcomeSms){
	            	that.smspopupVisible=true;
	      			let allTime=60;
	                let innertimer=setInterval(function(){
	                    that.timeDown=allTime--+'秒';
	                    if(allTime<=0){
	                        innertimer && clearInterval(innertimer);
	                        that.timeDown = '请确认是否收到短信！';
	                    }
	                },1000);
	            };
            }
            //支付定义的方法
            window.payOff=function(ref){
            	alert(ref);
				if(ref=='true'){//支付成功处理
					if(that.orderDatas.allowSendWelcomeSms){
              			that.smspopupVisible=true;
              			let allTime=60;
                        let innertimer=setInterval(function(){
                            that.timeDown=allTime--+'秒';
                            if(allTime<=0){
                                innertimer && clearInterval(innertimer);
                                that.timeDown = '请确认是否收到短信！';
                            }
                        },1000);
              		}else{
              			that.$router.push('usePortal');
              		}
				}
			};
		},
		methods:{
			Goback(){
                /*返回上一页*/
				this.$router.go(-1);
			},
            toast(msg){
                Toast({
				   message: msg,
				   position: 'middle',
                   duration: 3000
				});
            },
			confirm(){
                /*校验电话号码*/
           		if(!regularMatch.isPhone(this.telephone)){
                    this.toast('请输入正确的电话号码');
                    return ;   
                }
                /*接收类型*/
                if(this.tipWays.length==0){
                    this.toast('请选择通知类型');
                    return ; 
                }
                let data={
                  	serviceCharge:this.serviceCharge,
              		telephone:this.telephone,
                  	tipWays:String(this.tipWays),
                  	schoolList:this.schoolIdlist
                };
                Indicator.open('加载中...');
                //新增订阅院校
                var that=this; 
                ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/add.htm",data,
          		function(database){
                	console.log(database)
                   if(database.success){
                   		if(database.datas){
                   			that.remindDate = [];
                   			that.remindDate.push(
								{
									label: '接收app提醒',
								    value: '1',
									disabled: true
								},
								{
								    label: '接收短信提醒',
								    value: '2',
								    disabled: true
								},
								{
								    label: '接听电话提醒',
								    value: '3',
								     disabled: true
								}
							);
							that.disabled = true;
                			that.orderDatas=database.datas.obj;
                			if(that.serviceCharge==0){
                				that.$router.push('usePortal');
                			}else{
                				if(database.datas.artCardFlag){
                					if(that.orderDatas.allowSendWelcomeSms){
                						that.smspopupVisible=true;
				              			let allTime=60;
				                        let innertimer=setInterval(function(){
				                            that.timeDown=allTime--+'秒';
				                            if(allTime<=0){
				                                innertimer && clearInterval(innertimer);
				                                that.timeDown = '请确认是否收到短信！';
				                            }
				                        },1000);
                					}else{
                						that.$router.push('usePortal');
                					}
                				}else{
                					yksapp_user.reqOrderCallback(that.orderDatas.orderId,'payOff');
                				}
                			};
                   		}
                   	}else{
                   		if(database.code=='helper_002'){
                   			MessageBox({
							  title: '温馨提示',
							  message: database.message,
							  confirmButtonText:'去支付',
							  showCancelButton: true
							}).then(action => {
							  if(action=='confirm'){
	                        	yksapp_user.reqOrderCallback(database.datas.obj.orderId,'payOff');
							  }
							});
                   		}else{
                   			MessageBox({
							  title: '温馨提示',
							  message: database.message,
							  confirmButtonText:'知道了',
							  showCancelButton: true
							});
                   		}
                   	}
               	},function(){
                   Indicator.close();
               	}) 
			},
			receiveMegs(){//收到短信
				var that = this;
				var addData = {
					"subscribeID":this.orderDatas.subscribeID,
					"smsStatus":3
				}
				ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/update_smsstatus.htm",addData,function(megs){
					console.log(megs);
					if(megs.success){
						that.$router.push('usePortal');
					}else{
						that.toast(megs.message);	
					}
				})
			},
			NoreceiveMegs(){//未收到短信
				var that = this;
				var addData = {
						"subscribeID":this.orderDatas.subscribeID,
						"smsStatus":4
					}
				ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/update_smsstatus.htm",addData,function(megs){
					console.log(megs);
					if(megs.success){
						that.$router.push('Noreceivemegs');
					}else{
						that.toast(megs.message);	
					}
				})
			}
		}
	}
</script>

<style>
#Servicesub{
	width: 100%;
	height: 100%;
	background: #fff;
}
#Servicesub .orderInfor{
	height: auto;
	margin-top: 0.8rem;
	overflow-y: scroll;
}
#Servicesub .academySub{
	font-size: 0.3rem;
	padding-top: 0.2rem;
}
#Servicesub .academySub-school{
    width: 90%;
    max-height: 3.6rem;
    margin: 0 auto;
    box-sizing: border-box;
    overflow-y: scroll;
}
#Servicesub .academySub-academyList{
    height: 100%;
    overflow-y: auto;
    max-height: 2rem;
}
#Servicesub .academySub h3{
	margin-bottom: 0.2rem;
}
#Servicesub .academySub-academyList span{
	float: left;
	font-size: 0.28rem;
	line-height: 0.5rem;
     height: 0.5rem;
     padding: 0 5px;
    
}
#Servicesub .receivMode{
	font-size: 0.3rem;
    margin-top: 0.4rem;
    color: #5a5a5a;
    margin-left: 0.5rem;
}
#Servicesub .inputVal{
	position: relative;
	width: 64%;
	height: 0.8rem;
	font-size: 0.28rem;
	margin: 0.2rem 0 0 0.5rem;
}
#Servicesub .inputVal input{
	width: 100%;
    height: 100%;
    font-size: 0.3rem;
    line-height: 0.8rem;
    padding-left: 0.2rem;
    background: #F4F4F4;
    margin-top: 0.2rem;
}
#Servicesub .choose{
    width: 86%;
    border: 1px solid #888;
    margin: 0.1rem auto;
}
/*mint-cell样式覆盖*/
#Servicesub .choose .mint-cell{
	display: block;
	min-height: 0.6rem;
	background: #f4f4f4;
}
#Servicesub .choose .mint-checklist-title{
	font-size: 0;
	margin: 0;
}
#Servicesub .choose .mint-cell:last-child{
	background-size: 120% 0px;
	background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0);
}
#Servicesub .choose .mint-cell .mint-cell-wrapper{
	font-size: 0.28rem;
	padding: 0 0.1rem;
	background-size: 120% 0px;
	background-image: linear-gradient(180deg,#fff,#fff 50%,transparent 0);
}
#Servicesub .choose .mint-cell .mint-checklist-label{
	padding: 0;
    font-size: 0.26rem;
}
#Servicesub .choose .mint-cell .mint-cell-wrapper .mint-checkbox-core{
	width: 0.32rem;
    height: 0.32rem;
}
#Servicesub .choose .mint-cell .mint-cell-wrapper .mint-checkbox-core:after{
	top: 0rem;
    left: 0.12rem;
    width: 0.08rem;
    height: 0.2rem;
}
/*确认按钮样式重置*/
#Servicesub .confirm{
	width: 60%;
    height: 0.78rem;
    margin: 0.8rem 0 0 1.24rem;
    font-size: 0.3rem;
}
/*信息弹出层*/
#Servicesub .smspopup{
    width:80%;
    height: 46%;
    font-size: 0.3rem;
}
#Servicesub .smspopup h2{
	font-weight: normal;
	text-align: center;
	margin-top: 0.3rem;
}
#Servicesub .smspopup .sendMegs{
    width: 3.4rem;
    padding: 0.2rem;
    font-size: 0.28rem;
    border: 1px solid #ddd;
    margin: 0.4rem auto 0.4rem;
}
#Servicesub .smspopup .countDown{
    font-size: 0.3rem;
    line-height: 0.46rem;
    text-align: center;
}
#Servicesub .smspopup-footer{
    position: absolute;
    bottom: 0px;
    left:0px;
    width: 99.6%;
    overflow: hidden;
    border: 1px solid #ddd;
}
#Servicesub .smspopup-footer span{
    float: left;
    width: 40%;
    margin: 3.5%;
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.3rem;
}
#Servicesub .smspopup-footer .noReceived{
	border-right: 1px solid #ddd;
}
</style>