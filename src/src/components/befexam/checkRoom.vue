<template>
    <div class="room-all">
        <mt-header fixed title="考场查询">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <pulldown>
            <div class="room-all-del" ref='pullDown' slot='content'>
                <div v-if="showFlag">
                    <ul class="room-list">
                        <li class="room-list-detail" v-for="item in roomList">
                            <h3 class="sch-title">{{item.xueXiaoMC}}</h3>
                            <div class="room-detail">
                                <div class="sch-logo">
                                    <img v-bind:src="item.logo" alt="">
                                </div>
                                <ul class="sub-list">
                                    <li>
                                        <span>考试：</span><i>{{item.kaoShiMC}}</i>
                                    </li>
                                    <li>
                                        <span>考试专业：</span><i>{{item.zhuanYeMC}}</i>
                                    </li>
                                    <li class="prof-list" v-if="item.profVolStr">
                                        <!-- <div class="sub-li"> -->
                                        <div>志愿专业：</div>
                                        <div v-html="item.profVolStr" class="prof-del"></div>
                                        <!-- </div> -->
                                    </li>
                                    <li>
                                        <span>考点：</span><i>{{item.kaoDianMC}}</i>
                                    </li>
                                    <li>
                                        <span>考试日期：</span><i>{{item.kaoShiRQStr}}</i>
                                    </li>
                                    <li class="color-red">
                                        <span>报名费：</span><i>￥{{item.baoMingFei}}</i>
                                    </li>
                                </ul>
                            </div>
                            <div class="room-btn f-fixed">
                                <span class="rf" @click="checkRoom(item)">查询考场</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p class="no-result">暂无数据</p>
                </div>
            </div>
        </pulldown>
        <Loading v-show="!loadingFlag"></Loading>
    </div>
</template>
<script>
import Vue from 'vue';
//import {
//    Header,
//    Button,
//    MessageBox
//} from 'mint-ui';
	import {MessageBox} from 'mint-ui';
import Loading from "../public/Loading";
import pulldown from "../public/loadmore";
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
export default {
    name: 'hello',
    data() {
        return {
            loadingFlag: false,
            roomList: [],
            showFlag: true
                // kaoshiId:'',
                // zhunkaoZH:''
        }
    },
    mounted() {
        var url = "befexam,/api/m/auth/apply/query_prof.htm";
        var dat = {
            baoKaoBZList: [3]
        };
        ajaxMethod.doAjax(url, dat, this.loadData);
        //刷新数据
        this.$bus.on("pulldown", this.fixData);
    },
    methods: {
        // 下拉刷新数据
        fixData(){
            var f_url = "befexam,/api/m/auth/apply/query_prof.htm";
            var dat_ = {
                baoKaoBZList: [3]
            };
            ajaxMethod.doAjax(f_url, dat_, this.loadData);
        },
        loadData(data) {
            this.roomList = data.datas.list;
            if(data.success){
                this.showFlag = data.datas.list.length>0;
            }else{
                this.showFlag = data.success;
            }
            this.loadingFlag = true;
        },
        // 考场查询按钮判断处理
        checkRoom(data) {
            var rUrl = 'befexam,/api/m/auth/apply/queryApplyRoomInfo.htm';
            var dataa = {
                kaoShiID: data.kaoShiID,
                zhunKaoZH: data.zhunKaoZH
            };

            function alertBox(dat) {
                if (dat.datas.obj) {
                    MessageBox('考场信息', dat.datas.obj.kaoChangMC);
                } else {
                    MessageBox('提示信息', '该专业暂时无法查询考场信息');
                }
            }
            if (data.kaoShiID == null || data.zhunKaoZH == null) {
                MessageBox('提示信息', '该专业暂时无法查询考场信息');
            } else {
                ajaxMethod.doAjax(rUrl, dataa, alertBox);
            }
        }
    },
    components: {
        Loading,
        pulldown
    }
}
</script>
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
    padding-top: 0.1rem;
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
    padding: 0 0.4rem;
    border-radius: 3px;
}

.room-list .room-list-detail .sch-title {
    border-bottom: 1px solid #ddd;
    margin: 0 -0.25rem;
    padding: .25rem;
}

.room-list .room-list-detail .room-detail {
    display: flex;
    align-items: center;
    padding-top: 0.33333333333rem;
}

.room-list .room-list-detail .room-btn {
    padding-bottom: 0.3333333333333333rem;
}

.room-list .room-list-detail .room-btn span {
    background: #41CEF9;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 0.1rem;
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
