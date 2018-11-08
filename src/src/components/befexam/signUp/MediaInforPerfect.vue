<template>
	<div class="mediaInfo">
		<mt-header fixed title="传媒类考生信息">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="info-body">
        	<div class="info-header">
	        	<p>
	        		<i class="iconfont icon-yousanjiao"></i>
	        		<span>本页为报考传媒考生所需补填信息</span>
	        	</p>
	        	<p>
	        		<i class="iconfont icon-yousanjiao"></i>
	        		<span>为确保考生报考准确，烦请认真填写考生资料并仔细进行核对</span>
	        	</p>
	        	<p>
	        		<i class="iconfont icon-gou"></i>
	        		<span>艺考升平台确保您的信息安全</span>
	        	</p>
        	</div>
        		<div class="bg-wrap">
        		</div>
        	<div class="info-list">
        		<div class="list-detail">
	        		<h3 class="info-list-h">
	        			<span>
		        			<i class="iconfont icon-mihao red"></i>
		        			<em>基础信息</em>
	        			</span>
	        		</h3>
	        		<div v-if="drawingScore">
		        		<div class="info-list-del">
		        			<div class="tongkaoqk" @click="sdfsd">省统考情况：</div>
		        			<!-- <div class="fl list-tk"></div> -->
		        			<mt-radio
		        				class="radio-list"
								v-model="value"
								:options="unified">
							</mt-radio>
		        		</div>
		        		<div class="info-list-del" v-if="control">
		        			<span class="tongkaoqk" style="width:2rem;">美术省统考成绩：</span>
		        			<!-- <div class="fl list-tk"></div> -->
		        			<input type="number" placeholder="允许小数点后保留两位" class="ms-score" maxlength='6' v-model='score'>
		        		</div>
	        		</div>
	        		<div class="info-list-del no-border">
						<div class="tongkaoqk">外语&nbsp;&nbsp;&nbsp;情况：</div>
						<div>
							<span @click="choice_1" class="choice-foreign">
								<i v-text="ipt_val_1">选择第一外语</i>
								<em></em>
							</span>
							<span @click="choice_2" class="choice-foreign">
								<i v-text="ipt_val_2">选择第二外语</i>
								<em></em>
							</span>
						</div>
	        		</div>
	        		<!-- 第一外语 -->
	        		<mt-popup
			            v-model="firstForeign"
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
			                          v-model="ipt_val_1"
			                          :options="firstForeign_list">
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
			        <!-- 第二外语 -->
	        		<mt-popup
			            v-model="secondForeign"
			            position="middle"
			            popup-transition="popup-in"
			            class="prop-div"
			            >
			            <div>
			                <div class="choice-title">{{propTitle_2}}</div>
			                <ul class="choice-lists">
			                    <li>
			                        <mt-radio
			                          align="left"
			                          v-model="ipt_val_2"
			                          :options="secondForeign_list">
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
        		</div>
        		<div class="list-detail">
	        		<h3 class="info-list-h">
	        			<span>
		        			<i class="iconfont icon-mihao red"></i>
	        				才艺展示
        				</span>
        			</h3>
        			<div class="info-list-del">
        				<div>
        					<span>身高：</span>
        				</div>
        				<div>
        					<input type="text" placeholder="请输入身高" class="sg-ipt" maxlength="4" v-model="height">cm
        				</div>
        			</div>
        			<div class="info-list-del">
        				<div style="width:1.2rem;">特长：</div>
        				<div class="radio-list">
	        				<mt-checklist
	        					class="check-list custum"
								v-model="speciality"
								:options="speciality_Arr">
							</mt-checklist>
							其他<input type="text" placeholder="无可不填写" class="ipt-p" v-model="other_spec">
						</div>
        			</div>
        		</div>
        		<div class="list-detail">
	        		<h3 class="info-list-h f-fixed">
	        			<span class="lf">
	        				<span>
			        			<i class="iconfont icon-mihao yellow"></i>
		        				获奖情况
	        				</span>
        				</span>
        				<span class="rf clolor-g" @click="add_hj">注：如无可跳过不必填写</span>
        			</h3>
        			<div class="works-t work-hj">
        				<textarea v-for="idx in hjArr" v-model="honour" maxlength="50" class="textarea-edit text-hj" name="" id="" placeholder="包括但不限于作品名称，大赛名称，所获奖项以及获奖时间。例如：作品《日出》2016年11月获得CAA大赛五等奖,最多50字"></textarea>
        			</div>
        			<!-- <span class="add-icon" @click="add_hj"><i class="iconfont icon-add"></i>增加获奖情况</span> -->
        		</div>
        		<div class="list-detail">
	        		<h3 class="info-list-h f-fixed">
	        			<span class="lf">
		        			<i class="iconfont icon-mihao yellow"></i>
	        				优秀作品
        				</span>
        				<span class="rf clolor-g">注：如无可跳过不必填写</span>
        			</h3>
        			<div class="works-t works-zp">
        				<textarea v-for="idx in zpArr" v-model="introduction" maxlength="50" class="textarea-edit text-zp" name="" id="" placeholder="优秀作品简介，包括但不限于名称、类别、题材、载体、灵感思路，最多50字"></textarea>
        			</div>
        			<!-- <span class="add-icon" @click="add_text"><i class="iconfont icon-add"></i>增加优秀情况</span> -->
        		</div>
        		<div class="submit-btn">
        			<mt-button v-tap="{methods:sure_btn_confirm_fill_info}" class="color-diy" size="normal">确认</mt-button>
        		</div>
        	</div>
        </div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import {
    	Header,Radio,Checklist,Cell,Button,Popup,Indicator,Toast,MessageBox     
	} from 'mint-ui';
	Vue.component(Header.name, Header);
	Vue.component(Radio.name, Radio);
	Vue.component(Checklist.name, Checklist);
	Vue.component(Cell.name, Cell);
	Vue.component(Button.name, Button);
	export default{
		data(){
			return{
				propTitle_1:"第一外语",
				propTitle_2:"第二外语",
				firstForeign:false,//第一外语弹出框
				secondForeign:false,//第二外语弹出框
				value:'',//省统考情况的值
				unified:[],//供选择的生统考情况
				speciality:[],//特长值
				speciality_Arr:[],//供选择的
				firstForeign_list:['无', '英语', '法语','德语','日语','韩语','西班牙语','葡萄牙语','阿拉伯语','俄语','其他'],//第一外语选择
				secondForeign_list:['无', '英语', '法语','德语','日语','韩语','西班牙语','葡萄牙语','阿拉伯语','俄语','其他'],//第二外语选择
				ipt_val:"",//外语选择的值
				cl:'',
				zpArr:[1],
				hjArr:[1],
				other_spec:'',//其他特长
				ipt_val_1:"选择第一外语",
				ipt_val_2:"选择第二外语",
				control:false,
				height:"",//身高
				stuType:'',//学生类型
				score:'',//省统考成绩
				score_1:"",
				honour:"",//获奖情况
				introduction:"",//优秀作品
				forteFlag:[],//特长数组
				stuType:'',//学生类型
				gaoKaoSFH:"",//高考省份号
				drawingScore:"",//传媒类是否需要显示省统考情况
			}
		},
		watch:{
			value:function(newVa,oldVa){
				if(newVa==1 || newVa==2){
					this.control=true;
					if(this.score_1){
						this.score=this.score_1
					}
				}else{
					this.control=false;
					this.score='';
				}
			}
		},
		//stuType,gaoKaoSFH保存数据时，必须要传的参数
		mounted(){
			var that=this;
			var url="user,/api/m/auth/user/get_stuinfo.htm";
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url,{},function(d){
				Indicator.close();
				if(d.success){
					that.drawingScore=d.datas.drawingScore;
					if(d.datas.obj){
						that.height=d.datas.obj.height;
						that.stuType=d.datas.obj.stuType;
						that.value=String(d.datas.obj.passFlag);
						that.score=d.datas.obj.score;
						that.score_1=d.datas.obj.score;
						that.ipt_val_1=d.datas.obj.firstForeignLang;
						that.ipt_val_2=d.datas.obj.secondForeignLang;
						that.gaoKaoSFH=d.datas.obj.gaoKaoSFH;
						if(that.ipt_val_1=="" || that.ipt_val_1==" " || that.ipt_val_1==null){
							that.ipt_val_1='选择第一外语';
						}
						if(that.ipt_val_2=="" || that.ipt_val_2==null){
							that.ipt_val_2='选择第二外语';
						}
						that.honour=d.datas.obj.honour;
						that.introduction=d.datas.obj.introduction;
						if(d.datas.obj.forteFlag){
							d.datas.obj.forteFlag.split(",").forEach(function(value,index){
								that.speciality.push(value);
								if(value==5){
									that.speciality.splice(index,1);
								}
							})
						}
						if(d.datas.obj.forte){
							// if(d.datas.obj.forteStr.split("，")>3){
								that.other_spec=d.datas.obj.forte;
							// }
						}
					}
				}else{
					Toast({
						message: d.message,
						duration: 2000
					});
				}
			})
			
			// debugger;
			this.cl=$(".text-zp").clone();
			var that=this;
			var tkcj=['合格,1', '不合格,2', '暂无成绩,3','非美术类,4'];// 省统考合格标记，1、合格，2、不合格，3、暂无成绩，4、非美术类(3、4情况下统考成绩score可以不填)
			tkcj.forEach(function(value,index){
				that.unified.push({
					label:value.split(",")[0],
					value:value.split(",")[1]
				})
			})
			var spec=['美术','音乐','舞蹈','体育'];
			spec.forEach(function(value,index){
				that.speciality_Arr.push({
					label:value,
					value:index+1
				})
			})
		},
		methods:{
			sure_btn_confirm_fill_info(){
				
				var url="user,/api/m/auth/user/save_extend_stuinfo.htm";
				var data;
				var spec;
				var twoXS=/^[0-9]+(.[0-9]{0,2})?$/;
				var that=this;
				var five=5
				if(this.other_spec){
					if(!(this.speciality.join(",").indexOf(five)>0)){
						that.speciality.push(five)
					}
				}
				if(this.value==0 || this.value=="null"){
					Toast({
						message:'请完善省统考情况',
						duration:2000
					});
					return;
				}
				if(this.ipt_val_1=="选择第一外语" || this.ipt_val_2=="选择第二外语"){
					Toast({
						message:'请选择外语',
						duration:2000
					});
					return;
				}
				if(this.ipt_val_1=="无" || this.ipt_val_2=="无"){
					Toast({
						message:'请选择外语',
						duration:2000
					});
					return;
				}
				if((this.ipt_val_1!="无"&&this.ipt_val_1!="无")&&(this.ipt_val_1==this.ipt_val_2)){
					Toast({
						message:'第一外语与第二外语不能相同',
						duration:2000
					});
					return;
				}
				var reg=/^[0-9]{4}$/;//四位数字
				if(!this.height || reg.test(this.height)){
					Toast({
						message:'请完善身高信息',
						duration:2000
					});
					return;
				}
				if(this.value==1 || this.value==2){
					if(!twoXS.test(this.score)){
						Toast({
							message:'请填写正确的省美术统考成绩',
							duration:2000
						});
						return;
					}
				}
				
				if((this.value==1 || this.value==2) && this.score==""){
					Toast({
						message:'请完善省统考成绩',
						duration:2000
					});
					return;
				}
				
				
				var zidingyi=this.other_spec;
				if(zidingyi==""){
					this.speciality.forEach(function(val,idx){
						if(val==5){
							that.speciality.splice(idx,1);
						}
					})
				}
				if(this.speciality.join(",")==""){
					Toast({
						message:'请完善特长信息',
						duration:2000
					});
					return;
				}
				if(this.drawingScore){
					data={
						// passFlag:this.value,//省统考情况，
						// score:this.score,//省统考成绩
						firstForeignLang:this.ipt_val_1,//第一外语
						secondForeignLang:this.ipt_val_2,//第一外语
						height:this.height,//身高
						forteFlag:this.speciality.join(","),//特长1.美术2.音乐3.舞蹈4.体育5.其他
						forte:this.other_spec,//自定义特长
						honour:this.honour,//获奖情况
						introduction:this.introduction,//优秀作品
						stuType:this.stuType,//学生类型
						gaoKaoSFH:this.gaoKaoSFH//高考省份号
					}
				}else{
					data={
						passFlag:this.value,//省统考情况，
						score:this.score,//省统考成绩
						firstForeignLang:this.ipt_val_1,//第一外语
						secondForeignLang:this.ipt_val_2,//第一外语
						height:this.height,//身高
						forteFlag:this.speciality.join(","),//特长1.美术2.音乐3.舞蹈4.体育5.其他
						forte:this.other_spec,//自定义特长
						honour:this.honour,//获奖情况
						introduction:this.introduction,//优秀作品
						stuType:this.stuType,//学生类型
						gaoKaoSFH:this.gaoKaoSFH//高考省份号
					}
				}
				Indicator.open('加载中...');
				ajaxMethod.doAjax(url,data,function(d){
					Indicator.close();
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
			choice_1(){
				// alert(1)
				this.firstForeign=true;
			},
			choice_2(){
				// alert(2)
				this.secondForeign=true;
			},
			sdfsd(){
				console.log(this.speciality);
			},
			add_text(){
				// alert(123);
				var text=$(".text-zp");
				this.zpArr.push(1)
			},
			add_hj(){
				//this.hjArr.push(1)
			},
			sure_btn(){
				this.firstForeign=false;
				this.secondForeign=false;
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
	.submit-btn{text-align:center;margin:.4rem 0}
	.submit-btn .color-diy{background:#FF9900;color:#fff;width:50%;letter-spacing: 7px;}
	.mediaInfo{font-size:.3rem;}
	.mediaInfo .info-body{background: #fff;position:fixed;top:.8rem;bottom:0;overflow: auto;}
	.mediaInfo .info-body .info-header{padding:.1rem;border-bottom:1px solid #ddd}
	.mediaInfo .info-body .info-header p{display:flex;margin:.1rem 0;}
	.mediaInfo .info-body .info-header p i{color:#85E0FF;font-size:.3rem;}
	.mediaInfo .info-body .info-header p span{color:#FD3939;font-size:.25rem;}
	.mediaInfo .info-body .info-list .list-detail .info-list-del{padding:.1rem 0;display:flex;align-items: center;border-bottom:1px solid #ddd;}
	.mediaInfo .info-body .info-list .list-detail .info-list-del:last-child{border-bottom:none;}
	.mediaInfo .info-body .info-list {padding:0 .1rem;}
	.mediaInfo .info-body .info-list .info-list-del .tongkaoqk{font-size:.25rem;width:1.5rem;}
	.list-detail .red{color:#f00;}
	.list-detail{border-bottom:1px solid #ddd;padding-bottom: .2rem;}
	.list-detail:last-child{border-bottom:none;}
	.list-detail .yellow{color:#CC9933;}
	.list-detail .info-list-h{margin:.1rem 0;}
	.list-detail .info-list-h span:first-child{display:inline-flex;align-items: center;}
	.list-detail .info-list-h span>em{font-weight:bold;}
	.list-detail .info-list-h i{font-size:.1rem;}
	.sg-ipt{display: inline-block;font-size: .25rem;border:1px solid #ddd;width:1.5rem;margin-right:.1rem;padding:.1rem 0.05rem;border-radius: 2px;}
	.list-tk{height:1.5rem;width:calc(100% - 1.7rem);}
	.add-icon{display:flex;align-items: center;}
	.works-t .textarea-edit{width:100%;border:1px solid #ddd;border-radius:5px;font-size:.25rem;padding:.1rem .2rem;box-sizing: border-box;min-height:1.5rem;display:block;margin-bottom:.1rem;}
	.ms-score{border:1px solid #ddd;border-radius:3px;padding:.1rem 0;font-size:.25rem;text-indent: .1rem;}
	.clolor-g{color:#BABABA;font-size:.25rem;font-weight: normal;}
	.ipt-p{border:1px solid #ddd;width:2rem;font-size:.25rem;padding:.1rem;border-radius:2px;display:inline-block;}
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
	.no-border{border-bottom:none!important;}
	.choice-foreign{border:1px solid #ddd;padding:.06rem .3rem .06rem .09rem;border-radius:.1rem;font-size: .25rem;position:relative;display: inline-flex;}
	.choice-foreign i{font-style:normal;width:1.5rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.choice-foreign em{position:absolute;width:0rem;height:0rem;right:.05rem;top:50%;margin-top:-.05rem;border:.1rem solid transparent;border-top-color:#ddd;}
	.bg-wrap{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.75);z-index:1000;display:none;}
	.radio-list{width:calc(100% - 1.5rem);}
	.custum{margin-bottom:.1rem;}
</style>