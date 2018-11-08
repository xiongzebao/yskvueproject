<template>
    <div class="book-share">
    	<div class="share-header">
   			 <div class="book-share-header">
    			<div class="share-header-pic">
    				<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="书籍封面">
    			</div>
    			<div class="share-header-intro">
    				<p class="share-intro-title">谁偷了我的画笔</p>
    				<p class="share-intro-autor">作者:&nbsp;安东尼</p>
    				<div class="share-intro-judg">
    					<span class="iconfont icon-pingjia"></span>
    					<span class="iconfont icon-pingjia"></span>
    					<span class="iconfont icon-pingjia"></span>
    					<span class="iconfont icon-pingjia"></span>
    					<span class="iconfont icon-pingjia"></span>
    					<span class="iconfont icon-pingjia"></span>
    					<span class="intro-judg-grade">5.0分</span>
    				</div>
    				<div class="share-intro-note">简介:{{introduce}}&nbsp;<a href="#">查看全文</a></div>
    			</div> 
    		 </div>  		
    	</div>
    	<div class="book-share-detail">
    			<div class="share-detail-pic">
    				<img src="../../../static/img/AttendentClass/user-logo.jpg" alt="书籍图片"></img>
    			</div>
    		</div>
    	<div class="book-share-footer">
			<div v-tap="{methods:onAppCheck}" class="share-footer">
				<div class="share-footer-attem">
					<span class="iconfont icon-bofang"></span><span>试看</span>
				</div>
				<div class="share-footer-buy">立即购买</div>	
			</div>
    	</div>
    		
    	
   		
    </div>
</template>

<script>
    export default {
		name:"Share",
        data () {
            return {
				introduce:''
            }
        },
        components: {
        },
		mounted(){
			let stringValue="skhdjhfj看电视市司法局大部分女的快递费女本客服部内部看吧开办费你把客服部内部可不方便1可不方便客服部克服麻痹客服部可不方便可不放不开发布可不方便恐怖辅导班可不方便";
			this.setIntroData(stringValue);
		},
		methods:{
			setIntroData(stringValue){
				let value=stringValue;
				let StrValue="";
				if(value.length>100){
					this.introduce=value.substr(0,10)+"..."; 
					return ;
				}
				this.introduce=value;
			},
			onAppCheck(){
				
			}
		}
    }
</script>

<style scoped>
	.book-share{
		font-size: 0.28rem;
	}
	.share-header{
		background-color: #fff;
	}
	.book-share-header{
		box-sizing: border-box;
		width: 92%;
		padding: 4% 10px;
		
	}
	.book-share-header:after{
		content: "";
		height: 0;
		display: block;
		clear: both;
		
	}
	.share-header-pic{
		height: 3rem;
		width:28%;
		float: left;
	}
	.share-header-pic img{
		width: 100%;
		height: 100%;
	}
	.share-header-intro{
		float:right;
		width: 60%;
	}
	.share-intro-title{
		height: 0.65rem;
		line-height: 0.65rem;
		font-size: 0.38rem;
	}
	.share-intro-judg{
		height: 1rem;
		line-height: 1rem;
	}
	.share-intro-judg .iconfont{
		color: #ffaa00;
		font-size: 0.28rem;
	}
	.share-intro-autor,.share-intro-note,.intro-judg-grade{
		color: #909090;
	}
	.book-share-detail{
		background-color: #fff;
		margin-bottom: 0.9rem;
	}
	.share-detail-pic{
		width:70%;
		height:6.7rem;
		margin:10px auto 0 auto;
		padding-top: 0.5rem;
	}
	.share-detail-pic img{
		width: 100%;
		height: 100%;
	}
	.book-share-footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.share-footer:after{
		content: "";
		height: 0;
		display: block;
		clear: both;
	}
	.share-footer div{
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
		font-size: 0.4rem;
	}
	.share-footer .iconfont{
		font-size: 0.4rem;
		padding-right: 5px;
	}
	.share-footer-attem{
		float: left;
		width:35%;
		background-color: #fff;
	}
	.share-footer-buy{
	   float: right;
		width: 65%;
		background-color: #fa0;
		color: #fff;
		
	}
</style>