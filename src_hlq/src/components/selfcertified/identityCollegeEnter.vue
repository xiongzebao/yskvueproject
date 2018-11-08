<template>
    <div class="college-ensure">
    	<mt-header title="身份认证" class='identityEnter-header'>
		  <div to="/" slot="left" v-tap="{ methods : onClosePage}">
			<mt-button icon="back"></mt-button>
		  </div>
		</mt-header>
		<div class="identityEnter-main">
			<div class="college-ensure-reqire">
				<div class="ensure-reqire-item">
					<div class='ensure-reqire-item-title'>院校名称:</div>
					<div class='ensure-reqire-item-contain'>
						<template v-if="identifyStatus=='1'">
							<p class='ensure-reqire-item-contain-jiny'>{{userSchool}}</p>
						</template>
						<template v-else>
							<input type="text" v-model='userSchool' maxlength="30" placeholder="请输入学校全称">
						</template>
						
					</div>
				</div>
				<div class="ensure-reqire-item">
					<div class='ensure-reqire-item-title'>入学时间:</div>
					<template v-if="identifyStatus=='1'">
						<div class='ensure-reqire-item-contain'>
						<p class='ensure-reqire-item-contain-jiny'>{{userSchoolYear.year}}</p>
						</div>
					</template>
					<template v-else>
						<div class='ensure-reqire-item-contain' v-tap="{ methods : pickerYear}">
						<input type="text" v-model='userSchoolYear.year'  placeholder="请选择入学时间" disabled>
					</div>
					</template>
					<div class='ensure-reqire-item-icon iconfont icon-combinedshapefuben'></div>
				</div>
				<div class="ensure-reqire-item ensure-reqire-item-muline">
					<div class='ensure-reqire-item-muline-title'>上传证明:</div>
					<div class='ensure-reqire-item-muline-contain' v-tap="{ methods : pickerPicture}">
						<template v-if='userPicture'>
							<img :src="userPicture" alt="" class='muline-contain-pict'>
						</template>
						<template v-else>
							<div class='ensure-reqire-item-contain-jiny'>请上传身份证/大学录取通知书/大学学生证</div>
						</template>
					</div>
					<div class='ensure-reqire-item-muline-icon iconfont icon-combinedshapefuben'></div>
				</div>
			</div>
			<incertifynote></incertifynote>
		</div>
   		<div class="identityEnter-footer">
    		<div class="identify-auth-btn" >
    			<template v-if="identifyStatus=='1'">
    				<mt-button class=" identify-auth-btn-com identify-auth-btn-defalut">认证中...</mt-button>
    			</template>
    			<template v-else>
    				<mt-button class="identify-auth-btn-com identify-auth-btn-ensure" v-tap="{ methods : identifyEnsure}">提交认证</mt-button>
    			</template>	
    		</div>
    	</div>
    	<mt-popup
			  v-model="yearPopup"
			  position="middle"
			  class='year-popup-choose'>
			  <ul class='yearPopup-lists'>
			  	<li v-for='(list,index) in yearInitArr' class='yearPopup-list' v-tap="{ methods : chooseYear,params:{index:index,value:list.value,year:list.year}}">
			  		{{list.year}} 
			  	<i class='iconfont icon-dui' v-if='list.status'></i>
			  	</li>
			  </ul>
		
   		</mt-popup> 
    </div>
</template>

<script>
	import incertifynote  from './InCertifyNote';
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
    export default {
		props:['identifyStatus'],/*审核状态---2成功;1审核中;3失败*/
        data () {
            return {
				userSchool:'',
				userSchoolYear:{
					 year:'2017年',
					 status:true,
					 value:'8'},
				userPicture:'',
				yearInitArr:[],
				yearPopup:false
				
            }
        },
		mounted(){
			
			this.yearInit();
			this.checkIdentify()
			let that=this;
			window.appPhotoUploadResult=function(url){
				
				if(url){
					that.userPicture=url;
				}else{
					that.toast('获取失败，请重试')
				}
				
			}
		},
        components: {
			incertifynote
        },
		methods:{
			 /*检测是否有表情 返回true则表示字符串中包含emoji字符*/
			emojiUtils(value){
				var emojsource = String(value); 
				for (var  i = 0,len=emojsource.length; i < len; i++) {
					var codePoint = emojsource.charCodeAt(i);
					if (!(this.isEmojiCharacter(codePoint))) { /*如果不能匹配,则该字符是Emoji表情*/
						return true;
					}
				}
				return false;
			},
			/*检测是否是表情*/
			isEmojiCharacter(codePoint) {
				return (codePoint == 0x0) || (codePoint == 0x9) || (codePoint == 0xA) ||
						(codePoint == 0xD) || ((codePoint >= 0x20) && (codePoint <= 0xD7FF)) ||
						((codePoint >= 0xE000) && (codePoint <= 0xFFFD)) || ((codePoint >= 0x10000)
						&& (codePoint <= 0x10FFFF));
			},
			onClosePage(){
				 yksapp.closeWebPage();
			 },
			yearInit(){
				this.yearInitArr=[
					{year:'2014年',
					 status:false,
					 value:'5'
					},
					{year:'2015年',
					 status:false,
					 value:'6'},
					{year:'2016年',
					 status:false,
					 value:'7'},
					{year:'2017年',
					 status:true,
					 value:'8'}
				];
			},
			toast(mesg){
				Toast({
					message: mesg,
					position: 'middle',
					duration: 1000
				});
			},
			pickerYear(){
				this.yearPopup=true;
			},
			chooseYear(params){
				this.userSchoolYear={
					value:params.params.value,
					year:params.params.year
				};
				this.yearPopup=false;
				for(let i in this.yearInitArr){
					this.yearInitArr[i].status=false
				}
				this.yearInitArr[params.params.index].status=true;
				
			},
			pickerPicture(){
				if(this.identifyStatus=='1'){
					 let imgArrSrc=[this.userPicture];
					 let strImgArrSrc=String(imgArrSrc);
			  		 yksapp.clickImageWithIndex(strImgArrSrc,0);
				}else{
					yksapp.openCameraAndPhotos(true,true);
				}
				
			},
			trimReg:function(text){
				var  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				return text == null ? "" : ( text + "" ).replace( rtrim, "" );  
			},
			identifyEnsure(){
				if(this.emojiUtils(this.userSchool)){
					this.toast('院校名称不能包含表情');
					return ;
				}
				if(!(this.trimReg(this.userSchool))){
					this.toast('请输入院校名称');
					return ;
				}
				
				if(!this.userSchoolYear.value){
					this.toast('请选择入学时间');
					return ;
				}
				if(!this.userPicture){
					this.toast('请上传证明');
					return ;
				}
				let data={
					"auditSchoolName":this.userSchool, 
					"certificate":this.userPicture,
					"userStatus":'2',
					"yearNum":this.userSchoolYear.value
				}
				
				this.fixdata(data)
			},
			checkIdentify(){
				
				if(!this.identifyStatus){
					return ;
				}
				
				Indicator.open('加载中...');
				let that=this;	ajaxMethod.doAjax("hulaquan,/api/m/auth/my/info/v3/userTypeAuding.htm",{},function(database){
					
						if(database.success){
							 that.loadFixdata(database.datas.obj)
						}else{
							that.toast(database.message)
						}
			   },function(){
					Indicator.close();
				})
			},
			loadFixdata(dataobj){
				if(dataobj){
					this.identifyStatus=dataobj.auditFlag;
						if(this.identifyStatus=='3'){
							let statusAuditID=dataobj.auditID;
							let getStatusAuditID='';
							if(window.yksapp){
								getStatusAuditID=yksapp.getValueByKey('h5identifyStatus');
							}else{
								getStatusAuditID=localStorage.getItem('h5identifyStatus');
							}
							if(getStatusAuditID!=statusAuditID){
								if(window.yksapp){
								getStatusAuditID=yksapp.setKeyValue('h5identifyStatus',statusAuditID);
								}else{
									getStatusAuditID=localStorage.setItem('h5identifyStatus',statusAuditID);
								}
								
								let that=this;
								MessageBox({
									  title: '审核失败',
									  message:dataobj.auditReason||'审核失败' ,
									  showCancelButton: true,
									  closeOnClickModal:false
									}).then(action => {
										if(action=='cancel')
											that.onClosePage();
								});
							}
							
							
						}
					
					this.userSchool=dataobj.auditSchoolName;
					this.userPicture=dataobj.certificate;
					let yearNum=dataobj.yearNum;
					if(yearNum==5){
						this.userSchoolYear={
							value:5,
							year:'2014年'
						};
					}else if(yearNum==6){
						this.userSchoolYear={
							value:6,
							year:'2015年'
						};
					}else if(yearNum==7){
						this.userSchoolYear={
							value:7,
							year:'2016年'
						};
					}else{
						this.userSchoolYear={
							value:8,
							year:'2017年'
						};
					}
				}
				
			},
			fixdata(dataobj){
				Indicator.open('加载中...');
				let that=this;	ajaxMethod.doAjax("hulaquan,/api/m/auth/my/info/v3/saveUserType.htm",dataobj,function(database){
						if(database.success){
							that.identifyStatus=1;
							that.checkIdentify();
							Toast({
								  message: '上传成功',
								  iconClass: 'iconfont icon-dui'
							});
						 
							
							
						}else{
							that.toast(database.message)
						}
			   },function(){
					Indicator.close();
				})
			}
			
		}
    }
</script>

<style scoped>
	.college-ensure-reqire{
		font-size: 0.3rem;
		color: #606060;
		padding-bottom: 1.5rem;
	}
	.ensure-reqire-item{
		padding:0.35rem;
		box-sizing: border-box;
		display: flex;
		flex-wrap: nowrap;
		background-image: linear-gradient(180deg,#d9d9d9,#d9d9d9 50%,transparent 0);
		background-size: 120% 1px;
		background-repeat: no-repeat;
		background-position: 0 100%;
	}
	.ensure-reqire-item .iconfont{
		font-size: 0.3rem;
		color: #2ebdff;
		font-weight: bolder;
	}
	.ensure-reqire-item-title{
		flex-shrink: 0;
	}
	.ensure-reqire-item-contain{
		flex-grow: 1;
		padding-left: 0.4rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.ensure-reqire-item-contain input {
		border: 0;
		width: 100%;
		height: 100%;
	}
	.ensure-reqire-item-contain input:disabled{
		background-color: #fff;
	}
	.ensure-reqire-item-muline{
		height: 2rem;
		box-sizing: border-box;
		padding-top:0; 
	}
	.ensure-reqire-item-muline-contain{
		padding-top: 0.2rem;
		flex-grow: 1;
		display: flex;
		padding-left: 0.4rem;
		
		
	}
	.muline-contain-pict{
		
		width: 1.16rem;
		height: 1.56rem;
		margin-left: auto;
	}
	.ensure-reqire-item-muline-icon{
		line-height: 2rem;
		padding-left: 0.1rem;
	}
	.ensure-reqire-item-muline-title{
		flex-shrink: 0;
		padding-top: 0.45rem;
	}
	.ensure-reqire-item-icon{
		flex-shrink: 0;
		padding-left: 0.1rem;
	}
	.year-popup-choose{
		width: 60%;
		overflow: hidden;
	}
	.yearPopup-lists{
		background: #fff;
		font-size: 0.28rem;
	}
	.yearPopup-list{
		height: 0.86rem;
		line-height: 0.86rem;
		width: 100%;
		border-bottom: 1px solid #f9f9f9;
		padding:0 9%;
		box-sizing: border-box;
		position: relative;	
	}
	.yearPopup-list .iconfont{
		font-size: 0.3rem;
		right: 9%;
		position: absolute;
		color: #2ebdff;
	}
	input::-webkit-input-placeholder{
    color: #c4c4c4;opacity:1;
	}
	.ensure-reqire-item-contain-jiny{
		color: #c4c4c4;
	}
</style>