<template>	
  		 <div class="infor-base">
  		 	  <template v-if='loadingFlag'>
  		 	  		<loading></loading>	
  		 	  </template>
  		 	  <template v-else>
  		 	  		<mt-header title="基本信息" class='baseinfor-header'>
						   <div slot="left"  v-tap="{methods:introInfullBack}">
								 <mt-button icon="back"></mt-button>
						   </div>
						   <div slot="right">
								 <mt-button  v-tap="{methods:handleNextPage}">下一步</mt-button>
						   </div>
					</mt-header>
			        <section class="baseinfor-main">
		  			<div class="noteInfor">
						<!--弹出框-->
						<!--考生信息填写-->
						<mt-popup v-model="Inforequire" popup-transition="popup-fade" class='Inforequire'>
							<h1>考生信息填写说明</h1>
							<p>1、考生信息的填写将影响您的专业报考,请认真填写</p>
							<p>2、报考专业前基本信息可在手机端自行修改(例：修改考生号：点击学籍省份重新选择自己所在省份再点确认,此时考生号已经重置);</p>
							<p>3、报考专业后如需修改,需要使用电脑登录到"艺考升"官网,在首页点击"我的申请",提交我的申请。</p>
						</mt-popup>
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
								<div class='intro-range-line'></div>
								<div class='intro-range-round'></div>
								<div class='intro-range-line'></div>
								<div class='intro-range-round'></div>
							</div>
							<div class="intro-title">
							   <div class="intro-title-note">基本信息</div>
							   <div class="intro-title-line"></div>
							   <div class="intro-title-note">扩展信息</div>
							   <div class="intro-title-line"></div>
							   <div class="intro-title-note">家庭信息</div>

							</div>
						</div>
					</div>
		  			<div class='baseinforFill'>
        			<div class='public-infor-note'>
           			 <span class="iconfont icon-mihao"></span><span class='infor-note-title'>个人信息</span>
        			</div>
        			<div class="baseinforHeader">
        
			<mt-cell title="证件类型:" is-link>
				<span class="special">{{zhengJianLX}}</span>
			</mt-cell>
			<mt-cell title="证件号码:" is-link>
				<span class="special">{{shenFenZH}}</span>
			</mt-cell>
           <template v-if='baseIntro.userName'>
                   <mt-field label="姓名:" placeholder="请输入姓名" v-model="baseIntro.userName" :attr="{ maxlength: 20 } " :state="[userNameCom ? 'success' : 'error']" :disableClear='true' :disabled='lockIntroFlag' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <template v-else>
                   <mt-field label="姓名:" placeholder="请输入姓名" v-model="baseIntro.userName" :attr="{ maxlength: 20 } "  :disableClear='true' :disabled='lockIntroFlag' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <mt-cell title="性别:">
                <mt-radio
                    class='infor-ui-list'
                    title=""
                    v-model="baseIntro.userSex"
                    :options="[{label: '男',value: '男',disabled: lockIntroFlag},{label: '女',value: '女',disabled:lockIntroFlag}]">
                </mt-radio>
            </mt-cell>
           
           <mt-cell title="民族:" is-link v-tap="{ methods : chooseNationWay}">
				<span>{{baseIntro.userNation}}</span>
           </mt-cell>
            <mt-cell title="出生日期:" is-link v-tap="{ methods : chooseBirthWay}">
				<span>{{baseIntro.userBirth}}</span>
            </mt-cell>
			
			<mt-cell title="通讯地址:" is-link v-tap="{ methods : chooseaddressAddWay}" >
				<span>{{baseIntro.userZipAddresCom.text}}</span>
			</mt-cell>
            <mt-field label="详细地址:" placeholder="请输入详细的通讯地址" v-model="baseIntro.userZipAddres" :attr="{ maxlength: 60 } " type='textarea' rows='1' @click.native="setTextareaHeight"> 
            </mt-field>
            <mt-cell title="收件人:" class="baseinfor-recevie">
               <input type="text" placeholder="请输入收件人" v-model='baseIntro.useReceiver' :disabled='useReceiverSelf' class='user-recevier-input' maxlength=16 @click.native="setTextareaHeight">
                <mt-checklist
					  title=""
					  v-model="useReceiverSelf"
					  :options="['本人']"
					  class='baseinfor-recevie-check'>
				</mt-checklist>
            </mt-cell>
            <template v-if='baseIntro.userTeleP'>
                   <mt-field label="手机号码:" placeholder="请输入手机号码" v-model="baseIntro.userTeleP" :attr="{ maxlength: 13 } " :state="[/^1[\d\s]{12}$/.test(baseIntro.userTeleP) ? 'success' : 'error']" :disableClear='true' type='tel' :disabled='lockIntroFlag' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <template v-else>
                   <mt-field label="手机号码:" placeholder="请输入手机号码" v-model="baseIntro.userTeleP" :attr="{ maxlength: 13 } "  :disableClear='true' type='tel' :disabled='lockIntroFlag' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <template v-if='baseIntro.userParenTeleP'>
                   <mt-field label="家长手机:" placeholder="请输入家长手机号码" v-model="baseIntro.userParenTeleP" :attr="{ maxlength: 13 } " :state="[/^1[\d\s]{12}$/.test(baseIntro.userParenTeleP) ? 'success' : 'error']" :disableClear='true' type='tel' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <template v-else>
                   <mt-field label="家长手机:" placeholder="请输入家长手机号码" v-model="baseIntro.userParenTeleP" :attr="{ maxlength: 13 } "  :disableClear='true' type='tel' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <template v-if='baseIntro.userQq'>
                   <mt-field label="QQ:" placeholder="请输入QQ" v-model="baseIntro.userQq" :attr="{ maxlength: 16 } " :state="[userQqCom ? 'success' : 'error']" :disableClear='true' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
           <template v-else>
                   <mt-field label="QQ:" placeholder="请输入QQ" v-model="baseIntro.userQq" :attr="{ maxlength: 16 } "  :disableClear='true' @click.native="setTextareaHeight"> 
                  </mt-field>
           </template>
        </div>
	 				</div>
	  				</section>
  		 	 </template>
			 
	
				<!--日期选择-->
				<mt-datetime-picker ref="birthPicker" type="date" :startDate='startDate' year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="birthConfirm" class='birthday-ymd'>
				</mt-datetime-picker>
				<!--通讯地址-->
				<mt-popup
				class='poppublic pop-address-addmore'
				v-model="popaddressaddFlag"
				position="bottom"
				>
				<mt-picker :slots="addressaddslots"  valueKey='text' @slotValueChange="slotAddressaddChange" ref='addressPicker' :showToolbar='true'>
					<span class="mint-datetime-action mint-datetime-cancel" v-tap="{ methods : onAdressCancle}">取消</span>
					<span class="mint-datetime-action mint-datetime-confirm" v-tap="{ methods : onAdressConfirm}">确定</span>
				</mt-picker>
				</mt-popup>

  		</div>
  	
  
</template>
<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Field } from 'mint-ui';
	import { DatetimePicker } from 'mint-ui';
	import { Popup } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import { Checklist } from 'mint-ui';
    import loading from '../public/Loading';
	import VueBus from 'vue-bus';
	const cityDate3 = require ('./../public/cityData3.json');
	Vue.component(Field.name, Field);
	Vue.component(Cell.name, Cell);
	Vue.component(Popup.name, Popup);
	Vue.component(DatetimePicker.name, DatetimePicker);
    Vue.component(Checklist.name, Checklist);
	Vue.use(VueBus);
   
	export default {
		name: 'baseinforPerfect',
		data() {
			return {
               
                /*lockIntroFlag为true时证件类型、证件号码、姓名、高考省份,考生类型、性别、文理科、手机号码这些字段锁定*/
                lockIntroFlag:false,
                idLockFlag:false,/*id注册的证件类型，证件号码，出生日期不可修改*/
				useRegisterFlag:false,/*注册标识*/
                /*一个对象中便于监听是否变换*/
                baseIntro:{
                    zhengJianLX:'',//证件类型
                    shenFenZH:'',//身份证号
                    userName: '',//姓名
                    userBirth: '请选择出生日期',//出生日期
                    userSex: '',//性别
                    userNation: '',//民族
                    userZipAddres:'',//详细通讯地址
                    userTeleP: '',//本人手机
					userParenTeleP:'',/*家长手机*/
					userZipAddresCom:'',/*通信地址*/
                    userQq: '',/*本人qq*/
                    useReceiver:'',//收件人
                },
                /*收件人标志*/
                useReceiverSelf:[],
                startDate: new Date("1990/1/1"),/*设置开始时间*/
                loadingFlag:true,/*动画加载*/
                Inforequire: false,/*考生信息填写说明flag*/
                extendRangeValue: 0,//显示信息进度条值
                familyRangeValue:0,
                /*通讯地址*/
                popaddressaddFlag:false,
                addressaddslots:[
                    {
                      flex: 1,
                      values: [''],
                      className: 'threeSlotPicker threeSlotPickerProvince'
                      
                    },{
                      flex: 1,
                      values: [''],
                      className: 'threeSlotPicker threeSlotPickerCity'
                    },
					{
                      flex: 1,
                      values: [''],
                      className: 'threeSlotPicker'
                      
                    }
					
                ]

            }
		},
		methods: {
            /*通讯地址*/
            chooseaddressAddWay(){
                this.popaddressaddFlag=true;
            },
			onAdressCancle(){
				 this.popaddressaddFlag=false;
			},
			onAdressConfirm(){
				let provObj=this.$refs.addressPicker.getValues();
				this.baseIntro.userZipAddresCom={
						 text:provObj[0].text+" "+provObj[1].text+" "+ provObj[2].text,
						 firstId:provObj[0].value,
						 secId:provObj[1].value,
						 thirId:provObj[2].value
					 }				
				this.popaddressaddFlag=false;
			},
			setTextareaHeight(){
				$('textarea').on('keyup', function(e){
					this.style.height = 'auto';
					this.scrollTop = 0; //防抖动
					this.style.height = this.scrollHeight + 'px';
				})
				$("input,textarea").on("focus",function(){
					this.scrollIntoView();
				})
			},
			slotAddressaddChange(values){
				if(values.className.indexOf('threeSlotPickerProvince')!=-1){
					let provinceIndex=this.provinceIndex=values.valueIndex;
					let threeCity=[],
						threeConty=[];
					for(let i in  cityDate3[provinceIndex].children){
						threeCity[i]={'text':cityDate3[provinceIndex].children[i].text,'value':cityDate3[provinceIndex].children[i].value}
					}
					for(let i in cityDate3[provinceIndex].children[0].children){
						threeConty[i]={'text':cityDate3[provinceIndex].children[0].children[i].text,'value':cityDate3[provinceIndex].children[0].children[i].value}
					}
					this.addressaddslots[1].values=threeCity;

					this.addressaddslots[2].values=threeConty;
				};
				if(values.className.indexOf('threeSlotPickerCity')!=-1){
					let index=values.valueIndex;
					let provinceIndex=this.provinceIndex;
					
					let threeConty=[];
					
					for(let i in cityDate3[provinceIndex].children[index].children){
						threeConty[i]={'text':cityDate3[provinceIndex].children[index].children[i].text,'value':cityDate3[provinceIndex].children[index].children[i].value}
					}
					this.addressaddslots[2].values=threeConty;
				}
			},
            InforequireShow() {
				this.Inforequire = true;
			},
             /*路由后退*/
            introInfullBack(){
                /*手机端在基本信息点击返回关闭整个页面*/
                    if(window.yksapp){
                        yksapp.closeWebPage();
                    }else{
                     this.$router.go(-1);
                   }
                
                
            },
            FormatDate(strTime) {
				var date = new Date(strTime);
				var year = date.getFullYear();
				var month = String(date.getMonth() + 1); //转字符
				var day = String(date.getDate());
				month.length == 1 ? month = ("00" + month).substr(-2) : month = month;
				day.length == 1 ? day = ("00" + day).substr(-2) : day = day;
				return year + '-' + month + '-' + day
			},
			formaTelephone(obj){
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
			/*日期选择*/
			chooseBirthWay() {
				if(this.idLockFlag||this.lockIntroFlag){
					return ;
				}
				this.$refs.birthPicker.open();
			},
			/*日期*/
			birthConfirm(choosedTime) {
				this.baseIntro.userBirth = this.FormatDate(choosedTime)
			},
			/*民族*/
			chooseNationWay() {
				 this.$router.push({name:'Nation'});   
			},
			/*下一步*/
			handleNextPage() {  
            /*用户基本信息的判断*/
                /*用户输入都做消除前后空格处理*/
                /*姓名*/
                if(!(regularMatch.ChineseName(this.baseIntro.userName))){
                   this.toast('请正确填写姓名');
                    return ;
                }
            /*性别*/
                if(!this.baseIntro.userSex){
                    this.toast('性别不能为空');
                    return ;
                } 
                
                /*民族*/
                if(!this.baseIntro.userNation){
                    this.toast('民族不能为空');
                    return ;
                 }
               /*出生日期*/
                 if(!regularMatch.birth(this.baseIntro.userBirth)){
                    this.toast('出生日期不能为空');
                    return ;
                 }
                if(!this.baseIntro.userZipAddresCom.text){
                    this.toast('请填写通讯地址');
                    return ;
                }
				
                if(!regularMatch.trim(this.baseIntro.userZipAddres)){
                     this.toast('请填写详细的通讯地址');
                     return ;
                }
                /*通讯地址不能包含表情 值为真代表存在*/
                if(regularMatch.emojiUtils(this.baseIntro.userZipAddres)){
                    this.toast('通讯地址不能包含表情符号!');
                    return ;
                }
                /*收件人*/
                if(this.useReceiverSelf[0]){
                   this.baseIntro.useReceiver=this.baseIntro.userName;
                    
                }else{
                    if(!regularMatch.trim(this.baseIntro.useReceiver)){
                     this.toast('请填写收件人');
                     return ;
                    }
                }
				let teleReg=/1[\d\s]{12}/
				 /*本人手机*/
                if(!teleReg.test(this.baseIntro.userTeleP)){
                     this.toast('请正确填写手机号码');
                     return ;
                }
				/*家长手机*/
				if(!teleReg.test(this.baseIntro.userParenTeleP)){
                     this.toast('请正确填写家长手机号码');
                     return ;
                }
                /*qq*/
				let spaceUserqq=regularMatch.trim(this.baseIntro.userQq);
				if(spaceUserqq){
					if(!regularMatch.intval(spaceUserqq)){
                        this.toast('请正确填写QQ!');
                        return ;
                    } 
				}
                        
                
             let  introBaseIntro={
                 baseIntro:this.baseIntro
             };
             /*重新赋值清零操作兼容电脑调试*/
             if(window.yksapp){
                 yksapp.setKeyValue("h5inforPerfect",'null');
                 yksapp.setKeyValue("h5inforPerfect",JSON.stringify(introBaseIntro));  
             }else{
                 localStorage.setItem("h5inforPerfect",'null');
                 localStorage.setItem("h5inforPerfect",JSON.stringify(introBaseIntro));
             }
                
             this.$router.push({path:'/Inforperfect/ExtendInforPefect'}); 
             
			},
			/*民族选择和民族返回事件监听*/
			nationValue(obj) {
                  this.baseIntro.userNation =obj.value ;  
			},
			toast(message){ 
                Toast({
                        message: message,
                        position: 'middle',
                        duration: 2000
                  });
            },
			setBirthSexData(){
				/*pc不执行此代码*/
				if(!window.yksapp_user){
						return ;
				 }
				 /*获取证件类型和证件号码*/
				 let stdType=yksapp_user.getStdIDType();
				 let stdIDNum=yksapp_user.getStdIDNum();
				 this.baseIntro.zhengJianLX=stdType;
				 this.baseIntro.shenFenZH=stdIDNum;
				/*默认性别，考生出生日期*/
				 if((stdType=='1')&&(stdIDNum)){
                       let stdIdNum=String(stdIDNum);
                       if(regularMatch.shenFenZH(stdIdNum)){
                            let sex=stdIdNum.substr(16,1);
                                /*判断奇偶*/
                                if(sex%2==0){
                                       this.baseIntro.userSex='女'
                                 }else{
                                       this.baseIntro.userSex='男' 
                                 }
                                 let birthStr=stdIdNum.substr(6,8);
                                 let birthStrYear=birthStr.substr(0,4);
                                 let birthStrMonth=birthStr.substr(4,2);
                                 let birthStrDay=birthStr.substr(6,2);
                                 this.baseIntro.userBirth=birthStrYear+'-'+birthStrMonth+'-'+birthStrDay;
                                 this.idLockFlag=true;/*出生日期锁定*/ 
                                }
                            }else{
                                this.idLockFlag=false;
                            }
			},
			setAddressThreeData(cityDate3){
				/*通讯地址三级联动*/
				this.provinceIndex='';/*保存省份的下标*/
				let threeProvince=[];
				for(let i in cityDate3){
					threeProvince[i]={'text':cityDate3[i].text,'index':i,'value':cityDate3[i].value};	
				}
				this.addressaddslots[0].values=threeProvince;
				this.provinceIndex=0;
				let threeCity=[],
					threeConty=[];
				for(let i in  cityDate3[0].children){
					threeCity[i]={'text':cityDate3[0].children[i].text,'index':i,'value':cityDate3[0].children[i].value}
				}
				for(let i in cityDate3[0].children[0].children){
					threeConty[i]={'text':cityDate3[0].children[0].children[i].text,'value':cityDate3[0].children[0].children[i].value}
				}
				this.addressaddslots[0].values=threeProvince;
				this.addressaddslots[1].values=threeCity;

				this.addressaddslots[2].values=threeConty;
			},
			getBaseInfoData(){
				/*数据解析显示*/
            	var that=this;
            	ajaxMethod.doAjax("user,/api/m/auth/user/get_stuinfo.htm", {}, function(database) {
					console.log(database)
					if(database.success){  
                       if(database.datas.obj){
						   that.useRegisterFlag=true;
						  	if(window.yksapp){
								yksapp.setKeyValue("h5IntroAlreadyPerfected",JSON.stringify(database.datas));
							   }else{
									localStorage.setItem('h5IntroAlreadyPerfected',JSON.stringify(database.datas));
								  
							   }
                            that.setBaseInfoData(database.datas.obj);
                       }else{
                        /*判断对象是否为空且先清空数据后面需要判断*/
                           if(window.yksapp){
                               yksapp.setKeyValue("h5IntroAlreadyPerfected",'null');
                           }else{
                              localStorage.setItem('h5IntroAlreadyPerfected','null');  
                           }   
                       }
                    }else{
                        that.toast(database.message) 
                    }
            },function(){
                that.loadingFlag=false;           
            });
			},
            setBaseInfoData(dataIntroBase){
                /*信息锁定标志*/
               
                let dataIntro=dataIntroBase;/*个人信息数据*/
                if(!dataIntro){
                    return ;
                }
                this.lockIntroFlag=dataIntro.applyProf;
				this.baseIntro.zhengJianLX=dataIntro.zhengJianLX;
                this.baseIntro.shenFenZH=dataIntro.shenFenZH;
				this.baseIntro.userName=dataIntro.kaoShengXM;/*姓名*/
				this.baseIntro.userSex=dataIntro.xingBie;/*性别*/
				this.baseIntro.userTeleP=dataIntro.shouJi;/*本人手机*/
				this.baseIntro.userNation=dataIntro.minZu;/*民族*/
				this.baseIntro.userBirth=dataIntro.chuShengRQ;/*出生日期*/
				/*详细通讯地址*/
				this.baseIntro.userZipAddres=dataIntro.tongXinDZ;
				if(dataIntro.tongXinDZExt){
				
					
					let tongXinDZExt=dataIntro.tongXinDZExt.split('-');
				
				
				let fistI=0,fistIval='',secJ=0,secJval='',thidZ=0,thidZval='';
				
				for(let i in cityDate3){
					if(cityDate3[i].value==tongXinDZExt[0]){
						fistI=i;
						fistIval=cityDate3[i].text;
						break;
					}
				}
				for(let j in cityDate3[fistI].children){
					if(cityDate3[fistI].children[j].value==tongXinDZExt[1]){
						secJ=j;
						secJval=cityDate3[fistI].children[j].text;
						break;
					}
				}
				for(let z in cityDate3[fistI].children[secJ].children){
					if(cityDate3[fistI].children[secJ].children[z].value==tongXinDZExt[2]){
						thidZ=z;
						thidZval=cityDate3[fistI].children[secJ].children[z].text;
						break;
					}
				}
				this.baseIntro.userZipAddresCom={
					"text":fistIval+' '+secJval+' '+thidZval, 
					"firstId": tongXinDZExt[0], 
					"secId": tongXinDZExt[1], 
					"thirId": tongXinDZExt[2]
				}
				}
				/*收件人处理*/
				this.baseIntro.useReceiver=dataIntro.addressee;/*收件人*/
				if(dataIntro.addressee==dataIntro.kaoShengXM){
					this.useReceiverSelf=['本人'];
				}
				this.baseIntro.userQq=dataIntro.qQ;/*本人qq*/
				this.baseIntro.userParenTeleP=dataIntro.jiaZhangDH;/*家长手机*/  
            }

		},
		mounted() {
			this.$nextTick(function () {
				 $('textarea').on('keyup', function(e){
					this.style.height = 'auto';
					this.scrollTop = 0; //防抖动
					this.style.height = this.scrollHeight + 'px';
				})
				$("input").on("focus",function(){
					this.scrollIntoView();
				})
			 })  
			/*民族选择和民族返回事件监听*/
			this.$bus.on('nationChoose', this.nationValue);
			this.getBaseInfoData();
			this.setAddressThreeData(cityDate3);
			this.setBirthSexData();
           
		},
        computed:{
            /*省份证号和证件类型的转换*/
            shenFenZH(){
               return  this.baseIntro.shenFenZH.toLocaleUpperCase();
            },
            baseUserPhone(){
                return this.baseIntro.userTeleP
            },
			baseParentPhone(){
				return this.baseIntro.userParenTeleP
			},
            zhengJianLX(){
                if (this.baseIntro.zhengJianLX == 1) {
                     return "二代身份证";
                } 
                if (this.baseIntro.zhengJianLX == 2) {
                     return "军人证";
                }
                if  (this.baseIntro.zhengJianLX == 3) {
                     return "港澳台身份证";
                }
                if  (this.baseIntro.zhengJianLX == 4) {
                     return "护照";
                }
            },
			/*姓名的计算属性*/
			userNameAndRe(){
				return this.baseIntro.userName
			},
            userNameCom(){
				return regularMatch.ChineseName(this.baseIntro.userName);     
            },
			/*qq*/
			userQqCom(){
				return regularMatch.trimIntval(this.baseIntro.userQq);  
			}
        },
		components: {
            loading
		},
        /*监听数据变化*/
        watch:{
            baseIntro:{
　　　　　　　　　　handler(curVal,oldVal){
			  			if(!this.useRegisterFlag){
							/*数据改变*/
							if(window.yksapp){
								yksapp.setKeyValue("h5baseintroChange",'change');
							}else{
								localStorage.setItem("h5baseintroChange",'change');
							}
						}
　　　　　　　　　　},
　　　　　　　　　　deep:true
　　　　　　　　},
           baseUserPhone:function(val){
			   this.baseIntro.userTeleP=this.formaTelephone(val);
           },
		   baseParentPhone(val){
			    this.baseIntro.userParenTeleP=this.formaTelephone(val);
			},
            /*姓名变换收件人清零*/
           userNameAndRe:function(value){
			   if(this.useReceiverSelf.length>=1){
				   this.baseIntro.useReceiver=value;
			   }
              
           },
            useReceiverSelf:function(value){
				console.log(value)
				if(value){
					if(value.length){
                        if(!regularMatch.trim(this.baseIntro.userName)){
                           this.toast('姓名不能为空');
                           this.useReceiverSelf=[];
                           return ;
                       }
                       this.baseIntro.useReceiver=this.baseIntro.userName; 
                    }else{
                        this.baseIntro.useReceiver='';
                    }
				}
                    
            }
        }
	}
</script>

<style>
	/*弹性盒布局*/
	#inforPerfect .infor-base{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	#inforPerfect .baseinfor-header{
		flex-shrink: 0;
	}
	#inforPerfect .baseinfor-main{
		flex-grow: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling:touch; 
	}
	/*覆盖title样式*/
    #inforPerfect input[type="text"]{
        text-indent: 0px;
    }
     #inforPerfect input:disabled{
        background-color: #fff;
    }
	#inforPerfect .mint-field .mint-cell-title{
		width:1.4rem;
	}
    #inforPerfect .mint-field-state{
        margin-left:0px;
    }
    /*mint-ui样式更改*/
	
	#inforPerfect .mint-cell-wrapper {
		font-size: 0.28rem;
        line-height: normal;
        
	}
	#inforPerfect .user-recevier-input{
		flex-grow: 1;
	}
	#inforPerfect .user-recevier-choose{
		flex-grow: 0;
		flex-shrink: 0;
	}
	/*输入字体超出隐藏*/
    #inforPerfect .mint-cell-value{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
	
    #inforPerfect  .mint-cell-title {
            text-align: justify;
            align-content: space-between;
            box-sizing: border-box;
		    flex: none;
		    width: 1.4rem;
            margin-right: 5px;
            
    }
    #baseinforFill .user-recevier{
        display: flex;
    }
    .public-infor-note{
        padding:5px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #f4f4f4;
		font-size:0.3rem;
    }
    .public-infor-note .iconfont{
        color:#f44336;
        font-size:0.25rem;
        padding-right: 5px;
    }
	#inforPerfect .baseinfor-recevie .mint-radiolist .mint-cell{
		width: 100%;
	}
	#inforPerfect .baseinfor-recevie-check{
		flex-grow: 0;
		flex-shrink: 0;
	}
	#inforPerfect .baseinfor-recevie-check .mint-cell-title{
		flex: 1;
	}
</style>