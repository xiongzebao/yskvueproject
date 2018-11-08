
<template>
  <div id='commentlist' >

  <div   class="comment-item-container"    v-if='commentlist' v-for="(item,index) in commentlist">
   
    <CommentItem :item = 'item' :showReply=true ></CommentItem>

  
  </div>

</div>
</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import CommentItem from './CommentItem';
    import VueBus from 'vue-bus';
    Vue.use(VueBus);


export default {

  props:['infoID'],
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){
      
      this.fixdata();
      this.$bus.off('upcomment', this.fixdata);
      this.$bus.on('upcomment',this.fixdata);






  },
  computed:{
  
  
  },
  data(){
    return{
      commentlist:'',
      
    }

  },
  methods:{
        fixdata(){
//            alert('刷新评论')
            let url="hulaquan,/api/m/info/review/waterfall_query.htm";
      
     
      let param = {infoID:this.infoID,curPage:1};

//      alert('**********'+JSON.stringify(param));

//      console.log(param);
      let _this = this;

      window.ajaxMethod.doAjax(url,param,function(data){
//          console.log("----commentlist-------");
          console.log(data);
//          console.log("this is comnetnn "); 
          _this.commentlist = data.datas.list;
               _this.$nextTick(function(){
                console.log("nextTick");
                if(window.infoDetailscrollTop){
                  console.log(window.infoDetailscrollTop);
                    console.log('--------------commentlist----');
                  // setTimeout(function(){
                  //     $('.information-main').scrollTop(window.infoDetailscrollTop);

                  // },50);
                   $('.information-main').scrollTop(window.infoDetailscrollTop);

                
                }

              });

       });
        }
  },
  components:{
    CommentItem

  }
}
</script>

<style type="text/css">
  .comment-item-container{
    border-bottom: solid 1px #eee;
  }

</style>