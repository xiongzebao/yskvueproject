<template>
    <div class="attendent-calendar">
    	<mt-header title="出勤月历" class="calendar-header">
		  <router-link to="/" slot="left">
			<mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
  		<section class="calendar-main">
  			<div class="calendar-main-user">
  				<div class='main-user-logo'>
  					<div><img src="../../../static/img/AttendentClass/user-logo.jpg" alt="用户logo"></div>
  					
  					<p>(英雄)邱少云</p>
  				</div>
  				<div>{{dateTime}}</div>
  			</div>
  			<div class="calendar-main-calen">
  				<div class="calendar-week">
  					<div class="calendar-week-type">一</div>
  					<div class="calendar-week-type">二</div>
  					<div class="calendar-week-type">三</div>
  					<div class="calendar-week-type">四</div>
  					<div class="calendar-week-type">五</div>
  					<div class="calendar-week-type">六</div>
  					<div class="calendar-week-type">日</div>
  				</div>
  				<div class="calendar-day">
  					<template v-for='(list,index) in calendarDayData'>
						<div class="calendar-day-detail" @click='onCalendarShow(index)'>
							<template v-if="list.value=='0'">
								<p></p>
							</template>
							<template v-else>
								<p :class="['day-detail-num',list.status?'detail-num-choose':'']">{{list.value}}</p>
								<p class='day-detail-dot iconfont icon-quan'></p>
							</template>
						</div>
  					</template>
  				</div>
  			</div>
  		</section>
   		
    </div>
</template>

<script>
    export default {
		name:"calendar",
        data () {
            return {
				dateTime:"",
				calendarDayData:[]
            }
        },
        components: {
        },
		mounted(){
			this.setCalendarDate();
			this.setDateTime();
		},
		methods:{
			onCalendarShow(dayIndex){
				if(dayIndex){
					for(let i in this.calendarDayData){
						this.calendarDayData[i].status=false;
					}
					this.calendarDayData[dayIndex].status=true;
				}
			},
			setDateTime(){
				let currtDate=new Date();
				let year=currtDate.getFullYear();
				let month=currtDate.getMonth()+1;
				let day=currtDate.getDate();
				let week=currtDate.getDay();
				let weekDetail="";
				if(week=='0'){
					weekDetail='星期日'
				}else if(week=='1'){
					weekDetail='星期一'
				}else if(week=='2'){
					weekDetail='星期二'
				}else if(week=='3'){
					weekDetail='星期三'
				}else if(week=='4'){
					weekDetail='星期四'
				}else if(week=='5'){
					weekDetail='星期五'
				}else if(week=='6'){
					weekDetail='星期六'
				}
				this.dateTime=year+"-"+month+"-"+day+" "+weekDetail
			},
			setCalendarDate(){
				let calendarArr=[];
				for(let i=0,len=31;i<len;i++){
					calendarArr[i]={
						"status":false,
						"value":i
					}
				}
				/*获取对应格式日期*/
				let currtDate=new Date();
				let year=currtDate.getFullYear();
				let month=currtDate.getMonth();
				let day=currtDate.getDate()
//				console.log(""+year+(month+1)+1)
				/*获取每月一号日期*/
				let currtDay=new Date(year,month,1).getDay();
//				let currtDay=new Date(2017,7,1).getDay();
				let currtLength=0
				if(currtDay==0){
					currtLength =6;
				}else{
					currtLength =currtDay-1;
				}
				for(let j=1;j<currtLength;j++){
					calendarArr.unshift({
						"value":0
					})
				}
			this.calendarDayData=calendarArr;
			}
		}
    }
</script>

<style>
	.attendent-calendar{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.calendar-header{
		flex-shrink: 0;
	}
	.calendar-main{
		flex-grow: 1;
		overflow-y: auto;
		overflow-scrolling: touch; 
	}
	.calendar-main-user{
		display: flex;
		padding: 0.36rem 10px;
		box-sizing: border-box;
		align-items: center;
		background: #fff;
		font-size:0.36rem;
		justify-content: space-between;
	}
	.main-user-logo{
		display: flex;
		width: 40%;
	}
	.main-user-logo p{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		line-height: 1.2rem;
	}
	.main-user-logo img{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 100%;
		flex-shrink: 0;
	}
	.calendar-main-calen{
		padding: 0 10px;
		box-sizing: border-box;
		font-size: 0.2rem;
	}
	.calendar-week{
		display: flex;
		flex-wrap: nowrap;
	}
	.calendar-week-type{
		width: 14%;
		text-align: center;
		padding-top: 0.15rem;
	}
	.calendar-day{
		display: flex;
		flex-wrap: wrap;
	}
	.calendar-day-detail{
		width: 14%;
		text-align: center;
		padding: 0.15rem 0;
	}
	.day-detail-num{
		width: 0.6rem;
		height: 0.6rem;
		margin: 0 auto;
		line-height: 0.6rem;
		text-align: center;
		border-radius: 100%;
	}
	.detail-num-choose{
		background-color: #4a8ff5;
	}
</style>