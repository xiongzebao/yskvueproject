<template>
	<div id="Noadmission">
		<mt-header fixed title="录取详情">
		  <router-link to="/Admissionquery" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<div class="content-text">
			<p class="content-list">没有查到录取信息...</p>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Noadmission'
	}
</script>

<style>
#Noadmission{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff;
}
#Noadmission .content-text{
	width: 100%;
	height: 4.82rem;
	margin-top: 0.8rem;
	overflow: hidden;
	background-image: url(../../../static/img/mtc_noInfo.png);
}
#Noadmission .content-text .content-list{
	color: #ffe100;
	font-size: 0.36rem;
	text-align: center;
	line-height: 0.36rem;
	margin-top: 3.2rem;
}
</style>