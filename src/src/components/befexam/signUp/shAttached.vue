<template>
	<div class="mediaInfo">
		<mt-header fixed title="附中报考资料">
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
        	<div class="info-list">
        		<div class="list-detail">
	        		<h3 class="info-list-h">
	        			<span>
		        			<i class="iconfont icon-mihao red"></i>
		        			补充资料
	        			</span>
	        		</h3>
	        		<mt-field label="户籍省份" placeholder="上海考生请输入12位报考号" type="number" v-model="en_Examin_no" :disableClear='true'>
	        		</mt-field>
	        		
					<div v-if="guomei">
		        		<mt-field label="起止时间" placeholder="上海考生请输入12位报考号" type="number" v-model="en_Examin_no" :disableClear='true'>
		        			
		        		</mt-field>
		        	</div>
		        	<div v-if="guomeiSh">
		        		<mt-field label="报考号" placeholder="上海考生请输入12位报考号" type="number" v-model="en_Examin_no" :disableClear='true'>
	        			
	        			</mt-field>	
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
    	Field,Button,Indicator,Toast,MessageBox  
	} from 'mint-ui';
	Vue.component(Field.name, Field);
	Vue.component(Button.name, Button);
	export default{
		data(){
			return{
				en_Examin_no:'',//报考号
				stuType:'',//学生类型
				gaoKaoSFH:"",//高考省份号
				guomei:false,
				guomeiSh:false,
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
					that.en_Examin_no=d.datas.obj.shangHaiExamNO;
					that.stuType=d.datas.obj.stuType;
					that.gaokaoSFH=d.datas.obj.gaoKaoSFH;
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
				var shData={
					gaokaoSFH:this.gaokaoSFH,
					stuType:this.stuType,
					shangHaiExamNO:that.en_Examin_no,
					updateShangHaiExamNO:true
				}
				console.log(shData)
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
</style>