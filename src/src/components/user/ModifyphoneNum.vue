<template>
	<div id="ModifyphoneNum">
		<mt-header fixed title="修改手机">
		  	<div slot="left" v-tap='{methods:Goback}'>
                <mt-button icon="back"></mt-button>
          	</div>
		</mt-header>
		<div class="phoneNum">
			<label for="inputVal">您绑定的手机号：</label>
			<input id="inputVal" type="tel" v-model="oldNum"  maxlength="11" placeholder="请输入手机号" />
		</div>
		<div class="phoneNum oldPhoneNum">
			<label for="inputVal">现&thinsp;在&thinsp;的&thinsp;手&thinsp;机&thinsp;号：</label>
			<input id="inputVal" type="tel" v-model="newNum" maxlength="11" placeholder="请输入新手机号" />
		</div>
		<div class="confirmation clear">
			<div class="code">
				<span>验证码</span>
				<input type="tel" v-model="Code" maxlength="4" placeholder="请输入验证码" />
			</div>
			<div class="receiveCode code" :class='{colorRed:isRed}' v-tap="{methods:getCode}">
				获取验证码
			</div>
		</div>
		<mt-button v-tap="{methods:reviseNum}" v-if="Code==null||Code==''"
			class="phoneNumChange" type="default" size="large">
			确定
		</mt-button>
		<mt-button v-tap="{methods:reviseNum}" v-else
			class="phoneNumChange" type="primary" size="large">
			确定
		</mt-button>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	
	Vue.component(Button.name, Button);
	Vue.component(Cell.name, Cell);
	export default {
		name:'ModifyphoneNum',
		data(){
			return {
				oldNum:'',//用户手机号
				newNum:'',//新的手机号
				Code:'',//验证码
				isRed:false,
				allTime:60,
				timeFlag:false
			}
		},
		methods:{
			Goback(){
				this.$router.go(-1);
			},
			_Toast(megs){
				Toast({
				  message: megs,
				  position: 'middle',
				  duration: 3000
				});
			},
			getCode(){//获取验证码
				var that = this;
				var countDown = $('.receiveCode');
				var innertimer;
				clearInterval(innertimer);
				if(this.oldNum==null||this.oldNum==''){
					that._Toast('请输入绑定的号码！');
					return ;
				}
				if(this.newNum==null||this.newNum==''){
					that._Toast('请输入新的号码！');
					return ;
				}
				//发送短信验证码
					if(this.timeFlag){
						return ;
					}
					this.timeFlag=true;
					var tel={
						"oldTelephone":this.oldNum,
						"telephone":this.newNum
					}
					ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/send_verify_code.htm",tel, function(data) {
							console.log(data)
							if(data.success){
	                        	let innertimer=setInterval(function(){
				                    countDown[0].innerText=that.allTime--+'秒可重发';
				                    if(that.allTime<-1){
				                    	that.isRed = true;
				                    	that.timeFlag=false;
				                        innertimer && clearInterval(innertimer);  
				                        countDown[0].innerText = '重新获取';
				                    }
				                },1000);
				                
							}else{
								that.timeFlag=false;
								that._Toast(data.message);
							}
						});
				
				
			},
			reviseNum(){//
				var that = this;
				if(!regularMatch.isPhone(this.oldNum)){
					that._Toast('请输入正确的号码');
                    return ;   
				}
				if(!regularMatch.isPhone(this.newNum)){
					that._Toast('请输入正确的号码');
                    return ;   
				}
				if(this.Code==null||this.Code==''){
					that._Toast('请输入验证码');
                    return ;   
				}
				var param = {
					"oldTelephone":this.oldNum,//之前的号码
					"telephone":this.newNum,//新的号码
					"verifyCode":this.Code
				}
				ajaxMethod.doAjax("befexam,/api/m/auth/helper/subscriberecord/update_telephone.htm",param, function(data) {
					console.log(data)
					if(data.success){
						MessageBox({
						  	title:'温馨提示',
							message:'您的号码修改成功！',
							showCancelButton:false,
							confirmButtonText:'知道了',
							showCancelButton: true
						}).then(action => {
							if(action=='confirm'){
								that.$router.push('Setup');
							}
						});
					}else{
						that._Toast(data.message);
					}
				})
			}
		}
	}
</script>

<style>
#ModifyphoneNum{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff;
}
#ModifyphoneNum .phoneNum{
    display: flex;
    flex-grow: 1;
    width: 94%;
    height: 0.8rem;
    font-size: 0.28rem;
    margin: 1.8rem auto 0;
    border: 1px solid #d9d9d9;
    border-radius: 0.1rem;
}
#ModifyphoneNum  .oldPhoneNum{
	margin-top: 0.5rem;
}
#ModifyphoneNum .phoneNum label{
	width: 2.8rem;
    line-height: 0.8rem;
    color: #26a2ff;
    margin-left: 0.1rem;
}
#ModifyphoneNum .phoneNum #inputVal{
	height: 0.6rem;
	line-height: 0.6rem;
    color: #818181;
    margin-top: 0.1rem;
}
#ModifyphoneNum .phoneNumChange{
	width: 80%;
    height: 0.8rem;
    margin: 1.4rem auto 0;
    font-size: 0.3rem;
}
#ModifyphoneNum .confirmation{
	font-size: 0.28rem;
	margin-top: 0.5rem;
}
#ModifyphoneNum .confirmation .code{
	float: left;
	line-height: 0.8rem;
	border: 1px solid #d9d9d9;
	margin-left: 0.3rem;
}
#ModifyphoneNum .confirmation .receiveCode{
	float: left;
    width: 2.3rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    padding: 0.1rem;
    background: #F4F4F4;
}
#ModifyphoneNum .confirmation .colorRed{
	color: red;
}
#ModifyphoneNum .confirmation .code span{
	float: left;
    padding-left: 0.2rem;
}
#ModifyphoneNum .confirmation .code input{
	width: 1.6rem;
    color: #888;
    font-size: 0.24rem;
    line-height: 0.8rem;
    padding-left: 0.3rem;
}
</style>