<template>
	<div id="College_major">
		<mt-header fixed title="院校已选专业">
		  <router-link to="/Bkxq" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		<template v-for="item in list">
		<div class="students-info">
			<div class="students-name">
				<p class="name">
					姓名
					<span>{{this.data.id1}}</span>
				</p>
				<p>
					省份
					<span>{{this.data.id2}}</span>
				</p>
			</div>
			<div class="College-name">
				<p class="college">
					当前报考院校
					<span>{{this.data.id3}}</span>
				</p>
			</div>
		</div>
		
		<div class="province">
			<i class="iconfont icon-xuanzhong"></i>
			<div class="TestCenter">
				<p>{{this.data.id4}}</p>
				<span>{{this.data.id5}} {{this.data.id6}}</span>
			</div>
			<div class="handleBtn">
				<mt-button style="margin-left: 2.7rem;" type="primary"  size="small">志愿填报</mt-button>
				<mt-button type="primary"  size="small">删除该专业</mt-button>
			</div>
			<!--<div class="majoy1">
				
			</div>
			<div class="majoy2">
				
			</div>-->
		</div>
		<div class="footer-btn">
			<div class="total footer-common">合计：0.01元</div>
			<div class="submit footer-common">提交</div>
		</div>
		</template>
	</div>
</template>

<script>
	import '../../static/iconfont/iconfont.css'
	export default {
		name:'College_major',
		data(){
			return {
				list:''
			}
		},
		mounted(){
			this.data=this.$route.params.obj
			
			
		},
		methods:{
			
		}
	}
</script>

<style>
#College_major{
	width: 100%;
	height: 100%;
}
#College_major .students-info{
	font-size: 0.24rem;
	line-height: 0.44rem;
	color: #464646;
	background: #fff;
	padding: 0.08rem 0.22rem;
	margin-top: 0.86rem;
}
#College_major .students-info p span{
	color: #039df7;
}
#College_major .students-info .students-name .name{
	float: left;
	margin-right: 3.56rem;
}
#College_major .province{
	background: #fff;
	margin-top: 0.18rem;
	padding: 0rem 0.22rem;
	position: relative;
}
#College_major .province .icon-xuanzhong{
	color: #cccccc;
	font-size: 0.4rem;
	padding-left: 0.22rem;
	position: absolute;
	top: 0.3rem;
    left: 0.2rem;
}
#College_major .province  .TestCenter{
	font-size: 0.26rem;
	line-height: 0.42rem;
	margin-left: 0.7rem;
	padding: 0.1rem 0;
}
#College_major .province .mint-button--primary{
	background: #fff;
	color: #fb8833;
	border: 1px solid #fb8833;
}
#College_major .province .handleBtn{
	font-size: 0.6rem;
    padding-bottom: 0.14rem;
}
/*#College_major .province .majoy1{
	height: 0.6rem;
	border-top: 1px solid #f8f8f8;
}*/
#College_major .footer-btn{
	width: 100%;
	height: 0.88rem;
	position: fixed;
	bottom: 0;
	left: 0;
	font-size: 0.24rem;
}
#College_major .footer-btn .footer-common{
	float: left;
	width: 50%;
	height: 100%;
	line-height: 0.88rem;
	text-align: center;
}
#College_major .footer-btn .total{
	background: #e2e2e2;
}
#College_major .footer-btn .submit{
	background: #1ca7f8;
}
</style>