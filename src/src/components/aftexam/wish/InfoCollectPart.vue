<template>
	<div id = "infocollect">
	
		<section class="stu-info-check">
		      <div class="label-item"><span>信息采集</span></div><!-- ^1[3|4|5|8|7][0-9]\d{4,8}$ -->
		      <div class="content-item"> <span class="key-item">联系电话:</span><input class="value-item-input"   v-model="telphone" :disabled='telDisabledInput' v-bind:class="{'border-red': telError }" id="telphone" validate="true" regex="^1[3|4|5|7|8][0-9]\d{4,8}$" maxlength="11"/></div> 

		      <div class="content-item"> <span class="key-item">邮&emsp;&emsp;编:
		      </span><input class="value-item-input" id="zip" :disabled='disabledInput' v-model = "zip" validate="true"   maxlength="6"/></div> 

			   <div class="content-item"> 
			         <span class="key-item zip-address">邮寄地址:</span>
			         <textarea class="value-item-input" id="address" :disabled='disabledInput'  v-model = "address" validate="true"   maxlength="60"/></textarea>
			   </div> 
		 			
 		</section>


 		<!-- 高考成绩部分 -->
		<section class='high-score-ctr' v-if='item.datas.examCtrl.schoolId!=10047&&item.datas.noShowScore==false'>
	 		<div class="label-item"><span>高考成绩</span></div>
	 		<div class='scoreSorH'>	
	            <div class="content-item highExamScore"  v-if="!item.datas.isShowScore">
		            <span class="key-item">文化成绩:</span>
		            <input class="value-item-input" v-model="highExamScore" :disabled='disabledInput' placeholder='成绩可保存小数点后两位' id="highExamScore" validate="true" regex="/^(\d{1,3}|\d{1,3}\.\d{1,2})$/" maxlength="8"/>
	            </div> 

	            <div class="content-item"> 
		            <span class="key-item">语&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文:</span>
		            <input class="value-item-input" v-model='chnScore' placeholder='成绩可保存小数点后两位' :disabled='disabledInput' id="chnScore" validate="true" regex="/^(\d{1,3}|\d{1,3}\.\d{1,2})$/" maxlength="8"/>
	            </div> 

	            <div class="content-item"> 
		            <span class="key-item">英&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;语:</span>
		            <input class="value-item-input" v-model='frnScore' placeholder='成绩可保存小数点后两位' id="frnScore" :disabled='disabledInput' validate="true" regex="/^(\d{1,3}|\d{1,3}\.\d{1,2})$/" maxlength="8"/>
	            </div> 
			</div>
			
		</section>

	</div>
 

</template>


<script type="text/javascript">
import { Field } from 'mint-ui';
import VueBus from 'vue-bus';
import Vue from 'vue'
import { Toast } from 'mint-ui';
 Vue.use(VueBus);
 Vue.component(Field.name, Field);

	export default{
		props:["item"],
		mounted(){
			
		 
			this.myitem = this.item.datas;
			this.doCollectionInfo();
			this.$bus.on("wishModify",this.modify);
			this.$bus.on("wishCommit",this.commit);

		},

		data(){
				return{
					username:"",
					myitem:"",
					wishStudent:"",
					telphone:"",
					zip:"",
					address:"",


					highExamScore:'',
					chnScore:'',
					frnScore:'',

					/////////
					telError:false,
					telDisabled:false,
					disabledInput:false,
					telDisabledInput:false
				}

		},

		methods:{

			modify(){
				 
				this.disabledInput = false;
				let schoolID = this.myitem.examCtrl.schoolId;
			 
				if(schoolID!=10073){
					this.telDisabledInput = false;
				}
				


			},
			commit(){
				 
				this.disabledInput = true;
				this.telDisabledInput = true;

			},

			isNumber(n){
				let number = ['0','1','2','3','4','5','6','7','8','9'];
				for (let i = number.length - 1; i >= 0; i--) {
					 if(n==number[i]){
					 	return true;
					 }
				}
				return false;
			},

			getdata(){
				if(this.doCheck()==false){
					Toast('请完善信息');
					return false;
				}else{
				let tdata = {};
				tdata.telphone = this.telphone;
				tdata.zip = this.zip;
				tdata.address = this.address;
				tdata.highExamScore = this.highExamScore;
				tdata.chnScore = this.chnScore;
				tdata.frnScore = this.frnScore;
				console.log("tdata....");
				 
				return tdata;
				}

			
			},

			// 信息采集
			doCollectionInfo(){
				var  stu_info=this.myitem.wishStudent;
				var ipts=$('.value-item-input');
				var  examctrl=this.myitem.examCtrl;
			
				if(stu_info){
					this.telphone=stu_info.mobile;// 电话
					this.zip=stu_info.zip;// 邮编
					this.address=stu_info.address;// 地址
					this.highExamScore=stu_info.highExamScore;// 高考文化成绩
					this.chnScore=stu_info.chnScore;// 高考语文成绩
					this.frnScore=stu_info.frnScore;// 高考英语成绩
					this.disabledInput = true;
					this.telDisabledInput= true;
				}
				this.doCheck();
			},

		 doCheck(){
				var telephone=/^(13|14|15|17|18)[0-9]\d{8}$/;
				var score=/^(\d{1,3}|\d{1,3}\.\d{1,2})$/;
				var nature_no=/^[0-9]{6}$/;
				var ifPass=false;
				var _this = this;
				$('#telphone').blur(function(){
					var tel=$(this).val();
					if(telephone.test($('#telphone').val())){
						 _this.telError=false;
						 ifPass=true;
					}
					else{
						 _this.telError=true;
						 ifPass=false;
					}
				})
				$('#zip').blur(function(){

					if($(this).val()=='' || $.trim($(this).val())=='' || (!nature_no.test($(this).val())) ){
						$(this).addClass('border-red');
						ifPass=false;
					}else{
						$(this).removeClass('border-red');
						ifPass=true;
					}
				})
				$('#address').blur(function(){
					if($.trim($(this).val())==''){
						$(this).addClass('border-red');
					
					}else{
						$(this).removeClass('border-red');
						ifPass=true;
					}
				})
				$('.scoreSorH').find('input').each(function(idx,item){
					$(this).blur(function(){
						if($(this).val()==''){
							$(this).removeClass('border-red');
						}else if(!(score.test($(this).val()))){
							$(this).addClass('border-red');
					
						}else{
							$(this).removeClass('border-red');
						
						}
					})
				})


				if(telephone.test($('#telphone').val())){
					ifPass=true;
					// return ifPass;
					_this.telError = false;
				}else{
					ifPass=false;
				
					_this.telError = true;
					return ifPass;
				}




				if($('#zip').val()==''){
					ifPass=false;
					$('#zip').addClass('border-red');
					return ifPass;
				}else{
					ifPass=true;
					// return ifPass;
				}


				if(nature_no.test($('#zip').val())){
					ifPass=true;
				}else{
					ifPass=false;
					return ifPass;
				}



				if($.trim($('#address').val())==''){
					ifPass=false;
					$('#address').addClass('border-red');
					return ifPass;
				}else{
					ifPass=true
				}
					//高考成绩验证
			 	function scoreCk(){
					$('.scoreSorH').find('input').each(function(idx,item){
						if($(this).val()==''){
							$(this).removeClass('border-red');
						}else if(score.test($(this).val())){
							$(this).removeClass('border-red');
							ifPass=true;
							return ifPass;
						}
						else{
							$(this).addClass('border-red');
							ifPass=false;
							return ifPass;
						}
					})
				}

				var  examctrl=this.myitem.examCtrl;
				// 央美没有分数，分数项不用检查
				if(examctrl.schoolId!=10047)
				{
					scoreCk();
				}
				return ifPass;
			},
		},

		watch:{
			highExamScore:function(val,oldVal){
			  	
			},
			telphone:function(val,oldVal){
			 
				let _this = this;	
	 			let len = val.length;
	 			if(len>=1&&val.substring(0,1)!="1"){
	 				_this.telError=true;
	 				return;
	 			}
	 			if(len>=2){
	 				let t = val.substring(1,2);
	 				if(t!="4"&&t!="3"&&t!="5"&&t!="7"&&t!="8"){
	 					_this.telError=true;
	 					return;
	 				}
	 			}
                if(len>=3){
                	if(!this.isNumber(val.substring(val.length-1,val.length))){
	 					_this.telError=true;
	 					return;
	 				}
                }

                 _this.telError=false;
			}

			
		}


	}


</script>
<style   scoped>
		.key-item{
				display: inline-block;
				text-align: center;
				font-size: 0.25rem;
			}


	.value-item-input{
		width: 60%;
		height: 0.5rem;
		border: 1px solid;
    	border-radius: 4px;
    	border-color: #37B6EB;
    	font-size: 0.23rem;
    	margin-left: 0.15rem;
    	padding: 0.05rem;
		box-sizing: border-box;


	}
	.label-item{
      font-size: 0.3rem;
      color: #26A2FF;
      margin-left: 0.2rem;
      margin-top: 0.2rem;
   }
	.content-item {
		 margin-top: 0.2rem;
        -webkit-align-items: center;
     	 display: -webkit-flex;
         margin-left: 0.2rem;
         box-sizing: border-box;
	}


	.error{
		border-color: #f00;
	}

	.disabled-bg{
		background-color: #aaa;
	}

	.border-red{
		border-color: #f00;
	}

	#address{
		height: 0.7rem;
		padding: 0.05rem;
		box-sizing: border-box;
	}
</style>