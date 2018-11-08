<template>
	<div id="Setup">
		<mt-header fixed title="设置">
			<div slot="left" v-tap='{methods:Goback}'>
                <mt-button icon="back"></mt-button>
          	</div>
		</mt-header>
		<div class="seting">
			<mt-cell title="设置订阅院校" is-link v-tap="{methods:subSchool}"></mt-cell>
			<mt-cell title="手机号码修改" is-link v-tap="{methods:cellPhone}">
				
			</mt-cell>
			<mt-cell title="客服联系方式" is-link to="Noreceivemegs"></mt-cell>
			<mt-cell title="使用说明" is-link to="ArtHelp"></mt-cell>
		</div>
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import vueTap from 'v-tap';

	Vue.use(vueTap);
	Vue.component(Cell.name, Cell);
	export default {
		name:'Setup',
		data(){
			return {
				is_link:true,
				recordList:''//已订阅院校
			}
		},
		mounted(){
			var that = this;
			ajaxMethod.doAjax("befexam,/api/m/auth/helper/schooltipset/tipset_query.htm",{}, function(subData) {
				console.log(subData)
				if(subData.success){
					if(subData.datas.obj){
						that.recordList = subData.datas.obj.recordList;
					}
					
				}else{
					
				}
			})
		},
		methods:{
			Goback(){
				this.$router.go(-1);
			},
			Toast(megs){
				Toast({
				  message: megs,
				  position: 'middle',
				  duration: 3000
				});
			},
			subSchool(){
				if(this.recordList.length>20){
					this.Toast('最多只能订阅20所院校！');
				}else{
					this.$router.push('SubscribeCollege');
				}
			},
			cellPhone(){
				this.$router.push('ModifyphoneNum');
			}
		}
	}
</script>

<style>
#Setup{
	width: 100%;
	height: 100%;
	background: #fff;
}
#Setup .seting{
	margin-top: 0.81rem;	
}
#Setup .seting .mint-cell{
	border-bottom: 1px solid #ddd;
}
#Setup .seting .mint-cell-allow-right:after{
	border: 2px solid #26a2ff;
	    border-bottom-width: 0;
    border-left-width: 0;
}
#Setup .confirmSet{
	width: 90%;
    height: 0.76rem;
    font-size: 0.3rem;
    margin-top: 2rem;
    margin-left: 0.32rem;
}
</style>