<template>
    <div class="selected-prof">
        <p class="user-info f-fixed">
        	<span class="lf">姓名：<i class="text">{{userName}}</i></span>
			<span class="rf">省份：<i class="text">{{provinceName}}</i></span>
        </p>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: '',
    data() {
        return {
            userName: "",
            provinceName: ""
        }
    },
    mounted() {
        this.userName = yksapp_user.getStdName();
        // this.userName = "撒旦";
        this.provinceName = yksapp_user.getStdProvince();
        // this.provinceName = "杭州市";
    },
    methods: {
        asd() {
            this.$bus.emit("click");
        }
    },
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

.user-info {font-size:.25rem;padding:0rem .1rem;background: #fff;height:.5rem;line-height:.5rem;}
.user-info .text{color:#5ABEFA;font-style:normal;}
</style>
