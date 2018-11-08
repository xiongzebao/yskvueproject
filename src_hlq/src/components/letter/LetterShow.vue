
<template>
  <div id='lettershow'>
      <!--     <div id="letter-header">
       <span class="back" @click='back'><</span><span class="title">分享资讯列表</span><span class="share" @click='share'>分享</span>
      </div> -->
      <!--    <img src="../../../static/images/writingsShare/letterbg.png" class="letter-background"/> -->

               <div class="inner">
                   <div id="letter-content">
                     <div class="content-letter " > {{item.biaobai}}  </div>
                   </div>
                   <div class="item1 " ><span>学生</span> <span>{{item.student}}</span></div>
                   <div class="item2">{{item.school}}</div>
                   <div class="item3"><span>{{item.teacher}}</span><span>老师&nbsp;&nbsp;(收)</span></div>
              </div>
        </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';


export default {
  name: 'app',
  beforeCreated(){

  },

  mounted(){

      // let isPC= ajaxMethod.isPc();
       let shareUrl = location.href.split('#')[0]+'#/letterInput'
      // alert(isPC);
      // if(isPC){
      //     window.location.href = shareUrl;
      //     return;
      // }
        this.item = this.$route.query;
        if(this.item.from){
          window.location.href=shareUrl;
        }

      this.weixinshare();

  
     console.log(this.item);
     document.title='三行情书';
       // if(window.yksapp){
       //  window.yksapp.setTopTitle('三行情书');
       // }
     
     let  screenWidth = $(window).width();
     let screenHeight = $(window).height();

    // $('.letter-background').css('height',screenHeight);
    //  $('.letter-background').css('width',screenWidth);

    //  let bgh = screenHeight -50;
    // // $('#letter-header').css('height',screenHeight*0.1);
    //  $('#letter-content').css('height', screenHeight*1);

    //  console.log(this.$route.query);
    //  let bgsize = screenWidth+'px '+bgh+'px';
    // $('#letter-content').css('backgroundSize',bgsize);
     setTimeout(this.share,3000);
   
      
  },
  computed:{
  
  
  },
  data(){
    return{
       item:'', 
    }

  },
  methods:{


      weixinshare(){

                let url="hulaquan,/api/m/base/share/v3/shareSign.htm";
              //  alert('url'+window.location.href.split('#')[0]);
                // alert(window.location.href);
                let p = {"url": location.href.split('#')[0]};
               //alert('url->'+p.url);
                let _this = this;
                
                 ajaxMethod.doAjax(url,p,function(data){
                
                  _this.sign = JSON.stringify(data.datas);

                  let logimgurl = window.ajaxMethod.getHlqUrl()+'/static/images/writingsShare/letterlog.png';

                  _this.weixinshareConfig(data.datas.signatureMap,'三行情书','三行情书，艺考升为你线下寄出',logimgurl);

                 });
          },

     weixinshareConfig(signatureMap,title,desc,imgUrl){

        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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

                  let shareUrl = location.href.split('#')[0]+'#/letterInput'
                  wx.onMenuShareTimeline({
                      title:title, // 分享标题
                      desc:desc, // 分享描述
                      link: shareUrl,
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
                     //  alert('分享失败');
                      // alert(JSON.stringify(res));
                    }

                  });

            //       // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                  wx.onMenuShareAppMessage({
                      title:title, // 分享标题
                      desc:desc, // 分享描述
                      link: shareUrl,
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
                    //   alert('分享失败');
                      // alert(JSON.stringify(res));
                    }

                  });

                
                   wx.error(function(res){
                    //  console.log(res);
                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                   //   alert('配置失败');
                   //   console.log(JSON.stringify(res));
                     // alert(JSON.stringify(res));
                    });
            });
          },












    back(){

   //   alert('back');
    window.history.back();

    },
    share(){

         MessageBox({
                title: '提示',
                message: '您要分享吗？',
                showCancelButton: true
            }).then(action=>{
                console.log(action)
                if(action=='confirm'){
                    setTimeout(function(){

                       if(window.yksapp){
                            yksapp.goShareWithScreenShot();
                          }

                    },500);
                }
            });

     // alert('share');
     

    }
   
  },
  components:{

  }
}
</script>

<style type="text/css" scoped>
 html ,body, #app{
  width: 100%;
  height: 100%;
 }

  #lettershow{
    position: relative;
    background: url('../../../static/images/writingsShare/letterbackground.png') no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    
  }

#letter-header{
 /*  display: flex;
   justify-content:space-between;
   align-items: center;*/
   height: 1rem;
   background-color: #fff;
}

#lettershow .inner{
  position: absolute;

 width: 100%;
 top:13.5%;
 height: 80%;
}
#lettershow .back{
  width: 1.5rem;
  text-align: center;
}

#lettershow .share{
  width: 1.5rem;
  text-align: center;

}
 
 #lettershow .item1{
 position: absolute;
  top: 35%;
  right: 1rem;
  font-family: 'yyfont'; 
     color: #7b7b7b;
     width: auto;
      height: auto;
 }
 #lettershow .item2{
    position: absolute;
   top: 51%;
   width: 100%;
   text-align: center;
   font-size: 0.35rem;
      color: #7b7b7b;
       height: auto;
 }
 #lettershow .item3{
  position: absolute;
  top: 59%; 
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-size: 0.35rem;
  color: #7b7b7b;
   height: auto;
 }

  #lettershow #letter-header{
    height: 1rem;
    background-color: #f6f6f6;
  }

 #lettershow #letter-content{
    position: absolute;
    font-family: 'yyfont ';
  }

 #lettershow .content-letter{
    // position: absolute;
     font-family: 'yyfont';
    line-height: 0.67rem;
    text-indent: 0.6rem;
    top: 13%;
    padding-left: 0.6rem;
     padding-right: 0.6rem;
     font-size: 0.35rem;
    letter-spacing:0.05rem;
    color: #7b7b7b;
    width: auto;
    height: auto;
  }


</style>