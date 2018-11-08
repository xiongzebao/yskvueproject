<template>
	<div id="retestPay">
	<div class="retestPay-header">
	    <mt-header  title="复试交费">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
        <div class="userIntro nameProvince" >
					<div class="userIntro-name">
						<span>姓名</span><span class="userIntro-speci">{{name}}</span>
					</div>
					<div class="userIntro-pro">
						<span>省份</span><span class="userIntro-speci">{{province}}</span>
					</div>
        </div>
	</div>
		
		<div id="payIntro">
		    <template v-if='datalengthFlag'>
		        <Datenote dataNoteMessage='暂时没有复试交费信息'></Datenote>
		    </template>
		    <template v-else>
		        	<Pulldown style="top:1.4rem;">
				

				<div class="payState" slot='content'>
					<div class="stateItem" v-for='item in dataList'>
						<div class="intro">
							<p class="introSpe"><span>{{item.xueXiaoMC}}</span><span class='zhuanyemc'>{{item.zhuanYeMC}}</span></p>
							<p class="local">考点:{{item.kaoDianMC}}</p>
						</div>
						<div class="pay" v-for='reitem in item.reexList'>
							<div class="payIntro">{{reitem.billDes}}</div>

							<div class="payNum">{{reitem.billFee}}元</div>
							<template v-if='reitem.allowPay'>
								<template v-if='reitem.status==1'>
									<div class="goPay nopay" v-tap="{ methods : startPay,param:reitem.orderId}">待交费</div>
								</template>
								<template v-else-if='reitem.status==2'>
									<div class="goPay havepay">已交费</div>
								</template>
								<template v-else-if="!reitem.status">
									<div class="goPay nopay" v-tap="{ methods : goPayWay ,param:reitem.bId}">支付</div>
								</template>
								<template v-else-if='reitem.status==3'>
									<div class="goPay nopay" v-tap="{ methods : goPayWay,param:reitem.bId}">支付</div>
								</template>

							</template>
							<template v-else-if='reitem.status==2'>
								<template v-if='reitem.orderId'>
									<div class="goPay havepay">已支付</div>
								</template>

							</template>
							<template v-else-if='reitem.nonArrival'>
								<div class="goPay usedpay">时间未到</div>
							</template>
							<template v-else-if='reitem.timeOut'>
								<div class="goPay usedpay">已过期</div>
							</template>

						</div>
					</div>

				</div>
				
				 
			</Pulldown>
		    </template>  
          <Loading v-show="loading"></Loading>
		</div>
		
	</div>
</template>

<script>
	import Vue from 'vue'
//	import { Header } from 'mint-ui';
//	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Loading from '../public/Loading.vue';
	import Pulldown from '../public/loadmore.vue';
    import Datenote from '../public/DataNote.vue';
	import { Indicator } from 'mint-ui';
	import VueBus from 'vue-bus';
	Vue.use(VueBus);
//	Vue.component(Header.name, Header);
//	Vue.component(Button.name, Button);
	export default {
		name: 'retestPay',
		data() {
			return {
				dataList: '',
				name: '',
				province: '',
				datalengthFlag: false,
				loading: true
			}
		},
		mounted() {
			let that=this;
			window.retestPay=function(val){
				that.fixdata();	
			}
			/*获取姓名省份*/
			if(window.yksapp_user) {
				this.name = yksapp_user.getStdName();
				this.province = yksapp_user.getStdProvince();
			}
			this.fixdata();
			this.$bus.on("pulldown", this.fixdata);
		},
		components: {
            Loading,
            Datenote,
			Pulldown
		},
		methods: {
			toast(meg){
				Toast({
					message: meg,
					position: 'middle',
					duration:1500
				});
			},
			/*调用支付*/
			goPayWay: function(va) {
				Indicator.open('加载中...');
				var data = {
					"bId": va.param
				}
				var that = this;
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/add_reexam_order.htm", data, function(database) {
					if(database.success) {

						yksapp_user.reqOrderCallback(database.datas.obj.orderId,"retestPay");

					} else {
						that.toast(database.message)
					}
				},function(){
					Indicator.close();
				})

			},
			startPay(val) {
				yksapp_user.reqOrderCallback(val.param,"retestPay");
			},
			fixdata() {
				var data = {}
				var that = this;
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_reexam.htm", data, function(database) {
					if(database.success) {

						if(database.datas.list) {
							that.dataList = database.datas.list;
							that.datalengthFlag = false;
						} else {
							that.datalengthFlag = true;
						}
					} else {
						that.datalengthFlag = true;
						
						that.toast(database.message)
					}
				}, function() {
					that.loading = false
				})
			}

		}
	}
</script>

<style scoped>
    #retestPay .retestPay-header{
        position: fixed;
        top:0;
        left:0;
        width:100%;
            
    }
	#retestPay #payIntro {
		padding-top: 0.7rem;
	}
	
	#retestPay #payIntro .nodate {
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		color: #bdbdbd;
		font-size: 0.24rem;
		background: #fff;
		margin: 20px 0;
	}
	
	#retestPay .userIntro {
		background: #fff;
		overflow: hidden;
		padding: 0 0.3rem;
		box-sizing: border-box;
	}
	
	#retestPay .userIntro-name {
		float: left;
	}
	
	#retestPay .userIntro-name {
		float: right;
	}
	
	#retestPay  .userIntro div {
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.25rem;
	}
	
	#retestPay .userIntro-speci {
		color: #42cefc;
		padding-left: 5px;
	}
	
	#retestPay #payIntro .payState {
		font-size: 0.2rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
	}
	
	#retestPay #payIntro .payState .intro {
		border-bottom: 1px solid #e9e9e9;
	}
	
	#retestPay #payIntro .payState .intro .zhuanyemc {
		padding-left: 10px;
	}
	
	#retestPay #payIntro .payState .stateItem {
		background: #fff;
		overflow: hidden;
		margin: 0.12rem 0;
		padding: 0 0.1rem;
		box-sizing: border-box;
		border: 1px solid #e9e9e9;
		border-radius: 5px;
	}
	
	#retestPay #payIntro .payState .stateItem .introSpe {
		font-size: 0.3rem;
		padding-top: 0.2rem;
	}
	
	#retestPay #payIntro .payState .stateItem .local {
		padding: 0.1rem 0;
	}
	
	#retestPay #payIntro .payState .stateItem .pay {
		overflow: hidden;
	}
	
	#retestPay #payIntro .payState .stateItem .pay div {
		float: left;
		width: 3rem;
	}
	
	#retestPay #payIntro .payState .stateItem .pay .payNum {
		float: left;
		height: 0.8rem;
		line-height: 0.8rem;
		width: 0.8rem;
	}
	
	#retestPay #payIntro .payState .stateItem .pay .payIntro {
		height: 0.8rem;
		line-height: 0.8rem;
	}
	
	#retestPay #payIntro .payState .stateItem .pay .goPay {
		float: right;
		width: 1rem;
		text-align: center;
	}
	
	#retestPay #payIntro .payState .stateItem .pay .usedpay {
		color: #c0baba;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	
	#retestPay #payIntro .payState .stateItem .pay .havepay {
		height: 0.8rem;
		line-height: 0.8rem;
		color: #ff671c;
	}
	
	#retestPay #payIntro .payState .stateItem .pay .nopay {
		height: 0.56rem;
		line-height: 0.56rem;
		background: #42cefc;
		border-radius: 5px;
		box-sizing: border-box;
		margin-top: 0.12rem;
		color: #fff;
	}
</style>