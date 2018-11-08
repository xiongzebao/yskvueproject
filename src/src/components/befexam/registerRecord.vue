<template>
	<div id="registRecord">
		<mt-header fixed title="我的报考记录">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<pulldown v-if="basedata">
			<ul class="scholl" slot="content">
				<Collegelist  :_item = "item" :index = "index" :key="index" v-for="(item, index) in basedata">
					
				</Collegelist>
				<div class="datenote" v-if="registerMark===4">暂时没有报考信息</div>
			</ul>
		</pulldown>
		<datenote v-show='datalength' dataNoteMessage='暂时没有报考信息'></datenote>
       	<Loading v-show="loading"></Loading>
		<VolunterMajor class="mask" >
					
		</VolunterMajor>
		<!--弹出层-->
		<mt-popup v-model="popupVisblei" position='middle'>
			<div class="confirmTime">
				选择确认时间
			</div>
			<mt-radio v-model="dateVal" :options="RichDate">
				
			</mt-radio>
		    <div class="btnBg">
			    <mt-button class='confirmRc' type="primary" size="normal" 				v-tap.stop="{methods:confirmMajor}">
					确定
				</mt-button>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueDND from 'awe-dnd';
	import Collegelist from './Collegelist.vue';
	import VolunterMajor from './volunterMajor.vue';
	import Loading from '../public/Loading.vue';
	import Datenote from '../public/DataNote.vue';
	import Pulldown from '../public/loadmore.vue';
	import VueBus from 'vue-bus';
	import { Badge } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { MessageBox } from 'mint-ui';

	Vue.use(InfiniteScroll);

	Vue.use(VueDND);
	Vue.use(VueBus);
	Vue.component(Badge.name, Badge);
	
	export default {
		name:'registerRecord',
		data(){
			return {
				basedata:'',
				itemIdx:'',
				RichDate:[],
				dateVal:'',
				registerMark:'',//报考标志
				riChengDate:'',//用户选择的日程
				datalength:false,
				popupVisblei:false,
				profVol:false,
				loading:true
			}
		},
		created(){
			this.$bus.on("pulldown",this.fixdata);
		},
		mounted(){
			this.fixdata();
			this.$bus.on("showTimepopup", this.onshowTimepopup);
		},
		components:{
			Collegelist,
			VolunterMajor,
			Loading:Loading,
			Datenote:Datenote,
			Pulldown:Pulldown
		},
		watch:{
			dateVal:function(n,o){
				this.riChengDate=n.split(',')[0];
			}
		},
		methods:{
			fixdata(){
				var that=this;
				/*个人报考专业查询*/
				var d={
					"includeProfVol":true
				}
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_prof.htm",d,function(d){
					console.log(d)
					if(d.success){
						if(d.datas.list){
							that.datalength=false;
							that.basedata=d.datas.list;
							for(var i in that.basedata){
								that.registerMark = that.basedata[i].baoKaoBZ;
							};
						}else{
							that.datalength=true;
						}
					}else{
						that.datalength=true;
						Toast({
							message: d.message,
							position: 'middle',
							duration: 3000
						});
					}
					},function(){
					that.loading=false;
				})
			},
			/*子组件数据回调函数*/
			onshowTimepopup(idx){
				this.itemIdx = idx;
				var that = this;
				this.RichDate = [];
				this.popupVisblei=true;
				var subUrl = "befexam,/api/m/auth/apply/query_sub_schedule.htm";
				var param={
					"riChengID":this.basedata[idx].riChengID
				}
				ajaxMethod.doAjax(subUrl,param,function(d){
					console.log(d);
					if(d.success){
						that.dataslist=d.datas.list;
						for(var i=0; i<that.dataslist.length; i++){
							var riChengID = ''+that.dataslist[i].profName+','+that.dataslist[i].riChengID;
							that.RichDate.push({
								label:that.dataslist[i].profName,
								value:riChengID
							})
						}
					}else{
						MessageBox({
	                        title: '温馨提示',
	                        message: d.message,
	                        showCancelButton: false
		     			});
					}
				})
			},
			confirmMajor(){//确定专业时间
				var that = this;
				let  $root = $('#Record'+that.itemIdx);
	     		let  confirmBtn = $root.find('.scholl-list .btn .handleBtn .operateBtn');
	     		var examDate = $root.find('.examLayout span');
				this.popupVisblei=false;
				let riChengID = that.dateVal.split(',')[1];
				let saveUrl = "befexam,/api/m/auth/apply/save_exam_time.htm";
				let parm={
					"baoKaoID":this.basedata[this.itemIdx].baoKaoID,
					"riChengID":riChengID
				}
				ajaxMethod.doAjax(saveUrl,parm,function(d){
					console.log(d)
					if(d.success){
						that.fixdata();//跟新数据
						examDate[3].innerHTML=that.riChengDate;
						confirmBtn.text('确认报考');
						that.confimApply();
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
							MessageBox({
	                        	title: '温馨提示',
	                        	message: d.message,
	                        	showCancelButton: false
	                      	})
						}
					}
				})
			},
			confimApply(){
				let that = this;
				that.fixdata();//跟新数据
	     		let  $root = $('#Record'+that.itemIdx);
	     		let  confirmBtn = $root.find('.scholl-list .btn .handleBtn .operateBtn');
	     		let aram = [that.basedata[that.itemIdx].baoKaoID];
	     		let p = {'baoKaoIDs': aram};
	     		let onlineUrl = "befexam,/api/m/auth/apply/commit_online_confirm.htm";
	     		ajaxMethod.doAjax(onlineUrl,p, function(data){
	     			console.log(data)
		     		confirmBtn.css("background-color","#aaa");
	                confirmBtn.attr("disabled","disabled");
	                confirmBtn.text('确认中');
                  	that.updateState(data);
                });
			},
			updateState(data){
				let that = this;
				let  $root = $('#Record'+that.itemIdx);
 				let  confirmBtn = $root.find('.operateBtn');
 				var hedState = $root.find('.state');
		       	var tipView = $root.find('.showReminder');//温馨提示
     			let item = that.basedata[that.itemIdx];
     			if(data.success==true){
     	        //定时器不断刷新，更新状态
                	var timer =   setInterval(function(){
                    var queRenFS  = item.queRenFS;
	                    if(queRenFS!=1&&queRenFS!=2){
	                     var baokaoids = [item.baoKaoID];
	                     var parm = {
	                     	"baoKaoBZ":3,
	                     	"baoKaoIDs":baokaoids
	                     }
	                     //定时器不停请求当前项数据
                     	ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_online_confirm.htm",parm,function(data){
                     		console.log(data)
                               item = data.datas.list[0];//只请求当前项
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
	                if(data.code=="312"){
	                	confirmBtn.css("background-color","#42cefc");
					    confirmBtn.removeAttr("disabled");
			            confirmBtn.text('确认报考');
						MessageBox({
							title:'温馨提示',
							message:data.message,
							showCancelButton: true
						}).then(action => {
							if(action=='confirm'){
								yksapp.goPageWithParams('rzIndex',null);
							}
						});
	                }else{
	                	MessageBox.confirm(data.message).then(action => {
	                		that.fixdata();//跟新数据
	                		// window.location.reload();
						});
	                }
             	}  
			}
		}
	}
</script>

<style scoped>
#registRecord{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#registRecord .scholl{
	background: #f4f4f4;
	height: 100%;
	padding: 0.2rem 0.2rem;
}
#registRecord .scholl .datenote{
	width:100%;
	text-align: center;
	height:0.8rem;
	line-height: 0.8rem;
	background: #fff;
	font-size:0.3rem;
	margin-top:2rem;
    color: #a2a2a2;
	position: absolute;
	margin-left: -0.2rem;
}
/*popup样式更改*/
#registRecord .mint-popup{
	width: 5rem;
}
/*popup头部选择时间样式*/
#registRecord .confirmTime{
	padding: 0.22rem 0;
    text-align: center;
    font-size: 0.32rem;
    margin: 0;
    background: #eee;
}
/*popup底部样式*/
#registRecord .mint-popup .btnBg{
    background: #eee;
    font-size: 0.8rem;
}
/*popup底部确定按钮样式*/
#registRecord .mint-popup .confirmRc{
	width: 4.4rem;
	height:0.76rem;
	font-size: 0.3rem;
	padding: 0 1.54rem;
    margin-bottom: 0.26rem;
    margin-left: 0.3rem;
}
#registRecord .mint-popup .mint-cell .mint-cell-wrapper .mint-cell-title .mint-radiolist-label{
	display: flex;
    align-items: center;
}
</style>