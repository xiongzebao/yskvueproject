
<template>
  <div id='commentitem' >

    <CommentHeader :item='item'></CommentHeader>

    <div class="commentitem-content" >
     <span v-html='analysis(item.content)'></span>

     <template v-if='showReply'>
       <template v-for='(item,index) in item.reviewList'>
            <reCommentItem :item='item'></reCommentItem>
       </template>
       <div @click.stop="showMoreWay(item)" class="loadmore">
            <div class="loadmore-find">查看更多 ></div>
       </div>
     </template>

    </div>


  </div>

</template>


<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import VueBus from 'vue-bus';
import reCommentItem from './reCommentItem';
import CommentHeader from './CommentHeader';
const emotionsData = require('./comment/emotions.json');
Vue.use(VueBus);

export default {
  name: 'app',
  props:['item','showReply'],

  beforeCreated(){
 
  },

  mounted(){
//    console.log(11)
//    console.log(this.item);

  },
  computed:{
  
  
  },
  data(){
    return{
      
    }

  },
  methods:{
      LevelOneComment(val){
          this.$bus.emit('commentone',val);
      },
      showMoreWay(val){
          this.$router.push({path:'/commentDetail',query:{item:val}})
      },
       analysis(obj) {
                let dataArr=emotionsData.data;
                var value = String(obj||"");
                var arr = value.match(/\[.{1,3}\]/g);
                if(arr){
                    for(var i = 0; i < arr.length; i++) {
                        for(var j in dataArr){
                            if(arr[i] == dataArr[j].phrase){
                                var ex = '<img src="'+dataArr[j].icon+'">';
                                value=value.replace(arr[i],ex);
                                break;
                            }

                        }
                    }
                }
                return value;
            }
   
  },
  components:{
    reCommentItem,
    CommentHeader

  }
}
</script>

<style type="text/css" scoped>
#commentitem {
 /* border-bottom: solid 1px #eee;
  border-top: solid 1px #eee;*/
}

#commentitem .commentitem-content{

 margin-left: 1rem;
 position: relative;

}
#commentitem .loadmore{
      position: relative;
      display: block;
    overflow: hidden;
}
#commentitem .loadmore-find{
      float: right;
      padding-right: 10px;
}
#commentitem .header{
  display: flex;
 margin: 0.1rem;

}

#commentitem .left{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
#commentitem .right{
  padding: 0.2rem;
}
#commentitem .name{

}

#commentitem .time{
  margin-top: 0.1rem;

}




</style>