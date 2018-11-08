<template>
	<div id = "commitpart">

          <mt-button type="primary"    @click.native = "btnmodify" id="modify-container" v-if="showModifyBtn">修改</mt-button>
          
          <div class="bottom-submit-container" v-if="showCommitBtn">
	          <div class="flexcenter">  
			        <mt-checklist
					  v-model="hasReadList"
					  :options="options">
					</mt-checklist>
	           		<div id="notice" @click = "showNotice">《志愿填报须知》</div>
	           </div>
           <mt-button type="primary"  size="large" @click.native = "btncommit" v-if="showCommitBtn">确定</mt-button>
        </div>

	</div>

</template>


<script type="text/javascript">
import Vue from 'vue'
import VueBus from 'vue-bus';
Vue.use(VueBus);

import { Button } from 'mint-ui';
import { Checklist } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Toast } from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.component(Checklist.name, Checklist);
Vue.component(Button.name, Button);


	export default{
		props:["item"],
		mounted(){
			this.$bus.on("commited",this.wishCommited);
			this.options = [
			  {
			    label: '我已阅读',
			    value: "read"
			  }];
			this.hasRead=false;
			this.myitem = this.item.datas;


			 if(this.myitem.examCtrl.volunApplyStatus == 2){
			 		if(this.myitem.examWishList.length==0){
						this.showCommitBtn = true;
					}else {
				 		this.showModifyBtn = true;

				 		 if(this.myitem.isShowScore){
						 	if(this.myitem.wishStudent!=null&&this.myitem.wishStudent.wishStat == 1){//这里还有点问题
					 	 		this.showModifyBtn = false;
							}else{
								this.showModifyBtn = true;
							}
			  			}

					}
			 }else{
			 	this.showCommitBtn = false;
			 	this.showModifyBtn = false;
			 }	
			 
		},

		data(){
			return{
			   myitem:"",
			   hasRead:"",
			   hasReadList:[],
			   options:[],
			   showCommitBtn:false,//默认都不显示
			   showModifyBtn:false,
			   isClicked:false//控制不能重复提交
			}

		},
		methods:{
			showNotice(){
				MessageBox({
				  title: '志愿填报须知',
				  message: '<div id="mymsgbox">'+this.myitem.wishNote+'</div>',
				  showCancelButton: false,
				});
			},	
			
			btncommit(){
				if(this.isClicked){
					return;
				}
			
				 if(this.hasReadList[0]!="read"){
				 	Toast("请阅读志愿填报须知并且勾选我已阅读！");
				 	return;
				 }

				 this.$bus.emit("wishCommitToDetail");
				 this.isClicked = true;
				
			},

			btnmodify(){
			
				this.hasReadList=[];
				this.showCommitBtn=true;
				this.showModifyBtn = false;
				this.$bus.emit("wishModify");
			},
			wishCommited(){
			
			
				this.isClicked = false;

			}

		}


	}


</script>

<style type="text/css"  >

#mymsgbox{
	max-height: 6rem;
	overflow-y: auto;
	color: #000;
}

.mint-msgbox-title{
	color: #26a2ff;
}

#commitpart .mint-popup-right{
	overflow-y:auto;
}
#commitpart{
	position: relative;
}

#modify-container{
	 position: absolute;
	 right: 0.3rem;
}
 
 #commitpart .mint-button--large{
 	width: 80%;
 	 margin:auto;

 }

.bottom-submit-container{
	width: 100%;
	position: static;
	bottom: 0px;
	background-color: #aaa;
	text-align:center;
  
	font-size: 0.25rem; 
	margin-top: 0.5rem;
	padding-bottom: 0.3rem;
}

#btn-submit{
 width: 80%;
 height:1rem; 
 
 background-color: #999 ;
 margin:auto;
 margin-bottom:0.133rem; 
 margin-top:0.4rem; 
 color:#fff;
 border-radius: 10px;
 font-size: 0.45rem;
}

#checkbox-isread{
	width: 0.533rem;
	height: 0.533rem; 

}
.flexcenter {
	 height: 1rem;
	 line-height: 1rem;
	 overflow:hidden;
	 margin-left: 0.3rem;
}
#notice{
	display:block;
	font-size:0.25rem;
	float: left;
	height: 100%;
	color: #26a2ff;
	//color:red;
	/*
	
	 position: absolute;
     left: 0;
     right: 0;
     bottom: 0;
     top:0;
     margin: auto; */
   
}

#empty-item{
	height: 2.4rem; 
	width: 100%;
}


#modify-a{
   display:inline-block;
   margin-left:70%;
   text-decoration:underline;
   color:#fff;
   background:#37B6EB;
   padding: .15rem .3rem;
    font-size: .35rem;
    border-radius: 8px;
  text-decoration:none;
}



#commitpart  .mint-cell-wrapper {
    background-image: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
    background-image: linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
}
#commitpart .bottom-submit-container .flexcenter .mint-checklist .mint-cell:last-child{
 	background-image: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
    background-image: linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0) 50%,transparent 0);
     
    }

    #commitpart .flexcenter .mint-checklist {
    	display: inline-block;
    	 float: left;

    }
	 #commitpart .flexcenter .mint-checklist .mint-checklist-title{
	 	display: none;
	 }

 
	 
</style>