<template>
    <div class='share'>
        <!-- 提示下载APP -->
        <span class='share-dl-app' v-if="isShowAd">
            <div class='share-inner f-fixed'>
                <div class="lf">
                    <img src="../../static/images/writingsShare/share-logo.png" alt="" class='share-logo'>
                </div>
                <div class="lf text-del">
                    <p class="logo">艺考升</p>
                    <p class="open">打开艺考升客户端查看详情</p>
                </div>
                <div class="rf close-btn">
                    <span class="share-close" @click="close_ad">X</span>
                </div>
                <div class="rf open-btn">
                    <a href="https://m.artstudent.cn/">
                        <span class="open-now">立即打开</span>
                    </a>
                </div>
            </div>
        </span>
        <!-- 帖子内容详情 -->
        <div v-if="postDO">
            <div class='share-content' :class="{padding_s:padd_contrl}">
                <h1 class="share-title">{{postDO.title}}</h1>
                <p class="auth-info f-fixed">
                    <img v-if="userExtendInfo.logo" v-bind:src='userExtendInfo.logo' alt="" class="head-img lf">
                    <img v-else src="../../static/images/writingsShare/share-logo.png" alt="" class="head-img lf">

                    <span class="lf autn-name">{{userExtendInfo.nickName}}</span>
                    <!-- <span class="lf share-date">昨天</span> -->
                    <span class="lf share-time">{{postDO.timestampStr}}</span>
                </p>
                <div class="text-pic">
                    <p class="s-text">
                        {{postDO.content}}
                    </p>
                    <!-- 图片显示判断 -->
                    <div v-if="postDO.attachmentJSON" class="img-list">
                        <div v-for='(items,key,index) in postDO.attachmentJSON.split(";")'>
                            <!-- 图片最多显示两张 -->
                            <div v-if="key<=1">
                                <img  v-bind:src="items" alt="">
                            </div>
                            <!-- 图片超过两张的默认隐藏 -->
                            <div v-else>
                                <div v-show="showFlag">
                                    <img v-show ="key > 1" v-bind:src="items" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 显示全部图片控制按钮 -->
                    <div v-if='postDO.attachmentJSON'>
                        <div v-if="postDO.attachmentJSON.split(';').length>1" class="all-pic">
                            <span @click="showAll($event)" class="look-all">
                                查看全部{{postDO.attachmentJSON.split(';').length}}张图片
                                <i>></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="comment">
                <div class="comment-del">
                    <h1 class="comment-t">评论（{{postDO.replayNum}}）</h1>
                </div>
                <div class="comment-info">
                    <div v-for="item in postReviewList" class="common-lists level-one">
                        <div class="f-fixed">

                            <!-- 是否加V及头像显示 -->
                            <div v-if="item.userExtendInfo.isIdentify" class="lf">
                                <div>
                                    <div class="comm-pic" v-if="item.userExtendInfo.logo">
                                        <img  v-bind:src="item.userExtendInfo.logo" alt="" class="comment-h">
                                        <img src="../../static/images/writingsShare/ic_vip.png" alt="" class="iv-vip">
                                    </div>
                                    <div class="comm-pic" v-else>
                                        <img src="../../static/images/writingsShare/share-logo.png" alt="" class="comment-h">
                                        <img src="../../static/images/writingsShare/ic_vip.png" alt="" class="iv-vip">
                                    </div>
                                </div>
                             </div>
                            <div v-else>
                                 <div class="lf">
                                    <div class="comm-pic" v-if="item.userExtendInfo.logo">
                                        <img  v-bind:src="item.userExtendInfo.logo" alt="" class="comment-h">
                                    </div>
                                    <div class="comm-pic" v-else>
                                        <img src="../../static/images/writingsShare/share-logo.png" alt="" class="comment-h">
                                    </div>
                                </div>
                            </div>

                            <div class="lf name-date">
                                <p class="user-name">{{item.userExtendInfo.nickName}}</p>
                                <span class="s-date-2">{{item.createdOnStr.split(" ")[1]}}</span>
                            </div>

                            <!-- 显示皇冠及显示几级皇冠 -->
                            <div v-if="item.userExtendInfo.isIdentify" class="lf">
                                <div v-if="item.userExtendInfo.userGrade==1">
                                    <div class="crown-pic">
                                        <img src="../../static/images/writingsShare/v1.png" alt="" class="crown">
                                    </div>
                                </div>
                                <div v-else-if="item.userExtendInfo.userGrade==2">
                                    <div class="crown-pic">
                                        <img src="../../static/images/writingsShare/v2.png" alt="" class="crown">
                                    </div>
                                </div>
                                <div v-else-if="item.userExtendInfo.userGrade==3">
                                    <div class="crown-pic">
                                        <img src="../../static/images/writingsShare/v3.png" alt="" class="crown">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 评论内容 -->
                        <div>
                            <div v-if="item.reviewType==1" class="voice-block">
                                <p class="comment-text">
                                    {{item.content}}
                                </p>
                            </div>
                            <div v-else class="voice-block">
                                <div class="length-bar" v-bind:style="{width:width_control(item.radioDuration)}">
                                    <i class="left-icon"></i>
                                    <p class="comment-text voice">
                                        <span class="icon-v"></span>
                                    </p>
                                    <span class="second">{{item.radioDuration}}''</span>
                                </div>
                            </div>
                        </div>
                        <!-- 二级评论 -->
                        <div v-if="item.reviewList" class="common-lists sub-lists">
                            <div v-for="subItem in item.reviewList">
                                <!-- 二级评论的头像及加V -->
                                <div v-if="subItem.userExtendInfo.isIdentify" class="lf">
                                    <div>
                                        <div class="comm-pic" v-if="subItem.userExtendInfo.logo">
                                            <img  v-bind:src="subItem.userExtendInfo.logo" alt="" class="comment-h">
                                            <img src="../../static/images/writingsShare/ic_vip.png" alt="" class="iv-vip">
                                        </div>
                                        <div class="comm-pic" v-else>
                                            <img src="../../static/images/writingsShare/share-logo.png" alt="" class="comment-h">
                                            <img src="../../static/images/writingsShare/ic_vip.png" alt="" class="iv-vip">
                                        </div>
                                    </div>
                                 </div>
                                <div v-else>
                                     <div class="lf">
                                        <div class="comm-pic" v-if="subItem.userExtendInfo.logo">
                                            <img  v-bind:src="subItem.userExtendInfo.logo" alt="" class="comment-h">
                                        </div>
                                        <div class="comm-pic" v-else>
                                            <img src="../../static/images/writingsShare/share-logo.png" alt="" class="comment-h">
                                        </div>
                                    </div>
                                </div>
                                <!-- 二级评论的姓名及时间 -->
                                <div class="f-fixed">
                                    <div class="lf name-date">
                                        <p class="user-name">{{subItem.reviewerName}}</p>
                                        <span class="s-date-2">{{subItem.createdOnStr.split(" ")[1]}}</span>
                                    </div>
                                </div>
                                <!-- 二级评论内容 -->
                                <div>
                                    <!-- 1是文本 -->
                                    <div v-if="subItem.reviewType==1" class="voice-block">
                                        <p class="comment-text">
                                            {{subItem.content}}
                                        </p>
                                    </div>
                                    <!-- 显示图片 -->
                                    <div v-else class="voice-block">
                                        <i class="left-icon"></i>
                                        <p class="comment-text voice">
                                            <span class="icon-v"></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="postReviewList.length!=0">
                        <div class="load-btn">
                            <a href="https://m.artstudent.cn/" class="load-more">加载更多评论<i>></i></a>
                        </div>
                    </div>
                    <div v-else>
                        <div class="load-btn">
                            <span href="https://m.artstudent.cn/" class="load-more">下载APP参与评论<i>></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="share-content">
            <p class="nothing">暂无信息</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      postDO:{},
      postReviewList:[],
      userExtendInfo:{},
      showFlag:false,
      isShowAd:true,
      padd_contrl:false
    }
  },
  mounted(){
    var that=this;
    var loac=window.location.search;
    var searchStr=loac.split("=")[1];
    var pID;

    // 微信内置浏览器的URL上回增加参数
    if(loac.indexOf("&")>0){
        pID=searchStr.substr(0,searchStr.indexOf('&'));
    }else{
        pID=loac.split("=")[1];
    }
    // var pID=subSearch;
    // console.log(window.location.search)
    // ajaxMethod.doAjax("hulaquan,","")
    var rUrl="hulaquan,/api/m/groups/post/shareDetail.htm"
    var rdata={postID:60};
    // function asdd(dat){
    //     that.postDO=dat.datas.postDO;
    //     that.postReviewList=dat.datas.postDO.postReviewList;
    //     console.log(that.postReviewList)
    //     that.userExtendInfo=dat.datas.postDO.userExtendInfo;
    //     console.log(that.userExtendInfo)
    // };
    ajaxMethod.doAjax(rUrl,rdata,that.dataParse);
    // $.ajax({
    //     url:"http://hulaquan.51bm.net.cn/api/m/groups/post/shareDetail.htm",
    //     type:"POST",
    //     dataType:"json",
    //     data:{postID:240},
    //     success:function(datas){
    //         // that.msg=datas
    //         that.postDO=datas.datas.postDO;
    //         that.postReviewList=datas.datas.postDO.postReviewList;
    //         console.log(that.postReviewList)
    //         that.userExtendInfo=datas.datas.postDO.userExtendInfo;
    //         console.log(that.userExtendInfo)
    //     }
    // });
    // that.asd();
  },
  methods:{
    showAll(btn){
        btn.target.style.display="none";
        this.showFlag=true;
    },
    dataParse(datas){
        this.postDO=datas.datas.postDO;
        this.postReviewList=datas.datas.postDO.postReviewList;
        this.userExtendInfo=datas.datas.postDO.userExtendInfo;
    },
    close_ad(){
        this.isShowAd=!this.isShowAd;
        this.padd_contrl=true;
    },
    width_control(widthVal){
        // return widthVal+"%";
        var wid;
        if(Number(widthVal)<15){
            wid='15%';
        }else if(Number(widthVal)>=100){
            wid='100%';
        }else{
            wid=widthVal+"%";
        }
        return wid;
    },
    // dl_App(){
    //     var iphoneSchema = 'yks://';
    //     var iphoneDownUrl = 'https://itunes.apple.com/us/app/id1042896458?l=zh&ls=1&mt=8';
    //     var androidSchema = 'yks://';
    //     var androidDownUrl = 'http://img.artstudent.cn/app/Baoming.apk';
    //     var yybUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.artstudent.app';
    //     var u = navigator.userAgent; 
    //     if(isWeixin()){//微信浏览器
    //         if (u.match(/(iPhone|iPod|iPad);?/i)) {
    //             //$(".dl-mask").show();
    //             var loadDateTime = new Date();
    //             window.setTimeout(function() {
    //                 var timeOutDateTime = new Date();
    //                 if (timeOutDateTime - loadDateTime < 5000) {
    //                     window.location = yybUrl;//ios下载地址
    //                 } else {
    //                     window.close();
    //                 }
    //             },25);
    //         }else{
    //             window.location=yybUrl;
    //         }
    //     }else{//非微信浏览器
    //         //$(".dl-mask").hide();
    //         if (u.match(/(iPhone|iPod|iPad);?/i)) {
    //             var loadDateTime = new Date();
    //             window.setTimeout(function() {
    //                 var timeOutDateTime = new Date();
    //                 if (timeOutDateTime - loadDateTime < 5000) {
    //                     window.location = iphoneDownUrl;//ios下载地址
    //                 } else {
    //                     window.close();
    //                 }
    //             },25);
    //             window.location = iphoneSchema;
    //         }else if (u.match(/android/i)) {
    //             try {
    //                 window.setTimeout(function(){
    //                     window.location=yybUrl; //android下载地址
    //                 },5000);
    //                 window.location = androidSchema;
    //             } catch(e) {}
    //         }
    //     }
    //     function isWeixin(){ //判断是否是微信
    //         if (u.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // }
  }
}
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /*text-align: center;*/
      color: #2c3e50;
    }
    html{font-size:30px;}

    @charset "UTF-8";

    /*---Reset---*/
    body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td,menu{margin:0; padding:0;}
    body,textarea,input,button,select,keygen,legend{font:14px "Microsoft YaHei",tahoma,arial,\5b8b\4f53; color:#303645; outline:0;}
    h1,h2,h3,h4,h5,h6,small{font-size:100%; font-weight:normal;}
    code,kbd,pre,samp,tt{font-family:"courier new",monospace,serif;}
    address,caption,cite,code,dfn,em,strong,th,var{font-style:normal; font-weight:normal;}
    address,cite,dfn,em,var{font-style:normal;}
    header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
    table{border-collapse:collapse; border-spacing:0;}
    caption,th{text-align:left;}
    legend{color:#000;}
    fieldset,img,iframe,abbr,acronym{border:0;}
    button,input,select,textarea{font-size:100%;}
    textarea{overflow:auto; resize:none;}
    input[type="text"], input[type="password"]{text-indent:5px; *text-indent:0 !important;}
    ol,ul{list-style:none;}
    q::before,q::after{content:'';}
    a{color:#388af8; text-decoration:none;}
    del,ins,u,s,a,a:hover{text-decoration:none;}
    a,button{cursor:pointer;}
    sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}
    sup{top:-0.5em}
    sub{bottom:-0.25em}
    .lf{float:left;}
    .rf{float:right;}
    .f-fixed:after{content:'\200b';display:block;height:0;clear:both;}

    .share .share-dl-app{position: fixed;top: 0;left: 0;width: 100%;box-sizing: border-box;right: 0;height:1.7333333333333334rem;background:#9A9A9A;padding:0 0.26666666666666666rem 0 0.38666666666666666rem;z-index:100;}
    .share .share-dl-app .share-logo{height:1.16rem;}
    .share .share-dl-app .share-inner{padding-top:0.24rem;}
    .share .share-dl-app .share-inner .text-del{color:#fff;margin-left:0.3466666666666667rem;}
    .share .share-dl-app .share-inner .text-del .logo{font-size:0.4266666666666667rem;}
    .share .share-dl-app .share-inner .text-del .open{font-size:0.3333333333333333rem;margin-top:0.2rem;}
    .share .share-dl-app .share-inner .open-btn{padding-top:0.2rem;margin-left:0.7333333333333333rem;}
    .share .share-dl-app .share-inner .open-btn .open-now{display:inline-block;line-height:0.8rem;height:0.8rem;width:2.0533333333333332rem;text-align:center;border-radius:4px;color:#fff;font-size:0.37333333333333335rem;background:#31C2F6;}
    .share .share-dl-app .share-inner .close-btn{padding-top:0.3333333333333333rem;margin-left: 0.3333333333333333rem;}
    .share .share-dl-app .share-inner .close-btn .share-close{display:block;width:0.5333333333333333rem;height:0.5333333333333333rem;line-height:0.5333333333333333rem;color:#fff;background:#D8D8D8;border-radius:50%;font-size: 0.30666666666666664rem;text-align:center;}

    .share .share-content{padding:2.2266666666666666rem 0.49333333333333335rem 0.49333333333333335rem;}
    .share .padding_s{padding-top: 0.4933333333333332rem;transition: padding 300ms cubic-bezier(.09,1.44,.91,1.45) }
    .share .share-content .nothing{text-align:center;font-size:0.4666666666666667rem}
    .share .share-content .share-title{font-size:0.6rem;font-weight:700;}
    .share .share-content .auth-info{height: 1.2666666666666666rem;margin-top:0.29333333333333333rem;line-height:0.68rem;font-size:0.4rem;}
    .share .share-content .auth-info>span{line-height:1.2666666666666666rem;font-size: .4666666666666667rem; }
    .share .share-content .auth-info .head-img{width:1.2666666666666666rem;height:1.2666666666666666rem;border-radius:50%;}
    .share .share-content .auth-info .autn-name{color:#454545;margin:0 0.5333333333333333rem 0 0.29333333333333333rem;}
    .share .share-content .auth-info .share-date,.share .share-content .auth-info .share-time{color:#818181;}
    .share .share-content .auth-info .share-time{margin-left:0.24rem;}

    .share .share-content .text-pic img{max-width:100%;display:block;margin:0 auto 0.7066666666666667rem;}
    .share .share-content .text-pic .img-list :nth(){}
    .share .share-content .text-pic .s-text{font-size:0.55rem;margin:0.3333333333333333rem 0;}
    .share .share-content .text-pic .all-pic .look-all{color:#64D1F8;display: block;text-align: center;font-size:.4666666666666667rem;}
    .share .share-content .text-pic .all-pic .look-all i{color:#64D1F8;font-style:normal;margin-left:0.06666666666666667rem;}


    .share .comment{padding:0 0.49333333333333335rem;margin-bottom:0.8rem;}
    .share .comment .comment-del{background:#F5F5F5;margin:0 -0.49333333333333335rem;border:1px solid #EDEDED;}
    .share .comment .comment-info{margin-top:0.3333333333333333rem;}
    /*.share .comment .comment-info .common-lists{margin-bottom:0.72rem;}*/
    .share .comment .comment-info .level-one{border-bottom:1px solid #ddd;margin-bottom:0;padding: .42rem 0;}
    .share .comment .comment-info .sub-lists{margin-top: 0.14666666666666667rem;padding-left: 1.2666666666666666rem;}
    .share .comment .comment-info .name-date{margin-left:0.13333333333333333rem;}
    .share .comment .comment-info .name-date .user-name{font-size:0.4666666666666667rem;color:#010101;margin-bottom:0.2rem;}
    .share .comment .comment-info .name-date .s-date-2{font-size:0.3333333333333333rem;color:#9B9B9B;}
    .share .comment .comment-info .crown-pic{margin-left:0.2rem;}
    .share .comment .comment-info .crown-pic .crown{width:0.7733333333333333rem;height:0.7733333333333333rem;}
    .share .comment .comment-info .comment-text{word-break: break-all;color:#4D4D4D;font-size:0.4666666666666667rem;margin:0.2rem 0 0;}
    .share .comment .comment-info .voice{background: #31c2f6;border-radius: 0.2rem;height: 1.1369863013698631rem;line-height: 1.1369863013698631rem;position:relative;}
    .share .comment .comment-info .voice .icon-v{position:absolute;width:0.36rem;height:0.49333333333333335rem;top: 50%;left: 0.3rem;transform: translate(0,-50%);-webkit-transform: translate(0,-50%);background:url(../../static/images/writingsShare/voice.png);background-repeat: no-repeat;background-size:100% 100%; }
    .share .comment .comment-info .voice-block{padding:0 1rem 0 1.2666666666666666rem;position:relative;}
    .share .comment .comment-info .voice-block .second{position: absolute;right: -1rem;top: 50%;transform: translate(0,-50%);width:1rem;}
    .share .comment .comment-info .voice-block .length-bar{position:relative;max-width:100%!important;}
    .share .comment .comment-info .voice-block .left-icon{position: absolute;top: 50%;left: -0.35rem;transform: translate(0,-50%);-webkit-transform: translate(0,-50%);border: 0.2rem solid transparent;border-right: 0.2rem solid #31c2f6;}
    .share .comment .comment-info .load-btn .load-more{height:1.04rem;text-align:center;line-height:1.04rem;background:#31C2F6;display:block;width:100%;font-size:0.4rem;color:#fff;border-radius:5px;}
    .share .comment .comment-info .load-btn .load-more i{font-style:normal;margin-left:0.06666666666666667rem;}
    .share .comment .comment-info .comm-pic{position:relative;}
    .share .comment .comment-info .comment-h{width:1.2666666666666666rem;height:1.2666666666666666rem;border-radius:50%;}
    .share .comment .comment-info .iv-vip{width:0.6rem;height:0.6rem;position:absolute;bottom:0;right:0;}
    .share .comment .comment-t{padding:0 0.49333333333333335rem;height:0.8666666666666667rem;line-height:0.8666666666666667rem;font-size:0.4666666666666667rem;color:#A5A5A5;}
    .comm-pic img{width: 1.2666666666666666rem;height: 1.2666666666666666rem;border-radius: 50%;}
</style>
