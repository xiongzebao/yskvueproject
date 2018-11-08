
<template>
  <div id='infolist'>
 
  <div style="height: 1.5rem;"></div>
  <scroller 
   :on-refresh='refresh'
  :on-infinite="infinite"
  :noDataText='nodatanote'
  class='scroller'
  ref="myScroller"
  >
  <!--    <div style="height: 1.5rem;"></div> -->
      <div v-for="(item,index) in list">
       <!--   <router-link :to="{path:'/infoDetail',query:{infoID:item.infoID}}" class='item-container'>
             <Item :item='list[index]'></Item>
         </router-link>
 -->
          <Item :item='list[index]'></Item>
      </div>
    
    </scroller>

  </div>

</template>


<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import Item from './infoItem';
import infoDetail from './infoDetail';
import VueScroller from 'vue-scroller';
Vue.use(VueScroller);



export default {

  name: 'app',
  beforeCreated(){
 
  },
  mounted(){
    console.log("mounted in infolist");


  },
  computed:{
    nodatanote:function(){
      if(this.list.length==0){
        return "暂无资讯";
      }else{
        return "没有更多数据了";
      }
    }
  
  
  },
  data(){
    return{
      // list:[{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},{title:'这是一个标题',author:'小熊',createdOnStr:'2017-7-29'},],
      list:[],
      category:"",
      nodatatext:"没有更多数据了",
      isShow:false,
      totalSize:0,
      curPage:1,
      nextPage:1,
      totalPage:1,
      typeid:'',

    }

  },
  methods:{
    showlist(typeid){
      this.typeid = typeid;
     this.resetData();
     this.getInfoList(typeid);
    },
    resetData(){
     // this.list=[];
      this.curPage=1;
      this.nextPage=1;
      this.nextPage=1;
    },

    getInfoList(typeID){
       if(typeID){
        let url = 'hulaquan,/api/m/info/query.htm';
        let param = {curPage:this.nextPage,typeID:typeID};
        //let param = {curPage:this.nextPage};
        let _this = this;
        window.ajaxMethod.doAjax(url,param,function(data){
          console.log(data);
        
          _this.totalPage = data.datas.page.totalPage;
           _this.curPage=data.datas.page.curPage;
           if(_this.curPage==1){
            _this.list=[];
           }
           _this.nextPage =  _this.curPage+1;
         _this.list= _this.list.concat(data.datas.list);
         });
      }
    },
    onCategory(param){
      this.category = param;

    },
    refresh(done){
        console.log('refresh');
        this.resetData();
        let _this = this;
          setTimeout(() => {
            _this.getInfoList(_this.typeid);
            done(false);
          }, 1500);
      
    },
    infinite(done) {
      if( this.nextPage==1){
       setTimeout(() => {
            done()
        }, 1000)
       return;
      }

        if (this.nextPage >this.totalPage){
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }

        var _this=this;

        setTimeout(() => {
           console.log("第一个tTimeOut");
           _this.getInfoList(_this.typeid);

          setTimeout(() => {
             console.log("第二个setTimeOut");
            done();
          },1000)
        }, 1500)


      },
  },

  components:{
    Item,
    infoDetail
  }
}
</script>

<style type="text/css"   >

#infolist{
  height: 100%;
  overflow-y: auto;
}
#infolist .item{
  color: #000;
  width: 1rem;
  height: 1rem;
}
#infolist .item-container{
  display: block;
  color: #000;

}
#infolist .scroller{
 // position: relative !important;
}

#infolist ._v-container{
  top:1.7rem;
}
a{

  display: block;
}

 a:active{
  
  background-color: #eee;
 }
 
</style>