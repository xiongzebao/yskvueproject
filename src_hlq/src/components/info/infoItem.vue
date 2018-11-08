
<template>
   <router-link :to="{path:'/infoDetail',query:{infoID:item.infoID}}" class='item-container'>
  <div id='infoitem'>
    <div class="content">
      <div class="content-header">{{item.title}} </div>
      <div class="content-footer">
        <div>{{item.author}}</div>
        <div>{{item.createdOnStr}}</div>
      </div>
    </div>
    <div>
      <img v-if='item.pictureURL' :src="pictureURL">
    </div>
  </div>
  </router-link>
</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';


export default {
  //http://www.feizl.com/upload2007/2012_01/120115153325811.jpg
  name: 'app',
  props:['item'],

  beforeCreated(){
 
  },

  mounted(){

  },
  computed:{

    pictureURL:function(){
      return this.item.pictureURL+'?x-oss-process=image/resize,w_200';
    }
  
  
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

<style type="text/css"  scoped>

#infoitem{
  display: flex;
  height: 2.4rem;
  padding: 0.34rem;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
}
.content-footer{
  display: flex;
  position: absolute;
  bottom: 0px;
  color: #969696;
  font-size: 0.24rem;
 -webkit-box-pack:justify;
 -webkit-justify-content:space-between;
 -ms-flex-pack:justify;
 justify-content:space-between;
 width: 100%;

}
.content-header{
  font-size: 0.32rem;
  height: 70%;
  line-height:28px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.content{
  position: relative;
  //min-width: 70%;
  //width: 100%;
  margin-right: 0.34rem;
      flex-grow: 1;
}
#infoitem img{
  width:  2.18rem;
  height: 1.72rem;
}

#infoitem pre{
  white-space: pre-wrap;

}
    



</style>