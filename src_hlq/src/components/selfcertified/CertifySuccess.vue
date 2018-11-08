<template>
  <div class='identify-success'>
   		<mt-header title="身份认证" class='identityEnter-header'>
		  <div to="/" slot="left" v-tap="{ methods : onClosePage}">
			<mt-button icon="back"></mt-button>
		  </div>
		</mt-header>
   		<div class="identityEnter-main">
   			<div class="identify-auth-pri">
    		</div>
    		<div class="identify-success-main">
    				<div class="success-main-note">
    					<div class="success-main-note-icon iconfont icon-dui">
    						
    					</div>
    					<p class="success-main-note-type">我是{{kindNote}}</p>
    					<p class="success-main-note-status">认证成功</p>
    				</div>
    		</div>
<!--    		<incertifynote v-if="grade==4"></incertifynote>-->
   		</div>
	  		
	  	
</div>
</template>


<script>
 import Vue from 'vue'
 import { MessageBox } from 'mint-ui';
 import incertifynote  from './InCertifyNote'

export default {
  name: 'identifySuccess',
  props:['grade'],
   data(){
    return{
      	kindNote:'',
    }

  },
  mounted(){
	  this.fixdata(this.grade);
  }, 
  methods:{
	 onClosePage(){
		 yksapp.closeWebPage();
	 },
   	 fixdata(id){
		 if(id){
			 if(id==1){
				 this.kindNote='高一学生';
				 return ; 
			 }
			if(id==2){
				 this.kindNote='高二学生';
				 return ; 
			 }
			if(id==3){
				 this.kindNote='高三学生';
				 return ; 
			 }
			if(id==4){
				 this.kindNote='大学生';
				 return ; 
			 }
			if(id==5){
				 this.kindNote='家长';
				 return ; 
			 }
		 }
	 }
  },
  components:{
	  incertifynote
  }
}
</script>

<style type="text/css" scoped>
	.identify-success-main{
		padding-top: 0.52rem;
		padding-bottom: 1.5rem;
	}
	.success-main-note-icon{
		width: 2.1rem;
		height: 2.1rem;
		font-size: 1rem;
		margin: 0 auto 0.48rem;
		text-align: center;
        line-height: 2.1rem;
		color: #fff;
		background-color: #2ebdff;
	border-radius: 100%;
	}
	.success-main-note p{
		text-align: center;
		font-size: 0.32rem;
		height: 0.48rem;
		line-height: 0.48rem;
		color: #606060;
	}
</style>