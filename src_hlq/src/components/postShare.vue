<template>
    <div class='share'>

  <span class=' share-dl-app-bg'>
      <div class='share-inner f-fixed'>
           <img src="../../static/images/writingsShare/share-L.png" alt="" class='share-l'>
            <img src="../../static/images/writingsShare/share-pic.png" alt="" class='share-r'>
      </div>
  </span>
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
                    <a   @click="isInstallApp">
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
                        <div v-if="postDO.attachmentJSON.split(';').length>1 && 
                        postDO.attachmentJSON.split(';')[1]!=''" class="all-pic">
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
                            <a  @click="isInstallApp" class="load-more">加载更多评论<i>></i></a>
                        </div>
                    </div>
                    <div v-else>
                        <div class="load-btn">
                            <span   @click="isInstallApp" class="load-more">下载APP参与评论<i>></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="share-content" :class="{padding_s:padd_contrl}">
            <p class="nothing">暂无信息</p>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'app',
  data () {
    return {
      postDO:{},
      picLen:'',
      postReviewList:[],
      userExtendInfo:{},
      showFlag:false,
      isShowAd:true,
      padd_contrl:false,
      isappinstalled:''
    }
  },

computed:{
    briefintro:function(){
        let desc;
        if(String(this.postDO.content).length>25){
            desc = this.postDO.content.substr(0,25)+"...";
        }else{  
            desc= this.postDO.content;
        }
        return desc;
    },

    content:function(){
       // utils.addImagePrint()


    }
  },
  mounted(){
    document.title='帖子分享';
    var that=this;
    var loac=window.location.search;
    var searchStr=loac.split("=")[1];
    var pID;
     if(this.$route.query.isappinstalled){
        this.isappinstalled=this.$route.query.isappinstalled;
    }
    // 微信内置浏览器的URL上回增加参数
    if(loac.indexOf("&")>0){
        pID=searchStr.substr(0,searchStr.indexOf('&'));
    }else{
        pID=loac.split("=")[1];
    }
    var newPID=this.$route.query.postId;
    var rUrl="hulaquan,/api/m/groups/post/shareDetail.htm"
    var rdata={postID:newPID};
    console.log('sfsdf');
    console.log(rdata);
    ajaxMethod.doAjax(rUrl,rdata,this.dataParse);
  },
  methods:{
    showAll(btn){
        btn.target.style.display="none";
        this.showFlag=true;
    },
    dataParse(datas){
        console.log(datas);
        this.postDO=datas.datas.postDO;
        this.postReviewList=datas.datas.postDO.postReviewList;
        this.userExtendInfo=datas.datas.postDO.userExtendInfo;
        this.weixinshare();
        if(true){

        }
    },
    close_ad(){
        this.isShowAd=!this.isShowAd;
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
        // 是否下载APP
    isInstallApp(){
        if(this.isappinstalled==1){
            alert("已经安装")
        }else{
            MessageBox({
                title: '提示',
                message: '您还未下载艺考升客户端，是否下载？',
                showCancelButton: true
            }).then(action=>{
                console.log(action)
                if(action=='confirm'){
                    window.location.href="https://m.artstudent.cn/";
                }
            });
        }
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
         weixinshareConfig(signatureMap,title,desc,imgUrl){

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:signatureMap.appId, // 必填，公众号的唯一标识
            timestamp: signatureMap.timestamp, // 必填，生成签名的时间戳
            nonceStr: signatureMap.nonceStr, // 必填，生成签名的随机串
            signature: signatureMap.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
         });


          wx.checkJsApi({
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                  // 以键值对的形式返回，可用的api值true，不可用为false
                  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                //  alert(JSON.stringify(res));
              }
          });

          let _this = this;
          wx.ready(function (){
                  //imgUrl对应的分享图标目前只支持32k以下图片，而且不支持png图片
                  // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                  wx.onMenuShareTimeline({
                      title:title, // 分享标题
                      desc:desc, // 分享描述
                      link: window.location.href,
                      imgUrl: imgUrl, // 分享图标
                      trigger: function (res) {
                         //alert("点击分享：" +JSON.stringify(res));
                       },
                      success: function () { 
                       // console.log("分享成功");
                       // 用户确认分享后执行的回调函数
                        //alert("朋友圈 回调成功"); 
                      },
                      cancel: function () { 
                       // 用户取消分享后执行的回调函数
                        //  alert("朋友圈 取消回调");
                     },
                     fail:function(res){
                      // alert('分享失败');
                      // alert(JSON.stringify(res));
                    }

                  });

            //       // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                  wx.onMenuShareAppMessage({
                      title:title, // 分享标题
                      desc:desc, // 分享描述
                      link: window.location.href,
                      imgUrl:imgUrl, // 分享图标
                      type:'link',
                      trigger: function (res) {
                        //  alert("点击分享ShareAppMessage：" +JSON.stringify(res));
                         // console.log(JSON.stringify(res));
                      },
                      success: function () { 
                       // 用户确认分享后执行的回调函数
                       //  alert("ShareApp 回调成功"); 
                       //  console.log("ShareApp 回调成功" );
                      },
                      cancel: function ( ) { 
                          // 用户取消分享后执行的回调函数
                         //  alert("ShareApp 取消回调");
                         //  console.log("ShareApp 取消回调");
                             
                      },
                      fail:function(res){
                      //  console.log(JSON.stringify(res));
                       //alert('分享失败');
                      // alert(JSON.stringify(res));
                    }

                  });

                
                   wx.error(function(res){
                     // console.log(res);
                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                     // alert('配置失败');
                     // console.log(JSON.stringify(res));
                     // alert(JSON.stringify(res));
                    });
            });
          },

         weixinshare(){

                let url="hulaquan,/api/m/base/share/v3/shareSign.htm";
                let p = {"url": location.href.split('#')[0]};
                let _this = this;
                 ajaxMethod.doAjax(url,p,function(data){
                    
                  let imgUrl = window.ajaxMethod.getHlqUrl()+'/static/images/writingsShare/share-logo.png';
                  _this.weixinshareConfig(data.datas.signatureMap,_this.postDO.title,_this.briefintro, imgUrl);

                 });
        },

  }
}
</script>

<style scoped>
 .comment-text img{
    display: block;
    margin: 0 auto;
    max-width: 100%!important;
    width: auto!important;
    height: auto!important;
  }

.share-l{
  width: 32%;
  float: left;
  height: .8rem;
  margin-left: 0.17rem;
}
.share-r{
  width: 35%;
  float: right;
  height: .8rem;
  margin-right: 0.2rem;
}
.share .share-dl-app-bg{position: fixed;top: 0;left: 0;width: 100%;box-sizing: border-box;right: 0;height:1.2rem;background:#fff;padding:0.1rem 0 0.1rem;z-index:100;}

.share-dl-app-bg .share-inner{padding-top: 0.1rem;}

    .share .share-dl-app{position: fixed;top: 0;left: 0;width: 100%;box-sizing: border-box;right: 0;height:1.2rem;background:#9A9A9A;padding:0 .1rem 0 0.1rem;z-index:100;}
    .share .share-dl-app .share-logo{height:.8rem;}
    .share .share-dl-app .share-inner{padding-top:0.2rem;}
    .share .share-dl-app .share-inner .text-del{color:#fff;margin-left:0.2rem;}
    .share .share-dl-app .share-inner .text-del .logo{font-size:0.3rem;}
    .share .share-dl-app .share-inner .text-del .open{font-size:0.2rem;margin-top:0.1rem;}
    .share .share-dl-app .share-inner .open-btn{padding-top:0.2rem;margin-left:0.3rem;}
    .share .share-dl-app .share-inner .open-btn .open-now{display:inline-block;line-height:0.6rem;height:0.6rem;width:1.4rem;text-align:center;border-radius:4px;color:#fff;font-size:0.2rem;background:#31C2F6;}
    .share .share-dl-app .share-inner .close-btn{padding-top:0.28rem;margin-left: 0.3rem;}
    .share .share-dl-app .share-inner .close-btn .share-close{display:block;width:0.4rem;height:0.4rem;line-height:0.4rem;color:#fff;background:#D8D8D8;border-radius:50%;font-size: 0.2rem;text-align:center;}

    .share .share-content{padding:1.4rem .1rem;}
    .share .padding_s{padding-top: 0;transition: padding 300ms cubic-bezier(.09,1.44,.91,1.45) }
    .share .share-content .nothing{text-align:center;font-size:0.3rem;background: #F9F9F8;margin: -.2rem -.1rem 0;padding: .2rem 0;}
    .share .share-content .share-title{font-size:0.35rem;font-weight:700;}
    .share .share-content .auth-info{height: 1rem;margin-top:0.29333333333333333rem;line-height:0.68rem;font-size:0.25rem;}
    .share .share-content .auth-info>span{line-height:1rem;font-size: .25rem; }
    .share .share-content .auth-info .head-img{width:1rem;height:1rem;border-radius:50%;}
    .share .share-content .auth-info .autn-name{color:#454545;margin:0 0.2rem;}
    .share .share-content .auth-info .share-date,.share .share-content .auth-info .share-time{color:#818181;}
    .share .share-content .auth-info .share-time{margin-left:0.2rem;}

    .share .share-content .text-pic img{max-width:100%;display:block;margin:0 auto 0.2rem;}
    .share .share-content .text-pic .img-list :nth(){}
    .share .share-content .text-pic .s-text{font-size:0.3rem;margin:0.3rem 0;}
    .share .share-content .text-pic .all-pic .look-all{color:#64D1F8;display: block;text-align: center;font-size:.25rem;}
    .share .share-content .text-pic .all-pic .look-all i{color:#64D1F8;font-style:normal;margin-left:0.06666666666666667rem;}


    .share .comment{padding:0 0.2rem;margin-bottom:0.5rem;}
    .share .comment .comment-del{background:#F5F5F5;margin:0 -0.2rem;border:1px solid #EDEDED;}
    .share .comment .comment-info{margin-top:0.1rem;}
    /*.share .comment .comment-info .common-lists{margin-bottom:0.72rem;}*/
    .share .comment .comment-info .level-one{border-bottom:1px solid #ddd;margin-bottom:0;padding: .15rem 0;}
    .share .comment .comment-info .sub-lists{margin-top: 0.14666666666666667rem;padding-left: 1.2666666666666666rem;}
    .share .comment .comment-info .name-date{margin-left:0.13333333333333333rem;}
    .share .comment .comment-info .name-date .user-name{font-size:0.25rem;color:#010101;margin-bottom:0.2rem;}
    .share .comment .comment-info .name-date .s-date-2{font-size:0.25rem;color:#9B9B9B;}
    .share .comment .comment-info .crown-pic{margin-left:0.2rem;}
    .share .comment .comment-info .crown-pic .crown{width:0.45rem;height:0.45rem;}
    .share .comment .comment-info .comment-text{word-break: break-all;color:#4D4D4D;font-size:.3rem;margin:0.2rem 0 0;}
    .share .comment .comment-info .voice{background: #31c2f6;border-radius: 0.1rem;height: .7rem;line-height: .7rem;position:relative;}
    .share .comment .comment-info .voice .icon-v{position:absolute;width:0.3rem;height:0.35rem;top: 50%;left: 0.1rem;transform: translate(0,-50%);-webkit-transform: translate(0,-50%);background:url(../../static/images/writingsShare/voice.png);background-repeat: no-repeat;background-size:100% 100%; }
    .share .comment .comment-info .voice-block{padding:0 1rem 0 1.2666666666666666rem;position:relative;}
    .share .comment .comment-info .voice-block .second{position: absolute;right: -.55rem;top: 50%;transform: translate(0,-50%);width:.5rem;}
    .share .comment .comment-info .voice-block .length-bar{position:relative;max-width:100%!important;}
    .share .comment .comment-info .voice-block .left-icon{position: absolute;top: 50%;left: -0.25rem;transform: translate(0,-50%);-webkit-transform: translate(0,-50%);border: 0.15rem solid transparent;border-right: 0.15rem solid #31c2f6;}
    .share .comment .comment-info .load-btn .load-more{height:.8rem;text-align:center;line-height:.8rem;background:#31C2F6;display:block;width:100%;font-size:0.25rem;color:#fff;border-radius:5px;}
    .share .comment .comment-info .load-btn .load-more i{font-style:normal;margin-left:0.06666666666666667rem;}
    .share .comment .comment-info .comm-pic{position:relative;}
    .share .comment .comment-info .comment-h{width:1rem;height:1rem;border-radius:50%;}
    .share .comment .comment-info .iv-vip{width:0.4rem;height:0.4rem;position:absolute;bottom:0;right:0;}
    .share .comment .comment-t{padding:0 0.2rem;height:0.6rem;line-height:0.6rem;font-size:0.25rem;color:#A5A5A5;}
    .comm-pic img{width: 1.2666666666666666rem;height: 1.2666666666666666rem;border-radius: 50%;}
</style>
