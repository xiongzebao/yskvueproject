<template>
  <div id="smsvertify">
  	<!-- 短信验证-->
	<div class="mask">
		<div class='msgcontainer' >
				<div class="title"  style=''> <span  style='display:inline-block;width:100%' >短信验证</span> <span class="msg-close" style='float:right;position:absolute;top:0;right:5px' @click='close'>关闭</span></div>

				<div class='msg-content-container' >
				<div class="msg-content" >将向您的预留号码187****6651发送短信验证码，请点击"发送验证码"获取验证码</div>
				<div  ><span >验证码:</span><input class="msg-input"> <button id ="sendcode" class="msg-send" >发送验证码</button></div>
				<button class="msg-commit">确定</button>
				</div>
		</div>
	</div>	

  </div>
</template>

<script>
 
import { MessageBox } from 'mint-ui';
window.ctx = "";
function VertificationCode(fnSuccess){
	this.fnSuccess;
	this.setfnSuccess = function(fn){
		this.fnSuccess = fn;
	};
	this.phoneNumber;
	this.ST;
	this.reset=function(){
		  $(".msg-input").attr("value","");
		   $(".msg-input").val("");
		    var name = "发送验证码";
		 	clearInterval(this.ST);
			$("#sendcode").attr('isC','0');
			$("#sendcode").css("background-color","#37B6EB");
			$("#sendcode").html(name);
			$("#sendcode").attr("disabled", false);
			$("#sendcode").removeAttr("disabled");
	};
	this.sendLimit= function(){
		var showTime = 60;
		var name = "发送验证码";
		var _this = this;
		$("#sendcode").css("background-color","#aaa");
		$("#sendcode").attr("disabled", true);
		
		_this.ST = setInterval(function(){
		 
			if(showTime <= 0){
				_this.reset();
				return;
			}
			 
			$("#sendcode").html(showTime + "s 后重试");
			showTime -= 1;	
		},1000);
		
	};
	
     this.sendVertificationCode=function(){
    	 
    	 var _this = this;
    	 var shouJit =  	$('#telphone').val();
    	 $("#sendcode").css("background-color","#aaa");
		 $('.msg-send').html("发送中...");
	 
    	 ajaxMethod.doAjax("aftexam,/api/m/auth/vol/send_smsCode_aftexam.htm",{shouJi:shouJit},function(data){
    	 	            console.log("发送验证码返回:");
    	 	            console.log(data);
                    if (data.success){
						_this.sendLimit();
					} else {
						$('.msg-send').attr('isC','0');
						$('.msg-send').css("background-color","#37B6EB");
						$('.msg-send').html("发送验证码");
						 clearInterval(_this.ST);
					}
              },
              function(){


              });
	};


	
	this.commitVertificationCode=function(){
	
		 var shouJi =  	$('#telphone').val();
		 var smsCode =   $('.msg-input').val();
		 if(!smsCode){
		 	alert("请填写验证码");
		 	return;
		 }
		 var _this = this;
		
		if ($(".msg-commit").attr('isC') == '1') {
			return;
		}
		$(".msg-commit").attr('isC','1');
		//发送验证码
		var successfn = function(json) {
				 if (json.success){
				 	console.log(_this.fnSuccess);
				 	_this.fnSuccess();
					 $(".mask").hide();
				} else {
					$(".msg-commit").attr('isC','0');
					$(".msg-commit").css("background-color","#37B6EB");
					$(".msg-commit").html("确定");
					 
					alert(json.message);
				}
				$('.loading').hide();
			};
	
		$(".msg-commit").css("background-color","#aaa");
		$(".msg-commit").html("确定中...");
		$('.loading').show();
		 ajaxMethod.doAjax("aftexam,/api/m/auth/vol/verify_smsCode_aftexam.htm",{shouJi:shouJi,smsCode:smsCode},successfn,
		 	function(){ 
		 		$(".msg-commit").attr('isC','0');
				$(".msg-commit").css("background-color","#37B6EB");
				$(".msg-commit").html("确定");
				$('.loading').hide();
		 		 
		 });
	};
	
	this.show = function(){

		var shouJi = $('#telphone').val();
		var phone = shouJi.substring(0,3)+"****"+shouJi.substring(7,11);
		var phonehtml = "<span style='font-weight:bold'>"+phone+"</span>";
		var tip = '将向您的预留号码'+phonehtml+'发送短信验证码，请点击"发送验证码"获取验证码'
		$(".msg-content").html(tip);
		$(".mask").show();

	}
	
	this.close = function(){
			console.log("close....");
			this.reset();
			$(".mask").hide();
			 // _this.$bus.emit('commited');
	}
	
	this.init= function(){
 
		var _this = this;
		$(".msg-send").on("click",function(){
		 
			_this.sendVertificationCode();
			
		});
		$(".msg-commit").on("click",function(){
		 
			
			_this.commitVertificationCode();
		});
		
		$(".msg-close").on("click",function(){
		  
			_this.close();
			 
		});
		
	}
	
}


export default {
	props:{
		 commitData:{
      		type: Function,
      		default: null
    	}
	},

   data(){
   	return {
   		vertify:""
   	}
   },
  mounted(){
  	this.vertify = new VertificationCode();
  	this.vertify.init();
  	this.vertify.close();
  	this.vertify.setfnSuccess(this.commitData);
  	this.$bus.on("showVertify",this.show);

  },


  methods:{

  	show(){
  	 this.vertify.show();
  	},
  	close(){
  		  this.$bus.emit('commited');
  	}


  },
  components:{

  }
}
</script>



<style type="text/css" scoped>

#smsvertify .msgcontainer{
 font-size:0.3rem;
 border-radius:0.16rem;
 width:90%;
 text-align:center;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  -webkit-transform:translate(-50%,-50%);
  background:#fff;
  z-index:100001;
}

#smsvertify.u-btn-gray{background:#aaa;}

#smsvertify .msg-send{
	font-size:0.3rem;  
	width:2rem;
	height:0.6rem;
	background:#37B6EB;
	display: inline-block;
}

#smsvertify .mask{
	width:100%;
	height:100%;
	z-index:888; 
	background: 
	rgba(250,250,250,.4);
	position:fixed;
}

#smsvertify .title{
	width:100%; 
	height:1.0rem;
	//background-color:#37B6EB; 
	font-size:0.3rem; 
	width:100%;
	line-height:1.0rem;
	align-items: center;
	border-bottom: 1px solid #aaa;
}
#smsvertify .msg-content{
	width:90%; font-size:0.3rem; margin:0.2rem; color:#f00;
}

#smsvertify .msg-input{
	width:2rem;
    height:0.5rem;
    margin:0.266rem; 
    border:1px solid #000;
    font-size: 0.3rem;
    display: inline-block;
}
#smsvertify .msg-commit{
 font-size:0.3rem;
 margin:0.267rem;
 background:#37B6EB;
 width:2.5rem;
 height:0.8rem;
 border-radius:0.1rem;
}

</style>