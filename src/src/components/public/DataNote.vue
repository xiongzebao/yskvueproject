<template>
	<div id="dateNote">{{dataNoteMessage}}</div>
</template>

<script>
    export default {
        name:'dateNote',
        props:['dataNoteMessage'],
        data(){
            return {
                
            }
        }
        
    }
</script>

<style>
 /*无数据时提示样式*/
    #dateNote{
		width:100%;
		text-align: center;
		height:0.8rem;
		line-height: 0.8rem;
		background: #fff;
		font-size:0.3rem;
		margin-top:2rem;
        color: #a2a2a2;
		position: absolute;
	}	
</style>