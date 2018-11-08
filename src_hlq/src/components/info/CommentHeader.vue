
<template>
  <div id='commentheader'>

    <div class="header">

     <div  class="avator">
         <img  v-if='item.userExtendInfo.logo' src="http://www.feizl.com/upload2007/2012_01/120115153325811.jpg" class="left">
         <img  v-else src="../../../static/images/writingsShare/share-logo.png" class="left">
         <img v-if="item.userExtendInfo.identifyFlag==1" src="../../../static/images/writingsShare/ic_vip.png" alt="" class="iv-vip">
     </div>

      <div class="right">
        <template v-if='item.reviewParentID'>
            <div class="name"> <span class="reviewerName">{{item.reviewerName}}</span> <span>回复</span> <span class="beReplayUserName">{{item.beReplayUserName}}</span></div>
        </template>
        <template v-else>
           <div class="name"> <span class="nickName">{{item.userExtendInfo.nickName}}</span><img class="v-level" src="../../../static/images/writingsShare/v1.png"/><span class="role"> 老师</span></div>
        </template>
        <div class="time">{{item.timestampStr}} </div>
      </div>

    </div>

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

  },
  computed:{


  
  
  },
  data(){
    return{
      
    }

  },
  methods:{
   
  },
  components:{

  }
}
</script>

<style type="text/css" scoped>

.reviewerName, .beReplayUserName{
  color:#00f;
  margin: 0.05rem;
}
 
 .v-level{
  width: 0.5rem;
  height: 0.5rem;
 }
 
.header{
  display: flex;
 margin: 0.1rem;
 align-items: center;
 

}

.left{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avator{
  position: relative;
  width: 1rem;
  height: 1rem;
}

.iv-vip{
  position: absolute;
  width: 30%;
  height: 30%;
  bottom: 0rem;
  right: 0rem;
}

.right{
  margin-left: 0.1rem;
}
.name{
  display: flex;
 
    align-items: center;

}

.nickName{
  font-weight: 500;
}

.nickName,.v-level, .role{
  margin: 0.05rem;


}

.time{
 
}

.role{
  font-size: 11px;
  background-color: #f0f;
  border-radius: 3px;
 box-sizing: border-box;
 padding: 2px;
 color:#fff;

}


</style>