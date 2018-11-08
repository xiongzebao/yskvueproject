<template>
	<div id="indexexam">
        <mt-loadmore :top-method="loadTop"  ref="loadmore" :maxDistance=100 >
         	<div class="header">
				<div class="exam-top">
					<div class='exam-top-status' v-if='defaultImg' v-tap="{ methods : rzIndex}">
                    <template v-if="auditStatus=='001'">
                        <div class='defaultImg' >
					        <img src="../../static/img/topdefault.png" alt="认证图片">
					    </div>
                    </template>
					<template v-else-if="auditStatus=='002'">
					    <div class="exam-top-status">
				        		<template v-if='speedFlag'>
				        			<div class="exam-top-status-userPicture"><img src="../../static/img/ic_default_avatar.png" alt="用户头像"></div>
					        		<p class="exam-top-status-note">您的肖像资料正在加急审核中</p>
				        		</template>
				        		<template>
				        			<p class='exam-top-status-line-one'>当前处于考生肖像信息提交审核高峰期,艺考升小伙伴们正在努力审核。</p>
									<p class='exam-top-status-line-two'>您的资料大约需要1个工作日完成审核</p>
									<p class="exam-top-status-line-three">如需加急请点击>>></p>
				        		</template>
					        
					    </div>
					</template>
					<template v-else-if="auditStatus=='003'">
					    <div class="exam-top-status">
					        <div class="exam-top-status-userPicture"><img :src="userPicture" alt="用户头像"></div>
					        <p class="exam-top-status-note">您的肖像资料已审核通过</p>
					    </div>
					</template>
					<template v-else-if="auditStatus=='004'">
					    <div class="exam-top-status">
					        <div class="exam-top-status-userPicture"><img src="../../static/img/ic_default_avatar.png" alt="用户头像"></div>
					        <p class="exam-top-status-note">您的肖像资料审核不通过</p>
					    </div>
					</template>

				</div>
				
				<template v-else> 
					 <mt-swipe id='imgbox' :auto="3000">
                          <template v-for='imgurl in imglist'>
                              <mt-swipe-item class="mt-swipe-item" v-tap="{ methods : bannerJump , param:{pictureURL:imgurl.pictureURL,resourceURL:imgurl.resourceURL,jumpMode:imgurl.jumpMode,jumpContent:imgurl.jumpContent}}">
                                   <img v-lazy.imgbox="imgurl.pictureURL" class="mt-swipe-item-pic">
                              </mt-swipe-item>

                          </template>
                    </mt-swipe>
				</template>

			</div>
				<template v-if='newslist'>
					<div class="exam-notice" v-tap="{ methods : newslistJump , param:'NoteList'}">
						<div class="exam-notice-note">
							<p class='notice-note'>最新</p>
							<p class='notice-note'>通告</p>
						</div>
						<div class="newslist-listIntro">
							<div class="noti-intro">
								<ul>
									<li v-for='(news,index) in newslist' v-if='index<=1'> {{news.title}}</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
		</div>
			<div class='exam-enter'>
			  
				<ul class="enter-top">
				
					<li  v-tap="{ methods : yksappJump , param:'Inforperfect'}">
						<div class="exam-enter-icon iconfont icon-yonghu"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">信息完善</p>
							<p class="enter-intro-notes">完善信息后才可报名</p>
						</div>
					</li>
					<li v-tap="{ methods : rzIndex}">
						<div class="exam-enter-icon iconfont icon-msnui-user-auth"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">肖像认证</p>
							<p class="enter-intro-notes">提交后才可确认</p>
						</div>
						<template v-if="auditStatus=='003'">
							<i class='rz-index-status iconfont icon-chenggong'></i>
						</template>
						<template v-else-if="auditStatus=='002'">
							<i class='rz-index-status iconfont icon-shenhezhong'></i>
						</template>
						<template v-else-if="auditStatus=='004'">
							<i class='rz-index-status iconfont icon-weitongguo'></i>
						</template>
						<template v-else-if="auditStatus=='005'">
							<i class='rz-index-status iconfont icon-daitijiao'></i>
						</template>	
					</li>
					
				</ul>
				<ul class="enter-center">
					<li   v-tap="{ methods : yksappJump , param:'signUpinfo'}">
						<div class="exam-enter-icon iconfont icon-bi"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">报名</p>
							<p class="enter-intro-notes">随时随地报名</p>
						</div>
					</li>
					<li v-tap="{ methods : yksappJump , param:'Onconfirme'}">
						<div class="exam-enter-icon iconfont icon-diannao"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">在线确认</p>
							<p class="enter-intro-notes">无需现场确认</p>
						</div>
						
					</li>
					<li v-tap="{ methods : yksappJump , param:'registerRecord'}">
						
						<div class="exam-enter-icon iconfont icon-jilu"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">报考记录</p>
							<p class="enter-intro-notes">报考院校总览</p>
						</div>
						
					</li>
					<li  v-tap="{ methods : yksappJump , param:'examSchedule'}">
						
						<div class="exam-enter-icon iconfont icon-rili"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">考试日程</p>
							<p class="enter-intro-notes">考试时间地点查询</p>
						</div>
						
					</li>
					<li v-tap="{ methods : yksappJump , param:'checkRoom'}">
						
						<div class="exam-enter-icon iconfont icon-shouji"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">考场查询</p>
							<p class="enter-intro-notes">查询考场信息</p>
						</div>
						
					</li>
					
					<li  v-tap="{ methods : yksappJump , param:'Firstest'}">
						
						<div class="exam-enter-icon iconfont icon-chengjishezhi"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">初试成绩</p>
							<p class="enter-intro-notes">初试成绩查询入口</p>
						</div>
						
					</li>
					
					<li  v-tap="{ methods : yksappJump , param:'Retestpay'}">
						
						<div class="exam-enter-icon iconfont icon-jiaofei"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">复试交费</p>
							<p class="enter-intro-notes">复试费用缴纳</p>
						</div>
						
					</li>
					<li v-tap="{ methods : yksappJump , param:'queryResults'}">
						
						<div class="exam-enter-icon iconfont icon-mouse1179267easyiconnet"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">成绩查询</p>
							<p class="enter-intro-notes">官方查询入口</p>
						</div>
						
					</li>
					<li  v-tap="{ methods : yksappJump , param:'WishInfo'}">
						
						<div class="exam-enter-icon iconfont icon-juzhongkuai"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">志愿填报</p>
							<p class="enter-intro-notes">院校专业选择</p>
						</div>
						
					</li>
					<li v-tap="{ methods : yksappJump , param:'Admissionquery'}">
					
						<div class="exam-enter-icon iconfont icon-bao-copy"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">录取查询</p>
							<p class="enter-intro-notes">院校录取情况</p>
						</div>
					
					</li>
					
				</ul>
				<ul class="enter-bot addBraek">
					
					
					<li v-tap="{ methods : yksappJump , param:'Cultrue'}">
						<div class="exam-enter-icon iconfont icon-iconfontcolor74"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">文化分测算</p>
							<p class="enter-intro-notes">文化分测算</p>
						</div>	
					</li>

					<li v-tap="{ methods : yksappJump , param:'Rankexam'}">
						<div class="exam-enter-icon iconfont icon-cet"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">等级考试交费</p>
							<p class="enter-intro-notes">四六级等在线报名</p>
						</div>
						
					</li>
					<li  v-tap="{ methods : yksappJump , param:'Myservice'}">
					<!-- <li  v-tap="{ methods : yksappJump , param:'help'}"> -->
						
						<div class="exam-enter-icon iconfont icon-love"></div>
						<div class="enter-intro">
							<p class="enter-intro-kind">我的服务</p>
							<p class="enter-intro-notes">多项增值服务</p>
						</div>
						
					</li>

				</ul>
				
			</div>
		</mt-loadmore>
	</div>
</template>
<script>
    
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Lazyload } from 'mint-ui';
	import { Loadmore } from 'mint-ui';

	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	Vue.use(Lazyload);
	export default {
		name: 'indexexam',
		data() {
			return {
                  imglist:[],
                  newslist: '',
                  defaultImg: false,
                  userPicture:'',/*用户头像*/
                  speedFlag:true,/*加急*/
                  auditStatus:''/*审核状态标志001:未登录默认;002:审核中;003:审核通过;004:审核失败;005:未提交*/
			}
		},
		mounted() {
				this.refreshToplop();
			
                var data = {};
                var that = this;
				window.appReloadWebPage=function(val){
					that.refreshToplop();
				}
                /*最新公告*/
                ajaxMethod.doAjax("sys,/api/m/schoolNews/query.htm", data, function(database) {
                    if(database.success) {
                        that.newslist = database.datas.list;
                    }
                },function(){},"json","POST",function(){
                	alert(123)
                });
         
			
		},
		methods: {
			test(s){
				yksapp.goPageWithParams('webPageNoHeader',s);
			},
			rzIndex() {
				var va = window.location.href;
				yksapp.goPageWithParams('rzIndex',va+"Inforperfect");
				// yksapp.goPageWithParams('webPageNoHeader',accontCheck);
			},
			/*轮播资源刷新*/
			refreshToplop(){
				
                var that = this;
				if(!window.yksapp_user){
					
					return ;
				}
				
		
				if(!yksapp_user.getTicket()) {
				 	that.defaultImg = true;
					that.auditStatus='001';
					
		          	return;
		        }
				
              let userId=yksapp_user.getUserId()
                let audit_data={
                     userId:userId
                 }
                 ajaxMethod.doAjax("user,/api/m/auth/manager/audit/audit_data.htm", audit_data,function(auditbase){
					 
                      console.log(auditbase)
                           if(auditbase.success){
							  
                               let auditobj=auditbase.datas.obj;/*数据存在执行*/
                               if(auditobj){
								   
								   that.defaultImg = true;
                                   if(auditobj.auditFlag){
                                       if(auditobj.auditFlag=='1'){
                                           /*审核通过*/
                                          that.auditStatus='003';
                                          that.userPicture=auditobj.avatar;
                                       }else if(auditobj.auditFlag=='2'){
                                           /*审核不通过*/
                                           that.auditStatus='004';
                                         
                                       }
                                   }else{
                                       /*审核中*/
                                        that.auditStatus='002';
                                       	that.speedFlag=auditobj.speedFlag;  
                                   }
								  
                               }else{
								  
								   that.auditStatus='005';
							   }
                           }else{
							  
                              that.auditStatus='001';
							   that.defaultImg = true;
                           }
                       },function(){
						 if(that.auditStatus=='005'){
							 	ajaxMethod.doAjax("hulaquan,/api/m/base/page/v3/applyPage.htm", {}, function(database) {
									if(database.success) {
										if(database.datas.list) {
											that.imglist = database.datas.list;
										}
									} else {
											that.defaultImg = true;
									}
								}, function() {
									/*默认图片*/
									if(that.imglist.length!=0) {
										that.defaultImg = false;
									} else {
										that.defaultImg = true;

									}
								});
						 }
					 	if(!that.auditStatus){
							that.defaultImg = true;
						}
					
				 })
				
				
				
                
			},
            /*最新公告跳转*/
            newslistJump(value){
                // 电脑上直接从路由跳转
		        if(!(window.yksapp)) {
		          this.$router.push("/" + value.param);
		          return;
		        }           
		        var va = window.location.href;
                yksapp.goPageWithParams('webPageNoHeader', va + value.param);
            },
            bannerJump(sourceobj){
                let resource= JSON.stringify(sourceobj.param);
                if(window.yksapp){
                    yksapp.goPageWithParams('banner',resource);
                }
                
            },
            yksappJump(valueParam) {
                let value=valueParam.param;
		        // 电脑上直接从路由跳转
		        if(!(window.yksapp)) {
		          this.$router.push("/" + value);
		          return;
		        }
		      	// 获取不到ticket直接跳转到原生登录页面
		        if(!yksapp_user.getTicket()) {
		          yksapp.goPageWithParams("login", null);
		          return;
		        }
                /*判断是否绑定证件号*/
		        let stdType=yksapp_user.getStdIDType();
                let stdIDNum=yksapp_user.getStdIDNum();
                if(!(stdType&&stdIDNum)){
                    yksapp.goPageWithParams("bindIDNum",null);
                    return ;
                }
		        var va = window.location.href;
                // new判断是否完善信息及绑定证件号，原生提供方法
                if(value!='Inforperfect'){
                  	var accontCheck=`{"url":"${va}${value}","xinXiTX":"${va}Inforperfect"}`;
                  	var admissionC=`{"url":"${va}${value}","xinXiTX":"${va}Inforperfect","baoKaoXZ":"${va}commitmentRead"}`;
                	// yksapp.goPageWithParams('webPageNoHeader',accontCheck);
	                if(value == 'signEntrance'){
                		yksapp.goPageWithParams('webPageNoHeader',admissionC);
	                }else{
	                	yksapp.goPageWithParams('webPageNoHeader',accontCheck);
	                }
	                return;
                }
		        yksapp.goPageWithParams('webPageNoHeader', va + value);
		    },
			/*轮播刷新*/
			refresh(done){
				
				this.refreshToplop();
				done();
			},
			loadTop(){
				this.refreshToplop();
				this.$refs.loadmore.onTopLoaded();
			}
			
		}

	}
</script>
<style>
    /*轮播设置*/
  #indexexam .mint-loadmore-top{
    visibility: hidden;
  }
	/*mint-ui轮播*/
    .swiper-lazy-preloader:after{
        background-color: #fff;
    }
	.mt-swipe-item-pic{
		width: 100%;
		height: 100%;
	}
    #indexexam,.swiper-container{
        height: 100%; 
		position: relative;
    }
	/*头部设置*/
	#indexexam .header {
        position:relative;
		overflow: hidden;
		background: #fff;
		width: 100%;
        
	}
	#indexexam .exam-top {
		height: 2rem;
	}
	#indexexam .exam-top-status{
		height: 100%;
	}
	#indexexam .exam-top .defaultImg,#indexexam .exam-top-status {
		width: 100%;
		height: 100%;
	}
    #indexexam .exam-top-status{
        background-color: #42cefc;
        font-size: 0.2rem;
        overflow: hidden;
        
    }
    #indexexam .exam-top-status-line-one,#indexexam .exam-top-status-line-two,#indexexam .exam-top-status-line-three{
        color: #effbfe;
        font-size: 0.23rem;
    }
    #indexexam .exam-top-status-line-one{
        width: 80%;
        margin: 0.3rem  auto 0.2rem ;
        
    }
    #indexexam .exam-top-status-line-two{
        width: 65%;
        margin: 0 auto;
    }
    #indexexam .exam-top-status-line-three{
        width: 65%;
        margin: 0 auto;
        text-align: right;
    }
    #indexexam .exam-top-status-userPicture{
        height: 1.14rem;
        width: 1.14rem;
        margin: 0.25rem auto 0.1rem ;
    }
    #indexexam .exam-top-status-note{
        text-align: center;
        color: #f3e634;
    }
    #indexexam .exam-top-status-userPicture img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
	#indexexam .exam-top .defaultImg img{
		width: 100%;
		height: 100%;
	}
	/*公告*/
	
	#indexexam .exam-notice {
		position: relative;
		padding: 0.1rem 10px;
		width: 100%;
		overflow: hidden;
		background: #fff;
		height: 0.9rem;
		box-sizing: border-box;
		display: flex;
		margin: 0.1rem 0;
	}
	#indexexam .exam-notice-note{
		height: 0.8rem;
		flex-shrink: 0;
		border-right: 1px solid #e8e8e8;
		padding-right: 0.12rem;
	}
	#indexexam  .notice-note{
		font-size: 0.3rem;
		height: 0.4rem;
		color: #42cefc;
		line-height: 0.4rem;
	} 
	#indexexam  .newslist-listIntro {
		flex-grow: 1;
		font-size: 0.24rem;
	}
	
	#indexexam .newslist-listIntro ul {
		height: 0.8rem;
		overflow: hidden;
	}
	#indexexam .newslist-listIntro ul li {
		height: 0.4rem;
		line-height: 0.4rem;
		color: #4a4a4a;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		position: relative;
		box-sizing: border-box;
		padding-left: 0.24rem;
		
	}
	
	#indexexam .newslist-listIntro ul li:after {
		content: "";
		width: 0.12rem;
		height: 0.12rem;
		background-color: #42cefc;
		border-radius: 100%;
		position: absolute;
		left: 0.06rem;
		top: 0.14rem;
	}
	/*报考部分*/
	
	#indexexam .enter-top {
		margin-top: 10px;
	}
	
	#indexexam .enter-top,
	#indexexam .enter-bot,
	#indexexam .enter-center {
		overflow: hidden;
		background: #FFFFFF;
		zoom: 1;
	}
	
	#indexexam .enter-center {
		margin: 10px 0;
	}
	
	#indexexam .enter-top:after,
	#indexexam .enter-bot:after,
	#indexexam .enter-center:after {
		content: '';
		display: block;
		height: 0;
		font-size: 0;
		clear: both;
		overflow: hidden;
	}
    /*有无公告*/
	#indexexam .exam-enter li {
		width: 50%;
		float: left;
		position: relative;
		box-sizing: border-box;
        padding-bottom: 0.32rem;
        padding-top: 0.32rem;
		
	}
	
	#indexexam .exam-enter li a {
		color: #000;
	}
	
	#indexexam .enter-center li,
	#indexexam .enter-bot li {
		border-bottom: 1px solid #f3f3f3;
	}
	
	#indexexam .exam-enter li:nth-of-type(odd) {
		border-right: 1px solid #f3f3f3;
		position: relative;
		box-sizing: border-box;
	}
	
	#indexexam .exam-enter-icon {
		position: absolute;
		top: 0.32rem;
		left:0;
		font-size: 0.48rem;
		width: 0.8rem;
		text-align: center;
		
	}
	#indexexam  .rz-index-status{
		position: absolute;
		top:0;
		right: 0;
		font-size: 0.6rem;	
	}
	#indexexam .enter-intro {
		padding-left: 0.8rem;
	}
	 #indexexam .enter-intro-kind {
		font-weight: 200;
		color: #000;
		font-size: 0.29rem
	}
	#indexexam .enter-intro-notes {
		font-size: 0.24rem;
		color: #acacac;
		padding-top: 0.16rem;
	}
	/*icon颜色*/
	#indexexam .icon-yonghu,#indexexam .icon-msnui-user-auth,#indexexam .icon-iconfontqian,#indexexam .icon-mouse1179267easyiconnet,.icon-daitijiao{
		color: #ffdc4e;
	}
	#indexexam .icon-bi,#indexexam .icon-chengjishezhi,#indexexam .icon-shouji,#indexexam .icon-cet,#indexexam .icon-bao-copy,.icon-shenhezhong{
		color: #a6b1e7;
	}
	#indexexam .icon-rili,#indexexam .icon-juzhongkuai,#indexexam .icon-love,.icon-weitongguo{
		color: #ffabab;
	}
	#indexexam .icon-diannao,#indexexam .icon-jilu,#indexexam .icon-jiaofei,#indexexam .icon-iconfontcolor74,.icon-chenggong{
		color: #90e2fd;
	}
	
</style>