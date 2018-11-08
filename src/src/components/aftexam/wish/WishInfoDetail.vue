<template>
	<div id= "wishroot" >

      <mt-header  title="志愿填报" class='topheader'>
        <router-link to="/WishInfo" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
       </mt-header>
     <div class="content-container">
        <div class="content">
            <StuInfoPart :item="wish"></StuInfoPart>
            <InfoCollectPart :item="wish" ref="infocollectpart"></InfoCollectPart>
            <WishInfoCollectPart :item="wish" ref="WishInfoCollectPart"></WishInfoCollectPart>
            <CommitPart :item="wish"></CommitPart>
        </div>

        <SmsVertify  :commitData='commitData'></SmsVertify>
      </div>
	</div>
</template>

<script type="text/javascript">
import CommitPart from './CommitPart'
import InfoCollectPart from './InfoCollectPart'
import StuInfoPart from './StuInfoPart'
import WishInfoCollectPart from './WishInfoCollectPart'
import SmsVertify from './SmsVertify'

import Vue from 'vue'
import VueBus from 'vue-bus';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import utils from './utils.js'

Vue.use(VueBus);

export default{
      beforeCreate(){},

      beforeMounted(){
        
      },
    	mounted(){
        
        
          this.$bus.on("wishCommitToDetail",this.onWishCommitToDetail);
   	},
    data(){
         return {
               myitem:"",
               showRoot:false,
               infodata:'',
               wishdata:'',
               showSmsVertify:true,
          }
      },
    computed:{

     
         wish:{

           get:function(){
               this.myitem = utils.getValueByKey('wishinfo');
               return this.myitem;
             },

             set:function(item){
                this.myitem = item;
             }
          },
        },

   		methods:{

   			wishCommit(){
         
   			},
        onWishCommitToDetail(){
              console.log("--------------------onWishCommitToDetail-------------------");
              console.log(this);
              let _this = this;
               this.$nextTick(function() {

               // setTimeout(function(){

                   console.log("00000000000000000000000000");

                if(!_this.$refs.infocollectpart||!_this.$refs.WishInfoCollectPart){
                  return;
                }
              var infodata= _this.$refs.infocollectpart.getdata();
              var wishdata= _this.$refs.WishInfoCollectPart.getdata();
            
              if(infodata==false||wishdata==false){
                _this.$bus.emit('commited');
                return;
              }
            
              _this.infodata = infodata;
              _this.wishdata = wishdata;

              if(utils.getValueByKey('schoolID')=='10073'){
                 _this.$bus.emit("showVertify");
                 return;
              }

             console.log("志愿信息数据");
             console.log(this.infodata);
             console.log(this.wishdata);
             console.log("提交数据！");
             _this.commitData();

              //  },1000);
               
        
             });
             
        },

        requestData(){
            var p = {   
              "schoolID":utils.getValueByKey('schoolID'), 
              "examID": utils.getValueByKey('examID'),     
            }
            ajaxMethod.doAjax("aftexam,/api/m/auth/vol/query.htm",p,function(data){
           
            if(data.success==true){
             
              utils.setKeyValue('wishinfo',data);
              setInterval(function(){
               // alert("reload");
                 window.location.reload();
              },500);
             
            }
            else{
                MessageBox({
                       title: '提示',
                       message: data.message,
                       showCancelButton: false,
                       });
                }  
           },function(){ });
        },

        commitData:function(){

          let infodata = this.infodata;
    
            let std ={
              "mobile": infodata.telphone,
              "zip":infodata.zip,
              "address":infodata.address,
              "highExamScore":infodata.highExamScore,
              "isAdjust": this.wishdata.isAdjust,
              "chnScore":infodata.chnScore,
              "frnScore": infodata.frnScore,
            };

            let wish = {
                "schoolID": utils.getValueByKey('schoolID'),
                "examID": utils.getValueByKey('examID'),
                "wishStudentDO":std,
                "examWishList":this.wishdata.wishList,
            };


            let _this=this;

            Indicator.open({
              text: '提交中...',
              spinnerType: 'fading-circle'
            });


            ajaxMethod.doAjax("aftexam,/api/m/auth/vol/save_stu_vol.htm",wish,function(data){
                 
                    console.log(data);
                    if(data.success==true){
                         _this.requestData();
                         Indicator.close();
                    }
                    else{
                      MessageBox({
                       title: '提示',
                       message: data.message,
                       showCancelButton: false,
                       });

                    }
              },function(){ 
                 Indicator.close();
                 _this.$bus.emit('commited');

               });

        },
   	},
   		components:{
   			CommitPart,
   			InfoCollectPart,
   			StuInfoPart,
   			WishInfoCollectPart,
        SmsVertify
   		}
   }


</script>
<style type="text/css"  >
  #wishroot{
    display:flex;
    -webkit-overflow-scrolling: touch;
    flex-direction:column;
  }

  #wishroot .topheader{
      flex-shrink: 0;
  }
  #wishroot .content-container{
    flex-grow: 1;
    -webkit-overflow-scrolling:touch;
    overflow-y: auto;
  }

  #wishroot .mint-header{
      min-height: 0.8rem!important;
  }
  #wishroot .content{
    margin-top: 0.1rem;
  
  }

  #wishroot{
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .content-item{
   // margin-left: 0rem !important;
  }

  body,html{
    overflow: auto;
  }


 
</style>