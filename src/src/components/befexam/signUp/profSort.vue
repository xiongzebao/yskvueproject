<template>
    <div class="selected-prof">
        <mt-header fixed title="专业志愿排序">
            <mt-button icon="back" slot="left" @click="hideSo"></mt-button>
            <mt-button  slot="right" v-tap="{methods:completeq}">完成</mt-button>
        </mt-header>
        <div class="sort-body">
        <p style="color:#FF0707;background:#FFDFD7;font-size:.2rem;margin:-.2rem -.2rem 0;padding:.1rem;">提示：长按拖动对专业志愿进行排序（浙江传媒）</p>
			<div class="div">
                <!-- <ul class="back-prof-list sort-data">
                    <li v-for="(sort_val,idx) in sort_data" :class="{'check-list':sort_val.checkState}"
                        v-dragging="{ item: sort_val, list: sort_data, group: 'asd' }"
                        :key="sort_val.kaoDianMC"
                    >
                        <div>
                            <div>
                                <span>
                                    <mt-badge size="small">
                                        {{Number(idx)+1}}
                                    </mt-badge>
                                    {{sort_val.kaoDianMC}} <span style="color:#f00"></span>
                                </span><br>
                                <span class="dateStr">
                                    {{sort_val.zhuanYeMC}}{{sort_val.kaoShiRQStr}}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul> -->
                <draggable :list="sort_data">
                    <!-- <div class="back-prof-list sort-data"> -->
                        <div class="back-prof-list sort-data" v-for="(sort_val,idx) in sort_data" :class="{'check-list':sort_val.checkState}">
                            <div class="draging-css">
                                <div>
                                    <span>
                                        <mt-badge size="small">
                                            {{Number(idx)+1}}
                                        </mt-badge>
                                    </span>
                                    {{sort_val.kaoDianMC}} <span style="color:#f00"></span>
                                    </span><br>
                                    <span class="dateStr">
                                        {{sort_val.zhuanYeMC}}{{sort_val.kaoShiRQStr}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    <!-- </div> -->
                </draggable>
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
//    Button,Badge,Indicator
//} from 'mint-ui';
import {Badge,Indicator} from 'mint-ui';
import VueBus from 'vue-bus';
import userInfo from "./userInfo";
import VueDND from 'awe-dnd';
import VueDraggable from 'vuedraggable'
import draggable from 'vuedraggable'
//
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
Vue.component(Badge.name, Badge);
Vue.use(VueDND);
Vue.use(VueBus);
Vue.use(VueDraggable);
// Vue.use(VueQriously)

export default {
    name: 'profSort',
    data() {
        return {
            parmasw:{},
            sort_data:[],//浙传的排序数据

        }
    },
    mounted(){
        var that=this;
        this.sort_data=this.$route.query.alrea;
    },
    methods: {
        // 完成排序
        completeq(){
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
            Indicator.open('加载中...');
            ajaxMethod.doAjax(url,datas,function(data){
                Indicator.close();
                if(data.success){
                    that.$router.go(-1);
                    // debugger;
                }else{
                    Toast({
                        message:data.message,
                        position:"middle",
                        duration: 500
                    })

                }
            });
        },
        hideSo(){
            this.$router.go(-1)
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
.sort-body{position:fixed;top:0.7rem;left:0;bottom:0;right:0;background: #fff;z-index:2000;overflow: auto;padding:.2rem .2rem 0;}
.sort-data{font-size:.3rem;}
.sort-data li{border-bottom:1px solid #ddd;padding:.1rem 0;}
.sort-data .dragging{background: #f4f4f4;}
.mint-badge.is-size-small{padding:0;font-size:.2rem;width:.3rem;height:.3rem;line-height: .3rem;text-align: center;border-radius: 50%;background:#42CEFC;}
.dateStr{padding-left:.35rem;}
.draging-css{border-bottom:1px solid #ddd;padding:.2rem 0;}
</style>
