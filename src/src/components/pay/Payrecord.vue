<template>
	<div id="Payrecord">
		<mt-header fixed title="我的交费记录">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<pulldown v-if='baseDatas'>
		<div class="content-wrap" id="payfee" slot='content'>
			<ul :id="root" :class="{ margin: isMargin }">
				<li v-for="item in baseDatas" class="Payrecord-item">
					<template v-if="item.dingDanZTStr=='未付款'">
						<p class="Payrecord-Num Inpay">No.{{item.dingDanBH}}</p>
					</template>
					<template v-else-if="item.dingDanZTStr">
						<p class="Payrecord-Num">No.{{item.dingDanBH}}</p>
					</template>
					<!--判断收款单位-->
					<h2 class="college-name">{{item.shouKuanDW}}</h2>
					<template v-for="intro in item.subList">
					<div class="college-major">
						<template v-if="intro.kaoDianMC==null||intro.kaoDianMC.length==0">
							<div class="service-type">
								<span class="service">{{intro.serviceName}}</span>
								<!--<span class="service">{{intro.createdOnStr}}</span>-->
								<template v-if="intro.yingFuJE==0">
									<span class="pay">0元</span>
								</template>
								<template v-else-if="intro.yingFuJE">
									<span class="pay">{{intro.yingFuJE}}元</span>
								</template>
							</div>
						</template>
						<template v-else-if="intro.kaoDianMC!=null||intro.kaoDianMC!=0">
						<template v-if='item.subList.length>0'>
							<template v-if='intro.dingDanZT==4'>
								<p class="del">考点：{{intro.kaoDianMC}}</p>
								<p class="del">
									考试专业：
									<span>{{intro.zhuanYeMC}}</span>
									<span>{{intro.kaoShiRQSM}}</span>
								</p>
							</template>
							<template v-else>
								<p>考点：{{intro.kaoDianMC}}</p>
								<p>
									考试专业：
									<span>{{intro.zhuanYeMC}}</span>
									<span>{{intro.kaoShiRQSM}}</span>
								</p>
							</template>
						</template>
						
						<template v-if="intro.yingFuJE==0">
							<template v-if='intro.dingDanZT==4'>
								<img src="../../../static/img/order_expired.png" />
								<span class="pay del">0元</span>
							</template>
							<template v-else>
								<span class="pay">0元</span>
							</template>
						</template>
						<template v-else-if="intro.yingFuJE">
							<template v-if='intro.dingDanZT==4'>
								<img src="../../../static/img/order_expired.png" />
								<span class="pay del">{{intro.yingFuJE}}元</span>
							</template>
							<template v-else>
								<span class="pay">{{intro.yingFuJE}}元</span>
							</template>
						</template>

						</template>
					</div>
					</template>
					<div class="total">
						<!--共1个专业-->
						<!--收款单位为空-->
						<template v-if="item.shouKuanDW==null||item.shouKuanDW.length==0">
							<template v-if="item.subList.length==0">
								<span class="zhuanye">肖像信息服务</span>
							</template>
							<template v-else-if="item.subList.length!=0">
								<span class="zhuanye">共{{item.subList.length}}个服务</span>
							</template>
						</template>
						<!--收款单位不为空-->
						<template v-else-if="item.shouKuanDW!=null||item.shouKuanDW.length!=0">
							<template v-if="item.subList.length==0">
								<template v-if="item.shouKuanDW==亦闲信息科技">
									<span class="zhuanye">肖像信息服务</span>
								</template>
							</template>
							<template v-else-if="item.subList.length!=0">
								<span class="zhuanye">共{{item.subList.length}}个专业</span>
							</template>
						</template>
						<span class="Addup">合计：{{item.yingFuJE}}元</span>
						
						<template v-if="item.dingDanZT==1">
						<!---支付按钮-->
							<span class="Gopay" v-if="item.dingDanZT==1" v-show='timeShow'>
								{{item.remainTime}}
							</span>
							<span class="Gopay" v-else>
								
							</span>
							<mt-button v-tap="{methods:Topay,param:item.dingDanID}"
								type="primary" size="small">
								 支付
							</mt-button>
						</template>
						<template v-else-if="item.dingDanZT==2">
							<span class="Topay">已支付</span>
						</template>
						<template v-else-if="item.dingDanZT==3">
							<span class="Topay">已关闭</span>
						</template>
						<template v-else-if="item.dingDanZT==4">
							<span class="Topay">已作废</span>
						</template>
					</div>
				</li>
			</ul>

		</div>
		</pulldown>
		<datenote v-show='datalength' dataNoteMessage='暂无交费记录'></datenote>
		<Loading v-show="loading"></Loading>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast } from 'mint-ui';
	import Loading from '../public/Loading.vue'
	import Datenote from '../public/DataNote.vue'
	import Pulldown from '../public/loadmore.vue'
	import VueBus from 'vue-bus';
	Vue.use(VueBus);
	export default {
		name:'Payrecord',
		computed:{
		    root(){
		      	return 'Payrecord'+this.index;
		    }
		},
		data(){
			return {
                i:0,
                url:'',
				baseDatas:'',
				Rtime:'',
				timeShow:false,//控制倒计时显示问题
				isMargin:false,
				datalength:false,//没有数据显示的提示
				loading:true
			}
		},
		created(){
			this.fixdata();
			this.$bus.on("pulldown",this.fixdata);
		},
		mounted(){
			window.payOff=function(ref){
				if(ref=='true'){
					window.location.reload();
				}
			};
		},
		components:{
			Loading:Loading,
			Datenote:Datenote,
			Pulldown:Pulldown
		},
		watch:{
	       	baseDatas:{
		　　　　　handler(val){
				  	this.$nextTick(function () {
	                 	var pay = $('.total .Gopay');
	                 	for(var i = 0; i<pay.length; i++){
							this.Countdown(pay[i])//倒计时
			        	}
	             	})
		　　　　　	}
	　　　　　	}   
		},
		methods:{
			fixdata(){
				var that=this;
				var d={
		       		"includeSub":true
				}
				//订单查询接口
				ajaxMethod.doAjax("pay,/api/m/auth/pay/query_order.htm",d,function(d){
					console.log(d)
					if(d.success){
						if(d.datas.list){
							that.datalength=false;
							that.isMargin = true;
							that.baseDatas=d.datas.list;
							if(d.datas.list){
								for(var i = 0, len = that.baseDatas.length; i<len; i++){
									var t = that.baseDatas[i];
									that.Rtime = that.baseDatas[i].remainTime;
								}
							}
						}else{
							that.datalength=true;
							that.isMargin = false;
						}
					}else{
						that.datalength=true;
						that.isMargin = false;
						Toast({
						  message: d.message,
						  position: 'middle',
						  duration: 5000
						});
					}
				},function(){
					that.loading=false;
				})
			},
			Topay(orderId){
				yksapp_user.reqOrderCallback(orderId.param,'payOff');
			},
			Countdown($id){
				
             	var longTime = $id.innerText;
				if (longTime <= 0) {
					return false;
		  		}
		       	var showTime = parseInt(longTime / 1000);
		       	var that = this;
		       	
				var CD = setInterval(function(){
					that.timeShow = true;
					if (showTime <= 1) {
						$id.innerText='';
						CD && clearInterval(CD);
						return;
					}
					if(showTime > 86400){
						$id.innerText=(parseInt(showTime / 86400) + '天' + (parseInt(showTime % 86400 / 3600)) + '小时');
					} else if(showTime > 3600){
						$id.innerText=(parseInt(showTime / 3600) + '小时' + (parseInt(showTime % 3600 / 60)) + '分');
					} else if (showTime > 60) {
						/*当分数 < 9 时前面加一个0*/
						let Minutes = (parseInt(showTime / 60));
						let Minute = Minutes > 9 ? Minutes : ('00'+Minutes).substr(-2);
						/*当秒数 < 9 时前面加一个0*/
						let secods=showTime % 60;
						let second=secods > 9 ? secods : ('00'+secods).substr(-2);
						$id.innerText = Minute + '分' + second + '秒';
					} else {
						let sets = showTime;
						let set = sets > 9 ? sets : ('00'+sets).substr(-2);
						$id.innerText= set + '秒';
					}
					showTime -= 1;
				},1000);
			}
		}
	}
</script>
<style>
#Payrecord .content-wrap{
	width: 100%;
	height: 100%;
}
#Payrecord .content-wrap ul{
	width: 100%;
	height: 100%;
	background: #f9f9f9;
	padding: 0.18rem 0 0;
}
#Payrecord .Payrecord-item{
	background: #fff;
	padding: 0 0.18rem;
	color: #616568;
	margin-bottom: 0.18rem;
}
#Payrecord .Payrecord-item:last-child{
	margin-bottom: 0;
}
#Payrecord .Payrecord-item .Payrecord-Num{
	font-size: 0.26rem;
	height: 0.45rem;
	padding-top: 0.06rem;
    border-bottom: 1px solid #f3f3f3;
    line-height: 0.45rem;
}
#Payrecord .Payrecord-item .Inpay{
	color: #ff5704;
}
#Payrecord .Payrecord-item .college-name{
	width: 6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	font-size: 0.28rem;
	font-weight: 600;
	padding-top: 0.18rem;
}
#Payrecord .Payrecord-item  .del{
	text-decoration:line-through;
}
#Payrecord .Payrecord-item .college-major{
	font-size: 0.26rem;
	line-height: 0.4rem;
	margin-top: 0.14rem;
	padding-bottom: 0.06rem;
	border-bottom: 1px solid #f2f2f2;
	position: relative;
}
#Payrecord .Payrecord-item .college-major img{
	position: absolute;
    top: -0.4rem;
    right: 0.1rem;
	width: 0.8rem;
    height: 0.8rem;
}
#Payrecord .Payrecord-item .college-major .service-type{
	height: 0.8rem;
}
#Payrecord .Payrecord-item .college-major .service-type .service{
	line-height: 0.8rem;
}
#Payrecord .Payrecord-item .college-major p{
	width: 5rem;
}
#Payrecord .Payrecord-item .college-major .pay{
	position: absolute;
	top: 0.18rem;
	right: 0.1rem;
}
#Payrecord .Payrecord-item .total{
	font-size: 0.26rem;
	height: 0.8rem;
	line-height: 0.8rem;
	border-bottom: 1px solid #f2f2f2;
	position: relative;
}
#Payrecord .Payrecord-item .total .Addup{
	margin-left: 0.14rem;
}
#Payrecord .Payrecord-item .total .Gopay{
	position: absolute;
    top: 0rem;
    right: 1.2rem;
    color: red;
}
#Payrecord .Payrecord-item .total  .Topay{
	color: #ff5704;
	position: absolute;
	top: 0rem;
	right: 0.1rem;
}
#Payrecord .Payrecord-item .total .mint-button--small{
	position: absolute;
	height: 0.56rem;
    top: 0.12rem;
    right: 0.04rem;
	font-size: 0.26rem;
    padding: 0 0.2rem;
}
</style>
