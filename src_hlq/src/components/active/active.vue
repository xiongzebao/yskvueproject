<template>
    <div class='active'>
        <!-- 活动支付接口测试 -->

        <div class="active-info">
            <input type="text" v-model="userName" placeholder="用户名">
            <input type="text" v-model="idNumber" placeholder="证件号" oninput="if(value.length>18)value=value.slice(0,18)">
            <input type="number" v-model="phone" placeholder="电话" maxlength="11" oninput="if(value.length>11){value=value.slice(0,11);phone=value}" >
            <input type="number" v-model="parentPhone" placeholder="家长电话" oninput="if(value.length>11){value=value.slice(0,11)}" >
            <!-- <input type="button" value/='提交' @click="sub"> -->
            <p style="text-align:center;">
                <mt-button type="primary" size="large" @click="sub">提交</mt-button>
            </p>
        </div>
        <div v-if="zhifu">
            <span style="font-size:.5rem">总金额：{{payNum}}</span>
            <p>
               <mt-button type="primary" @click="gotoPay">去支付</mt-button>
            </p>
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
        userName:"",
        idNumber:"",
        phone:"",
        parentPhone:"",
        payNum:'',//金额
        zhifu:false,
        flag:false,
        orderID:""
    }
  },
  mounted(){
    document.title="活动分享"
   
  },
  methods:{

    sub(){
        var rUrl="advert,/api/m/adv/active/v3/queryActive.htm";
        var rdata={
            "activeCode":"dlyq"
        }
        ajaxMethod.doAjax(rUrl,rdata,this.getOrder);
    },
    // 获取活动信息
    getOrder(d){
        if(!d.success){
            Toast(d.message)
        }
        if(d.success && d.datas.active.needPay==2){
            var url="advert,/api/m/adv/activeOrder/v3/saveActiveOrder.htm";
            var data={
                "activeCode":d.datas.active.activeCode,
                "userName":this.userName,
                "idNumber":this.idNumber,
                "phone":this.phone,
                "parentPhone":this.parentPhone
            };
            this.payNum=d.datas.active.payNum;
            ajaxMethod.doAjax(url,data,this.createOrder);
        }
    },
    // 创建活动订单
    createOrder(d){
        var advid;
        console.log(d)
        advid=d.datas.advOrderID;
        if(d.success){
              var url="advert,/api/m/auth/adv/activeOrder/v3/addActiveOrder.htm";
                var data={
                    "advOrderID":advid
                }
                ajaxMethod.doAjax(url,data,this.pay);
        }
        else{

            if(d.code=='adv-active-009'){
               // alert(d.message);
                this.zhifu=true;
                var url="advert,/api/m/auth/adv/activeOrder/v3/addActiveOrder.htm";
                var data={
                    "advOrderID":advid
                }
                ajaxMethod.doAjax(url,data,this.pay);
            }else{

                alert(d.message);

            }   
        }
      
    },
    // 创建支付订单
    pay(d){
        console.log("pay......");
        console.log(d);
        if(d.success){
            //alert("d.datas.orderID"+d.datas.orderID);
            if(d.datas.orderID!="undefined"&&d.datas.orderID!=null){
                 this.orderID=d.datas.orderID;
                 this.zhifu=true;
             }else {
                this.zhifu=false;
             }
        }else{
            this.zhifu=false;
            alert(d.message);
        }
     
    },
    gotoPay(){
         console.log("orderID......");
         console.log(this.orderID);
        //alert( "gotoPay:"+this.orderID);

        var url = window.location.href;
        yksapp_user.reqOrderCallback(this.orderID, url);
    },




  },

 

  
}
</script>

<style scoped>
    .active-info input{display:block;width:80%;margin:.2rem auto;padding:.2rem;border:1px solid #ddd;border-radius:5px;}
</style>
