<template>
 	<div class='dentify-auth-main'>
 		<!--身份认证-->
 			<div class='identify-auth' v-if='identifyEnter'>
   		<mt-header title="身份认证" class='identityEnter-header'>
		  <div to="/" slot="left" v-tap="{ methods : onClosePage}">
			<mt-button icon="back"></mt-button>
		  </div>
		</mt-header>
   		<div class="identityEnter-main">
   			<div class="identify-auth-pri">
				
    		</div>
    		<div class="identify-auth-range">
    			<div class="identify-auth-range-items">
					<div class="identify-auth-range-item" v-for='(list,index) in rangeList'>
							<div :class="[list.status?'identify-auth-range-item-chosed':'identify-auth-range-item-defalt']" :disabled='collegeFlag' v-tap="{ methods : rangeChoose,paras:{'index':index,'id':list.id}}">
							{{list.type}}
							</div>
				   </div>
					
				
    		</div>
    		</div>
   		</div>
    	<div class="identityEnter-footer">
    		<div class="identify-auth-btn">
    			<template v-if='collegeFlag'>
    				<template v-if='ensureFlag'>
    					<mt-button class="identify-auth-btn-com identify-auth-btn-defalut">
    						确定/去认证
    					</mt-button>
    				</template>
    				<template v-else>
    					<mt-button class="identify-auth-btn-com identify-auth-btn-ensure"  v-tap="{ methods : ensureColleSuces,paras:''}">
    						去认证
    					</mt-button>
    				</template>
    			</template>
    			<template v-else>
    				<template v-if='ensureFlag'>
    					<mt-button class="identify-auth-btn-com identify-auth-btn-defalut">
    						确定/去认证
    					</mt-button>
    				</template>
    				<template v-else>
    					<mt-button class="identify-auth-btn-com identify-auth-btn-ensure" v-tap="{ methods : ensureSuces,paras:''}">确定</mt-button>
    				</template>
    				
    			</template>
    			
    		</div>
    	</div>  	
  	</div>
  		<!--认证成功-->
  			<identifysuccess v-if='identifySuccess' :grade='userTypeId'></identifysuccess>
  		<!--认证资料-->
  			<identifyload v-if='identifyLoad' :identify-status='collegeStatus'></identifyload>
 	</div>
  	
</template>


<script>
 import Vue from 'vue';
 import { Toast } from 'mint-ui';
 import { Indicator } from 'mint-ui';
 import identifysuccess from './CertifySuccess';
 import identifyload from './identityCollegeEnter';
export default {
  name: 'identifyAuth',
   data(){
    return{
		userTypeId:'',/**/
      	rangeList:[],/*用户数据*/
		ensureFlag:true,/*确定按钮禁用*/
		collegeFlag:false,/*大学生*/
		collegeStatus:'',/*大学生审核状态---2成功;1审核中;3失败*/
		authCollegeFlag:false,/*认证通过的大学生*/
		/*组件控制标志*/
		identifyEnter:false,
		identifySuccess:false,
		identifyLoad:false
    }

  },
  mounted(){
	  	this.initData();
	    this.fixdata();
	  	
  },
  computed:{
  
  
  },
  methods:{
	  onClosePage(){
		 yksapp.closeWebPage();
	 },
	initData(fn){
		this.rangeList=[{type:'高一学生',status:false,id:1},{type:'高二学生',status:false,id:2},{type:'高三学生',status:false,id:3},{type:'我是家长',status:false,id:5},{type:'我是大学生',status:false,id:4}];
		if(fn){
			fn();	
		}
		
	},
	toast(mesg){
		Toast({
			message: mesg,
			position: 'middle',
			duration: 3000
		});
    },
	changeInit(usta,uyear){
		if(usta){
			let id='';
			if(usta==1){
				if(uyear==1){
					id=1;
				}else if(uyear==2){
					id=2;
				}else{
					id=3;
				}
			}else if(usta==2){
				id=4;
			}else{
				id=5;
			}
			for(let i in this.rangeList){
				if(this.rangeList[i].id==id){
					this.rangeList[i].status=true;
					this.ensureFlag=false;
					this.userTypeId=id;
					if(id==4){
						this.collegeFlag=true;
					}
					return ;
				}
			}
		}
		
	},
	identifySuccessWay(obj){
		obj.identifyEnter=false;
		obj.identifySuccess=true;
		obj.identifyLoad=false;
	},
	identifyLaodWay(obj,status){
		obj.identifyEnter=false;
		obj.identifySuccess=false;
		obj.identifyLoad=true;
		if(status){
			this.collegeStatus=status;
		}
	},
	identifyDefault(obj){
		obj.identifyEnter=true;
		obj.identifySuccess=false;
		obj.identifyLoad=false;
	},
	fixdata(){
		Indicator.open('加载中...');
		let that=this;
		ajaxMethod.doAjax("hulaquan,/api/m/auth/my/info/v3/myUserType.htm",{},function(database){
				if(database.success){
					
					let userData=database.datas.obj;
					if(userData){
						that.changeInit(userData.userStatus,userData.yearNum);
						/*判断类型*/
						if(userData.userStatus==2){
							if(!userData.authFlag){/*'';1.认证中  2.已认证  3.未认证*/
								that.identifyDefault(that)
							}else{
								if(userData.authFlag=='2'){
									that.identifySuccessWay(that);
									return ;
								}
								that.identifyLaodWay(that,userData.authFlag);
								
							}
						}else{
							that.identifyDefault(that)
						}
					}else{
						that.identifyDefault(that)
					}
				}else{
					that.identifyDefault(that)
					that.toast(database.message)
				}
             
                
       },function(){
			Indicator.close();
		},'json','post',function(){
			that.identifyDefault(that)
		})
	},
   	rangeChoose(value){
		let that=this;
		if(this.authCollegeFlag){
			return ;
		}
		let index=value.paras.index;
		if(this.rangeList[index].status){
			this.initData(function(){
				that.userTypeId='';
				that.ensureFlag=true;
			})
			return ;
		}
		
		this.userTypeId=value.paras.id;
		
		this.initData(function(){
			that.rangeList[index].status=true;
			that.collegeFlag=(that.rangeList[index].type=='我是大学生'?true:false);
			that.ensureFlag=false;
		})	
	},
	/*高中生认证*/
	ensureSuces(){
		let that=this;
		let data={
			userStatus:'',
			yearNum:''
		}
		if(that.userTypeId=='1'){
			data.userStatus=1;
			data.yearNum='1';
		}else if(that.userTypeId=='2'){
			data.userStatus=1;
			data.yearNum='2';
		}else if(that.userTypeId=='3'){
			data.userStatus=1;
			data.yearNum='3';
		}else if(that.userTypeId=='5'){
			data.userStatus=3;
			data.yearNum='1';
		}
		Indicator.open('加载中...');
		ajaxMethod.doAjax("hulaquan,/api/m/auth/my/info/v3/add.htm",data,function(database){
				if(database.success){
					that.identifySuccessWay(that);	
				}else{
					that.toast(database.message)
				}
             
                
       },function(){
			Indicator.close();
		})
	  	
  	},
	  /*大学生认证*/
	ensureColleSuces(){
	  this.identifyLaodWay(this);
  	}
	 
  },
  components:{
	  	identifysuccess,
	  	identifyload
  }
}
</script>

<style type="text/css" scoped>
	.identify-auth-range{
		padding: 0.98rem 1.1rem 0 ;
		box-sizing: border-box;
	}
	.identify-auth-range-items{
		font-size: 0.28rem;
		color: #383838;
		font-weight: 500;
	}
	.identify-auth-range-items:after{
		content: "";
		display: block;
		height: 0;
		clear: both;
	}
	.identify-auth-range-item{
		float: left;
		width: 50%;
		height: 0.66rem;
		line-height: 0.66rem;
		text-align: center;
		margin-bottom: 0.7rem;
		box-sizing: border-box;
		padding: 0 0.25rem;
		
	}
	.identify-auth-range-item div{
		border-radius: 5px;
		
	}
	.identify-auth-range-item-defalt{
		border: 1px solid #000;
		
		background-color: #fff;
	}
	.identify-auth-range-item-chosed{
		background-color: #42cefc;
		color: #fff;
		border: 1px solid #42cefc;
	}
</style>