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
        	<!-- 户籍省份 -->
        	<mt-popup
			  	v-model="popupVisible"
			  	position="middle">
			  	<div>
			  		<div class="prop-t">
			  			选择户籍省份
			  		</div>
				  	<div class="prop-huji">
				  		<ul>
				  			<li>
				  				<mt-radio
	                          		align="left"
	                          		v-model="huJiSZSFMC_str"
	                          		:options="prov_1">
	                        	</mt-radio>
				  			</li>
				  		</ul>
				  	</div>
				  	<div class="prop-btm">
				  		<span class="prop-btn" v-tap="{methods:hide_prop}">
				  			确定
				  		</span>
				  	</div>
			  	</div>
			</mt-popup>
			<!-- 开始时间 -->
			<mt-popup 
					v-model="popupTime" 
                    position="bottom" 
                    class="mint-pop-popupMajor" 
                    pop-transition='popup-fade' 
                    :closeOnClickModal="true" 
                    :showToolbar='true'>
                <mt-picker 
                		:slots="times" 
                        valueKey="i" 
                        @change="MajorValuesChange" 
                        :showToolbar='true'>
                    <span class="mint-datetime-action mint-datetime-cancel" @click="zhuanyeCancle()">
                        取消
                    </span>
                    <span class="mint-datetime-action mint-datetime-confirm" @click="zhuanyeConfirm()">     
                        确定
                    </span>
                </mt-picker>
            </mt-popup>
            <!-- 结束时间 -->
			<mt-popup 
					v-model="popupEndTime" 
                    position="bottom" 
                    class="mint-pop-popupMajor" 
                    pop-transition='popup-fade' 
                    :closeOnClickModal="true" 
                    :showToolbar='true'>
                <mt-picker 
                		:slots="endTimes" 
                        valueKey="i" 
                        @change="endTimeChange" 
                        :showToolbar='true'>
                    <span class="mint-datetime-action mint-datetime-cancel" @click="zhuanyeCancle()">
                        取消
                    </span>
                    <span class="mint-datetime-action mint-datetime-confirm" @click="zhuanyeConfirm()">     
                        确定
                    </span>
                </mt-picker>
            </mt-popup>
        	<div class="info-list">
        		<div class="list-detail">
	        		<h3 class="info-list-h">
	        			<span>
		        			<i class="iconfont icon-mihao red"></i>
		        			补充资料
	        			</span>
	        		</h3>
	        		<div class="hujisf">
	        			<div class="hjsf-tit">户籍省份</div>
	        			<div class="hjsf-val">
	        				<input type="text" readonly v-model="huJiSZSFMC" placeholder="请选择户籍省份" v-tap="{methods:choice_prov}">
	        			</div>
	        		</div>
	        		
					<div v-if="guomei">
						<mt-field label="户口地址" v-model="huJiDZ" placeholder="请输入户籍所在地址">
		        			
		        		</mt-field>
		        		<div class="hujisf time-condtrol">
		        			<div class="hjsf-tit">
		        				就读学校<br>
		        				起止时间
		        			</div>
		        			<div class="hjsf-val">
		        				<div class="ss">
		        					<input readonly type="text" v-model="startTime" readonly="readonly" placeholder="请选择开始时间" @click="choice_time">
								</div>
								<div class="ss sss">
									-
								</div>
								<div class="ss">
		        					<input readonly type="text" v-model="endTime" placeholder="请选择结束时间" @click="choice_Endtime">
		        				</div>
		        			</div>
		        		</div>
		        	</div>
		        	<div v-if="guomeiSh">
		        		<mt-field label="报考号" v-model="shangHaiExamNO" placeholder="上海考生请输入12位报考号" type="number" :disableClear='true'>
	        			
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
    	Field,Button,Indicator,Toast,MessageBox,Popup,Radio    
	} from 'mint-ui';
	Vue.component(Field.name, Field);
	Vue.component(Button.name, Button);
	Vue.component(Popup.name, Popup);
	Vue.component(Radio.name, Radio);
	export default{
		data(){
			return{
				prov:[
			     	{'text':'北京市','provinceid':'110000'},
			     	{'text':'天津市','provinceid':'120000'},
			     	{'text':'河北省','provinceid':'130000'},
			     	{'text':'山西省','provinceid':'140000'},
			     	{'text':'内蒙古','provinceid':'150000'},
			     	{'text':'辽宁省','provinceid':'210000'},
			     	{'text':'吉林省','provinceid':'220000'},
			     	{'text':'黑龙江省','provinceid':'230000'},
			     	{'text':'上海市','provinceid':'310000'},
			     	{'text':'江苏省','provinceid':'320000'},
			     	{'text':'浙江省','provinceid':'330000'},
			     	{'text':'安徽省','provinceid':'340000'},
			     	{'text':'福建省','provinceid':'350000'},
			     	{'text':'江西省','provinceid':'360000'},
			     	{'text':'山东省','provinceid':'370000'},
			     	{'text':'河南省','provinceid':'410000'},
			     	{'text':'湖北省','provinceid':'420000'},
			     	{'text':'湖南省','provinceid':'430000'},
			     	{'text':'广东省','provinceid':'440000'},
			     	{'text':'广西','provinceid':'450000'},
			     	{'text':'海南省','provinceid':'460000'},
			     	{'text':'重庆市','provinceid':'500000'},
			     	{'text':'四川省','provinceid':'510000'},
			     	{'text':'贵州省','provinceid':'520000'},
			     	{'text':'云南省','provinceid':'530000'},
			     	{'text':'西藏','provinceid':'540000'},
			     	{'text':'陕西省','provinceid':'610000'},
			     	{'text':'甘肃省','provinceid':'620000'},
			     	{'text':'青海省','provinceid':'630000'},
			     	{'text':'宁夏','provinceid':'640000'},
			     	{'text':'新疆','provinceid':'650000'},
			     	{'text':'台湾省','provinceid':'710000'},
			     	{'text':'香港','provinceid':'810000'},
			     	{'text':'澳门','provinceid':'820000'}
				],
				prov_1:[],
				xueXiaoID:"",
				guomei:false,
				guomeiSh:false,
				huJiSZSFMC:"",
				gaokaoSFH:"",
				stuType:'',
				midSchStartEndTime:'',//起止时间
				shangHaiExamNO:'',//上海报考号
				huJiDZ:"",//国美附中户籍地址
				popupVisible:false,
				huJiSZSFMC_str:"",
				popupTime:false,
				popupEndTime:false,
				startTime:'',
				endTime:'',
				huJiSZSF:"",
				times:[
					{
						flex: 1,
						values: [{
							i:"1990",
							val:"1990"
						}],
	                	className: 'slot1',
	                	textAlign: 'right'
					},
					{
						divider: true,
          				content: '-',
          				className: 'slot2'
					},
					{
						flex: 1,
						values: [{
							i:"01",
							val:"01"
						}],
	                	className: 'slot3',
	                	textAlign: 'left'
					}
				],
				endTimes:[
					{
						flex: 1,
						values: [{
							i:"1990",
							val:"1990"
						}],
	                	className: 'slot1',
	                	textAlign: 'right'
					},
					{
						divider: true,
          				content: '-',
          				className: 'slot2'
					},
					{
						flex: 1,
						values: [{
							i:"01",
							val:"01"
						}],
	                	className: 'slot3',
	                	textAlign: 'left'
					}
				]
			}
		},
		watch:{
			huJiSZSFMC_str:function(n,o){
				console.log(n)
				this.huJiSZSFMC=n.split(",")[1];
				this.huJiSZSF=n.split(",")[0];
			},
		},
		mounted(){
			var that=this;
			this.prov.forEach(function(vaue,index){
				that.prov_1.push({
					label:vaue.text,
					value:vaue.provinceid+","+vaue.text
				})
			})
			for(let ss=1991;ss<2019;ss++){
				this.times[0].values.push({
					i:ss,
					val:ss
				});
				this.endTimes[0].values.push({
					i:ss,
					val:ss
				})
			}
			for(let s=2;s<13;s++){
				if(s<10){
					s="0"+s
				}
				this.times[2].values.push({
					i:s,
					val:s
				})
				this.endTimes[2].values.push({
					i:s,
					val:s
				})
			}
			this.xueXiaoID=this.$route.query.xueXiaoID;
			var url="user,/api/m/auth/user/get_stuinfo.htm";
			var data=-{};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url,{},function(d){
				Indicator.close();
				if(that.xueXiaoID==20355){
					that.guomei=true;
					if(d.datas.obj.gaoKaoSF=="上海市"){
						that.guomeiSh=true;
					}
				}
				if(d.success){
					that.huJiSZSF=d.datas.obj.huJiSZSF;
					that.gaokaoSFH=d.datas.obj.gaoKaoSFH;
					that.stuType=d.datas.obj.stuType;
					that.huJiDZ=d.datas.obj.huJiDZ;
					if(!!d.datas.obj.huJiSZSFMC){
						that.huJiSZSFMC=d.datas.obj.huJiSZSFMC;
						that.huJiSZSFMC_str=d.datas.obj.huJiSZSF+","+d.datas.obj.huJiSZSFMC;
					}
					that.shangHaiExamNO=d.datas.obj.shangHaiExamNO;
					if(d.datas.obj.midSchStartEndTime){
						var sAeTime=d.datas.obj.midSchStartEndTime.split("-");
						that.startTime=sAeTime[0]+"-"+sAeTime[1];
						that.endTime=sAeTime[2]+"-"+sAeTime[3];
					}
				}else{
					Toast(d.message)
				}
			})
		},
		methods:{
			sure_btn_confirm(){
				var that=this;
				var url="user,/api/m/auth/user/save_extend_stuinfo.htm";
				var reg;
				if(this.huJiSZSFMC==""){
					Toast({
						duration: 1500,
						message:"请选择户籍省份"
					});
					return ;
				}
				var data={
					huJiSZSFMC:that.huJiSZSFMC,
					huJiSZSF:that.huJiSZSF
				};
				if(that.guomei){
					// 是国美附中但不是上海学籍
					if(that.huJiDZ==""){
						Toast({
							duration: 1500,
							message:"请填写户口地址"
						});
						return ;
					}
					if(that.startTime=="" || that.endTime==""){
						Toast({
							duration: 1500,
							message:"请选择起止时间"
						});
						return ;
					}
					$.extend(data,{
						midSchStartEndTime:that.startTime+"-"+that.endTime,
						huJiDZ:that.huJiDZ,
						updateHuJiDZ :true
					})
					if(that.guomeiSh){
						reg=/\b\d{12}\b/;
						if(!reg.test(that.shangHaiExamNO)){
							Toast({
								duration: 1500,
								message:"请正确填写12位报考号"
							});
							return ;
						}
						$.extend(data,{
							shangHaiExamNO:that.shangHaiExamNO
						})
					}
				}
				ajaxMethod.doAjax(url,data,function(d){
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
					}
				})
			},
			hide_prop(){
				this.popupVisible=false;
				console.log(this.huJiSZSFMC)
			},
			choice_prov(){
				this.popupVisible=true;
			},
			choice_time(){
				this.popupTime=true;
			},
			MajorValuesChange(picker,valuse){
				if(valuse[1]!="undefined"){
					this.startTime=valuse[0].i+"-"+valuse[1].i

				}
			},
			endTimeChange(picker,valuse){
				if(valuse[1]!="undefined"){
					this.endTime=valuse[0].i+"-"+valuse[1].i
				}
			},
			zhuanyeConfirm(){
				this.popupTime=false;
				this.popupEndTime=false;
			},
			zhuanyeCancle(){
				this.popupTime=false;
				this.popupEndTime=false;
			},
			choice_Endtime(){
				this.popupEndTime=true;
			}
		}
	}
</script>
<style>
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
	.hujisf{display:flex;padding:0 10px;min-height:48px;align-items: center;}
	.hjsf-tit{width:105px;font-size:16px;}
	.hjsf-val{font-size:16px;flex:1;}
	.prop-huji{max-height:5rem;min-height:2rem;overflow: auto;}
	.info-body .mint-popup{width:80%;border-radius:.1rem;}
	.info-body .mint-popup-bottom{width:100%;}
	.prop-t{text-align: center;padding:.2rem 0;font-size:.3rem;background: #eee;color:#010101;border-top-left-radius: .1rem;border-top-right-radius: .1rem;}
	.prop-btm{background: #EFEFEF;padding: .2rem;}
	.prop-btm .prop-btn{background: #42CEFC;font-size: .3rem;color: #fff;display: block;text-align: center;padding: .15rem 0;border-radius: .1rem;}
	.picker-items{display:flex;}
	/*.time-condtrol .hjsf-val{flex-direction: }*/
	.time-condtrol .hjsf-val .ss{display: inline-flex;width:1.4rem; }
	.time-condtrol .hjsf-val .sss{width:auto; }
	.time-condtrol .hjsf-val .ss input{width:100%; }
</style>