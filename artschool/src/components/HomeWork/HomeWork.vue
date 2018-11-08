<template>
  	<div class='home-work-global'>
		<div class="home-work" v-show="!commitWorkFlag">
			 <section class="home-work-header">
<!--
				<mt-header title="作业">
				  <router-link to="/" slot="left">
					<mt-button icon="back"></mt-button>
				  </router-link>
				  
				</mt-header>
-->
				<div class="work-header-kind">
					<template v-for="(list,index) in workType">
					  	<div :class="[list.status?'header-kind-choosed':'']" v-tap="{methods:onWorkType,params:index}" class="header-kind-grade">{{list.value}}
					  	</div>
					</template>
				</div>
				<line-chart :chart-data="chartData"  :height="300" v-if="chartFlag" class="header-kind-chart"></line-chart>	
			 </section>
			 <section class="home-work-main">
				
				<section class="work-main-comment">
					<div class="main-comment-list">
						<div class="comment-list-day">八月16号</div>
						<div class="comment-list-note">
							<div class="list-note-total">
								<div class="list-note-picture">
									<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="图片">
									<span class="note-total-Corner">1/6</span>
								</div>
							</div>
							<div class="list-note-intro">
								<p class="note-intro-total">已评:&nbsp;6张</p>
								<p class="note-intro-teacher">评分老师:&nbsp;王老师</p>
								<div class="list-note-start">
									<div>
										<span class="iconfont icon-pingjia"></span>
										<span class="iconfont icon-pingjia"></span><span class="iconfont icon-pingjia"></span><span class="iconfont icon-pingjia"></span><span class="iconfont icon-pingjia"></span>
										<span class="note-start-total">3张</span>
									</div>
									<div>
										<span class="iconfont icon-pingjia"></span><span class="iconfont icon-pingjia"></span><span class="iconfont icon-pingjia"></span>
										<span class="note-start-total">3张</span>
									</div>
									
								</div>
							 <div class="comment-list-intro">查看评分详情<span class="iconfont icon-arrow-l"></span></div>
							</div>
						</div>
						
					</div>
					<mt-button   @click="onCommitWork">+</mt-button>
				</section>

			 </section>

		</div>
		<commit-work   v-if="commitWorkFlag" @commit="homeWorkCommit"></commit-work>
   	</div>
</template>

<script>
	import LineChart from './../public/LineChart.js';
	import CommitWork from './CommitWorkItem.vue';
    export default {
		name:'homeWork',
        data () {
            return {
				chartFlag:false,
				commitWorkFlag:false,
				workType:[
					{
						value:"日",
						status:true
					},
					
					{
						value:"周",
						status:false
					},
					
					{
						value:"月",
						status:false
					}
				],
				chartData:{
					 labels: [],
					 datasets: [
					  {
						label: '作业统计',
						backgroundColor:"#909090",
						data: []
					  }
					]
				}
            }
        },
		mounted(){
			this.setChartData();
		},
        components: {
			LineChart,
			CommitWork
        },
		methods:{
			setChartData(){
				for(let i=0;i<10;i++){
					this.chartData.labels[i]=i+"号";
					this.chartData.datasets[0].data[i]=i;
					
					
				}
				this.chartFlag=true;
			},
			homeWorkCommit(){
				this.commitWorkFlag=false;
			},
			onCommitWork(){
				this.commitWorkFlag=true;
			},
			onWorkType(values){
				let value=values.params
				if(value||value==0){
					for(let i in this.workType){
						this.workType[i].status=false;
					}
					this.workType[value].status=true;
					/*获取数据*/
					if(this.workType[value].value=="日"){
						this.chartData={
							labels: ['10号', '15号'],
							 datasets: [
							  {
								label: '作业统计',
								backgroundColor: '#f87979',
								data: [40, 20]
							  }
							]
						}
					}else if(this.workType[value].value=="周"){
						this.chartData={
							labels: ['一周', '二周','三周'],
							 datasets: [
							  {
								label: '作业统计',
								backgroundColor: '#f87979',
								data: [20,40,20]
							  }
							]
						}
					}else if(this.workType[value].value=="月"){
						this.chartData={
							labels: ['七月'],
							 datasets: [
							  {
								label: '作业统计',
								backgroundColor: '#f87979',
								data: [80]
							  }
							]
						}
					}
				}
			}
		}
    }
</script>

<style scoped>
	.home-work-global {
		width: 100%;
		height: 100%;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.work-header-kind{
		margin: 10px 0;
		display: flex;
		flex-wrap: nowrap;
		background-color: #fff;
		font-size: 0.25rem;
		align-items: center;
	}
	.header-kind-chart{
		margin: 10px 0;
		background-color: #fff;
	}
	.work-header-kind div{
		flex: auto;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		position: relative;
	}
	.work-header-kind div:after{
		content: "";
		width: 0;
		height: 0.3rem;
		border-right: 1px solid #909090;
		position: absolute;
		right: 0;
		top:0.1rem;
	}
	.work-header-kind div:last-child:after{
		height: 0;
	}
	.work-header-kind .header-kind-choosed{
		background-color: #3ebaed;
		color: #fff;
		border-right: 0;
	}
	.work-header-kind .header-kind-choosed:after{
		height: 0;
	}
	.main-comment-list{
		font-size: 0.3rem;
		background-color:#fff;
		margin: 10px 0;
	}
	.comment-list-day{
		padding: 0.15rem 10px;
		border-bottom: 1px solid #909090;
		box-sizing: border-box;
	}
	.comment-list-note:after{
		display: block;
		clear: both;
		height: 0;
		content: " ";
	}
	.comment-list-note{
		padding: 0.2rem 10px 0.3rem;
		box-sizing: border-box;
		
	}
	
	.list-note-total{
		float: left;
		padding-right:10px; 
	}
	.list-note-intro{
		float:left;
	}
	.list-note-picture{
		position: relative;
	}
	.list-note-picture span{
		position: absolute;
		top:0.2rem;
		left:0.2rem;
		color: #909090;
	
	}
	.list-note-picture img{
		width: 3.4rem;
		height: 2.5rem;
	}
	.note-intro-total,.note-intro-teacher{
		color: #000;
		height: 0.4rem;
		line-height: 0.4rem;
		padding: 0.1rem 0;
	}
	.list-note-start .iconfont{
		color: #ffaa00;
		font-size: 0.3rem;
	}
	.note-start-total{
		color: #909090;
	}
	.comment-list-intro{
		color: #3ebaed;
	}
	.comment-list-intro .iconfont{
		font-size: 0.3rem;
	}
</style>