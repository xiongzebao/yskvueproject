<template>
     <div class='Infordetailcommit'>
            <template v-if='usercommit'>
             <div class="detailcommit">
                 <div class="inforReview-review-logo" @click='userInfor'>
                           <div class="inforReview-review-logo-box">

                              <template v-if='usercommit.userExtendInfo.logo'>
                                  <img :src="usercommit.userExtendInfo.logo" alt="用户头像">
                              </template>
                              <template v-else>
                                  <img src="../../../static/images/writingsShare/share-logo.png" alt="用户头像">
                              </template>  
							  <template v-if='usercommit.userExtendInfo.identifyFlag==1'>
                              	<img src="../../../static/images/writingsShare/ic_vip.png" alt="等级" class="inforReview-review-logo-box-gra"> 
                              </template> 
                           </div>

                        </div>
                 <div class="inforReview-review-user" @click.prevent.stop="$emit('initcomit')">
                                <div class="inforReview-review-user-info">
                                    <span class="inforReview-review-user-nick">{{usercommit.userExtendInfo.nickName}}</span>
                                    <template v-if='usercommit.userExtendInfo.identifyFlag==1'>
                                        <template v-if='usercommit.userExtendInfo.userGrade==1'>
                                            <span class="inforReview-review-user-bz">1级</span>
                                        </template>
                                        <template v-else-if='usercommit.userExtendInfo.userGrade==2'>
                                            <span class="inforReview-review-user-bz">2级</span>
                                        </template>
                                        <template v-else-if='usercommit.userExtendInfo.userGrade==3'>
                                            <span class="inforReview-review-user-bz">3级</span>
                                        </template>
                                        <template v-else>
                                            <span class="inforReview-review-user-bz">1级</span>
                                        </template>
                                    </template>
<!--
                                    <span class="inforReview-review-user-bz">
                                        <img src="../../../static/images/active/hot.png" alt="">
                                    </span>
-->
                                    <span class="inforReview-review-user-xj">{{usercommit.userExtendInfo.userFlagStr}}</span>
                                    <span class="inforReview-review-user-sch">
                                    {{usercommit.userExtendInfo.schoolName}}</span>
                                </div>
                                <div class="detailcommit-comit-list-time">{{usercommit.timestampStr}}</div>
                                <div class="detailcommit-comit-list-con">
                                	 <template v-for='emolist in analysis(usercommit.content)'>
                                    	<template v-if='emolist.isImg'>
                                    	
                                    		<img :src='"../../../static/images/emoImg/"+emolist.value+".png"' />
                                    	</template>
                                    	<template v-else>
                                    		<template v-if='emolist.phrase'>{{emolist.phrase}}</template>
                                    		
                                    	</template>
                                    </template>
                                </div>
                        </div>
             </div></template>
             <div class="detailcommit-comit">
                 <p class="detailcommit-comit-rep">回复({{commentlist.length}})</p>
                 <div class="detailcommit-comit-list" v-for=' comlist in commentlist'>
                     <div class="detailcommit-comit-list-logo">
                         <img :src="comlist.userExtendInfo.logo" alt="用户头像">
                     </div>
                    
                     <div class="detailcommit-comit-list-user" @click.prevent.stop="$emit('detailcommit',{reviewID:comlist.reviewID,nickName:comlist.userExtendInfo.nickName,reviewer:comlist.reviewer})"
                       :reviewID="comlist.reviewID"
                       :reviewer="comlist.reviewer"
                        >
                         <div class="inforReview-review-user-nick">{{comlist.reviewerName}}</div>
                         <div class="detailcommit-comit-list-time">{{comlist.timestampStr}}</div>
                         <div class="detailcommit-comit-list-con">
                             回复<span class="detailcommit-comit-list-byname">{{comlist.beReplayUserName}}:</span>
                             <span >
                             	 <template v-for='emolist in analysis(comlist.content)'>
                                    	<template v-if='emolist.isImg'>
                                    		<img :src='"../../../static/images/emoImg/"+emolist.value+".png"' />
                                    	</template>
                                    	<template v-else>
                                    		<template v-if='emolist.phrase'>{{emolist.phrase}}</template>
                                    	</template>
                                    </template>
                             </span>
                         </div>
                         
                     </div>
                 </div>
             </div>
    </div>
</template>

<script>
     const emotionsData = require('./comment/emotions.json');
    import { Toast } from 'mint-ui';
    import Vue from 'vue';
    export default {
        name:'Infordetailcommit',
        props:['usercommit','commentlist'],
        data () {
            return {
                commitData:'',/*评论数据*/
                reviewParentID:'',
                infoID:'',
				totalCom:''
               
                
            }
        },
        mounted(){
            this.reviewParentID=this.usercommit.reviewParentID;
            this.infoID=this.usercommit.infoID;
			/*长按事件处理*/
		   let length=$('.detailcommit-comit-list-user').length;
		   let newLength='';
		   let that=this;
		   let timer=setInterval(function(){
			    newLength=$('.detailcommit-comit-list-user').length;
			   if(newLength&&newLength==length){
				   $('.detailcommit-comit-list-user').longTap(function(){
					 
					   let reviewID=$(this).attr('reviewID');
					   let reviewer=$(this).attr('reviewer');
					   let data={
						  reviewID:reviewID,
						  reviewer:reviewer
					   };
					   that.$emit('longTouchEvent',data)
				   })
				   timer && clearInterval(timer)
			   }else{
				   length=newLength;
			   }
			   
		   },100)
        },
        methods:{
          toast(mesg){
             Toast({
                  message: mesg,
                  position: 'middle',
                  duration: 3000
                });
         },
		 userInfor(){
				let userId=String(yksapp_user.getUserId());
				yksapp.goPageWithParams('userIndex',userId);
			},
        longtouchWay(val){
               this.$emit('longTouchEvent',val)
            },
		
         analysis(obj) {
			 let dataArr=emotionsData.data;
             var value = String(obj||"");
			 let arrBase=[];
			 
			var valueReplace=value.replace(/\[.{1,3}\]/g,'$*$');
			let endAnch='';
			for(var i=0,len=value.length;i<len; ){
				let sta=valueReplace.indexOf('$*$',i);
				if(sta==-1){
					arrBase.push({phrase:value.slice(i)});
					break;
				}else{
					let first=value.slice(i,sta);
					endAnch=value.indexOf(']',sta);
					let two=value.slice(sta,endAnch+1);
					valueReplace=valueReplace.replace("$*$",two)
					arrBase.push({phrase:first});
					arrBase.push({phrase:two});
				}
				i=endAnch+1;
				
			}
			
            for(let j = 0,len=arrBase.length; j < len; j++) {
                  for(var z in dataArr){
						  if(arrBase[j].phrase){
							  if(arrBase[j].phrase!= dataArr[z].phrase){
									  arrBase[j].isImg=false;
								  	  
								   	 
							  }else{
									arrBase[j].value=dataArr[j].value;
									arrBase[j].isImg=true;
								  	
									break ;
								}
						  }
                      }
                    }
            	return arrBase

            }
           
        },
        components: {
        }
    }
</script>

<style scoped>
    .Infordetailcommit{
        padding: 0 10px;
        font-size: 0.3rem;
        padding-bottom: 200px;
    }
    .detailcommit,.detailcommit-comit-list{
        display: flex;
    }
    .detailcommit-comit-list{
        padding: 10px 0;
    }
    .inforReview-review-logo-box{
        width: 0.86rem;
        height: 0.86rem;
        margin-right: 0.04rem;
		flex-shrink: 0;
		position: relative;
    }
	.inforReview-review-logo-box .inforReview-review-logo-box-gra{
		position: absolute;
		right: 0;
		bottom: 0;
		width:12px;
		height:12px;
		border-radius: 100%;
	}
	.detailcommit-comit-list-logo{
		width:0.7rem;
		height: 0.7rem;
		margin-right: 0.04rem;
		flex-shrink: 0;
	}
    .inforReview-review-logo-box img,.detailcommit-comit-list-logo img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .detailcommit-comit-list-time{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.15rem;
        color: #adadad;
    }
    .inforReview-review-user-nick{
        color: #000;
        
    }
    .detailcommit-comit-list-byname{
         color: #475f8f;
         padding: 0 5px;
    }
    .detailcommit-comit-list-con{
        word-break: break-all;
        padding-bottom: 0.25rem;
    }
	.detailcommit-comit-list-con img{
		width: 0.6rem;
		height: 0.6rem;
	}
    .inforReview-review-user-xj{
        background-color: #01f9dd;
        color: #fff;
        border-radius: 2px;
        font-size:0.15rem;
    }
    .inforReview-review-user-bz{
        width: 0.58rem;
        height: 0.3rem;
    }
    .inforReview-review-user-bz img{
         width: 100%;
         height: 100%;
    }
    .inforReview-review-user-sch{
        font-size:0.15rem;
        color: #fdd98c;
    }
    .detailcommit-comit-list-user{
        user-select:none;
		flex-grow: 1;
    }
   
</style>