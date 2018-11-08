
<template>
  <div id='slider'>
  <div class="container" > 
      <div class="contentmm">  
          <div v-for="n in 10" class="myitem"> 我是谁</div>

      </div>
  </div>

  <section  id="slidesection">
    dgdgdddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddd
  </section>

    
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

    console.log("mounter");
    $('.contentmm').scrollLeft(100);

    

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

<style type="text/css">
  .container{
    height: 100px;
    width: 100%;
    background-color: #0f0;
    overflow: hidden;

  }

  .contentmm{
    overflow-x: auto;
    display: flex;


  }

  #slideSection{
    height: 500px;
    width: 100%;
    background-color: #6f6f6f;
  }
.myitem{
  min-width: 1rem;
  height: 1rem;
}
</style>