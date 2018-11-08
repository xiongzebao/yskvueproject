
<template>
  <div id='commentdetail'>
        <mt-header  title="资讯评论回复列表" class='commentdetail-header'>
            <div slot="left" @click='routerBack'>
				<mt-button icon="back"></mt-button>
			</div>
        </mt-header>
       <Infordetailcommit :usercommit='item' :commentlist='commentlist' @detailcommit='levelCommiTwoWay' @initcomit='commitInit' @longTouchEvent="deleteWay" class='commentdetail-main'></Infordetailcommit>
        <Commentemotion  :placehodnote='placeHoldrtNote' @emousersend='emousersendWay' ref='comemotion' ></Commentemotion>
           <mt-popup
                 class='delete-popup'
                  v-model="deletePopupFlag"
                  position="middle">
                 <div class='delete-popup-box' @click='deleCommit'>删除</div>
            </mt-popup>
  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import Commentemotion from './comment/vue-sina-emotion';
 import Infordetailcommit from './Infordetailcommit'; 
	import { Toast } from 'mint-ui';
    
export default {
  name: 'app',
  data(){
    return{
      reviewParentID:'',
      infoID:'',
      commentlist:'',
      item:'',
      infoID:'',
      placeHoldrtNote:"请输入评论内容",
      levelCommit:'1',
      beReplayUser:'',
      reviewParentId:'',
        /*评论列表字段*/
      levelbeReplayUser:'',
         deletePopupFlag:false,
      deleReviewID:''/*删除评论*/
    }
  },
  mounted(){
       let item = this.$route.query.item;
       this.reviewParentId=item.reviewID;
       this.infoID=item.infoID;
       this.beReplayUser=item.reviewer;
       this.item = item;
       this.fixdata()
  },
  methods:{
        routerBack(){
            this.$router.go(-1)
        },
      /*提示信息*/
         toast(mesg){
             Toast({
                  message: mesg,
                  position: 'middle',
                  duration: 3000
                });
         },
       commitInit(){
            this.levelCommit=1;
           this.placeHoldrtNote="请输入评论内容";
           
       },
      deleteWay(val){
          
          let userId=yksapp_user.getUserId();
//           let userId='';
//          userId='1195631'
          if(userId==val.reviewer){
              this.deletePopupFlag=true;
              this.deleReviewID=val.reviewID;
          }else{
              this.deleReviewID='';
          }
          
      },
      /*删除评论*/
      deleCommit(){
        
        if(!this.deleReviewID){
            return ;
        }
           let data={
             reviewID:this.deleReviewID
            }
           let that=this;
            this.deletePopupFlag=false; ajaxMethod.doAjax("hulaquan,/api/m/auth/info/review/delete.htm",data,function(database){
              if(database.success){
                    that.fixdata();
              }else{
                  that.toast(database.message);
              }
                
            })
      },
        fixdata(){
              let url2="hulaquan,/api/m/info/review/query.htm";
              let param2 = {'reviewParentID':this.reviewParentId,'infoID':this.infoID,'curPage':1};

              let _this = this;
              console.log(param2 )
              window.ajaxMethod.doAjax(url2,param2,function(data){
                 console.log(data)
                  _this.commentlist = data.datas.list;

               });
        },
        /*二级评论事件*/
         levelCommiTwoWay(val){
             this.levelCommit=2;
             console.log(val)
             this.levelbeReplayUser=val.reviewer;
             this.placeHoldrtNote="回复"+val.nickName+":"; 
          },
        emousersendWay(val){
            let data={
                infoID:this.infoID,
                content:val,
                beReplayUser:'', 
                reviewParentID:this.reviewParentId,
            };
            if(this.levelCommit==1){
                data.beReplayUser=this.beReplayUser;    
            }else{
                data.beReplayUser=this.levelbeReplayUser;
            }
            
           let that=this;
           console.log(data); ajaxMethod.doAjax("hulaquan,/api/m/auth/info/review/v3/add.htm",data,function(database){
               if(database.success){
                   that.fixdata();
                   that.$refs.comemotion.emoInitData();
              }else{
                  that.toast(database.message);
              }
                
            })
    }
  },
  components:{
    Commentemotion,
    Infordetailcommit

  }
}
</script>

<style type="text/css" scoped>
    /*弹性盒布局*/
    #commentdetail{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .commentdetail-header{
        flex-shrink: 0;
    }
    .commentdetail-main{
        flex-grow: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
    }
.divider{
  width: 100%;
  height: 0.5rem;
  background-color: #f6f6f6;
  line-height: 0.5rem;
  padding-left: 0.2rem;
}
 /*删除样式*/
    .delete-popup{
         width: 90%;
    }
    .delete-popup-box{
        height: 0.7rem;
        line-height: 0.7rem;
        font-size:0.3rem;
        background: #fff;
        z-index: 9999;
        margin: 0 auto;
        box-sizing: border-box;
        padding-left: 10px;
    }
</style>