<template>
	<div id="Shareculre">
		<mt-header fixed title="文化分测算">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
				<mt-button>关闭</mt-button>
			</router-link>
			<mt-button slot="right" v-tap="{ methods : share}">分享</mt-button>
		</mt-header>
		<div class="intro" >
			<div :class="['intro-logo',fatherDate.userlogo?'':'intro-logo-have']">
				<template v-if='fatherDate.userlogo'>
					<img :src="fatherDate.userlogo" alt="logo" />
				</template>
				<template v-else>
					<img src="../../../static/img/logoo.png" alt="logo" />
				</template>
			</div>
			<div class="nameIntro">{{fatherDate.userNickName}}</div>
			<div class="score" id="miaosu" v-if='showUser'>距离{{fatherDate.xuexiao}}门口大约<span class="note">{{fatherDate.fenshu}}</span>分的路程</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
//	import { Header } from 'mint-ui';
//	import { Button } from 'mint-ui';
//	Vue.component(Button.name, Button);
//	Vue.component(Header.name, Header);
	export default {
		name: "Shareculre",
		props:['fatherDate'],
		data() {
			return {
				userNickName:'艺考升用户',
				userlogo:'',
				showUser: false
			}
		},
		mounted() {
			if(window.yksapp_user) {
				let userNickName = yksapp_user.getNickName();
				if(userNickName) {
					this.userNickName = userNickName;
				}

				this.userlogo = yksapp_user.getLogo();

			}
			let  dataCultrue=this.fatherDate;
			if((dataCultrue.fenshu)||(dataCultrue.fenshu==0)){
				this.showUser = true;
			}
		},
		methods: {
			share: function() {
				let height=window.devicePixelRatio*$("#Shareculre .mint-header").height();
                yksapp.goShareWithScreenShot(height);
			}
		}
	}
</script>

<style scoped>
	#Shareculre {
		background-image: url(../../../static/img/share.png);
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
        background-color: #f4f4f4;
	}
	
	#Shareculre .intro {
		height: auto;
		overflow: hidden;
		font-size: 0.3rem;
		color: #fff;
	}
	#Shareculre .intro-logo{
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 100%;
		background: #fff;
		margin: 50px auto 10px;
	}
	#Shareculre .intro-logo-have {
		border: 2px double #08b4fe;
		
	}
	
	#Shareculre .intro-logo img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	
	#Shareculre .intro .nameIntro {
		text-align: center;
		padding: 0.5rem 0;
		letter-spacing: 1px;
	}
	
	#Shareculre .intro .score {
		padding: 0 0.6rem;
		box-sizing: border-box;
		box-sizing: border-box;
		text-align: justify;
		text-align: center;
		overflow: hidden;
		font-size: 0.5rem;
	}
	
	#Shareculre .intro .score .note {
		color: #fcee00;
	}
</style>