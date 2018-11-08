
<template>
  <div id='commentitem' @click.stop='commitTwoWay(item)'>
   
   
        <CommentHeader :item='item' ></CommentHeader>
            <div class="content">
             {{item.content}}
            </div>

  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import CommentHeader from './CommentHeader';
import VueBus from 'vue-bus';
    Vue.use(VueBus);
export default {
  name: 'app',
  props:['item'],

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
    commitTwoWay(val){
        alert(1)
        this.$bus.emit('commentwo',val);
    }
  },
  components:{
    CommentHeader

  }
}
</script>

<style type="text/css" scoped>

#infoitem{
  display: flex;
  height: 1.8rem;
  padding: 0.25rem;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
}
 
.content{
 // text-indent: 1rem;
 margin-left: 1rem;
 
}

.header{
  display: flex;
 margin: 0.1rem;

}

.left{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.right{
  padding: 0.2rem;
}
.name{

}

.time{
  margin-top: 0.1rem;

}


</style>