<template>
	<div class="we-chat-fun" style="padding:.6rem;">
		<div @click="read_pic" class="btn">
			读取本地相册
		</div>
		<div class="btn" @click="recode">
			开始录音接口
		</div>
		<div class="btn">
			openLocation
		</div>
		<!-- <img class="img1" v-for="item in localIds" :src="item" alt="" crossOrigin="*"> -->
		<img class="img1" src="http://tpl.51bm.net.cn/static/img/share.2481999.png" alt="">
		<div>
			<span v-for="item in localIds">{{item}}</span>
		</div>
		<div class="btn" @click="upload">
			上传图片
		</div>
		<div class="btn" @click="download">
			下载图片
		</div>
		<div class="btn" @click="createPic">
			生成图片
		</div>
		<canvas class="canvas" @click="canvasClick"></canvas>
		<div>
			<pre>上传到服务器的ID</pre>
			<span v-for="item in serverId">{{item}}</span>
		</div>
		<div>
			<pre>本地地址</pre>
			<span v-for="item in localId">{{item}}</span>
		</div>
        <img :src="creSrc" alt="" >
	</div>
</template>
<script>
	export default {
  name: 'app',
  data () {
    return {
      localIds:[],
      serverId:[],//微信服务器ID
      localId:[],//本地地址
      creSrc:'',
    }
  },
  mounted(){
    this.weixinshare();
  },
  methods:{
    canvasClick(e){
        // alert('X轴：'+e.layerX+'y轴：'+e.layerY);
        if((e.layerX>0&&e.layerX<100)&&(e.layerY>0&&e.layerY<100)){
            alert("我在正方形里面");
        }
    },
  	createPic(){
        var img1=$(".img1").get(0);
        var canvas=$(".canvas").get(0);
        var ctx=canvas.getContext("2d");
        canvas.height=img1.height;
        canvas.width=img1.width;
        // canvas.addEventListener('click',function(){
        //     alert(123);
        // },false)
        ctx.drawImage(img1,0,0,img1.width,img1.height);//必须加宽高，不然不能铺满
        try{
            this.creSrc=canvas.toDataURL("image/png");
        }catch(e){
            alert(e)
        }
        // alert(123)
  	},
  	// 录音
  	recode(){
  		wx.startRecord();
  	},
  	// 读取图片
  	read_pic(){
  		var that=this
  		wx.chooseImage({
			count: 4, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				that.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			}
		});
  	},
  	// 上传
  	upload(){
  		this.ul();
  	},
  	ul(){
  		var that=this;
  		var cur=0;
  		var imgLen=that.localIds.length;
		wx.uploadImage({
			localId:that.localIds[cur], // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: imgLen, // 默认为1，显示进度提示
			success: function (res) {
				cur++;
				that.serverId.push(res.serverId)// 返回图片的服务器端ID
				if(cur<imgLen){
					that.ul();
				}
			}
		});
  	},
  	// 下载
  	download(){
  		this.dl()
  	},
  	dl(){
  		var that=this;
  		var cur=0;
  		var imgLen=that.serverId.length;
  		wx.downloadImage({
			serverId:this.serverId[cur], // 需要下载的图片的服务器端ID，由uploadImage接口获得
			isShowProgressTips: imgLen, // 默认为1，显示进度提示
			success:function (res) {
				cur++;
				that.localId.push(res.localId) // 返回图片下载后的本地ID
				if(cur<imgLen){
					that.dl()
				}
			}
		});
  	},
 	weixinshareConfig(signatureMap){
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:signatureMap.appId, // 必填，公众号的唯一标识
            timestamp: signatureMap.timestamp, // 必填，生成签名的时间戳
            nonceStr: signatureMap.nonceStr, // 必填，生成签名的随机串
            signature: signatureMap.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','startRecord','uploadImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
     	});
      	wx.checkJsApi({
          	jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'],
          		success: function(res) {

          		}
      		});
          	let _this = this;
          	wx.ready(function (){
               	wx.error(function(res){
                 	console.log(JSON.stringify(res));
                 	alert(JSON.stringify(res));
                });
            });
      	},
	 	weixinshare(){
            let url="hulaquan,/api/m/base/share/v3/shareSign.htm";
            let p = {"url": location.href.split('#')[0]};
            let _this = this;
         	ajaxMethod.doAjax(url,p,function(data){
          	let imgUrl = window.ajaxMethod.getHlqUrl()+'/static/images/writingsShare/share-logo.png';
          		_this.weixinshareConfig(data.datas.signatureMap);
         	});
        },

  }
}
</script>
<style scoped>
	img{max-width:100%;}
	.btn{
		font-size:.4rem;border:1px solid #ddd;padding:.2rem;border-radius:.1rem;margin-top:.2rem;text-align:center;
	}
</style>