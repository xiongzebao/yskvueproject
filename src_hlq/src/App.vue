<template>
  <div id="app">
  
    <router-view></router-view>
  </div>
</template>

<script>
	export default{
		mounted(){
			//this.weixinshare();
			// alert(location.href.split('#')[0])
		},
		methods:{

		// 	weixinshareConfig(signatureMap,title,desc,imgUrl){
		//         wx.config({
		//             debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		//             appId:signatureMap.appId, // 必填，公众号的唯一标识
		//             timestamp: signatureMap.timestamp, // 必填，生成签名的时间戳
		//             nonceStr: signatureMap.nonceStr, // 必填，生成签名的随机串
		//             signature: signatureMap.signature,// 必填，签名，见附录1
		//             jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','previewImage','uploadImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		//         });
	 //            wx.checkJsApi({
	 //              	jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','previewImage','uploadImage','downloadImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	 //              	success: function(res) {
	 //              		alert(res)
	 //              	}
		//         });
		//         let _this = this;
		//         wx.ready(function (){
	 //                //imgUrl对应的分享图标目前只支持32k以下图片，而且不支持png图片
	 //                // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	 //                wx.onMenuShareTimeline({
	 //                  	title:"", // 分享标题
	 //                  	desc:"desc", // 分享描述
	 //                  	link: window.location.href,
	 //                  	imgUrl: imgUrl, // 分享图标
	 //                  	trigger: function (res) {

	 //                   	},
	 //                  	success: function () { 

	 //                  	},
	 //                  	cancel: function () { 

	 //                 	},
	 //                 	fail:function(res){

	 //                    }
	 //                });

		//             // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
	 //                wx.onMenuShareAppMessage({
	 //                  	title:"title", // 分享标题
	 //                  	desc:desc, // 分享描述
	 //                  	link: window.location.href,
	 //                  	imgUrl:imgUrl, // 分享图标
	 //                  	type:'link',
	 //                  	trigger: function (res) {
	                  		
	 //                  	},
	 //        		  	success: function () { 
	                  		
	 //                  	},
	 //                  	cancel: function ( ) { 
	                    	         
	 //                  	},
	 //                  	fail:function(res){
	                  		 
	 //                    }
	 //                });
	 //                alert("初始化成功");
	 //                wx.error(function(res){
	 //                	alert(JSON.stringify(res));
	 //                });
	 //            });
	 //        },
		// 	weixinshare(){
	 //            let url="hulaquan,/api/m/base/share/v3/shareSign.htm";
	 //            let p = {"url": location.href.split('#')[0]};
	 //            let _this = this;
	 //            ajaxMethod.doAjax(url,p,function(data){
	 //              	let imgUrl = window.ajaxMethod.getHlqUrl()+'/static/images/writingsShare/share-logo.png';
	 //              	_this.appId=data.datas.signatureMap.appId;
	 //              	_this.timestamp=data.datas.signatureMap.timestamp;
	 //              	_this.nonceStr=data.datas.signatureMap.nonceStr;
	 //              	_this.signature=data.datas.signatureMap.signature;
	 //              	_this.weixinshareConfig(data.datas.signatureMap,";[[[[;l**",_this.briefintro, imgUrl);
	              	
	 //        	});
	 //    	},
		 }

	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.mint-header {
    height: 0.8rem;
    font-size: 0.35rem;
    line-height: 0.8rem;
    background: #fff !important;
    color: #000;
}

</style>
