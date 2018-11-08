
<template>
  <div id='root'>
    <div>infodetail{{id}}</div>
    
    
  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';

export default {
  props:['id'],
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){
    var id = this.$route.query.id;
    console.log('...................'+id);

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

</style>