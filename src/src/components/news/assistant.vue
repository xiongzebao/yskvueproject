<template>
	<div class="assistant">
		<!-- <mt-header fixed title="艺考升助手">
		            <router-link to="/touchCustom" slot="left">
		                <mt-button icon="back"></mt-button>
		            </router-link>
		        </mt-header> -->
        <div class="assistant-del">
        	<div class="ass">
        		<div class="scrollHei">
					<!-- 分页数据 -->
					<div class="page-data" v-for="(item,key) in fenyeshuju">
	        			<div class="assis-list assis-list-answer history-list orginData" v-if="item.qDesc">
	        				<!-- 历史问题 -->
	        				<div class="time-style">{{timeFormat(item.createTimeShow)}}</div>
	        				<div class="history-ques">
	        					<div class="flex-wrap">
			        				<div class="icon-user">
			        					<span class="icon-blue"></span>
			        					<div class="ans">
			        						<p>{{item.qDesc}}</p>
			        						<img :src="item.qDescExt" alt="" class="loacl-img">
			        					</div>
			        				</div>
		        				</div>
		        				<div class="yks-logo user-logo">
		        					<div class="logo-wrap">
		        						<img v-if="!!user_logo" :src="user_logo" alt="" >
				        				<img v-else  src="../../../static/img/help/nophoto.jpg" alt="">
		        					</div>
		        				</div>
	        				</div>
	        				<!-- 历史答案 -->
	    					<div v-if="!!item.dealDesc || !!item.contextExt" class="margin-top-3">
	        					<div class="time-style user-time-style sys-time-style">
	        						{{timeFormat(item.replyTimeShow)}}
	        					</div>
		        				<div class="assis-list history-ans">
		        					<div class="yks-logo padding-right-1">
		        						<div class="logo-wrap">
		        							<img src="../../../static/img/help/logoo.png" alt="">
		        						</div>
		        						<div class="asdsa" style="position: relative;">
		        							<div class="left-content">
		        								<span class="icon-left"></span>
		        								<div class="all-ques answer-ques">
		        									<div class="sys-answer">
		        										<div class="top-5" v-if="!!item.dealDesc">
															{{item.dealDesc}}
														</div>
														<div class="top-5" v-if="!!item.contextExt" v-html="item.contextExt">
														</div>
		        									</div>
		        								</div>
		        							</div>
		        						</div>
		        					</div>
		        				</div>
	        				</div>
	        			</div>
        			</div>
        			<div class="orginData">
	        			<div class="assis-list assis-list-answer history-list" v-for="item in feedbackList">
	        				<!-- 历史问题 -->
	        				<div class="time-style">{{timeFormat(item.createTimeShow)}}</div>
	        				<div class="history-ques">
	        					<div class="flex-wrap">
			        				<div class="icon-user">
			        					<span class="icon-blue"></span>
			        					<div class="ans">
			        						<p>{{item.qDesc}}</p>
			        						<img :src="item.qDescExt" alt="" class="loacl-img">
			        					</div>
			        				</div>
		        				</div>
		        				<div class="yks-logo user-logo">
		        					<div class="logo-wrap">
		        						<img v-if="!!user_logo" :src="user_logo" alt="" >
				        				<img v-else  src="../../../static/img/help/nophoto.jpg" alt="">
		        					</div>
		        				</div>
	        				</div>
	        				<!-- 历史答案 -->
	    					<div v-if="!!item.dealDesc || !!item.contextExt" class="margin-top-3">
	        					<div class="time-style user-time-style">
	        						{{timeFormat(item.replyTimeShow)}}
	        					</div>
		        				<div class="assis-list history-ans">
		        					<div class="yks-logo padding-right-1">
		        						<div class="logo-wrap">
		        							<img src="../../../static/img/help/logoo.png" alt="">
		        						</div>
		        						<div class="asdsa" style="position: relative;">
		        							<div class="left-content">
		        								<span class="icon-left"></span>
		        								<div class="all-ques answer-ques">
		        									<div class="sys-answer">
		        										<div class="top-5" v-if="!!item.dealDesc">
															{{item.dealDesc}}
														</div>
														<div class="top-5" v-if="!!item.contextExt" v-html="item.contextExt">
														</div>
		        									</div>
		        								</div>
		        							</div>
		        						</div>
		        					</div>
		        				</div>
	        				</div>
	        			</div>
        			</div>
        			<div class="cut" v-if="feedbackList.length>0">以上是历史消息</div>
	        		<div v-for="(item,index) in questionAndAnswer">
	        			<!-- 首次系统问题 -->
	        			<div v-if="!item.wenti && !item.getQuestion">
	        				<!-- {{item}} -->
			        		<div class="time-style user-time-style">
			        			{{questionAndAnswer.curTime}}
			        		</div>
				        	<div class="assis-list padding-right-4" >
				        		<div class="yks-logo">
				        			<div class="logo-wrap">
				        				<img src="../../../static/img/help/logoo.png" alt="">
				        			</div>
				        		</div>
				        		<div style="position:relative">
					        		<div class="left-content">
					        			<span class="icon-left"></span>
					        			<p v-if="item.length>0" class="welcome-text">
					        				hi，您好，亲爱的【{{nick?nick:"艺考升用户"}}】。您可能想问这些问题：
					        			</p>
					        			<div class="all-ques">
											<div v-for="(items,indexs) in item" class="ques-top-5" v-tap="{methods:getAnswer,item:items}">
												<div class="top-5 top-list-5">
													{{indexs+1}}.{{items.qDesc}}
												</div>
											</div>
					        			</div>
					        		</div>
				        		</div>
				        	</div>
			        	</div>
			        	<!-- 回答用户问题 -->
			        	<div v-else-if="!!item.getQuestion" >
			        		<div class="time-style user-time-style">{{item.curTime}}</div>
				        	<div class="assis-list padding-right-4">
				        		<div class="yks-logo">
				        			<div class="logo-wrap">
				        				<img src="../../../static/img/help/logoo.png" alt="">
				        			</div>
				        		</div>
				        		<div style="position:relative" class="asdsa">
					        		<div class="left-content">
					        			<span class="icon-left"></span>
					        			<div class="all-ques answer-ques">
											<div class="sys-answer">
												<div class="top-5" v-if="!!item.serverQ_2">
													{{item.serverQ_2}}
												</div>
												<div class="top-5" v-if="!!item.serverQ" v-html="item.serverQ">
													
												</div>
											</div>
					        			</div>
					        		</div>
				        		</div>
				        	</div>
			        	</div>
			        	<!-- 用户提问 -->
			        	<div v-else>
		        			<div class="time-style user-time-style"> {{item.curTime}}</div>
			        		<div class="assis-list assis-list-answer padding-left-4">
			        			<div class="flex-wrap">
				        			<div class="icon-user">
				        				<span class="icon-blue"></span>
						        		<div class="ans">
						        			<p v-if="item.wenti">{{item.wenti}}</p>
						        			<img :src="item.picUrl" alt="" class="loacl-img">
						        		</div>
					        		</div>
				        		</div>
				        		<!-- 用户头像信息 -->
				        		<div class="yks-logo user-logo">
				        			<div class="logo-wrap">
				        				<!-- <span>{{user_logo}}</span> -->
				        				<img v-if="!!user_logo" :src="user_logo" alt="" >
				        				<img v-else  src="../../../static/img/help/nophoto.jpg" alt="">
				        			</div>
				        		</div>
				        	</div>
			        	</div>
		        	</div>
	        	</div>
        	</div>
        	<div class="commont-area">
        		<div class="icon iconfont icon-icadd font-icon" v-tap="{methods:getPic}"></div>
        		<div class="input-area">
        			<input type="text" placeholder="输入您要咨询的内容" v-model="iptVal">
        		</div>
        		<div class="send-btn">
        			<button v-tap="{methods:handMovement,iptVal:iptVal}" class="send-btn-del">
        				发送
        			</button>
        		</div>
        	</div>
        	<div class="show-pic" v-if="if_show">
        	<!-- <div class="show-pic"> -->
        		<div class="img-wrap">
        			<img :src="picUrl" alt="" class="small-img">
        			<!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502941867456&di=5de0616545cfbdfffb158b5979327d05&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D794524359%2C809630967%26fm%3D214%26gp%3D0.jpg" alt="" class="small-img"> -->
        			<span class="iconfont icon-guanbi cloase-icon" v-tap="{methods:reduce_img}"></span>
        		</div>
        	</div>
        </div>
	</div>
</template>
<script>
	import { Indicator,Toast } from 'mint-ui';
	import Vue from 'vue';
	import {
	    Header,
	    Button
	} from 'mint-ui';
	Vue.component(Header.name, Header);
	Vue.component(Button.name, Button);

	export default{
		name:"help",
		data(){
			return{
				questionAndAnswer:[],
				questionListTop5:[],
				nick:'',
				user_logo:'',
				iptVal:'',
				initial_click:1,
				assHeight:'',
				picUrl:'',
				if_show:false,
				qaId:"",
				feedbackList:[],//反馈历史记录
				scrollK:0,
				curPage:1,
				ifCanLoad:true,//判断是否还可以加载
				pageSize:5,
				fenyeshuju:[],
				scrs:0,
				orginData:0,
			}
		},
		watch:{
			questionAndAnswer:{
				handler:function(n,o){
					var that=this
					var dd=setInterval(function(){
						$(".ass").scrollTop($(".scrollHei").height())
						clearInterval(dd);
					},1)
				},
				deep:true
			},
			fenyeshuju:function(n,o){
				var that=this;
				var sss=setInterval(function(){
					if($(".page-data").length>0){
						var Hi=that.pageSize;
						// alert(n.length)
						if(n.length<that.pageSize){
							Hi=1
						}
						// alert(n.length)
						// console.log($(".page-data").eq(0))
						console.log($(".page-data").eq(Hi-1).next())
						var hH=$(".mint-header").height();
						$(".ass").scrollTop($(".page-data").eq(Hi-1).next().offset().top-hH);
						clearInterval(sss)
					}
				},10)
			}
		},
		mounted(){
			$(".ass").get(0).addEventListener("scroll",this.scrolls)
			if(!!window.yksapp_user){
				this.nick=yksapp_user.getNickName();
			}
			var that=this;
			this.qaId=this.$route.query.qaId
			window.appPhotoUploadResult=function(fileurl){
				Toast({
				  	message: '选图成功',
				  	duration: 2000
				});
				that.if_show=true;
				that.picUrl=fileurl
			};
			var url="news,/api/m/auth/question/questionListTop5.htm";
			var data={
				"qCategory":that.qaId,
				"curPage":that.curPage,
				"pageSize":that.pageSize
			};
			if(!!window.yksapp_user){
				this.user_logo=yksapp_user.getLogo()
			};
			Indicator.open('加载中...');
			ajaxMethod.doAjax(url, data,function(d){
				that.curPage++;
				Indicator.close();
				if(d.success && d.datas.questionListTop5.length>0){
					that.questionAndAnswer.push(d.datas.questionListTop5);
					Vue.set(that.questionAndAnswer,"curTime",that.getTime())
				}else if(d.success && d.datas.list==0){
					that.hasData=false;
				}
				if(d.success && d.datas.feedbackList.length>0){
					that.feedbackList=d.datas.feedbackList.reverse()
				}
			});
			if(that.questionAndAnswer.length==0){
				var scro=setInterval(function(){
					if($(".scrollHei").height() != 0){
						$(".ass").scrollTop($(".scrollHei").height())
						clearInterval(scro)
					}
				},10)
			}
			this.orginData=$(".orginData").height();
		},
		methods:{
			// 到达顶部加载数据
			scrolls:function(){
				var that=this
				this.scrollK=$(".ass").scrollTop();
				var url="news,/api/m/auth/question/questionListTop5.htm";
				var data={
					"qCategory":that.qaId,
					"curPage":that.curPage,
					"pageSize":that.pageSize
				}
				if(this.scrollK==0){
					// alert($('.orginData').length)
					// firs.addClass("asdasdsasda");
					// console.log(firs)
					var sdas="<div class='newNode' style='text-align:center;color:#f00'>加载中....</div>";
					$(".ass").prepend(sdas);
					ajaxMethod.doAjax(url, data,function(d){
						$(".newNode").remove();
						that.curPage++;
						if(d.datas.feedbackList==""){
							var noData="<div class='newNode' style='text-align:center;'>没有更多数据了...</div>";
							$(".newNode").remove();
							$(".ass").prepend(noData);
						}else{
							// that.feedbackList=d.datas.feedbackList.reverse().concat(that.feedbackList);
							var fydata=d.datas.feedbackList;
							if(fydata.length==1){
								fydata.forEach(function(value,index){
									that.fenyeshuju.unshift(value);
								})
							}else{
								fydata.forEach(function(value,index){
									that.fenyeshuju.unshift(value);
								})
							}
							// that.fenyeshuju=d.datas.feedbackList.reverse().concat(that.fenyeshuju);
							// $(".page-data").last().scrollTop(0)
							console.log(that.fenyeshuju);
						}
					});
				}
			},
			reduce_img:function(){
				this.if_show=false;
				this.picUrl=""
			},
			getAnswer:function(par){
				Indicator.open('加载中...');
				var that=this;
				var url="news,/api/m/auth/question/questionDetail.htm";
				var data={qaID:par.item.qaID};

				that.questionAndAnswer.push({
					wenti:par.item.qDesc,
					picUrl:"",
					curTime:that.getTime()
				});
				console.log(that.questionAndAnswer)

				ajaxMethod.doAjax(url, data,function(d){
					Indicator.close();
					if(d.success){
						that.questionAndAnswer.push({
							getQuestion:true,
							serverQ:d.datas.obj.contextExt,//富文本
							serverQ_2:d.datas.obj.context,//纯文本
							curTime:that.getTime()
						});
						
						console.log(that.questionAndAnswer)
					}else {
						that.hasData=false;
						console.log(d)

					}
					// console.log(that.questionListTop5)
				});
			},
			getTime:function(){
				var curTimeStr=new Date();
				var curHour=curTimeStr.getHours();
				var curMinte=curTimeStr.getMinutes();
				if(curHour>=0 && curHour<10){
					curHour="0"+curHour;
				}
				if(curMinte>=0 && curMinte<10){
					curMinte="0"+curMinte
				}
				return curHour+":"+curMinte
			},
			handMovement:function(par){
				if(this.iptVal==""){
					Toast({
					  	message: '请输入咨询内容',
					  	duration: 2000
					});
					return;
				}
				Indicator.open('加载中...');
				var that=this;
				this.initial_click++;
				that.questionAndAnswer.push({
					wenti:par.iptVal,
					picUrl:that.picUrl,
					curTime:that.getTime()
				});
				console.log(that.questionAndAnswer)
				if(this.initial_click==3){
					var moreThanTwoUrl="news,/api/m/auth/question/saveManualQuesttion.htm";
					var data_2={
						qDesc:par.iptVal,
						qDescExt:that.picUrl,//附件路径
						qaId:that.qaId
					};
					ajaxMethod.doAjax(moreThanTwoUrl, data_2,function(d){
						Indicator.close();
						that.if_show=false;
						that.questionAndAnswer.push({
							getQuestion:true,
							serverQ:"还没找到你想要的答案？稍等片刻，艺考升客服马上就到~",
							curTime:that.getTime()
						});
					})
				}else if(this.initial_click>3){
					var oneTimeUrl="news,/api/m/auth/question/saveManualQuesttion.htm";
					var data_1={
						qDesc:par.iptVal,
						qDescExt:that.picUrl,//附件路径
						qaId:that.qaId
					};
					ajaxMethod.doAjax(oneTimeUrl, data_1,function(d){
						Indicator.close();
						// debugger;
						that.if_show=false;
						if(d.datas.list==0){
							// that.questionAndAnswer.push({
							// 	getQuestion:true,
							// 	serverQ:"还没找到你想要的答案？稍等片刻，艺考升客服马上就到~"
							// })
						}else{
							// that.questionAndAnswer.push(d.datas.list)
						}
					})
				}else if(this.initial_click==2){
					var oneTimeUrl="news,/api/m/auth/question/hotQuestionListTop5.htm";
					var data_1={
						qDesc:par.iptVal,
						qDescExt:that.picUrl,//附件路径
						qaId:that.qaId
					};
					ajaxMethod.doAjax(oneTimeUrl, data_1,function(d){
						Indicator.close();
						// debugger;
						that.if_show=false;
						if(d.datas.list==0){
							that.questionAndAnswer.push({
								getQuestion:true,
								serverQ:"还没找到你想要的答案？稍等片刻，艺考升客服马上就到~"
							})
						}else{
							that.questionAndAnswer.push(d.datas.list)
						}
					})
				}
				this.iptVal='';
				that.picUrl=""
			},
			getPic:function(){
				if(!!window.yksapp){
					yksapp.openCameraAndPhotos(true,true);
				}
			},
			// 时间个格式化
			timeFormat:function(historyTimes){
				return historyTimes
			}
		}
	}
</script>
<style scoped>
	.assistant-del{position:fixed;top:0rem;left:0;right:0;bottom:0;background: #fff;font-size:.25rem;overflow: auto;-webkit-overflow-scrolling: touch;}
	.assis-list{display:flex;padding:.1rem;}
	.yks-logo{margin-right:.3rem;}
	.user-logo{margin-left:.3rem;margin-right:0rem;}
	.yks-logo img{max-width:100%;max-height:100%;border-radius: 50%;}
	.all-ques{background: #f4f4f4;border-bottom-left-radius: .1rem;border-bottom-right-radius: .1rem;padding:.1rem;color:#69CFFF;background: #fff;}
	.top-5{padding:.1rem 0;}
	.commont-area{position: fixed;bottom:0;left:0;right:0;height:1rem;display: flex;align-items:center;justify-content: center;padding:0 .1rem;	background: #fff;}
	.ass{position: fixed;top:0rem;bottom:1rem;left:0;right:0;overflow: auto;background: #F2F2F2}
	.font-icon{color:#ddd;font-size:.6rem;width:.6rem;display:flex;justify-content: flex-end;color:#2EBDFF;}
	.input-area{width:calc(100% - 1.6rem);margin:0 .15rem;}
	.input-area input{width:100%;border:1px solid #2EBDFF;height:.6rem;text-align: center;border-radius:5px;}
	.send-btn{width:1rem;}
	.logo-wrap{width:.6rem;height:.6rem;border-radius:50%;border:1px solid #ddd;}
	.answer{word-break: break-all;}
	/*.assis-list-answer{align-items:center;}*/
	.ans{background: #2EBDFF;color:#fff;padding:.16rem;border-radius: .1rem;height:auto;overflow: auto;}
	.ans>p{word-break: break-word;}
	/*.ans p{font-size: .3rem}*/
	.top-5{word-break: break-all;}
	.sys-answer{height:auto;overflow: auto;}
	.welcome-text{background:#fff;padding: .1rem .2rem;border-top-left-radius:.1rem;border-top-right-radius:.1rem;}
	.send-btn-del{background: #2EBDFF;color:#fff;border:none;border-radius:5px;padding:.1rem 0;font-size:.25rem;width:100%;}
	/*.left-content{position:relative;}*/
	.left-content .icon-left{position:absolute;border:.15rem solid transparent;border-right-color:#fff;left:-.3rem;top:.3rem; }
	.icon-user{position:relative;display: inline-flex;text-align:left;}
	.icon-blue{position: absolute;top:0.1rem;right:-.35rem;border:.2rem solid transparent;border-left-color:#2EBDFF;}
	.asdsa{width:calc(100% - .9rem);}
	.answer-ques{border-radius:.1rem;}
	.loacl-img{max-width:100%;max-height:3rem;}
	.show-pic{position:fixed;bottom:1rem;right:0;height:2rem;width:2rem;display: flex;align-items: center;justify-content:center;}
	.small-img{max-width:100%;max-height:100%; }
	.img-wrap{padding:.1rem .1rem 0;box-sizing: border-box;position:relative;height:100%; display: flex;justify-content: center;  }
	.cloase-icon{background:#fff;border-radius:50%;position:absolute;right:0;top:0;right:-.1rem;top:-.1rem;font-size:.4rem;}
	.sys-answer{color:#000;}
	.history-list{flex-direction: column;}
	.history-list .history-ques{display:flex;padding-left:1rem;}
	.history-ans{padding:0;margin-top:.3rem;}
	.history-ans .yks-logo{display:flex;flex-direction: row;margin-right: 0}
	.history-ans .yks-logo .logo-wrap{margin-right:.3rem;}
	.time-style{color:#A8A8A8;text-align:center}
	.user-time-style{margin-bottom: -.1rem;}
	.margin-top-3{margin-top:.3rem;}
	.cut{border-bottom:1px dotted #A8A8A8;text-align:center;margin-bottom:.3rem;font-size:.25rem;color:#A8A8A8;}
	.padding-right-1{padding-right:1.1rem;}
	.padding-right-4{padding-right:1.4rem;}
	.padding-left-4{padding-left:1.4rem;}
	.flex-wrap{width:calc(100% - 1.1rem);text-align: end;}
	.top-list-5{padding:.1rem;}
	.sys-time-style{margin-bottom: -.3rem;}
</style>