<template>
	<div id = "wishinfopart">
		<div class="label-item">
			<span id="proflabel" v-if="hasWishData">已报志愿</span>
			<span id="proflabel" v-else>志愿选择</span>
		</div>
 
        <section v-if="hasWishData">
			<div v-for="(item, index) in myitem.examWishList" class="wish-item">

					<template v-if="myitem.examCtrl.wishType==1">
						<template v-if="myitem.examWishList.length==1">
							<div class="wish-item-label">志愿:</div>

							<div v-if='item.orieName' class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(0)"> {{item.orieName}} </div>
							<div v-else class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(0)"> {{item.profName}} </div>



						</template>
						<template v-else>
							<div class="wish-item-label">志愿{{index+1}}:</div>
							<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(100+index)">{{item.orieName}} </div>
						</template>
						<!--
					 <div class="wish-item-label" v-if="myitem.examWishList[0].profName!='城市艺术设计'">志愿:</div>
					 <div class="wish-item-value" :class="{'disabled-state':disableWish}">{{myitem.examWishList[0].profName}}</div> 


						<template v-if="myselWish[0].data.zhuanYeMC=='城市艺术设计'">
								<div class="wish-item">
									<div class="wish-item-label">志愿1:</div><div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(100)"> {{wish1.data.show}}</div>
									</div>
								<div class="wish-item">
									<div class="wish-item-label">志愿2:</div><div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(101)">  {{wish2.data.show}} </div>
								</div>
						</template> -->
				 </template>

			     <template v-else-if="myitem.examCtrl.wishType==2">
					 <div class="wish-item-label">第{{numberArray[index]}}志愿:</div> 
					 <div class="wish-item-value" :class="{'disabled-state':disableWish}" >{{item.profName}}</div> 
				 </template>

				 <template v-else-if="myitem.examCtrl.wishType==4">
					 <div class="wish-item-label">第{{numberArray[index]}}志愿:</div> 
					 <div class="wish-item-value" :class="{'disabled-state':disableWish}">{{item.profName+"-"+item.orieName+"方向"}}</div> 
				 </template>
			</div>

		</section>
		<section v-else-if="!hasWishData">
			<template v-if="myitem.examCtrl.wishType==1">

			<!-- 	<template v-if="myselWish.length==1">
					<div class="wish-item-label">志愿:</div>
						<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(0)"> {{myselWish[0].data.show}} </div>

						
				</template>
				<template v-else>

					<div v-for="n in myitem.examCtrl.wishMaxNum" class="wish-item">
						<div class="wish-item-label">志愿${{n+1}}:</div>
						<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(100+n)"> {{myselWish[n-1].data.show}} </div>
					</div> 
				</template>
 -->

	 			<div class="wish-item">
		 			<div class="wish-item-label">志愿:</div>
					<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(1)">{{myselWish[0].data.show}}</div>
				</div>
				<template v-if="myselWish[0].data.show=='城市艺术设计'">
					 	<div  class="wish-item">
							<div class="wish-item-label">志愿1:</div>
							<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(100)">{{wish1.data.show}}  </div>
						</div>
						<div  class="wish-item">
							<div class="wish-item-label">志愿2:</div>
							<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(101)"> {{wish2.data.show}} </div>
						</div>
				</template>

			</template>
			<template v-if="myitem.examCtrl.wishType==2">
			 <div v-for="n in myitem.examCtrl.wishMaxNum" class="wish-item">
					<div class="wish-item-label">第{{numberArray[n-1]}}志愿:</div>
					<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(n)">{{myselWish[n-1].data.show}}</div>
				</div> 
			</template>
			<template v-if="myitem.examCtrl.wishType==3">
			</template>
			 <template v-if="myitem.examCtrl.wishType==4">
				<div v-for="n in myitem.examCtrl.wishMaxNum" class="wish-item">
					<div class="wish-item-label">第{{numberArray[n-1]}}志愿:</div> 
					<div class="wish-item-value arrow" :class="{'disabled-state':disableWish}" @click="showPicker(n)"  :id="'wishindex'+n" > {{myselWish[n-1].data.show}}</div> 
			
				</div>
			 </template>
		</section>


		 <mt-radio
		 v-show="showAdjust"
	 
		  v-model="adjustvalue"
		  :options="options">
		</mt-radio>

		  <mt-popup
		  v-model="popupMajor"
		  position="bottom"
		  class="mint-pop-popupMajor"
		  id="mypopup"
		  visibleItemCount="5"
		  pop-transition='popup-fade'
		  :closeOnClickModal="false"
		  :showToolbar='true'>
		  <mt-picker  :slots="chooseMajor" 
		       @change="MajorValuesChange" 
		       valueKey="show"
		       :showToolbar='true'>
		      <span class="mint-datetime-action mint-datetime-cancel" @click="pickerCancle()">取消</span>
		      <span class="mint-datetime-action mint-datetime-confirm" @click="pickerConfirm()">确定</span>
		     </mt-picker>   
		  </mt-popup>


	</div>

</template>


<script type="text/javascript">
import Vue from 'vue'
import VueBus from 'vue-bus';

Vue.use(VueBus);
import { Radio } from 'mint-ui';
import { Cell } from 'mint-ui';
import { Toast } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(Radio.name, Radio);

import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);



var k=0;

export default{

		props:["item"],
		mounted(){
			this.initData();
			this.initView();
		
		},

		data(){
				return{
				 numberArray:['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四',
				 '十五','十六','十七','十八','十九','二十'],
				//是否服从调剂按钮
				options:[],
				adjustvalue:"",
			 	showAdjust:true,

			 	//选择志愿
			 	chooseMajor:[{
          				flex: 1,
          				values: [],
          				className: 'slot1',
          				textAlign: 'center'
        			}],
      			popupMajor:false,
      			pickerValue:"",
      			//志愿数据
      			proflist:"",
      			hasWishData:false,
      			datas:"",
      			selWish:[],
      			iindex:0,
      			clickItemIndex:0,
      			currentSelItem:"",
      			wish1:{selected:false,data:{show:""}},
      			wish2:{selected:false,data:{show:""}},

      			canClick:true,
      			commited:false,
      			firstInto:true,

      			disableRadio:false,
      			disableWish:true,
			}
		},

		computed:{

			myitem:function(){
				 
			 
				return this.item.datas;
			},

			myselWish:{
				get:function(){
				 
		  		 	for (var i = 0; i < this.myitem.examCtrl.wishMaxNum; i++) {
		             let t ={selected:false,data:{zhuanYeMC:"专业名称",show:""}};
		             this.selWish.push(t);
		        	}
		         
		     
	        		return this.selWish;
				},
				set:function(t){
				 
					this.selWish[t.index]=t.item;
				 
				}	
  			}
		
		},

		methods:{
			initData(){
	    			this.$bus.on("wishModify",this.modify);
					this.$bus.on("wishCommit",this.commit);
					this.options = [
						  {
						    label: '服从调剂',
						    value: 'valueA',
						     disabled: false,

						  },
						  {
						    label: '不服从调剂',
						    value: 'valueB',
						    disabled: false,
						  }
						];
					this.datas = this.item.datas;
					if(this.myitem.examWishList.length==0){
						this.hasWishData = false;
						this.disableWish = false;
					}else{
						this.hasWishData = true;

						this.disableWish = true;
				   		this.options[0].disabled=true;
				  		this.options[1].disabled=true;


				  		this.adjustvalue=this.myitem.wishStudent.isAdjust===1?'valueA':'valueB';
					}
					this.initWishOptionData();	
	    		},
	    		initView(){

				  this.showAdjust=this.myitem.noAjust==true?false:true;


	    		},
				modify(){
					 
					 this.hasWishData = false;
					 this.canClick= true;
					 this.firstInto = false;

					 //清空志愿调剂单选框
					 this.adjustvalue="";
					 //使志愿可修改
					 this.options[0].disabled=false;
				  	 this.options[1].disabled=false;

				  	 this.disableWish = false;
					
				},
				commit(){
				   
				   this.hasWishData = true;
				   this.modified=true;
				   this.firstInto = false;
		
				   this.options[0].disabled=true;
				   this.options[1].disabled=true;

				},
				showPicker(index){

					 
					if(this.hasWishData==true){
						return;
					}
				
					if(index==100||index==101){
						this.initSonWishOptionData();
					}else{
						this.initWishOptionData();
					}
					this.popupMajor = true;
				 
					this.clickItemIndex = index;
				},
				MajorValuesChange(picker, values){
		     		this.pickerValue = values;
		     		this.currentSelItem = values;
		     	 
	    		},
	    		pickerCancle(){
	    			this.popupMajor = false;

	    		},
	    		pickerConfirm(){
	    			let tcuritem = this.deepClone(this.currentSelItem[0]);
	    			//如果当前项是未选择将展示字段show置空
	    			let i = {selected:true,data:tcuritem};
	    			if(this.currentSelItem[0].show=="未选择"){
	    				i.selected=false;
	    				i.data.show="";
	    			}

	    			//城市艺术学院做特殊处理
    				if(this.clickItemIndex==100){
    					this.wish1 = i;
    					this.popupMajor = false;
    					return;
    				}else if(this.clickItemIndex==101){
    					this.wish2 = i;
    					this.popupMajor = false;
    					return;
    				}

	    			this.myselWish ={index:this.clickItemIndex-1,item:i};
	    			this.popupMajor = false;

	    			let flag = this.checkIsReapeat();
	    			if( flag!=false){
	    				let ToastStr = flag+"志愿重复";
	    				Toast(ToastStr);
	    				return false;
	    			};

	    			if(this.checkWishType()==false){

	    				return false;
	    			}


	    		},
	    		
	    		//初始化志愿选项数据
	    		initWishOptionData(){
	    			 this.proflist =  this.item.datas.profList;
	    			 
					 let profs = [];
					 let t={show:"",zhuanYeID:"",zhuanYeMC:"",orieId:"",orieName:""};
					 t.show= "未选择";
					 profs.push(t);

					 if(this.datas.examCtrl.wishType==1||this.datas.examCtrl.wishType==2){
					 	 $.each(this.proflist, function(i, d){
					 	 	let t={show:"",zhuanYeID:"",zhuanYeMC:"",orieId:"",orieName:""};
					 	 	t.zhuanYeID = d.zhuanYeID;
							t.zhuanYeMC = d.zhuanYeMC;
							t.show = t.zhuanYeMC;
							profs.push(t);
					 	 });
					 }else if(this.datas.examCtrl.wishType==4){
					 	 $.each(this.proflist, function(i, d){
					 	 $.each(d.profList, function(j, item){
						 	 	let t={show:"",zhuanYeID:"",zhuanYeMC:"",orieId:"",orieName:""};
							 	t.zhuanYeID = d.zhuanYeID;
							 	t.zhuanYeMC = d.zhuanYeMC;
							 	t.orieId = item.zhuanYeID;
							 	t.orieName = item.zhuanYeMC;
								t.show= d.zhuanYeMC+"-"+item.zhuanYeMC+"方向";
								profs.push(t);
					 		});
					 	});
					 }
					 this.chooseMajor[0].values = profs;
	    		},

	    		initSonWishOptionData(){
	    			 let profs = [];
					 let t={show:"",zhuanYeID:"",zhuanYeMC:"",orieId:"",orieName:""};
					 t.show= "未选择";
					 profs.push(t);

			 	 	let t1={show:"",zhuanYeID:"",zhuanYeMC:"",orieId:"",orieName:""};
					t1.show = "设计学类(城市艺术设计)";
					t1.zhuanYeMC=t1.show;
					profs.push(t1);

					let t2={show:"",zhuanYeID:"",zhuanYeMC:"",orieId:"",orieName:""};
					t2.show = "设计学类(家居产品设计)";
					t2.zhuanYeMC=t2.show;
					profs.push(t2);
					this.chooseMajor[0].values = profs;
	    		},




	    		/*以下都是检查志愿代码*/

	    		//检查志愿前面是否有空志愿，如果有返回true，如果没有返回false
	    		checkEmptyBefore(){
					var flag=false;
					for(var i=this.myselWish.length-1;i>=0;i--){
						if(this.myselWish[i].selected){
							flag=true;
						}else if(flag==true){
							return true;
						}  
					}
					return false;
	    		},
	    		checkIsReapeat(){
	    		let flag = false;   //假设不重复
                for(let i = 0;i < this.myselWish.length-1;i++){ //循环开始元素
	                	if(this.myselWish[i].data.show !=""&&this.myselWish[i].selected==true){
	            		    for(let j = i + 1; j < this.myselWish.length; j++){ //循环后续所有元素
	                         //如果相等，则重复
	                         if(this.myselWish[j].selected&&(this.myselWish[i].data.show == this.myselWish[j].data.show)){
	                            // flag = true; //设置标志变量为重复
	                            flag=this.myselWish[i].data.show;
	                             break;      //结束循环
	                         }
	                    	}
	                	}
                   } 

                   return flag;
	    		},
	    		checkIsSelectAllWish(){
	    			 for(let i = 0;i < this.myselWish.length;i++){
	    			 	if(this.myselWish[i].selected==false){
	    			 		return false;
	    			 	}
	    			 }
	    			 return true;
	    		},

	    		checkIsSelectedWish(){
	    			 for(let i = 0;i < this.myselWish.length;i++){ 
	    			 	if(this.myselWish[i].selected==true){
	    			 		return true;
	    			 	}
	    			 }
	    			 return false;
	    		},
	    		//检查志愿是否符合wishSubCtrl的控制
	    		wishSubCtrlCheck(){

	    			//alert(this.myitem.wishSubCtrl);
	    			if(this.myitem.wishSubCtrl==1){//天津美院，硬编码
	    				if(this.adjustvalue=="valueA"){
	    					
	    					if(!this.checkIsSelectAllWish()){
								Toast({
								  message: '志愿必须全部选择!',
								  duration: 5000,
								});
								return false;
							}
	    				}else if(this.adjustvalue=="valueB"){
	    					if(!this.checkIsSelectedWish()){
	    						Toast({
								  message: '请至少选择一个志愿!',
								  duration: 5000,
								});
								return false;
	    					}
	    				}
	    			}else if(this.myitem.wishSubCtrl == 2){

							if(this.myitem.wishSubCtrl.examSysCtrl){//控制到考试
								if(!this.checkIsSelectedWish()){
		    						Toast({
									  message: '请至少选择一个志愿!',
									  duration: 3000,
									});
									return false;
	    						}
							} else {
								if(!this.checkIsSelectAllWish()){
									Toast({
									  message: '志愿必须全部选择!',
									  duration: 3000,
									});
									return false;
								}
							}
					} else if(this.myitem.wishSubCtrl == 3){//央美

							if(this.myselWish[0].data.zhuanYeMC=='城市艺术设计'){
								if(this.wish1.selected==false&&this.wish2.selected==false){
									Toast({
									  message: '请至少选择一个志愿!',
									  duration: 3000,
									});
									return;
								}

								if(!this.wish1.data.zhuanYeMC){
									Toast({
									  message: '志愿1必须选择!',
									  duration: 3000,
									});
									return;
								}

								if(this.wish1.data.zhuanYeMC===this.wish2.data.zhuanYeMC){
										Toast({
									  message: '志愿不能重复!',
									  duration: 3000,
									});
									return;
								}
							}else{
								if(!this.checkIsSelectedWish()){
		    						Toast({
									  message: '请至少选择一个志愿!',
									  duration: 3000,
									});
									return false;
	    						}
							}

				}else {//其它院校，必须全部选择
					if(!this.checkIsSelectAllWish()){
							Toast({
							  message: '志愿必须全部选择!',
							  duration: 3000,
							});
							return false;
						}
				}
	    		return true;
	    	},

	    	findWishNumberByParentProfID(id){
	    		let num=0;
	    		  for(let i = 0;i < this.myselWish.length;i++){
	    			 	if(this.myselWish[i].selected==true&&this.myselWish[i].data.zhuanYeID==id){
	    			 		 num++;
	    			 	}
	    		 }
	    	
	    		 return num;
	    	},

	    	checkWishType(){
	    	 
	    		 
	    	 
				if(this.myitem.examCtrl.wishType==4){
					for (var i =  0; i <this.proflist.length; i++){

					 
						 if(this.findWishNumberByParentProfID(this.proflist[i].zhuanYeID)>this.proflist[i].wishMaxNum){

						 	Toast({
							  message: this.proflist[i].zhuanYeMC+'最多只能选择'+this.proflist[i].wishMaxNum+"个专业方向" ,
							  duration: 3000,
							});

							return false;
						 }
					}
					 
				}
				return true;
	    	},

	    		check(){

	    			//查空
	    			if(this.checkEmptyBefore()){
	    				Toast("已选志愿前有未填志愿");
	    				return false;
	    			}

	    			//查重
	    			let flag = this.checkIsReapeat();
	    			if( flag!=false){
	    				let ToastStr = flag+"志愿重复";
	    				Toast(ToastStr);
	    				return false;
	    			}

	    			if(this.showAdjust&&this.adjustvalue==""){
	    				Toast("请选择是否服从调剂");
	    				return false;
	    			}

	    		 

	    			if(!this.wishSubCtrlCheck()){
	    				return false;
	    			}
	    		 
	    			if(this.checkWishType()==false){
	    				return false;
	    			}

	    			return true;

	    		},

	    		getdata(){
	    			if(this.check()==false){
	    				return false;
	    			}
	    			else{
	    				let wishlist = [];
	    				let data = {isAdjust:null,wishList:null};
	    				//填充志愿调剂值
	    				if(this.adjustvalue=='valueA'){
	    					data.isAdjust = 1;
	    				}else if(this.adjustvalue=='valueB'){
	    					data.isAdjust = 2;
	    				}


	    				

	    				//填充志愿数据
	    				for(let i = 0; i<this.myselWish.length; i++){
	    				 
	    					let t = {
	    					profId:"",
	    					profName:"",
	    					orieId:"",
	    					orieName:"",
	    					};

	    					if(this.myselWish[i].selected){
	    						 
 
	    						if(this.myselWish[i].data.show=='城市艺术设计'){
    							 	

				    				 if(this.wish1.selected){
				    				 	let t = {
				    					profId:this.myselWish[i].data.zhuanYeID,
				    					profName:this.myselWish[i].data.zhuanYeMC,
				    					orieId:1,
				    					orieName:this.wish1.data.zhuanYeMC,
				    					};
				    				 	wishlist.push(t);
				    				 }
				    				 if(this.wish2.selected){
				    				 	let t = {
				    					profId:this.myselWish[i].data.zhuanYeID,
				    					profName:this.myselWish[i].data.zhuanYeMC,
				    					orieId:2,
				    					orieName:this.wish2.data.zhuanYeMC,
				    					};
				    				 	wishlist.push(t);
				    				 }
				    				 break;
	    						}

	    						t.profId = this.myselWish[i].data.zhuanYeID;
	    						t.profName = this.myselWish[i].data.zhuanYeMC;
	    						t.orieId = this.myselWish[i].data.orieId;
	    						t.orieName = this.myselWish[i].data.orieName;
	    						wishlist.push(t);
	    					}
	    				} 

	    				data.wishList = wishlist;
	    				return data;
	    			}
	    		},



	    		//以下是工具函数
	    		isEmptyObject(obj){
			       for(var key in obj){
			           return false;
			       	};
			      	return true;
 				 },
 				 deepClone(obj){
				    var result;
				    var oClass=this.isClass(obj);
				    if(oClass==="Object"){
				        result={};
				    }else if(oClass==="Array"){
				        result=[];
				    }else{
				        return obj;
				    }
				    for(var key in obj){
				       var copy=obj[key];
				       if(this.isClass(copy)=="Object"){
				           result[key]=arguments.callee(copy);//递归调用
				        }else if(this.isClass(copy)=="Array"){
				           result[key]=arguments.callee(copy);
				        }else{
				            result[key]=obj[key];
				        }
				    }
				 return result;
				},
				isClass(o){
				    if(o===null) return "Null";
				    if(o===undefined) return "Undefined";
				    return Object.prototype.toString.call(o).slice(8,-1);
				}


		},
	
		watch:{
			 
		}



	}


</script>

<style type="text/css"  >
 
   .key-item {
      font-size: 0.25rem;
   }
  	.label-item{
      font-size: 0.3rem;
      color: #26A2FF;
      margin-left: 0.2rem;
      margin-top: 0.2rem;
   }

   .mint-cell{
   	display: inline-block;
    background:transparent;
   }
   .wish-item-label{
   	font-size: 0.25rem;
   	display: block;
   	float: left;
   }

  .wish-item-value{
   	font-size: 0.23rem;
   	width: 60%;
   	border:1px solid #37B6EB;
   	background-color: #fff;
   	float: left;
   	min-height: 0.4rem;
   	display: flex;
   	align-items: center;
   	margin-left: 0.15rem;
   	padding: 0.05rem;
   	border-radius: 2px;

  }

  .arrow{
  	  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
  }

   .wish-item{
	   	font-size: 0.3rem;
	  	overflow:hidden;
   		margin-top: 0.1rem;
   		margin-left: 0.5rem;
        -webkit-align-items: center;
     	display: -webkit-flex;
        box-sizing: border-box;
   }

   .wish-value{
   	display: inline-block;
   	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
   }



#wishinfopart  .mint-cell .mint-cell-wrapper {
    background-image: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
    background-image: linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
}
#wishinfopart .mint-cell:last-child {
 	background-image: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
    background-image: linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
     
    }
  #wishinfopart .mint-radiolist-title{
  	display: none;
  }

  .mint-popup-bottom{
  	width: 100%;
  }
  .disabled-state{
  	background-color: #EBEBE4;
  }
  .mint-pop-popupMajor{
	height: 60%;
	overflow:hidden; 
}
</style>