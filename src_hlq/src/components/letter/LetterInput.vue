
<template>

<div class="letter-input">

 
      <div id='letter-content-input'>
        <div><span>学校</span><input v-model='school' type="text" name="" placeholder="填写学校名称 " maxlength="16"> </div>
        <div><span>老师</span><input v-model='teacher' type="text" name="" placeholder="填写恩师名字 " maxlength="16"> </div>
          <div class="biaobai"><span class="biaobai-label" >表白</span><textarea v-model='biaobai' class="biaobai-input" placeholder="不超过60字" maxlength="60"></textarea></div>
         <div><span>署名</span><input v-model='student' type="text" name="" placeholder="填写学生署名 " maxlength="16">  </div>
      </div>
     <div class="bottom-section">
            <div @click = "submit" class="submit">生成明信片</div>
            <div class="biaozhu">注:艺考升会线下邮寄出，请确保信息真实具体</div>
      </div>
    <div class="hide"> &nbsp;</div>

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

       document.title='三行情书';
    $(document).ready(function(){

　    if(window.yksapp&&window.yksapp.setTopTitle){
         window.yksapp.setTopTitle('三行情书');
      }
     
    }); 
   
     
     this.weixinshare();

     // let  screenWidth = $(window).width();
     // let screenHeight = $(window).height();
     // $('#backgroundimg').css('height',screenHeight);
     // $('#backgroundimg').css('width',screenWidth);

  },
  computed:{
  
  
  },
  data(){
    return{
      school:'',
      teacher:'',
      biaobai:'',
      student:''
      
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
                    //  console.log(res);
                      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                   //   alert('配置失败');
                   //   console.log(JSON.stringify(res));
                     // alert(JSON.stringify(res));
                    });
            });
          },









    submit(){

      if(this.school==''){
        alert('请填写学校名称');
        return;
      }
      if(this.teacher==''){
        alert('请填写恩师名字');
           return;
      }
      if(this.biaobai==''){
        alert("请填写表白内容");
           return;
      }
      if(!this.student){
        alert("请填写署名");
        return;
      }

      if(this.biaobai.length>60){
        alert("表白字数不能大于60");
        return;
      }
  
      if(this.student.length>16){
        alert('署名字数不能超过16');
        return;
      }



        if(window.yksapp){
          window.yksapp.showRightBtn('分享');//showRightBtn

        }
     // window.location.href='#/letterShow';
    // this.$router.push({ name: 'home', params: { userId: wise }})

    let queryData = {
      school:this.school,
      teacher:this.teacher,
      biaobai:this.biaobai,
      student:this.student
    }
   //  this.$router.push({path: '/letterShow', query: queryData});

    let _this = this;
      var url="advert,/api/m/adv/activeOrder/v3/saveActiveOrder.htm";
         var data={
                "activeCode":'shqs',//shqs
                "userName":this.student,
                "item1":this.school,
                "item2":this.teacher,
                "item3":this.biaobai
            };

        //  yksapp.setKeyValue('letter',JSON.stringify(data));
        // alert("开始请求");
          ajaxMethod.doAjax(url,data,function(d){
           
     
              if(d.success){

                   _this.$router.push({path: '/letterShow', query: queryData});
                    
                   // let url = window.location.href;
                   //   let u=  url.split('#')[0]+"#/letterShow";
                   //    alert(u);
                   //    alert(window.yksapp);
                   //    if(window.yksapp){
                   //      window.yksapp.goPageWithParams('webPage',u);
                   //    }
                      


              }else{
                  alert(d.message);
              }

          });
    }
   
  },
  components:{

  }
}
</script>

<style type="text/css"  >
 html ,body, #app{
  width: 100%;
  height: 100%;
 }

 .letter-input{
   position: relative;
   background: url('../../../static/images/writingsShare/inputbg.png') no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;


 }


#letterinput{
  position: relative;
  top: 30%;
  width: 100%;
    
}


#letter-content-input{
   position: absolute;
  top: 30%;
  padding-left: 0.4rem;
  padding-right: 0.6rem;
  width: 100%;

}

input{
  height: 0.28rem;
  margin-left: 0.3rem;
  width: 4.9rem;
 
  height: 0.5rem;
  margin-top: 0.25rem;
  border:none;
}

/*.shuming{
   box-sizing: border-box;
  height: 2rem;
   margin-top: 0.35rem;
   margin-left: 0.3rem;
   width: 5.3rem;
   padding: 0.15rem;
   border:none;

}
*/
.biaobai-input{
    box-sizing: border-box;
  height: 2rem;
   margin-top: 0.25rem;
   margin-left: 0.3rem;
   width: 4.9rem;
   padding: 0.15rem;
   border:none;
   


}
.biaobai{
   
    vertical-align: top;   
}

.biaobai-label{
 
 
    vertical-align: top;    
   // margin-top: 0.35rem;
    line-height: 1rem;

}

.bottom-section{
  position: absolute;
  bottom: 0.1rem;
  margin: 0 auto;
  width: 100%;
}
.biaozhu{
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0.2rem;
//  margin-top: 0.4rem;

}
.submit{
  width: 80%;
  background-color: #394581;
  margin:0.12rem auto;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
 
  color: #fff;
  font-size: 0.3rem;
  letter-spacing:0.05rem;
  
 }

 .hide{
  position: absolute;
  font-family: 'yyfont';
   visibility: hidden;
   height: 0px;
      top: -9999px;

   left: -9999px;
 }

</style>