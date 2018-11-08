<template>
	<div id="HighSchoolExam">
		<mt-header title="附中报考资料">
		  <mt-button @click="handleClose" isHide="isHide" class="iconfont icon-guanbi" slot="right"></mt-button>
		</mt-header>
		<div class="Description">
			<div class="Description-top clear">
				<div class="mark">
					<i class="iconfont icon-yousanjiao"></i>
				</div>
				<p>
					麻烦请认真填写考生资料并仔细核对， 信息已一经提交后不可修改，如出现错误需电脑登录www.artstutent.cn进行申请
				</p>
			</div>
			<div class="Description-bottom clear">
				<i class="iconfont icon-xuanze"></i>
				<p>艺考升平台确保您的信息安全</p>
			</div>
			<p class="Addothers"><i>*</i>补充资料</p>
		</div>
		<div class="Candidates">
			<mt-cell title="考生号：">
				<input v-model="ExamineeNum" type="text" placeholder="上海考生请填写12位" />
			</mt-cell>
		</div>
		<mt-button @click="confirmBtn" class="confirm" type="primary" size="large">
			确认
		</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name:'HighSchoolExam',
		data(){
			return {
				list:'',
				ExamineeNum:'',
				isHide:true
			}
		},
		mounted(){
			let that = this;
			/*考生信息查询接口*/
			ajaxMethod.doAjax("user,/api/m/auth/user/get_stuinfo.htm", {}, function(d) {
				console.log(d)
				if(d.success){
					that.list = d.datas.obj;
//					console.log(that.list.addressee)
				}else{
					Toast({
					  message: d.message,
					  position: 'middle',
					  duration: 3000
					});
				}
			})
		},
		methods:{
			handleClose(){
				this.isHide = false;
				this.$router.push('Inforperfect')
			},
			confirmBtn(){
				let stuType = this.ExamineeNum;
				console.log(stuType)
				if(stuType == 1 || stuType == 2){
					
				}
			}
		}
	}
</script>

<style>
#HighSchoolExam{
	width: 100%;
	height: 100%;
	background: #fff;
}
#HighSchoolExam .mint-header .icon-guanbi{
	float: right;
	font-size: 0.64rem;
    line-height: 0.64rem;
}
#HighSchoolExam .Description{
	width: 100%;
	font-size: 0.28rem;
}
#HighSchoolExam .Description-top{
	padding-left: 0.2rem;
	padding-top: 0.1rem;
	margin-bottom: 0.1rem;
}
#HighSchoolExam .Description-top .mark{
	float: left;
	height: 1rem;
	padding-right: 0.1rem;
}
#HighSchoolExam .Description-top .mark .icon-sanjiao{
	font-size: 0.5rem;
    color: #42cefc;
}
#HighSchoolExam .Description-top p{
	color: red;
	font-size: 0.26rem;
}
#HighSchoolExam  .Description-bottom{
	padding-left: 0.2rem;
	line-height: 0.56rem;
}
#HighSchoolExam  .Description-bottom .icon-xuanze{
	float: left;
	font-size: 0.36rem;
	color: deepskyblue;
	padding-right: 0.2rem;
}
#HighSchoolExam .Description .Addothers{
	margin-top: 0.1rem;
}
#HighSchoolExam .Description .Addothers i{
	float: left;
	margin-right: 0.2rem;
	color: red;
	font-size: 0.66rem;
}
#HighSchoolExam .Candidates{
	width: 100%;
}
/*cell样式*/
#HighSchoolExam .Candidates .mint-cell{
	width: 100%;
	min-height: 0.74rem;
}
/*button按钮样式*/
#HighSchoolExam .confirm {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    width: 70%;
    height: 0.7rem;
    font-size: 0.3rem;
    border-radius: 0.12rem;
    background: #ff9f37;
}
</style>