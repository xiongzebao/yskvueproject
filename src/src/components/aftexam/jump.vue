<template>
	<div id='jump'>
		<mt-header fixed :title="title">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
	   </mt-header>
<iframe :src="url" id="iframepage" frameborder="0"  marginheight="0" marginwidth="0"  height="100%" width="100%"></iframe>
	</div>
</template>

<script>
	export default{
		name:'jump',
		created(){
			this.url=this.$route.query.url;
			this.title=this.$route.query.title;
			
		},
		mounted(){
			var ifm= document.getElementById("iframepage");   
            var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;   
			if(ifm != null && subWeb != null) {
			   ifm.height = subWeb.body.scrollHeight;
			   ifm.width = subWeb.body.scrollWidth;
			}
		},
		data(){
			return {
				url:'',
				title:''
			}
	}
	}
</script>

<style scoped>
	body{background:#fff;}
	#jump{
		width:100%;
		height: 100%;
	}
	#iframepage{
		margin-top:0.7rem;
	}
</style>