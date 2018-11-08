<template>
    <div :class="['emotionSwiper',isEmotionShow?'emotionSwiper-havemotion':'']" @click='clickEvent($event)'>
       <div class="emotionSwiper-top">
          <div class="emotionSwiper-top-user">
             <textarea  :placeholder="placehodnote" :class="['emotionSwiper-top-user-input',userCommentFil?'emotionSwiper-top-user-input-send':'']" v-model='userComment' @focus='userInput'></textarea>

          </div>
          <div class='iconfont icon-pinglun emotionSwiper-top-emotion' @click='emotionChange'></div>
          <template v-if='userCommentFil'>
              <div class="emotionSwiper-top-send emotionSwiper-top-send-able" @click.prevent.stop="$emit('emousersend', userCommentFil)">发送</div>
          </template>
          <template v-else>
              <div class="emotionSwiper-top-send">发送</div>
          </template>          
       </div>
       <template v-show='isEmotionShow'>
            <swiper :options="swiperOption" ref="mySwiper">
               <template v-for='list in emotionSource'>
                   <swiper-slide class='emotionSwiper-slide'>
                       <template v-for='listData in list'>
                           <div  @click.prevent.stop="emochange(listData)" class='emotionSwiper-emotion'>
                               <img :src="'./static/images/emoImg/'+listData.value+'.png'" >
                           </div>
                       </template>
                   </swiper-slide>
                </template>
            </swiper>
       </template>
       
    </div>
</template>
<style>
    /*输入样式*/
    .emotionSwiper{
        flex-shrink: 0;
        height: 0.9rem;
		
    }
	.swiper-wrapper{
		display: flex;
	}
    .emotionSwiper-havemotion{
        height: 200px;
    }
    .emotionSwiper-top{
        padding: 0.1rem 10px;
        box-sizing: border-box;
        background-color: #fff;
    }
    .emotionSwiper-top:after{
        content: "";
        display: block;
        height:0;
        clear:both;
    }
    .emotionSwiper-top-user{
         height: 0.7rem;
         width: 70%;
        float: left;
    }
    .emotionSwiper-top-user-input{
        width: 100%;
        border: 0;
        height: 0.7rem;
        padding: 0.2rem;
        border-bottom: 1px solid #f4f4f4;
        font-size: 0.3rem;
		overflow: hidden;
		box-sizing: border-box;
    }
    .emotionSwiper-top-user-input-send{
        border-bottom-color:#38bde9; 
    }
    .emotionSwiper-top-emotion{
        float: left;
        text-align: center;
        color: #38bde9;
    }
    .emotionSwiper-top-send{
        float: right;
        background-color: #dddddd;
        color: #fff;
        text-align: center;
        border-radius: 5px;
    }
    .emotionSwiper-top-send-able{
        background-color: #38bde9;
    }
    .emotionSwiper-top-emotion,.emotionSwiper-top-send{
         height: 0.7rem;
        line-height: 0.7rem;
        width:15%;
    }
    .emotionSwiper-slide{
        padding: 10px;
		box-sizing: border-box;
		height: 160px;
		overflow-y: auto;
		
    }
	.emotionSwiper-slide:after{
		content: "";
		display: block;
		height: 0;
		clear: both;
		overflow: hidden;
	}
    .emotionSwiper-emotion{
       	float: left;
		width: 30px;
		height: 30px;
        padding: 5px;
    }
	.emotionSwiper-emotion img{
		height: 100%;
		width: 100%;
	}
/*
    .swiper-container{
        margin: 10px 0;
    }
*/
</style>
<script>
    import Vue from 'vue'
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    const emotionsData = require('./emotions.json');
    Vue.use(VueAwesomeSwiper)
    export default {
        name:'emotionSwiper',
        props:['placehodnote'],
        data(){
            return {
                
                emotionSource:[],
                userComment:'',/*用户输入*/
                isEmotionShow:false,
               /* 轮播设置*/
                swiperOption: {
                  autoplayDisableOnInteraction:false,
                  notNextTick: true,
                  debugger: true
                  },
            }
        },
        watch:{
           
        },
         computed: {
          swiper() {
            return this.$refs.mySwiper.swiper
          },
        /*处理用户输入*/
          userCommentFil(){
              var  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            
                  return ((this.userComment+"").replace( rtrim, "" ));
             
          }
       },
        methods:{
            emochange(emo){
                this.userComment=this.userComment+emo.phrase;
            },
			clickEvent(val){
				if (event.target.nodeName == 'TEXTAREA') {
					document.querySelector(".emotionSwiper-top-user-input").scrollIntoView(false); 
				}
			},
            /*初始化数据*/
            emoInitData(){
                this.userComment='';
                this.isEmotionShow=false;
                
            },
//            userSend(){
//                
//            },
            /*表情处理*/
            emotionChange(){
				let width=document.documentElement.clientWidth;
				let len=$('.emotionSwiper-slide').length;
				console.log(width,len)
				$('.swiper-wrapper').css({width:width*len})
                this.isEmotionShow=!this.isEmotionShow;
            },
            userInput(){
                this.isEmotionShow=false;
            }
        },
        mounted(){
            let emotionsDataArr=emotionsData.data;
            /*分类后的数据*/
            let emotionKindArr=[];
			let index=30;/*每个页面显示的表情数量*/
			let loopTime=Math.ceil(emotionsDataArr.length/index);/*循环次数*/
			
            for(var i = 0; i < loopTime; i++){
				let arr=[];
               	for (var j=0;j<index;j++){
					if(emotionsDataArr[i*index+j]){
						arr.push(emotionsDataArr[i*index+j])
					}
					
				}
                emotionKindArr[i]=arr.slice(0);
            };
            this.emotionSource=emotionKindArr;
			
        }
    }
</script>