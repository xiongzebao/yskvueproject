<template>
	<div id="FamilyInformation">
            <mt-header title="家庭成员信息" class='familyinfor-header'>
                    <div slot="left"  v-tap="{methods:onRouterBack}">
                         <mt-button icon="back"></mt-button>
                    </div>
                     <div slot="right" >
                        <mt-button  v-tap="{methods:handleNextPage}">下一步</mt-button>
				     </div>
             </mt-header>
            <section class="familyinfor-main">
				<div class="noteInfor">
						<ul>
							<li>
								<span class=" iconfont icon-guanli"></span>
								<span>便捷管理您的信息，用于快速报名</span>
							</li>
							<li>
								<span class=" iconfont icon-safe"></span>
								<span>艺考升平台确保您的信息安全</span>
							</li>
							<li>
								<span class=" iconfont icon-heduixinxi"></span>
								<span>请仔细核对，提交信息后不可更改</span>
							</li>
						</ul>
						<div class="introRange">
							<div class="intro-range">
								<div class='intro-range-round intro-range-round-fill'></div>
								<div class='intro-range-line intro-range-line-fill'></div>
								<div class='intro-range-round intro-range-round-fill'></div>
								<div class='intro-range-line intro-range-line-fill'></div>
								<div class='intro-range-round intro-range-round-fill'></div>
							</div>
							<div class="intro-title">
							   <router-link to="/Inforperfect" class="intro-title-note intro-title-note-router">基本信息</router-link>
							   <div class="intro-title-line"></div>
							   <router-link to="/Inforperfect/ExtendInforPefect" class="intro-title-note intro-title-note-router intro-title-note-router">扩展信息</router-link>
							   <div class="intro-title-line"></div>
							   <div class="intro-title-note">家庭信息</div>

							</div>
						</div>
					</div>
				<div class="FamilyInformation" v-show='familyShowFlag'>
                <div class="familyList">
                    <div class="familylist-family">
                        <div class='public-infor-note'>
                            <span class="iconfont icon-mihao"></span><span class='infor-note-title'>家庭联络人1(需填写考生监护人,至少填写一位)</span>
                        </div>
                        <template v-if='familyIntro.FullnameOne'>
                        	<mt-field label="姓名:" placeholder=""  v-model="familyIntro.FullnameOne" :attr="{ maxlength: 20 }" :state="[famOneName ? 'success' : 'error']" :disableClear='true'>
				        	</mt-field>
                        </template>
                        <template v-else>
                        	<mt-field label="姓名:" placeholder=""  v-model="familyIntro.FullnameOne" :attr="{ maxlength: 20 }" :disableClear='true'>
				        	</mt-field>
                        </template>
                        <!--RelationOneOtherFlag-->
                        <mt-cell title="关系:">
							<mt-radio
								class='infor-ui-list'
								title=""
								v-model="RelationOneOther"
								:options="[{label: '父亲',value: '父亲'},{label: '母亲',value: '母亲'},{label: '其他',value: '其他'}]">
							</mt-radio>
						</mt-cell>
                        <template v-if="RelationOneOther=='其他'">
                        	<mt-field label="关系:" placeholder="请输入关系"  v-model="RelationOneValue" :attr="{ maxlength: 10 }" >
							</mt-field> 
                        </template>
                        <template v-if='familyIntro.postOne'>
                        	<mt-field label="职务:" placeholder="请输入个人职务"  v-model="familyIntro.postOne" :attr="{ maxlength: 40 }" type="textarea" rows='1' :state="[famOnePost ? 'success' : 'error']" :disableClear='true' >
				        	</mt-field>
                        </template>
                        <template v-else>
							<mt-field label="职务:" placeholder="请输入个人职务"  v-model="familyIntro.postOne" :attr="{ maxlength: 40 }" type="textarea" rows='1'>
							</mt-field> 
                        </template>
                        
                        <template v-if='familyIntro.CompanyNameOne'>
                        	<mt-field label="工作单位：" placeholder="请输入工作单位"  v-model="familyIntro.CompanyNameOne" :attr="{ maxlength: 60 }" type="textarea" rows='1' :state="[famOneCompay ? 'success' : 'error']" :disableClear='true'>
				        	</mt-field>
                        </template>
                        <template v-else>
                        	<mt-field label="工作单位：" placeholder="请输入工作单位"  v-model="familyIntro.CompanyNameOne" :attr="{ maxlength: 60 }" type="textarea" rows='1'>
				        	</mt-field>
                        </template>
                        
               			<template v-if='familyIntro.ContactNumOne'>
               				<mt-field label="手机号码:" placeholder="请输入手机号码"  v-model="familyIntro.ContactNumOne" :attr="{ maxlength: 13 }" type="tel" :state="[famOneTel ? 'success' : 'error']" :disableClear='true'>
							</mt-field>
               			</template>
               			<template v-else>
               				<mt-field label="手机号码:" placeholder="请输入手机号码"  v-model="familyIntro.ContactNumOne" :attr="{ maxlength: 13 }" type="tel">
							</mt-field>
               			</template>
                
                 
                  </div>
                  <div class="familylist-family">
                       <div class='public-infor-note'>
                            <span class="iconfont icon-mihao"></span><span class='infor-note-title'>家庭联络人2(需填写考生监护人)</span>
                        </div>
                        <template v-if='familyIntro.FullnameTwo'>
                        	<mt-field label="姓名:" placeholder=""  v-model="familyIntro.FullnameTwo" :attr="{ maxlength: 20 }" :state="[famTwoName ? 'success' : 'error']" :disableClear='true'>
				        	</mt-field>
                        </template>
                        <template v-else>
                        	<mt-field label="姓名:" placeholder=""  v-model="familyIntro.FullnameTwo" :attr="{ maxlength: 20 }"  :disableClear='true'>
				        	</mt-field>
                        </template>
                        <mt-cell title="关系:">
							<mt-radio
								class='infor-ui-list'
								title=""
								v-model="RelationTwoOther"
								:options="[{label: '父亲',value: '父亲'},{label: '母亲',value: '母亲'},{label: '其他',value: '其他'}]">
							</mt-radio>
						</mt-cell>
                        <template v-if="RelationTwoOther=='其他'">
                        	<mt-field label="关系:" placeholder="请输入关系"  v-model="RelationTwoValue" :attr="{ maxlength: 10 }" >
							</mt-field> 
                        </template>
                        <template v-if='familyIntro.postTwo'>
                        	<mt-field label="职务:" placeholder="请输入个人职务"  v-model="familyIntro.postTwo" :attr="{ maxlength: 40 }" type="textarea" rows='1' :state="[famTwoPost ? 'success' : 'error']" :disableClear='true'>
				        	</mt-field>
                        </template>
                        <template v-else>
                        	<mt-field label="职务:" placeholder="请输入个人职务"  v-model="familyIntro.postTwo" :attr="{ maxlength: 40 }" type="textarea" rows='1'>
				        	</mt-field>
                        </template>
                        <template v-if='familyIntro.CompanyNameTwo'>
                        	<mt-field label="工作单位：" placeholder="请输入工作单位"  v-model="familyIntro.CompanyNameTwo" :attr="{ maxlength: 60 }" type="textarea" rows='1' :state="[famTwoCompay ? 'success' : 'error']" :disableClear='true'>
				        	</mt-field>
                        </template>
                        <template v-else>
                        	<mt-field label="工作单位：" placeholder="请输入工作单位"  v-model="familyIntro.CompanyNameTwo" :attr="{ maxlength: 60 }" type="textarea" rows='1' >
				        	</mt-field>
                        </template>
                        
                 		<template v-if='familyIntro.ContactNumTwo'>
               				<mt-field label="手机号码:" placeholder="请输入手机号码"  v-model="familyIntro.ContactNumTwo" :attr="{ maxlength: 13 }" type="tel" :state="[famTwoTel ? 'success' : 'error']" :disableClear='true'>
							</mt-field>
               			</template>
               			<template v-else>
               				<mt-field label="手机号码:" placeholder="请输入手机号码"  v-model="familyIntro.ContactNumTwo" :attr="{ maxlength: 13 }" type="tel">
							</mt-field>
               			</template>
                  </div>
              </div>
              	
			</div>
			</section>
			<section class="familyinfor-footer">
				<div class="mint-checklist-label server-statement" >
					<span class="mint-checkbox">
						<input type="checkbox" class="mint-checkbox-input" v-model="serverStatement"> 
						<span class="mint-checkbox-core"></span>
					</span> 
					<span class="mint-checkbox-label">
						<router-link to='/Inforperfect/Statement'>
							我已阅读并同意隐私协议服务声明
						</router-link>
					</span>
				</div>
			</section>
			<loading v-show='loadingFlag'></loading> 
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { Checklist } from 'mint-ui';
    import loading from '../public/Loading';
	Vue.component(Cell.name, Cell);
	Vue.component(Checklist.name, Checklist);
	export default {
		name:'FamilyInformation',
		data(){
			return {
                familyIntro:{
                    FullnameOne:'',//家属1姓名
                    relationOne:'',//家属1关系
                    CompanyNameOne:'',//家属1工作单位
                    postOne:'',//家属1职位
                    ContactNumOne:'',//家属1联系电话

                    FullnameTwo:'',//家属2姓名
                    relationTwo:'',//家属2关系
                    CompanyNameTwo:'',//家属2工作单位
                    postTwo:'',//家属2职位
                    ContactNumTwo:''//家属2联系电话
                },
				
				serverStatement:true,
                familyShowFlag:true,/*数据完成后显示*/
                loadingFlag:false,/*加载动画*/
                Inforequire: false,/*考生信息填写说明flag*/
                RelationOneOther:"",
				RelationOneValue:"",
				RelationTwoValue:"",
				RelationTwoOther:"",
				
               
                
			}
		},
        mounted(){
            this.$nextTick(function () {
				 $('textarea').on('keyup', function(e){
					this.style.height = 'auto';
					this.scrollTop = 0; //防抖动
					this.style.height = this.scrollHeight + 'px';
				})
			 })
            /*声明*/
			this.initList();
			this.setFamilyData();
             
        },
        components:{
           loading 
        },
        activated(){
          
            
        },
        computed:{
			/*姓名1*/
			famOneName(){
				return regularMatch.ChineseName(this.familyIntro.FullnameOne);
			},
			/*职位1*/
			famOnePost(){
				return regularMatch.trim(this.familyIntro.postOne);
			},
			/*单位1*/
			famOneCompay(){
				return regularMatch.trim(this.familyIntro.CompanyNameOne);
			},
			/*电话1*/
			famOneTel(){
				return this.formateTelePhone(this.familyIntro.ContactNumOne);
			},
			familfOneTel(){
				return this.familyIntro.ContactNumOne;
			},
			/*姓名2*/
			famTwoName(){
				return regularMatch.ChineseName(this.familyIntro.FullnameTwo);
			},
			/*职位2*/
			famTwoPost(){
				return regularMatch.trim(this.familyIntro.postTwo);
			},
			/*单位2*/
			famTwoCompay(){
				return regularMatch.trim(this.familyIntro.CompanyNameTwo);
			},
			familfTwoTel(){
				return this.familyIntro.ContactNumTwo;
			},
			/*电话2*/
			famTwoTel(){
				return this.formateTelePhone(this.familyIntro.ContactNumTwo);
			}
        },
		methods:{
			formateTelePhone(val){
				return /^1[\d\s]{12}$/.test(val)
			},
			formateInputTelePhone(obj){
				if(obj){
					let teleReg=/^1\d*$/;
					let deleSpace=obj.replace(/\s/g, "" );
					if(teleReg.test(deleSpace)){
						let temp = [];
						
						if(deleSpace.length>3&&deleSpace.length<=7){
							 temp[0] = deleSpace.substring(0, 3);
							 temp[1] = deleSpace.substring(3, deleSpace.length);
							return temp.join(" ");

						}else if(deleSpace.length>7){
							temp[0] = deleSpace.substring(0, 3);
							temp[1] = deleSpace.substring(3, 7);
							temp[2] = deleSpace.substring(7);
							return temp.join(" ");
							
						}
						
						return deleSpace;
					}
					return deleSpace;
				}
				return '';
			},
			setFamilyData(){
				/*处理数据*/
				let h5IntroAlreadyPerfected='';
				if(window.yksapp){ 
				 h5IntroAlreadyPerfected=yksapp.getValueByKey('h5IntroAlreadyPerfected');  
				}else{
				 h5IntroAlreadyPerfected=window.localStorage.getItem('h5IntroAlreadyPerfected'); 
				}
				/*数据不存在不执行*/
				if(h5IntroAlreadyPerfected!='null'){
				   this.fixdata(JSON.parse(h5IntroAlreadyPerfected));
				}
			},
            onRouterBack(){
                this.$router.go(-1);
            },
			ToastShow(meg){
				Toast({
				  message: meg,
				  position: 'middle',
				  duration: 1500
				});
			},
            initList(){
            this.nameList=[];//姓名
            this.relationList=[];//关系
            this.companyNameList=[];//工作单位
            this.jobList=[];//职位
            this.phoneNumberList=[];//联系电话
            },
            fixdata(familyIntroDatas){
                let allReadyInpro=familyIntroDatas.obj;
                if(!allReadyInpro){
                    return ;
                }
                let familyList=allReadyInpro.familyList;
                for(let i=0,len=familyList.length;i<len;i++){
                    if(i==0){
					/*家属1姓名*/
                    this.familyIntro.FullnameOne=familyList[i].name;
					/*家属1关系*/
					if(familyList[i].relation!='父亲'&&familyList[i].relation!='母亲'){
						this.RelationOneOther="其他";
						this.RelationOneValue=familyList[i].relation;
						
					}else{
						 this.RelationOneOther=familyList[i].relation;
					}
					this.familyIntro.relationOne=familyList[i].relation;
                    this.familyIntro.CompanyNameOne=familyList[i].companyName;//家属1工作单位
                    this.familyIntro.postOne=familyList[i].job;//家属1职位
                    this.familyIntro.ContactNumOne=familyList[i].phoneNumber;//家属1联系电话
                    }else if(i==1){
                    this.familyIntro.FullnameTwo=familyList[i].name;//家属2姓名
                    /* 家属2关系*/
					if(familyList[i].relation!='父亲'&&familyList[i].relation!='母亲'){
						this.RelationTwoOther="其他";
						this.RelationTwoValue=familyList[i].relation;
					}else{
						 this.RelationTwoOther=familyList[i].relation;
					}
					this.familyIntro.relationTwo=familyList[i].relation;
                    this.familyIntro.CompanyNameTwo=familyList[i].companyName;//家属2工作单位
                    this.familyIntro.postTwo=familyList[i].job;//家属2职位
                    this.familyIntro.ContactNumTwo=familyList[i].phoneNumber;//家属2联系电话   
                    }
                }
                this.familyShowFlag=true;
                this.loadingFlag=false;
            },
			handleNextPage(){
				/*家属1姓名*/
				if(!this.famOneName){
					this.ToastShow('请正确填写家属1的姓名');
					return ;
				}
				/*家属1关系验证*/
				if(!this.RelationOneOther){
					this.ToastShow('请选择家属1与本人的关系');
					return ;
				}
				if(this.RelationOneOther=="其他"){
					let relationValue=regularMatch.trim(this.RelationOneValue);
					if(!relationValue){
						this.ToastShow('请输入家属1与本人的关系');
						return ;
					}else{
						this.familyIntro.relationOne=relationValue;
					}
				}else{
					this.familyIntro.relationOne=this.RelationOneOther;
				}
                /*家属1职务*/
				if(!this.famOnePost){
					this.ToastShow('家属1的职位不能为空');
					return ;
				}
                /*家属1电话*/
				if(!this.famOneTel){
					this.ToastShow('请正确填写家属1的联系电话');
					return ;
				}
				/*家属1工作单位*/
				if(!this.famOneCompay){
					this.ToastShow('家属1的工作单位不能为空');
					return ;
				}
				
				
                 this.initList();//清零数据
                 this.nameList.push(this.familyIntro.FullnameOne);
                 this.relationList.push(this.familyIntro.relationOne);
                 this.companyNameList.push(this.familyIntro.CompanyNameOne);
                 this.jobList.push(this.familyIntro.postOne);
                 this.phoneNumberList.push(this.familyIntro.ContactNumOne);
				/*家属2; 判断只要填一个其他都要填完整*/
				if(this.familyIntro.FullnameTwo||this.familyIntro.relationTwo||this.familyIntro.CompanyNameTwo||this.familyIntro.postTwo||this.familyIntro.ContactNumTwo){
					/*姓名验证*/
					if(!this.famTwoName){
						this.ToastShow('请正确填写家属2的姓名');
						return ;
					}
					/*关系验证*/
					if(!this.RelationTwoOther){
						this.ToastShow('请选择家属2与本人的关系');
						return ;
					}
					if(this.RelationTwoOther=="其他"){
						let relationValue=regularMatch.trim(this.RelationTwoValue);
						if(!relationValue){
							this.ToastShow('请输入家属2与本人的关系');
							return ;
						}else{
							this.familyIntro.relationTwo=relationValue;
						}
					}else{
						this.familyIntro.relationTwo=this.RelationTwoOther;
					}
                    /*职务*/
					if(!this.famTwoPost){
						this.ToastShow('家属2的职位不能为空');
						return ;
					}
					/*工作单位*/
					if(!this.famTwoCompay){
						this.ToastShow('家属2的工作单位不能为空');
						return ;
					}
					/*电话*/
					if(!this.famTwoTel){
						this.ToastShow('请正确填写家属2的联系电话');
						return ;
					}
                    /*添加家属2数据*/
                     this.nameList.push(this.familyIntro.FullnameTwo);
                     this.relationList.push(this.familyIntro.relationTwo);
                     this.companyNameList.push(this.familyIntro.CompanyNameTwo);
                     this.jobList.push(this.familyIntro.postTwo);
                     this.phoneNumberList.push(this.familyIntro.ContactNumTwo);
				}
				if(!this.serverStatement){
					this.ToastShow('请先勾选服务声明');
						return ;
				}
				/*数据存贮*/
                let familyIntro={
                    nameList:this.nameList,
                    relationList:this.relationList,
                    companyNameList:this.companyNameList,
                    jobList:this.jobList,
                    phoneNumberList:this.phoneNumberList 
                };
                let familyIntroLocal='';
                 if(window.yksapp){  
                   familyIntroLocal=JSON.parse(yksapp.getValueByKey('h5inforPerfect'));
                   familyIntroLocal.familyIntro=familyIntro;
                   yksapp.setKeyValue("h5inforPerfect",JSON.stringify(familyIntroLocal));
                }else{
                   familyIntroLocal=JSON.parse(window.localStorage.getItem('h5inforPerfect'));
                   familyIntroLocal.familyIntro=familyIntro;   
				   window.localStorage.setItem("h5inforPerfect",JSON.stringify(familyIntroLocal));	
                }
//            this.familyNextFlag=true;
            this.$router.push({path:'/Inforperfect/InfoConfirm'})
			}
		},
        /*监听数据变化*/
        watch:{
			familfOneTel(val){
				this.familyIntro.ContactNumOne=this.formateInputTelePhone(val)
			},
			familfTwoTel(val){
				this.familyIntro.ContactNumTwo=this.formateInputTelePhone(val)
			}
            
        }
	}
</script>

<style>
	/*弹性盒布局*/
	#FamilyInformation{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	#FamilyInformation .familyinfor-header{
		flex-shrink: 0;
	}
	#FamilyInformation .familyinfor-main{
		flex-grow: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling:touch; 
	}
	#FamilyInformation .familyinfor-footer{
		flex-shrink: 0;
	}
	.server-statement{
		font-size: 0.28rem;
		padding: 20px 10px;
		width: 80%;
	}
	.server-statement i{
		color: #42cefc;
	}
</style>