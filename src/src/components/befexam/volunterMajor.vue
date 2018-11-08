<template>
	<div v-show="isShow" class="majorShow">
		<div id="volunterMajor">
			<mt-header fixed title="志愿专业填报">
				<router-link to="/registerRecord" slot="left">
					<mt-button icon="back" v-tap='{methods:goBack}'></mt-button>
				</router-link>
			</mt-header>
			<div class="major-list">
				
				<div class="major-common" v-if='topArr.length>0'>
					已选志愿（拖动排序）
				</div>
				
				<draggable :list="topArr" v-model="topList">
					<div class="major-item" v-for='(Arr,index,key) in topArr'>
						{{Arr.profName}}
						<mt-badge type="primary" size="small">{{index+1}}</mt-badge>
						<i class="iconfont icon-guanbi" @click='removeArr(index,Arr)'></i>
					</div>
				</draggable>
				
				<div class="major-common" id="changeText">
					志愿专业列表（点击选择，最多可显示<span>{{profLen.zhiYuanShu}}</span>个）
				</div>
				<div class="major-item" @click="topMajor(art,key)" 
					v-for="(art,key,index) in bottomArr">
					{{art.profName}}
					<mt-badge type="primary" size="small">{{key+1}}</mt-badge>
				</div>
			</div>
			<!--按钮-->
			<template v-if='topArr.length!=0'>
				<mt-button size="large" type="primary" v-tap="{methods:majorClick}">
					确定
				</mt-button>
			</template>
			<template v-else>
				<mt-button size="large" type="default" v-tap="{methods:majorClick}">
					确定
				</mt-button>
			</template>
			
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import { Toast } from 'mint-ui';
	import draggable from 'vuedraggable'
	
	export default {
		name: 'volunterMajor',
		data() {
			return {
				proflist: '',//专业方向查询数据
				profLen: '', //志愿数
				topList:[],//选中的数组
				isShow: false,
				topArr: [],
				bottomArr: []
			}
		},
		components: {
            draggable
        },
		mounted(){
			this.$bus.on("CollegelistEvent",this.onCollegelistEvent);
		},
		methods:{
			goBack(){
				this.isShow = false;
			},
			Toast(meg){
				Toast({
				  	message: meg,
				  	position: 'middle',
				  	duration: 2000
				});
			},
			onCollegelistEvent(data){
				var that = this;
				this.isShow = true;
				this.profLen = data.item;
				this.index = data.index;
				/*考前专业方向查询*/
				var d = {
					"xueXiaoID": data.item.xueXiaoID,
					"kaoShiID": data.item.kaoShiID,
					"fuZhuanYe": data.item.zhuanYeID
				}
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/query_profVol.htm", d, function(d) {
					if(d.success) {
						that.proflist = d.datas.list;
						if(!(that.bottomArr.length > 0)) {
							that.bottomArr = [];
							for(var i = 0; i < that.proflist.length; i++) {
								that.bottomArr.push({
									profOrder: i + 1,
									profName: that.proflist[i].zhuanYeMC,
									profId: that.proflist[i].zhuanYeID
								})
							}
						}
						//两数组比对相同的删除
						if(that.profLen.profVol != null) {
							
							if(that.profLen.profVol && that.profLen.profVol.length > 0) {
								that.topArr = [];
								for(var i = 0, len = that.profLen.profVol.length; i < len; i++) {
									
									that.topArr.push({
										profOrder:that.profLen.profVol[i].profOrder,
										profName: that.profLen.profVol[i].profName,
										profId: that.profLen.profVol[i].profId
									})
									for(var j = 0, leg = that.topArr.length; j < leg; j++) {
										for(var f = 0, lag = that.bottomArr.length; f < lag; f++) {
											if(that.bottomArr[f]) {
												if(that.topArr[j].profName == that.bottomArr[f].profName) {
													that.bottomArr.splice(f, 1);
												}
											}
										}
									}
								}
								return;
							}
						}
					}
				})
			},
			topMajor(art, k) { //下面数组push上面数组
				var that = this;
				if(this.topArr.length < that.profLen.zhiYuanShu){
					this.topArr.push(art);
					this.bottomArr.splice(k, 1);
				}else{
					that.Toast('只能填报'+that.profLen.zhiYuanShu+'个志愿');
				}
			},
			removeArr(index, value) { //移除上面的数组
				this.topArr.splice(index, 1);
				this.bottomArr.push(value);
			},
			/*点击确定按钮提交志愿*/
			majorClick() {
				var that = this;
				if(this.topArr.length < this.profLen.zhiYuanShu){
					this.Toast('您尚有志愿未选择');
					return ;
				}
				this.isShow = false;
				var that = this;
				for(var i = 0, len = this.topArr.length; i < len; i++) {
					this.topArr[i].profOrder = i + 1;
				}
				/*考前填报志愿保存接口*/
				var d = {
					"baoKaoID": this.profLen.baoKaoID, //学校ID[不可空]
					"volList": this.topArr //志愿列表[不可空]
				}
				ajaxMethod.doAjax("befexam,/api/m/auth/apply/save_prof_vol.htm", d, function(d) {
					if(d.success){
						that.$bus.emit('volunterMajorEvent'+that.index,that.topArr);
					}else{
						that.Toast(d.message);
					}
				})
				
			},
		}
	}
</script>
<style>
.majorShow {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow-y: auto;
	background: #f9f9f9;
	z-index: 1000000;
}
#volunterMajor {
	width: 100%;
	height: 100%;
	position: relative;
}
#volunterMajor .major-list {
	font-size: 0.28rem;
	padding-top: 0.81rem;
}
#volunterMajor .major-common {
	height: 0.74rem;
	font-size: 0.28rem;
	line-height: 0.74rem;
	padding-left: 0.2rem;
	background: #eee;
}
#volunterMajor .major-list .major-hid {
	display: none;
}
#volunterMajor .major-list .major-item {
	height: 0.7rem;
	line-height: 0.7rem;
	padding-left: 0.8rem;
	border-bottom: 1px solid #eeeeee;
	background: #f9f9f9;
	position: relative;
}
#volunterMajor .major-list .major-item.dragging {
	background: #fff;
}
#volunterMajor .major-list .major-item-active {
	background: #c7c7c7;
}
#volunterMajor .major-list .major-item .mint-badge.is-size-small {
	width: 0.34rem;
	height: 0.34rem;
	padding: 0.05rem;
	border-radius: 50%;
	line-height: 0.34rem;
	font-size: 0.3rem;
	position: absolute;
	top: 0.13rem;
	left: 0.2rem;
}
#volunterMajor .mint-button--large {
	position: fixed;
	bottom: 0.6rem;
	left: 0.3rem;
	width: 90%;
	height: 0.86rem;
}
.mint-toast{
	z-index: 999999999!important;
}
#volunterMajor .mint-button--primary {
	background: #42cefc;
}
#volunterMajor .major-item .icon-guanbi {
	position: absolute;
	top: 0;
	right: 0.26rem;
	font-size: 0.38rem;
}
</style>