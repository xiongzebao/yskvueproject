
<template>
  <div id='activelist'>
 
    <scroller 
     :on-refresh='refresh'
    :on-infinite="infinite"
    :noDataText='nodatatext'
    class='scroller'
    ref="myScroller"
    >
        <div v-for="(item,index) in list">
            <Item :item='list[index]'></Item>
             <div class="active-divider"></div>
        </div>
      
    </scroller>

  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import Item from './activeItem';
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
  
  },

  data(){
    return{


      //以下是框架固定不变的数据
      list:[],
      nodatatext:"没有更多了",
      nextPage:1,
      totalPage:1,
      isRefresh:false,
    }

  },
  methods:{

 
  

    loadData(success,fail){
      
       let url = 'advert,/api/m/adv/active/v3/actives.htm';
       let param = {curPage:this.nextPage};

       //加载数据只用改变以上两条
       let _this = this;
       window.ajaxMethod.doAjax(url,param,function(data){
         if(data.success){
              success(data.datas)
         }else{
             fail();
         }
         
       },fail);
    },

    /* 以下是框架固定不变的函数，不要更改*/
    getData(done){
          if(this.isRefresh){
            let tlist=[];
            this.nextPage = 1;
            let _this = this;
            this.loadData(function(data){
               console.log(data);
                _this.totalPage = data.page.totalPage;
                _this.list = data.list;
                _this.nextPage++;
                if(done){
                   done();
                }
              
            },done);   
          }else{
                 console.log("加载更多");
                let _this = this;
                this.loadData(function(data){
                  console.log(data);
                _this.totalPage = data.page.totalPage;
                _this.list = _this.list.concat(data.list);
                _this.nextPage++;
                if(done){
                   console.log("done");
                   done();
                }
            },done);
          }
    },


    refresh(done){
       console.log("refresh");
        let _this = this;
          setTimeout(() => {
            _this.isRefresh = true;
            _this.getData(done);
           
          }, 1000);
    },

    infinite(done) {
      console.log("infifn");
      this.isRefresh = false;
      if (this.nextPage > this.totalPage){
          setTimeout(() => {
            done(true)
          }, 1000)
          return;
        }

        setTimeout(() => {
          setTimeout(() => {
            console.log("loadmore data");
              this.getData(done);
             // done();
          })
        }, 1000);
      },

  },


  components:{
    Item

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
 
}

.active-divider{
  height: 0.24rem;
  width: 100%;
  background-color: #f9f9f9;
}

 .no-data-text{
  font-size: 0.3rem;
}


</style>