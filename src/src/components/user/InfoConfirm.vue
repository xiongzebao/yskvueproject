<template>
	<div id="InfoConfirm">
		<mt-header title="确认信息" class='infor-header'>
             <div slot="left"  v-tap="{methods:onRouterBack}">
                  <mt-button icon="back"></mt-button>
              </div>
         </mt-header>
       	  <div class='info-total'>
       	  		<div class="Info-list">
                     <div class='public-infor-note'>
                    <span class="iconfont icon-mihao"></span><span class='infor-note-title'>个人资料</span>
                   </div>
                     <ul class='introIntro baseIntro'>
                         <li> 
                           <div><span>证</span><span>件</span><span>类</span><span>型:</span></div>
				           <div class='special'>{{zhengJianLX}}</div>
                        </li>
                         <li>
                            <div><span>证</span><span>件</span><span>号</span><span>码:</span></div>
                            <div class='special'>{{shenFenZH}}</div>
				         </li>
                        <li>
                            <div><span>姓</span><span>名:</span></div>
                            <div>{{kaoShengXM}}</div>
                        </li>
                        <li>
                            <div><span>性</span><span>别:</span></div>
                            <div>{{xingBie}}</div>
				        </li>
                        <li>
                            <div><span>出</span><span>生</span><span>日</span><span>期:</span></div>
                            <div>{{chuShengRQ}}</div>
                         </li>
                         <li>
                            <div><span>民</span><span>族:</span></div>
                            <div>{{minZu}}</div>
				        </li>
                       
                        <li>
				        <div><span>通</span><span>讯</span><span>地</span><span>址:</span></div>
				        <div>{{tongXinDZ}}</div>
				    </li>
                         <li>
				        <div><span>收</span><span>件</span><span>人:</span></div>
				        <div>{{addressee}}</div>
				    </li>
                        <li>
				        <div><span>手</span><span>机</span><span>号</span><span>码:</span></div>
				        <div>{{shouJi}}</div>
				    </li>
                      <li>
				        <div><span>Q</span><span>Q:</span></div>
				        <div>{{qQ}}</div>
				    </li>   
                     </ul>
                      
                  </div>
             	 <div class="Info-list">
                      <div class='public-infor-note'>
                    <span class="iconfont icon-mihao"></span><span class='infor-note-title'>学校信息</span>
                   </div>
                       <ul class='introIntro extendIntro'>
                           <li>
				        <div><span>考</span><span>生</span><span>学</span><span>历:</span></div>
				        <div>{{xueLi}}</div>
				    </li>
                   <li>
				        <div><span>考</span><span>生</span><span>类</span><span>型:</span></div>
				        <div>{{stuType}}</div>
				    </li>
                    <li>
				        <div><span>考</span><span>生</span><span>学</span><span>籍:</span></div>
				        <div>{{gaoKaoSF}}</div>
				    </li>
                   <li>
				        <div><span>政</span><span>治</span><span>面</span><span>貌:</span></div>
				        <div>{{zhengZhiMM}}</div>
				    </li>
                   <li>
				        <div><span>就</span><span>读</span><span>学</span><span>校:</span></div>
				        <div>{{suoZaiXX}}</div>
				    </li>
                    <li>
				        <div><span>培</span><span>训</span><span>机</span><span>构:</span></div>
				        <div>{{suoZaiHS}}</div>
				    </li>
                    </ul>
                </div>
                 <div class="Info-list" v-if='baokaoFlag'>
                     <div class='public-infor-note'>
                    <span class="iconfont icon-mihao"></span><span class='infor-note-title'>报考信息</span>
                   </div>
                      <ul class='introIntro extendIntro'>
                          <li>
							<div><span>考</span><span>生</span><span>号:</span></div>
							<div>{{kaoShengHao}}</div>
                     	 </li>
                        <li v-if='language'>
							<div><span>语</span><span>种:</span></div>
							<div>{{language}}</div>
				    	</li>
                         <li>
							<div><span>应</span><span>往</span><span>届:</span></div>
							<div>{{yingWangJie}}</div>
				        </li>
                        <li>
							<div><span>文</span><span>理</span><span>科:</span></div>
							<div>{{wenLiKe}}</div>
				    	</li>
                    
                     </ul>
                </div>
              
              <div>
                 <template v-for='(family,index) in familyList'>
                      <div class="Info-list">
                        <div class='public-infor-note'>
                    <span class="iconfont icon-mihao"></span><span class='infor-note-title'>家庭联络人{{index+1}}</span>
                   </div>
                          <ul class='introIntro introIntroFamily'>
                               <li>
                                <div><span>姓</span><span>名:</span></div>
                                <div>{{family.name}}</div>
                             </li>
                             <li>
                                 <div><span>关</span><span>系:</span></div>
                                <div>{{family.relation}}</div>
                             </li>
                             <li>
                                 <div><span>单</span><span>位:</span></div>
                                <div>{{family.company}}</div>
                             </li>
                             <li>
                                 <div><span>职</span><span>位:</span></div>
                                <div>{{family.job}}</div>
                             </li>
                             <li>
                                 <div><span>联</span><span>系</span><span>电</span><span>话:</span></div>
                                <div>{{family.phone}}</div>
                             </li>
                          </ul>
                      </div>
                </template>
              </div>
       	  </div>
		   <div class="footerBar">
				<div class="handleBtn">
					<mt-button class="Toback" type="primary"  v-tap="{methods:onRouterBack}">
						返回修改
					</mt-button>
					<mt-button class="Submit" type="primary"   v-tap="{methods:onInforComit}">
						确认提交
					</mt-button>
				</div>
			</div>
        <provinceun v-if='provinunionFlag' :province='provinunionId'></provinceun>    
	</div>
</template>
<script>
	import Vue from 'vue';
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import provinceun from '../user/ProvinceUnion';
    
	export default {
		name:'InfoConfirm',
        data(){
                return {
                    
                     provinunionFlag:false,//联考文件标志和数据
                     provinunionId:'',
					 baokaoFlag:false,/*报考信息*/
                     kaoShengXM:'',//姓名
                     gaoKaoSF:'',//高考省份
                     tongXinDZ:'',
                     stuType:'',//考生类型
                     kaoShengHao:'',//考生号
                     zhengZhiMM:'',//政治面貌
                     suoZaiHS:'',//专业学院 
                     xingBie:'',//性别
                     chuShengRQ:'',//出生日期
                     yingWangJie:'',//应往届
                     wenLiKe:'',//文理科
                     minZu:'',//民族
                     xueLi:'',//学历
                     suoZaiXX:'',//所在学校
                     addressee:'',//收件人
                     shouJi:'',//本人手机
                     qQ:'',//qq
                     zhengJianLX:'',//证件类型
                     shenFenZH:'',//身份证件号码
                     language:'',//语种
                    /*家庭信息集中数据*/
                      familyList:[],
                      
            }
        },
         activated(){
            /*初始化数值*/
            if(window.yksapp){ 
              this.allUserIntro=JSON.parse(yksapp.getValueByKey('h5inforPerfect'));      
            }else{
              this.allUserIntro=JSON.parse(window.localStorage.getItem('h5inforPerfect'));      
            }
            /*基本信息*/
            this.baseIntro=this.allUserIntro.baseIntro;
            /*扩展信息*/
            this.extendIntro=this.allUserIntro.extendIntro;
            /*家庭信息*/
            this.familyIntro=this.allUserIntro.familyIntro;
             //处理数据并显示
                let baseIntro = this.baseIntro;
                
                /*家庭信息*/
                let familyIntro = this.familyIntro;
			 
			 	if (baseIntro.zhengJianLX == 1) {
                     this.zhengJianLX= "二代身份证";
                }else if (baseIntro.zhengJianLX == 2) {
                     this.zhengJianLX= "军人证";
                }else if  (baseIntro.zhengJianLX == 3) {
                     this.zhengJianLX= "港澳台身份证";
                }else if  (baseIntro.zhengJianLX == 4) {
                    this.zhengJianLX="护照";
                }
                this.shenFenZH=baseIntro.shenFenZH.toLocaleUpperCase();/*证件号*/
                this.kaoShengXM = baseIntro.userName;/*姓名*/
			 	this.xingBie = baseIntro.userSex;/*性别*/
			 	this.chuShengRQ = baseIntro.userBirth;/*出生日期*/
			 	this.minZu = baseIntro.userNation;/*名族*/
			 	

				
			 	this.tongXinDZ=baseIntro.userZipAddresCom.text+baseIntro.userZipAddres/*通讯地址*/
			 	this.addressee = baseIntro.useReceiver;/*收件人*/
			 	this.shouJi = baseIntro.userTeleP;/*手机号码*/
			 	this.qQ = baseIntro.userQq;/*qq*/
			 	/*学校信息*/
                let extendIntro = this.extendIntro;
			 	this.xueLi = extendIntro.userSchoolRang;/*学历*/
			 	this.stuType = extendIntro.userDegreeType.text;/*类型*/
			 	this.gaoKaoSF = extendIntro.userScholRoll.text/*省份*/
			 	this.zhengZhiMM = extendIntro.userPolitFace;/*面貌*/
			 	this.suoZaiXX = extendIntro.userAttendShool;/*学校*/
			 	this.suoZaiHS = extendIntro.userProfesschool;/*培训机构*/
			 	/*报考信息*/
			 	let extendIntrostuId=this.extendIntro.userDegreeType.id;
                /*小学生和初中生直接跳过*/
                if((extendIntrostuId=='1')||(extendIntrostuId=='2')){
                    this.provinunionFlag=false;
					this.baokaoFlag=false;
                }else{
                     this.provinunionFlag=true;
					 this.baokaoFlag=true;
                     this.provinunionId=this.extendIntro.userScholRoll.province.provinId;
					/*获取报考相关字段*/
					this.kaoShengHao = extendIntro.userExamNumber;/*考生号*/
					this.yingWangJie = extendIntro.userFreshPres;/*应往届*/
					this.wenLiKe = extendIntro.userArtScience;/*文理科*/
					this.language=extendIntro.userLanguages.text;/*语种*/
                     
                }

//                this.huJiDZ = baseIntro.userResiaddress;      
//                this.diShiMing = baseIntro.userCollege;

                /*家庭信息*/
               this.familyList=[];
             for(let i=0,len=familyIntro.nameList.length;i<len;i++){
                 let arrobj={
                     name:familyIntro.nameList[i],
                     relation:familyIntro.relationList[i],
                     company:familyIntro.companyNameList[i],
                     job:familyIntro.jobList[i],
                     phone:this.setTeleData(familyIntro.phoneNumberList[i])
                 }
               this.familyList.push(arrobj);   
             }
             console.log(this.familyList)
         },
        mounted(){
            this.$bus.on('provinceUnion', this.provinceUnionWay);
			
        },
        components:{
            provinceun
        },
        methods:{
			setTeleData(obj){
				if(obj){
					return obj.replace(/\s/g,'');
					
				}
			},
			handleprevPage(){
				this.$router.go(-1);
			},
            /*确认提交时间*/
            provinceUnionWay(){
               this.provinunionFlag=false;
            },
            /*返回修改*/
            onRouterBack(){
              this.$router.go(-1);
            },
            onInforComit(){
               MessageBox({
                  title: '信息确认',
                  message: '请仔细确认,报名成功后基本信息不可修改',
                  showCancelButton: true,
                  closeOnClickModal:false
                }).then(action => {
                 if(action!='cancel'){
                     Indicator.open('加载中...');
                    let  allUserIntro= this.allUserIntro;
                    /*基本信息*/
                    let baseIntro= this.baseIntro;
                    /*扩展信息*/
                    let extendIntro= this.extendIntro;
                    /*家庭信息*/
                    let familyIntro= this.familyIntro;
                       var that = this;
					 
                       var data={
                            /*基本信息*/
						  
                            zhengJianLX:baseIntro.zhengJianLX,/*证件类型*/
                            shenFenZH:baseIntro.shenFenZH,/*证件号码*/
						   	kaoShengXM:baseIntro.userName,/*姓名*/
						   	xingBie:baseIntro.userSex,/*性别*/
						   	chuShengRQ:baseIntro.userBirth,/*出生日期*/
						   	minZu:baseIntro.userNation,/*名族*/
						   	tongXinDZExt:baseIntro.userZipAddresCom.firstId+'-'+baseIntro.userZipAddresCom.secId+'-'+baseIntro.userZipAddresCom.thirId,
						   	tongXinDZ:baseIntro.userZipAddres,/*通讯地址*/
						    addressee:baseIntro.useReceiver,/*收件人*/
						   	shouJi:that.setTeleData(baseIntro.userTeleP),/*手机号码*/
						   	qQ:baseIntro.userQq,/*QQ*/
						   jiaZhangDH:that.setTeleData(baseIntro.userParenTeleP),/*家长电话*/
						   /*学校信息*/
						   	xueLi:extendIntro.userSchoolRang,/*学历*/
						   	stuType:extendIntro.userDegreeType.id,/*类型*/
						    gaoKaoSFH:extendIntro.userScholRoll.province.provinId,
                          	gaoKaoSF:extendIntro.userScholRoll.province.proviname,/*学籍省份*/
						   	diShiHao:extendIntro.userScholRoll.college.provinId,
                           	diShiMing:extendIntro.userScholRoll.college.proviname,/*学籍地区*/
						   
						   	zhengZhiMM:extendIntro.userPolitFace,/*面貌*/
						   	suoZaiXX:extendIntro.userAttendShool,/*学校*/
						    suoZaiHS:extendIntro.userProfesschool,/*机构*/
                            /*报考信息*/
						   	kaoShengHao:extendIntro.userExamNumber,/*考生号*/
						   	language:extendIntro.userLanguages.id,/*语种*/
						   	yingWangJie:extendIntro.userFreshPres,/*应往届*/
						   	wenLiKe:extendIntro.userArtScience,/*文理科*/
//						   	huJiDZ:extendIntro.userResiaddress,  
                          	//家庭成员信息
                            name:familyIntro.nameList,
                            relation:familyIntro.relationList,
                            companyName:familyIntro.companyNameList,
                            job:familyIntro.jobList,
                            phoneNumber:familyIntro.phoneNumberList  
                                    };
					 console.log(data);
//					 return ;
                        ajaxMethod.doAjax("user,/api/m/auth/user/save_stuinfo.htm", data, function(database) {
							console.log(database)
                            if(database.success) {
                                /*信息已填写*/
                                if(window.yksapp_user){
                                    yksapp_user.userXinXiYT();
                                } 
                                MessageBox({
                                  title: '提示信息',
                                  message: database.message,
                                  confirmButtonText:'我知道了',
                                  closeOnClickModal:false
                                }).then(action => {
                                     if(action=='confirm'){
                                          /*确定后*/ 
                                         if(window.yksapp){
                                                yksapp.setKeyValue("h5inforPerfect",'null');
                                                yksapp.setKeyValue("h5IntroAlreadyPerfected",'null');
                                                yksapp.closeWebPage();
                                            }else{
                                                 localStorage.setItem("h5inforPerfect",'null');
                                                 localStorage.setItem('h5IntroAlreadyPerfected',null);
                                                 that.$router.push({path:'/'});
                                            }
                                            
                                     }
                                })

                            } else {
                                Toast({
                                    message: database.message,
                                    position: 'middle',
                                    duration: 5000
                                });
                            }
                        }, function() {
                                  Indicator.close();
                        })
                 }
                });
            
                
            }
        }
	}
</script>

<style>
#InfoConfirm{
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
        font-size: 0.28rem;
    
}
#InfoConfirm .infor-header{
        flex-shrink: 0;
}    
#InfoConfirm .info-total{
	overflow-y: auto;
    flex-grow: 1;
     -webkit-overflow-scrolling: touch;
    background: #fff;
    
}
    /*基本和扩展信息样式*/
    #InfoConfirm .Info-list{
        overflow: hidden;
      
    }
    #InfoConfirm .Info-list  h2{
        height: 0.54rem;
		line-height: 0.54rem;
		font-size: 0.28rem;
        font-weight:bold;
        color: #444444;
        border-left: 5px solid #37cbfc;
        padding-left: 5px;
        margin:5px 0;
    }
    #InfoConfirm .Info-list .introIntro{
        margin-bottom: 10px;
        background: #fff;
    }
    #InfoConfirm .Info-list .introIntro li{
        display: flex;
        border-bottom: 1px solid #eee;
        padding-left:10px;
        padding-right: 10px;
        box-sizing: border-box;
    }
    #InfoConfirm .Info-list .introIntro li>div{
/*
       height: 0.54rem;
       line-height: 0.54rem;
*/
        align-self:center;
/*        子元素中线对齐*/
        
    }
    #InfoConfirm .Info-list .introIntro li>div:first-of-type{
        width:1.4rem;
        flex-shrink: 0;
        display:flex;
        justify-content:space-between;
        color: #565656;
        
        
    }
     #InfoConfirm .Info-list .introIntro li>div:first-of-type span{
         padding: 5px 0px;
         display: inline-block;
        
        
    }
    /*特殊的多行样式*/
    .introIntro-specom .title{
        text-align: right;
    }
    /*两端对其hack强制两行需要设高，用css3*/
     #InfoConfirm .Info-list .introIntro li>div:last-of-type{
        flex-grow: 1;
        padding: 5px 0 5px 8px;
        word-break: break-word;
    }
    /*家庭信息样式*/
    #InfoConfirm  .introIntroFamily {
        background: #fff;
        margin-bottom: 10px;
    }
    #InfoConfirm  .introIntroFamily span{
        padding-left:5px;
    }
    #InfoConfirm  .introIntroFamily>div{
        overflow: hidden;
        border-bottom: 1px solid #eee;
        padding-left:10px;
        box-sizing: border-box;
    }
    #InfoConfirm  .introIntroFamily ul{
         border-bottom: 1px solid #eee;
    }
    #InfoConfirm  .introIntroFamily ul li{
          padding-right:3%;
          padding-left:3%;
          box-sizing: border-box;
          overflow: hidden;
    }
    .introIntroFamily-name-sex div{
        padding:8px 0;
    }
    /*特别样式设置*/
    #InfoConfirm .special {
		color: #ff9f37
	}
    .introIntroFamily-spe{
        color: #cecece;
        padding: 8px 0;
        display:flex;
    }
    .introIntroFamily-spe .introIntroFamily-spe-title{
        flex-shrink: 0;
    }
     .introIntroFamily-spe .introIntroFamily-spe-intro{
        flex-grow: 1;
        word-break: break-word; 
        padding-left:5px;
    }
    /*提交样式*/
#InfoConfirm  .footerBar{
	width: 100%;
	background: #f9f9f9;
    flex-shrink: 0;
}
#InfoConfirm  .footerBar .tips{
	width: 100%;
	height: 0.62rem;
	font-size: 0.28rem;
	color: #ffa23b;
	line-height: 0.62rem;
	text-align: center;
	background: #fffdd2;
}
#InfoConfirm  .footerBar .handleBtn{
        padding:10px 3%;
        box-sizing: border-box;
        overflow: hidden;
        background: #fff;
       
}
#InfoConfirm  .footerBar .handleBtn .mint-button{
	width:40%;
    box-sizing: border-box;
    font-size:0.25rem;
}
#InfoConfirm  .footerBar .handleBtn .Toback{
	float: left;
    background: #fff;
    color:#42cefc;
    border:2px solid  #42cefc;
}
#InfoConfirm  .footerBar .handleBtn .Submit{
	float: right;
    background: #42cefc;
}
    
    
    
    
    
    
    
    
    
    
    
</style>