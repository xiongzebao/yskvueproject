<template>
	<div class="mediaInfo">
		<mt-header fixed title="完善户口类型">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="info-body">
        	<div class="info-header">
	        	<p>
	        		<i class="iconfont icon-yousanjiao"></i>
	        		<span>
	        			烦请认真填写考生资料并仔细核对，信息一经提交后不可修改，如出现错误需电脑登录www.artstduent.cn进行申请
	        		</span>
	        	</p>
	        	<!-- <p>
	        		<i class="iconfont icon-yousanjiao"></i>
	        		<span>为确保考生报考准确，烦请认真填写考生资料并仔细进行核对</span>
	        	</p> -->
	        	<p>
	        		<i class="iconfont icon-gou"></i>
	        		<span>艺考升平台确保您的信息安全</span>
	        	</p>
        	</div>
    		<mt-popup
	            v-model="huKouChoice"
	            position="middle"
	            popup-transition="popup-in"
	            class="prop-div"
	            >
	            <div>
	                <div class="choice-title">{{propTitle_1}}</div>
	                <ul class="choice-lists">
	                    <li>
	                        <mt-radio
	                          align="left"
	                          v-model="huKou"
	                          :options="huKouList">
	                        </mt-radio>
	                    </li>
	                </ul>
	                <div class="prop-btm">
	                    <span class="prop-btn" @click="sure_btn">
	                        确定
	                    </span>
	                </div>
	            </div>
	        </mt-popup>
        	<div class="info-list">
        		<div class="list-detail">
	        		<h3 class="info-list-h">
	        			<span>
		        			<i class="iconfont icon-mihao red"></i>
		        			补充资料
	        			</span>
	        		</h3>
	        		<div class="ksHK">
	        			<div class="hk-tit">考生户口</div>
	        			<div class="hkXZ" @click="choice_hk">
	        				{{huKou.split(",")[0]}}
	        				<span class="xz-cion"></span>
	        			</div>
	        		</div>
	        	</div>
	        	<div class="submit-btn">
        			<mt-button @click="sure_btn_confirm" class="color-diy" size="normal">确认</mt-button>
        		</div>
        	</div>
        </div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
    	Cell ,Button,Indicator,Toast,MessageBox  
	} from 'mint-ui';
	Vue.component(Button.name, Button);
	Vue.component(Cell.name, Cell);
	export default{
		data(){
			return{
				huKouChoice:false,//选择户口的弹出框
				huKou:'',//户口类型
				stuType:'',//学生类型
				gaoKaoSFH:"",//高考省份号
				propTitle_1:"请选择户口",
				huKouList:[
					{
						label:"农村",
						value:'农村,1'
					},
					{
						label:"城镇",
						value:"城镇,2"
					}
				]
			}
		},
		watch:{

		},
		mounted(){
			var that=this;
			var url="user,/api/m/auth/user/get_stuinfo.htm";
			var data={};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url,{},function(d){
				Indicator.close();
				if(d.success){
					that.huKou=""+d.datas.obj.huKou;
					that.stuType=d.datas.obj.stuType;
					that.gaokaoSFH=d.datas.obj.gaoKaoSFH;
					if(that.huKou=="null"){
						that.huKou="请选择,0";
						return;
					}
					switch(Number(that.huKou)){
						case 0:
							that.huKou="请选择,0";
						break;
						case 1:
							that.huKou="农村,1";
						break;
						case 2:
							that.huKou="城镇,2";
						break;
					}
					// if(that.huKou==0){
					// 	that.huKou="请选择,0";
					// }
				}else{
					Toast({
						message:d.message,
						duration:2000
					});
				}
			})
		},
		methods:{
			sure_btn_confirm(){
				var that=this;
				var subUrl="user,/api/m/auth/user/save_extend_stuinfo.htm";
				if(that.huKou.split(",")[1]==0){
					Toast({
							message:'请选择户口类型',
							duration:1500
						});
					return;
				}
				var shData={
						gaokaoSFH:this.gaokaoSFH,
						stuType:this.stuType,
						huKou:that.huKou.split(",")[1],
						updateHuKou:true
					}
				ajaxMethod.doAjax(subUrl,shData,function(d){
					if(d.success){
						MessageBox({
							title: '提示',
							message: d.message,
							showCancelButton: false
						}).then(action=>{
							if(action == 'confirm'){
								that.$router.go(-1)
							}
						});
					}else{
						Toast({
							message:d.message,
							duration:2000
						});
					}
				})
			},
			sure_btn(){
				this.huKouChoice=false;
			},
			choice_hk(){
				this.huKouChoice=true;
			}
		}
	}
</script>
<style scoped>
	.lf {
	    float: left;
	}

	.rf {
	    float: right;
	}

	.f-fixed:after {
	    content: '\200b';
	    display: block;
	    height: 0;
	    clear: both;
	}
	.mediaInfo{font-size:.3rem;}
	.mediaInfo .info-body{background: #fff;position:fixed;top:.8rem;bottom:0;left:0;right:0;overflow: auto;}
	.mediaInfo .info-body .info-header{padding:.1rem;border-bottom:1px solid #ddd}
	.mediaInfo .info-body .info-header p{display:flex;margin:.1rem 0;}
	.mediaInfo .info-body .info-header p i{color:#85E0FF;font-size:.3rem;}
	.mediaInfo .info-body .info-header p span{color:#FD3939;font-size:.25rem;}
	.mediaInfo .info-body .info-list .list-detail .info-list-del{padding:.1rem 0;display:flex;align-items: center;border-bottom:1px solid #ddd;}
	.mediaInfo .info-body .info-list {padding:0 .1rem;}
	.list-detail .info-list-h{margin:.1rem 0;}
	.list-detail .info-list-h span:first-child{display:inline-flex;align-items: center;}
	.list-detail .info-list-h i{font-size:.1rem;}
	.list-detail .red{color:#f00;}
	.submit-btn{text-align:center;margin:2rem 0 .4rem}
	.submit-btn .color-diy{background:#FF9900;color:#fff;width:50%;letter-spacing: 7px;}

	.choice-title{
	    text-align: center;
	    font-size: .3rem;
	    color: #010101;
	    background: #EEEEEE;
	    padding: .2rem 0;
	}
	.prop-div{width:80%;overflow: auto;border-radius: .1rem;}
	.prop-btm{
	    background: #EFEFEF;
	    padding: .2rem;
	}
	.choice-lists{
	    max-height: 5rem;
	    overflow: auto;
	    font-size: .3rem;
	    min-height: 2rem;
	}
	.prop-btm .prop-btn{
	    background: #42CEFC;
	    font-size: .3rem;
	    color: #fff;
	    display: block;
	    text-align: center;
	    padding: .15rem 0;
	    border-radius: .1rem;
	}
	.ksHK{display:flex;font-size:.25rem;align-items: center;border-bottom: 1px solid #ddd;}
	.ksHK .hk-tit{width:1.2rem;}
	.ksHK .hkXZ{width:calc(100% - 1.2rem);padding:.15rem;height:.4rem;line-height: .4rem;position:relative;}
	.ksHK .xz-cion{position:absolute;top:50%;right:.3rem;width:.2rem;height:.2rem;border:1px solid transparent;border-top-color:#42cefc;border-left-color:#42cefc;transform: translateY(-50%) rotate(135deg);}
</style>