<template>
    <div class="room-all">
        <mt-header fixed title="考试日程">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <pulldown>
            <div class="room-all-del" ref='pullDown' slot='content'>
                <div v-if="showFlag">
                    <ul class="room-list">
                        <li class="room-list-detail" v-for="item in sch_list">
                            <h3 class="sch-title f-fixed">
                            <span class="lf xuexiao">{{item.xueXiaoMC}}</span>
                            <span class="rf color-ddd" v-if="item.examStatus==null">
                                未知
                            </span>
                            <span class="rf color-ddd" v-else-if="item.examStatus==1">
                                未开始
                            </span>                  
                            <span class="rf" v-else-if="item.examStatus==2">
                                进行中
                            </span>
                            <span class="rf color-ddd" v-else-if="item.examStatus==3">
                                已结束
                            </span>
                            <span class="rf color-ddd" v-else>
                                未知
                            </span>
                        </h3>
                            <div class="room-detail">
                            <!-- <a href="javascript:void(0);" @click="chatQQ()">咨询客服</a>   -->
                                <div class="sch-logo">
                                    <img v-bind:src="item.logo" alt="">
                                </div>
                                <ul class="sub-list">
                                    <li>
                                        <span>考试专业：</span><i>{{item.zhuanYeMC}}</i>
                                    </li>
                                    <li>
                                        <span>考试时间：</span><i>{{item.kaoShiRQStr}}</i>
                                    </li>
                                    <li>
                                        <span>考点：</span><i>{{item.kaoDianDZ}}</i>
                                    </li>
                                </ul>
                            </div>
                            <div class="room-btn f-fixed">
                                <span class="lf notice" v-if="item.examStatus==1">考试未开始，请注意考试时间</span>
                                <span class="rf" @click="goMap(item)">
                                <img src="../../../static/img/sch-plane.png" alt="">
                                到这去
                            </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p class="no-result">暂无数据</p>
                </div>
            </div>
        </pulldown>
        <Loading v-show="!LoadingFlag"></Loading>
    </div>
</template>
<script>
import Vue from 'vue';
//import {
//    Header,
//    Button,
//    MessageBox
//} from 'mint-ui';
import { MessageBox } from 'mint-ui';
import Loading from "../public/Loading";
import pulldown from "../public/loadmore";
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
export default {
    name: 'examSchedule',
    data() {
        return {
            LoadingFlag: false,
            showFlag: true,
            sch_list: ''
        }
    },
    mounted() {
        var url = "befexam,/api/m/auth/apply/list_prof_calender.htm";
        var dat = {};
        ajaxMethod.doAjax(url, dat, this.loadData);
        this.$bus.on("pulldown",this.fixData);
    },
    methods: {
        // chatQQ(){
        //     window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=2022768897&version=1&src_type=web&web_src=oicqzone.com";  
        // },
        fixData(){
            var f_url = "befexam,/api/m/auth/apply/list_prof_calender.htm";
            var dat_ = {};
            ajaxMethod.doAjax(f_url, dat_, this.loadData);
        },
        loadData(data) {
            this.sch_list = data.datas.list;
            if(data.success){
                this.showFlag = data.datas.list.length>0;
            }else{
                this.showFlag = data.success;
            }
            this.LoadingFlag = true
        },
        goMap(data) {
            console.log(data)
                // 跳转第3方地图应用并导航
                // 经度 data.longitude
                // 纬度 data.latitude
                // 地址 data.kaoDianDZ
                // yksapp.app.goMapWithLatLng(String addr,String latlng);
            console.log(data.kaoDianDZ + ',经度：' + data.longitude + ",纬度：" + data.latitude);
            // 调用手机地图
            yksapp.goMapWithLatLng(data.kaoDianDZ, data.latitude + "," + data.longitude);
            // yksapp.goMapWithLatLng(data.kaoDianDZ);
            // yksapp.goMapWithLatLng(data.longitude+","+data.latitude);
        }
    },
    components: {
        Loading,
        pulldown
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

.room-all {
    text-align: left;
}

.room-all .room-all-del {
    background: #fff;
    /*padding-top: 0.8rem;*/
    background: #f4f4f4;
}

.room-all .room-all-del .room-list {
    background: #FAFAFA;
    padding: 0 0.2rem;
    font-size: 0.25rem;
}

.room-all .room-all-del .room-list>li {
    margin-bottom: 0.2rem;
    background: #fff;
    padding: 0 0.3rem;
    border-radius: 3px;
}

.room-list .room-list-detail .sch-title {
    border-bottom: 1px solid #ddd;
    margin: 0 -0.25rem;
    padding: .25rem;
}

.room-list .room-list-detail .sch-title span {
    color: #2EAAE6;
}

.room-list .room-list-detail .sch-title .color-ddd {
    color: #ddd;
}

.room-list .room-list-detail .sch-title .xuexiao {
    color: #2c3e50;
}

.room-list .room-list-detail .room-detail {
    display: flex;
    align-items: center;
    padding-top: 0.33333333333rem;
}

.room-list .room-list-detail .room-btn {
    padding-bottom: 0.3333333333333333rem;
    margin-top:.2rem;
}

.room-list .room-list-detail .room-btn span {
    color: #7FA6C4;
    font-size: 0.25rem;
}

.room-list .room-list-detail .room-btn span img {
    height: .4rem;
    vertical-align: middle;
    margin-top:-.07rem;
}

.room-list .room-list-detail .room-btn .notice {
    padding: 0;
    color: #E0A14D;
    font-size:.23rem;
}

.room-list .room-list-detail .room-detail .sub-list {
    margin-left: 0.45rem;
}

.room-list .room-list-detail .room-detail .sub-list .color-red {
    color: #f00;
}

.room-list .room-list-detail .room-detail .sub-list li {
    margin-bottom: 0.15rem;
}

.room-list .room-list-detail .room-detail .sub-list li i {
    font-style: normal;
}

.room-list .room-list-detail .room-detail .sub-list .prof-list {
    display: flex;
}

.room-list .room-list-detail .room-detail .sub-list .prof-list .prof-del {
    color: #A9A9A9;
}

.room-list .room-list-detail .room-detail .sub-list li .sub-li>i {
    display: block;
}

.room-list .room-list-detail .sch-logo img {
    max-width: 1.2rem;
    max-height: 1.2rem;
}

.no-result {
    font-size: .3rem;
    padding: .2rem;
    text-align: center;
}
</style>
