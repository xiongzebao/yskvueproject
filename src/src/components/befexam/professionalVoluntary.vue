<template>
    <div class="prof-selected-prof">
        <mt-header fixed title="专业志愿排序">
            <mt-button icon="back" slot="left" @click="prof_operate"></mt-button>
        </mt-header>
        <div class="prof-sort-body">
			<slot name="prof_data">

			</slot>
            <slot name="btn_sure"></slot>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// import VueQriously from 'vue-qriously'
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
    	prof_operate(){
    		this.$bus.emit("profOperate")
    	},
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
.prof-selected-prof{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10001;}
.prof-sort-body{position:fixed;top:.7rem;background:#fff;bottom:0;left:0;width:100%;z-index:1000;overflow: auto;}
</style>
