<template>
    <div class='inforReview'>
            <p class='inforReview-total'>评论({{totalComit}})</p>
            <template v-for='inforcom in inforeviewlist'>
                <div class="inforReview-list">
                    <div class="inforReview-review">
                        <div class="inforReview-review-logo" @click='userInfor'>
                           <div class="inforReview-review-logo-box">
                              <template v-if='inforcom.userExtendInfo.logo'>
                                  <img :src="inforcom.userExtendInfo.logo" alt="用户头像">
                              </template>
                              <template v-else>
                                  <img src="../../../static/images/writingsShare/share-logo.png" alt="用户头像">
                              </template>
                               <template v-if='inforcom.userExtendInfo.identifyFlag==1'>
                              	<img src="../../../static/images/writingsShare/ic_vip.png" alt="等级" class="inforReview-review-logo-box-gra"> 
                              </template> 
                           </div>

                        </div>
                        <div class="inforReview-review-user" ref='deletedom'
                        :reviewID="inforcom.reviewID"
                        :reviewer="inforcom.reviewer" @click.prevent.stop="$emit('replaycom', {reviewID:inforcom.reviewID,nickName:inforcom.userExtendInfo.nickName,reviewer:inforcom.reviewer})"
                         >
                             
                                   <div class="inforReview-review-user-info">
                                    <span class="inforReview-review-user-nick">{{inforcom.userExtendInfo.nickName}}</span>
                                    <template v-if='inforcom.userExtendInfo.identifyFlag==1'>
                                        <template v-if='inforcom.userExtendInfo.userGrade==1'>
                                            <span class="inforReview-review-user-bz"> <img src="../../../static/images/writingsShare/v1.png" alt="等级"></span>
                                        </template>
                                        <template v-else-if='inforcom.userExtendInfo.userGrade==2'>
                                            <span class="inforReview-review-user-bz"><img src="../../../static/images/writingsShare/v2.png" alt="等级"></span>
                                        </template>
                                        <template v-else-if='inforcom.userExtendInfo.userGrade==3'>
                                            <span class="inforReview-review-user-bz"><img src="../../../static/images/writingsShare/v3.png" alt="等级"></span>
                                        </template>
                                        <template v-else>
                                            <span class="inforReview-review-user-bz"><img src="../../../static/images/writingsShare/v1.png" alt="等级"></span>
                                        </template>
                                    </template>
<!--
                                    <span class="inforReview-review-user-bz">
                                        <img src="../../../static/images/active/hot.png" alt="">
                                    </span>
-->
                                    <span class="inforReview-review-user-xj">{{inforcom.userExtendInfo.userFlagStr}}</span>
                                    <span class="inforReview-review-user-sch">
                                    {{inforcom.userExtendInfo.schoolName}}</span>
                                </div>
                                    <div class="inforReview-review-user-time">{{inforcom.timestampStr}}</div>
                                    <div class="inforReview-review-user-com">
                                    <template v-for='emolist in analysis(inforcom.content)'>
                                    	<template v-if='emolist.isImg'>
                                    	
                                    		<img :src='"../../../static/images/emoImg/"+emolist.value+".png"' />
                                    	</template>
                                    	<template v-else>
                                    			<template v-if='emolist.phrase'>{{emolist.phrase}}</template>
                                    		
                                    	</template>
                                    </template>
                                    </div>

                                
                        </div>
                </div>
                    <template v-if=' inforcom.reviewList&&inforcom.reviewList.length'>
                           <section class="inforReview-more" @click='replyDetail(inforcom)'>
                           
                          <div class="inforReview-more-list" v-for=' recom in inforcom.reviewList'>
                           <div class="inforReview-more-list-userinfo">
                               <div class="inforReview-review-logo">
                               <div class="inforReview-review-more-logo-box">
                                   <img :src="recom.userExtendInfo.logo" alt="用户头像">
                               </div>
                            </div>
                            <div class="inforReview-more-user">
                                <div class="inforReview-more-user-info">
                                    <span class="inforReview-more-user-rep">{{recom.reviewerName}}</span>
                                    <span class="inforReview-more-user-note">回复</span>
                                    <span class="inforReview-more-user-ply">{{recom.beReplayUserName}}</span>
                                </div>
                                <div class="inforReview-review-user-time">{{recom.timestampStr}}</div>
                                <div class="inforReview-review-user-com">

                                	<template v-for='emolist in analysis(recom.content)'>
                                    	<template v-if='emolist.isImg'>
                                    		<img :src='"../../../static/images/emoImg/"+emolist.value+".png"' />
                                    	</template>
                                    	<template v-else>
                                    		<template v-if='emolist.phrase'>{{emolist.phrase}}</template>
                                    		
                                    	</template>
                                    </template>

                                </div>
                            </div>
                           </div>   
                        </div>
                         <template v-if='inforcom.reviewList.length>=2'>
                             <div class="inforReview-more-show">
                                <span>查看更多</span>
                             </div>
                         </template>    
                    </section>
                    </template>
                    
            </div> 
            </template>
                 
    </div>
</template>

<script>
    const emotionsData = require('./comment/emotions.json');
    import Vue from 'vue';
     import { Toast } from 'mint-ui'; 
    export default {
        name:'inforReview',
        props:['inforIdProp'],
        data () {
            return {
                inforId:"",/*记录资讯id*/
                inforeviewlist:'',
                totalComit:''/*评论总数*/
            }
        },
        mounted(){
			var value = '[] []';
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
			 console.log(arrBase)
            this.inforId=this.inforIdProp;
            this.fixdata();
			/*长按事件处理*/
		   let length=$('.inforReview-review-user').length;
		   let newLength='';
		   let that=this;
		   let timer=setInterval(function(){
			    newLength=$('.inforReview-review-user').length;
			   if(newLength&&newLength==length){
//				   console.log($('.inforReview-review-user'));
				   $('.inforReview-review-user').longTap(function(){
					 
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
        /*提示信息*/
         toast(mesg){
             Toast({
                  message: mesg,
                  position: 'middle',
                  duration: 3000
                });
         },
        methods:{
		    replyDetail(val){
            window.infoDetailscrollTop =  $('.information-main').scrollTop();
            console.log("replyDetail");
            console.log(window.infoDetailscrollTop);
            this.$router.push({path:'/commentDetail',query:{item:val}});

          },
            longtouchWay(val){
               this.$emit('longTouchEvent',val)
            },
			userInfor(){
				let userId=String(yksapp_user.getUserId());
				yksapp.goPageWithParams('userIndex',userId);
			},
            fixdata(){
              
              let param = {infoID:this.inforId,curPage:1};
              let that = this;
              ajaxMethod.doAjax("hulaquan,/api/m/info/review/waterfall_query.htm",param,function(database){        
                 if(database.success){
                     if(database.datas.list){
                          that.inforeviewlist = database.datas.list;
                          /*计算总数*/
                         that.totalComit=0;
                         for(let index in that.inforeviewlist){
                             that.totalComit++;
                             for (let indexJ in that.inforeviewlist[index].reviewList){
                                 that.totalComit++;
                             }
                             
                         }

                        //评论加载完成滚动
                        that.$nextTick(function(){
                        console.log("nextTick");
                        if(window.infoDetailscrollTop){
                          console.log(window.infoDetailscrollTop);
                          console.log("commentlist...............");
                           $('.information-main').scrollTop(window.infoDetailscrollTop);
                        }
                        });
                        } 


                  }else{
                      that.toast(database.message);
                  }
               });
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
	.inforReview{
      -webkit-touch-callout:none; /*系统默认菜单被禁用*/
	  user-select:none;
}
    .inforReview{
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 0.3rem;
        color: #000;
    }
    .inforReview-total{
        height: 0.7rem;
        line-height: 0.7rem;
    }
    .inforReview-list{
        border-bottom: 1px solid #fafafa;
        padding: 10px 0;
    }
    .inforReview-review,.inforReview-more-list-userinfo{
            display:flex;
    }
    .inforReview-review-logo{
      	flex-shrink: 0;
        padding-right: 0.04rem;
        
    }
    .inforReview-review-logo-box{
        width: 0.86rem;
        height: 0.86rem;
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
    .inforReview-review-more-logo-box{
        width: 0.7rem;
        height: 0.7rem;
    }
    .inforReview-review-logo-box img,.inforReview-review-more-logo-box img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .inforReview-review-user{
        user-select:none;
		flex-grow: 1;
    }
    .inforReview-review-user-info{
/*
        display: flex;
        flex-wrap: nowrap;
		align-items: center;
*/
    }
	.inforReview-review-user-info span{margin: 0 2px;}
	.inforReview-review-user-info:after{
		display: block;
		content: "";
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.inforReview-review-user-nick{
/*		flex: 4;*/
		max-width: 40%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		float: left;
	}
	.inforReview-review-user-bz{
/*		flex: 1;*/
		width: 10%;
	}
	.inforReview-review-user-bz img{
		width: 29px;
		height:17px;
	}
    .inforReview-review-user-info span{
/*        display: inline-block;*/
/*        padding: 0 2px;*/
    }
    .inforReview-review-user-xj{
        background-color: #01f9dd;
        color: #fff;
        border-radius: 2px;
        font-size:0.15rem;
/*		flex: 1;*/
		width: 10%;
    }
    .inforReview-review-user-sch{
        font-size:0.15rem;
        color: #fdd98c;
/*		flex: 4;*/
		width: 40%;
    }
    .inforReview-review-user-time{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.15rem;
        color: #adadad;
    }
    .inforReview-review-user-com{
        word-break: break-all;
        font-size: 0.3rem;
        padding-bottom: 0.25rem;
    }
	.inforReview-review-user-com img{
		width: 0.6rem;
		height: 0.6rem;
	}
    .inforReview-more{
        overflow: hidden;
        display: block;
        color: #2c3e50;
        font-size: 0.2rem;
    }
    .inforReview-more-show{
       overflow: hidden;
    }
    .inforReview-more-show span{
        float: right;
        padding: 5px 0;
    }
    .inforReview-more-user-info{
        font-size: 0.2rem;
         color: #476a86;
        
    }
    .inforReview-more-user-info span{
        padding: 0 2px;
		
    }
    .inforReview-more-user-note{
        color: #adadad;
    }
    .inforReview-more-list{
        padding-left:0.9rem;
        box-sizing: border-box;
    }
</style>