<template>
	<div class="diy-header">
		<!-- <div> -->
			<div class="iii">
				<span @click="asd">返回</span>
			</div>
			<div class="condition">
				<div class="cond-in">
					<router-link :to="{path:'/signEntrance'}">
						<span>院校</span>
					</router-link>
					<router-link :to="{path:'/examinationPoint_1'}">
						<span>考点</span>
					</router-link>
				</div>
			</div>
			<div class="orem"></div>
		<!-- </div> -->
	</div>
</template>
<script>
	import Vue from 'vue';
//	import { Button } from 'mint-ui';
//	Vue.component(Button.name, Button);
	export default{
		data(){
			return{
				
			}
		},
		mounted(){
			// alert(this.$route.path);
			if(this.$route.path=="/signEntrance"){
				$("a[href='#/signEntrance']").addClass("router-link-exact-active")
				// alert("找到了")
			}
		},
		methods:{
			asd(){
				this.$router.push({path:"/"})
				// this.$router.go(-1)
			},
		}
	}
</script>
<style scoped>
	.diy-header{height:.8rem;background: #42cefc;position:fixed;top:0;left:0;right:0;padding:0 10px;display: -webkit-box;display: -ms-flexbox;display: flex;align-items: center;white-space: nowrap;box-sizing: border-box;}
	.diy-header .iii{flex:.5;font-size:.3rem;color:#fff;font-style:normal;height:.8rem;line-height:.8rem;}
	.diy-header .iii a{color:#fff;}
	.diy-header .condition{font-size:.3rem;display:flex;flex:1;}
	.diy-header .condition .cond-in{border:1px solid #fff;border-radius:2px;display:flex;margin:0 auto;}
	.diy-header .condition a{padding:.05rem 0;}
	.diy-header .condition span{padding:.1rem .2rem;color:#fff;}
	/*.diy-header .condition a:first-child span{border-right:1px solid #fff;}*/
	.router-link-exact-active{color:#42CEFC;background: #fff;}
	.diy-header .condition .router-link-exact-active span{color:#42CEFC;}
	.orem{flex:.5;}
	.whatthefuck{background:#fff;color:#42CEFC;}
</style>