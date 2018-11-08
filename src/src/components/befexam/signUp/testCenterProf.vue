<template> 
    <!-- 选专业页面 -->
    <div class="test-selected-prof">
        <mt-header fixed title="选择考点专业">
            <router-link to="/signUpinfo" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <!-- <mt-button icon="back" slot="left" @click="asd"></mt-button> -->
        </mt-header>
        <signUpNotice v-if="ifShowNotice">
            <div slot="signUp-notice" class="signup-notice" v-html="signUpNotice_con"></div>
            <span>我已阅读并确认提交</span>
        </signUpNotice>
        <!-- 考试名称 -->
        <mt-popup
            v-model="popupVisible"
            position="middle"
            popup-transition="popup-in"
            class="prop-div"
            >
            <div>
                <div class="choice-title">{{propTitle}}</div>
                <ul class="choice-lists">
                    <li>
                        <mt-radio
                          align="left"
                          v-model="ipt_val"
                          :options="ads">
                        </mt-radio>
                    </li>
                </ul>
                <div class="prop-btm">
                    <span class="prop-btn" v-tap="{methods:sure_btn}">
                        确定
                    </span>
                </div>
            </div>
        </mt-popup>
        <!-- 考点名称 -->
        <mt-popup
            v-model="popupVisible_1"
            position="middle"
            popup-transition="popup-in"
            class="prop-div"
            >
            <div>
                <div class="choice-title">{{propTitle_1}}</div>
                <div class="choice-lists">
                    <div>
                        <mt-radio
                          align="left"
                          v-model="kaoShiKDID"
                          :options="ads_1">
                        </mt-radio>
                    </div>
                </div>
                <div class="prop-btm">
                    <span class="prop-btn" v-tap="{methods:sure_btn}">
                        确定
                    </span>
                </div>
            </div>
        </mt-popup>
        <!-- 专业名称 -->
        <mt-popup
            v-model="popupVisible_2"
            position="middle"
            popup-transition="popup-in"
            class="prop-div"
            >
            <div>
                <div class="choice-title">{{propTitle_1}}</div>
                <ul class="choice-lists">
                    <li>
                        <div v-if="checkRadio" class="radio">
                            <mt-radio 
                                align="left"
                                v-model="siteIDSel"
                                :options="ads_2">
                            </mt-radio>
                        </div>
                        <div v-else class="checkBox">
                            <!-- v-model="siteIDSel_arr" -->
                            <mt-checklist 
                                align="left"
                                v-model="lumeiBack_display"
                                :max="parseInt(xianKaoZYS)"
                                :options="ads_2">
                            </mt-checklist>
                        </div>
                    </li>
                </ul>
                <div class="prop-btm">
                    <span class="prop-btn" v-tap="{methods:sure_btn}">
                        确定
                    </span>
                </div>
            </div>
        </mt-popup>
        <mt-popup
            v-model="popupVisible_3"
            position="middle"
            popup-transition="popup-in"
            class="prop-div"
            >
            <div>
                <div class="choice-title">{{propTitle_3}}</div>
                <ul class="choice-lists">
                    <li>
                        <mt-radio 
                            align="left"
                            v-model="zhechaun"
                            :options="ads_3">
                        </mt-radio>
                    </li>
                </ul>
                <div class="prop-btm">
                    <span class="prop-btn" v-tap="{methods:sure_btn}">
                        确定
                    </span>
                </div>
            </div>
        </mt-popup>
        <div class="select-prof">
        	<userInfo></userInfo>
        	<!-- <slot name="school"></slot>
        	<slot name='selecting-body'>
			</slot> -->
            <div style="font-size:.25rem;background:#fff;padding:0 .1rem .2rem;display:flex;" class="selected-School">
                <div style="width:1.6rem;">当前报考院校 </div>
                <div class='selectedSch'>{{selectedSch}}</div>
            </div>
            <div>
                <div class="selecting-body">
                    <div class="sch-prof-place">
                        <div class="choice-ipt f-fixed" v-if="hideExam">
                            <div class="lf lists-title">考试名称：</div>
                            <div class="lf ipt-value" v-tap="{methods:choiceProf_a}">
                                <span>{{ipt_val.split(",")[1]}}</span>
                                <i class="diy-icon"></i>
                            </div>
                        </div>
                        <div class="choice-ipt">
                            <div class="lf lists-title">考点名称：</div>
                            <div class="lf ipt-value" v-tap="{methods:choiceProf_ab}">
                                <span>{{kaoShiKDID.split(",")[2]}}</span>
                                <i class="diy-icon"></i>
                            </div>
                        </div>
                        <div class="choice-ipt">
                            <div class="lf lists-title">专业名称：</div>
                            <div class="lf ipt-value" v-tap="{methods:choiceProf_ac}">
                                <span v-if="checkRadio">
                                    {{siteIDSel.split(",")[3]}}
                                </span>
                                <span v-else>
                                    <!-- {{display_arr.join(",")}} -->
                                    {{lumeiBack_display_str.join(",")}}
                                </span>
                                <i class="diy-icon"></i>
                            </div>
                        </div>
                        <div class="choice-ipt" v-if="choiceExamTime">
                            <div class="lf lists-title">考试时间：</div>
                            <div class="lf ipt-value" v-tap="{methods:choiceProf_at}">
                                <span v-if="checkRadio">
                                    {{zhechaun.split(",")[0]}}
                                </span>
                                <i class="diy-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div class="wrap-sure">
                        <div class="sure-btn">
                            <span class="button-sure" v-tap="{methods:notice_submit}">确定</span>
                        </div>
                    </div>
                    <div class="choice-notice">
                        <div class="notice-content">
                            <h1 style="color:#FFA33F">温馨提示</h1>
                            <p>1.选择专业提交之后请在30分钟内完成支付</p>
                            <p>2.专业填报提交交费成功后不可调整</p>
                            <p>3.专业填报提交交费成功后不支持退费</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// import VueQriously from 'vue-qriously'
//import 'mint-ui/lib/style.css';
//import {
//    Header,
//    Button,
//    Toast,
//    Popup,
//    Radio,
//    Checklist,
//    MessageBox,
//    Indicator   
//} from 'mint-ui';
import {Toast,MessageBox,Indicator} from 'mint-ui';
import VueBus from 'vue-bus';
import userInfo from "./userInfo";
import signUpNotice from "./signUpNotice";
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
//Vue.component(Popup.name, Popup);
//Vue.component(Radio.name, Radio);
//Vue.component(Checklist.name, Checklist);
Vue.use(VueBus);
// Vue.use(VueQriously)

export default {
    name: 'queryResults',
    data() {
        return {
            selectedSch:"",//选中的学校
            xueXiaoID:'',
            applyMode:'',
            zheJiangCM:true,  //浙江传媒标志
            allListandPlace:[],//选择考点专业页面初始加载的数据
            checkList:true,//鲁美选择专业时为复选框
            checkRadio:false,//除了鲁美模式其他专业选择模式全为单选框
            applyMode:null,//专业名称请求时需要此参数

            hideExam:true,
            ipt_val:'',
            kaoShiKDID:"",//专业名称请求时需要此参数
            display_arr:[],//复选框显示内容
            choiceExamTime:false,//浙传的考试时间选择控制
            popupVisible:false,
            popupVisible_1:false,//考点名称
            popupVisible_2:false,//
            popupVisible_3:false,//浙传的时间选择
            propTitle:"选择考试",
            propTitle_1:"选择考点",
            propTitle_3:"选择考试时间",
            ads:[], //弹出框内容考试名称
            ads_1:[],//考点名称弹出框内容
            ads_2:[],//专业名称弹出框
            ads_3:[],//浙传时间选择弹出框
            xianKaoZYS:"",//限考志愿数
            xianKaoZYS_control:'',
            siteIDSel:"",//单选框内容
            siteIDSel_arr:[],//复选框内容
            zhechaun:"",//浙传的时间显示
            ifShowNotice:false,//是否显示报考须知
            ifReadNotice:true,//是否读了报考须知
            display_arr:[],//复选框显示内容
            lumeiBack:[],//鲁美志愿回填参数
            lumeiBack_display:[],//鲁美回填的选项
            lumeiBack_display_str:[],//鲁美回填的选项
            noLimitProfId:"",//后台参数2500设置不受考点专业数限制的考试志愿专业(鲁美)
        }
    },
     watch:{
        siteIDSel_arr:function(newValue,oldValue){
            var that=this;
            var Arr=[];
            newValue.forEach(function(v,i){
                var curVal=v.split(",")[3];
                Arr.push(curVal);
            })
            this.display_arr=Arr;
        },
        lumeiBack_display:function(newValue,oldValue){
            var that=this;
            var Arr=[];
            var schIDList=[];
            newValue.forEach(function(v,i){
                var curVal=v.split(",")[3];
                Arr.push(curVal);
            })
            this.lumeiBack_display_str=Arr;
            // console.log(newValue)
            if(!!this.noLimitProfId){
                newValue.forEach(function(value,index){
                    schIDList.push(value.split(",")[1]);
                })
                console.log(schIDList.join(","))
                var reg=new RegExp(that.noLimitProfId,"g")
                if(!(schIDList.join(",").match(reg))){
                    // alert(12)
                    that.xianKaoZYS=parseInt(that.xianKaoZYS_control)+1;
                    // if((schIDList.join(",").match(reg))){
                    //     // debugger
                    //     that.xianKaoZYS=parseInt(that.xianKaoZYS_control)+1
                    // }else{
                    //     that.xianKaoZYS=parseInt(that.xianKaoZYS_control)
                    // }
                }else{
                    that.xianKaoZYS=parseInt(that.xianKaoZYS_control)+1;
                }
                if(schIDList.length==that.xianKaoZYS_control){
                    // alert("满了")
                    console.log(schIDList)

                    that.ads_2.forEach(function(value,index){
                        schIDList.forEach(function(v,i){
                            if(v!=value.value.split(",")[1] && value.value.split(",")[1]!=that.noLimitProfId){
                                that.ads_2[index].disabled=true
                            }
                        })
                        if(schIDList.join(",").indexOf(value.value.split(",")[1])!=-1){
                            value.disabled=false
                        }
                    })
                    if(schIDList.join(",").indexOf(that.noLimitProfId)!=-1){
                        // alert("有特定");
                        that.ads_2.forEach(function(value,index){
                            value.disabled=false;
                        })
                    }
                }else if(schIDList.length<that.xianKaoZYS_control){
                    that.ads_2.forEach(function(value,index){
                        value.disabled=false;
                    })
                }
            }
        },
        kaoShiKDID:function(n,o){
            console.log(n)
            if(n.split(",")[3]>0){
                this.xianKaoZYS_control=n.split(",")[3];
            }
            this.xianKaoZYS=n.split(",")[3];
        }   
    },
    mounted() {
        this.$bus.on("clickthird",this.notice_operate);
        this.$bus.on("confirm_btn",this.confirm_event);
        
        var that=this;
        // window.location.reload();
        this.xueXiaoID=this.$route.query.xueXiaoID;
        this.selectedSch=this.$route.query.xueXiaoMC;
        console.log(this.selectedSch);
        if(!!this.$route.query.lumeicC){
            this.lumeiBack=JSON.parse(this.$route.query.lumeicC);
        }
        var schLIstUrl="befexam,/api/m/auth/apply/query_exam_site.htm";
        var schLIstdata={"xueXiaoID":this.xueXiaoID};
        Indicator.open('加载中...');
        ajaxMethod.doAjax(schLIstUrl,schLIstdata,function(datas){
            Indicator.close();
            that.allListandPlace=datas.datas.list;
            if(!!datas.datas.noLimitProfId){
                that.noLimitProfId=datas.datas.noLimitProfId
            }
            if(datas.datas.applyMode){
                that.applyMode=datas.datas.applyMode;
            }else{
                that.applyMode=null;
            }
            // applyMode   1=>鲁美模式；2=>浙传模式
            // TODO
            if(that.applyMode==1){
                that.checkList=true;
            }else if(that.applyMode==2){
                that.checkRadio=true;
                that.zheJiangCM=true;
            }else{
                that.checkList=false;
                that.checkRadio=true;
            }
            // 只有一场考试的时候隐藏考试名称选择
            if(datas.datas.list.length == 1){
                that.ipt_val=datas.datas.list[0].kaoShiID.toString();
                that.xianKaoZYS=datas.datas.list[0].xianKaoZYS;
                that.xianKaoZYS_control=datas.datas.list[0].xianKaoZYS;
                that.hideExam=false;
            }else{
                that.hideExam=true;
            }
            datas.datas.list.forEach(function(valuew,index){
                // that.ads.push({
                //     "label":valuew.kaoShiMC,
                //     "value":valuew.kaoShiID+","+valuew.kaoShiMC
                // });
            })
            
        });
    },
    methods: {
    	asd(){
    		this.$router.go(-1);
    	},
        choiceProf_a(){
            var that=this;
            this.ads=[];
            this.ads_1=[];
            this.kaoShiKDID="";
            this.siteIDSel="";
            this.allListandPlace.forEach(function(value,index){
                that.ads.push({
                    "label":value.kaoShiMC,
                    "value":value.kaoShiID.toString()+","+value.kaoShiMC
                });
            })
            this.popupVisible=true;
        },
        // 考点名称
        choiceProf_ab(){
            var that=this;
            this.siteIDSel="";
             that.siteIDSel_arr=[];
            that.display_arr=[];
            that.ads_2=[];
            that.zhechaun="";
            that.lumeiBack_display=[];
            // debugger;
            if(this.ipt_val.split(",")[0] == "" && this.ads.length!=1){
            // debugger;
                Toast({
                    message: "请先选择考试",
                    position: 'middle',
                    duration: 500
                });
                return;
            }
            this.propTitle_1="选择考点";
            this.ads_1=[];
            this.popupVisible_1=true;
            if(this.allListandPlace.length == 1){
                that.kaoDianMC=that.allListandPlace[0].examSiteList;
            }else{
                this.allListandPlace.forEach(function(value,index){
                    if(value.kaoShiID == that.ipt_val.split(",")[0]){
                        that.kaoDianMC=value.examSiteList;
                        return;
                    }
                })
            }
            this.kaoDianMC.forEach(function(value,index){
                that.ads_1.push({
                    "label":value.siteName,
                    "value":value.kaoShiKDID+","+value.kaoDianID+","+value.siteName+","+value.xianKaoZYS,
                })
            })
            
        },
        // 专业名称
        choiceProf_ac(){
            var that=this;
            that.ads_2=[];
            that.zhechaun="";
            // this.siteIDSel="";
            if(this.kaoShiKDID==""){
                Toast({
                    message: "请先选择考点",
                    position: 'middle',
                    duration: 500
                });
                return;
            }
            this.propTitle_1="选择报考专业"            
            var pUrl="befexam,/api/m/auth/apply/query_exam_schedule.htm";
            var data={"kaoShiKDID":that.kaoShiKDID.split(",")[0],"applyMode":this.applyMode};
            // 限考志愿数动态修改（鲁美模式）
            that.ads_1.forEach(function(value,index){
                if(that.kaoShiKDID.split(",")[0]==value.value.split(",")[0] && value.value.split(",")[3]!=0){
                    that.xianKaoZYS=value.value.split(",")[3];
                }
            });
            Indicator.open('加载中...');
             ajaxMethod.doAjax(pUrl,data,function(datas){
                // applyMode==1是鲁美模式，==2是浙传模式
                if(that.applyMode==1){
                   /* console.log(!!datas.datas.examProfList+"if-have")
                    if(datas.datas.examProfList==null){
                        Toast({
                            message: "专业信息查询失败",
                            position: 'middle',
                            duration: 500
                        });
                        return;
                    }*/
                    if(datas.datas.examProfList.length==0 || datas.datas.examProfList==null){
                        Toast({
                            message: "专业信息查询失败",
                            position: 'middle',
                            duration: 500
                        });
                        return;
                    }else{
                        that.popupVisible_2=true;
                        that.ads_2=[];
                        datas.datas.examProfList.forEach(function(value,index){
                            that.ads_2.push({
                                "label":value.zhuanYeMC,
                                "value":value.fuZhuanYe+","+
                                        value.zhuanYeID+","+
                                        value.zhuanYeBH+","+
                                        value.zhuanYeMC,
                                "disabled":false
                            });
                        })
                        // 鲁美回填操作
                        // 传过来的参数循环
                        if(!!that.lumeiBack){
                            that.lumeiBack.forEach(function(value,idx){
                                if(value.kaoShiKDIDs==that.kaoShiKDID.split(",")[0]){
                                    // 所有专业循环
                                    datas.datas.examProfList.forEach(function(va,idx){
                                        // 传过来的专业集合的循环
                                        value.zhuanYeMCs.split(",").forEach(function(v,i){
                                            if(v==va.zhuanYeMC){
                                                that.lumeiBack_display.push(
                                                        va.fuZhuanYe+","+
                                                        va.zhuanYeID+","+
                                                        va.zhuanYeBH+","+
                                                        va.zhuanYeMC,
                                                    )
                                                // 供复选框组件选择的循环
                                                that.ads_2.forEach(function(z,a){
                                                    if(z.label==va.zhuanYeMC){
                                                        z.disabled=true
                                                    }
                                                })
                                            }
                                        })
                                    })
                                }   
                            })
                        }
                        console.log(that.lumeiBack_display);
                        // console.log(that.kaoShiKDID.split(",")[0])
                    }
                    // ==2是浙传模式
                }else if(that.applyMode==2){
                    that.choiceExamTime=true;
                    if(datas.datas.examProfList==null){
                        Toast({
                            message: "专业信息查询失败",
                            position: 'middle',
                            duration: 500
                        });
                        that.choiceExamTime=false;
                    }else{
                        that.popupVisible_2=true;
                        that.ads_2=[];
                        that.examProfList=datas.datas.examProfList;
                        datas.datas.examProfList.forEach(function(value,index){
                            that.ads_2.push({
                                "label":value.zhuanYeMC,
                                "value":value.fuZhuanYe+","+
                                        value.zhuanYeID+","+
                                        value.zhuanYeBH+","+
                                        value.zhuanYeMC
                            });
                        })
                    }
                }else{
                    if(datas.datas.list.length==0){
                        Toast({
                            message: "专业信息查询失败",
                            position: 'middle',
                            duration: 500
                        });
                    }else{
                        that.popupVisible_2=true;
                        datas.datas.list.forEach(function(value,index){
                            that.ads_2.push({
                                "label":value.profName,
                                "value":value.riChengID+","+
                                        value.zhuanYeID+","+
                                        value.zhuanYeMC+","+
                                        value.profName
                            });
                        })
                    }
                }
                Indicator.close();
            });
        },
        // 报名提交
        notice_submit(){
            // console.log(123)
            var submitUrl="befexam,/api/m/auth/apply/query_apply_notice.htm"
            var data={"schId":this.xueXiaoID,
                        "examId":this.ipt_val.split(",")[0],
                        "examPointId":this.kaoShiKDID.split(",")[1]
            }
            console.log(this.display_arr.join(",")=="")
            // 鲁美模式单独处理
            if(this.applyMode==1){
                if(this.lumeiBack_display_str.join(",")==""){
                    Toast({
                        message: "请选择专业",
                        position: 'middle',
                        duration: 500
                    });
                    return;
                }
            }else if(this.applyMode==2){
                if(this.zhechaun.split(",")[0]==""){
                    Toast({
                        message: "请选择考试时间",
                        position: 'middle',
                        duration: 500
                    });
                    return;
                }
            }else{
                if(this.siteIDSel.split(",")[2] == undefined){
                    Toast({
                        message: "请选择专业",
                        position: 'middle',
                        duration: 500
                    });
                    return;
                }
            }
            Indicator.open('加载中...');
            ajaxMethod.doAjax(submitUrl,data,this.query_apply_notice);
        },
        // 加载报考须知文本
        query_apply_notice(datas){
            Indicator.close();
            if(datas.success && datas.datas.applyNotice!=""){
                this.ifShowNotice=true;
                this.signUpNotice_con=datas.datas.applyNotice;
                this.ifReadNotice=false;
                // Toast(datas.datas.applyNotice)
            }else if(!datas.success){
                // 请求失败的处理
                Toast({
                    message: datas.message,
                    position: 'middle',
                    duration: 500
                });
            }else if(datas.success && datas.datas.applyNotice==""){
                this.ifReadNotice=true;
                // this.$router.push({path:"/signEntrance/selectProf"})
            }
            console.log(this.ifReadNotice)
            this.noticeFun();
        },
        // 报考须知点击确认按钮
        confirm_event(){
            this.ifShowNotice=false;
            this.ifReadNotice=true;
            this.noticeFun();
        },
        // 是否有报考须知处理，有的话显示，没有的话直接保存所报专业
        noticeFun(){
            var that=this;
            var data;
            var LuM=[];
            //鲁美提交参数不一样
            if(this.applyMode==1){
                this.lumeiBack_display.forEach(function(v,i){
                    LuM.push({
                                "fuZhuanYe":v.split(",")[0],
                                "zhuanYeID":v.split(",")[1],
                                "zhuanYeMC":v.split(",")[3]
                            })
                })
                data={
                    kaoShiKDID:this.kaoShiKDID.split(",")[0],
                    zhiYuanList:LuM
                }
            // 除了鲁美其他院校提交参数一样
            }else if(this.applyMode==2){
                data={
                     "riChengID":this.zhechaun.split(",")[1],
                    }
            }else{
                data={
                    "riChengID":this.siteIDSel.split(",")[0],
                    // "zhiYuanZYID":this.siteIDSel.split(",")[1],
                    // "zhiYuanZYMC":this.siteIDSel.split(",")[2]
                }
                // this.siteIDSel.split(",")[0]   ricehngId
                // this.siteIDSel.split(",")[1]   zhuanYeID
                // this.siteIDSel.split(",")[2]   zhuanYeMC
            }
            var subUrl="befexam,/api/m/auth/apply/save_prof.htm";
            if(this.ifReadNotice){
                MessageBox({
                    title: '',
                    message: '确定提交所选择考点专业吗?',
                    showCancelButton: true,
                    cancelButtonText:"放弃",
                    confirmButtonText:"确定",
                    showCancelButton:true,
                    closeOnClickModal:false
                }).then(action=>{
                    if(action=='confirm'){
                        Indicator.open('加载中...');
                        ajaxMethod.doAjax(subUrl,data,function(datas){
                            Indicator.close()
                            /*
                            *  所有错误码
                            *  student-811 //传媒类检测是否完善了信息
                            *  student-812 //西安美术学院户口类型完善
                            *  
                            *  student-806 //附中模式（需填写户籍省份）
                            *  student-813 //附中模式（户籍填写）
                            *  student-808 //附中模式（国美附中上海考生检测）  =>国美附中上海考生
                            *  student-807 //附中模式（起止时间格式）=>国美
                            *
                            */
                            //附中考试需填写信息
                            if(!datas.success){
                                // 附中模式需要填写信息(包括国美附中)
                                if(datas.code=="student-806" || datas.code=="student-813" || datas.code=="student-808" || datas.code=="student-807"){
                                    MessageBox({
                                        title: '提示',
                                        message: datas.message,
                                        showCancelButton: true,
                                        closeOnClickModal:false
                                    }).then(action=>{
                                        if(action=='confirm'){
                                            that.$router.push({path:"/fuZhong",query:{xueXiaoID:that.xueXiaoID}});
                                        }
                                    });
                                    return ;
                                // 传媒类检测是否完善了信息
                                }else if(datas.code == "student-811"){
                                    MessageBox({
                                        title: '提示',
                                        message: datas.message,
                                        showCancelButton: true,
                                        closeOnClickModal:false
                                    }).then(action=>{
                                        if(action=='confirm'){
                                            that.$router.push({path:"/MediaInforPerfect"});
                                        }
                                    });
                                    return;
                                // 西安美术学院户口类型完善
                                }else if(datas.code=="student-812"){
                                    MessageBox({
                                        title: '提示',
                                        message: datas.message,
                                        showCancelButton: true,
                                        closeOnClickModal:false
                                    }).then(action=>{
                                        if(action=='confirm'){
                                            that.$router.push({path:"/xianNodeType"});
                                        }
                                    });
                                    return;
                                //本次考试只允许具有北京市正式户籍的考生报名(央美附中)后台控制到yuanxiaoID,kaodianID(后台写死)
                                }else if(datas.code=="student-809"){
                                    Toast(datas.message)
                                    return ;
                                }else{
                                    MessageBox({
                                        title: '',
                                        message: datas.message,
                                        showCancelButton: false,
                                        confirmButtonText:"知道了",
                                    })
                                }
                                return;
                            }else if(datas.success){
                                that.$router.push({
                                    path:"/signEntrance/selectProf",
                                    query:{
                                        xueXiaoID:that.xueXiaoID,
                                        xueXiaoMC:that.selectedSch
                                    }
                                })
                                that.checkShow_Btn();
                            }
                        });
                    }
                });
            }
        },
        // 是否显示提交按钮
        checkShow_Btn(){
            var that=this;
            that.toTalPrice=0;//总价格
            that.checkShowBtn=[];//所有baoKaoB的标志数组
            this.alreadyChoiceProf.forEach(function(v,i){
                that.checkShowBtn.push(v.baoKaoBZ);
                if(v.checkState){
                    that.toTalPrice+=parseFloat(v.baoMingFei)
                }
            })
            for(var ss=0;ss<this.alreadyChoiceProf.length;ss++){
                if(this.alreadyChoiceProf[ss].baoKaoBZ==1){
                    that.showBtn=true;
                    return;
                }else{
                    that.showBtn=false;
                }
            }
            // this.checkShowBtn.forEach(function(v,i){
            //     debugger
            //     if(v.baoKaoBZ==1){
            //         that.showBtn=true;
            //         return;
            //     }else{
            //         that.showBtn=false;
            //     }
            // })
        },
        sure_btn(){
            this.popupVisible=false;
            this.popupVisible_1=false;
            this.popupVisible_2=false;
            this.popupVisible_3=false;
        },
        // 浙传模式的考试时间选择
        choiceProf_at(){
            var that=this;
            this.popupVisible_3=true;
            this.ads_3=[];
            this.examProfList.forEach(function(v,i){
                if(v.zhuanYeMC==that.siteIDSel.split(",")[3]){
                    v.examScheduleList.forEach(function(v_1,i_1){
                        that.ads_3.push({
                            "label":v_1.profTime,
                            "value":v_1.profTime+","+
                                    v_1.riChengID
                        })
                    })
                }
            })
        },
        notice_operate(){
            this.ifShowNotice=false;
            this.ifReadNotice=false;
        },
    },
    components: {
    	userInfo,
        signUpNotice
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lf {
    float: left;
}

.rf {
    float: right;
}

.f-fixed:after {
    content: '\200b';
    display: block;
    height: 0;
    clear: both;
}
.selected-School{display:flex;align-items: center;}
.test-selected-prof{position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;}
.test-selected-prof .select-prof{background: #F9F9F9;position:absolute;top:.8rem;bottom:0;width:100%;}
.select-prof .selectedSch{color:#5ABEFA;margin-left:.1rem;width:calc(100% - 1.7rem);}

.selecting-body{background: #fff;font-size:.25rem;padding:0 .2rem;margin-top:.2rem;}
.selecting-body .wrap-sure, .selecting-body .choice-notice{margin:0 -.2rem;background: #F9F9F9;padding-top:.3rem;}
/*.selecting-body .wrap-sure{padding-top:.3rem;}*/
.selecting-body .choice-notice .notice-content{padding:0 .2rem;font-size:.25rem;}
.selecting-body .wrap-sure .sure-btn{padding:0 .2rem;}
.selecting-body .wrap-sure .sure-btn .button-sure{display:block;width:100%;background: #42CEFC;color:#fff;text-align: center;border-radius:.08rem;padding:.2rem 0;font-size:.3rem;}
.selecting-body .choice-ipt{border-bottom:1px solid #F0F0F0;height:.8rem;line-height:0.8rem;}
.selecting-body .choice-ipt:last-child{border:none;}
.ipt-value{width:calc(100% - 1.4rem);position:relative;height:100%;}
.ipt-value span{display: inline-block;max-width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}

.choice-title{text-align: center;font-size:.3rem;color:#010101;background: #EEEEEE;padding:.2rem 0;}
.prop-div{width:80%;overflow: auto;border-radius: .1rem;}
.choice-lists{max-height:5rem;overflow: auto;font-size:.3rem;min-height:2rem;}
.prop-btm{background: #EFEFEF;padding:.2rem;}
.prop-btm .prop-btn{background:#42CEFC;font-size:.3rem;color:#fff;display:block;text-align: center;padding:.15rem 0;border-radius:.1rem;}

</style>
