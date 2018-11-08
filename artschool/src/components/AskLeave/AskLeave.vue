<template>
    <div class="ask-leave">
    	<div class="ask-leave-note">
    		<p class="leave-note-times">这是本月第<span>1</span>次提交请假</p>
    		<mt-cell title="请假类型"  value="请选择(必填)" is-link class="leave-space"></mt-cell>
    		<div class="leave-space">
    			<mt-cell title="开始时间"  value="请选择(必填)" is-link></mt-cell>
    			<mt-cell title="结束时间"  value="请选择(必填)" is-link></mt-cell>
    		</div>
    		
    		<mt-field label="请假天数" placeholder="请输入请假天数(必填)" v-model="leaveDay" class="leave-space"></mt-field>
    		<mt-field label="请假事由" placeholder="请输入请假事由(必填)" v-model="leaveReson" class="leave-space"></mt-field>
    		<div class="ask-leave-pic leave-space">
				<div class="leave-picture">
					<div class="leave-picture-title">图片</div>
					<div class="iconfont icon-xiangji"></div>
				</div>
				<div class="ask-picture-intro">
					<div class="picture-intro-list">
						<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="作品">
						<i class="iconfont icon-cha"></i>
					</div>
					<div class="picture-intro-list">
						<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="作品">
						<i class="iconfont icon-cha"></i>
					</div>
					<div class="picture-intro-list">
						<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="作品">
						<i class="iconfont icon-cha"></i>
					</div>
					<div class="picture-intro-list">
						<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="作品">
						<i class="iconfont icon-cha"></i>
					</div>
					<div class="picture-intro-list">
						<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="作品">
						<i class="iconfont icon-cha"></i>
					</div>
				</div>
			</div>
    		
    	</div>
    	<div class="ask-leave-receiver">
			<p class="ask-receive-teacher">接收人</p>
			<div class="ask-receiver">
				<div class="ask-receive-logo">
					<div><img src="../../../static/img/AttendentClass/user-logo.jpg" alt="用户头像"></div>
					<p>邱老师</p>
				</div>
				<div class="ask-receive-logo">
					<div><img src="../../../static/img/AttendentClass/user-logo.jpg" alt="用户头像"></div>
					<p>邱老师</p>
				</div>
				<div class="iconfont icon-shangchuanwenjian"></div>
			</div>
		</div>
   		<mt-button class="mint-ui-commit">提交</mt-button>
   		
    </div>
</template>

<script>
    export default {
        data () {
            return {
				leaveDay:'',
				leaveReson:''
            }
        },
        components: {
        }
    }
</script>

<style scoped>
	.ask-leave{
		font-size: 0.3rem;
	}
	.leave-note-times{
		padding-top: 0.3rem;
		padding-left: 10px;
		box-sizing: border-box;
		
	}
	.leave-space{
		margin: 0.2rem 0;
	}
	.cell-list{
		padding: 0 10px;
		display: flex;
	}
	.ask-receive-logo{
		float: left;
	}
	.ask-receive-logo img {
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 100%;
	}
	.leave-picture{
		padding: 0.3rem 10px;
		box-sizing: border-box;
	}
	.leave-picture:after{
		content: "";
		display: block;
		clear: both;
		height: 0;
	}
	.leave-picture-title{
		float: left;
	}
	.leave-picture .iconfont{
		float: right;
	}
	.picture-intro-list {
		width: 1.2rem;
		height: 1.5rem;
		position: relative;
		margin: 0.2rem 0.3rem;
		float: left;
	}
	.picture-intro-list img{
		width: 100%;
		height: 100%;
	}
	.picture-intro-list .iconfont {
		position: absolute;
		font-size: 0.4rem;
		top: -0.2rem;
		right: -0.2rem;
		color: #3ebaed;
	}
	.ask-picture-intro:after{
		content: "";
		display: block;
		clear: both;
		height: 0;
	}
	.ask-receive-logo div{
		margin: 0.3rem 0.2rem 0.3rem 0;
	}
	.ask-leave-receiver{
		padding: 0 10px;
		box-sizing: border-box;
		
	}
	.ask-leave-receiver:after{
		content: "";
		display: block;
		clear: both;
		height: 0;
	}
	.ask-leave-receiver .iconfont {
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.9rem;
		margin: 0.3rem 0;
		float: left;
	}
</style>