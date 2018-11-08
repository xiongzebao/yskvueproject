
<template>
  <div id='root'>
  <!--     <mt-header  title="我的艺享卡">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header> -->
     
      <div class="top-section">
       <div  class="top-img"></div>
     <!--    <img src="../../../static/images/yxcard/activesuccess.png" class="img-logo"> -->
        <div class="active-notice">您的艺考服务卡已激活</div>
      </div>
      <div class="password" v-if='pwd'><span>服务序列号：</span>{{pwd}}</div>
      <div class="notice-content">
        <div class="notice-item title">艺考服务卡尊享权益</div>
        <div class="notice-item">• 手机在线肖像认证，无需亲往现场，免除奔波劳顿；</div>
        <div class="notice-item">• 肖像认证加急服务，专属绿色通道，身份急速审核；</div>
        <div class="notice-item">• 考试日程提醒服务，贴心考试助手，避免耽误行程；</div>
        <div class="notice-item">• 院校志愿填报参考，历年数据分析，提升匹配目标。</div>
      </div>
    
         <div class="bottom-note">该服务由第三方合作伙伴：美术之路提供并解释</div>
   


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

        document.title='我的艺考服务卡';
       // let cardNO = this.$route.query.cardNO;
       // alert(cardNO);
       // if(cardNO){
       //  this.pwd = this.splitString(cardNO);
       // }
       
      let _this = this;
      let url = 'user,/api/m/auth/artcard/get_artcard.htm';
      window.ajaxMethod.doAjax(url,null,function(data){
         //alert(JSON.stringify(data));
         if(data.success){
           _this.pwd = _this.splitString(data.datas.obj.cardNO);
         }else{
            alert(data.message);
         }    
       });

  },
  computed:{
  
  
  },
  data(){
    return{
      pwd:'1234 5678 9009 8765',
      
    }

  },
  methods:{
    splitString(pwd){
     // let pwdarr=[];
      let t="";
      for (var i = 1;i<=pwd.length/4;i++) {
        t=t+pwd.substring((i-1)*4,i*4)+"  ";
      }
      let m = pwd.length%4;
      t=t+pwd.substring(pwd.length-m,pwd.length);
      return t;
    }
  },
  components:{

  }
}
</script>

<style type="text/css" scoped>
.notice-item.title{
  font-size: 0.3rem;
  font-weight: 600;
   //text-align: left;
}

.notice-item{
  font-size: 0.25rem;
 // text-align: center;
}
.bottom-note{
  position: absolute;
  bottom: 0.5rem;
  margin: 0  auto;
  width: 100%;
  text-align: center;
  font-size: 0.2rem;
  color: #aaa;
}
.img-logo{
  margin-top: 0.6rem;
  width: 2.4rem;
  height: 1.9rem;

}
.top-section{
  text-align: center;
}
.active-notice{
  //margin-top: 0.6rem;
  font-size: 0.35rem;
}

.notice-content{
  //margin-top: 2rem;
  position: absolute;
  bottom: 2rem;

 padding: 0.3rem;
}

.password{
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.35rem;
  font-weight: 600;
}

.notice-item{
  margin-top: 0.2rem;
}

 .top-img{
    height: 3.8rem;
    width: 100%;
    background-image: url('../../../static/images/yxcard/actived.png');
    background-size:  100% 3.8rem;
    border: none;
  }


</style>