<template>
    <div class="identify-success-footer">
	  	<p class="identify-success-notes">审核通过后,您可以获得:</p>
	  	<ul class="identify-success-note">
	  		<li><i class='iconfont icon-dot'></i>院校认证标签;</li>
	  		<li><i class='iconfont icon-dot'></i>优先参加官方活动的特权;</li>
	  		<li><i class='iconfont icon-dot'></i>帖子优先置顶、加精权利;</li>
	  		<li><i class='iconfont icon-dot'></i>优先创建圈子的权利或申请圈子管理权限;</li>
	  	</ul>
	  	<p class="identify-success-notes">注:工作人员将在1-3个工作日内完成审核。</p>
	</div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        }
    }
</script>

<style scoped>
    .identify-success-footer{
		padding: 0 0.86rem;
		color: #606060;
	}
	.identify-success-notes{
		font-size: 0.28rem;
		padding-bottom: 0.14rem;
	}
	.identify-success-note li{
		font-size: 0.26rem;
		margin: 0.2rem 0;
		line-height: 0.3rem;
	}
	.identify-success-note li .iconfont{
		padding-right: 0.1rem;
		font-size: 0.3rem;
		line-height: 0.3rem;
	}
</style>