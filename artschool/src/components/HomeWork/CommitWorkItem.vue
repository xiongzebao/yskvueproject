<template>
	<div class="commit-work">
		<div class="commit-work-header">
			<div class="commit-work-title">
				<div class="cell-list-title">作业标题</div>
				<div class="work-title-value">
					<input type="text"  v-model="userTitle" class="value-field-core" placeholder="请输入作业标题(必填)">
				</div>
				
			</div>
			<div class="commit-work-pictr">
				<div class="work-picture">
					<div class="work-picture-title">作业照片</div>
					<div class="iconfont icon-xiangji"></div>
				</div>
				<div class="work-picture-intro">
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
				<label for="workPicture"></label>
				<div class="work-picture">
					<template v-if="userWork">
						
					</template>
					<template v-else>
						<span ></span>
					</template>
					
				</div>
			</div>
			<div class="commit-work-title commit-work-field">
				<div class="cell-list-title">备注</div>
				<div class="work-title-value">
					<textarea  v-model="userNote" class="value-field-core" placeholder="请输入备注" rows="4"></textarea>
				</div>
				
			</div>
			<div class="work-header-receive">
				<p class="header-receive-teacher">接收人</p>
				<div class="header-receiver">
					<div class="header-receive-logo">
						<div><img src="../../../static/img/AttendentClass/user-logo.jpg" alt="用户头像"></div>
						<p>邱老师</p>
					</div>
					<div class="header-receive-logo">
						<div><img src="../../../static/img/AttendentClass/user-logo.jpg" alt="用户头像"></div>
						<p>邱老师</p>
					</div>
					<div class="iconfont icon-shangchuanwenjian"></div>
				</div>
			</div>
		</div>
		<v-touch  tag="button" class="mint-ui-commit" @tap="onCommitWork">提交作业</v-touch>
	</div>
	
</template>
<script>
  export default {
	  data(){
		  return {
			  userTitle:"",
			  userNote:"",
			  userWork:''
		  }
	  },
	  methods:{
		  onCommitWork(){
			  this.$emit("commit")
		  }
	  }
  }
</script>
<style scoped>
.commit-work{
	font-size: 0.3rem;
	padding: 0 10px;
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	box-sizing: border-box;
	position: fixed;
	z-index: 200;
	top:0;
	left:0;
	background-color: #fff;
	overflow-y: auto;
}
	.commit-work-header{
		flex-grow: 1;
	}
	.commit-work-footer{
		flex-shrink: 0;
	}
	.commit-work-title{
		align-items: center;
		box-sizing: border-box;
		display: flex;
		overflow: hidden;
		padding: 0.3rem 0;
		width: 100%;
	}
	.work-title-value{
		flex-grow: 1;
	}
	.value-field-core{	  
		appearance: none;
		border-radius: 0;
		border: 0;
		outline: 0;
		width: 100%;
	}
	.work-picture{
		padding: 0.3rem 0;
	}
	.work-picture:after{
		content: "";
		height: 0;
		display: block;
		clear: both;
	}
	.work-picture .iconfont{
		float: right;
	}
	.work-picture-title{
		float: left;
	}
	.picture-intro-list{
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
	.picture-intro-list .iconfont{
		position: absolute;
		font-size: 0.4rem;
		top:-0.2rem;
		right: -0.2rem;
		color: #3ebaed;
	}
	.commit-work-field{
		 align-items: flex-start;
	}
	.header-receiver:after{
		content: "";
		height: 0;
		display: block;
		clear: both;
	}
	.header-receive-logo{
		float: left;
	}
	.header-receive-logo div{
		margin: 0.3rem 0.2rem 0.3rem 0;
	}
	.header-receive-logo img{
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 100%;
	}
	.header-receiver .iconfont{
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.9rem;
		margin: 0.3rem 0;
		float: left;
	}
</style>