<template>
   <div class='repetitionPlan'>
    	<!-- <mt-header fixed title="复读计划">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
		<div class="repetitionPlan-del">
			<p class="nine"><span>99个学费全免名额</span></p>
			<p class="inter" style="color:#fff;">
				据调查统计，全国有16%的艺术生考生会选择复读。如果面对不甘心和压力，你选择了决心和毅力，那艺考升此刻必须来为你助力！
			</p>
			<div>
				<ul class="info-list">
					<li>
						<span>姓&nbsp;&nbsp;&nbsp;&nbsp;名</span>
						<input type="text" v-model="stu_name">
					</li>
					<li>
						<span>电&nbsp;&nbsp;&nbsp;&nbsp;话</span>
						<input maxlength="11" type="tel" v-model="stu_phone">
					</li>
					<li>
						<span>联考成绩</span>
						<input type="number" v-model="stu_score">
					</li>
					<li>
						<span>你所在城市</span>
						<input type="text" v-model="stu_city">
					</li>
					<li>
						<span @click="submit_handel" class="submit_btn">提交</span>
					</li>
				</ul>
			</div>
			<p class="notice">艺考升工作人员，会及时与您电话联系，提供助力</p>
		</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { MessageBox,Toast,Button   } from 'mint-ui';
Vue.component(Button.name, Button);
export default {
  name: 'app',
  data () {
    return {
        winHei:'',
        winWid:'',
        stu_name:'',
        stu_phone:'',
        stu_score:'',
        stu_city:''
    }
  },
  mounted(){
  	this.winHei=document.documentElement.clientHeight;
  	this.winWid=document.documentElement.clientWidth;
  	$(".repetitionPlan").css({"width":this.winWid,"height":this.winHei})
  },
  methods:{
  	submit_handel(){
  		var url="advert,/api/m/adv/active/v3/queryActive.htm";
  		var data={
  			"activeCode":"fdjh"
  		}
  		ajaxMethod.doAjax(url,data,this.getOrder);
  	},
  	getOrder(d){
  		if(!d.success){
            Toast(d.message)
        }
        if(d.success && d.datas.active.needPay==1){
            var url="advert,/api/m/adv/activeOrder/v3/saveActiveOrder.htm";
            var PhoneT=/^1\d{10}$/;
            var sco=/^\d{1,}$/
            if(!(PhoneT.test(this.stu_phone))){
            	Toast("请输入正确手机号");
            	return;
            }
            if(!(sco.test(this.stu_score))){
            	Toast("请输入联考成绩");
            	return;
            }
            if(this.stu_city==''){
            	Toast("请输入你所在城市");
            	return;
            }
            var data={
                "activeCode":d.datas.active.activeCode,
                "userName":this.stu_name,
                "item1":this.stu_score,
                "phone":this.stu_phone,
                "item2":this.stu_city
            };
            this.payNum=d.datas.active.payNum;
            ajaxMethod.doAjax(url,data,function(d){
            	if(d.success){
            		Toast(d.message)
            	}
            });
        }
  	}
  }
}
</script>

<style scoped>
	.repetitionPlan{background:url(../../static/images/fdjh/fdjh.png);background-repeat: no-repeat;background-size: 100% 100%;}
	.info-list{text-align:center;}
	.info-list li {color:#fff;margin-bottom:.3rem;}
	.info-list li span{display:inline-block;width:1.67rem;}
	.info-list li input{border:1px solid #ddd;width:4rem;padding:.1rem;border-radius:.1rem;}
	.notice{color:#fff;text-align: center;}
	.repetitionPlan-del{padding-top:3.2rem;}
	.nine{color:#fff;text-align:center;height:.7rem;line-height: .7rem;margin-bottom:.1rem;}
	.nine span{display:inline-block;height:100%;line-height:.7rem;border:1px solid #fff;border-radius:.5rem;padding:0 .5rem;font-size:.3rem;background: url(../../static/images/fdjh/nine.png);background-repeat: no-repeat;background-size: 100% 100%;color:#000;}
	.inter{color:#fff;padding:0 .6rem;margin:.2rem 0 .6rem;font-size:.3rem;}
	.info-list li .submit_btn{background:#DF9D21;font-size:.35rem;padding:.2rem 0;display:inline-block;width:6rem;letter-spacing: 5px}
</style>
