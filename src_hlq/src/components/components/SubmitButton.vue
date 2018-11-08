
<template>
  <div class="btn-submit-container" id="btn-submit-container">
      <mt-button type="default" @click.native = 'submit' id='submitbtn'><slot name='btntext'></slot></mt-button>
  </div>
</template>


<script>
 //import Vue from 'vue'
//import { MessageBox } from 'mint-ui';
import { Button } from 'mint-ui';
//import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';

export default {
  props:{

    url:{
      type: String,
      required: true
    },
     param:{
      type: Object,
      required: false
    },

       success:{
      type: Function,
      required: false
    },

       fail:{
      type: Function,
      required: false
    },

      validate:{
      type: Function,
      required: true
    },


},
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){

  },
  computed:{
  
  
  },
  data(){
    return{
      canClick:true,


      
    }

  },
  methods:{
    submit(){

       if(!this.canClick){
          return;
       }
      this.canClick = false;

      if(this.validate){
          if(!this.validate()){
          this.canClick = true;
        return;
       }
      }
       //加载数据只用改变以上两条
       let _this = this;
       console.log(this.param);
      Indicator.open({
        
          spinnerType: 'fading-circle'
        });
       window.ajaxMethod.doAjax(this.url,this.param,function(data){
          console.log(data);
           if(data.success){
                _this.success(data);
           }else{

               _this.fail(data);
           }
       },function(){
        _this.canClick = true;
        Indicator.close();
       });

    }
   
  },
  components:{

  }
}
</script>

<style type="text/css">

    .btn-submit-container .mint-button:after {
      background-color: #f00;
      content: " ";
      opacity: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
    }

    .btn-submit-container .mint-button-text{
      color: #fff;
    }
    .btn-submit-container .mint-button--default{
       background-color: #31C2F6;
    }
    .btn-submit-container .mint-button{
      height: 0.7rem;
      width: 5.5rem;
      height: 0.86rem;
      font-size: 0.36rem;
      border-radius: 0px;


    }

    .btn-submit-container{
      text-align: center;
      height: 0.86rem;
    }


</style>