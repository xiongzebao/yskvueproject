<template>
    <div class="selected-prof">
        <mt-header fixed title="院校已选专业">
            <mt-button icon="back" slot="left" @click="asd"></mt-button>
            <mt-button  slot="right" @click="addProf">添加</mt-button>
        </mt-header>
        <div class="select-prof">
            <div class="top-info">
            	<userInfo></userInfo>
                <slot name="school"></slot>
            </div>
            <div class="xuanze-body">
                <slot name='select-body'> 
                </slot>
            </div>
            <slot class="pay-btn" name="pay_btn">
                <!-- <div class="f-fixed dubb-btn">
                    <span class="lf total-jine">
                        合计：<slot name="total-price"></slot>
                    </span>
                    <span class="lf tijiao-btn">
                        提交
                    </span>
                </div> -->
            </slot>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// import VueQriously from 'vue-qriously'
//import 'mint-ui/lib/style.css';
//import {
//    Header,
//    Button
//} from 'mint-ui';
import VueBus from 'vue-bus';
import userInfo from "./userInfo";
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
Vue.use(VueBus);
// Vue.use(VueQriously)

export default {
    name: 'queryResults',
    data() {
        return {

        }
    },
    mounted() {
        
    },
    methods: {
    	asd(){
    		this.$bus.emit("clickb");
    	},
        addProf(){
            this.$bus.emit("click");
        }
    },
    components: {
    	userInfo
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
/*.selected-prof{position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;}*/
.selected-prof .select-prof{background: #F9F9F9;position:absolute;top:.7rem;bottom:0;width:100%;z-index:100;overflow-y:auto }
.selected-prof .select-prof .top-info{position:fixed;top:0.7rem;width:100%;}
.pay-btn{position:fixed;bottom:0;left:0;width:100%;font-size:.3rem;height:1rem;line-height:1rem;}
.xuanze-body{position:absolute;overflow: auto;top:1.1rem;bottom:0rem;width:100%;margin-bottom:1rem;}
.dubb-btn>span{width:50%;text-align: center;}
.dubb-btn .tijiao-btn{background: #1CA7F8;color:#fff;}
.dubb-btn .total-jine{background: #E2E2E2}
</style>
