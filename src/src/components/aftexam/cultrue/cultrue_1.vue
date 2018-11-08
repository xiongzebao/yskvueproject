<template>
	<div class="culture-s">
		<mt-header fixed title="文化分测算">
			<router-link to="/" slot="left">
    			<mt-button icon="back">返回</mt-button>
  			</router-link>
		</mt-header>
		<div class="culture-b">
			<div class="cul-h">
				<div class="cul-h-h">
					<div class="wrap-img">
						<img v-if="userLogo" :src="userLogo" alt="">
						<img v-else src="static/img/help/logoo.png" alt="">
					</div>
				</div>
				<div class="cul-h-n">
					昵称
				</div>
			</div>
			<div class="cul-b">
				<ul class="info-list">
					<li>
						<div class="pro-wen">
							<div style="margin-right:.3rem;">
								<span class="pro-t">高考省份：</span>
								<select name="" id="">
									<option value="">1</option>	
									<option value="">1</option>	
									<option value="">1</option>	
								</select>
							</div>
							<div>
								<span class="pro-t">文理科：</span>
								<select name="" id="">
									<option value="">2</option>
									<option value="">2</option>
									<option value="">2</option>
									<option value="">2</option>
								</select>
							</div>
						</div>
					</li>
					<li>
						<select name="" id="">
							<option value="">选择院校</option>
						</select>
					</li>
					<li>
						<select name="" id="">
								<option value="">选择专业</option>
						</select>
					</li>	
					<li>
						<input type="text">
					</li>
				</ul>
			</div>
			<div class="cul-btn">
				<button>开始测算</button>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from "vue"
	import {Header} from "mint-ui";
	Vue.component(Header.name, Header);
	export default{
		data(){
			return{
				userLogo:""
			}
		},
		mounted(){
			var that=this;
			if(!!window.yksapp_user){
				that.userLogo=yksapp_user.getLogo()
			}
			var url="aftexam,/api/m/aftexam/culture/list/school.htm";
			var data={};
			ajaxMethod.doAjax(url,data,function(d){
				console.log();
			})
		},
		methods:{

		},
	}
</script>
<style scoped>
	.culture-s{font-size:.2rem;}
	.wrap-img{width:1rem;height:1rem;border-radius:50%;}
	.wrap-img img{max-width:100%;max-height:100%;}
	.culture-b{padding:.9rem .2rem 0;background:#fff;}
	.cul-h{display:flex;align-items: flex-end;margin-bottom:.5rem;}
	.cul-h-h{}
	.cul-h-n{margin-left:.1rem;font-size:.3rem;}
	.pro-wen{display:flex;}
	.pro-wen>div{flex:1;}
	.info-list li{margin:.1rem 0;font-size:.25rem;}
	.pro-t{width:.2rem;display: inline-flex;}
</style>