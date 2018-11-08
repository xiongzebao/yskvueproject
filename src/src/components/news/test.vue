<template>
    <div class="commitment">
    	
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    name: 'hello',
    data() {
        return {
        	url:"",
        }
    },
    mounted() {
        $('#iframepaged').css("height",$(window).height()-$(".mint-header").height()-$(".sure-btn").height())
    	var L_protocol=window.location.protocol;
    	if(L_protocol=="https:"){
    		this.url=L_protocol+"//befexam.artstudent.cn"+'/h5/letterOfCommitment.htm';
    	}else{
    		this.url=L_protocol+"//befexam.51bm.net.cn"+'/h5/letterOfCommitment.htm';
    	}
    },
}
</script>
<style scoped>
	.commitment{position:fixed;top:0;left:0;right:0;bottom:0;}
	.commitment .sure-btn{position:absolute;bottom:0;left:0;right:0;background:#fff;height:1.2rem;display:flex;align-items: center;padding:0 .2rem;z-index:888;}
	#iframepaged{height:calc(100% - 2rem);margin-top:.8rem;background: #fff;border-bottom: 1px solid #ddd;padding:.2rem;box-sizing: border-box;}
    .body-content{height:calc(100% - 2rem);overflow: auto;font-size:.25rem;}
    .body-content p{margin:.2rem 0;}
</style>
