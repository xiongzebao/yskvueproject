<template>
    <div class="query-R">
        <mt-header fixed title="成绩查询">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!-- 勋章墙 -->
        <div v-show="showFlag">
            <div class="media-wall" v-if="medal_cuss" style="position:fixed;top:.8rem;left:0;right:0">
                <router-link :to="{path:'/medal/'+userId}">
                    <div class="media-bg">
                        <div class="inner">
                            <ul class='f-fixed list-sch'>
                                <li v-for="medalList in medal_list" class="medal-list">
                                    <div class="wrap-logo">
                                        <img v-bind:src="medalList.schoolLogo" alt="" class="sch-logo">
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <span class="line"></span>
                        <i class="get-more">点击查看详情</i>
                    </div>
                </router-link>
            </div>
        </div>
        <pulldown>
            <div ref='pullDown' slot='content'>
                <div v-show="showFlag" class="show-top">
                    
                    <!-- 成绩显示 -->
                    <div v-if="checkS">
                        <div class="score-list" v-if="sch_list.length>0">
                            <p class="f-fixed stu-info">
                                <span class="lf">姓名：<i class="color-blue">{{loca_user_name}}</i></span>
                                <span class="rf">省份：<i class="color-blue">{{loca_provence}}</i></span>
                                <!-- <span class="lf">姓名：<i class="color-blue">张三丰</i></span>
                                <span class="rf">省份：<i class="color-blue">海南岛</i></span> -->
                            </p>
                            <ul v-for="item in sch_list" class="stu-score-list">
                                <li>
                                    <div class="f-fixed stu-header">
                                        <img v-bind:src="item.logo" alt="" class="sch-logo lf">
                                        <span class="font-b lf">{{item.xueXiaoMC}}</span>
                                    </div>
                                </li>
                                <li v-if="item.slist.length>0" class="padding-none border-none">
                                    <ul v-for="subItem in item.slist" class="sub-ul">
                                        <li class="border-none padding-none">
                                            <div class="scanpic" v-bind:qrcodeStr="subItem.encodeScoreStr"></div>
                                            <!-- <div class="scanpic">
                                                <qriously v-bind:value="subItem.encodeScoreStr" />
                                            </div> -->
                                        </li>
                                        <li>
                                            <!-- {{subItem.encodeScoreStr}} -->
                                        </li>
                                        <li>
                                            <span>专业：</span> {{subItem.zhuanYeMC}}
                                        </li>
                                        <li>
                                            <span>准考证号：</span> {{subItem.zhunKaoZH}}
                                        </li>
                                        <li class="sub-list">
                                            <div v-if="subItem.keMu1MC" class="score-del-list">
                                                <i class="icon"></i>
                                                <span class="kemu-mc">{{subItem.keMu1MC}}：</span>
                                                <span>
                                                    {{scoreFormat(subItem.keMu1)}}
                                                    <span v-if="subItem.keMu1SM">
                                                        ({{subItem.keMu1SM}})
                                                    </span>
                                                </span>
                                            </div>
                                            <div v-if="subItem.keMu2MC" class="score-del-list">
                                                <i class="icon"></i>
                                                <span class="kemu-mc">{{subItem.keMu2MC}}：</span>
                                                <span>
                                                    {{scoreFormat(subItem.keMu2)}}
                                                    <span v-if="subItem.keMu2SM">
                                                        ({{subItem.keMu2SM}})
                                                    </span>
                                                </span>
                                            </div>
                                            <div v-if="subItem.keMu3MC" class="score-del-list">
                                                <i class="icon"></i>
                                                <span class="kemu-mc">{{subItem.keMu3MC}}：</span>
                                                <span>
                                                    {{scoreFormat(subItem.keMu3)}}
                                                    <span v-if="subItem.keMu3SM">
                                                        ({{subItem.keMu3SM}})
                                                    </span>
                                                </span>
                                            </div>
                                            <div v-if="subItem.keMu4MC" class="score-del-list">
                                                <i class="icon"></i>
                                                <span class="kemu-mc">{{subItem.keMu4MC}}：</span>
                                                <span>
                                                    {{scoreFormat(subItem.keMu4)}}
                                                    <span v-if="subItem.keMu4SM">
                                                        ({{subItem.keMu4SM}})
                                                    </span>
                                                </span>
                                            </div>
                                        </li>
                                        <li class="beizhu">
                                            <div class="shadow">
                                                <span>总分：</span> {{totalScore(subItem.zhuanYeFen)}}
                                                <span v-if="subItem.heGeXian">合格线：{{totalScore(subItem.heGeXian)}}</span> 
                                            </div>
                                        </li>
                                        <li v-if="subItem.shengMingCi" class="mingci">
                                            <span>名次：</span>{{subItem.shengMingCi}}
                                            <span>同名次人数：</span>{{subItem.tongMingC}}
                                        </li>
                                        <li class="border-none" >
                                            <span class="shadow">结论：</span>
                                            <span class="color-orange shadow ifHegebiaozhi" v-if="subItem.heGeBZ==1">
                                                合格
                                            </span>
                                            <span class="color-orange shadow" v-if="subItem.heGeBZ==2">
                                                不合格
                                            </span>
                                            <span v-if="subItem.beiZhu" class="lorem">备注：{{subItem.beiZhu}}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else class="no-result">
                        暂无数据
                    </div>
                </div>
            </div>
        </pulldown>
        <div class="ad-show" v-show="showofhideAd" @click="goADpage(aDJson)"><!-- @click="jump(ad_aadress,'圆梦计划')" -->
            <!-- <a v-bind:href="ad_aadress"> -->
            <i class="ad-text" v-bind:style="{border:'1px solid #fff',padding:'0 0.05rem',borderRadius:'1px'}">广告</i>
            <img :src="adPic" alt="" class="adImg">
            <!-- </a> -->
            <span class="close" @click.stop="hideAd">X</span>
        </div>
        <Loading v-show="!loadingFlag"></Loading>
    </div>
</template>
<script>
import Vue from 'vue';
// import VueQriously from 'vue-qriously'
import {
    Header,
    Button
} from 'mint-ui';
import pulldown from "../public/loadmore";
import Loading from '../public/Loading'
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
// Vue.use(VueQriously)

export default {
    name: 'queryResults',
    data() {
        return {
            loadingFlag: false,
            userId: '',
            // 是否有成绩参数
            if_have: '',
            // 关闭广告参数
            showofhideAd: false,
            // 勋章墙列表
            medal_list: [],
            // 成绩先隐藏，广告显示完再显示
            showFlag: false,
            // 广告图片
            adPic: '',
            checkS: "",
            sch_list: [],
            // 广告显示时长
            showTime: '',
            // 勋章墙接口请求成功参数
            medal_cuss: '',
            // 广告地址
            ad_aadress: '',
            // 姓名：
            loca_user_name: '',
            // 省份：
            loca_provence: '',
            aDJson:{},
        }
    },
    mounted() {
        // 成绩接口地址
        var url = "aftexam,/api/m/auth/score/query.htm";
            this.loca_user_name=yksapp_user.getStdName();
            this.loca_provence=yksapp_user.getStdProvince();
        // 加载成绩参数
        var datas = {};

        // 首先加载成绩接口，
        // 在加载成绩接口的回掉里面处理广告和勋章墙
        ajaxMethod.doAjax(url, datas, this.loadScoreData, this.scoreComplete);
        
    },
    methods: {
        /*private Long advertiseId;//广告Id
        private String advertiseName;//广告名称
        private Integer openType;//跳转方式 1-网页打开 2-APP打开 3-APPH5打开
        private Integer openContent;//打开内容 1-资讯分类 2-资讯详情 3-圈子详情 4-院校微主页 5-问题详情 6-资讯详情视频 7-资讯详情图片，8-吃住行首页，9-吃住行套餐详情页面
        private String openUrl;//打开连接*/

        
        // 新版广告跳转
        goADpage(ew){
            // var adParams='{advertiseId:'+ew.advertiseId+',advertiseName:'+ew.advertiseName+',openType:'+ew.openType+',openContent:'+ew.openContent+',openUrl:'+ew.openUrl+'}';
            var adParams=`{
                            "advertiseId":"${ew.advertiseId}",
                            "advertiseName":"${ew.advertiseName}",
                            "openType":"${ew.openType}",
                            "openContent":"${ew.openContent}",
                            "openUrl":"${ew.openUrl}"
                        }`;
            yksapp.goPageWithParams("ADOnclick",adParams);
        },
        loadScoreData(data) {
            // 判断是否有成绩
            this.if_have = !!data.datas.list;
            console.log(this.if_have)
            if (!this.if_have) {
                this.showFlag = true;
                this.loadingFlag = true;
                return;
            }
            // alert("123")
            this.sch_list = data.datas.list;
            this.checkS = data.success;
            // 处理二维码生成问题
            var setInt=setInterval(function(){
                $(".scanpic").each(function(){
                    if(!!$(this).attr("qrcodeStr")){
                        $(this).qrcode($(this).attr("qrcodeStr"));
                    }
                    clearInterval(setInt);
                })
            },0.1)
        },
        // 首先加载成绩，有成绩再去加载广告和勋章墙
        scoreComplete() {
            var that=this;
            // 广告接口
            // var adUrl = "sys,/api/m/advertise/check_advertise.htm";
            var adUrl = "advert,/api/m/adv/advert/v3/check_advertise.htm";//新的广告接口地址
            // http://advert.artstudent.cn/api/m/adv/advert/v3/check_advertise.ws
            // 勋章墙接口
            var medalUrl = "hulaquan,/api/m/my/info/info/get.htm";
            // 勋章墙参数
            // alert(window.localObj.getUserId())   //1190891
            var medalP={userID:yksapp_user.getUserId()};
            // var medalP = {
            //     userID: 1190890
            //     // userID: 1150047
            // };
            // 广告参数
            var adP = {
                showPlace: 3
            };
            if (this.if_have) {
                this.loadingFlag = !this.loadingFlag;
                ajaxMethod.doAjax(adUrl, adP, this.loadAdData, function() {
                    ajaxMethod.doAjax(medalUrl, medalP, that.loadMedalData);
                }, "json", "GET");
                // ajaxMethod.doAjax(adUrl, adP, this.loadAdData);
            }
        },
        loadAdData(q) {
            var that = this;
            if(!!q.datas.obj2){
                this.aDJson=q.datas.obj2;
                this.showtime = q.datas.obj2.showTime;
                this.showofhideAd = q.success;
                this.ad_aadress = q.datas.obj2.openUrl;
                this.adPic = q.datas.obj2.advertiseUrl;
                
                // 成绩不合格不显示广告
                var isshowAD_hegeBZ=$(".ifHegebiaozhi");
                if(!(isshowAD_hegeBZ.length>0)){
                    this.showofhideAd=false;
                    that.showFlag = true;
                    return ;
                }
                if (this.showofhideAd) {
                    $('.adImg')[0].onload = function() {
                        setTimeout(function() {
                            $(".ad-show").remove();
                            that.showFlag = true;
                            // $(".scanpic").qrcode("http://www.helloweba.com");
                            that.showofhideAd = !that.showofhideAd
                                // 显示时间控制
                                // that.showtime
                        }, that.showtime * 1000);
                    }
                }
            }else{
                that.showFlag = true;
            }
        },
        loadMedalData(q) {
            // 没有勋章不显示勋章墙
            if (!q.datas.obj) {
                $("._v-container").removeClass("ctrmedal");
                $(".show-top").css("padding-top",".8rem");
                return;
            }else{
                $("._v-container").addClass("ctrmedal");
                $(".show-top").css("padding-top","0")
                this.medal_cuss = q.datas.obj.credentialsList;
                this.userId = q.datas.obj.desUserId;
            }
            if (q.datas.obj.credentialsList.length <= 6) {
                this.medal_list = q.datas.obj.credentialsList;
            } else {
                this.medal_list = q.datas.obj.credentialsList.slice(0, 6);
            }
        },
        hideAd() {
            this.showofhideAd = !this.showofhideAd;
            this.showFlag = true;
        },
        scoreFormat(value) {
            if (parseInt(value) == value) {
                value = value + ".0分";
            } else {
                value =parseFloat(value)+ "分";
            }
            return value;
        },
        totalScore(value_2) {
            if (parseInt(value_2) == value_2) {
                value_2 = value_2 + ".0";
            } else {
                // value_2 = value_2.toFixed(1);
            }
            return value_2;
        }
    },
    updated(){
        // 生成成绩二维码
        // var Str=$(".scanpic").attr('qrcodeStr');
        // console.log("asd"+Str)
        // $(".scanpic").qrcode(Str);
    },
    components: {
        Loading,
        pulldown
    },
    // 分数格式化
    // filters: {
        
    // }
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

.sub-ul {
    position: relative;
}

.sub-ul .scanpic {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    top: 3px;
    right: 0;
    overflow: hidden;
}

.sub-ul .scanpic canvas {
    width: 1.2rem!important;
    height: 1.2rem!important;
}

.show-top {
    /*padding-top: .8rem;*/
    padding-top: 0rem;
}

.score-list {
    font-size: 0.25rem;
    text-align: left;
}

.score-list .stu-info {
    font-size: 0.25rem;
    padding: .2rem;
    background: #fff;
    margin-bottom: 0.1rem;
}

.score-list .stu-score-list {
    margin-bottom: .2rem;
    font-size: 0.25rem;
    padding: .2rem .2rem 0;
    background: #fff url(../../../static/img/medal/ymjh-logo.png);
}

.score-list .stu-score-list li {
    border-bottom: 1px solid #ddd;
}
.lorem{margin-left:.35rem;}
.score-list .stu-score-list .stu-header {
    display: flex;
    align-items: center;
}

.score-list .stu-score-list .stu-header>span {
    margin-left: .15rem;
}

.score-list .stu-score-list .sch-logo {
    width: .7rem;
    vertical-align: middle;
}

.score-list .stu-score-list .font-b {
    font-weight: bold;
}

.score-list .stu-score-list .color-orange {
    color: #FCA70D;
}

.score-list .stu-score-list li {
    padding: .16rem 0;
}

.score-list .stu-score-list .sub-list {
    padding-left: .4rem;
    /*background: linear-gradient(to right, rgb(242, 242, 242), rgba(249, 249, 249, .3));*/
    background: radial-gradient(rgb(242, 242, 242) -24%, rgba(249, 249, 249, .3) 100%);
    padding:0;
}
.shadow{background: radial-gradient(rgb(242, 242, 242) -24%, rgba(249, 249, 249, .3) 100%);display:inline-block;
    margin:-0.16rem 0;
}
.score-list .stu-score-list .sub-list .score-del-list {
    padding:.1rem 0 .1rem .5rem;
    position: relative;
}

.score-list .stu-score-list .sub-list .score-del-list>i {
    position: absolute;
    top: 50%;
    left: 0.1rem;
    transform: translate(0, -50%);
    border: 4px solid #AAAAAA;
}

.score-list .stu-score-list .sub-list>div {
    /*margin: 0.1rem 0;*/
}

.score-list .stu-score-list .beizhu {
    font-weight: bold;
}

.score-list .stu-score-list .beizhu span:not(:first-child) {
    margin-left: .15rem;
}
.score-list .stu-score-list .mingci span:not(:first-child) {
    margin-left: .15rem;
}
.sub-ul:not(:last-child){
    border-bottom:1px solid #ddd;
}
.query-R .ad-show {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
}

.query-R .ad-show img {
    width: 100%;
    height: 1rem;
}

.query-R .ad-show .close {
    color: #fff;
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
    font-size: 0.2rem;
}

.query-R .ad-show .ad-text {
    color: #fff;
    position: absolute;
    left: 0.1rem;
    top: 0.1rem;
    font-size: 0.2rem;
    font-style: normal;
}

.color-blue {
    color: #58BEFA;
    font-style: normal;
}

.show-top .no-result {
    font-size: .3rem;
    text-align: center;
    padding: 1.1rem 0 .3rem;
    background:#fff;
}

.query-R .media-wall {
    padding: 0 .2rem;
    background: #F9F9F9;
}

.query-R .media-wall .media-bg {
    width: 100%;
    height: 2.5rem;
    background: url(../../../static/img/medal/ic_medal_bg_1.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.query-R .media-wall .media-bg .line {
    width: 80%;
    height: .1rem;
    background: url(../../../static/img/medal/ic_medal_line.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    position: absolute;
    bottom: .6rem;
    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
}

.query-R .media-wall .media-bg .get-more {
    font-style: normal;
    font-size: .3rem;
    color: #FF1010;
    bottom: 0.17rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
}

.query-R .media-wall .media-bg .inner {
    width: 100%;
    height: 1.7rem;
    position: absolute;
    bottom: 0.18rem;
}

.query-R .media-wall .media-bg .inner .list-sch {
    padding: .2rem .3rem;
    overflow: hidden;
}

.query-R .media-wall .media-bg .inner .medal-list {
    float: left;
    width: 16.66%;
    height: .9rem;
    background: url(../../../static/img/medal/ic_medal_default.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.score-list .stu-score-list .sub-list .kemu-mc {
    min-width: .7rem;
    display: inline-block;
}


/*.show-top .media-wall .media-bg .inner .medal-list .sch-logo{}*/

.query-R .media-wall .media-bg .inner .medal-list .wrap-logo {
    width: .3rem;
    height: .3rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: .2rem;
}

.query-R .media-wall .media-bg .inner .medal-list .wrap-logo .sch-logo {
    max-width: 100%;
    max-height: 100%;
    display: inline-flex;
}

.border-none {
    border: none!important;
}

.padding-none {
    padding: 0!important;
}
/*._v-container{
    top: 3.3rem;
    /* bottom: 0; 
     padding-top: 3.3rem; 
    height: calc(100% - 3.3rem)!important;
}*/
.ctrmedal{
    top: 3.3rem;
    /* bottom: 0; */
    /* padding-top: 3.3rem; */
    height: calc(100% - 3.3rem)!important;
}

</style>
