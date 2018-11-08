<template>
	<div id="Admission">
		<mt-header fixed title="录取详情">
		  <router-link to="/Admissionquery" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<div class="content-text">
			<p class="content-list">已被 {{data.schoolName}} 的</p>
			<p class="content-list">{{data.profName}}拟录取</p>
		</div>
			
		<div class="lq-details">
			<ul>
				<li class="list clear">
					<div class="title"><span>姓</span><span></span>名：</div>
					<p>{{data.stuName}}</p>
				</li>
				<li class="list clear">
					<div class="title"><span>证</span><span>件</span>号：</div>
					<p>{{data.idCardNo}}</p>
				</li>
				<li class="list clear">
					<template v-if='data.studentNo!=null'>
						<div class="title"><span>考</span><span>生</span>号：</div>
						<p>{{data.studentNo}}</p>
					</template>
				</li>
				<li class="list clear">
					<template v-if='data.entStuNo'>
						<div class="title"><span>学</span><span></span>号：</div>
						<p>{{data.entStuNo}}</p>
					</template>
				</li>
			</ul>
			
			<ul>
				<li class="list clear">
					<template v-if='data.linkTel'>
						<div class="title">联&nbsp;&nbsp;系&ensp;电&emsp;话：</div>
						<p>{{data.linkTel}}</p>
					</template>
				</li>
				<li class="list clear">
					<template v-if='data.zipCode'>
						<div class="title"><span>邮</span><span></span>编：</div>
						<p>{{data.zipCode}}</p>
					</template>
				</li>
				<li class="list clear">
					<template v-if='data.address'>
						<div class="title">邮&nbsp;&nbsp;寄&ensp;地&emsp;址：</div>
						<p>{{data.address}}</p>
					</template>
				</li>
				<li class="list clear">
					<template v-if='data.ems'>
						<div class="title">EMS快递单号：</div>
						<p>{{data.ems}}</p>
					</template>
				</li>
				<li class="list clear">
					<template v-if='data.ems'>
						<div class="title">查&nbsp;&nbsp;询&ensp;地&emsp;址：</div>
						<a href="http://www.ems.com.cn/">http://www.ems.com.cn/</a>
					</template>
				</li>
				<div class="border-line"></div>
				<li class="list clear">
					<p v-html="data.matricNote"></p>
				</li>
				<li class="list listChild clear">
					<p class="Explain">说明：正式录取结果以学校寄发的录取通知书为准</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Admission',
		data(){
			return {
				data:''
			}
		},
		mounted(){
			this.data=this.$route.query;
			console.log(this.data)
		}
	}
</script>

<style>
#Admission{
	width: 100%;
	height: 100%;
	
    flex-direction: column;
    position: fixed;
    background: #fff;
    overflow-y: scroll;
}
#Admission .content-text{
	width: 100%;
	height: 3.3rem;
    padding-top: 2.2rem;
	margin-top: 0.8rem;
	background-image: url(../../../static/img/mtc_Info.png);
	background-size: 100% 100%;
}
#Admission .content-text .content-list{
	color: #ffe100;
	font-size: 0.28rem;
	text-align: center;
	line-height: 0.7rem;
}
#Admission .lq-details{
	margin: 6% 4% 0 5%;
}
#Admission .lq-details .list{
	font-size: 0.3rem;
}
#Admission .lq-details .list p{
	font-size: 0.29rem;
}
#Admission .lq-details .list .title{
	float: left;
}
#Admission .lq-details .list .title span{
	display: inline-block;
	width: 0.78rem;
}
#Admission .lq-details .list a{
	color: #0000FF;
	text-decoration: underline;
}
#Admission .lq-details .listChild{
	margin-top: 0.26rem;
}
#Admission .lq-details .list .Explain{
	font-size: 0.24rem;
	font-weight: 600;
}
.lq-details .border-line{
	padding: 0.3% 0;
    border-radius: 5%;
    background: #F9F9F9;
    margin: 2% 0;
}
</style>