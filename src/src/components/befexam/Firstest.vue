<template>
	<div id="firstTest">
		<mt-header fixed title="成绩列表">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<template v-if='dataLength'>
		    <Datenote dataNoteMessage='暂无初试成绩'></Datenote>
		</template>
		<template v-else>
		    <Pulldown>
			    <div class="global" ref='pullDown' slot='content'>
				<div class="gradeList" v-for="(item,key,index) in data">
					<div class="logo">
						<img :src="item[index].logo" alt="学校图片" />
						<span>{{item[index].xueXiaoMC}}</span>
					</div>
					<div class='listItem' v-for="(listitem,listkey,listindex) in item[index].esList">
						<div class='grade' v-for="listintro in listitem.epaList">
						    <p class='grade-exam'>考试:<span>{{listintro.kaoShiMC}}</span></p>
							<ul class="listitle">
								<li>考点:<span>{{listintro.kaoDianMC}}</span></li>
								<li>专业:<span>{{listintro.zhuanYeMC}}</span></li>
								<li>考试时间:<span>{{listintro.kaoShiRQStr}}</span></li>
								<li>复试说明:<span>{{listintro.fuShiSM}}</span></li>
								<li>总成绩:<span>{{listintro.zongCJ}}</span></li>
								<li>合格标志:<span>{{listintro.passStr}}</span></li>
							</ul>
							<router-link :to="{path:'/Listintro/'+listintro.id}" class="listIntro">
								查看详情
							</router-link>
						</div>

					</div>
				</div>

			</div>
		    </Pulldown>
		</template>
		
		<Loading v-show="loading"></Loading>
	</div>
</template>
<script>
	import Vue from 'vue';
//	import { Header } from 'mint-ui';
//	import { Button } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Loading from '../public/Loading.vue'
	import Datenote from '../public/DataNote.vue'
	import Pulldown from '../public/loadmore.vue'
	import VueBus from 'vue-bus';
	Vue.use(VueBus);
//	Vue.component(Button.name, Button);
//	Vue.component(Header.name, Header);
	export default {
		name: "firstTest",
		data() {
			return {
				data: "",
				//数据有无
				dataLength: false,
				//动画显示
				loading: true
			}
		},
		methods: {
			fixdata() {
				var data = {};
				var that = this;
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_exam_profachieve.htm", data, function(database) {
					if(database.success) {
						if(database.datas.list) {
						
							that.data = database.datas;
							

						}

					} else {
						Toast({
							message: database.message,
							position: 'middle',
							duration: 5000
						});
					}
				}, function() {
					if(!that.data){
						that.dataLength = true;
					}
					that.loading = false
				})
			}
		},
		mounted() {
			this.fixdata();
			//刷新数据
			this.$bus.on("pulldown", this.fixdata);

		},
		components: {
			Loading: Loading,
			Datenote: Datenote,
			Pulldown: Pulldown
		}
	}
</script>

<style scoped>
	#firstTest {
	width: 100%;
	height: 100%;
}

#firstTest .global {
	padding: 0.2rem 0 50px 0.2rem;
	box-sizing: border-box;
}

#firstTest .gradeList {
	position: relative;
	font-size: 0.25rem;
	background: #fff;
	color: #444444;
	padding: 0 0.2rem;
}

#firstTest .gradeList .logo {
	box-sizing: border-box;
	overflow: hidden;
	padding: 0.2rem 0;
}

#firstTest .gradeList .logo img {
	width: 1.2rem;
	height: 1.2rem;
	display: inline-block;
}

#firstTest .gradeList .logo span {
	padding-left: 20px;
	height: 1.2rem;
	line-height: 1.2rem;
	float: left;
	display: inline-block;
}

#firstTest .gradeList .listItem {
	position: relative;
}

#firstTest .gradeList .listItem .grade {
	box-sizing: border-box;
	overflow: hidden;
	height: auto;
	border-bottom: 1px solid #f4f4f4;
	position: relative;
}

#firstTest .gradeList .listItem .listitle {
	box-sizing: border-box;
    padding-right: 1.6rem;
}

#firstTest .gradeList .listItem .listitle li {
	margin: 10px 0;
}
#firstTest .gradeList .grade-exam{
      margin: 10px 0;  
}
#firstTest .gradeList .listItem  span {
	padding-left: 5px;
}

#firstTest .gradeList .listItem .listIntro {
    position: absolute;
    background: #42cefc;
    color: #fff;
    border-radius: 5px;
    right: 0;
    top: 50%;
    width: 1.5rem;
    display: block; 
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    transform: translate(0,-50%);
}
</style>