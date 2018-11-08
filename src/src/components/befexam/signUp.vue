<template> 
    <div class="sign-up-page">
        <mt-header fixed title="报名">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <professionalVoluntary v-show="prof_choice">
            <div slot="prof_data" class="prof_data">
                <div v-show="alreadyChoiceWish.length>0">
                    <p class="prof-list-text">已选志愿（拖动排序）</p>
                    <div v-for="(allProf,idx) in alreadyChoiceWish" class="display_flex">
                        <mt-badge size="small">
                            {{idx+1}}
                        </mt-badge>
                        {{allProf.zhuanYeMC}}
                        <span class="clocse" @click="reduce_prof(allProf,idx)">x</span>
                    </div>
                </div>
                <p class="prof-list-text">志愿列表（点击选择，最多可选择{{zhiYuanShu}}个）</p>
                <div v-for="(allProf,idx) in allProf_list" 
                    class="display_flex" 
                    @click="choiceProf_double(allProf,idx)">
                    <mt-badge size="small">
                        {{idx+1}}
                    </mt-badge>
                    {{allProf.zhuanYeMC}}
                </div>
            </div>
            <div slot="btn_sure">
                <div style="position:fixed;bottom:0;height:1rem;width:100%;box-sizing:border-box;padding:.1rem;">
                   <!--  <mt-button size="large"  @click.native="sure_btn_click" :disabled='canTouch'>确定
                    </mt-button> -->
                    <button class="prof-btn-sure" 
                        :disabled="canTouch" 
                        @click="sure_btn_click"
                        :class="{btn_gray:canTouch}"
                    >
                        确定
                    </button>
                </div>
            </div>
        </professionalVoluntary>
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
                    <span class="prop-btn" @click="sure_btn">
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
                    <span class="prop-btn" @click="sure_btn">
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
                            <mt-checklist 
                                align="left"
                                v-model="siteIDSel_arr"
                                :max="parseInt(xianKaoZYS)"
                                :options="ads_2">
                            </mt-checklist>
                        </div>
                    </li>
                </ul>
                <div class="prop-btm">
                    <span class="prop-btn" @click="sure_btn">
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
                    <span class="prop-btn" @click="sure_btn">
                        确定
                    </span>
                </div>
            </div>
        </mt-popup>
        <div class="search">
            <input type="text" placeholder="搜索院校" class="search-ipt" v-model="seachVal">
            <mt-button type="primary" size="small" @click="searchSch_as">
                搜索
            </mt-button>
        </div>
        <profSort v-if="profSort">
            <div slot="sort_data" class="div">
                <ul class="back-prof-list sort-data">
                    <li v-for="(sort_val,idx) in sort_data" :class="{'check-list':sort_val.checkState}"
                        v-dragging="{ item: sort_val, list: sort_data, group: 'asd' }"
                        :key="sort_val.kaoDianMC"
                    >
                        <div>
                            <div>
                                <span>
                                    <mt-badge size="small">
                                        {{idx+1}}
                                    </mt-badge>
                                    {{sort_val.kaoDianMC}} <span style="color:#f00"></span>
                                </span><br>
                                <span class="dateStr">
                                    {{sort_val.zhuanYeMC}}{{sort_val.kaoShiRQStr}}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </profSort>
        <selectProf v-if="selected_prof">
            <div slot="school" class="school">
                <span>当前报考院校：</span><i>{{selectedSch}}</i>
            </div>
            <div slot="select-body" class="select-body">
                <ul class="back-prof-list">
                    <li v-for="(asd,idx) in alreadyChoiceProf" :class="{'check-list':asd.checkState}" @click="choice_prof(asd,idx)">
                        <div>
                            <div v-bind:class="{'border-btm':asd.profVol}">
                                <span>
                                    <i class="iconfont icon-xuanze checked-icon"></i>
                                    {{asd.kaoDianMC}}
                                </span><br>
                                <span class="dateStr">
                                    {{asd.zhuanYeMC}}
                                    {{asd.kaoShiRQStr}}
                                </span>
                            </div>
                            <div v-if="asd.profVol" v-for="(subProf,subIdx) in asd.profVol" class="subProf-list">
                                <span>
                                    <mt-badge size="small">
                                        {{subIdx+1}}
                                    </mt-badge>
                                    {{subProf.profName}}
                                </span>
                            </div>
                        </div>
                        
                        <div v-if="asd.baoKaoBZ!='undefined' && asd.baoKaoBZ==2" class="button-box">
                            <mt-button size="small" class="custom-btn" @click="gotoPaypage">
                                支付
                            </mt-button>
                        </div>
                        <div class="button-box" v-else-if="asd.baoKaoBZ ==2 || asd.baoKaoBZ== 3|| asd.baoKaoBZ==4">
                            
                        </div>
                        <div v-else class="button-box">
                            <span v-if="asd.zhiYuanShu!='undefined' && asd.zhiYuanShu>0">
                                <mt-button v-if="asd.ymvol" size="small" class="custom-btn">
                                    专业兼报
                                </mt-button>
                                <mt-button v-else size="small" class="custom-btn" @click="gotoVolMajor(asd)">
                                    志愿填报
                                </mt-button>
                            </span>
                            <mt-button size="small" class="custom-btn" @click="deletePRof(asd,idx)">    删除该专业
                            </mt-button>
                        </div>
                        <!-- <div class="button-box" v-if="asd.baoKaoBZ!=3">
                            <mt-button size="small" class="custom-btn">交费</mt-button>
                            <span v-if="asd.baoKaoBZ!=2">
                                <mt-button v-if="asd.ymvol" size="small" class="custom-btn">
                                    专业兼报
                                </mt-button>
                                <mt-button v-else size="small" class="custom-btn">
                                    志愿填报
                                </mt-button>
                                <mt-button size="small" class="custom-btn" @click="deletePRof(asd,idx)">删除该专业</mt-button>
                            </span>
                            <span v-else>
                                <mt-button size="small" class="custom-btn" @click="gotoPaypage">
                                    支付
                                </mt-button>
                            </span>
                        </div> -->
                    </li>
                </ul>
            </div>
            <!-- <span slot="total-price" class="total-price">12354</span> -->
            <div slot="pay_btn" class="pay-btn" v-if="showBtn">
                <div class="f-fixed dubb-btn" v-bind:class="{zhejiang_CM:applyMode==2}">
                    <span class="lf total-jine">
                        <span>合计：{{toTalPrice}}</span>
                        <span v-if="applyMode==2" 
                            @click="CprofSort"
                            style="text-decoration:underline;color:#42CEFC;font-size:.25rem;margin-left:.3rem;"
                        >
                            专业志愿排序
                        </span>
                    </span>
                    <span class="lf tijiao-btn" @click="add_prof_order">
                        提交
                    </span>
                </div>
            </div>
        </selectProf>
        <signUpNotice v-if="ifShowNotice">
            <div slot="signUp-notice" class="signup-notice" v-html="signUpNotice_con"></div>
            <span>我已阅读并确认提交</span>
        </signUpNotice>
        <testCenterProf v-if="testCenter_prof">
            <div slot="school" class="school">
                <span>当前报考院校：</span><i>{{selectedSch}}</i>
            </div>
            <div slot="selecting-body" class="selecting-body">
                <div class="sch-prof-place">
                    <div class="choice-ipt f-fixed" v-if="hideExam">
                        <div class="lf lists-title">考试名称：</div>
                        <div class="lf ipt-value" @click="choiceProf_a">
                            <span>{{ipt_val.split(",")[1]}}</span>
                            <i class="diy-icon"></i>
                        </div>
                    </div>
                    <div class="choice-ipt">
                        <div class="lf lists-title">考点名称：</div>
                        <div class="lf ipt-value" @click="choiceProf_ab">
                            <span>{{kaoShiKDID.split(",")[2]}}</span>
                            <i class="diy-icon"></i>
                        </div>
                    </div>
                    <div class="choice-ipt">
                        <div class="lf lists-title">专业名称：</div>
                        <div class="lf ipt-value" @click="choiceProf_ac">
                            <span v-if="checkRadio">
                                {{siteIDSel.split(",")[3]}}
                            </span>
                            <span v-else>
                                {{display_arr.join(",")}}
                            </span>
                            <i class="diy-icon"></i>
                        </div>
                    </div>
                    <div class="choice-ipt" v-if="choiceExamTime">
                        <div class="lf lists-title">考试时间：</div>
                        <div class="lf ipt-value" @click="choiceProf_at">
                            <span v-if="checkRadio">
                                {{zhechaun.split(",")[0]}}
                            </span>
                            <i class="diy-icon"></i>
                        </div>
                    </div>
                </div>
                <div class="wrap-sure">
                    <div class="sure-btn">
                        <span class="button-sure" @click="notice_submit">确定</span>
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
        </testCenterProf>
        <div class="sign-up">
            <div class="choice-sch">
                <div class="sch-lists">
                    <ul class="sch-ul">
                    	<li class="sch-list" @click="choiceSch({'typeFlag':3},-1)" :class="{curMenu:allC}">
                    		<span>全部</span>
                    	</li>
                        <li v-for="(item,index) in selfData" @click="choiceSch(item,index)" class="sch-list" :class="{curMenu:item.isCurList}">
                            <span> {{item.typeName}}</span>
                        </li>
                    </ul>
                </div>
                <div class="sch-del-filter">
                	<div class="sch-del-fil">
                        <div v-if="schools.length>0">
                    		<ul class="filter-sch">
                    			<li v-for="filter_sch in schools" class="filter-sch-li" @click="choiceProf(filter_sch)">
                    				<div class="admin-del">
                    					<span class="img-span">
                    						<img v-bind:src="filter_sch.logo" alt="">
                    					</span>
                    					<span>{{filter_sch.xueXiaoMC}}</span>
                    				</div>
                    			</li>
                    		</ul>
                        </div>
                        <div v-if="nosch" >
                            <p class="no-sch">
                                暂时没有符合条件的学校
                            </p>
                        </div>
                	</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// vue-qriously打包报错
// import VueQriously from 'vue-qriously'
// import 'mint-ui/lib/style.css';
//import {
//    Header,
//    Button,
//    MessageBox,
//    Cell,
//    Badge,
//    Toast,
//    Popup,
//    Radio,
//    Checklist        
//} from 'mint-ui';
import {MessageBox,Badge,Toast,Checklist} from 'mint-ui';
import pulldown from "../public/loadmore";
import Loading from '../public/Loading';
import selectProf from "./selectProf";
import testCenterProf from "./testCenterProf";
import signUpNotice from "./signUpNotice";
import profSort from "./profSort";
import professionalVoluntary from "./professionalVoluntary";
import VueDND from 'awe-dnd'
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
//Vue.component(Cell.name, Cell);
Vue.component(Badge.name, Badge);
//Vue.component(Popup.name, Popup);
//Vue.component(Radio.name, Radio);
//Vue.component(Checklist.name, Checklist);
// Vue.use(VueQriously)
Vue.use(VueDND)

export default {
    name: 'queryResults',
    data() {
        return {
            sort_data:[],//浙传的排序数据
            profSort:false, //专业排序
            zheJiangCM:true,  //浙江传媒标志
            choiceExamTime:false,//浙传的考试时间选择控制
            propTitle_3:"选择考试时间",
            popupVisible:false,
            popupVisible_1:false,//考点名称
            popupVisible_2:false,//
            popupVisible_3:false,//浙传的时间选择
            siteIDSel:"",//单选框内容
            siteIDSel_arr:[],//复选框内容
            display_arr:[],//复选框显示内容
            propTitle:"选择考试",
            propTitle_1:"选择考点",
            propupContent:[],
            hideExam:true,//只有一场考试时隐藏考试名称
            xueXiaoID:"", //右侧学校请求考试时需要的参数 
            provinceList: [],//to Use
            interface: [], //to Use
            selfData: [], // 左侧学校名称列表
            schools:[],   // 根据条件过滤出来显示在右侧供用户选择的学校
            allSchool:[],  // 所有学校列表 ==datas.obj.collegeList 
            stcList:[],   //请求回来的 stcList 数组
            category_arr:[], //根据typeId过滤出来的所有typeId一样的学校ID数组
            selected_prof:false, //院校已选专业页面
            testCenter_prof:false, //选择考点专业页面
            userName:'', //通过客户端接口获取到姓名
            provinceN:'', //通过客户端接口获取到省份
            nosch:false,
            seachVal:"" ,//搜索值
            selectedSch:"" ,//选中的学校
            alreadyChoiceProf:[],//已选中的专业
            ipt_val:'',//考试的值
            ipt_val_kaodian:'',//考点的值
            ads:[], //弹出框内容考试名称
            ads_1:[],//考点名称弹出框内容
            ads_2:[],//专业名称弹出框
            ads_3:[],//浙传时间选择弹出框
            zhechaun:"",//浙传的时间显示
            allListandPlace:[],//选择考点专业页面初始加载的数据
            kaoDianMC:[],//考点名称数组
            kaoShiKDID:"",//专业名称请求时需要此参数
            applyMode:null,//专业名称请求时需要此参数
            ifShowNotice:false,//是否显示报考须知
            signUpNotice_con:"",//报考须知内容
            ifReadNotice:true,//是否读了报考须知
            checkList:true,//鲁美选择专业时为复选框
            checkRadio:false,//除了鲁美模式其他专业选择模式全为单选框
            xianKaoZYS:"",//限考志愿数
            examProfList:[],//浙传需要

            zhiYuanShu:"",//专业志愿填报页面选取志愿的个数
            allProf_list:[],//所有供选择的志愿
            prof_choice:false,
            alreadyChoiceWish:[],
            canTouch:true,
            baoKaoID:'',
            xuexiaoID:"",
            profVol:null,//志愿排序
            showBtn:true,//报名费用的显示隐藏控制
            checkShowBtn:[],
            toTalPrice:"",//总金额

            isCurList:false,//左侧选中院校效果
            allC:true,
        }
    },
    mounted() {
        // this.userName=yksapp_user.getStdName();
        // this.provinceN=yksapp_user.getStdProvince();
        var url = "befexam,/api/m/auth/college/query.htm";
        // var adUrl="sys,/api/m/advertise/check_advertise.htm";
        var datas = {};
        ajaxMethod.doAjax(url,datas,this.loadCollegeData);

        // 请求省份接口
        var prov = "base,/api/m/auth/province/query.htm";
        // 添加函数专业
        this.$bus.on("click",this.addProf_1);
        // 返回
        this.$bus.on("clickb",this.asd_1);
        this.$bus.on("clickthird",this.notice_operate);
        this.$bus.on("confirm_btn",this.confirm_event);
        this.$bus.on("complee",this.compl);
        this.$bus.on("hideSort",this.hideS);
        this.$bus.on("profOperate",this.prof_op);
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
        }
    },
    methods: {
        prof_op(){
            this.prof_choice=false;
            var that=this;
            var url="befexam,/api/m/auth/apply/query_prof.htm";
            var datas={"xueXiaoID":this.xuexiaoID,"baoKaoBZList":[1,2,3]};
            ajaxMethod.doAjax(url,datas,function(data){
                that.alreadyChoiceProf=data.datas.list;
                that.check_operate();
            })
        },
        hideS(){
            this.profSort=false;
            this.selected_prof=true;
        },
        compl(){
            // this.selected_prof=false;
            // this.profSort=true
            var that=this;
            var url="befexam,/api/m/auth/apply/save_show_order.htm";
            var pList=[];
            this.sort_data.forEach(function(v,i){
                pList.push({
                    baoKaoID:v.baoKaoID,
                    showOrder:i+1
                })
            })
            var datas={'list':pList};
            ajaxMethod.doAjax(url,datas,function(data){
                if(data.success){
                    that.profSort=false;
                    that.selected_prof=true;
                    that.alreadyChoiceProf=that.sort_data;
                }else{
                    Toast({
                        message:data.message,
                        position:"middle",
                        duration: 500
                    })

                }
            });
        },
        CprofSort(){
            this.selected_prof=false;
            this.profSort=true;

            this.sort_data=this.alreadyChoiceProf;
        },
        sure_btn(){
            this.popupVisible=false;
            this.popupVisible_1=false;
            this.popupVisible_2=false;
            this.popupVisible_3=false;
        },
        notice_operate(){
            this.ifShowNotice=false;
            this.ifReadNotice=false;
        },
        confirm_event(){
            this.ifShowNotice=false;
            this.ifReadNotice=true;
            this.noticeFun();
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
            console.log(this.ads.length);
            that.zhechaun="";
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
            this.propTitle_1="选择考点"
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
                    "value":value.kaoShiKDID+","+value.kaoDianID+","+value.siteName
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
             ajaxMethod.doAjax(pUrl,data,function(datas){
                // applyMode==1是鲁美模式，==2是浙传模式
                if(that.applyMode==1){
                    if(datas.datas.examProfList.length==0){
                        Toast({
                            message: "专业信息查询失败",
                            position: 'middle',
                            duration: 500
                        });
                    }else{
                        that.popupVisible_2=true;
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
                    // ==2是浙传模式
                }else if(that.applyMode==2){
                    that.choiceExamTime=true;
                    if(datas.datas.examProfList.length==0){
                        Toast({
                            message: "专业信息查询失败",
                            position: 'middle',
                            duration: 500
                        });
                    }else{
                        that.popupVisible_2=true;
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
            });
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
        // 添加专业按钮
        addProf_1(){
            // alert("接收添加")
            var that=this;
            var schLIstUrl="befexam,/api/m/auth/apply/query_exam_site.htm";
            var schLIstdata={"xueXiaoID":that.xueXiaoID};
            // console.log(datas)
            this.ads=[];
            this.ipt_val="";//点击添加时，考试名称，考点名称，专业名称全部置空
            this.kaoShiKDID="";
            this.siteIDSel="";
            this.zhechaun="";
            ajaxMethod.doAjax(schLIstUrl,schLIstdata,function(datas){
                that.allListandPlace=datas.datas.list;
                if(datas.datas.list.length == 1){
                    that.hideExam=false;
                }else{
                    that.hideExam=true;
                }
                datas.datas.list.forEach(function(valuew,index){
                    that.ads.push({"label":valuew.kaoShiMC,"value":valuew.kaoShiID.toString()})
                })
            });
            this.testCenter_prof=true;
            this.selected_prof=false;
        },
        // 搜索学校
        searchSch_as(){
            var that=this;
            that.schools=[];
            var reg=new RegExp(this.seachVal);
            this.allSchool.forEach(function(value,index){
                if(value.xueXiaoMC.match(reg)){
                    that.schools.push(value)
                }
            })
        },
        // 请求学校列表成功回调
        asd_1(){
            this.selected_prof=false;
            this.testCenter_prof=false;
            this.choiceExamTime=false;
            this.zheJiangCM=false;
            //点击返回按钮时考试名称，考点名称和专业名称全部设置为空
            this.siteIDSel="";
            this.siteIDSel_arr=[];
            this.display_arr=[];
            this.ipt_val="";
            this.kaoShiKDID="";
        },
        loadCollegeData(data) {
            var that = this;
            var res = [];
            var res_2 = [];
            var obj = {};
            var obj_2 = {};
            data.datas.obj.typeList.forEach(function(value, index) {
                res.push(value.typeName)
                res_2.push({
                    'typeName': value.typeName,
                    'typeId': value.typeId,
                    "typeFlag": 0 //typeFlag为0的话是通过 value.typeId 
                        //去 tcList 中找所有typeId一样的学校ID
                })
            })
            data.datas.obj.collegeList.forEach(function(value, index) {
                res.push(value.provChName)
                res_2.push({
                    'typeName': value.provChName, //省份名称
                    'typeId': value.prov, // 学校ID
                    "typeFlag": 1 //typeFlag为1的话是通过 value.prov 去collegeList学校过滤
                })
            });
            for (var uniq = 0; uniq < res_2.length; uniq++) {
                if (res_2[uniq].typeName == '' || res_2[uniq].typeName == null || res_2[uniq].typeName == "-") {
                    res_2.splice(uniq, 1);
                }
                if (!obj_2[res_2[uniq].typeName]) {
                    this.selfData.push(res_2[uniq]);
                    obj_2[res_2[uniq].typeName] = 1;
                    this.selfData.forEach(function(v,i){
                        Vue.set(that.selfData[i],"isCurList",false);
                    })
                }
            }
            this.allSchool=data.datas.obj.collegeList;
            this.stcList=data.datas.obj.stcList;
            this.schools=this.allSchool;
        },
        // 选择学校
        choiceSch(data,index) {
        	var that=this;
            var choiceF = data.typeFlag;
            var prov;//通过学校过滤的参数
            var typeId;//通过类别过滤的参数
            this.schools=[];
            //左侧学校切换时选中效果
            this.selfData.forEach(function(v,i){
                if(index == i) {
                    Vue.set(that.selfData[i],"isCurList",true);
                    that.allC=false;
                }else if(index==-1){
                    that.allC=true;
                    Vue.set(that.selfData[i],"isCurList",false);
                }else{
                    Vue.set(that.selfData[i],"isCurList",false);
                }
            })
            if (choiceF == 0) {
                // 通过类别过滤
                typeId=data.typeId;
                that.category_arr=[];
                this.stcList.forEach(function(value,index){
                	if(value.typeId==typeId){
                		that.category_arr.push(value)
                	}
                })
                // for(var i=0;i<that.category_arr.length;i++){
                // 	console.log(that.category_arr[i].xueXiaoID)
                // }
                for(var p=0;p<this.allSchool.length;p++){
                	for(var s=0;s<this.category_arr.length;s++){
                		if(this.allSchool[p].xueXiaoID == this.category_arr[s].xueXiaoID){
                			this.schools.push(this.allSchool[p])
                		}
                	}
                }
            } else if (choiceF == 1) {
                // 通过学校过滤
                prov=data.typeId;
                this.allSchool.forEach(function(value,index){
                	if(value.prov==prov){
                		that.schools.push(value);
                	}
                })
            } else if (choiceF == 2) {
            	// 浏览历史和收藏，暂时没有代码
            }else{
            	// 点击全部的情况
            	this.schools=this.allSchool;
            }
        },
        //右侧学校列表点击事件
        choiceProf(sch_arr){
            // this.selected_prof=true;
            this.xueXiaoID=sch_arr.xueXiaoID;
            this.selectedSch=sch_arr.xueXiaoMC;
            var prof_list_url="befexam,/api/m/auth/apply/query_prof.htm";
            var data={"xueXiaoID":sch_arr.xueXiaoID,"baoKaoBZList":[1,2,3]};
            this.xuexiaoID=sch_arr.xueXiaoID;
            ajaxMethod.doAjax(prof_list_url,data,this.loadprof_list_url);
        },
        // 加载专业方法
        getBaoKaoBZ(arrList){
            if(typeof(arrList.baoKaoBZ) == 'undefined' || arrList.baoKaoBZ==null){

                if (typeof(arrList.applyStat) == 'undefined' || arrList.applyStat==null){
                    return 1;
                }
                if (arrList.applyStat==3){
                    return 5;
                }
                if(arrList.applyStat==4){
                    return 3;
                }
                return arrList.applyStat;
            }
            return arrList.baoKaoBZ;
        },
        // 选中问题处理
        check_operate(){
            var that = this;
            var kaoDianID="undefined";
            for(var ss=0;ss<this.alreadyChoiceProf.length;ss++){
                if(this.alreadyChoiceProf[ss].kaoDianID == 'undefined'){
                    continue;
                }
                if(that.getBaoKaoBZ(this.alreadyChoiceProf[ss]) == 'undefined' || that.getBaoKaoBZ(this.alreadyChoiceProf[ss]) !=1){
                    continue;
                }
                Vue.set(this.alreadyChoiceProf[ss],"checkState",true);
                // 选中第一个考点的所有考试
                if(kaoDianID=="undefined"){
                    kaoDianID=this.alreadyChoiceProf[ss].kaoDianID;
                }else{
                    if(this.alreadyChoiceProf[ss].kaoDianID!=kaoDianID){
                        Vue.set(this.alreadyChoiceProf[ss],"checkState",false);   
                    }
                }
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
        loadprof_list_url(datas){
            var that=this;
            var sd=[];
            if(!datas.datas.list){
                MessageBox('提示', datas.message);
            }else if(datas.datas.list.length){
                // 填过专业跳转到院校已选专业
                // this.kaoShiKDID=123;
                this.alreadyChoiceProf=datas.datas.list;
                this.sort_data=this.alreadyChoiceProf;
                this.check_operate();
                this.checkShow_Btn();
                this.selected_prof=true;
                this.ipt_val=datas;
                console.log(this.ipt_val)
            }else{
                //没填过专业跳转到选择考点专业
                this.ipt_val="";
                this.kaoShiKDID="";

                this.testCenter_prof=true;//选择考点专业页面
            }
            var schLIstUrl="befexam,/api/m/auth/apply/query_exam_site.htm";
            var schLIstdata={"xueXiaoID":that.xueXiaoID};
            ajaxMethod.doAjax(schLIstUrl,schLIstdata,function(datas){
                that.allListandPlace=datas.datas.list;
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
                    that.hideExam=false;
                }else{
                    that.hideExam=true;

                }

                datas.datas.list.forEach(function(valuew,index){
                    that.ads.push({
                        "label":valuew.kaoShiMC,
                        "value":valuew.kaoShiID+","+valuew.kaoShiMC
                    });
                })
            });
        },
        // 删除报考的专业
        deletePRof(deletePRof,idx){
            var that=this;
            var deleteUrl="befexam,/api/m/auth/apply/delete_prof.htm";
            var data={"xueXiaoID":deletePRof.xueXiaoID,"baoKaoID":deletePRof.baoKaoID}
            // ajaxMethod.doAjax(deleteUrl,data,deleteFun);
            MessageBox({
                title: '',
                message: '确定要删除此选项吗?',
                showCancelButton: true
            }).then(action => {
                    if (action == "confirm") {
                        ajaxMethod.doAjax(deleteUrl,data,deleteFun);
                    }
                });
            function deleteFun(data){
                if(data.success){
                    that.alreadyChoiceProf.splice(idx,1);
                    that.check_operate();
                    Toast({
                        message: data.message,
                        position: 'middle',
                        duration: 500
                    });
                }else{
                    Toast({
                        message: data.message,
                        position: 'middle',
                        duration: 500
                    });
                }
            }
        },
        // 支付按钮点击事件
        gotoPaypage(){
            var that=this;
            MessageBox({
                title: '',
                message: '所报该专业已经生成订单，请到交费记录中支付！',
                confirmButtonText:'知道了'
            }).then(action => {
                if (action == "confirm") {
                    that.$router.push("/Payrecord")
                }
            });
        },
        // 报名提交
        notice_submit(){
            var submitUrl="befexam,/api/m/auth/apply/query_apply_notice.htm"
            var data={"schId":this.xueXiaoID,
                        "examId":this.ipt_val.split(",")[0],
                        "examPointId":this.kaoShiKDID.split(",")[1]
            }
            console.log(this.ipt_val);
            // debugger;
            // 鲁美模式单独处理
            if(this.applyMode==1){

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
            ajaxMethod.doAjax(submitUrl,data,this.query_apply_notice);
        },
        query_apply_notice(datas){
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
            }
            this.noticeFun();
        },
        // 是否有报考须知处理
        noticeFun(){
            var that=this;
            var data;
            var LuM=[];
            //鲁美提交参数不一样
            if(this.applyMode==1){
                this.siteIDSel_arr.forEach(function(v,i){
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
                    showCancelButton:true
                }).then(action=>{
                    if(action=='confirm'){
                        ajaxMethod.doAjax(subUrl,data,function(datas){
                            if(datas.success){
                                var prof_list_url="befexam,/api/m/auth/apply/query_prof.htm";
                                var data={"xueXiaoID":that.xueXiaoID,"baoKaoBZList":[1,2,3]};
                                that.testCenter_prof=false;
                                that.selected_prof=true;
                                ajaxMethod.doAjax(prof_list_url,data,function(datas){
                                    that.alreadyChoiceProf=datas.datas.list
                                    that.check_operate();
                                    that.checkShow_Btn();

                                });
                            }else{
                                MessageBox({
                                    title: '',
                                    message: datas.message,
                                    showCancelButton: false,
                                    confirmButtonText:"知道了",
                                })
                            }
                        });
                    }
                });
            }
        },
        // 志愿专业填报按钮
        gotoVolMajor(asd){
            this.profVol=asd.profVol;
            this.zhiYuanShu=asd.zhiYuanShu;
            this.baoKaoID=asd.baoKaoID;
            this.alreadyChoiceWish=[];
            var url="befexam,/api/m/auth/apply/query_profVol.htm";
            var data={
                "xueXiaoID": asd.xueXiaoID, //学校ID[不可空]
                "kaoShiID": asd.kaoShiID, //学校ID[不可空]
                "fuZhuanYe": asd.zhuanYeID //父专业ID[不可空]
            };
            ajaxMethod.doAjax(url,data,this.prof_List)
            // this.$router.push({path:"/volunterMajor",query:{
            //     "xueXiaoID": asd.xueXiaoID, //学校ID[不可空]
            //     "kaoShiID": asd.kaoShiID, //学校ID[不可空]
            //     "fuZhuanYe": asd.zhuanYeID //父专业ID[不可空]
            // }})
        },
        // 院校已选专业排序
        prof_List(data){
            var that=this;
            this.prof_choice=true;
            this.allProf_list=data.datas.list;
            if(this.profVol){
                this.profVol.forEach(function(v,i){
                    that.alreadyChoiceWish.push({
                        zhuanYeMC:v.profName,
                        zhuanYeID:v.profId
                    })
                    that.allProf_list.forEach(function(v_1,i){
                        if(v.profName == v_1.zhuanYeMC){
                            that.allProf_list.splice(i,1)
                        }
                    })
                })
            }
        },
        choiceProf_double(allProf,idx){
            if(this.alreadyChoiceWish.length>=0){
                this.canTouch=false;
            }
            if(this.alreadyChoiceWish.length<this.zhiYuanShu){
                this.alreadyChoiceWish.push(this.allProf_list[idx]);
                this.allProf_list.splice(idx,1);
            }else{
                Toast({
                    message: "只能填报"+this.zhiYuanShu+"个志愿",
                    position: 'middle',
                    duration: 500
                });
            }
        },
         reduce_prof(allProf,idx){
            this.allProf_list.push(this.alreadyChoiceWish[idx]);
            this.alreadyChoiceWish.splice(idx,1);
            if(this.alreadyChoiceWish.length==0){
                this.canTouch=true;
            }
         },
        sure_btn_click(){
            var that=this;
            var url="befexam,/api/m/auth/apply/save_prof_vol.htm";
            if(this.alreadyChoiceWish.length<this.zhiYuanShu){
                Toast({
                    message: "您尚有志愿未选择",
                    position: 'middle',
                    duration: 500
                });
                return;
            }
            var list=[];
            this.alreadyChoiceWish.forEach(function(v,i){
                list.push({
                    profOrder:(i+1).toString(),
                    profName:v.zhuanYeMC,
                    profId:v.zhuanYeID
                })
            })
            var data={
                "baoKaoID":this.baoKaoID , //学校ID[不可空]
                "volList":list //志愿列表[不可空]
            }
            // 确定成功后隐藏志愿选择页面
            ajaxMethod.doAjax(url,data,function(data){
                if(data.success){
                    that.prof_choice=false;
                    // var that=this;
                    var url="befexam,/api/m/auth/apply/query_prof.htm";
                    var datas={"xueXiaoID":that.xuexiaoID,"baoKaoBZList":[1,2,3]};
                    ajaxMethod.doAjax(url,datas,function(data){
                        that.alreadyChoiceProf=data.datas.list;
                        that.check_operate();
                        that.checkShow_Btn();
                    })
                }else{
                    Toast({
                        message: data.message,
                        position: 'middle',
                        duration: 500
                    });
                }
            })
        },
        add_prof_order(){
            var that=this;
            var url="befexam,/api/m/auth/apply/add_prof_order.htm";
            var kaodianList=[];
            var data={
                xueXiaoID:this.xuexiaoID,
                baoKaoIDs:kaodianList
            }
            this.alreadyChoiceProf.forEach(function(v,i){
                if(v.checkState){
                    kaodianList.push(v.baoKaoID)
                }
            })
            MessageBox({
                title: '',
                message: '请仔细确认，所选专业提交交费成功后不可修改',
                showCancelButton: true
            }).then(action=>{
                if(action=="confirm"){
                    ajaxMethod.doAjax(url,data,function(datas){
                        if(datas.success){
                            MessageBox({
                                title:"",
                                message: datas.message,
                                showCancelButton:false
                            }).then(action=>{
                                if(action=="confirm"){
                                    that.$router.push("/registerRecord")
                                }
                            })
                        }else{
                            MessageBox({
                                title:"",
                                message: datas.message,
                                showCancelButton:false
                            })
                        }
                    })
                }
            });
        },
        // 选中专业切换事件
        choice_prof(w,idxx){
            var that=this;
            var curKaoDian;
            var muliArr=[];
            var checkIfAllChoice=[];

            if(w.baoKaoBZ==1){
                // w.checkState=!w.checkState;

                curKaoDian=w.kaoDianID.toString()+w.kaoShiID;

                this.alreadyChoiceProf.forEach(function(v,i){
                    if(v.kaoDianID.toString()+v.kaoShiID == curKaoDian && v.baoKaoBZ==1){
                        muliArr.push(that.alreadyChoiceProf[i]);
                    }
                })
                if(muliArr.length<=1){
                    // 只有一个考点的情况
                }else{
                    //有多个考点的情况
                    muliArr.forEach(function(v,i){
                        if(true){

                        }
                    })
                }
                for(var dd=0;dd<this.alreadyChoiceProf.length;dd++){
                    if(this.alreadyChoiceProf[dd].baoKaoBZ==1){
                        if(this.alreadyChoiceProf[dd].checkState!=undefined 
                            && this.alreadyChoiceProf[dd].kaoDianID.toString()
                            +  this.alreadyChoiceProf[dd].kaoShiID
                            == curKaoDian){
                        // debugger;
                            // console.log(v.checkState)
                            // v.checkState=false;  
                            if(muliArr.length<=1){
                                Vue.set(that.alreadyChoiceProf[dd],"checkState",!that.alreadyChoiceProf[idxx].checkState);
                            }else{
                                // 考点排斥
                                Vue.set(that.alreadyChoiceProf[idxx],"checkState",!that.alreadyChoiceProf[idxx].checkState);
                                that.alreadyChoiceProf.forEach(function(v,i){
                                  
                                    if(v.checkState!= undefined 
                                        && that.alreadyChoiceProf[i].kaoDianID.toString()
                                        +  that.alreadyChoiceProf[i].kaoShiID
                                        != curKaoDian){
                                        Vue.set(that.alreadyChoiceProf[i],"checkState",false);
                                    }
                                })
                                break;
                            }
                            // Vue.set(that.alreadyChoiceProf[i],"checkState",!v.checkState);
                        }else{
                            Vue.set(that.alreadyChoiceProf[dd],"checkState",false);
                        }
                    }
                }
                // Vue.set(that.alreadyChoiceProf[idxx],"checkState",!that.alreadyChoiceProf[idxx].checkState);
                this.alreadyChoiceProf.forEach(function(v,i){
                    // console.log(v.checkState)
                })
            }
            // 控制是否显示提交按钮
            this.checkShow_Btn();
            this.alreadyChoiceProf.forEach(function(v,i){
                // if(w.baoKaoBZ==1){
                checkIfAllChoice.push(v.checkState)
                // }
            })
            // debugger;
            if(checkIfAllChoice.join(",").indexOf("true")>=0){
                // debugger;
                that.showBtn=true;
            }else{
                that.showBtn=false;
            }
        }
    },
    components: {
        Loading,
        pulldown,
        selectProf,
        testCenterProf,
        signUpNotice,
        profSort,
        professionalVoluntary
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
.lists-title{width:1.4rem;}
.ipt-value{width:calc(100% - 1.4rem);position:relative;height:100%;}
.ipt-value .diy-icon{width:5px;height:5px;border:2px solid #42CEFC;background:#fff;border-bottom-width:0;border-left-width:0;position:absolute;top:50%;right:0;transform: translate(-50%,-50%) rotate(45deg)}
.selecting-body{background: #fff;font-size:.25rem;padding:0 .2rem;}
.selecting-body .wrap-sure, .selecting-body .choice-notice{margin:0 -.2rem;background: #F9F9F9;padding-top:.3rem;}
/*.selecting-body .wrap-sure{padding-top:.3rem;}*/
.selecting-body .choice-notice .notice-content{padding:0 .2rem;font-size:.25rem;}
.selecting-body .wrap-sure .sure-btn{padding:0 .2rem;}
.selecting-body .wrap-sure .sure-btn .button-sure{display:block;width:100%;background: #42CEFC;color:#fff;text-align: center;border-radius:.08rem;padding:.2rem 0;font-size:.3rem;}
.selecting-body .choice-ipt{border-bottom:1px solid #F0F0F0;height:.8rem;line-height:0.8rem;}
.selecting-body .choice-ipt:last-child{border:none;}
.prop-btm{background: #EFEFEF;padding:.2rem;}
.prop-btm .prop-btn{background:#42CEFC;font-size:.3rem;color:#fff;display:block;text-align: center;padding:.15rem 0;border-radius:.1rem;}
.choice-title{text-align: center;font-size:.3rem;color:#010101;background: #EEEEEE;padding:.2rem 0;}
.choice-lists{max-height:5rem;overflow: auto;font-size:.3rem;min-height:2rem;}
.prop-div{width:80%;overflow: auto;border-radius: .1rem;}
.dateStr{padding-left:.35rem;}
/*.sign-up-page{position:relative;}*/
.mint-button--primary{background: #42CEFC}
.mint-cell .mint-cell-allow-right::after{border:solid 2px #42CEFC!important;}
.sign-up {
	position:absolute;
	top:1.4rem;
	bottom:0;
	width:100%;
}
.total-price{font-style: normal;}
.search{position:fixed;top:.7rem;background: #F9F9F9;height:.7rem;width:100%;display: flex;align-items: center;justify-content: center;padding:4px 0;box-sizing: border-box;}
.search .search-ipt{border:1px solid #44CEFC;height:100%;font-size:.25rem;text-align:center;width:70%;border-radius: .35rem;margin-right: 5px;}
.sign-up .choice-sch{position:relative;height:100%;}
.sign-up .choice-sch .sch-lists{width:1.1rem;position:absolute;top:0;bottom:0;overflow-y: auto;}
.sign-up .choice-sch .sch-lists .sch-ul{text-align:center;}
.sign-up .choice-sch .sch-lists .sch-ul .curMenu{background: #CCCCCC;}
.sch-list {
    font-size: .25rem;
    line-height:.35rem;
    padding:.15rem 0.01rem;
    letter-spacing: .015rem;
}
.sch-del-filter{width:calc(100% - 1.1rem);position:absolute;top:0;bottom:0;left:1.1rem;overflow-y: auto;}
.sch-del-filter .sch-del-fil{border-top:1px solid #ddd;border-left:1px solid #ddd;height:100%;}
.sch-del-filter .sch-del-fil>div{height:100%;}
.sch-del-filter .sch-del-fil .no-sch{background: #fff;font-size:.3rem;text-align:center;padding:.35rem;margin-top:.3rem;}
.sch-del-filter .sch-del-fil .filter-sch{height:100%;overflow-y:auto;}
.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li{font-size:.25rem;padding: .2rem 0 .2rem .1rem;}
.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li img{max-width:.6rem;max-height:.6rem;}
.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del{display:flex;align-items: center;justify-content: left;}
.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del .img-span{display:inline-block;width:.6rem;height:.6rem;position:relative;margin-right:.15rem;}
.sch-del-filter .sch-del-fil .filter-sch .filter-sch-li .admin-del .img-span img{position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);}
.sch-ul .cur-li{background:#ccc;}
.school{background:#fff;font-size:.25rem;padding:0 .1rem;height:.6rem;margin-bottom:.2rem;}
.school i{font-style:normal;color:#5ABEFA;}
.select-body .back-prof-list{margin-top:.2rem;}
.select-body .back-prof-list li{padding:0.1rem .2rem;background: #fff;margin-top:.2rem;font-size:.25rem;}
.select-body .back-prof-list .check-list{color:#00AFFE;}
.select-body .back-prof-list .check-list .iconfont{color:#00AFFE;}
.select-body .back-prof-list .check-list .subProf-list .mint-badge.is-size-small{background: #26a2ff}
.select-body .back-prof-list li .button-box{text-align:right;margin:.2rem 0 .1rem;}
.checked-icon{color:#CCCCCC;}
.border-btm{border-bottom:1px solid #F5F5F5;padding-bottom:.1rem;margin-bottom:.1rem;}
.subProf-list{padding-left:.35rem;}
.mint-badge.is-size-small{padding:0;font-size:.2rem;width:.3rem;height:.3rem;line-height: .3rem;text-align: center;border-radius: 50%;background:#CCCCCC;}
.custom-btn{color:#FB7D21;border-color:#FB7D21;background:#fff;box-shadow:0 0 1px #FB7D21;}
/*.signup-notice{padding:0 .2rem;}*/
/*.mint-badge.is-size-small{width:50px;height:50px;border-radius: 50%;padding:0;line-height:50px;}*/



.dubb-btn>span{width:50%;text-align: center;}
.dubb-btn .tijiao-btn{background: #1CA7F8;color:#fff;}
.dubb-btn .total-jine{background: #E2E2E2}
.pay-btn .zhejiang_CM .total-jine{width:70%;}
.pay-btn .zhejiang_CM .tijiao-btn{width:30%;}
.sort-data{font-size:.3rem;}
.sort-data li{border-bottom:1px solid #ddd;padding:.1rem 0;}
.sort-data .dragging{background: #f4f4f4;}
.prof-list-text{background: #EEEEEE;font-size: .25rem;padding: .2rem;}
.prof_data{font-size:.3rem;overflow: auto;padding-bottom: 1rem;height: 100%;box-sizing: border-box;}
.display_flex{display:flex;align-items: center;border-bottom:1px solid #ddd;padding: .25rem 0 .25rem .4rem;position:relative;}
.display_flex .mint-badge{margin-right:.1rem;}
.clocse{position:absolute;right:.15rem;top:50%;transform: translate(0,-50%);}
.prof-btn-sure{background: #42CEFC;color:#fff;border:none;font-size:.3rem;display:block;width:100%;height:100%;border-radius:.1rem;}
.btn_gray{background: #DDDDDD}

</style>
