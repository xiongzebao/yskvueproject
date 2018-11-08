<template>
	<div id="ReceiveMegs">
		<mt-header fixed title="艺考助手">
		  <router-link to="/serviceSub" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<!--接收信息提示页面-->
        <mt-popup
         class='smspopup'
          v-model="smspopupVisible"
          :closeOnClickModal='clickClosed'
          position="middle">
               <p class="sendMegs countDown">服务订阅成功,小助已经发送了一条欢迎短信给您，请查收</p>
               <p class="countDown">{{timeDownCom}}</p>
               <div class="smspopup-footer">
                    <router-link class="noReceived" :to="{ path: 'usePortal' }">还没收到</router-link>
                    <router-link :to="{ path: 'Noreceivemegs' }">我收到了</router-link>
               </div>
           
        </mt-popup>
	</div>
</template>

<script>
	export default { 
		name:'ReceiveMegs',
		data(){
			return {
				clickClosed:false,/*禁用model层*/
				smspopupVisible:false/*短信接收提示*/
			}
		},
		methods:{
			
		}
	}
</script>

<style>
/*信息弹出层*/
#ReceiveMegs .smspopup{
    width:80%;
    height: 50%;
    font-size: 0.3rem;
}
#ReceiveMegs .smspopup .sendMegs{
    width: 3.4rem;
    padding: 0.2rem;
    border: 1px solid #ddd;
    margin: 0.7rem auto 0.7rem;
}
#ReceiveMegs .smspopup .countDown{
    font-size: 0.3rem;
    line-height: 0.46rem;
    text-align: center;
}
#ReceiveMegs .smspopup-footer{
    position: absolute;
    bottom: 0px;
    left:0px;
    width: 99.6%;
    overflow: hidden;
    border: 1px solid #ddd;
}
#ReceiveMegs .smspopup-footer a{
    float: left;
    width: 40%;
    margin: 3.5%;
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.3rem;
}
#ReceiveMegs .smspopup-footer .noReceived{
	border-right: 1px solid #ddd;
}
</style>