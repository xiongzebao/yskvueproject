<template>
  <div id="Admissionquery">
  	<mt-header fixed title="录取院校选择">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
    <div class="queryContent">
    	<div class="search margin">
    		<div class="icon"></div>
    		<!--选择学校-->
    		<div class="select" v-if="schoolList.length==0">暂时没有查询的学校</div>
    		<div class="select" v-else v-tap="{methods:choseSchool}">{{school}}</div>
    		
    	</div>
    	<div class="search">
    		<div class="icon"></div>
    		<!--选择考试-->
    		<div class="select" v-if="schoolList.length==0">暂时没有查询的考试</div>
    		<div class="select" v-else v-tap="{methods:choseExam}">{{exam}}</div>
    	</div>
    	
	    <div v-tap="{methods:handleTouch}" class="btn">查询</div>
    </div>
    <Loading v-show="loading"></Loading>
    
    <mt-popup v-model="schoolModel">
    	<div class="title">选择学校</div>
		  <mt-radio
			  v-model="schoolName"
			  :options="schoolArr">
			  
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
		<mt-popup v-model="examModel">
    	<div class="title">选择考试</div>
		  <mt-radio
			  v-model="examName"
			  :options="examArr">
			  
			</mt-radio>
			<mt-button class="confirm" v-tap="{methods:hendleChose}" type="primary" size="normal">确定</mt-button>
		</mt-popup>
  </div>
</template>
<script>
	import Vue from 'vue';
	import { Toast,Popup,Radio } from 'mint-ui';
	import Loading from '../public/Loading.vue';

	Vue.component(Popup.name, Popup);
	Vue.component(Radio.name, Radio);
	
	import VueBus from 'vue-bus';
	import VueDND from 'awe-dnd';
	Vue.use(VueDND)
	Vue.use(VueBus);
	export default {
	  name: 'Admissionquery',
	  data () {
	    return {
	    	schoolList:[],//录取院校列表查询
	    	schoolArr:[],//学校数组
	    	schoolName:'',//学校展示
	    	school:'选择查询院校',//学校
	    	exam:'选择考试',//专业
	    	examList:[],//考试数组
	    	examArr:[],
	    	examName:'',
	    	schoolId:'',//学校id
	    	examId:'',//考试Id
	    	datas:'',
	    	schoolModel:false,//学校弹出层
	    	examModel:false,//考试弹出层
				loading:true
	    }
	  },
	  components:{
			Loading:Loading
		},
		created(){
			this.basicDatas();
		},
		watch:{
			//监听学校id
       schoolName:function(curVal,oldVal){
					var that = this;
					this.school = curVal.split(',')[0];
					this.schoolId = curVal.split(',')[1];
					for(var i in this.schoolList){
						if(this.schoolId==this.schoolList[i].xueXiaoID){
							that.examList = this.schoolList[i].examList;
							for(var j in that.examList){
								var kaoshiId = that.examList[j].kaoShiMC+','+that.examList[j].kaoShiID;
								that.examArr.push({
									label:that.examList[j].kaoShiMC,
									value:kaoshiId
								})
							}
						}
					}
　　　　	},
			examName:function(n,o){
				console.log(n)
				this.exam = n.split(',')[0];
				this.examId = n.split(',')[1];
			}
   },
	  methods:{
	  	_Toast(mes){
	  		Toast({
					message: mes,
					position: 'middle',
					duration: 3000
				})
	  	},
	  	basicDatas(){
	  		var that = this;
		  	/*录取院校列表查询*/
				ajaxMethod.doAjax("aftexam,/api/m/auth/mtc/queryMtcSchool.htm",{},function(d){
					console.log(d)
					if(d.success){
						if(d.datas.list.length>0){
							that.schoolList=d.datas.list;
							for(var i in that.schoolList){
								/*学校名称和id*/
								var xueXiaoId = ''+that.schoolList[i].xueXiaoMC+','+that.schoolList[i].xueXiaoID;
								
								that.schoolArr.push({
									label:that.schoolList[i].xueXiaoMC,
									value:xueXiaoId
									
								})
							}
						}else{
							that.schoolModel=false;//学校弹出层
	    				that.examModel=false;//考试弹出层
						}
					}else{
						that._Toast(d.message);
					}
				},function(){
						that.loading=false;
				})
	  	},
	  	hendleChose(){//关闭模态
	  		this.schoolModel = false;
	  		this.examModel = false;
	  	},
	  	choseSchool(){//选择学校
	  		this.schoolModel = true;
	  	},
	  	choseExam(){//选择考试
	  		if(this.schoolId==null||this.schoolId==''){
					this._Toast('请选择学校');
					return ;
				}
	  		this.examModel = true;
	  	},
	  	handleTouch(){
				var that = this;
				if(that.schoolId==null||that.schoolId==''){
					that._Toast('请选择学校');
					return ;
				}
				if(that.examId==null||that.examId==''){
					that._Toast('请选择考试');
					return ;
				}
				if(this.schoolList.length>0){
					
					var d={
						"schoolId": this.schoolId, 
						"examId": this.examId 
					};
					console.log(d)
					/*录取查询结果*/
					ajaxMethod.doAjax("aftexam,/api/m/auth/mtc/query.htm",d,function(d){
						console.log(d)
						if(d.success){
							that.datas=d.datas.obj;
							if(that.datas!=null){
								if(!that.datas.matricFlag){//没有录取信息
										that.$router.push('/Noadmission') 
									}else if(that.datas.matricFlag==1){//拟录取
										that.$router.push({path:'Admission',query:that.datas})
									}else if(that.datas.matricFlag==2){//未录取
										that.$router.push('/Noadmission'); 
									}
							}else{
									that.$router.push('/Noadmission') 
							}
						}else{
							that._Toast(d.message);
						}
					})	
				}
			}
	  }
	}
</script>
<style scoped>
#Admissionquery{
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: hidden;
}
#Admissionquery .queryContent{
	width: 74%;
	height: 30%;
	margin: 46% auto 0;
}
#Admissionquery .queryContent .search{
	width: 100%;
	height: 0.8rem;
	border: 1px solid #25c4ff;
	display: flex;
	flex-grow: 1;
	background: #F4F4F4;
	border-radius:0.1rem;
}
#Admissionquery .queryContent .margin{
	margin-bottom: 16%;
}
#Admissionquery .queryContent .search .icon{
	width: 20%;
	height: 100%;
	background: #25c4ff;
	background-image: url(../../../static/img/icon.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 50% 50%;
	border-radius: 0.1rem 0 0 0.1rem;
}
#Admissionquery .queryContent .search .select{
	width: 72%;
	height: 100%;
	font-size: 0.28rem;
	color: #999999;
	line-height: 0.8rem;
	padding-left: 3%;
	background:url(../../../static/img/xiala.png);
	background-size: 9% 22%;
	background-position: right;
	background-repeat: no-repeat;
  overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
#Admissionquery .queryContent .search i{
	display: block;
	width: 8%;
	height: 100%;
}
#Admissionquery .queryContent .btn{
	width: 98%;
	height: 22%;
	color: #fff;
	font-size: 0.28rem;
	text-align: center;
	line-height: 0.8rem;
	margin-top: 20%;
	background: #25c4ff;
}
#Admissionquery .mint-popup{
  width: 80%;
	max-height: 5rem;
	font-size: 0.28rem;
	overflow-y: scroll;
}
#Admissionquery  .mint-popup .title{
	font-size: 0.3rem;
    padding: 0.2rem;
    display: block;
    color: #888;
    text-align: center;
    margin: 0;
    background: #f4f4f4;
}
#Admissionquery  .mint-popup .confirm{
	width: 80%;
	height: 0.66rem;
	font-size: 0.28rem;
	margin: 0.2rem 0.5rem;
}
#Admissionquery  .mint-popup .mint-radiolist-label{
	display: flex;
    align-items: center;
}
</style>














