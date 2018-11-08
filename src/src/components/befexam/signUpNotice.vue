<template> 
    <div class="test-selected-prof signup-notice">
        <mt-header fixed title="报考须知">
            <mt-button icon="back" slot="left" @click="operate_notice"></mt-button>
        </mt-header>
        <div class="select-prof">
        	<slot name="signUp-notice"></slot>
        	<div class="confirm-btn">
        		<span @click="confirm_btn">
        			我已阅读并确认提交
        		</span>
        	</div>
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
    	operate_notice(){
    		this.$bus.emit("clickthird");
    	},
    	confirm_btn(){
    		this.$bus.emit("confirm_btn");
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
.select-prof{font-size:.3rem;}
.test-selected-prof{position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;}
.test-selected-prof .select-prof{background: #F9F9F9;position:absolute;top:.7rem;bottom:0;width:100%;}
.signup-notice .select-prof{bottom:1rem;}
.signup-notice{z-index:2010;height:100%;overflow: auto;}
.signup-notice .select-prof{padding:.2rem;box-sizing: border-box;}
.confirm-btn{position:fixed;bottom:0;left:0;width:100%;height:1rem;padding:.15rem .1rem;background: #fff;box-sizing:border-box;}
.confirm-btn span{display: flex;width: 100%;height: 100%;background: #42CEFC;color: #fff;box-sizing: border-box;border-radius:.08rem;justify-content: center;align-items: center;}
</style>
