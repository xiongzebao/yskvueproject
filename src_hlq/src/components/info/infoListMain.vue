<template>
  <div id='infolistmain'>
      <div  class="header-container">
            <mt-header  title="资讯列表">
                  <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                  </router-link>
            </mt-header>                  
            <section class="slidebar">
				  <div class="slideitem-container">
						<div  v-for="(item, index) in slideitems"  :id='idstr+index' class="slideitem" :data-index='index' :data-item="item.typeName" @click = 'clickItem($event)' >
						  {{item.typeName}}

						</div>
				  </div>
            </section>

      </div>
      <section  id="infolistsection">
         <keep-alive>
              <infoList ref=infolist></infoList>
         </keep-alive>
      </section>
     
  </div>

</template>


<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
//import { Navbar, TabItem } from 'mint-ui';
//import { TabContainer, TabContainerItem } from 'mint-ui';
//import { Cell } from 'mint-ui';

//import infoDetail from './infoDetail.vue'
import infoList from './infoList.vue'
//import CommentList from './CommentList'
import utils from '../../../static/scripts/utils.js'
//import VueAwesomeSwiper from 'vue-awesome-swiper'
   
   




export default {
  name: 'app',
  beforeCreated(){
 
  },
  mounted(){
    console.log("mounted infomain");
      this.curIndex = window.typeIndex;
    
      this.getItemList();

  },
  computed:{

    idstr:function(){
      return  'slideitem';
    },
	   swiper() {
            return this.$refs.mySwiper.swiper
          }
  
  
  },
  data(){
    return{
   
      selected:'',
      content:'内容' ,
      // slideitems:[{'typeName':'最新活动0'},{'typeName':'留学咨询1'},{'typeName':'艺考芝兰2'},{'typeName':'名是讲团3'},{'typeName':'鲁豫有约4'},{'typeName':'小城故事5'},{'typeName':'少年传奇6'},{'typeName':'百事将团7'},{'typeName':'少年传奇8'},{'typeName':'百事将团9'},{'typeName':'少年传奇10'},{'typeName':'百事将团11'},{'typeName':'少年传奇12'},{'typeName':'百事将团13'},{'typeName':'少年传奇14'},{'typeName':'百事将团15'}],
      slideitems:[],
      curSelectDom:'',
      curIndex:0,
      scrolllength:0,//滚动的位置长度
     // itemWidth:'',
       itemsdom:[],
      screenWidth:'',
      scrollbarWidth:'',//tabbar 长度
	  /* 轮播设置*/
                swiperOption: {
                  autoplayDisableOnInteraction:false,
                  notNextTick: true,
                  debugger: true,
				  slidesPerView: 4
                  },

    }

  },
  methods:{



    init(){
        this.scrollbarWidth = $('.slideitem-container')[0].scrollWidth;
        this.itemWidth = this.scrollbarWidth/this.slideitems.length;
        this.screenWidth = $(window).width();

         var liitems= $('.slideitem-container').children();
         this.itemsdom = liitems;
       //  console.log(liitems);
         let  slideWidth=0;
         for (var i = 0; i < liitems.length; i++) {
            slideWidth+=liitems[i].offsetWidth;
         }
         console.log(slideWidth);
        this.scrollbarWidth = slideWidth+40;
       $('.slideitem-container').css('width', this.scrollbarWidth);


       $('.slidebar').scrollLeft(window.slidebarScrollwidth);
        




        var li= $('.slideitem-container').children().first();
        li.addClass('slideitem1');
        this.curSelectDom = li;

        let _this = this;
        $("#infolistsection").swipeRight(function(){ 
            _this.swipeRight();
       });
        $("#infolistsection").swipeLeft(function(){
            _this.swipeLeft();
       });
    },
  
    getItemList(){
      let url = 'hulaquan,/api/m/info/v3/infoTypes.htm';
      let param = {};
      let _this = this;
      window.ajaxMethod.doAjax(url,param,function(data){
          if(data.success){
               _this.slideitems = data.datas.list;
              
               _this.$nextTick(function(){
                        _this.init();
                        _this.goToIndicator(_this.curIndex);
                });
              
          }else{
              alert(data.message);
          }
       });
    },


   swipeRight(){
          if(this.curIndex<=0){
            console.log(" swipeRight return");
            return;
          }
            this.curIndex--; 
        let scrollwidth = this.getCurrentScrollWidth();
        // if(scrollwidth<=this.screenWidth){
             console.log("swipe right");
             if(this.curIndex>=1){
              $('.slidebar').scrollLeft(scrollwidth-this.itemsdom[this.curIndex-1].offsetWidth);
             }else{
               $('.slidebar').scrollLeft(scrollwidth-this.itemsdom[this.curIndex].offsetWidth);
             }
             
             
        // }
         
           this.goToIndicator(this.curIndex);
    },

    swipeLeft(){
      if(this.curIndex>=this.slideitems.length-1){
        console.log(" swipeLeft return");
        return;
      }
      console.log("swipe left");
      this.curIndex++;
      let scrollwidth = this.getCurrentScrollWidth();
      console.log(scrollwidth);
      if(scrollwidth>this.screenWidth){
           console.log("swipe right");
             $('.slidebar').scrollLeft(scrollwidth);
      }
      this.goToIndicator(this.curIndex);
    },

    getCurrentScrollWidth(){
      let width = 0;
      for (var i=0; i<=this.curIndex; i++) {
         width += this.itemsdom[i].offsetWidth;
      }
      return width;
    },

    clickItem(e){
       let index = e.target.dataset.index;
       this.curIndex = index;
       this.scrolllength = index*this.itemWidth;
       console.log(typeof(this.scrolllength));
       console.log(this.itemWidth);
       console.log(this.scrolllength);
       this.goToIndicator(index);
    },

    goToIndicator(index){
      let indicator = $("#"+this.idstr+index);
      this.curSelectDom.removeClass('selected');
      this.curSelectDom.removeClass('slideitem1');
      indicator.addClass('selected');
      indicator.addClass('slideitem1');
      this.curSelectDom = indicator;
      //console.log(this.slideitems[index].typeID);
      window.typeIndex = index;
      window.slidebarScrollwidth = $('.slidebar').scrollLeft();
      this.$refs.infolist.showlist(this.slideitems[index].typeID);

    }
   
  },
  components:{
   // infoDetail,
    infoList,
   // CommentList
  }
}
</script>

<style type="text/css" scoped >
	
html,body{
    width: 100%;
    height: 100%; 
}
/*
#app{
    width: 100%;
    height: 100%;
}
	#infolistmain{
		width: 100%;
		
	}
#infolistmain ::-webkit-scrollbar{
  display:none;
}
.slideitem{
  min-width: 1.2rem;
  margin: 0 0.1rem;
  margin-top: .15rem;
}

.slideitem:active{
 // background-color: #0f0;
  
}



.slidebar{
  width: 100%;
  overflow: hidden;
  color: #606060;
  height: 0.8rem;

}

.slideitem-container{
    overflow-x:auto;
    display: flex;
    background-color: #f9f9f9;
    height: 100%;
}
.selected{
   
  border-bottom:thick solid #ff0000;
  border-bottom-width: 0.1rem;
   border-bottom-height:1rem;
}
 

.slideitem1:after {
    background-color: #2ebdff;
    content: " ";
    display: block;
    height: 0.12rem;
    overflow: hidden;
    width: 50%;
    margin: auto;
    margin-top: 0.12rem;
    }
.slideitem1{
  color: #2ebdff;
}


#infolistmain .header-container{
  z-index: 9999;
  position: absolute;
  width: 100%;
  background-color: #fff;
}

*/

//zhe
#infolistmain{
    width: 100%;
    
  }
#infolistmain ::-webkit-scrollbar{
  display:none;
}

#infolistmain .slideitem{
  margin-top: .15rem;
  padding: 0 0.18rem;
  float: left;
}

#infolistmain .slideitem:active{
 // background-color: #0f0;
  
}
#infolistmain .slidebar{
  width: 100%;
  overflow-x: auto;
  color: #606060;
   background-color: #f9f9f9;
  height: 0.95rem;
}

#infolistmain .slideitem-container{

    background-color: #f9f9f9;
    height: 1rem;
    overflow: auto;
}
  #infolistmain .emotionSwiper-slide{
    text-align: center;
  }
#infolistmain .selected{
  
/*  border-bottom:thick solid #ff0000;
  border-bottom-width: 0.1rem;
   border-bottom-height:1rem;*/
    font-size: 0.345rem;
}
 

.slideitem1:after {
    font-size: 0.345rem;
    background-color: #2ebdff;
    content: " ";
    display: block;
    height: 0.05rem;
    width: 0.6rem;
    margin: auto;
    margin-top: 0.1rem;

    }
#infolistmain .slideitem1{
  color: #2ebdff;
}

#infolistmain .header-container{
  z-index: 9999;
  position: absolute;
  width: 100%;
  background-color: #fff;
}

a{

  display: block;
}

 a:active{
  
  background-color: #eee;
 }
 

</style>