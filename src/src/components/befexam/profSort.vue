<template>
    <div class="selected-prof">
        <mt-header fixed title="专业志愿排序">
            <mt-button icon="back" slot="left" @click="hideSo"></mt-button>
            <mt-button  slot="right" @click="completeq">完成</mt-button>
        </mt-header>
        <div class="sort-body">
			<slot name="sort_data">
				
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
    	hideSo(){
    		this.$bus.emit("hideSort")
    	},
        completeq(){
            this.$bus.emit("complee");
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
.sort-body{position:fixed;top:0.7rem;left:0;bottom:0;right:0;background: #fff;z-index:2000;overflow: auto;padding:.2rem .2rem 0;}
</style>
