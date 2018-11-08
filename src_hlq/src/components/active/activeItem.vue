
<template>

  <div id='activeItem'>

    <div class="active-img-container">
      <a :href="item.activeUrl"><img :src="item.activeLogo" class="img-active"></a>
      <img v-if='flag==1' src="../../../static/images/active/hot.png" class="img-active-label">
      <img v-if='flag==2' src="../../../static/images/active/online.png" class="img-active-label">
      <img v-if='flag==3' src="../../../static/images/active/finish.png" class="img-active-label">
    </div>
    <div class="active-desc">{{item.activeTitle}} </div>
   
  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';

export default {
  props:['item'],
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){

    console.log(this.isUnderWay(this.item.endDate));

  },
  computed:{

    flag:function(){
      if(this.isUnderWay(this.item.endDate)&&this.item.hotFlag==2){
        return 1;
      }else if(this.isUnderWay(this.item.endDate)&&this.item.hotFlag==1){
        return 2;

      }else{
        return 3;
      }
    }
  },
  data(){
    return{
      
    }

  },
  methods:{

    isUnderWay( stringTime){
      if(this.getTimeStamp(stringTime)>this.getCurrentTimeStamp()){
        return true;
      }
      return false;
    },
    getCurrentTimeStamp(){
      // 获取当前时间戳(以s为单位)
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      //当前时间戳为：1403149534
      return timestamp;
    },
    getTimeStamp( stringTime){
      // 获取某个时间格式的时间戳
      // var stringTime = "2014-07-10 10:21:12";
      var time = stringTime.replace(/-/g, '/');
      var timestamp2 = Date.parse(new Date(time));
      timestamp2 = timestamp2 / 1000;
      //2014-07-10 10:21:12的时间戳为：1404958872 
      return timestamp2;

    }
   
  },
  components:{

  }
}
</script>

<style type="text/css" scoped>

.active-img-container{
  position: relative;
  width: 100%;

}

.img-active-label{
  position: absolute;
  top: 0.40rem;
  right: -0.2rem;
  height: 0.7rem;
  width: 1.64rem;
}

#activeItem{
  box-sizing: border-box;
  padding:0rem 0.2rem;
  margin: 0.1rem 0rem;
}

.img-active{
  //margin:0.2rem 0.16rem;
  // margin-bottom: 0rem;
  height: 3rem;
  //width: 7.24rem;
  width: 100%;

}
.active-desc{
  font-size:0.36rem;
  height: 0.84rem;
  line-height: 0.84rem;
  text-indent: 0.35rem;
}

.active-divider{
  height: 0.24rem;
  width: 100%;
  background-color: #f9f9f9;
}

</style>