<template>
	<div id="NewaddRemind" v-show="addRemind_hid">
		<mt-header fixed title="艺考助手">
		  	<div slot="left" v-tap="{methods:Goback}">
                <mt-button icon="back"></mt-button>
          	</div>
		</mt-header>
		<div class="addRemind" :id="rootId">
			<p>添加自定义提醒</p>
			<div class="setRemind">
				<div class="setType clear">
					<span>类型：</span>
					<div class="chooseDate" v-tap="{methods:typeChoice}">
						{{TypeChose}}
					</div>
				</div>
				<div class="setType clear">
					<span>学校：</span>
					<div class="chooseDate" v-tap="{methods:schoolChoice}">
						{{schoolList}}
					</div>
				</div>
				<div class="setType clear">
					<span>考试：</span>
					<div class="chooseDate" v-tap="{methods:examChoice}">
						{{examChose}}
					</div>
				</div>
				<div class="setType clear">
					<span>考点：</span>
					<div class="chooseDate" v-tap="{methods:kaoDianChoose}">
						{{siteChose}}
					</div>
				</div>
				<div class="setType clear">
					<span>专业：</span>
					<div class="chooseDate" v-tap="{methods:chooseProf}">
						{{profChose}}
					</div>
				</div>
				<div class="setType clear">
					<span>日期：</span>
					<div class="chooseDate" v-tap="{methods:dateChoose}">
						{{dayDate}}
					</div>
				</div>
				<div class="setType clear">
					<span>备注：</span>
					<textarea class="tipContent" placeholder="请填写提醒内容">
						
					</textarea>
				</div>
				<div class="setType clear">
					<mt-button v-tap="{methods:Addremind}" type="primary" size="small">添加</mt-button>
				</div>
			</div>
		</div>
		<div class="Instructions">
			<p class="useInstruction">使用说明：</p>
			<p class="Remind">1、考生可在此界面管理不在平台报名院校的日程提醒</p>
			<p class="Remind">2、点击‘+’可以自定义添加提醒项目</p>
			<p class="Remind">3、在已保存列表点击 ‘-’ 删除已保存的提醒项目</p>
		</div>
		<!--选择类型-->
		<mt-popup class="custom"
		  	v-model="choicetypeList">
		  	<div class="title">选择提醒类型</div>
		  	<mt-radio v-model="chooseType" :options="typeList_show">
			  	
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
		<!--选择学校-->
		<mt-popup class="custom"
		  	v-model="choiceList">
		  	<div class="title">选择学校</div>
		  	<mt-radio v-model="chooseSchool"
			  	:options="schoolDatas">
			  	
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
		<!--选择考试-->
		<mt-popup class="custom"
		  	v-model="examShow">
		  	<div class="title">选择考试</div>
		  	<mt-radio v-model="chooseExam"
			  	:options="examList_show">
			  	
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
		<!--选择考点-->
		<mt-popup class="custom"
		  	v-model="testCenterShow">
		  	<div class="title">选择考点</div>
		  	<mt-radio v-model="chooseExamSite"
			  	:options="examSiteList_show">
			  	
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
		<!--选择专业-->
		<mt-popup class="custom"
		  	v-model="ProfListShow">
		  	<div class="title">选择专业</div>
		  	<mt-radio v-model="chooseProfList" 
			  	:options="ProfList_show">
			  	
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
		<!--日期选择-->
		<mt-datetime-picker ref="starPicker" type="date" :startDate='startDate' year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"  @confirm="starConfirm" class='birthday-ymd'>
		</mt-datetime-picker>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { MessageBox,Toast,Popup } from 'mint-ui';
	import { DatetimePicker,Button } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import VueBus from 'vue-bus';
	
	Vue.use(VueBus);
	Vue.component(Button.name, Button);
	Vue.component(Popup.name, Popup);
	Vue.component(DatetimePicker.name, DatetimePicker);
	export default {
		name:'NewaddRemind',
		computed:{
		    rootId:function(){
		      return 'NewaddRemind'+this.index;
		    }
	   	},
		data(){
			return {
				typeList_show:[],//类型展示
				chooseType:'',//类型选择
				TypeChose:'请选择提醒类型',//类型数据
				
				baseDatas:'',//基础数据
				schoolDatas:[],//学校列表
				chooseSchool:'',//学校选择展示
				schoolList:'请选择学校',//学校数据
				
				examList:[],//考试列表
				examList_show:[],//考试选择展示
				chooseExam:'',//考试选择
				examChose:'请选择考试',//考试数据
				
				examSiteList:[],//考点列表
				examSiteList_show:[],//考点选择展示
				chooseExamSite:'',//考点选择
				siteChose:'请选择考点',//考点数据
				
				examProfList:[],//专业列表
				ProfList_show:[],//专业选择展示
				chooseProfList:'',//专业选择
				profChose:'请选择专业',//专业数据
				
				addRemind_hid:true,//关闭自定义提醒
				choicetypeList:false,//类型弹出层
				choiceList:false,//默认弹出层隐藏
				examShow:false,//考试弹出层
				testCenterShow:false,//考点弹出层
				ProfListShow:false,//专业弹出层
				
				dayDate:this.FormatDate(new Date()),//日期显示
				startDate:new Date(),//设置开始时间
				
				itemID:'',
				itemName:'',
				tipTime:'',
				xuexiaoId:'',//学校Id
				xuexiaoMC:'',//学校名称
				kaoshiId:'',//考试Id
				kaoshiMC:'',//考试名称
				kaodianId:'',//考点Id
				kaodianMC:'',//考点名称
				zhuanyeId:'',//专业Id
				zhuanyeMC:'',//专业名称
			}
		},
		mounted(){
			let that = this;
			this.$bus.on("addEvent",this.onaddRemindEvent);
			//自定义院校基础数据
			let dateUrl = "befexam,/api/m/auth/helper/customtip/get_school_custom.htm";
			ajaxMethod.doAjax(dateUrl,{},function(d){
				console.log(d)
				if(d.success){
					if(d.datas.schoolCustomList!=null){
						that.baseDatas = d.datas.schoolCustomList;
						that.baseDatas.forEach(function(e){
							var xuexiaoId = ''+e.xueXiaoMC+","+e.xueXiaoID;
							that.schoolDatas.push({
								label:e.xueXiaoMC,
								value:xuexiaoId
							})
						})
					}
					//添加提醒类型数组
					if(d.datas.tipItemList){
						d.datas.tipItemList.forEach(function(e){
							var itemId = ''+e.itemName+','+e.itemID
							that.typeList_show.push({
								label:e.itemName,
								value:itemId
							})
						})
					}
				}else{
					Toast({
					  message: d.message,
					  position: 'middle',
					  duration: 3000
					});
				}
			})
		},
		watch:{
			//监听类型
			chooseType:function(n,o){
				this.TypeChose = n.split(',')[0];
				var newType=n.split(",");
				this.itemName = newType[0];
				this.itemID = newType[1];
			},
			//监听学校
			chooseSchool:function(n,o){
				var that = this;
				this.schoolList = n.split(',')[0];
				var newSchool=n.split(",");
				this.xuexiaoId = newSchool[1];
				this.xuexiaoMC = newSchool[0];
				var watch_xuexiaoId=newSchool[1];
				that.examList_show = [];
				this.baseDatas.forEach(function(e){
					if(watch_xuexiaoId == e.xueXiaoID){
						that.examList = e.examList;
						that.examList.forEach(function(value){
							var kaoshiId = ''+value.kaoShiMC+","+value.kaoShiID;
							that.examList_show.push({
								label:value.kaoShiMC,
								value:kaoshiId
							})
						})
					}
				})
			},
			//监听考试
			chooseExam:function(n,o){
				var that = this;
				this.examChose = n.split(',')[0];
				var newExam=n.split(',');
				var watch_kaoshiId=newExam[1];
				this.kaoshiId = newExam[1];
				this.kaoshiMC = newExam[0];
				that.examSiteList_show = [];
				this.examList.forEach(function(e){
					if(watch_kaoshiId == e.kaoShiID){
						that.examSiteList = e.examSiteList;
						that.examSiteList.forEach(function(value){
							var kaodianId = ''+value.kaoDianMC+","+value.kaoDianID;
							that.examSiteList_show.push({
								label:value.kaoDianMC,
								value:kaodianId
							})
						})
					}
				})
			},
			//监听考点
			chooseExamSite:function(n,o){
				var that = this;
				this.siteChose = n.split(',')[0];
				var newExamSite=n.split(',');
				var watch_kaodianId=newExamSite[1];
				this.kaodianId = newExamSite[1];
				this.kaodianMC = newExamSite[0];
				that.ProfList_show = [];
				this.examSiteList.forEach(function(e){
					if(watch_kaodianId == e.kaoDianID){
						that.examProfList = e.examProfList;
						that.examProfList.forEach(function(value){
							var zhuanyeId = ''+value.zhuanYeMC+","+value.zhuanYeID;
							that.ProfList_show.push({
								label:value.zhuanYeMC,
								value:zhuanyeId
							})
						})
					}
				})
			},
			//监听专业
			chooseProfList:function(n,o){
				this.profChose = n.split(',')[0];
				var newProfList=n.split(',');
				this.zhuanyeId = newProfList[1];
				this.zhuanyeMC = newProfList[0];
			}
		},
		methods:{
			Goback(){
				this.$router.go(-1);
			},
			_Toast(megs){
				Toast({
				  message: megs,
				  position: 'middle',
				  duration: 3000
				});
			},
//			onaddRemindEvent(megs){
//				this.addRemind_hid = true;
//			},
			//关闭弹出层操作
			hendleChose(){
				this.choicetypeList = false;//关闭类型
				this.choiceList=false;//关闭学校
				this.examShow=false;//关闭考试
				this.testCenterShow = false;//关闭考点
				this.ProfListShow = false;//关闭专业
			},
			//提醒类型选择
			typeChoice(){
				this.choicetypeList = true;
			},
			//学校选择
			schoolChoice(){
				if(this.itemName==null||this.itemName==''){
					this._Toast('请选择提醒类型！');
				}else{
					this.choiceList = true;
				}
			},
			//考试选择
			examChoice(){
				if(this.xuexiaoMC==null||this.xuexiaoMC==''){
					this._Toast('请选择学校！')
				}else{
					this.examShow = true;
				}
			},
			//考点选择
			kaoDianChoose(){
				if(this.kaoshiMC==null||this.kaoshiMC==''){
					this._Toast('请选择考试！')
				}else{
					this.testCenterShow = true;
				}
			},
			//专业选择
			chooseProf(){
				if(this.kaodianMC==null||this.kaodianMC==''){
					this._Toast('请选择考点！');
				}else{
					this.ProfListShow = true;
				}
			},
			//日期选择
			dateChoose(){//picker打开
				if(this.zhuanyeMC==null||this.zhuanyeMC==''){
					this._Toast('请选择专业！');
				}else{
					this.$refs.starPicker.open();
				}
			},
			//确定日期时间
			starConfirm(choosedTime){
				this.dayDate=this.FormatDate(choosedTime);
			},
			//时间格式转换
			FormatDate(strTime) {
				var date = new Date(strTime);
				var year = date.getFullYear();
				var month = String(date.getMonth() + 1); //转字符
				var day = String(date.getDate());
				month.length == 1 ? month = ("00" + month).substr(-2) : month = month;
				day.length == 1 ? day = ("00" + day).substr(-2) : day = day;
				return year + '-' + month + '-' + day
			},
			Addremind(){//提交添加提醒
				var that = this;
				let id = "#"+this.rootId;
		    	let $root = $(id);
		    	let	tips = $root.find('.tipContent').val();
				if(this.itemName==null||this.itemName==''){
					this._Toast('请选择提醒类型！');
					return ;
				};
				if(this.xuexiaoMC==null||this.xuexiaoMC==''){
					this._Toast('请选择学校！');
					return ;
				};
				if(this.kaoshiMC==null||this.kaoshiMC==''){
					this._Toast('请选择考试！');
					return ;
				}
				if(this.kaoshiMC==null||this.kaoshiMC==''){
					this._Toast('请选择考点！');
					return ;
				}
				if(this.zhuanyeMC==null||this.zhuanyeMC==''){
					this._Toast('请选择专业！');
					return ;
				}
				if(tips==null||tips==''){
					this._Toast('请填写备注！');
					return ;
				}
		    	var params = {
					"xueXiaoID":regularMatch.trim(this.xuexiaoId),
					"xueXiaoMC":regularMatch.trim(this.xuexiaoMC) ,
					"kaoShiID":regularMatch.trim(this.kaoshiId),
					"kaoShiMC":regularMatch.trim(this.kaoshiMC),
					"kaoDianID":regularMatch.trim(this.kaodianId),
					"kaoDianMC":regularMatch.trim(this.kaodianMC),
					"zhuanYeID":regularMatch.trim(this.zhuanyeId),
					"zhuanYeMC":regularMatch.trim(this.zhuanyeMC),
					"itemID":this.itemID,
					"itemName":this.itemName,
					"tipTime":this.dayDate,
					"remark":tips
				}
		    	Indicator.open('加载中...');
		    ajaxMethod.doAjax("befexam,/api/m/auth/helper/customtip/add_customtip_detail.htm",params,function(d){
				if(d.success){
//						that.addRemind_hid = false;
					that.$router.push('AddReminders');
					}else{
						that._Toast(d.message);
					}
				},function(){
                   Indicator.close();
               });
//				
			}
		}
	}
</script>

<style>
#NewaddRemind{
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background: #fff;
}
#NewaddRemind .addRemind{
	width: 100%;
    min-height: 3rem;
    margin-top: 0.8rem;
    border-bottom: 1px solid rgba(51, 51, 51, 0.56);
}
#NewaddRemind .addRemind p{
	font-size: 0.34rem;
	text-align: center;
    padding-top: 0.4rem;
}
/*设置提醒*/
#NewaddRemind .addRemind .setRemind .setType{
	font-size: 0.28rem;
	padding-left: 1rem;
	margin-top: 0.2rem;
}
#NewaddRemind .addRemind .setRemind .setType span{
	float: left;
	font-size: 0.28rem;
}
#NewaddRemind .addRemind .setRemind .setType select{
	float: left;
	width: 2.6rem;
	font-size: 0.28rem;
}
#NewaddRemind .addRemind .setRemind .setType .chooseDate{
	float: left;
	width: 3.2rem;
    height: 0.54rem;
    background: #f4f4f4;
    font-size: 0.26rem;
    text-align: center;
    line-height: 0.54rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#NewaddRemind .addRemind .setRemind .setType textarea{
	width: 3.2rem;
    height: 1rem;
    font-size: 0.28rem;
    border: 0;
    padding-left: 0.1rem;
    background: #F4F4F4;
}
#NewaddRemind .addRemind .setRemind .setType .mint-button{
	width: 2.6rem;
    height: 0.64rem;
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
    margin-left: 1rem;
    padding: 0;
}
#NewaddRemind .Instructions{
	padding-top: 0.3rem;
    padding-left: 0.3rem;
}
#NewaddRemind .Instructions p{
	line-height: 0.4rem;
}  
#NewaddRemind .Instructions .useInstruction{
	font-size: 0.3rem;
	margin-bottom: 0.2rem;
}
#NewaddRemind .Instructions .Remind{
	font-size: 0.25rem;	
}
/*popup样式调整*/
#NewaddRemind  .custom{
	width: 80%;
	font-size: 0.28rem;
}
#NewaddRemind  .custom .title{
	font-size: 0.3rem;
    padding: 0.2rem;
    display: block;
    color: #888;
    text-align: center;
    margin: 0;
    background: #f4f4f4;
}
#NewaddRemind  .custom .mint-radiolist{
    max-height: 4.2rem;
    overflow-y: scroll;
}
#NewaddRemind  .custom .mint-radiolist .mint-radiolist-label{
	display: flex;
    align-items: center;
}
#NewaddRemind  .custom .confirm{
	width: 80%;
    height: 0.66rem;
    font-size: 0.28rem;
    margin: 0.2rem 0.5rem;
}
</style>