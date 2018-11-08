
<template>
  <div id='information'>

    <header class="header">
       <div class="header-label">{{item.title}}</div>
       <section class="header-inner">
          <div class="time">{{item.createdOnStr}}</div>
          <div class="author">作者</div> 
          <div class="author">{{item.author}}</div>
       </section>
    </header>

    <article class="content">
        <template v-if="isUrl">
           <iframe id='iframeId' src="http://tpl.51bm.net.cn/#/column?columnID=1" width="100%"   frameborder="0"  ></iframe>
        </template>

        <template v-else-if='item'>
        <div v-html='item.contentDO.content'>
        </div>
        </template>
    </article>

    <footer class="footer">
         <img src="../../static/images/writingsShare/eye-gray.png" class="footer-img-1">
         <span class="footer-number">{{item.showBrowseNum}}</span>
         <img src="../../static/images/writingsShare/pointer-gray.png" class="footer-img-2">
         <span class="footer-number">{{item.praiseNum}}</span>
    </footer>

  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';

export default {
  name: 'app',
  beforeCreated(){
 
  },

    computed:{


  },

  mounted(){

      // document.getElementById('iframeId').onload(function(){
      //     document.getElementById("iframeId").height=0;  
      //     document.getElementById("iframeId").height=document.getElementById("iframeId").contentWindow.document.body.scrollHeight;  
      // });
    // var mainheight = $('#iframeId').contents().find("body").height();
    // console.log("mainheight:"+mainheight);
    // alert(mainheight);
    // $('#iframeId').height(mainheight);
   // $(".content").load("http://www.baidu.com");
        document.title = "资讯分享";
       let url="hulaquan,/api/m/info/detail.htm";
       let infoID=this.$route.query.infoID;
       let param = {"infoID":infoID};
       let _this = this;
       window.ajaxMethod.doAjax(url,param,function(data){
         
         _this.item = data.datas.obj;
         _this.weixinshare();

       });

  },
  computed:{

    imgurl:function(){
       if(!this.item.pictureURL){
        let imgUrl = window.ajaxMethod.getHlqUrl()+'/static/images/writingsShare/share-logo.png';
       // alert(imgUrl);
        return imgUrl;
       }else{
        //alert(this.item.pictureURL);
        return this.item.pictureURL;
       }
    }
  
  
  },

  data(){
    return{
      isUrl:false,
      item:'',
    }

  },


  methods:{


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
                         //z("点击分享：" +JSON.stringify(res));
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
                    //   alert('分享失败');
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
               // alert("weixinshare");
                 ajaxMethod.doAjax(url,p,function(data){
                 // alert(_this.item.title);
                  _this.weixinshareConfig(data.datas.signatureMap,_this.item.title,_this.item.title,_this.imgurl);

                 });
               },


     setIframeHeight(id){
    try{
        var iframe = document.getElementById(id);
        if(iframe.attachEvent){
            iframe.attachEvent("onload", function(){
              //  iframe.height =  iframe.contentWindow.document.documentElement.scrollHeight;
              document.getElementById("iframeId").height=document.getElementById("iframeId").contentWindow.document.body.scrollHeight;  
            });
            return;
        }else{
            iframe.onload = function(){
              //  iframe.height = iframe.contentDocument.body.scrollHeight;
                document.getElementById("iframeId").height=document.getElementById("iframeId").contentWindow.document.body.scrollHeight;  
            };
            return;                 
        }     
    }catch(e){
        throw new Error('setIframeHeight Error');
    }
  }
   
  },
  components:{

  }
}
</script>

<style type="text/css">

  .header-inner{
    display:-webkit-flex;
    display:-moz-flex;
    display:flex;
    display:-ms-flexbox;
    box-orient: horizontal;
    justify-content: flex-start;

  -webkit-align-items: center;
  align-items: center;

  height: 0.5rem;
  color: #666;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  }

  #information{
    padding: 0.2rem;
    //overflow: auto;
    
  }

  .footer{
    display:-webkit-flex;
    display:-moz-flex;
    display:flex;
    display:-ms-flexbox;
    box-orient: horizontal;
    -webkit-align-items: center;
    align-items: center;
  }

  .footer-img-1{
    width: 0.5rem;
    height: 0.5rem;
  }

    .footer-img-2{
    width: 0.35rem;
    height: 0.35rem;
    margin-left: 0.35rem;
  }

  .footer-number{
    margin-left: 0.1rem;
  }

  .author{
    margin-left: 0.2rem;
  }
  .header-label{
    font-weight: 900;
    font-size: 0.4rem;
    margin-top: 0.1rem;
  }
  .content img{
    display: block;
    margin: 0 auto;
    max-width: 100%!important;
    width: auto!important;
    height: auto!important;
  }
  .content{
    line-height: 0.5rem;
    font-size: 0.28rem;
  }
</style>