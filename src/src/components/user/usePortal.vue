<template>
	<div id="usePortal">
		<mt-header fixed title="艺考助手">
		  <div slot="left" v-tap='{methods:Goback}'>
                <mt-button icon="back"></mt-button>
          </div>
		  <mt-button v-tap="{methods:Seting}" class="iconfont icon-shezhi" slot="right"></mt-button>
		</mt-header>
		<div class="collegeInfo clear">
			<template v-if="userLogo">
				<img :src="userLogo" />
			</template>
			<template v-else>
				<img src="../../../static/img/ic_default_avatar.png" />
			</template>
			<div class="textInfo" v-if='schNum==0'>
				<p class="lineHeight">暂无报考院校和专业</p>
				<span v-if="orderID" v-tap="{methods:Topay}">您有未支付的订单请支付！</span>
			</div>
			<div class="textInfo" v-else>
				<p>我已经成功报考</p>
				<p>{{schNum}}个院校{{profNum}}个专业</p>
				<span v-if="orderID" v-tap="{methods:Topay}">您有未支付的订单请支付！</span>
			</div>
		</div>
		<div class="switchMode clear">
			<!--日期模式按钮样式-->
			<mt-button class="model" v-if='dateShow'
				v-tap="{methods:switchDate}" type="primary" size="small">
				日期模式 
			</mt-button>
			<mt-button class="model" v-else
				v-tap="{methods:switchDate}" type="default" size="small">
				日期模式 
			</mt-button>
			<!--院校模式按钮样式改变-->
			<mt-button class="model" v-if='academyShow' 
				v-tap="{methods:switchAcademy}" type="primary" size="small">
				院校模式
			</mt-button>
			<mt-button class="model" v-else
				v-tap="{methods:switchAcademy}" type="default" size="small">
				院校模式
			</mt-button>
			<i class="iconfont icon-add" v-tap='{methods:Add}'></i>
		</div>
		<div class="academyDetails">
			<datenote class="nodeData" v-if='datalength' 
				dataNoteMessage='您订阅的院校暂未开放报名时间，如果开放我们将在第一时间给您提示！'>
			</datenote>
			<!--日期模式-->
			<ul class="academyAxis axis" v-show="dateShow">
				<li><div class="dateLine"></div></li>
				<li class="academyItem clear" v-for="(item,index) in dateData">
					<!--时间轴颜色显示判断-已过期（红色）当天（绿色）未到期（灰色）-->
					<template v-if="item.tipTimeStatus==1">
						<div class="dateNode grayColor"></div>
					</template>
					<template v-if="item.tipTimeStatus==2">
						<div class="dateNode greenColor"></div>
					</template>
					<template v-if="item.tipTimeStatus==3">
						<div class="dateNode redColor"></div>
					</template>
					<div class="dateTime">
						{{item.tipTimeStr}}{{item.tipTimeWeek}}
					</div>
					<div class="remark">
						<div class="academyText clear">
							<p>{{item.xueXiaoMC}}</p>
							<p>{{item.kaoShiMC}}</p>
							<p>{{item.kaoDianMC}}</p>
							<p>{{item.zhuanYeMC}}</p>
							<p>{{item.tipStr}}</p>
							<i class="iconfont icon-1218biaoqianhongqi" 
							v-tap="{methods:markerFlag,index:index}" :class="{flagRed:item.isCheck}">
							</i>
						</div>
					</div>
				</li>
			</ul>
			<!--院校模式-->
			<ul class="dateAxis axis" v-show="academyShow">
			<!--<draggable class="dateAxis axis" :list="academyData" v-show="dateShow" v-model="schoolArr">-->
				<li class="academyItem clear" v-for="item in academyData">
				    <div class="academyTitle clear">
				    	<div class="schoolName clear">
				    		<img class="schoolLogo" :src="schoolLogo">
				    		<h3>{{item.xueXiaoMC}}</h3>
							<span v-if="item.zhuanYeMC">【{{item.zhuanYeMC}}】</span>
				    	</div>
						<!--报考专业详情数组-->
						<div class="schoolDetails clear">
							<template v-if="item.applyProfTipDetail">
								<div class="clear" v-for="item in item.applyProfTipDetail">
									<p>{{item.tipTimeStr}}</p>
									<p>{{item.tipTimeWeek}}</p>
									<p>{{item.kaoShiMC}}</p>
									<p>{{item.kaoDianMC}}</p>
									<p>{{item.tipStr}}</p>
								</div>
							</template>
							<div class="clear" v-else>
								<p>{{item.tipTimeStr}}</p>
								<p>{{item.tipTimeWeek}}</p>
								<p>{{item.kaoShiMC}}</p>
								<p>{{item.kaoDianMC}}</p>
								<p>{{item.tipStr}}</p>
							</div>
						</div>
						<!--<i class="iconfont icon-arrowup"></i>-->
					</div>
				</li>
			<!--</draggable>-->
			</ul>
		</div>
		<div class="prompt">
			提示：7点钟推送提醒短信
		</div>
		<mt-popup
		  v-model="artGuide">
		  	<div class="guideMap">
		  		<div class="mapImg" v-show="mapOne_hid" v-tap="{methods:nextGuide}">
		  			<img src="../../../static/img/map_01.png" />
		  		</div>
		  		<div class="mapImg" v-show="mapTwo_Show" v-tap="{methods:closeGuide}">
		  			<img src="../../../static/img/map_02.png" />
		  		</div>
		  	</div>
		</mt-popup>
       	<Loading v-show="loading"></Loading>
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast,Popup } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import Loading from '../public/Loading.vue'
import Datenote from '../public/DataNote.vue'
import VueBus from 'vue-bus';
import VueDND from 'awe-dnd';
import draggable from 'vuedraggable';/*拖拽效果*/

Vue.use(VueDND);
Vue.use(VueBus);
Vue.component(Popup.name, Popup);

export default {
	name: 'usePortal',
	data() {
		return {
			userLogo:'',//用户logo
			schoolArr:[],//拖拽数组
			schoolLogo:'',//学校logo
			orderID:'',//订单id
			schNum:'',//院校
			profNum:'',//专业
			mapOne_hid:true,
			mapTwo_Show:false,//提高第二张图片的层级
			datalength:false,
			loading:true,
			dateShow: true, //日期模式
			academyShow: false, //院校模式
			artGuide: false, //艺考助手引导图
			dateData: [], //日期模式页面数据渲染
			academyData: [], //院校模式页面数据渲染
			applyProfTipDetail:'',//院校模式报考专业详情
		}
	},
	components: {
        draggable,
        Loading:Loading,
		Datenote:Datenote
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
	mounted() {
		let that = this;
		//已订阅提醒详情-日期模式
		let dateUrl = "befexam,/api/m/auth/helper/subscriberecord/get_subscribe_detail_bydate.htm";
		ajaxMethod.doAjax(dateUrl, {}, function(d) {
			console.log(d)
			if(d.success) {
				if(d.datas.applyNum){
					that.schNum = d.datas.applyNum.schNum;
					that.profNum = d.datas.applyNum.profNum;
					that.orderID = d.datas.orderId;
				};
				that.userLogo = d.datas.userLogo;
				if(d.datas.list) {
					that.datalength = false;
					that.dateData = d.datas.list;
					that.dateData.forEach(function(value, index) {
						if(value.markerFlag==1){
							Vue.set(that.dateData[index], "isCheck", true)
						}else{
							Vue.set(that.dateData[index], "isCheck", false)
						}
					});
				}else{
					that.datalength = true;
				};
			}else {
				that.datalength = true;
				that._Toast(d.message);
			}
		},function(){
			that.loading=false;
		});
		//已订阅提醒详情-院校模式
		ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/get_subscribe_detail_byschool.htm",{}, function(d) {
			if(d.success) {
				if(d.datas.list){
					that.datalength = false;
					that.academyData = d.datas.list;
					that.academyData.forEach(function(e){
						that.schoolLogo = e.logo;
						that.applyProfTipDetail = e.applyProfTipDetail;
					})
				}else{
					that.datalength = true;
				}
			} else {
				that._Toast(d.message);
			}
		});
		//艺考助手引导图弹出处理
		var NewUserID = yksapp_user.getUserId();
		var GetuserID = yksapp.getValueByKey('H5userKey');
		if(NewUserID!=GetuserID){//如果两次用户名不一样则显示艺考助手引导图
			that.artGuide = true;
		}else{
			that.artGuide = false;
		};
		this.hendleArtguide();
		支付处理
		window.payOff=function(ref){
			if(ref=='true'){//支付成功处理
				that.$router.push('usePortal');
			}
		};
	},
	methods: {
		hendleArtguide(){//处理艺考助手导向图
			var H5userKey = 'H5userKey';
			var H5userID=yksapp_user.getUserId();
			yksapp.setKeyValue(H5userKey,H5userID);
		},
		Goback(){//返回上一页
			this.$router.go(-1);
		},
		_Toast(meg){
			Toast({
			  message: meg,
			  position: 'middle',
			  duration: 3000
			});
		},
		nextGuide(){
			this.mapOne_hid = false;
			this.mapTwo_Show = true;
		},
		closeGuide() { //关闭引导图
			this.artGuide = false;
		},
		Seting() { //设置操作
			this.$router.push('Setup')
		},
		Topay(){//有订单就去支付
        	yksapp_user.reqOrderCallback(this.orderID,'payOff');
		},
		Add() { //添加操作
			this.$router.push('AddReminders');
		},
		switchAcademy() { //切换院校模式
			this.academyShow = true;
			this.dateShow = false;
		},
		switchDate() { //切换日期模式
			this.academyShow = false;
			this.dateShow = true;
		},
		markerFlag(idx) { //红旗标志
			var that = this;
			var AddData;
			var delData;
			this.dateData.forEach(function(value, index) {
			if(idx.index == index) {
				var tipStatus = value.tipTimeStatus;
				var markerFlag = value.markerFlag;
				var check = !value.isCheck;
				AddData = {
					"ctxType": value.ctxType,
					"subscribeID": value.subscribeID,
					"xueXiaoID": value.xueXiaoID,
					"xueXiaoMC": value.xueXiaoMC,
					"kaoShiID": value.kaoShiID,
					"kaoShiMC": value.kaoShiMC,
					"kaoDianID": value.kaoDianID,
					"kaoDianMC": value.kaoDianMC,
					"zhuanYeID": value.zhuanYeID,
					"zhuanYeMC": value.zhuanYeMC,
					"itemID": value.itemID,
					"itemName": value.itemName,
					"tipTime": value.tipTime
				};
					delData = {
						"markerID": value.markerID,
						"ctxType": value.ctxType
					}
					if(check == true) {
						if(tipStatus=='3'){
							that._Toast('已过期的不能添加提醒！');
						}else{
							if(value.mrakerID!==null){
							//添加用户重要提醒标记
								ajaxMethod.doAjax("befexam,/api/m/auth/helper/usertipmarker/add_usertip_marker.htm", AddData, function(d) {
									if(d.success) {
										value.isCheck= true;
									} else {
										var title = '温馨提示'
										MessageBox.alert(d.message, title);
									}
								})
							}else{
								that._Toast('数据请求中请过会儿标记！');
							}
						}
					} else {
						//取消用户重要提醒标记
						ajaxMethod.doAjax("befexam,/api/m/auth/helper/usertipmarker/del_usertip_marker.htm",delData,function(d) {
							if(d.success) {
								value.isCheck= false;
							} else {
								var title = '温馨提示'
								MessageBox.alert(d.message, title);
							}
						})
					}
				}
			})
		}
	}
}</script>

<style>
#usePortal {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff;
}

#usePortal .icon-shezhi {
	font-size: 0.54rem;
	padding-top: 0.1rem;
}

#usePortal .collegeInfo {
	padding-left: 0.3rem;
	margin-top: 1rem;
}

#usePortal .collegeInfo img {
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	float: left;
}

#usePortal .collegeInfo .textInfo {
	float: left;
	font-size: 0.28rem;
	line-height: 0.4rem;
	padding-top: 0.1rem;
	margin-left: 0.4rem;
}
#usePortal .collegeInfo .textInfo .lineHeight{
	margin-top: 0.14rem;
}
#usePortal .collegeInfo .textInfo span{
	background: rgba(255, 193, 7, 0.44);
    display: inline-block;
    height: 0.48rem;
    line-height: 0.48rem;
    padding: 0 0.2rem;
    color: red;
}
#usePortal .switchMode {
	width: 100%;
	height: 0.6rem;
	margin-top: 0.1rem;
}

#usePortal .switchMode .model {
	float: left;
	width: 1.46rem;
	height: 0.54rem;
	font-size: 0.25rem;
	padding: 0 0.1rem;
	margin-left: 0.2rem;
}

#usePortal .switchMode .icon-add {
	float: right;
	font-size: 0.56rem;
	color: #25c4ff;
	margin-right: 0.4rem;
	line-height: 0.5rem;
}

#usePortal .academyDetails {
	height: 68%;
	/*margin: 0.2rem;*/
	overflow-y: scroll;
	/*border: 1px solid #ddd;*/
}
#usePortal .academyDetails .nodeData{
	width: 5.5rem;
	margin-left: 0.43rem;
}

/*院校和日期共有样式*/

#usePortal .axis {
	position: relative;
}
/*日期模式样式*/

#usePortal .dateAxis .academyItem {
	position: relative;
	margin: 0.2rem;
	padding: 0 0.1rem 0.16rem;
	border: 1px solid rgba(153, 153, 153, 0.55);
	transition: transform .6s;
}

#usePortal .dateAxis .academyItem .academyTitle {
	float: left;
    width: 5rem;
	font-size: 0.28rem;
	padding-top: 0.14rem;
    padding-left: 0.1rem;
}

#usePortal .dateAxis .academyItem .schoolLogo {
	width: 0.6rem;
	height: 0.6rem;
	margin-right: 0.1rem;
}

#usePortal .dateAxis .academyItem .academyTitle .schoolName {
	font-size: 0.3rem;
	margin-bottom: 0.08rem;
}
#usePortal .dateAxis .academyItem .academyTitle .schoolName h3{
	float: left;
	line-height: 0.6rem;
	font-weight: normal;
}
#usePortal .dateAxis .academyItem .academyTitle .schoolName span{
	float: left;
    line-height: 0.6rem;
}
#usePortal .dateAxis .academyItem .schoolDetails p {
	float: left;
	font-size: 0.26rem;
	margin-right: 0.14rem;
}
/*向上分箭头样式*/

#usePortal .dateAxis .academyItem .icon-arrowup {
	position: absolute;
	top: 0.1rem;
	right: 0.4rem;
	font-size: 0.4rem;
	color: rgba(90, 90, 90, 0.61);
}

/*院校模式样式*/

#usePortal .academyAxis .academyItem .dateTime {
	float: left;
	width: 1.1rem;
	font-size: 0.22rem;
	text-align: center;
	margin-top: 0.08rem;
	margin-left: 0.08rem;
}


/*时间轴样式*/

#usePortal .academyAxis .dateLine {
	width: 0.02rem;
	height: 100%;
	position: absolute;
	top: 0.1rem;
	background: #ddd;
	left: 1.36rem;
}


/*提示*/
#usePortal .prompt{
	position: fixed;
	bottom: 0.1rem;
    left: 1.2rem;
	width: 4rem;
	height: 0.66rem;
	line-height: 0.66rem;
	text-align: center;
	font-size: 0.26rem;
	color: rgba(51, 51, 51, 0.94);
	border: 1px solid;
	background: rgba(255, 193, 7, 0.94);
}
#usePortal .academyAxis .academyItem {
	position: relative;
	padding-top: 0.1rem;
}

#usePortal .academyAxis .academyItem .dateNode {
	height: 0.22rem;
    width: 0.22rem;
    position: absolute;
    top: 0.4rem;
    left: 1.26rem;
    border-radius: 50%;
}

#usePortal .academyAxis .academyItem .grayColor {
	background: #ddd;
}

#usePortal .academyAxis .academyItem .greenColor {
	background: rgba(102, 249, 10, 0.87);
}

#usePortal .academyAxis .academyItem .redColor {
	background: red;
}

#usePortal .academyAxis .academyItem .remark {
	width: 4rem;
	float: left;
	margin-left: 0.5rem;
	margin-top: 0.4rem;
}

#usePortal .academyAxis .academyItem .remark .academyText {
	width: 4.2rem;
	float: left;
}
#usePortal .academyAxis .academyItem .remark .academyText p{
	float: left;
	font-size: 0.26rem;
	margin-right: 0.18rem;
}
/*旗子样式*/

#usePortal .academyAxis .academyItem .remark .icon-1218biaoqianhongqi {
	position: absolute;
    top: 40%;
    right: 4%;
	font-size: 0.4rem;
	color: #ddd;
}

#usePortal .academyAxis .academyItem .remark .icon-1218biaoqianhongqi.flagRed {
	color: red;
}
/*popup样式*/

#usePortal .mint-popup {
	width: 100%;
    height: 100%;
}

#usePortal .mint-popup .guideMap {
	width: 100%;
	height: 100%;
	font-size: 0.28rem;
	/*overflow: hidden;*/
}
#usePortal .mint-popup .guideMap .mapImg{
	position: absolute;
	top: 0;
	bottom: 0;
}
#usePortal .mint-popup .guideMap .mapImg img{
	width: 100%;
	height: 100%;	
}
/*#usePortal .mint-popup .guideMap .guideMap-title {
	font-size: 0.3rem;
	text-align: center;
	margin: 0.2rem 0;
}*/

/*#usePortal .mint-popup .guideMap .guideMap-text {
	text-indent: 0.4rem;
}*/

#usePortal .mint-popup .icon-guanbi {
	font-size: 0.5rem;
    position: absolute;
    top: -0.34rem;
    right: -0.26rem;
    color: #25c4ff;
    border: 1px solid;
    border-radius: 50%;
}
</style>