<template>
  <div id='identityEnter'>
  		
   		<keep-alive>
		  	<router-view></router-view>
		</keep-alive>	
  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';

export default {
  name: 'identityEnter',
  data(){
    return{
      
    }

  },
  mounted(){

  },
  computed:{
  
  
  },
  
  methods:{
   
  },
  components:{

  }
}
</script>

<style type="text/css">
	::-webkit-scrollbar {
	display: none;
	}
	html,body,#app,.dentify-auth-main{
		width: 100%;
		height: 100%;
	}
	#identityEnter{
		font-family: 'PingFang SC';
		width: 100%;
		height: 100%;
	}
	#identityEnter .mint-header{
		height: 1rem;
		background-color:#42cefc!important;
		color: #fff;
	}
	/*页面父元素*/
	.identify-auth,.identify-success,.college-ensure{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	/*弹性盒设置*/
	#identityEnter .identityEnter-header,#identityEnter .identityEnter-footer{
		flex-shrink: 0;
	}
	#identityEnter .identityEnter-main{
		flex-grow: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	/*中间样式*/
	#identityEnter .identify-auth-pri{
		height: 2.58rem;
		font-size:0.32rem;
		box-sizing: border-box;
		padding-top:0.5rem;
		color: #fff;
		background: url('../../../static/images/identity/identity.jpg') no-repeat;
		background-size: 100% 100%;
	}
	#identityEnter .identify-auth-pri p{
		text-align: center;
		margin: 0.3rem 0;
		
	}
	/*底部样式*/
	#identityEnter .identify-auth-btn{
		padding:0  0.86rem 0.84rem;
		box-sizing: border-box;
	}
	#identityEnter .identify-auth-btn-com{
		width: 100%;
		height: 0.72rem;
		line-height: 0.72rem;
		text-align: center;
		color: #fff;
		font-size: 0.3rem;
		font-weight: bolder;
	}
	#identityEnter .identify-auth-btn-ensure{
		background-color: #42cefc;
	}
	#identityEnter .identify-auth-btn-defalut{
		background-color: #8edcff;
	}
</style>