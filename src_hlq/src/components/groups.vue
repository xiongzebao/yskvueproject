<template>
    <div class='community-share'>


<!--   <span class=' share-dl-app-bg'>
      <div class='share-inner f-fixed'>
           <img src="../../static/images/writingsShare/share-L.png" alt="" class='share-l'>
            <img src="../../static/images/writingsShare/share-pic.png" alt="" class='share-r'>
      </div>
  </span> -->
        <!-- 提示下载APP -->
        <div class="dl-tip">
            <span v-if="isShowAd" class='share-dl-app'>
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
                    <div class="rf open-btn" @click="if_dl_app">
                        <!-- <a href="https://m.artstudent.cn/"> -->
                            <span class="open-now">立即打开</span>
                        <!-- </a> -->
                    </div>
                </div>
            </span>
            <span v-else class='share-dl-app close-dl'>
                <div class='share-inner f-fixed'>
                    <div class="lf">
                        <img src="../../static/images/writingsShare/share-logo.png" alt="" class='share-logo'>
                    </div>
                    <div class="lf text-del">
                        <p class="logo">艺考升</p>
                        <p class="open">Artstudent</p>
                    </div>
                    <div class="rf close-btn community">
                        <img class="share-pic" src="../../static/images/writingsShare/share-pic.png" alt="">
                    </div>
                </div>
            </span>
        </div>
        <div v-if="hasDatas">
            <div class="comm-content">
                <div class="bg-white">
                    <div class="f-fixed margin-top-50 describe">
                        <div class="lf icon-img">
                            <img :src="groupDO.iconURL" alt="" class="comm-img">
                        </div>
                        <div class="lf comm-tnt">
                            <div class="mrgin-top">
                                <span class="comm-tit">{{groupDO.groupName}}</span>
                                <p class="comm-des">
                                    <span class="followers">粉丝：{{groupDO.userNum}}</span>                        
                                    <span class="card">帖子：{{groupDO.postNum}}</span>                        
                                </p>
                            </div>
                            <div class="remark">
                                <!-- {{groupDO.remark}} -->
                                <span v-if="all_text">{{groupDO.remark}}</span>
                                <span v-else>{{text_operate(groupDO.remark)}}</span>
                                <p class="all-btn">
                                    <span v-if="moreBtn" class="see-all" @click="check_all(groupDO.remark)">
                                        查看全部
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="postList" v-for="item in postList" class="bg-wh user-list">
                    <div class="card-tit f-fixed">
                        <div class="lf user-logo">
                            <img v-if="item.userExtendInfo.logo" :src="item.userExtendInfo.logo" alt="">
                            <img v-else src="../../static/images/writingsShare/share-logo.png" alt="">
                            <div v-if="item.userExtendInfo.identifyFlag==1">
                                <img src="../../static/images/writingsShare/ic_vip.png" alt="" class="iv-vip">
                            </div>
                        </div>
                        <div class="lf userinfo-all">
                            <p class='userinfo-btm'>
                                <span class="createdUserName">
                                    {{item.createdUserName}}
                                </span> 
                                <span v-if="item.userExtendInfo.userFlag==2" class="teacher role">
                                    老师
                                </span>
                                <span v-else-if="item.userExtendInfo.userFlag==3" class="sister role">
                                    学姐
                                </span>
                                <span v-if="item.userExtendInfo.userFlag==4" class="fellow-student role">
                                    学长
                                </span>
                                <span v-if="item.userExtendInfo.userFlag==5" class="senior role">
                                    资深
                                </span>
                                <span class="school-name" v-if="item.userExtendInfo.schoolName">
                                    {{item.userExtendInfo.schoolName}}
                                </span>
                            </p>
                            <span class="quanzi-name">{{item.groupName}}</span>
                        </div>
                    </div>
                    <div class="card-del">
                        <p class="card-content">{{item.content}}</p>
                        <div v-if="item.attachmentJSON" class="card-imgs">
                            <div v-if="img_split(item.attachmentJSON).length==1" class="img-1 f-fixed">
                                <img v-for="img_src in img_split(item.attachmentJSON)" :src="img_src" alt="">
                            </div>
                            <div v-if="img_split(item.attachmentJSON).length==2" class="img-2 f-fixed">
                                <div v-for="img_src in img_split(item.attachmentJSON)" class="wrap-img">
                                    <img :src="img_src" alt="">
                                </div>
                            </div>
                            <div v-if="img_split(item.attachmentJSON).length>=3" class="img-3 f-fixed">
                                <div class="wrap-img" v-for="img_src in img_split(item.attachmentJSON)">
                                    <img :src="img_src" alt="">
                                </div>
                            </div>
                            <!-- {{img_split(item.attachmentJSON)}} -->
                        </div>
                        <div class="color-gray">
                            {{date_reversal(item.createdOn)}}
                        </div>
                        <div v-if="item.location" class="location-text color-gray">
                            <i class="iconfont icon-dingwei location-icon"></i>
                            {{item.location}}
                        </div>
                        <div class="scan-condition f-fixed color-gray">
                            <span>
                                <i class="iconfont icon-liulan"></i>
                                {{item.showBrowseNumCache}}
                            </span>
                            <span class="midd-bor">
                                <i class="iconfont icon-pinglun"></i>
                                {{item.replayNum}}
                            </span>
                            <span>
                                <i class="iconfont icon-dianzan"></i>
                                <em style="display:inline-block">{{item.praiseNum}}</em>
                            </span>
                        </div>
                    </div>
                </div>
            </div>  
            <div class="check-btn">
                <span @click="if_dl_app">
                    查看更多帖子>
                </span>
            </div>
        </div>
        <div v-else class="has-no-data">
            <p>暂无数据</p>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

export default {
  name: 'app',
  data () {
    return {
        isShowAd:true,
        // close_ad:true,
        groupDO:{},
        postList:[],
        moreBtn:false,
        all_text:false,
        isappinstalled:'',
        hasDatas:false,
    }
  },
   computed:{

    briefintro:function(){

        let desc;
     
        if(String(this.groupDO.remark).length>25){
            
            desc = this.groupDO.remark.substr(0,25)+"...";
        }else{
           
            desc= this.groupDO.remark;
        }
        return desc;

    }
   
  },
  mounted(){
    document.title='圈子分享';
    var url="hulaquan,/api/m/groups/v3/shareGroup.htm";
    // alert(url)
    var groupID=this.$route.query.groupID;
    var form;
    var isappinstalled;
  //  alert("this.$route.query.isappinstalled:"+this.$route.query.isappinstalled);
    if(this.$route.query.isappinstalled){
        this.isappinstalled=this.$route.query.isappinstalled;
    }
    if(this.$route.query.from){
        form=this.$route.query.from;
    }else{
        form=null;
    }
    var data={
        groupID:groupID,
        from:form
    };

    //console.log()
    ajaxMethod.doAjax(url,data,this.getCommunity);
   
  },
  methods:{
    // 获取数据
    getCommunity(data){
         console.log(data);
        if(data.datas.obj.group){
            this.groupDO=data.datas.obj.group;
            this.hasDatas=true;
             this.weixinshare();
        }
        if(data.datas.obj.postList.length>0){
            this.postList=data.datas.obj.postList;
        }
       
    },
    // 关闭最上面的提示下载框
    close_ad(){
        this.isShowAd=!this.isShowAd;
    },
    // 时间处理
    date_reversal(date){
        var dates=new Date(date)
        return dates.getFullYear()+"-"+(dates.getMonth()+1)+"-"+dates.getDate()
    },
    //字数多于20个后显示省略号
    text_operate(text){
        if(String(text).length>30){
            this.moreBtn=true;
            return text.substr(0,30)+"...";
        }else{
            return text;
        }
    },
    // 图片处理，接口返回字符串，此方法将字符串转为数组，便于循环
    img_split(imgs){
        return imgs.split(";")
    },
    // 查看全部
    check_all(){
        // alert(13)
        this.moreBtn=!this.moreBtn;
        this.all_text=!this.all_text;
    },
    // 是否下载APP
    if_dl_app(){
      //  alert("this.isappinstalled:"+this.isappinstalled);

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
                     //  alert('分享失败');
                      // alert(JSON.stringify(res));
                    }

                  });

                
                   wx.error(function(res){
                     // console.log(res);
                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                     // alert('配置失败');
                    //  console.log(JSON.stringify(res));
                     // alert(JSON.stringify(res));
                    });
            });
          },

         weixinshare(){
                let url="hulaquan,/api/m/base/share/v3/shareSign.htm";
              //  alert('url'+window.location.href.split('#')[0]);
                // alert(window.location.href);
                let p = {"url": location.href.split('#')[0]};
               //alert('url->'+p.url);
                let _this = this;
                 ajaxMethod.doAjax(url,p,function(data){
           
                  _this.weixinshareConfig(data.datas.signatureMap,_this.groupDO.groupName,_this.briefintro,_this.groupDO.iconURL);

                 });
               },


  }
}
</script>

<style  >

 .card-del img{
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


    .community-share{background:#F9F9F8;}
    .community-share .share-dl-app{position: fixed;top: 0;left: 0;width: 100%;box-sizing: border-box;right: 0;height:1.2rem;background:#9A9A9A;padding:0 .1rem 0 0.1rem;z-index:100;}
    .community-share .close-dl{background:#fff;border-bottom:1px solid #ddd;}
    .community-share .share-dl-app .share-logo{height:.8rem;}
    .community-share .share-dl-app .share-inner{padding-top:0.2rem;}
    .community-share .share-dl-app .share-inner .text-del{color:#fff;margin-left:0.2rem;}
    .community-share .close-dl .share-inner .text-del .logo{color:#35C2FA;font-size:.35rem;}
    .community-share .share-dl-app .share-inner .text-del .open{font-size:0.2rem;margin-top:0.1rem;}
    .community-share .close-dl .share-inner .text-del .open{color:#35C2FA;}
    .community-share .share-dl-app .share-inner .open-btn{padding-top:0.2rem;margin-left:0.3rem;}
    .community-share .share-dl-app .share-inner .open-btn .open-now{display:inline-block;line-height:0.6rem;height:0.6rem;width:1.4rem;text-align:center;border-radius:4px;color:#fff;font-size:0.2rem;background:#31C2F6;}
    .community-share .share-dl-app .share-inner .close-btn{padding-top:0.28rem;margin-left: 0.3rem;}
    .community-share .share-dl-app .share-inner .community{padding:0rem;}
    .community-share .share-dl-app .share-inner .close-btn .share-close{display:block;width:0.4rem;height:0.4rem;line-height:0.4rem;color:#fff;background:#D8D8D8;border-radius:50%;font-size: 0.2rem;text-align:center;}
    .community-share .comm-content{padding:1.2rem 0 0;background:#F9F9F9;}
    .community-share .comm-content .margin-top-50{padding:0.3rem .1rem .3rem .3rem;}
    .community-share .comm-content .bg-white{background:#fff;}
    .community-share .comm-content .icon-img .comm-img{width:1.1rem;height:1.1rem;border-radius:50%;}
    .community-share .comm-content .describe .comm-tnt{margin-left:.1rem;width: calc(100% - 1.2rem);}
    .community-share .comm-content .describe .comm-tnt .mrgin-top{margin:.15rem 0 .2rem;}
    .community-share .comm-content .describe .comm-tnt .comm-tit{font-size:.35rem;}
    .community-share .comm-content .describe .comm-tnt .comm-des{font-size:.25rem;}
    .community-share .comm-content .describe .comm-tnt .comm-des .card{margin-left:.15rem;}
    .community-share .comm-content .describe .comm-tnt .remark{font-size:.25rem;}
    .community-share .comm-content .describe .comm-tnt .remark .all-btn{text-align:right;}
    .community-share .comm-content .describe .comm-tnt .remark .all-btn .see-all{border:1px solid #68D3F8;color:#68D3F8;padding:.05rem .07rem;border-radius:.05rem;}
    .community-share .comm-content .bg-wh{background:#fff;}
    .community-share .comm-content .user-list{padding:0.3rem .1rem .2rem .3rem;margin-top:.25rem;}
    .community-share .comm-content .user-list .card-tit .user-logo{position:relative;}
    .community-share .comm-content .user-list .card-tit .school-name{display:inline-block;margin-left:.15rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width:2rem;color:#FFA03B;}
    .community-share .comm-content .user-list .card-tit .createdUserName{display:inline-block;max-width:2rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color:#345EC5;}
    .community-share .comm-content .card-tit .user-logo img{width:1rem;height:1rem;border-radius:50%;}
    .community-share .comm-content .card-tit .user-logo .iv-vip{position:absolute;width:.4rem;height:.4rem;bottom:0;right:0;}
    .community-share .comm-content .card-tit .userinfo-all{margin-left:.1rem;}
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm{margin-bottom:.2rem;}
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm quanzi-name{color:#A5A5A5;}
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm .role{color:#fff;padding:.02rem .05rem;border-radius: .06rem;overflow: hidden;font-size:.2rem;margin-left:.1rem;}
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm .teacher{display:inline-block;background:#f1f12f;}
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm .sister{display:inline-block;background:#FF948F;}
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm .fellow-student{display:inline-block;background:#02EFD6; }
    .community-share .comm-content .card-tit .userinfo-all .userinfo-btm .senior{display:inline-block;background:#98A5E4;}
    .community-share .comm-content .user-list .card-del .card-content{font-size:.3rem;padding:.15rem 0;color:#000;}
    .community-share .comm-content .user-list .card-del .card-imgs .img-1 img{width:60%;}
    .community-share .comm-content .user-list .card-del .card-imgs .img-2 img{width:50%;}
    /*.community-share .comm-content .user-list .card-del .card-imgs .img-3{height:2rem;overflow:hidden;}*/
    .community-share .comm-content .user-list .card-del .card-imgs .img-3 img{}
    .community-share .comm-content .user-list .card-del .card-imgs .img-2 .wrap-img{height:2rem;overflow: hidden;width:49%;vertical-align: top;margin:.1rem 0 .1rem .5%;float:left;display:flex;align-items: center;}
    .community-share .comm-content .user-list .card-del .card-imgs .img-3 .wrap-img{height:2rem;overflow: hidden;width:32%;vertical-align: top;margin:.1rem 0 .1rem 1.3%;float:left;display:flex;align-items: center;}
    .community-share .comm-content .user-list .card-del .card-imgs .img-3 .wrap-img img{max-width:100%;}
    .community-share .comm-content .user-list .card-del .location-icon{font-size:.35rem;}
    .community-share .comm-content .user-list .card-del .location-text{font-size:.18rem;margin-bottom:.1rem;color:#A5A5A5;}
    .community-share .comm-content .user-list .card-del .scan-condition>span{width:33.3%;text-align:center;display:inline-block;box-sizing: border-box;float:left;font-size:.3rem;}
    .community-share .comm-content .user-list .card-del .scan-condition>span .iconfont{font-size:.35rem;margin-right:.08rem;}
    .community-share .comm-content .user-list .card-del .scan-condition{margin:0 -.1rem 0 -.3rem;border-top:1px solid #ddd;padding-top:.2rem;}
    .community-share .comm-content .user-list .card-del .scan-condition .midd-bor{border-left:1px solid #ddd;border-right:1px solid #ddd;}
    .community-share .check-btn{padding:0 .3rem;background:#fff;margin:.2rem 0;}
    .community-share .check-btn span{display:block;width:100%;border-radius: .1rem;text-align: center;background:#31C2F6;color:#fff;padding:.2rem 0;}
    .color-gray{color:#A5A5A5;}
    .share-pic{width:2rem;}
    .community-share .has-no-data{padding-top: 1.2rem;}
    .community-share .has-no-data p{padding:.2rem 0;text-align:center;font-size:.3rem;}
</style>
