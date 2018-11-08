<template>
   <div class='attendent-class'>
		<section class="attendent-class-main">
			<section class='class-main-user'>
				<div class='class-main-user-logo'><img src="../../../static/img/AttendentClass/user-logo.jpg" alt="用户logo"></div>
				<div class="class-main-user-infor">
					<p class="main-user-infor-name">小鱼(邱振宇)</p>
					<p>考勤组:亦闲信息</p>
				</div>
				<div class="class-main-user-date">
					<span>2017年6月</span><span class="iconfont icon-unfold"></span>
				</div>
			</section>
			<section class='class-main-month'>
				<div class='class-main-month-title'>出勤月度汇总</div>
				<div class='class-main-month-choose'>
					<span class="iconfont icon-rili-yue"></span><span>出勤月历</span>
				</div>
			</section>
			<section class='class-main-detail'>
				<div class='class-main-detail-list'>
					<div class="main-detail-list-top">
						<div class='class-main-detail-note' @click='onAttendDay'>
							<div class="detail-note-title">出勤课时</div>
							<div class="detail-note-intro">
								<span>22天</span>
								<template v-if='attendDayFlag'><span class="iconfont icon-shouqi"></span></template>
								<template v-else><span class="iconfont icon-unfold"></span></template>

							</div>
						</div>
					</div>
					<template v-if='attendDayFlag'>
						<ul class='class-main-detail-lists'>
							<li @click="onCalendarDetail">2017年6月 ( 星期四 )</li>
						</ul>
					</template>	
					</div>
				<div class='class-main-detail-list'>
					<div class="main-detail-list-top">
						<div class='class-main-detail-note' @click='onLeaveDay'>
						<div class="detail-note-title">请假天数</div>
						<div class="detail-note-intro">
							<span>22天</span>
							<template v-if='leaveDayFlag'><span class="iconfont icon-shouqi"></span></template>
							<template v-else><span class="iconfont icon-unfold"></span></template>	
						</div>
					</div>
				</div>
					<template v-if='leaveDayFlag'>
						<ul class='class-main-detail-lists'>
							<li @click="onCalendarDetail">2017年6月 ( 星期四 )</li>
						</ul>
					</template>	
				</div>
				<div class='class-main-detail-list'>
					<div class="main-detail-list-top">
						<div class='class-main-detail-note' @click='onBeLate'>
							<div class="detail-note-title">迟到</div>
							<div class="detail-note-intro">
								<span>1次,&nbsp;&nbsp;共9分钟</span>
								<template v-if='beLateFlag'><span class="iconfont icon-shouqi"></span></template>
								<template v-else><span class="iconfont icon-unfold"></span></template>

							</div>
						</div>
					</div>
					<template v-if='beLateFlag'>
						<ul class='class-main-detail-lists'>
							<li @click="onCalendarDetail">2017年6月 ( 星期四 )</li>
						</ul>
					</template>	
				</div>
				<div class='class-main-detail-list'>
				  <div class="main-detail-list-top">
						<div class='class-main-detail-note' @click='onLeaveEarly'>
							<div class="detail-note-title">早退</div>
							<div class="detail-note-intro">
								<span>1次,&nbsp;&nbsp;共9分钟</span>
								<template v-if='leaveEarlyFlag'><span class="iconfont icon-shouqi"></span></template>
								<template v-else><span class="iconfont icon-unfold"></span></template>

							</div>
						</div>
					</div>
					<template v-if='leaveEarlyFlag'>
						<ul class='class-main-detail-lists'>
							<li @click="onCalendarDetail">2017年6月 ( 星期四 )</li>
						</ul>
					</template>	
				</div>
				<div class='class-main-detail-list'>
				  <div class="main-detail-list-top">
					<div class='class-main-detail-note' @click='onAbsentDuty'>
						<div class="detail-note-title">缺勤</div>
						<div class="detail-note-intro">
							<span>1次,&nbsp;&nbsp;共9分钟</span>
							<template v-if='absentDutyFlag'><span class="iconfont icon-shouqi"></span></template>
							<template v-else><span class="iconfont icon-unfold"></span></template>	
						</div>
					  </div>
					</div>
					<template v-if='absentDutyFlag'>
						<ul class='class-main-detail-lists'>
							<li @click="onCalendarDetail">2017年6月 ( 星期四 )</li>
						</ul>
					</template>	
				</div>
			</section>
		</section>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				attendDayFlag:false,
				leaveDayFlag:false,
				beLateFlag:false,
				leaveEarlyFlag:false,
				absentDutyFlag:false
            }
        },
        components: {
        },
		methods:{
			onCalendarDetail(){
				this.$router.push('/AttendentCalendar')
			},
			onAttendDay(){
				this.attendDayFlag=!this.attendDayFlag;
			},
			onLeaveDay(){
				this.leaveDayFlag=!this.leaveDayFlag;
			},
			onBeLate(){
				this.beLateFlag=!this.beLateFlag;
			},
			onLeaveEarly(){
				this.leaveEarlyFlag=!this.leaveEarlyFlag;
			},
			onAbsentDuty(){
				this.absentDutyFlag=!this.absentDutyFlag;
			}
		}
    }
</script>

<style>
	.attendent-class{
		width: 100%;
		height: 100%;
		background-color: #fff;
		
	}
	.class-main-user{
		display: flex;
		padding: 0.2rem 10px;
		box-sizing: border-box;
		align-items: center;
		background: #fff;
		font-size:0.24rem;
		color: #909090;
	}
	.class-main-user-logo{
		width: 0.9rem;
		height: 0.9rem;
		flex-shrink: 0;
		
	}
	.class-main-user-logo img{
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	.class-main-user-infor{
		flex-grow: 1;
		padding-left: 0.16rem;
		box-sizing: border-box;
	}
	.class-main-user-infor p{
		height: 0.45rem;
		line-height: 0.45rem;
	}
	.class-main-user-date{
		flex-shrink: 0;
	}
	.class-main-user-date .iconfont{
		font-size: 0.36rem;
	}
	.main-user-infor-name{
		font-size: 0.3rem;
		color: #222;	
	}
	.class-main-month{
		display: flex;
		align-content: space-around;
		padding: 0.3rem 10px;
		font-size:0.28rem;
		justify-content: space-between;
		background-color: #f4f4f4;
	}
	.class-main-month-choose{
		color: #3ebaed;
		display: flex;
		align-items: center;
	}
	.icon-rili-yue{
		font-size: 0.35rem;
		padding-right: 5px;
	}
	.class-main-detail{
		font-size: 0.3rem;
	}
	.main-detail-list-top{
		padding-left: 10px;
		box-sizing: border-box;
		background-color: #fff;
	}
	.class-main-detail-note{
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		padding: 0.3rem 10px 0.3rem 0;
		background-color: #fff;
		background-image: linear-gradient(180deg,#909090,#909090 50%,transparent 0);
		background-size: 120% 1px;
		background-repeat: no-repeat;
		background-position: 0 100%;
	}
	
	.class-main-detail-note .iconfont{
		font-size: 0.25rem;
	}
	.detail-note-title{
		color: #222;
	}
	.detail-note-intro{
		color: #909090;
		padding-right:10px;
	}
	.class-main-detail-lists{
		background-color: #f8f8f8;
		padding-left: 10px;
		box-sizing: border-box;
		
	}
	.class-main-detail-lists li{
		padding: 0.48rem 10px 0.48rem 0;;
		border-bottom: 1px solid #ececec;
	}
</style>