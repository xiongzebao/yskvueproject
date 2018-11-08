<template>
	<div id="Payoff">
		<mt-header fixed title="支付">
            <router-link  to="/Myservice" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
        </mt-header>
        <div class="payoff">
			<!--判断支付宝是否显示-->
			<div class="serviceCodePay clear" v-if="artCardFlag">
				<div class="orderInfor" v-if='statusStr=="待支付"'>
					<h3 class="money">
						￥{{serviceCharge}}
					</h3>
					<div class="order">
						<span>订单信息</span>
						<span class="Fees">艺考助手服务费</span>
					</div>
					<p class="tips">请选择支付方式：</p>
					<div class="order" v-tap="payoff">
						<!--<div class="payoff-way">
							
						</div>-->
						<span>付款方式</span>
						<span class="Fees">支付宝</span>
						<i class="iconfont icon-xuanze1"></i>
					</div>
				</div>
				<template v-if='statusStr!="待支付"'>
					<img src="../../../static/img/activate.png" />
					<p>您已激活艺考服务卡！可直接使用艺考助手服务！</p>
				</template>
			</div>
			<div class="orderInfor" v-else v-tap="{methods:payoff}" :pay="isPay">
				<h3 class="money">
					￥{{serviceCharge}}
				</h3>
				<div class="order">
					<span>订单信息</span>
					<span class="Fees">艺考助手服务费</span>
				</div>
			</div>
			<p class="tips">选择支付方式：</p>
			<div class="choose-type" v-tap="{methods:payoff}">
				<ul>
					<li class="type-Alipay">
						<i class="iconfont icon-zhifubao"></i>
						<span>支付宝</span>
						<i class="iconfont icon-gou"></i>
					</li>
					<li class="type-Alipay">
						<i class="iconfont icon-weixin"></i>
						<span>微信</span>
						<i class="iconfont icon-gou"></i>
					</li>
				</ul>
				<!--<span>付款方式</span>
				<span class="Fees">支付宝</span>-->
				<!--<i class="iconfont icon-xuanze1"></i>-->
			</div>
			
			<!--判断是否显示支付按钮-->
			<div class="Subscribe clear" v-if="artCardFlag">
				<template v-if='statusStr=="待支付"'>
					<p class="free">实付款：{{serviceCharge}}元</p>
					<mt-button v-tap="{methods:confirmSub}" class="confirmSub" type="primary" size="normal">
						确认支付
					</mt-button>
				</template>
				<template v-else-if='statusStr!="待支付"'>
					<mt-button v-tap="{methods:nextStep}" class="confirmNext" type="primary" size="normal">
						确定
					</mt-button>
				</template>
			</div>
		</div>
		<div class="Subscribe clear" v-if="artCardFlag==false">
			<p class="free">实付款：{{serviceCharge}}元</p>
			<mt-button v-tap="{methods:confirmSub}" class="confirmSub" type="primary" size="normal">
				确认支付
			</mt-button>
		</div>
       <!--接收信息提示页面-->
        <mt-popup
         class='smspopup'
          v-model="smspopupVisible"
          :closeOnClickModal='clickClosed'
          position="middle">
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
	import Loading from '../public/Loading.vue';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import { Popup } from 'mint-ui';
    Vue.component(Popup.name, Popup);
	export default {
		name:'Payoff',
		data(){
			return {
                clickClosed:false,/*禁用model层*/
               	artCardFlag:'',//艺享卡
               	statusStr:'',//支付标识
               	isPay:1,//默认支付宝支付
				scholList:'',
				fromPageData:'',//传递的数据
                payCode:'',/*服务标志码*/
				code:'',//识别是用支付宝还是用服务码支付
				serviceCharge:'',//订阅金额
                timeDown:'',/*倒计时*/
                smspopupVisible:false/*短信接收提示*/
			}
		},
        computed:{
            timeDownCom(){
                return this.timeDown
            }
        },
		mounted(){ 
			this.fromPageData=JSON.parse(this.$route.query.dataStr);
			console.log(this.fromPageData)
			this.artCardFlag = this.fromPageData.artCardFlag;
            this.serviceCharge=this.fromPageData.serviceCharge;/*价格*/
           	this.statusStr = this.fromPageData.statusStr;
            var that = this;
           	//支付支付调用方法
           	window.toPay=function(ref){
				if(ref=='true'){//支付成功处理
					if(that.fromPageData.allowSendWelcomeSms){
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
            toast(msg){
                Toast({
				   message: msg,
				   position: 'middle',
                   duration: 3000
				});
            },
			payoff(){//支付宝支付
				this.code=1;
			},
			nextStep(){
				var that = this;
				if(this.allowSendWelcomeSms){
					this.smspopupVisible=true;
					let allTime=60;
	                let timerDown=setInterval(function(){					
	                    that.timeDown=allTime--;
	                    if(allTime<0){
	                        timerDown && clearInterval(timerDown);
	                        that.timeDown = '请确认是否收到短信！';
	                    }
	                },1000) 
				}else{
					that.$router.push('usePortal');
				}
			},
			confirmSub(){
				let that = this;
              	/*支付宝支付*/
              	if(this.serviceCharge>0){
              		if(this.isPay==1){
	                    if(window.yksapp_user){
	                        yksapp_user.reqOrderCallback(this.fromPageData.orderId,'toPay'); 
	                    }
	                }
              	}else{
              		this.$router.push('usePortal');
              	}
			},
			receiveMegs(){//收到短信
				var that = this;
				var addData = {
					"subscribeID":this.fromPageData.subscribeID,
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
						"subscribeID":this.fromPageData.subscribeID,
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
#Payoff{
	width: 100%;
	height: 100%;
    overflow: hidden;
    background: #fff;
}
#Payoff .orderInfor{
	padding-top: 1rem;
}
#Payoff .payoff .money{
	font-size: 0.54rem;
    text-align: center;
    color: #5a5a5a;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #ddd;
}
#Payoff .payoff .order{
	height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    padding: 0 0.34rem;
	border-bottom: 1px solid #ddd;
	position: relative;
}
#Payoff .payoff .tips{
	font-size: 0.28rem;
	padding: 0.4rem 0 0.3rem 0.3rem;
	background: #F4F4F4;
}
#Payoff .payoff .choose-type{
	font-size: 0.28rem;
}
#Payoff .payoff .choose-type .type-Alipay{
	padding: 0.26rem;
    border-bottom: 1px solid #ddd;
    position: relative;
}
#Payoff .payoff .choose-type .type-Alipay .icon-gou{
	position: absolute;
    top: 0.26rem;
    right: 0.4rem;
    font-size: 0.4rem;
    color: #ddd;
}
#Payoff .payoff .order span{
	float: left;
	font-size: 0.28rem;
}
#Payoff .payoff .order .Fees{
	float: right;
	font-weight: 600;
}
#Payoff .payoff .alipayPay{
	width: 5rem;
    height: 0.7rem;
	border: 1px solid #ddd;
    text-align: center;
    line-height: 0.7rem;
    font-size: 0.3rem;
    margin: 0.8rem auto 0;
    position: relative;
}
#Payoff .payoff .order .icon-xuanze1{
	position: absolute;
	top: 0rem;
    right: 0rem;
    font-size: 0.36rem;
    color: red;
}
#Payoff .payoff .serviceCodePay{
	width: 4.7rem;
	font-size: 0.3rem;
    margin: 0.4rem auto 0;
    padding: 0.3rem 0.2rem 0.2rem;
    position: relative;
}
#Payoff .payoff .serviceCodePay img{
	float: left;
	width: 2rem;
    height: 1.7rem;
    margin-left: 1.2rem;
}
#Payoff .payoff .serviceCodePay p{
	float: left;
    margin-top: 0.6rem;
    line-height: 0.5rem;
}
/*#Payoff .serviceCodePay .icon-xuanze1{
	position: absolute;
	top: 0.2rem;
    right: 0.3rem;
    font-size: 0.4rem;
    color: red;
}
*/
#Payoff .Subscribe{
	width: 100%;
    height: 1.2rem;
	position: fixed;
	bottom: 0;
    left: 0;
    font-size: 0.28rem;
    background: #F4F4F4;
}
#Payoff .Subscribe p{
	float: left;
	font-size: 0.28rem;
	line-height: 1.2rem;
	margin-left: 0.6rem;
    color: red;
}
#Payoff .Subscribe .confirmSub{
	float: right;
    width: 2rem;
    height: 0.7rem;
    margin-right: 0.6rem;
    margin-top: 0.24rem;
}
#Payoff .Subscribe .confirmNext{
	height: 0.74rem;
    width: 5rem;
    font-size: 0.3rem;
    margin-top: 0.3rem;
    margin-left: 0.66rem;
}
/*信息弹出层*/
#Payoff .smspopup{
    width:80%;
    height: 50%;
    font-size: 0.3rem;
}
#Payoff .smspopup .sendMegs{
    width: 3.4rem;
    padding: 0.2rem;
    border: 1px solid #ddd;
    margin: 0.7rem auto 0.7rem;
}
#Payoff .smspopup .countDown{
    font-size: 0.3rem;
    line-height: 0.46rem;
    text-align: center;
}
#Payoff .smspopup-footer{
    position: absolute;
    bottom: 0px;
    left:0px;
    width: 99.6%;
    overflow: hidden;
    border: 1px solid #ddd;
}
#Payoff .smspopup-footer span{
    float: left;
    width: 40%;
    margin: 3.5%;
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.3rem;
}
#Payoff .smspopup-footer .noReceived{
	border-right: 1px solid #ddd;
}
</style>