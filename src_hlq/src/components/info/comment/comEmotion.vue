<template>
    <div id='emotionSwiper'>
        <p v-html='commentEmotion'></p>
    </div>
</template>
<style>
</style>
<script>
    const emotionsData = require('./emotions.json');
    export default {
        name:'emotionSwiper',
        props:['commentnote','emotiondata'],
        data(){
            return {
                
                commentEmotion:''
            }
        },
        mounted(){
            /*解析*/
            this.analysis(this.commentnote,emotionsData.data)
        },
        methods:{
            analysis(obj,dataArr) {
                var value = String(obj||"");
                var arr = value.match(/\[.{1,3}\]/g);
                if(arr){
                    for(var i = 0; i < arr.length; i++) {
                        for(var j in dataArr){
                            if(arr[i] == dataArr[j].phrase){
                                var ex = '<img src="'+dataArr[j].icon+'">';
                                value=value.replace(arr[i],ex);
                                break;
                            }

                        }
                    }
                }
                this.commentEmotion=value;
            }           
        }
    }
</script>