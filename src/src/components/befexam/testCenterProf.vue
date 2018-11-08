<template> 
    <div class="test-selected-prof">
        <mt-header fixed title="选择考点专业">
            <mt-button icon="back" slot="left" @click="asd"></mt-button>
        </mt-header>
        <div class="select-prof">
        	<userInfo></userInfo>
        	<slot name="school"></slot>
        	<slot name='selecting-body'>
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
.test-selected-prof{position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;}
.test-selected-prof .select-prof{background: #F9F9F9;position:absolute;top:.7rem;bottom:0;width:100%;}
</style>
