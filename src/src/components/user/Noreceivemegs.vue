<template>
	<div id="Noreceivemegs">
		<mt-header fixed title="艺考助手">
		  <div slot="left" v-tap='{methods:Goback}'>
                <mt-button icon="back"></mt-button>
          </div>
		</mt-header>
		<div class="serviceShow">
			<p>很遗憾噢，不过别担心，小助客服会帮你解决
客服电话：0571-89265529</p>
		</div>
		<mt-button v-tap="{methods:confirm}" class="confirm" type="primary" size="normal">
			去看我的小助了
		</mt-button>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name:'Noreceivemegs',
		data(){
			return {
				
			}
		},
		methods:{
			Goback(){//返回上一页
				this.$router.go(-1);
			},
			confirm(){
				this.$router.push('usePortal')
			}
		}
	}
</script>

<style>
#Noreceivemegs{
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: hidden;
}
#Noreceivemegs h2{
	font-size: 0.4rem;
    margin-top: 1.6rem;
    text-align: center;
    color: #5a5a5a;
}
#Noreceivemegs .serviceShow{
	width: 75%;
    border: 1px solid #999;
    padding: 0.2rem;
    margin: 3.2rem auto 0.8rem;
}
#Noreceivemegs .serviceShow p{
	font-size: 0.36rem;
    line-height: 0.5rem;
}
#Noreceivemegs .inputVal{
	width: 64%;
	height: 0.8rem;
	margin: 0 auto;
	border: 1px solid #999;
	background: #fff;
}
#Noreceivemegs .inputVal input{
	width: 93%;
    height: 70%;
    font-size: 0.3rem;
    padding-left: 0.2rem;
    margin: 0.1rem 0;
}
/*确认按钮样式重置*/
#Noreceivemegs .confirm{
	width: 80%;
    height: 0.78rem;
    font-size: 0.3rem;
    margin-top: 1.6rem;
    margin-left: 0.66rem;
    padding: 0;
}
</style>