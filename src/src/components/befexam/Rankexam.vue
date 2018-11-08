<template>
    <div class="cet46">
        <mt-header fixed title="等级考试交费">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <pulldown>
            <div ref='pullDown' slot='content'>
                <div class="outter">
                    <div class="level">
                        <h1 class="level-title">等级考试报名</h1>
                        <input type="text" class="ipt" v-model="checkValue" @click="popShow" readonly v-bind:d-value="baomingVulue">
                        <mt-button type="primary" size="large" @click="baoming">我要报名</mt-button>
                    </div>
                    <div class="charge">
                        <h1 class="level-title">报名收费</h1>
                        <h1 class="btn-c">
					<span v-tap="{methods:showContr}" class="choice-bg" v-bind:class="{active:billsControl }">     支付订单
                    </span>
					<span v-tap="{methods:showContr}" v-bind:class="{active:!billsControl }">
                        已关闭订单
                    </span>
				</h1>
                        <div class="billsA">
                            <div v-if="billList.length>0" v-for="item in billList" class="bill-all">
                                <div class="bill-list" v-if="item.orderStatus!=3" v-show="billsControl">
                                    <ul class="info-list">
                                        <li>
                                            <span>院校名称：</span>{{item.schoolName}}
                                        </li>
                                        <li>
                                            <span>考生姓名：</span>{{item.stuName}}
                                        </li>
                                        <li>
                                            <span>身份证号：</span>{{item.idcardNo}}
                                        </li>
                                        <li>
                                            <span>报考信息：</span>{{item.itemFeeName}}
                                        </li>
                                        <li>
                                            <span>金额：</span>￥{{item.yingFuJE}}
                                        </li>
                                        <li>
                                            <span>状态：</span>
                                            <mt-button v-if="item.orderStatus==1" type="primary" size="small" @click="goToPay(item.orderId)">
                                                支付
                                            </mt-button>
                                            <span class="color-green" v-else-if="item.orderStatus==2" type="primary" size="small">
										支付成功
									</span>
                                            <span class="color-red" v-else-if="item.orderStatus==3" type="danger" size="small">
										关闭
									</span>
                                        </li>
                                    </ul>
                                </div>
                                <div v-else class="showContr bill-list" v-show="!billsControl">
                                    <ul class="info-list">
                                        <li>
                                            <span>院校名称：</span>{{item.schoolName}}
                                        </li>
                                        <li>
                                            <span>考生姓名：</span>{{item.stuName}}
                                        </li>
                                        <li>
                                            <span>身份证号：</span>{{item.idcardNo}}
                                        </li>
                                        <li>
                                            <span>报考信息：</span>{{item.itemFeeName}}
                                        </li>
                                        <li>
                                            <span>金额：</span>￥{{item.yingFuJE}}
                                        </li>
                                        <li>
                                            <span>状态：</span>
                                            <mt-button v-if="item.orderStatus==1" @click="goToPay(item.orderId)" type="primary" size="small">
                                                支付
                                            </mt-button>
                                            <span calss="color-green" v-else-if="item.orderStatus==2" type="primary" size="small">
										支付成功
									</span>
                                            <span class="color-red" v-else-if="item.orderStatus==3" type="danger" size="small">
										关闭
									</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>
                                暂无订单信息
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </pulldown>
        <div class="prop">
            <mt-popup v-model="popupMajor" 
                        position="bottom" 
                        class="mint-pop-popupMajor" 
                        pop-transition='popup-fade' 
                        :closeOnClickModal="true" 
                        :showToolbar='true'>
                <mt-picker :slots="chooseMajor" 
                            valueKey="i" @change="MajorValuesChange" 
                            :showToolbar='true'>
                    <span class="mint-datetime-action mint-datetime-cancel" v-tap="{methods:cancal}">
                        取消
                    </span>
                    <span class="mint-datetime-action mint-datetime-confirm" v-tap="{methods:makesure}">     
                        确定
                    </span>
                </mt-picker>
            </mt-popup>
        </div>
        <Loading v-show="!loadingFlag"></Loading>
    </div>
</template>
<script>
import Vue from 'vue';
//import {
//    Picker,
//    Popup,
//    Button,
//    Toast,
//    MessageBox,
//    Header
//} from 'mint-ui';
import {Toast,MessageBox} from 'mint-ui';
import Loading from "../public/Loading";
import pulldown from "../public/loadmore";
//Vue.component(Picker.name, Picker);
//Vue.component(Popup.name, Popup);
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);

export default {
    name: 'Rankexam',
    data() {
        return {
            loadingFlag: false,
            billsControl: true,
            billsControl_1: false,
            userInfo: {},
            billList: [],
            baomingVulue: "",
            checkValue: '',
            allData: [{
                i: "请选择",
                val: 0
            }],
            popupMajor: false,
            chooseMajor: [{
                // flex: 1,

                values: [{
                    i: "请选择",
                    val: 0
                }],
                className: 'slot1',
                textAlign: 'center'
            }]
        }
    },
    mounted() {
        var url = "befexam,/api/m/auth/pets/petsPayH5Data.htm";
        var data = {};
        ajaxMethod.doAjax(url, data, this.loadData);
        window.paySussess=function(par){
            if(par=="true"){
                window.location.reload();
            }
        }
    },
    methods: {
        cancal(){
            this.popupMajor=false;
        },
        makesure(){
            this.popupMajor=false;
        },
        loadData(data) {
            this.billList = data.datas.billList;
            this.userInfo = data.datas.user;
            this.loadingFlag = true;
            for (var sd in data.datas.billItemList) {
                this.chooseMajor[0].values.push({
                    i: data.datas.billItemList[sd].itemFeeName,
                    val: data.datas.billItemList[sd].ifId
                });
            }
        },
        showContr(q) {
            this.billsControl = !this.billsControl
        },
        zhuanyeConfirm() {
            this.popupMajor = false;
        },
        popShow() {
            if (this.chooseMajor[0].values.length > 1) {
                this.popupMajor = true;
            } else {
                this.popupMajor = false;
                Toast('暂无报考信息');
            }
        },
        MajorValuesChange(picker, values) {
            this.checkValue = values[0].i;
            this.baomingVulue = values[0].val;
        },
        zhuanyeCancle() {
            this.checkValue = "请选择"
            this.popupMajor = false;
        },
        goToPay(orderId) {
            var url = window.location.href;
            // yksapp_user.reqOrderCallback(orderId, url);
            yksapp_user.reqOrderCallback(orderId.param,'paySussess');
        },
        baoming() {
            var url = "befexam,/api/m/auth/pets/addPetsOrder.htm";
            var ifId = $(".ipt").attr('d-value');
            var data = {
                ifId: ifId
            };

            function addPetsOrder(datas) {
                if (datas.success) {
                    window.location.reload(true)
                } else {
                    console.log(datas.message)
                    Toast(datas.message)
                }
            };

            function completeFun(data) {

            }
            var mess = "<div style='text-align:left'>" 
                    + "<span style='display:block;'>姓名：" 
                    + this.userInfo.yongHuMing 
                    + "</span>" 
                    + "<span style='display:block;'>报考："
                    + this.checkValue 
                    + "</span>" 
                    + "<span style='display:block;'>报考交费后不可修改！</span>" 
                    + "</div>";
            if (ifId == 0) {
                Toast("请选择一门等级考试！")
            } else {
                MessageBox({
                    message: mess,
                    title: '信息确认',
                    showCancelButton: true
                }).then(action => {
                    console.log(action)
                    if (action == "confirm") {
                        ajaxMethod.doAjax(url, data, addPetsOrder, completeFun);
                    }
                });
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
body {
    background: #ddd;
}

.cet46 .outter {
    text-align: left;
    padding: 0.1rem 0.2rem 0;
    background: #fff;
}

.cet46 .outter .charge {
    margin-top: 0.4rem;
}

.cet46 .outter .level .ipt {
    width: 100%;
    font-size: .25rem;
    padding: .15rem;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin-bottom: 0.2rem;
    border-radius: 4px;
    margin-top: .25rem;
}

.cet46 .outter .level {
    margin-top: .5rem;
}

.cet46 .outter .level-title {
    font-size: .3rem;
    padding: 0.08rem;
    border-bottom: 1px solid #ddd;
}

.prop .mint-popup-bottom {
    width: 100%;
}

.cet46 .outter .charge .billsA {
    background: #F9F9F9;
    margin: 0 -0.2rem;
    padding: 0 0.2rem 0.2rem;
}

.cet46 .outter .charge .bill-all {}

.cet46 .outter .charge .btn-c {
    font-size: .26rem;
    margin-top: 0.3rem;
    height: .7rem;
    border-bottom: 1px solid #ddd;
}

.cet46 .outter .charge .btn-c span {
    display: inline-block;
    height: 100%;
    line-height: .8rem;
    padding: 0 .1rem;
}

.cet46 .outter .charge .btn-c .active {
    background: #26a2ff;
    color: #fff;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
}

.cet46 .outter .charge .bill-list {
    font-size: .25rem;
}

.cet46 .outter .charge .bill-list .info-list {
    background: #fff;
    margin-bottom: .2rem;
    padding: 0.2rem;
}
.cet46 .outter .charge .bill-list .info-list li{
	margin-bottom:0.1rem;
}
.cet46 .outter .charge .bill-list .color-red {
    color: #f00;
}

.cet46 .outter .charge .bill-list .color-green {
    color: #0dc10d;
}
</style>
