<template>
    <div class="prof-selected-prof">
        <mt-header fixed title="专业志愿排序">
            <mt-button icon="back" slot="left" @click="prof_operate"></mt-button>
        </mt-header>
        <div class="prof-sort-body">
			<div slot="prof_data" class="prof_data">
                <div v-show="alreadyChoiceWish.length>0">
                    <p class="prof-list-text">已选志愿（拖动排序）</p>
                    <draggable :list="alreadyChoiceWish">
                        <div v-for="(allProf,idx) in alreadyChoiceWish" class="display_flex">
                            <mt-badge size="small">
                                {{idx+1}}
                            </mt-badge>
                            {{allProf.zhuanYeMC}}
                           <!--  <span v-if="zhuanYFX_str.length>0">
                                （{{zhuanYFX_str.join("|")}}）
                            </span> -->
                            <span v-if="allProf.profDirList">
                                （{{allProf.profDirList}}）
                            </span>
                            <span class="clocse" v-tap="{methods:reduce_prof,allProf:allProf,idx:idx}">×</span>
                        </div>
                    </draggable>
                </div>
                <p class="prof-list-text">志愿列表（点击选择，最多可选择{{zhiYuanShu}}个）</p>
                <mt-popup
                    v-model="wtf_model" class="mint-prop-wrap">
                    <div>
                        <div class="drag-tit">
                            拖动列表项进行{{zhuanYeMC_str}}专业方向志愿排序
                        </div>
                        <div class="drag-body">
                            <draggable :list="zhuanYFX">
                                <div v-for="(sort_ZY,idx) in zhuanYFX" class="display_flex" >
                                    <mt-badge size="small">
                                        {{idx+1}}
                                    </mt-badge>
                                    {{sort_ZY}}
                                </div>
                            </draggable>
                        </div>
                        <div class="drag-btm" v-tap="{methods:sort_ZY_E}">
                            确定
                        </div>
                    </div>
                </mt-popup>
                <div v-for="(allProf,idx) in allProf_list" 
                    class="display_flex" 
                    v-tap="{methods:choiceProf_double,allProf:allProf,idx:idx}"
                    >
                    <mt-badge size="small">
                        {{idx+1}}
                    </mt-badge>
                    {{allProf.zhuanYeMC}}
                    <span v-if="allProf.profDirList">
                        (须对专业方向志愿排序)
                    </span>
                </div>
            </div>
            <div slot="btn_sure">
                <div style="position:fixed;bottom:0;height:1rem;width:100%;box-sizing:border-box;padding:.1rem;">
                   <!--  <mt-button size="large"  @click.native="sure_btn_click" :disabled='canTouch'>确定
                    </mt-button> -->
                    <button class="prof-btn-sure" 
                        :disabled="canTouch" 
                        v-tap="{methods:sure_btn_click}"
                        :class="{btn_gray:canTouch}"
                    >
                        确定
                    </button>
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
//    Button,Badge,Toast,MessageBox,Popup,Indicator  
//} from 'mint-ui';
import {Badge,Toast,MessageBox,Indicator} from 'mint-ui';
// import VueDND from 'awe-dnd';
import VueBus from 'vue-bus';
import userInfo from "./userInfo";
import VueDraggable from 'vuedraggable';
import draggable from 'vuedraggable';

//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
Vue.component(Badge.name, Badge);
//Vue.component(Popup.name, Popup);
Vue.use(VueBus);
// Vue.use(VueDND);
Vue.use(VueDraggable);

// Vue.use(VueQriously)

export default {
    name: 'queryResults',
    data() {
        return {
            wtf_model:false,
            alreadyChoiceWish:[],
            zhiYuanShu:"",//专业志愿填报页面选取志愿的个数
            allProf_list:[],//所有供选择的志愿
            canTouch:true,//控制确定按钮是否可操作
            parmas:{},//传过来的参数
            allProf_list:[],//所有供选择的志愿
            alreadyChoiceWish:[],//已选择的志愿
            profVol:null,//检测是否是已经填过志愿
            zhuanYFX:[],//专业方向志愿排序
            zhuanYFX_str:[],//专业方向志愿排序的显示结果（西美）
            zhuanYeMC_str:"",//所选专业名称（西美）
            cur_zhuanYeID:'',//当前操作考试的zhuanyeID（西美）
            noLimitVolNum:"",//系统参数4200
        }
    },
    mounted() {
        this.parmas=this.$route.query;
        this.zhiYuanShu=this.parmas.zhiYuanShu;
        this.profVol=this.parmas.profVol;
        this.noLimitVolNum=this.parmas.noLimitVolNum;
        var url="befexam,/api/m/auth/apply/query_profVol.htm";
        var data={
            "xueXiaoID":this.parmas.xueXiaoID,
            "kaoShiID":this.parmas.kaoShiID,
            "fuZhuanYe":this.parmas.zhuanYeID
        }
        Indicator.open();
        ajaxMethod.doAjax(url,data,this.loadAllProf);
    },
    methods: {
        // 加载所有专业
        loadAllProf(data){
            Indicator.close();
            console.log(this.profVol)
            var that=this;
            this.allProf_list=data.datas.list;
            console.log(!!data.datas.volTips)
            if(!!data.datas.volTips){
                MessageBox({
                    title: '提示',
                    message: data.datas.volTips,
                    showCancelButton: false,
                    confirmButtonText:"知道了",
                    closeOnClickModal:false
                });
            }
            if(that.profVol){
                that.canTouch=false;
                that.profVol.forEach(function(v,i){
                    console.log(v)
                    that.alreadyChoiceWish.push({
                        zhuanYeMC:v.profName,
                        zhuanYeID:v.profId,
                        profDirList:v.profDir
                    })
                    that.allProf_list.forEach(function(v_1,i){
                        if(v.profName == v_1.zhuanYeMC){
                            that.allProf_list.splice(i,1)
                        }
                    })
                })
                console.log(that.alreadyChoiceWish)
            }else{
                that.allProf_list=data.datas.list;
            }
        },
        choiceProf_double(allParmers){
            console.log(allParmers)
            console.log(allParmers.allProf.zhuanYeID);
            var that=this;
            this.cur_zhuanYeID=allParmers.allProf.zhuanYeID
            this.zhuanYeMC_str=allParmers.allProf.zhuanYeMC;
            this.zhuanYFX=[];
            this.zhuanYFX_str=[];
            // if(allProf.profDirList){
            //     var that=this;
            //     var lists=allProf.profDirList.split("|");
            //     lists.forEach(function(value,index){
            //         that.zhuanYFX.push(value)
            //     })
            //     this.wtf_model=true;
            // }
            if(this.alreadyChoiceWish.length>=0){
                this.canTouch=false;
            }
            if(this.alreadyChoiceWish.length<this.zhiYuanShu){
                this.alreadyChoiceWish.push(this.allProf_list[allParmers.idx]);
                this.allProf_list.splice(allParmers.idx,1);
            }else{
                Toast({
                    message: "只能填报"+this.zhiYuanShu+"个志愿",
                    position: 'middle',
                    duration: 500
                });
                return;
            }
            // 西美专业排序
            if(allParmers.allProf.profDirList){
                var lists=allParmers.allProf.profDirList.split("|");
                lists.forEach(function(value,index){
                    that.zhuanYFX.push(value)
                })
                this.wtf_model=true;
            }
        },
        // 西美志愿排序的确认按钮
        sort_ZY_E(){
            var that=this;
            that.wtf_model=false;
            this.alreadyChoiceWish.forEach(function(value,index){
                if(value.zhuanYeID==that.cur_zhuanYeID){
                    value.profDirList=that.zhuanYFX.join("|");
                }
            })
        },
        reduce_prof(allParmers){
            console.log(allParmers);
            this.allProf_list.push(this.alreadyChoiceWish[allParmers.idx]);
            this.alreadyChoiceWish.splice(allParmers.idx,1);
            if(this.alreadyChoiceWish.length==0){
                this.canTouch=true;
            }
        },
    	prof_operate(){
    		this.$router.go(-1);
    	},
        // 确定按钮操作
        sure_btn_click(){
            var that=this;
            var url="befexam,/api/m/auth/apply/save_prof_vol.htm";
            if(!this.noLimitVolNum){
                if(this.alreadyChoiceWish.length<this.zhiYuanShu){
                    Toast({
                        message: "您尚有志愿未选择",
                        position: 'middle',
                        duration: 500
                    });
                    return;
                }
            }
            var list=[];
            this.alreadyChoiceWish.forEach(function(v,i){
                list.push({
                    profOrder:(i+1).toString(),
                    profName:v.zhuanYeMC,
                    profId:v.zhuanYeID,
                    profDir:v.profDirList
                })
            })
            var data={
                "baoKaoID":this.parmas.baoKaoID , //学校ID[不可空]
                "volList":list //志愿列表[不可空]
            }
            // 确定成功后隐藏志愿选择页面
            Indicator.open('加载中...');
            ajaxMethod.doAjax(url,data,function(data){
                Indicator.close();
                if(data.success){
                    that.$router.go(-1)
                }else{
                    Toast({
                        message: data.message,
                        position: 'middle',
                        duration: 500
                    });
                }
            })
        },
    },
    components: {
    	userInfo,
        draggable
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
.prof-selected-prof{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1900;}
.prof-sort-body{position:fixed;top:.7rem;background:#fff;bottom:0;left:0;width:100%;z-index:1000;overflow: auto;}
.prof-list-text{background: #EEEEEE;font-size: .25rem;padding: .2rem;}
.prof-btn-sure{background: #42CEFC;color:#fff;border:none;font-size:.3rem;display:block;width:100%;height:100%;border-radius:.1rem;}
.btn_gray{background: #DDDDDD}
.prof_data{font-size:.3rem;overflow: auto;padding-bottom: 1rem;height: 100%;box-sizing: border-box;}
.display_flex{display:flex;align-items: center;border-bottom:1px solid #ddd;padding: .25rem 0 .25rem .4rem;position:relative;}
.mint-badge.is-size-small{padding:0;font-size:.2rem;width:.3rem;height:.3rem;line-height: .3rem;text-align: center;border-radius: 50%;background:#26a2ff;}
.display_flex .mint-badge{margin-right:.1rem;}
.clocse{position:absolute;right:.15rem;top:50%;transform: translate(0,-50%);padding:.1rem .15rem;font-size:.35rem;}
.v-modal{z-index:10003;}
.mint-msgbox-wrapper{z-index:10002!important;}
.mint-prop-wrap{width:80%;border-radius: 4px;background: #eee;}
.mint-prop-wrap .drag-tit{font-size:.25rem;background: #EEEEEE;padding:.15rem;}
.mint-prop-wrap .drag-btm{font-size:.3rem;background: #EEEEEE;padding:.15rem;text-align: center;}
.mint-prop-wrap .drag-body{font-size:.3rem;background: #fff;}
</style>
