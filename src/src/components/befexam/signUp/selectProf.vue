<template>
    <!-- 院校已选专业展示页面 -->
    <div class="selected-prof">
        <mt-header fixed title="院校已选专业">
            <router-link to="/signUpinfo" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <!-- <mt-button icon="back" slot="left" @click="asd"></mt-button> -->
            <mt-button  slot="right" v-tap="{methods:addProf}">添加</mt-button>
        </mt-header>
        <div class="select-prof">
            <div class="top-info">
            	<userInfo></userInfo>
                <div style="font-size:.25rem;background:#fff;padding:0 .1rem .2rem;display:flex;" class="selected-School">
                    <div style="width:1.6rem;">当前报考院校 </div>
                    <div class='selectedSch'>{{selectedSch}}</div>
                </div>
            </div>
            <div class="xuanze-body">
                <div class="select-body">
                    <ul class="back-prof-list">
                        <li v-for="(asd,idx) in alreadyChoiceProf" :class="{'check-list':asd.checkState}" @click="choice_prof(asd,idx)">
                            <div>
                                <div :class="{'border-lm':asd.zhuanYeMCStr,'border-btm':asd.profVol}">
                                    <span>
                                        <i class="iconfont icon-xuanze checked-icon"></i>
                                        {{asd.kaoDianMC}}
                                    </span><br>
                                    <span class="dateStr">
                                        {{asd.zhuanYeMC}}
                                        ({{asd.kaoShiRQStr}})
                                    </span>
                                </div>
                                <!-- <div>
                                    {{applyMode}}
                                </div> -->
                                <div v-if="asd.profVol" v-for="(subProf,subIdx) in asd.profVol" class="subProf-list">
                                    <span>
                                        <mt-badge size="small">
                                            {{subIdx+1}}
                                        </mt-badge>
                                        {{subProf.profName}}
                                    </span>
                                </div>
                                <div v-if="asd.zhuanYeMCs" class="subProf-list">
                                    <span v-for="(lm_zy,lm_idx) in asd.zhuanYeMCs.split(',')" class="lm-ms">
                                        <mt-badge size="small">
                                            {{lm_idx+1}}
                                        </mt-badge>
                                        <!-- {{subProf.profName}} -->
                                        {{lm_zy}}
                                    </span>
                                </div>
                            </div>
                            
                            <div v-if="(asd.baoKaoBZ!='undefined' && asd.baoKaoBZ==2 )|| (asd.applyStat!='undefined' && asd.applyStat==2)" class="button-box">
                                <button size="small" class="custom-btn" v-tap.stop="{methods:gotoPaypage}">
                                    支付
                                </button>
                            </div>
                            <div class="button-box" v-else-if="asd.baoKaoBZ ==2 || asd.baoKaoBZ== 3|| asd.baoKaoBZ==4">
                                
                            </div>
                            <div class="button-box" v-else-if="asd.applyStat ==2 || asd.applyStat== 3|| asd.applyStat==4">
                                
                            </div>
                            <div v-else class="button-box">
                                <div v-if="asd.zhiYuanShu!='undefined' && asd.zhiYuanShu>0" style="display:inline-block;">
                                    <button v-if="asd.ymvol" size="small" class="custom-btn" v-tap.stop="{methods:gotoVolMajor,ads:asd}">
                                        专业兼报
                                    </button>
                                    <button v-else size="small" class="custom-btn" v-tap.stop="{methods:gotoVolMajor,ads:asd}">
                                        志愿填报
                                    </button>
                                </div>
                                <button size="small" class="custom-btn" v-tap.stop="{methods:deletePRof,asd:asd,idx:idx}">      
                                    删除该专业
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pay-btn" v-if="showBtn">
                <div class="f-fixed dubb-btn" v-bind:class="{zhejiang_CM:applyMode==2}">
                    <span class="lf total-jine">
                        <span>合计：{{toTalPriceTransform}}元</span>
                        <span v-if="applyMode==2" 
                            v-tap="{methods:CprofSort}"
                            style="text-decoration:underline;color:#42CEFC;font-size:.25rem;margin-left:.3rem;"
                        >
                            专业志愿排序
                        </span>
                    </span>
                    <span class="lf tijiao-btn" v-tap="{methods:add_prof_order}">
                        提交
                    </span>
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
//    Button,MessageBox,Badge,Toast,Indicator 
//} from 'mint-ui';
import {MessageBox,Badge,Toast,Indicator} from 'mint-ui';	
import VueBus from 'vue-bus';
import userInfo from "./userInfo";
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
Vue.component(Badge.name, Badge);
Vue.use(VueBus);
// Vue.use(VueQriously)

export default {
    name: 'queryResults',
    data() {
        return {
            applyMode:null,//专业名称请求时需要此参数
            selectedSch:"",//选中的学校
            schInfo:{},
            alreadyChoiceProf:[],//已选中的专业
            xueXiaoID:"",
            toTalPrice:"",//总金额
            showBtn:true,//是否显示提交按钮
            checkShowBtn:[],
            toTalPriceTransform:'',
        }
    },
    watch:{
        // 总金额存在浮点数计算误差，先*1000，总数在除1000
        toTalPrice:function(n,o){
            this.toTalPriceTransform=n/1000;
        }
    },
    mounted() {
        var that=this;
        this.selectedSch=this.$route.query.xueXiaoMC;
        this.xueXiaoID=this.$route.query.xueXiaoID;
        var prof_list_url="befexam,/api/m/auth/apply/query_prof.htm";
        var data={"xueXiaoID":this.xueXiaoID,"baoKaoBZList":[1,2,3]};
        Indicator.open('加载中...');
        ajaxMethod.doAjax(prof_list_url,data,this.load_prof,function(){
            that.checkShow_Btn();
            Indicator.close();
        });
    },
    methods: {
    	asd(){
    		this.$router.go(-1);
    	},
        /*
        *添加按钮点击跳转到选择考点专业页面，鲁美模式对专业选择状态的回填（参数）
        *@kaoShiKDID
        *@zhuanYeMCs(选中的专业志愿)
        *
        */
        addProf(){
            var kaoShiKDIDs='';
            var zhuanYeMCs='';
            var checkIf=[];
            // var checkIf="";
            this.alreadyChoiceProf.forEach(function(value,index){
                // console.log(value.zhuanYeMCs)
                // console.log(value.kaoShiKDID)
                if(value.applyStat==1 && value.zhuanYeMCs){
                    checkIf.push({
                        zhuanYeMCs:value.zhuanYeMCs,
                        kaoShiKDIDs:value.kaoShiKDID
                    })
                }
            })
            console.log(JSON.stringify(checkIf));
            window.localStorage.setItem("lumeicC",JSON.stringify(checkIf))
            this.schInfo={
                xueXiaoMC:this.$route.query.xueXiaoMC,
                xueXiaoID:this.$route.query.xueXiaoID,
                lumeicC:JSON.stringify(checkIf)
            }
            this.$router.push({path:"/signEntrance/testCenterProf",query:this.schInfo});
        },
        // 加载已选专业
        load_prof(datas){
            this.alreadyChoiceProf=datas.datas.list;
            if(!!datas.datas.applyMode){
                this.applyMode=datas.datas.applyMode
            }else{
                this.applyMode=null
            }
            this.check_operate();
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

        // 提交处理
        add_prof_order(){
            var that=this;
            var url="befexam,/api/m/auth/apply/add_prof_order.htm";
            var kaodianList=[];
            console.log(this.xueXiaoID)
            var data={
                xueXiaoID:this.xueXiaoID,
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
                    Indicator.open('加载中...');
                    ajaxMethod.doAjax(url,data,function(datas){
                        Indicator.close();
                        if(datas.success){
                            MessageBox({
                                title:"",
                                message: datas.message,
                                showCancelButton:false
                            }).then(action=>{
                                if(action=="confirm"){
                                    // that.$router.push("/Payrecord")
                                    yksapp.goPageWithParams("myPay","");
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
            // 鲁美有没报考标志用applyStat标志控制
            if(w.baoKaoBZ==1 || w.applyStat==1){
                // w.checkState=!w.checkState;

                curKaoDian=w.kaoDianID.toString()+w.kaoShiID;

                this.alreadyChoiceProf.forEach(function(v,i){
                    if((v.kaoDianID.toString()+v.kaoShiID == curKaoDian && v.baoKaoBZ==1)|| v.kaoDianID.toString()+v.kaoShiID == curKaoDian && v.applyStat==1){
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
                    // 鲁美只有applyStat没有baoKaoBZ
                    if(this.alreadyChoiceProf[dd].baoKaoBZ==1 || this.alreadyChoiceProf[dd].applyStat==1){
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
            if(checkIfAllChoice.join(",").indexOf("true")>=0){
                that.showBtn=true;
            }else{
                that.showBtn=false;
            }
            // if(that.toTalPrice==0){
            //     that.showBtn=false;
            // }
        },
        // 是否显示提交按钮
        checkShow_Btn(){
            var that=this;
            console.log(that.toTalPrice);
            that.toTalPrice=0;//总价格
            that.checkShowBtn=[];//所有baoKaoB的标志数组
            // debugger;
            if(this.alreadyChoiceProf.length==0){
                that.showBtn=false;
                return;
            }
            this.alreadyChoiceProf.forEach(function(v,i){
                that.checkShowBtn.push(v.baoKaoBZ);
                if(v.checkState){
                    that.toTalPrice+=parseFloat(v.baoMingFei)*1000;
                }
            })
            if(that.toTalPrice==0){
                that.showBtn=false;
                return;
            }
            for(var ss=0;ss<this.alreadyChoiceProf.length;ss++){
                if(this.alreadyChoiceProf[ss].baoKaoBZ==1 || this.alreadyChoiceProf[ss].applyStat==1){
                    that.showBtn=true;
                    return;
                }else{
                    that.showBtn=false;
                }
            }
        },
        // 删除报考的专业
        deletePRof(parmers){
            // console.log(idx)
            var that=this;
            var deleteUrl="befexam,/api/m/auth/apply/delete_prof.htm";
            var data={"xueXiaoID":parmers.asd.xueXiaoID,"baoKaoID":parmers.asd.baoKaoID}
            // ajaxMethod.doAjax(deleteUrl,data,deleteFun);
            MessageBox({
                title: '',
                message: '确定要删除此选项吗?',
                showCancelButton: true
            }).then(action => {
                    if (action == "confirm") {
                        Indicator.open('加载中...');
                        ajaxMethod.doAjax(deleteUrl,data,deleteFun);
                    }
                    // that.checkShow_Btn();
                });
            function deleteFun(data){
                Indicator.close();
                if(data.success){
                    that.alreadyChoiceProf.splice(parmers.idx,1);
                    Toast({
                        message: data.message,
                        position: 'middle',
                        duration: 500
                    });
                    if(that.alreadyChoiceProf.length==0){
                        that.showBtn=false; 
                    }
                    that.check_operate();
                    that.checkShow_Btn();
                }else{
                    Toast({
                        message: data.message,
                        position: 'middle',
                        duration: 500
                    });
                }
            }
        },
        /*
        *professionalVoluntary需要的参数
        *@zhiYuanShu
        *@profVol
        *@xueXiaoID
        *@kaoShiID
        *@zhuanYeID
        *@baoKaoID
        *
        */
        gotoVolMajor(d){
            var parmers={
                zhiYuanShu:d.ads.zhiYuanShu,
                profVol:d.ads.profVol,
                xueXiaoID:d.ads.xueXiaoID,
                kaoShiID:d.ads.kaoShiID,
                zhuanYeID:d.ads.zhuanYeID,
                baoKaoID:d.ads.baoKaoID,
                noLimitVolNum:d.ads.noLimitVolNum
            }
            this.$router.push({path:"/professionalVoluntary",query:parmers})
        },
        // 点击专业志愿排序
        CprofSort(){
            this.$router.push({path:"/profSort",query:{alrea:this.alreadyChoiceProf}})
        },
        // 支付按钮点击事件
        gotoPaypage(){
            // var that=this;
            // MessageBox({
            //     title: '',
            //     message: '所报该专业已经生成订单，请到交费记录中支付！',
            //     confirmButtonText:'知道了'
            // }).then(action => {
            //     if (action == "confirm") {
            //         that.$router.push("/Payrecord");
            //     }
            // });
            // 跳到原生支付页面
            yksapp.goPageWithParams("myPay","");
        },
    },
    components: {
    	userInfo
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
/*.selected-prof{position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;}*/
.selected-prof .select-prof{background: #F9F9F9;position:absolute;top:.7rem;bottom:0;width:100%;z-index:100;overflow-y:auto }
.selected-prof .select-prof .top-info{position:fixed;top:0.7rem;width:100%;}
.pay-btn{position:fixed;bottom:0;left:0;width:100%;font-size:.3rem;height:1rem;line-height:1rem;}
.xuanze-body{position:absolute;overflow: auto;top:1.1rem;bottom:0rem;width:100%;margin-bottom:1rem;}
.dubb-btn>span{width:50%;text-align: center;}
.dubb-btn .tijiao-btn{background: #1CA7F8;color:#fff;}
.dubb-btn .total-jine{background: #E2E2E2}
.pay-btn .zhejiang_CM .total-jine{width:70%;}
.pay-btn .zhejiang_CM .tijiao-btn{width:30%;}
.select-prof .selectedSch{color:#5ABEFA;margin-left:.1rem;width:calc(100% - 1.7rem);}

/*.select-body .back-prof-list{margin-top:.2rem;}*/
.select-body .back-prof-list li{padding:0.1rem .2rem;background: #fff;margin-top:.2rem;font-size:.25rem;}
.select-body .back-prof-list li:first-child{margin-top:0;}
.select-body .back-prof-list .check-list{color:#00AFFE;}
.select-body .back-prof-list .check-list .iconfont{color:#00AFFE;}
.select-body .back-prof-list .check-list .subProf-list .mint-badge.is-size-small{background: #26a2ff}
.select-body .back-prof-list .subProf-list .lm-ms{display:block;}
.mint-badge.is-size-small{padding:0;font-size:.2rem;width:.3rem;height:.3rem;line-height: .3rem;text-align: center;border-radius: 50%;background:#CCCCCC;}
.border-btm{border-bottom:1px solid #F5F5F5;padding-bottom:.1rem;margin-bottom:.1rem;}
.border-lm{border-bottom:1px solid #F5F5F5;padding-bottom:.1rem;margin-bottom:.1rem;}
.subProf-list{padding-left:.35rem;}
.dateStr{padding-left:.35rem;}
.select-body .back-prof-list li .button-box{text-align:right;margin:.1rem 0 .1rem;padding:.1rem 0 .2rem;box-sizing: border-box;}
.select-body .back-prof-list li .button-box button{font-size:.25rem;border:1px solid #FB7D21;box-shadow: none;height:.6rem;display: inline-flex;
    align-items: center;
    justify-content: center;border-radius:3px;padding:0 12px;}
.select-body .back-prof-list li .button-box button:after{bottom:.01rem!important;}
.custom-btn{color:#FB7D21;border-color:#FB7D21;background:#fff;box-shadow:0 0 1px #FB7D21;}
.checked-icon{color:#CCCCCC;}
</style>
