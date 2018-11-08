
  <template>
    <div id='info-complain'>

       <mt-header  title="投诉" class='information-header'>
            <router-link :to="backurl" slot="left">
              <mt-button icon="back"></mt-button>
            </router-link>
         
      </mt-header>

   <mt-radio
    align='right'
    title="请选择投诉原因"
    v-model="value"
    :options="options">
  </mt-radio>
  <div class="divider">请标明原因</div>
  <div class="textarea-container"> <textarea placeholder ='在此输入投诉原因' v-model='complainContent' class="complain-input"></textarea></div>
 
   <SubmitButton url='hulaquan,/api/m/complain/add.htm' :success='success' :fail='fail' :validate='validate':param='complainParam'><div slot='btntext'> 提交</div></SubmitButton>
   


    </div>

  </template>


  <script>
  import Vue from 'vue'
  import { MessageBox } from 'mint-ui';
  import { Radio } from 'mint-ui';
  import SubmitButton from '@/components/components/SubmitButton.vue'
  import { Toast } from 'mint-ui';

  Vue.component(Radio.name, Radio);


  export default {

  // "typeID":"",// 投诉类别ID
  //   "complainFlag":"",//投诉标记 1- 资讯 2-帖子 3.圈子
  //   "contentID":"",// 投诉内容ID
  //   "complainContent":"" // 投诉内容



    name: 'app',
    created(){
       this.getComplainItems();
    },

    mounted(){
      document.title = '投诉';
      this.contentID = this.$route.query.infoID;
    
      console.log("投诉mounted");

    },
    computed:{
      backurl:function(){
        return '/infoDetail?infoID='+this.contentID;
      }
    
    
    },
    data(){
      return{
        options:[],
        value:'',
        contentID:'',
        complainParam:{},
        complainContent:''  
      }

    },
    methods:{
      success(){
        console.log('success');
        Toast("投诉成功");
        this.$router.go(-1);

      },
      fail(){
        console.log('fail')

      },
      validate(){

        this.complainParam.typeID = this.value;
        this.complainParam.contentID  = this.contentID;
        this.complainParam.complainContent = this.complainContent;
        this.complainParam.complainFlag='1';

        console.log(this.complainParam);

        if(this.value){
           return true;
         }else{
          Toast("选择投诉类型");
          return false;
         }
      },
      getComplainItems(){   
          let url = 'hulaquan,/api/m/complain/type/query.htm';
          let param = {};
          let _this = this;
          window.ajaxMethod.doAjax(url,param,function(data){
              console.log(data);
               if(data.success){
                  $.each(data.datas.list,function(index,item){
                    let t ={label:'',value:''};
                     t.label = item.dictTypeName;
                     t.value = item.dictType;
                      _this.options.push(t);
                  });
                  console.log(_this.options);
               }else{
                 
               } 
         });
      }
     
    },
    components:{
      SubmitButton

    }
  }
  </script>

  <style type="text/css" >

  #complain{
    //text-align: center;
  }

   #info-complain .divider{
    background-color: #f9f9f9;
    height: 0.8rem;
    line-height: 0.8rem;
    text-indent: 0.4rem;

   }
   #info-complain .complain-input{

    padding: 0.2rem;
    height: 3rem;
    width: 90%;
    margin: 0.2rem auto;
    box-sizing: border-box;
     border: none;

   }
   #info-complain .textarea-container{
    width: 100%;
    text-align: center;

   }

  </style>