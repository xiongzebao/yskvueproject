<template>
    <div class="commitment">
        <mt-header fixed title="考试承诺书">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!-- <iframe :src="url" 
            id="iframepaged" 
            frameborder="0"  
            marginheight="0" 
            marginwidth="0"  
            width="100%">
        </iframe> -->
        <div style="padding:.8rem .2rem 0;background:#fff;" class="body-content">
            <h3 style="margin:20px auto 30px;text-align:center;">
                诚信考试承诺书
            </h3>
            <p>
                本人自愿参加通过本系统报名的学校所举办的招生考试，为维护考试的严肃性 、权威性和公平性，确保考试的顺利进行，我郑重承诺以下事项： 
            </p>
            <p>
                一、本人已阅读了所报考招生考试的有关规定和纪律要求，知悉《招生简章》、《国家教育考试违规处理办法》等有关报考规定。愿意在考试中自觉遵守考试的规定和守则，保证按规定的程序和要求参加考试，如有违反，自愿按《国家教育考试违规处理办法》有关条款接受处理。
            </p> 
            <p>
                二、保证在考试中诚实守信，自觉遵守国家有关招生考试法规和考试纪律、考场规则。如有违法、违纪、违规行为，自愿服从相关学校管理人员根据有关考试规定所作出的处罚决定，接受处罚。
            </p>
            <p>
                三、本人报名时所提供的个人信息是真实、准确的，如因个人信息错误、失真而造成不良后果，责任由本人承担。
            </p>
            <p>
                <a style="color:#551A8B" href="http://www.moe.gov.cn/publicfiles/business/htmlfiles/moe/moe_621/201406/170438.html">附：中华人民共和国教育部《国家教育考试违规处理办法》
                </a>
            </p>
        </div>
        <div class="sure-btn">
        	<mt-button @click="gotoBM" type="primary" size="large">我自愿作出以上承诺并遵守</mt-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
//import {
//    Header,
//    Button,
//} from 'mint-ui';
//Vue.component(Header.name, Header);
//Vue.component(Button.name, Button);
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
    methods: {
    	gotoBM(){
    		var va=window.location.href;
    		// yksapp.setKeyValueAndClean('commitment_read_'+yksapp_user.getUserId(),1,true);
    		this.$router.push({path:"/signEntrance"})
    		// yksapp.goPageWithParams('webPageNoHeader', va + 'signUp');
    	}
    }
}
</script>
<style scoped>
	.commitment{position:fixed;top:0;left:0;right:0;bottom:0;}
	.commitment .sure-btn{position:absolute;bottom:0;left:0;right:0;background:#fff;height:1.2rem;display:flex;align-items: center;padding:0 .2rem;z-index:888;}
	#iframepaged{height:calc(100% - 2rem);margin-top:.8rem;background: #fff;border-bottom: 1px solid #ddd;padding:.2rem;box-sizing: border-box;}
    .body-content{height:calc(100% - 2rem);overflow: auto;font-size:.25rem;}
    .body-content p{margin:.2rem 0;}
</style>
