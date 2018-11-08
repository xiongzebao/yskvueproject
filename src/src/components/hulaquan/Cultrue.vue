<template>
	<div id="cultrueTest">
		<template v-if='!showShareFlag'>
			<mt-header fixed title="文化分测算">
				<router-link to="/" slot="left">
					<mt-button icon="back"></mt-button>
					<mt-button>关闭</mt-button>
				</router-link>
	</mt-header>
			<div class="culTest" >
			<div class="intro">
				<div class="logo">
					<template v-if='userlogo'>
						<img :src="userlogo" />
					</template>
					<template v-else>
						<img src="../../../static/img/logoo.png" />
					</template>
				</div>
				<div class="nameIntro">{{userNickName}}</div>
				<div class="rechoose">
					<div class="city" v-tap.prevent="{ methods : chosecity}">
						<div>高考省份</div>
						<div class="choose">{{chooseCity}}
							<i class="mintui mintui-back roight"></i>
						</div>

					</div>
					<div class="class" v-tap.prevent="{ methods : choseclassWay}">
						<div>文理科</div>
						<div class="choose">{{chooseClass}}
							<i class="mintui mintui-back roight"></i>
						</div>
					</div>
				</div>

			</div>
			<div class="choose">
				<ul>
					<li v-tap="{ methods : popupScoWay}">
						<div class="base">选择院校</div>
						<div class="choosescholl">
							<p>{{schoolVaule}}</p>
							<i class="mintui mintui-back sright"></i>
						</div>
					</li>
					<li v-tap="{ methods : popupMajorWay}">
						<div class="base">专业</div>
						<div class="choosescholl">
							<p>{{majorlVaule}}</p>
							<i class="mintui mintui-back sright"></i>
						</div>
					</li>
					<li>
						<div class="base">专业分数</div>
						<input type="tel" class="choosescholl" placeholder="请输入专业成绩" maxlength="6" v-model="majorScore" />
					</li>
				</ul>
				<template>
					<div class="testResultloding" v-tap="{ methods : starTest}" v-if="startAjax">
						<div class="go">测算中</div>
						<div class="loading">
							<mt-spinner type="fading-circle" color="#26a2ff">
							</mt-spinner>
						</div>
					</div>
					<div class="testResult" v-tap="{ methods : starTest}" v-else>
						测算
					</div>
				</template>

			</div>
			<div class="result">
				<p>文化课最低线要求</p>
				<ul>
					<li v-for='item in cultrueData.list'>{{item.yearNum}}年需要文化分数: {{ item.expectScore }}</li>
				</ul>
				<div class="average">平均:{{cultrueData.obj}}</div>
			</div>
		</div>
		</template>
		<!--高考省份的选择-->
		<mt-popup v-model="popuProv" position="bottom" class="mint-pop-province" :closeOnClickModal="false" pop-transition='popup-fade'>
			<mt-picker :slots="cityslots" @change="cityValuesChange" valueKey="text" :showToolbar='true' ref='picker'>
				<span class="mint-datetime-action mint-datetime-cancel" v-tap="{ methods : provinceCancle}">取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" v-tap="{ methods : provinceConfirm}">确定</span>
			</mt-picker>
		</mt-popup>
		<!--文理科选择-->
		<mt-popup v-model="popuWenli" position="bottom" class="mint-pop-wenli" :closeOnClickModal="false" pop-transition='popup-fade'>
			<mt-picker :slots="classlots" @change="classValuesChange" :showToolbar='true'>
				<span class="mint-datetime-action mint-datetime-cancel" v-tap="{ methods : wenliCancle}">取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" v-tap="{ methods : wenliConfirm}">确定</span>
			</mt-picker>
		</mt-popup>
		<!--学校的选择-->
		<mt-popup v-model="popupSco" position="bottom" class="mint-pop-popupSco" :closeOnClickModal="false" pop-transition='popup-fade'>
			<mt-picker :slots="choosesco" @change="scoValuesChange" valueKey="text" :showToolbar='true'>
				<span class="mint-datetime-action mint-datetime-cancel" v-tap="{ methods : xuexiaoCancle}">取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" v-tap="{ methods : xuexiaoConfirm}">确定</span>
			</mt-picker>
		</mt-popup>
		<!--专业的事件-->
		<mt-popup v-model="popupMajor" position="bottom" class="mint-pop-popupMajor" pop-transition='popup-fade' :closeOnClickModal="false" :showToolbar='true'>
			<mt-picker :slots="chooseMajor" @change="MajorValuesChange" :showToolbar='true'>
				<span class="mint-datetime-action mint-datetime-cancel" v-tap="{ methods : zhuanyeCancle}">取消</span>
				<span class="mint-datetime-action mint-datetime-confirm" v-tap="{ methods : zhuanyeConfirm}">确定</span>
			</mt-picker>
		</mt-popup>
		<!--第一次弹出省份和文理科-->
		<mt-popup v-model="firstPopup" position="middle" class="mint-pop-firstChoose" :closeOnClickModal=false pop-transition='popup-fade'>
			<div id="firstTest">
				<p class="none"></p>
				<h4>请选择以下信息</h4>
				<div class="rechoose">
					<div class="city" v-tap="{ methods : chosecity}">
						<div class="base">高考省份</div>
						<div class="choose">{{chooseCity}}<i class="mintui mintui-back roight"></i>
						</div>

					</div>
					<div class="class" v-tap="{ methods : choseclassWay}">
						<div class="base">文理科</div>
						<div class="choose">{{chooseClass}}
							<i class="mintui mintui-back roight"></i>
						</div>
					</div>
				</div>
				<div class="gotest" v-tap="{ methods : goNextest}">去测算</div>
			</div>
		</mt-popup>

		<Loading v-show="loading"></Loading>
		<Share :fatherDate='chilData' v-if='showShareFlag'></Share>
	</div>
</template>
<script>
	import Vue from 'vue';
//	import { Header } from 'mint-ui';
//	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui';
//	import { Picker } from 'mint-ui';
//	import { Spinner } from 'mint-ui';
//	import { Popup } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
    import { Indicator } from 'mint-ui';
	import { ProvinceData } from "./../public/provincedata.js";
	import Loading from '../public/Loading.vue'
	import Share from './Share.vue'
//	Vue.component(Popup.name, Popup);
//	Vue.component(Spinner.name, Spinner);
//	Vue.component(Picker.name, Picker);
//	Vue.component(Button.name, Button);
//	Vue.component(Header.name, Header);
	var db = {
		/*传入提示信息，默认5000，位置中部*/
		toast: function(message) {
			Toast({
				message: message,
				position: 'middle',
				duration: 3000
			});
		}
	}
	var Scorereg = /^[1-9]{1}\d*(\.\d{1,2})?$/;
	export default {
		name: "cultrueTest",
		data() {
			return {
				userNickName: '艺考升用户',
				userlogo: '',
				cultrueData: "",
				chilData: '', //控制分享显示数据和标志
				showShareFlag: false, //
				chooseCity: "请选择",
				chooseClass: "不分文理",
				popuProv: false,
				popuWenli: false,
				popupSco: false,
				startAjax: false,
				popupMajor: false,
				loading: true,
				firstPopup: true,
				provinceTextTemp: '',
				provinceIdTemp: '',
				zhuanyeTemp: '',
				wenlitemp: '',
				xuexiaoTemp: '',
				schoolVaule: "请选择",
				provinceId: '',
				schoolIdtemp: '',
				schoolId: '',
				majorlVaule: "请选择",
				majorScore: '',
				choosesco: [{
					flex: 1,
					valueKey: 'text',
					values: [{
						'text': ' ',
						'schoolId': ' '
					}],
					className: 'choosesco',
					textAlign: 'center'
				}],
				cityslots: [{
					flex: 1,
					valueKey: "text",
					values:[],
					className: 'cityslots',
					textAlign: 'center'
				}],
				classlots: [{
					flex: 1,
					values: ['不分文理', '文科', '理科'],
					className: 'classlots',
					textAlign: 'center'
				}],
				chooseMajor: [{
					flex: 1,
					values: ['请选择'],
					className: 'chooseMajor',
					textAlign: 'center'
				}]
			}
		},
		computed: {
			dataLength: function() {
				return this.data.length == 0
			}
		},
		components: {
			Loading: Loading,
			Share: Share
		},
		methods: {
			
			chosecity: function() {
				this.cityslots[0].values=ProvinceData;
				this.popuProv = true;
			},
			/*省份的事件*/
			provinceCancle: function() {
				this.popuProv = false;
			},
			provinceConfirm(value) {
				
//				console.log(this.$refs.picker.getValues())
				this.popuProv = false;
//				console.log(this.provinceTextTemp)
				this.chooseCity = this.provinceTextTemp;
				this.provinceId = this.provinceIdTemp;
			},
			cityValuesChange: function(picker, values) {
				if(values[0]){
					if(values[0].text){
						this.provinceTextTemp = values[0].text;
						this.provinceIdTemp = values[0].provinceid;
					}
					
				}
				
			},
			/*文理科选择事件*/
			choseclassWay: function() {
				this.classlots[0].values=['不分文理', '文科', '理科'];
				this.popuWenli = true;
			},
			classValuesChange: function(picker, values) {
				this.wenlitemp = values[0];
			},
			wenliCancle: function() {
				this.popuWenli = false;
			},
			wenliConfirm: function() {
				this.popuWenli = false;
				this.chooseClass = this.wenlitemp;
			},
			/*学校的事件*/
			scoValuesChange: function(picker, values) {
				if(values[0]){
					this.xuexiaoTemp = values[0].text;
					this.schoolIdtemp = values[0].schoolId;
				}
				

			},
			xuexiaoCancle: function() {
				this.popupSco = false;
			},
			xuexiaoConfirm: function() {
				this.popupSco = false;
				this.schoolVaule = this.xuexiaoTemp;
				this.schoolId = this.schoolIdtemp;
				/*获取专业*/
                Indicator.open('加载中...');
				if(this.schoolId) {
					var data = {
						schoolID: this.schoolId
					}
					var that = this;
					ajaxMethod.doAjax("hulaquan,/api/m/hulaquan/user/cultureCalculate/loadProfData.htm", data, function(classdata) {
						if(classdata.success) {
							let data = classdata.datas.profList;
							that.chooseMajor[0].values = [];
							for(let i = 0, len = data.length; i < len; i++) {
								that.chooseMajor[0].values.push(data[i].profession);

							}
                          that.majorlVaule=data[0].profession;  
						} else {
							db.toast(classdata.message);
						}
					},function(){
                        Indicator.close();
                    })
				}
			},
			popupScoWay: function() {
				this.popupSco = true;
			},
			/*专业选择*/
			zhuanyeCancle: function() {
				this.popupMajor = false;
			},
			zhuanyeConfirm: function() {
				this.popupMajor = false;
				this.majorlVaule = this.zhuanyeTemp;
			},
			MajorValuesChange: function(picker, values) {
				this.zhuanyeTemp = values[0];

			},
			popupMajorWay: function() {
				this.popupMajor = true;
			},
			/*测算结果*/
			goNextest: function() {
				if(this.chooseCity == "请选择") {
					MessageBox({
						title: '提示信息',
						message: '请输入省份',
					})
				} else {

					this.firstPopup = false;
				}
			},
			starTest: function() {

				var wenliFlag = -1;
				/*
				 * 不选择省份
				 * if(!this.chooseCity){
					dbmethods.toast("请选择省份");
					return ;
				}
				if(!this.chooseClass){
					dbmethods.toast("请选择是否区分文理");
					return ;
				}*/
				if(this.schoolVaule == '请选择' || !this.schoolVaule) {
					db.toast("请选择学校!");
					return;
				}
				if(this.majorlVaule == '请选择' || !this.majorlVaule) {
					db.toast("请选择专业!");
					return;
				}
				if(!Scorereg.test(this.majorScore)) {
					db.toast("请输入6位以内的分数!");
					return;
				}
				if(this.chooseClass == '不分文理') {
					wenliFlag = '0';
				} else if(this.chooseClass == '文科') {
					wenliFlag = '1';
				} else {
					wenliFlag = '2';
				}
				var data = {
					province: this.provinceId,
					artsOrScience: wenliFlag,
					schoolID: this.schoolId,
					profession: this.majorlVaule,
					professionScore: this.majorScore

				};
				this.startAjax = true;
				var that = this;
				ajaxMethod.doAjax("hulaquan,/api/m/hulaquan/user/cultureCalculate/getScoreCalcuData.htm", data, function(database) {
					if(database.success) {
						that.cultrueData = database.datas;

						var timer = setTimeout(function() {
							MessageBox({
								message: '是否分享?',
								showCancelButton: true
							}).then(function(action) {
								if(action == 'confirm') {
									that.showShareFlag = true;
									that.chilData = {
										userlogo:that.userlogo,
										userNickName:that.userNickName,
										xuexiao: that.schoolVaule,
										fenshu: that.cultrueData.obj
									}

								}
							})
							clearTimeout(timer);
						}, 4000)
					} else {
						db.toast(database.message);
					}

				}, function() {
					that.startAjax = false;
				})
			}

		},
		created() {
			var data = {};
			var that = this;
			if(window.yksapp_user) {
				let userNickName = yksapp_user.getNickName();
				if(userNickName) {
					this.userNickName = userNickName;
					this.userlogo = yksapp_user.getLogo();
				} else {
					/*获取用户的昵称和头像*/
					ajaxMethod.doAjax("hulaquan,/api/m/auth/my/info/get.htm", data, function(infordata) {
						if(infordata.success) {
							let inforData=infordata.datas;
							if(inforData){
								/*昵称存在重新赋值*/
								if(inforData.obj.nickName){
									that.userNickName = inforData.obj.nickName;
					                that.userlogo = inforData.obj.logo;
								}
							}
						} else {
							db.toast(infordata.message);
						}
					})
				}

			}

			/*初始化数据*/
			this.choosesco.values = [
				[{
					'text': '',
					'schoolId': ''
				}]
			];
			/*获取院校列表*/
			
			ajaxMethod.doAjax("hulaquan,/api/m/hulaquan/user/cultureCalculate/loadSchoolData.htm", data, function(dataBase) {
				let data = dataBase.datas.list;
				if(dataBase.success) {
					that.loading = false;
					for(let i = 0, len = data.length; i < len; i++) {
						that.choosesco[0].values.push({
							'text': data[i].schoolName,
							'schoolId': data[i].schoolID
						});
					}
					/*去除第一个设定的默认值*/
					that.choosesco[0].values.shift();
				} else {
					db.toast(dataBase.message);
				}
			})
		}
	}
</script>

<style scoped>
    #cultrueTest{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
	img[src=""] {
		opacity: 0;
	}
	
	#cultrueTest .culTest {
		padding-top: 0.8rem;
		font-size: 0.25rem;
	}
	
	#cultrueTest .culTest .intro {
		height: auto;
		background: #9de5fd;
		overflow: hidden;
		font-size: 0.25rem;
		color: #fff;
	}
	
	#cultrueTest .culTest .intro .logo {
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 100%;
		border: 2px double #08b4fe;
		background: #fff;
		margin: 10px auto;
	}
	
	#cultrueTest .culTest .intro .logo img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	
	#cultrueTest .culTest .intro .nameIntro {
		text-align: center;
		padding: 10px 0;
	}
	
	#cultrueTest .culTest .intro .rechoose {
		overflow: hidden;
		box-sizing: border-box;
		padding: 5px;
	}
	
	#cultrueTest .culTest .intro .rechoose .city {
		float: left;
		overflow: hidden;
	}
	
	#cultrueTest .culTest .intro .rechoose .city div {
		float: left;
		height: 0.35rem;
		display: inline-block;
		line-height: 0.35rem;
	}
	
	#cultrueTest .culTest .intro .rechoose .class div {
		float: left;
		height: 0.35rem;
		display: inline-block;
		line-height: 0.35rem;
	}
	
	#cultrueTest .culTest .intro .rechoose .class {
		float: right;
		overflow: hidden;
	}
	
	#cultrueTest .culTest .intro .rechoose .choose {
		border: 1px solid #fff;
		position: relative;
		margin-left: 5px;
		padding: 0 0.6rem 0 5px;
		background: #9de5fd;
	}
	
	#cultrueTest .culTest .intro .rechoose .roight {
		transform: rotate(-90deg);
		position: absolute;
		right: 5px;
		top: 0;
		line-height: 0.35rem;
		font-size: 0.25rem;
	}
	
	#cultrueTest .culTest .choose {
		background: #fff;
		margin: 0 0 10px 0;
		overflow: hidden;
	}
	
	#cultrueTest .culTest .choose ul li {
		margin: 26px auto;
		overflow: hidden;
		width: 80%;
	}
	
	#cultrueTest .culTest .choose ul li div {
		height: 0.5rem;
		line-height: 0.5rem;
		float: left;
		display: inline-block;
		width: 30%;
	}
	
	#cultrueTest .culTest .choose ul li .base {
		text-align: center;
		color: #313746;
	}
	
	#cultrueTest .culTest .choose ul li .choosescholl {
		width: 60%;
		position: relative;
		border: 1px solid #9d9d9d;
		padding-left: 5px;
		box-sizing: border-box;
		color: #9d9d9d;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.25rem;
	}
	
	#cultrueTest .culTest .choose ul li .choosescholl p {
		width: 80%;
		overflow: hidden;
	}
	
	#cultrueTest .culTest .choose ul li .sright {
		transform: rotate(-90deg);
		position: absolute;
		right: 5px;
		top: 0px;
	}
	
	#cultrueTest .culTest .choose .testResultloding {
		position: relative;
		width: 70%;
		background: #42cefc;
		margin: 20px auto;
		border-radius: 5px;
		color: #fff;
		overflow: hidden;
	}
	
	#cultrueTest .culTest .choose .testResultloding>div {
		text-align: center;
		letter-spacing: 5px;
		float: left;
	}
	
	#cultrueTest .culTest .choose .testResultloding .go {
		width: 55%;
		text-align: right;
		padding: 0.2rem 0;
	}
	
	#cultrueTest .culTest .choose .testResultloding .loading {
		width: 45%;
		padding: 0.2rem 0;
	}
	
	#cultrueTest .culTest .choose .testResult {
		position: relative;
		width: 70%;
		background: #42cefc;
		margin: 20px auto;
		padding: 0.2rem 0;
		border-radius: 5px;
		color: #fff;
		overflow: hidden;
		text-align: center;
		letter-spacing: 5px;
	}
	
	#cultrueTest .culTest .choose .testResult a {
		color: #fff;
	}
	
	#cultrueTest .culTest .result {
		padding: 0 20px;
		box-sizing: border-box;
		background: #fff;
	}
	
	#cultrueTest .culTest .result p {
		text-align: center;
		padding: 20px 0;
		border-bottom: 1px solid #a5a5a5;
	}
	
	#cultrueTest .culTest .result ul li {
		list-style: square inside;
		text-align: left;
		padding: 10px 0;
		border-bottom: 1px solid #a5a5a5;
	}
	
	#cultrueTest .culTest .result .average {
		text-align: right;
		padding: 20px;
		box-sizing: border-box;
	}
	
	#cultrueTest #firstTest .none {
		padding: 0 40px;
		height: 1px;
	}
	
	#cultrueTest .mint-pop-firstChoose {
		width: 80%;
	}
	
	#cultrueTest #firstTest {
		font-size: 0.25rem;
	}
	
	#cultrueTest #firstTest h4 {
		padding: 0.3rem 0;
		text-align: center;
	}
	
	#cultrueTest #firstTest .rechoose {
		overflow: hidden;
	}
	
	#cultrueTest #firstTest .rechoose>div {
		overflow: hidden;
		padding: 10px 0.6rem;
		box-sizing: border-box;
	}
	
	#cultrueTest #firstTest .rechoose .base {
		color: #c8c8c8;
	}
	
	#cultrueTest #firstTest .rechoose>div>div {
		padding: 0 5px
	}
	
	#cultrueTest #firstTest .rechoose .choose {
		border: 1px solid #bfbfbf;
		position: relative;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	
	#cultrueTest #firstTest .rechoose .roight {
		transform: rotate(-90deg);
		position: absolute;
		right: 5px;
		line-height: 0.4rem;
	}
	
	#cultrueTest #firstTest .gotest {
		margin: 20px auto;
		width: 100%;
		text-align: center;
		color: #8be1fd;
	}
	
	#cultrueTest .mint-pop-province,
	#cultrueTest .mint-pop-wenli,
	#cultrueTest .mint-pop-popupSco,
	#cultrueTest .mint-pop-popupMajor {
		width: 100%;
	}
</style>