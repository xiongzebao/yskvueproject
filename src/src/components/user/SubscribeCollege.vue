<template>
	<div id="SubscribeCollege">
       	<mt-header class="header" title="订阅报名院校">
            <router-link  to="/Myservice" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
      	</mt-header>
		<div class="collegeList" slot="content">
			<mt-checklist
        :max="20"
			  v-model="checkDisabled"
			  :options="propschool">
			</mt-checklist>
		</div>
		<div class="Subscribe clear">
			<div class="free">合计：{{serviceCharge}}元</div>
            <mt-button v-tap="{methods:confirmSub}" class="confirmSub" type="primary" size="normal">
            	确认订阅
            </mt-button>
		</div>
		<datenote v-show='datalength' dataNoteMessage='暂时没有订阅的院校'></datenote>
    <Loading v-show="loading"></Loading>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { MessageBox } from 'mint-ui';
	import Loading from '../public/Loading.vue';
	import Datenote from '../public/DataNote.vue';
	import { Button,Checklist,Toast } from 'mint-ui';
	
	Vue.component(Checklist.name, Checklist);
	Vue.component(Button.name, Button);
	export default {
		name:'SubscribeCollege',
		components:{
			Loading:Loading,
			Datenote:Datenote
		},
		data(){
			return {
				schoolList:'',//院校列表原始数据
				recordList:'',//已订阅院校列表
				disableSchool:'',//已选择院校
				checkDisabled:[],/*用户选择数据*/
				schoolArr:[],/*学校展示数据*/
        propschool:[],
        newSchoolList:[],//当前新增院校的数组
				dataList:'',//页面整条数据
        newSchoolArr:'',/*去掉订阅*/
       	serviceCharge:0,//应交的金额
        schollPrice:{price:'',fees:''},/*记录单价,总价*/

				datalength:false,
				loading:true,
			}
		},
		mounted(){
         this.chooseValueArr=[];
			let that = this;
			//订阅院校列表
			ajaxMethod.doAjax("befexam,/api/m/auth/helper/schooltipset/tipset_query.htm",{},function(database){
				console.log(database);
				if(database.success){
          /*单价*/
          that.dataList=database.datas.obj;
					if(that.dataList.schoolList.length!=0){
            that.schollPrice.price=that.dataList.fee;
            that.schollPrice.fees=that.dataList.feeLimit;
						that.datalength = false;
						that.schoolList = that.dataList.schoolList;/*原始学校数据*/

						that.recordList = that.dataList.recordList;/*订阅院校*/
            for(var index in that.schoolList){
                /*后面不仅需要学校名称，还要id*/
                let valueString={
                  'xueXiaoMC':that.schoolList[index].xueXiaoMC,
                  'xueXiaoID':that.schoolList[index].xueXiaoID
                };
                that.schoolArr.push({
  								label:that.schoolList[index].xueXiaoMC,
  								value:JSON.stringify(valueString) 
  							})
                };
                that.propschool = that.schoolArr.slice();
                /*有订阅院校做默认选中处理*/
                if(that.recordList.length>0){
                    for(var index in that.recordList){
                       	let valueString={
                          	'xueXiaoMC':that.recordList[index].xueXiaoMC,
                          	'xueXiaoID':that.recordList[index].xueXiaoID
                        };
                       	that.chooseValueArr.push({
  							label:that.recordList[index].xueXiaoMC,
						value:JSON.stringify(valueString) 
				   });
                that.checkDisabled.push({
									label:that.recordList[index].xueXiaoMC,
									value:JSON.stringify(valueString) 
  							})  
            };
            /*订阅过的学校数据增加禁用*/
            for(let i =0, len = that.checkDisabled.length; i < len; i++){
                for(let j = 0; j < that.schoolArr.length; j++){
                    if(that.checkDisabled[i].label==that.schoolArr[j].label){
                        that.schoolArr[j].disabled=true;
                    }
                }
           }
              for(var d in that.schoolArr){
                	if(that.schoolArr[d].disabled){
                  	let dele=that.propschool.splice(d,1);
                  	that.propschool.unshift(dele[0]);
                	}
              }
            	for(var a in  that.chooseValueArr){
                	that.checkDisabled[a] = that.chooseValueArr[a].value;
            	}
        		}
					}else{
						that.datalength = true;
					}
				}else{
					that.datalength = true;
					Toast({
						message: database.message,
						position: 'middle',
						duration: 3000
					});
				}
			},function(){
				that.loading=false;
			});
		},
		watch:{
			//判断选择学校从而确定交费金额
	    checkDisabled:{
		　　handler(curVal,oldVal){
            console.log(curVal)
					this.getSchoolList(curVal);
					//订阅院校的交费处理
					let recordSize = this.recordList.length;//已订阅学校长度
                    let nowRecordList=curVal.length;//已订阅跟现在新增的订阅院校总的长度
                    let needPayList=nowRecordList-recordSize;//新增订阅院校的长度
					let Price = this.schollPrice.price;//单价
					let upperLimit = this.schollPrice.fees;//上限金额
                    if(recordSize>0){
                        if(recordSize*Price>upperLimit){//如果之前订阅的金额已达上限了，后面订阅的就不用交钱了
                            this.serviceCharge = 0;
                        }else if(nowRecordList*Price>upperLimit){
                       	//已订阅和现在新增订阅的总金额大于上限，用上限减去之前订阅的等于现在应交金额
                            this.serviceCharge =(upperLimit*100-recordSize*100*Price)/100;  
                        }else{
                            this.serviceCharge =needPayList*Price; 
                        }
                    }else{
                        if(needPayList>0){
                            if (needPayList*Price > upperLimit){
                                this.serviceCharge = upperLimit;
                            }else{
                                this.serviceCharge =needPayList*Price;
                                console.log(this.serviceCharge)
                            }
                        }else{
                            this.serviceCharge = 0;
                        }
                    }
                 	if(needPayList!=0){
                   	if(curVal.length==20){
                      MessageBox({
                        title:'温馨提示',
                        message:'最多允许订阅20所院校！',
                        confirmButtonText:'知道了',
                        showCancelButton:true
                      });
                    };
                 	}
		　　　　　	},
				  deep:true
	　　　}  
	   	},
		methods:{
			getSchoolList(curVal){//除去已订阅的院校
				var newRecord = curVal.slice();
				var that = this;
				for(var i in that.recordList){
					for(var j in newRecord){
						let newSchool=JSON.parse(newRecord[j]);
						if(newSchool.xueXiaoMC==that.recordList[i].xueXiaoMC){
							newRecord.splice(j,1);
						}
					}
				}
				this.newSchoolList = newRecord;
				console.log(this.newSchoolList)
			},
			confirmSub(){//确认订阅按钮
				var that = this;
        let recordListLen=this.recordList.length;/*订阅院校长度*/
        let chooseListLen=this.checkDisabled.length;/*选中院校的长度*/
        if(recordListLen>0){
            if(chooseListLen==recordListLen){//重复订阅院校
                 MessageBox({
                    title:"温馨提示",
                    message:"您的院校尚未添加",
                    cancelButtonText:'以后再说',
                    confirmButtonText:'马上添加',
                    showCancelButton:true
                }).then(action => {
                    if(action=='cancel'){
                        this.$router.push('/usePortal');
                    }
                });
            }else if(chooseListLen>recordListLen){//新增订阅院校
                let urlParams={
                    school:this.newSchoolList,/*学校*/
                    serviceCharge:this.serviceCharge,/*费用*/
                   	allowModifyTelephone:that.dataList.allowModifyTelephone,//是否允许修改号码
                   	telephone:that.dataList.telephone
                }
                this.$router.push({path:'/Servicesub',query:{dataStr:JSON.stringify(urlParams)}})
            }
        }else{//第一次订阅院校
        	
            if(chooseListLen==0){
                MessageBox.alert("请选择订阅的院校", "温馨提示");
                return ;
            }
            let urlParams={
                school:this.newSchoolList,/*学校*/
                serviceCharge:this.serviceCharge,/*费用*/
               	allowModifyTelephone:that.dataList.allowModifyTelephone,//是否允许发送欢迎短信
               	telephone:that.dataList.telephone
            }
            this.$router.push({path:'/Servicesub',query:{dataStr:JSON.stringify(urlParams)}});
        }
			}
		}
		
	}
</script>

<style>
#SubscribeCollege{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	/*overflow: hidden;*/
	background: #fff;
}
#SubscribeCollege .header{
	flex-shrink: 0;
}
#SubscribeCollege #dateNote{
  background: #F4F4F4;
}
#SubscribeCollege .collegeList{
	flex-grow: 1;
    overflow-y: scroll;
}
#SubscribeCollege .collegeList .mint-cell{
	background-color: #fff;
}
#SubscribeCollege .collegeList .mint-checklist-title{
	margin: 0;
}
#SubscribeCollege .Subscribe{
	flex-shrink: 0;
	width: 100%;
    background: #F4F4F4;
    overflow: hidden;
    font-size: 0.28rem;
    padding: 0.1rem 0;
}
#SubscribeCollege .Subscribe .free{
	float: left;
	margin-left:0.4rem;
    color: red;
    height: 0.8rem;
    line-height: 0.8rem;
}
#SubscribeCollege .Subscribe .confirmSub{
	float: right;
	height: 0.66rem;
	font-size: 0.28rem;
	line-height: 0.66rem;
    margin-right: 0.4rem;
    margin-top: 0.08rem;
}
</style>