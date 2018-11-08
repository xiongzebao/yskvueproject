<template>
	<div id="ExtendInforPefect">
        <mt-header title="拓展信息" class='extendinfor-header'>
                   <div slot="left"  v-tap="{methods:goBaseInfoway}">
                          <mt-button icon="back"></mt-button>
                   </div>
                   <div slot="right" >
                        <mt-button  v-tap="{methods:handleNextPage}">下一步</mt-button>
				   </div>
              </mt-header>
        <section class='extendinfor-main'>
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
								<div class='intro-range-line'></div>
								<div class='intro-range-round'></div>
							</div>
							<div class="intro-title">
							   <router-link to="/Inforperfect" class="intro-title-note intro-title-note-router">基本信息</router-link>
							   <div class="intro-title-line"></div>
							   <div class="intro-title-note">扩展信息</div>
							   <div class="intro-title-line"></div>
							   <div class="intro-title-note">家庭信息</div>

							</div>
						</div>
					</div>
			<div class="ExtendInforPefect" v-show='extendShowFlag'>
               <div class='public-infor-note'>
                    <span class="iconfont icon-mihao"></span><span class='infor-note-title'>学校信息</span>
                </div>
                <div class="information-item ">
                 <mt-cell title="考生学历:" is-link v-tap="{methods:chooseSchoolRangWay}" >
                    <span>{{extendIntro.userSchoolRang}}</span>
                </mt-cell>
                 <mt-cell title="考生类型:" is-link v-tap="{ methods : chooseDegreeTypeWay}">
				    <span>{{extendIntro.userDegreeType.text}}</span>
			    </mt-cell>
               <mt-cell title="考生学籍:" is-link  v-tap="{ methods : onProvince}">
				    <span>{{extendIntro.userScholRoll.text}}</span>
			   </mt-cell>
			     <mt-cell title="政治面貌:">
				     <mt-radio
                             class='infor-ui-list'
                            title=""
                            v-model="extendIntro.userPolitFace"
                            :options="['党员', '团员', '群众','其他']">
                    </mt-radio>
			    </mt-cell>
			    <mt-cell title="应往届:">
                           <mt-radio
                            class='infor-ui-list'
                            title=""
                            v-model="extendIntro.userFreshPres"
                            :options="['应届', '往届']">
                           </mt-radio>
                 </mt-cell>
			      <template v-if="userAttendShoolFak=='无'">
			      	 <mt-field label="就读学校:" placeholder="请输入就读学校" v-model="extendIntro.userAttendShool" :attr="{ maxlength: 60 } " type='textarea' rows='1' @click.native="setTextareaHeight">
			      	 <span v-tap="{ methods : onSchollChooe}">选择学校</span> 
				 	</mt-field>
			      </template>
               	  <template v-else>
						<mt-cell title="就读学校:" is-link v-tap="{ methods : onSchollChooe}">
						<span>{{userAttendShoolFak}}</span>
						</mt-cell>
				 	</mt-field>
               	  </template>
                <mt-field label="培训机构:" placeholder="请输入培训机构" v-model="extendIntro.userProfesschool" :attr="{ maxlength: 60 } " type='textarea' rows='1'> 
                </mt-field>
                </div>
                <template v-if='baokaoBlockFlag'>
                    <div class="extend-baokao">
                        <div class='public-infor-note'>
                            <span class="iconfont icon-mihao"></span><span class='infor-note-title'>报考信息</span>
                        </div> 
                        <a class="mint-cell mint-field mint-cell-show">
                           <div class="mint-cell-left"></div> 
                           <div class="mint-cell-wrapper  exam-number-help mint-cell-show">
                              <mt-popup v-model="examNumberHelpFlag" popup-transition="popup-fade" class='exam-number-help-pop'>
                                        <h2>考生号说明</h2>
                                        <p>考生号是各省考试院按照一定规则为应试考生统一编排或指定的序号，是考生参加考试时所需的重要信息。考生号为考生在本年度的报考编号，是在考生报名后，在考籍号基础上产生的。部分省份叫 法可能略有不同如报考号，报名号，考号等</p>
                                        
                              </mt-popup>
                               <div class="mint-cell-title">
                                    <span class="mint-cell-text">考生号:</span>
                                </div> 
                                <div class="mint-cell-value">
                                   <span>{{userExamNumbeQz}}</span>
                                    <input placeholder="考生号" type="tel" class="mint-field-core" :maxlength="examNumberLength" v-model='userExamNumbeAdd'> 
                                    <div class="mint-field-state"  v-tap="{methods:examNumberHelp}">
                                       <i class="iconfont icon-help">
                                        
                                       </i>

                                    </div> 
                                 
                                    <div class="mint-field-other"></div>
                                 </div>
                            </div> 
                            <div class="mint-cell-right"></div>
                         </a> 
                         <mt-cell title="考生语种:" is-link  	v-if='userYuzhongFlag'  v-tap="{methods:chooseLanguagesWay}">
				    			<span>{{extendIntro.userLanguages.text}}</span>
			    			</mt-cell>
                         <mt-cell title="文理科:">
                            <mt-radio
                            class='infor-ui-list'
                            title=""
                            v-model="extendIntro.userArtScience"
                            :options="[{label: '文科',value: '文科',disabled: lockIntroFlag},{label: '理科',value: '理科',disabled:lockIntroFlag},{label: '不分文理',value: '不分文理',disabled: lockIntroFlag}]">
                           </mt-radio>
                         </mt-cell>
                        
                    </div>
                </template>
		      <loading v-show='loadingFlag'></loading>
            </div>
        </section>
	    <!--弹出组件-->
	    <!--考生学历-->
			<mt-popup
			  class='publicPopup pop-school-rang'
			  v-model="popSchoolRangFlag"
			 >
			 	<div class="popupTitle">学历选择</div>
				  <mt-radio
				  	v-model="SchoolRangchoosedValue" 
				  	:options="SchoolRangchoosedValueDate"
				  	>
				  </mt-radio>
				  <div class="btnEnsure" >
                    <mt-button size="large"  :class="['btn', {'btn-ensure' : SchoolRangchoosedValue}]"  :disabled='!SchoolRangchoosedValue' v-tap="{methods:SchoolRangclickEnsure}">确定</mt-button>
			
		          </div>	
			</mt-popup>
	        <!--考生类型-->
			<mt-popup
			  class='publicPopup pop-degree-type'
			  v-model="popDegreeTypeFlag"
			 >
			 	<div class="popupTitle">类型选择</div>
				  <mt-radio
				  	v-model="DegreeTypechoosedValue" 
				  	:options="DegreeTypechoosedValueDate"
				  	>
				  </mt-radio>
				  <div class="btnEnsure" >
                    <mt-button size="large"  :class="['btn', {'btn-ensure' : DegreeTypechoosedValue}]"  :disabled='!DegreeTypechoosedValue' v-tap="{methods:DegreeTypeclickEnsure}">确定</mt-button>
			
		          </div>	
			</mt-popup>
			 <!--考生语种-->
			<mt-popup
			  class='publicPopup pop-languge-type'
			  v-model="poplangugeTypeFlag"
			 >
			 	<div class="popupTitle">语种选择</div>
				  <mt-radio
				  	v-model="langugeTypechoosedValue" 
				  	:options="LanguagesDate"
				  	>
				  </mt-radio>
				  <div class="btnEnsure" >
                    <mt-button size="large"  :class="['btn', {'btn-ensure' : langugeTypechoosedValue}]"  :disabled='!langugeTypechoosedValue' v-tap="{methods:langugeTypeclickEnsure}">确定</mt-button>
			
		          </div>	
			</mt-popup>
			<!--学校列表-->
			<mt-popup
				class='poppublic pop-school'
				v-model="popSchoolFlag"
				position="bottom"
				>
				<mt-picker :slots="schoolslots" ref='schoolPicker' :showToolbar='true'>
					<span class="mint-datetime-action mint-datetime-cancel" v-tap="{ methods : onSchoolCancle}">取消</span>
					<span class="mint-datetime-action mint-datetime-confirm" v-tap="{ methods : onSchoolConfirm}">确定</span>
				</mt-picker>
			</mt-popup>
    </div>
</template>

<script>
	import Vue from 'vue';
	import { Header,Cell } from 'mint-ui';
	import { Button,Toast } from 'mint-ui';
	import { Popup } from 'mint-ui';
	import { Radio } from 'mint-ui';
    import { Picker } from 'mint-ui';
    import {cityData} from '../public/cityData';
    import loading from '../public/Loading';

	Vue.component(Radio.name, Radio);
	Vue.component(Popup.name, Popup);
	Vue.component(Button.name, Button);
	Vue.component(Cell.name, Cell);
	Vue.component(Header.name, Header);
    Vue.component(Picker.name, Picker);
	export default {
		name:'ExtendInforPefect',
		data(){
			return {
				 /*lockIntroFlag为true时证件类型、证件号码、姓名、高考省份,考生类型、性别、文理科、手机号码这些字段锁定*/
                lockIntroFlag:false,
                extendIntro:{
                    userSchoolRang:'',/*学历*/
                    userDegreeType:'',/*类型-对象*/
                    userPolitFace:'',/*政治面貌*/
                    userScholRoll:'',/*学籍省份*/
                    userLanguages:'',/*语种*/
                    userAttendShool:'',/*就读学校*/
                    userProfesschool:'',/*培训机构*/
                    userExamNumber:'',/*考生号*/
                    userFreshPres:'',/*应往届*/
                    userArtScience:'',/*文理科*/
                   
                    
                },
				schoolslots:[
					{
                      flex: 1,
                      values: [],
                      textAlign: 'center'
					}
                    
				],
				popSchoolFlag:false,
				userAttendShoolFak:'',/*就读学校*/
                /*语种*/
                userYuzhongFlag:false,
                poplangugeTypeFlag:false,
                langugeTypechoosedValue:'',
                extendShowFlag:true,
                loadingFlag:false,
                baokaoBlockFlag:false,/*报考面板*/
                examNumberLength:'',/*考生需要填写长度*/
                userExamNumbeQz:'',/*学籍返回前缀*/
                userExamNumbeAdd:'',/*考生补充的*/ 
                examNumberHelpFlag:false,/*考生号说明*/
                /*起止时间*/
                popStartEndFlag:false,
                /*就读学校*/
                popAttendSchoolFlag:false,
                /*考生学历控制*/
                popSchoolRangFlag:false,
                SchoolRangchoosedValue:'',
                /*考生类型*/
                popDegreeTypeFlag:false,
                DegreeTypechoosedValue:'',
                /*学历数据*/
                SchoolRangchoosedValueDate:[{
						value: "小学",
						label: "小学"},
					{
						value: "初中",
						label: "初中"
					},
					{
						value: "高中",
						label: "高中"
					},
					{
						value: "大学",
						label: "大学"
					},
					{
						value: "中专",
						label: "中专"
					},
					{
						value: "同等学力",
						label: "同等学力"
					},
					{
						value: "其他",
						label: "其他"
					}],
                /*考生类型*/
                DegreeTypechoosedValueDate:[{
						value: JSON.stringify({id:1,text:"小学毕业生"}),
						label: "小学毕业生"},
					{
						value: JSON.stringify({id:2,text:"初中毕业生"}),
						label: "初中毕业生"
					},
					{
						value:JSON.stringify({id:3,text:"高中毕业生"}),
						label: "高中毕业生"
					},
					{
						value:JSON.stringify({id:4,text:"中专毕业生"}),
						label: "中专毕业生"
					},
                    {
                        value: JSON.stringify({id:'5',text:"大学在校生"}),
						label: "大学在校生"
                    }],
                LanguagesDate:[
                    {
						value:JSON.stringify({id:'1',text:"汉语言"}),
						label: "汉语言"
                    },
					{
						value: JSON.stringify({id:'2',text:"维语言"}),
						label: "维语言"
					},
					{
						value: JSON.stringify({id:'3',text:"哈语言"}),
						label: "哈语言"
					},
					{
						value:JSON.stringify({id:'4',text:"蒙语言"}),
						label: "蒙语言"
					},
                    {
                        value: JSON.stringify({id:'5',text:"民考汉"}),
						label: "民考汉"
                    },
					{
						value:JSON.stringify({id:'6',text:"柯语言"}),
						label: "柯语言"
					},
					{
						value:JSON.stringify({id:'9',text:"双语班"}),
						label: "双语班"
					}]
                
                
			}
		},
        mounted(){
			let that=this;
           this.$nextTick(function () {
				that.setTextareaHeight();
			 })
			this.cityData=cityData;/*获取城市数据*/;
		   /*监听数据*/
			this.$bus.on('provinceChoose',this.provinceChooseBackWay);   
			this.getSchoolData();
			this.setExtendInfoData();
        },
        components:{
           loading
        },
       	activated(){
            
       	},
        computed:{
           
        },
		methods:{
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
			onSchoolCancle(){
				this.popSchoolFlag=false;
			},
			onSchollChooe(){
				this.popSchoolFlag=true;
			},
			onSchoolConfirm(){
				this.userAttendShoolFak=this.$refs.schoolPicker.getValues()[0];
				this.popSchoolFlag=false;
			},
			onProvince(){
				if(this.lockIntroFlag){
					return ;
				}
				this.$router.push('/Inforperfect/Province');
			},
			setExtendInfoData(){
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
			getSchoolData(){
				/*获取学校列表*/
				let that=this;
				let schoolData=[];
				 ajaxMethod.doAjax("user,/api/m/auth/user/get_school_list.htm", {},function(database){
					 if(database.success){
						 if(database.datas.list){
								let scholList=database.datas.list;
								for(let i in scholList){
									schoolData[i]=scholList[i].schoolName;
								}
						 }
						schoolData.unshift('无');
						that.schoolslots[0].values=schoolData;
					 }else{
						 that.schoolslots[0].values=['无'];
					 }

				 },function(){},'json','post',function(){
					 that.schoolslots[0].values=['无'];
				 })
			},
            /*语种*/
            chooseLanguagesWay(){
                this.poplangugeTypeFlag=true;
                 
            },
            langugeTypeclickEnsure(){
                this.extendIntro.userLanguages=JSON.parse(this.langugeTypechoosedValue);
                 this.poplangugeTypeFlag=false;
            },
            /*考生号注意事项*/
            examNumberHelp(){
                this.examNumberHelpFlag=!this.examNumberHelpFlag;
            },
            /*返回到基本信息*/
            goBaseInfoway(){
                this.$router.push({path:'/Inforperfect'});
            },
            /*学籍返回时间*/
            provinceChooseBackWay(values){
               
                let text='';
				text=values.college.proviname?values.province.proviname+" "+values.college.proviname:values.province.proviname;
                this.extendIntro.userScholRoll={
                    province:values.province,
                    college:values.college,
                    text:text,
					areaLimit:values.areaLimit
                }
              	
                /*判断考生类型和考生号*/
                if(this.baokaoBlockFlag){
                    this.userExamNumbeAdd='';
                        /*考生号前缀*/
                        if (values.province.lianKaoHCD > 0) {
                            this.baokaoBlockFlag=true;
                            this.userExamNumbeQz=values.province.lianKaoHQZ;
                            this.examNumberLength=(values.province.lianKaoHCD)-(values.province.lianKaoHQZ).length;
                            
                        } else if(values.province.lianKaoHCD == 0){
                            this.baokaoBlockFlag=true;
                            this.userExamNumbeQz=values.province.lianKaoHQZ;
                            this.examNumberLength=32;     
                        } else {
                            this.baokaoBlockFlag=false;
                        };
                        if(values.province.provinId=='650000'){
                            this.userYuzhongFlag=true;
                        }else{
                            this.userYuzhongFlag=false;
                        }
                   
                }else{
                    
                }
                    
            },
          /*政治面貌*/
             choosePolitFaceWay(){
                this.popPolitFaceFlag=true;
             },
          /*考生学历*/
            chooseSchoolRangWay(){
                this.popSchoolRangFlag=true;
            },
            SchoolRangclickEnsure(){
                 this.extendIntro.userSchoolRang=this.SchoolRangchoosedValue;
                 this.popSchoolRangFlag=false;
            },
            /*考生类型*/
            chooseDegreeTypeWay(){
				if(this.lockIntroFlag){
					return ;
				}
                this.popDegreeTypeFlag=true;
            },
            DegreeTypeclickEnsure(){
                this.extendIntro.userDegreeType=JSON.parse(this.DegreeTypechoosedValue);
                this.popDegreeTypeFlag=false;
                /*判断报考面板*/
                if(this.extendIntro.userDegreeType.id=='1'||this.extendIntro.userDegreeType.id=='2'){
                    this.baokaoBlockFlag=false;    
                }else{
                    this.baokaoBlockFlag=true;
                }
                /*学籍省份相关的清零*/
                 this.extendIntro.userScholRoll='';
                 this.userExamNumbeQz="";
                 this.userExamNumbeAdd="";
                 this.examNumberLength=32;
                this.userYuzhongFlag=false;
                 
            },
             /*处理数据*/
            fixdata(introBaseDatas){
               let dataIntroPro=introBaseDatas.provinceDO;/*省份有关的*/
			   let dataIntro=introBaseDatas.obj;/*个人信息数据*/
			   this.lockIntroFlag=dataIntro.applyProf;
               this.extendIntro.userSchoolRang=dataIntro.xueLi;/*学历*/
               /*类型*/
			    this.extendIntro.userScholRoll={
                    province:{
						"provinId": dataIntroPro.shengFenHao, 
						"proviname": dataIntroPro.shengFenMing, 
						"lianKaoHCD": dataIntroPro.lianKaoHCD, 
						"lianKaoHQZ": dataIntroPro.lianKaoHQZ, 
						"areaLimit": dataIntroPro.areaLimit
					},
                    college:{
						"provinId": dataIntro.diShiHao, 
                		"proviname": dataIntro.diShiMing
					},
                    text:dataIntroPro.shengFenMing+' '+(dataIntro.diShiMing||"")
                }/*学籍*/
				this.extendIntro.userPolitFace=dataIntro.zhengZhiMM;/*政治面貌*/
				this.extendIntro.userFreshPres=dataIntro.yingWangJie;/*应往届*/
				/*就读学校*/
				if(dataIntro.suoZaiXX=='无'){
					this.userAttendShoolFak=='';
				}else{
					this.userAttendShoolFak='无';
					this.extendIntro.userAttendShool=dataIntro.suoZaiXX;
				}
				this.extendIntro.userProfesschool=dataIntro.suoZaiHS;/*培训机构*/
				this.extendIntro.userDegreeType={id:dataIntro.stuType,text:dataIntro.stuTypeStr};
				this.DegreeTypechoosedValue=JSON.stringify({id:dataIntro.stuType,text:dataIntro.stuTypeStr})
				if(dataIntro.stuType=='1'||dataIntro.stuType=='2'){
					this.baokaoBlockFlag=false;    
				}else{
					this.baokaoBlockFlag=true;
					this.extendIntro.userExamNumber=dataIntro.kaoShengHao;
					if (dataIntroPro.lianKaoHCD > 0){
                            this.examNumberLength=(dataIntroPro.lianKaoHCD)-(dataIntroPro.lianKaoHQZ.length);   
                        } else if(dataIntroPro.province.lianKaoHCD == 0){ 
                            this.examNumberLength=32;
                        }
				  this.userExamNumbeQz=dataIntroPro.lianKaoHQZ;	this.userExamNumbeAdd=dataIntro.kaoShengHao.substring(dataIntroPro.lianKaoHQZ.length) 
				  this.extendIntro.userArtScience=dataIntro.wenLiKe;
				}
           
				
//				
//                if(this.extendIntro.passFlag){
//                    this.artClassChoosed= JSON.stringify(this.extendIntro.passFlag);
//                }
                
            },
			/*遮罩弹出*/
			ToastShow(meg){
				Toast({
				  message: meg,
				  position: 'middle',
				  duration: 3000
				});
			},
			/*下一步*/
			handleNextPage(){
				
				
                /*考生学历*/
                if(!this.extendIntro.userSchoolRang){
                    this.ToastShow("请选择考生学历");
                    return ;
                }
                /*考生类型*/
                if(!this.extendIntro.userDegreeType.text){
                    this.ToastShow("请选择考生类型");
                    return ;
                }
                /*考生学籍*/
                if(!this.extendIntro.userScholRoll.text){
                    this.ToastShow("请选择考生学籍");
                    return ;
                }
                /*语种*/
                if(this.userYuzhongFlag){
                    if(!this.extendIntro.userLanguages.text){
                    this.ToastShow("请选择考生语种");
                    return ;
                   }
                }
               /* 政治面貌*/
                if(!this.extendIntro.userPolitFace){
                    this.ToastShow("请选择政治面貌");
                    return ;
                }
				if(!regularMatch.trim(this.userAttendShoolFak)){
					this.ToastShow("请选择就读学校");
                    return ;
				}
				if(this.userAttendShoolFak=='无'){
					if((!regularMatch.trim(this.extendIntro.userAttendShool))&&(regularMatch.trim(this.extendIntro.userAttendShool)=='无')){
						this.ToastShow("请输入就读学校");
                        return ;
					}
				}
               /*培训机构*/
                if(!this.extendIntro.userProfesschool){
                    this.ToastShow("请输入培训机构");
                    return ;
                }
          
               /* 报考面板信息判断*/
                if(this.baokaoBlockFlag){
                    let examQz=this.extendIntro.userScholRoll.province.lianKaoHQZ;
                    let examCd=this.extendIntro.userScholRoll.province.lianKaoHCD;
                    let addCd=examCd-examQz.length;
                      /*考生号不是数字的逻辑*/
                    if(!regularMatch.noSpaceintval(this.userExamNumbeAdd)){
                            if(examQz){
						        if(examCd == 0){
                                    this.ToastShow('考生号是以' + this.examQz + '开头的数字不限长度'); 
                                } else if(examCd> 0){
                                    this.ToastShow('考生号是以' +examQz + '开头的'+examCd+'位数字'); 
                                }
                            } else {
                                if(examCd == 0){
                                    this.ToastShow('考生号为数字不限长度'); 
                                } else if(examCd > 0){
                                    this.ToastShow('考生号为'+examCd+'位数字'); 
                                }
                            }
					   return;
                    }
                     /*考生号为数字处理*/
                     if(examCd > 0){
                        if(examQz){
                            if(addCd!=this.userExamNumbeAdd.length){
                                this.ToastShow('考生号是以' + examQz + '开头的'+examCd+'位数字');  
                                return;
                                }
                            } else {
                                if(addCd!=this.userExamNumbeAdd.length){
                                    this.ToastShow('考生号为'+examCd+'位数字'); 
                                    return;
                                }   
                            }
                    }
					/*考生号*/
				this.extendIntro.userExamNumber=''+examQz+(regularMatch.trim(this.userExamNumbeAdd));
                    /*应往届*/
                    if(!this.extendIntro.userFreshPres){
                        this.ToastShow('请选择应往届'); 
                        return;
                    }
                    /*文理科*/
                     if(!this.extendIntro.userArtScience){
                        this.ToastShow('文理科'); 
                        return;
                    }
                    
                    
                }
                let extendIntro='';
                if(window.yksapp){
                   extendIntro=JSON.parse(yksapp.getValueByKey('h5inforPerfect'));
                   extendIntro.extendIntro=this.extendIntro;
                   yksapp.setKeyValue("h5inforPerfect",JSON.stringify(extendIntro));
                }else{
                   extendIntro=JSON.parse(window.localStorage.getItem('h5inforPerfect'));
                   extendIntro.extendIntro=this.extendIntro;   
				   window.localStorage.setItem("h5inforPerfect",JSON.stringify(extendIntro));
                }             	
				this.$router.push({path:'/Inforperfect/FamilyInformation'})
			}
			
		}
	}
</script>

<style>
	/*弹性盒布局*/
	#ExtendInforPefect{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	#ExtendInforPefect .extendinfor-header{
		flex-shrink: 0;
	}
	#ExtendInforPefect .extendinfor-main{
		flex-grow: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling:touch; 
	}
    /*考生号弹窗*/
    .exam-number-help{
        position: relative;
    }
    .exam-number-help-pop{
        width: 80%;
		padding: 10px;
		box-sizing: border-box;
    }
	.exam-number-help-pop h2{
		font-size: 0.3rem;
	}
    .mint-cell-show{
        overflow: visible;
    }

</style>