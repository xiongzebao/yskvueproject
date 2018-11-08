<template>
	<div class="medal">
		<mt-header fixed title="勋章墙" class="getHeight">
			<router-link to="/queryResults" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<mt-button  slot="right" @click="share()">分享</mt-button>
        </mt-header>
		<div class="medal-DD">
			<div class="ymjh">
				<div class="medal-wall">
					<div class="medal-h">
						<div class="bg-medal"></div>
						<div class="medal-info">
							<div class="edit-info">
								<!-- <form id="formEdit" action=""> -->
									<div class="edit-info">
										<span class="lorem" v-show="showFlag">
											<span class="names">{{ediT}}</span>
											<span class="edit-icon" v-if="if_Edit" @click="editText">
												
											</span>
										</span>
						              	<input type="text" name="customName" id="customName" maxlength="12" v-model="ediT" v-show="!showFlag" class=" edit-ipt Edit" @blur="blurE">
						            </div>
								<!-- </form> -->
							</div>
							<p class="medal-total">我获得了{{medal_list.length}}张合格证</p>
						</div>
					</div>
					<div class="medal-del">
						<div class="medal-list">
							<span class="corner cor-1"></span>
							<span class="corner cor-2"></span>
							<span class="corner cor-3"></span>
							<span class="corner cor-4"></span>
							<div v-if="medal_list.length==1">
								<div class="medal-1">
									<ul class="f-fixed">
										<li v-for="item in medal_list">
						                  	<div class="sch-h">
						                  		<div class="pic-wrap">
						                  			<img v-bind:src="item.schoolLogo" alt="">
						                  		</div>
						                  	</div>
						                  	<div class="sch-cont">
						                  		<span class="sch-name">{{item.schoolName}}</span>
						                  		<span class="pro-dir">{{item.specialtyName}}</span>
						                  		<div v-if="item.scoreOrder">
						                  			<span class="pro-dir">第{{item.scoreOrder}}名</span>
						                  		</div>
						                  		<span class="pro-dir" v-if="item.status==1">
						                  			合格
						                  		</span>
						                  		<span class="pro-dir" v-else-if="item.status==2">
						                  			不合格
						                  		</span>
						                  		<span class="pro-dir" v-else>
						                  			
						                  		</span>
						                  	</div>
						                </li>
					                </ul>
								</div>
							</div>
							<div v-else-if="medal_list.length==2">
								<div class="medal-2">
									<ul class="f-fixed medal-2-ul">
										<li v-for="item in medal_list">
						                  	<div class="sch-h">
						                  		<div class="pic-wrap">
						                  			<img v-bind:src="item.schoolLogo" alt="">
						                  		</div>
						                  	</div>
						                  	<div class="sch-cont">
						                  		<span class="sch-name">{{item.schoolName}}</span>
						                  		<span class="pro-dir">{{item.specialtyName}}</span>
						                  		<div>
							                  		<span class="pro-dir" v-if="!!item.scoreOrder">
							                  			第{{item.scoreOrder}}名
							                  		</span>
						                  		</div>
						                  		<span class="pro-dir" v-if="item.status==1">
						                  			合格
						                  		</span>
						                  		<span class="pro-dir" v-else-if="item.status==2">
						                  			不合格
						                  		</span>
						                  		<span class="pro-dir" v-else>
						                  			
						                  		</span>
						                  	</div>
						                </li>
					                </ul>
								</div>
							</div>
							<div v-else-if="medal_list.length==3">
								<div class="medal-3">
									<ul class="f-fixed medal-3-ul">
										<li v-for="item in medal_list">
						                  	<div class="sch-h">
						                  		<div class="pic-wrap">
						                  			<img v-bind:src="item.schoolLogo" alt="">
						                  		</div>
						                  	</div>
						                  	<div class="sch-cont">
						                  		<span class="sch-name">{{item.schoolName}}</span>
						                  		<span class="pro-dir">{{item.specialtyName}}</span>
						                  		<div>
							                  		<span class="pro-dir" v-if="!!item.scoreOrder">
							                  			第{{item.scoreOrder}}名
							                  		</span>
						                  		</div>
						                  		<span class="pro-dir" v-if="item.status==1">
						                  			合格
						                  		</span>
						                  		<span class="pro-dir" v-else-if="item.status==2">
						                  			不合格
						                  		</span>
						                  		<span class="pro-dir" v-else>
						                  			
						                  		</span>
						                  	</div>
						                </li>
					                </ul>
								</div>
							</div>
							<div v-else-if="medal_list.length==4">
								<div class="medal-4">
									<ul class="f-fixed medal-4-ul">
										<li v-for="item in medal_list">
						                  	<div class="sch-h">
						                  		<div class="pic-wrap">
						                  			<img v-bind:src="item.schoolLogo" alt="">
						                  		</div>
						                  	</div>
						                  	<div class="sch-cont">
						                  		<span class="sch-name">{{item.schoolName}}</span>
						                  		<span class="pro-dir">{{item.specialtyName}}</span>
						                  		<div>
							                  		<span class="pro-dir" v-if="!!item.scoreOrder">
							                  			第{{item.scoreOrder}}名
							                  		</span>
						                  		</div>
						                  		<span class="pro-dir" v-if="item.status==1">
						                  			合格
						                  		</span>
						                  		<span class="pro-dir" v-else-if="item.status==2">
						                  			不合格
						                  		</span>
						                  		<span class="pro-dir" v-else>
						                  			
						                  		</span>
						                  	</div>
						                </li>
					                </ul>
								</div>
							</div>
							<div v-else-if="medal_list.length>=5">
								<div class="medal-gt4">
									<ul class="f-fixed medal-gt4-ul">
										<li v-for="item in medal_list">
						                  	<div class="sch-h">
						                  		<div class="pic-wrap">
						                  			<img v-bind:src="item.schoolLogo" alt="">
						                  		</div>
						                  	</div>
						                  	<div class="sch-cont">
						                  		<span class="sch-name">{{item.schoolName}}</span>
						                  		<span class="pro-dir">{{item.specialtyName}}</span>
						                  		<div>
							                  		<span class="pro-dir" v-if="!!item.scoreOrder">
							                  			第{{item.scoreOrder}}名
							                  		</span>
						                  		</div>
						                  		<span class="pro-dir" v-if="item.status==1">
						                  			合格
						                  		</span>
						                  		<span class="pro-dir" v-else-if="item.status==2">
						                  			不合格
						                  		</span>
						                  		<span class="pro-dir" v-else>
						                  			
						                  		</span>
						                  	</div>
						                </li>
					                </ul>
								</div>
							</div>
							<div v-else>
								<div class="medal-no">
									<ul class="f-fixed">
										<li>
						                  	<div class="sch-h">
						                  		<div class="pic-wrap"></div>
						                  	</div>
						                </li>
					                </ul>
								</div>
							</div>
						</div>
					</div>
					<div class="medal-share">
						<div class="medal-bottom"></div>
			          	<div class="share-pic f-fixed">
			            	<div class="logo lf"><img src="../../../static/img/medal/ymjh-logo_1.png" alt=""></div>
			            	<div class="dl lf">
			            		<span id="qrcode_canvas"></span>
			            		<span>扫一扫，查真伪</span>
			            	</div>
			          	</div>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default{
		name:"medal",
		data(){
			return {
				ediT:"",
				showFlag:true,
				medal_list:[],
				allData:{},
				userId:'',
				// 控制是否显示编辑按钮
				if_Edit:"",
				titleHeight:'',
			}
		},
		created(){
			// this.loadMedalData(this.$route.params.userId)
		},
		mounted(){
			this.titleHeight=$(".getHeight").height();
			// alert(this.titleHeight)
			// alert(window.devicePixelRatio)
			$(".medal-del").css({"minHeight":$(window).height()-$(".medal-h").height()-$(".medal-share").height()})
			// var medalUrl="hulaquan,/api/m/my/info/info/get.htm";
			var medalUrl="hulaquan,/api/m/my/info/userBadge.htm";
			// 勋章墙参数
            this.userId=this.$route.params.userId
            console.log(this.userId)
            var medalP={desUserID:this.userId};
            var canvasData=window.location.href
            $("#qrcode_canvas").qrcode(canvasData)
            // $("#app").css({"overflow":"auto","height":"auto"})
			ajaxMethod.doAjax(medalUrl,medalP,this.loadMedalData);
			// 剩余修改次数：surplusNum
			// 是否可修改：isCanUpdate
		},
		methods:{
			blurE(){
				var that=this;
				this.showFlag=!this.showFlag;
				var updateName="hulaquan,/api/m/auth/my/info/updateName.htm";
				// var upNamep={userID:"1190891",customName:that.ediT}
				var upNamep={desUserID:this.userId,customName:that.ediT}
				ajaxMethod.doAjax(updateName,upNamep,this.upDateName);
			},
			upDateName(data){
				if(data.datas.surplusNum==0){
					this.if_Edit=false;
					Toast({
					  	message: '修改次数用完了',
					  	duration: 2000
					});
				}else{
					this.ediT=data.datas.userExtendDO.customName;
				}
			},
			editText(){
				this.showFlag=!this.showFlag;
				$(".Edit").focus();
			},
			loadMedalData(q){
                this.medal_list=q.datas.userExtendDO.credentialsList;
                this.allData=q.datas.userExtendDO;
                if(this.allData.nickName){
                	this.ediT=this.allData.customName;
                }else{
                	this.ediT=this.allData.nickName;
                }
                this.if_Edit=q.datas.userExtendDO.isCanUpdate;
                console.log(this.if_Edit)
            },
            share(){
            	var height=window.devicePixelRatio*Number(this.titleHeight)
            	// yksapp.goShareWithScreenShot();
            	yksapp.goShareWithScreenShot(height);
            }
		}
	}
</script>

<style scoped>
	.medal-DD{padding-top:.8rem;}
	.lf{float:left;}
    .rf{float:right;}
    .f-fixed:after{content:'\200b';display:block;height:0;clear:both;}
    .dis-none{display:none;}
	/*没有勋章*/
	.ymjh .medal-wall .medal-del .medal-no{padding:0.7rem 0;}
	.ymjh .medal-wall .medal-del .medal-1{padding:0.4rem 0;}
	.ymjh .medal-wall .medal-del .medal-no .sch-h{position:relative;width:3rem;height:3rem;margin:0 auto;background:url(../../../static/img/medal/no-media.png);background-size: cover;}
	.ymjh .medal-wall .medal-del .medal-no img{border-radius:50%;max-width:50%;max-height:50%;margin:0 auto;position:absolute;top:0.27rem;left:50%;transform: translate(-50%,0);-webkit-transform: translate(-50%,0);}
	.ymjh .medal-wall .medal-del .medal-no span{display:block;}
	.ymjh .medal-wall .medal-del .medal-no .sch-cont{font-size:.35rem;}
	.ymjh .medal-wall .medal-del .medal-no .pro-dir{letter-spacing: 0.02rem;font-size:0.35rem;margin-top:0.1rem;}
	/*勋章墙*/
	.ymjh .medal-wall .medal-h{background-position:top center;width:100%;height:4rem;position:relative;background:linear-gradient(#ff7d58,#ff973a);}
	.ymjh .medal-wall .medal-h .bg-medal{position:absolute;top:0;left:0;right:0;bottom:0;background:url(../../../static/img/medal/medal-h.png);background-size:cover;background-position: center bottom;}
	.ymjh .medal-wall .medal-del{background: linear-gradient(#ff973a , #ff7d58);background: -webkit-linear-gradient(#ff973a , #ff7d58);padding:0.2rem;margin-top:-.1rem;}
	.ymjh .medal-wall .medal-del .medal-list{text-align:center;position:relative;background:#fff;}
	.ymjh .medal-wall .medal-del .medal-list .corner {position: absolute;width: 0.4rem;height: 0.4rem;background-repeat: no-repeat;background-size: contain;}
	.ymjh .medal-wall .medal-del .medal-list .cor-1{top: 0.05rem;left: 0.05rem;background-image: url(../../../static/img/medal/co-1.png);}
	.ymjh .medal-wall .medal-del .medal-list .cor-2{top: 0.05rem;right: 0.05rem;background-image: url(../../../static/img/medal/co-2.png);}
	.ymjh .medal-wall .medal-del .medal-list .cor-3{bottom: 0.05rem;left: 0.05rem;background-image: url(../../../static/img/medal/co-3.png);}
	.ymjh .medal-wall .medal-del .medal-list .cor-4{bottom: 0.05rem;right: 0.05rem;background-image: url(../../../static/img/medal/co-4.png);}
	.ymjh .medal-wall .medal-del .medal-list .pro-dir{color:#aeaeae;}
	.ymjh .medal-wall .medal-del .medal-list .pro-dir,.ymjh .medal-wall .medal-del .medal-list .sch-name{display:block;width:100%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
	.ymjh .medal-wall .medal-h .medal-info{font-size:0.35rem;position:absolute;bottom:0.4rem;color:#fff;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);left:50%;text-align:center;width:100%;}
	.ymjh .medal-wall .medal-h .medal-info .edit-ipt{border:none;background: transparent;color:#fff;text-align:center;width:90%;}
	.ymjh .medal-wall .medal-h .medal-info .edit-icon{width:0.35rem;height:0.35rem;display:inline-block;background: url(../../../static/img/medal/edit-icon.png);background-size:cover;position: absolute;top: 0.05rem;right: -0.4rem;}
	.ymjh .medal-wall .medal-h .medal-info .lorem{position:relative;    display: inline-block;max-width: 80%;}
	.ymjh .medal-wall .medal-h .medal-info .lorem .names{    display: inline-block;max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.ymjh .medal-wall .medal-share{width:100%;height:3rem;position:relative; background: -webkit-linear-gradient(#ff7d58,#ff973a);margin-top:-0.1rem;}
	.ymjh .medal-wall .medal-share .medal-bottom{background:url(../../../static/img/medal/share-f.png);background-size:cover;position: absolute;top: 0;left: 0;right: 0;bottom: 0;}
	.ymjh .medal-wall .medal-share .share-pic{position:absolute;height:1.5rem;left:50%;top:50%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);width:80%;}
	.ymjh .medal-wall .medal-share .share-pic img{height:100%; }
	.ymjh .medal-wall .medal-share .share-pic>div{display:inline-block;text-align:center;color:#fff;height:1.5rem;width:50%;}
	.ymjh .medal-wall .medal-share .share-pic .logo{display:flex;-webkit-display:flex;}
	.ymjh .medal-wall .medal-share .share-pic .logo>img{margin:0 auto;}
	/* .ymjh .medal-wall .medal-share .share-pic .dl{margin-left:0.1rem;} */
	.ymjh .medal-wall .medal-share .share-pic .dl span{display:block; font-size:0.25rem;}
	.ymjh .medal-wall .medal-share .share-pic .dl #qrcode_canvas{width:1.1rem;margin:0 auto;height:1.1rem;text-align:center;}
	.ymjh .medal-wall .medal-share .share-pic .dl #qrcode_canvas canvas{width:100%!important;height:100%!important;}
	.ymjh .medal-wall .medal-share .share-pic .dl img{height:1.1rem;}

	/*一个勋章*/
	.ymjh .medal-wall .medal-del .medal-1{padding:0.4rem 0;}
	.ymjh .medal-wall .medal-del .medal-1 .sch-h{position:relative;width:2.7rem;height:2.7rem;margin:0 auto;background:url(../../../static/img/medal/sch-h.png);background-size: cover;}
	.ymjh .medal-wall .medal-del .medal-1 .sch-h .pic-wrap{position:absolute;bottom:1.1rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);width:1.1rem;height:1.1rem;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content: center;justify-content: center;}
	.ymjh .medal-wall .medal-del .medal-1 img{max-width:100%;max-height:100%;display:inline-flex;}
	.ymjh .medal-wall .medal-del .medal-1 .sch-cont{font-size:.4rem;}
	.ymjh .medal-wall .medal-del .medal-1 span{display:block;}
	.ymjh .medal-wall .medal-del .medal-1 .sch-name{font-size:0.4rem;letter-spacing: -0.01rem;color:#333;}
	.ymjh .medal-wall .medal-del .medal-1 .pro-dir{letter-spacing: 0.02rem;}

	/*两个勋章*/
	.ymjh .medal-wall .medal-del .medal-2{padding:0.5rem 0.15rem;}
	.ymjh .medal-wall .medal-del .medal-2 .sch-h{position:relative;width:1.6rem;height:1.6rem;margin:0 auto;background:url(../../../static/img/medal/sch-h.png);background-size: cover;}
	.ymjh .medal-wall .medal-del .medal-2 .sch-h .pic-wrap{position:absolute;bottom:0.64rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);width:0.7rem;height:0.7rem;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content: center;justify-content: center;}
	.ymjh .medal-wall .medal-del .medal-2 .sch-cont{height:1.5rem;font-size:.3rem;}
	.ymjh .medal-wall .medal-del .medal-2 .medal-2-ul li{float:left;width:50%;}
	.ymjh .medal-wall .medal-del .medal-2 img{max-width:100%;max-height:100%;display:inline-flex;}
	.ymjh .medal-wall .medal-del .medal-2 span{display:block;}
	.ymjh .medal-wall .medal-del .medal-2 .sch-name{font-size:0.3rem;letter-spacing: -0.01rem;color:#333;}
	.ymjh .medal-wall .medal-del .medal-2 .pro-dir{letter-spacing: 0.02rem;font-size:0.12rem;}

	/*三个勋章*/
	.ymjh .medal-wall .medal-del .medal-3{padding:0.5rem 0.2rem;}
	.ymjh .medal-wall .medal-del .medal-3 .sch-h{position:relative;width:1.5rem;height:1.5rem;margin:0 auto;background:url(../../../static/img/medal/sch-h.png);background-size: cover;}
	.ymjh .medal-wall .medal-del .medal-3 .sch-h .pic-wrap{position:absolute;bottom:0.55rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);width:0.7rem;height:0.7rem;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content: center;justify-content: center;}
	.ymjh .medal-wall .medal-del .medal-3 .sch-cont{max-height:1.6rem;min-height: 1.6rem;font-size:.3rem;}
	.ymjh .medal-wall .medal-del .medal-3 .medal-3-ul li{float:left;width:33.33%;}
	.ymjh .medal-wall .medal-del .medal-3 img{max-width:100%;max-height:100%;display:inline-flex;}
	.ymjh .medal-wall .medal-del .medal-3 span{display:block;}
	.ymjh .medal-wall .medal-del .medal-3 .sch-name{font-size:0.3rem;letter-spacing: -0.01rem;color:#333;}
	.ymjh .medal-wall .medal-del .medal-3 .pro-dir{letter-spacing: 0.02rem;}

	/*四个勋章*/
	.ymjh .medal-wall .medal-del .medal-4{padding:0.3rem 0.1rem;}
	.ymjh .medal-wall .medal-del .medal-4 .sch-h{position:relative;width:1.2rem;height:1.2rem;margin:0 auto;background:url(../../../static/img/medal/sch-h.png);background-size: cover;}
	.ymjh .medal-wall .medal-del .medal-4 .sch-h .pic-wrap{position:absolute;bottom:0.52rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);width:0.45rem;height:0.45rem;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content: center;justify-content: center;}
	.ymjh .medal-wall .medal-del .medal-4 .sch-cont{max-height:1.5rem;min-height: 1.5rem;}
	.ymjh .medal-wall .medal-del .medal-4 .medal-4-ul li{float:left;width:50%;margin-bottom:0.2rem;}
	.ymjh .medal-wall .medal-del .medal-4 img{max-width:100%;max-height:100%;display:inline-flex;}
	.ymjh .medal-wall .medal-del .medal-4 span{display:block;}
	.ymjh .medal-wall .medal-del .medal-4 .sch-name{font-size:0.25rem;letter-spacing: -0.01rem;color:#333;}
	.ymjh .medal-wall .medal-del .medal-4 .pro-dir{letter-spacing: 0.02rem;}

	/*五个以上*/
	.ymjh .medal-wall .medal-del .medal-gt4{padding:0.5rem 0.2rem;}
	.ymjh .medal-wall .medal-del .medal-gt4 .sch-h{position:relative;width:1.5rem;height:1.5rem;margin:0 auto;background:url(../../../static/img/medal/sch-h.png);background-size: cover;}
	.ymjh .medal-wall .medal-del .medal-gt4 .sch-h .pic-wrap{position:absolute;bottom:0.61rem;left:50%;transform:translate(-50%,0);-webkit-transform:translate(-50%,0);width:0.6rem;height:0.6rem;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content: center;justify-content: center;}
	.ymjh .medal-wall .medal-del .medal-gt4 .sch-cont{max-height:1.5rem;min-height: 1.5rem;font-size:.25rem;}
	.ymjh .medal-wall .medal-del .medal-gt4 .medal-gt4-ul li{float:left;width:33.33%;margin-bottom:0.2rem;min-height: 1.7rem;}
	.ymjh .medal-wall .medal-del .medal-gt4 img{max-width:100%;max-height:100%;display:inline-flex;}
	.ymjh .medal-wall .medal-del .medal-gt4 span{display:block;}
	.ymjh .medal-wall .medal-del .medal-gt4 .sch-name{font-size:0.25rem;letter-spacing: -0.01rem;color:#333;}
	.ymjh .medal-wall .medal-del .medal-gt4 .pro-dir{letter-spacing: 0.02rem;}
</style>