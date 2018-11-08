<template>
  <div id="app">
   	
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
	width: 100%;
	height:100%;
}
	
/*mint-ui--reset*/
.mint-field.is-textarea .mint-cell-wrapper{
	align-items:flex-start;
}
	.mint-ui-commit {
		width: 85%;
		background-color: #169bd5;
		color: #fff;
		padding: 0.2rem 0;
		height: auto;
		margin: 20px auto;
		border: 0;
		font-size: 0.34rem;
		border-radius: 4px;
		display: block;
	}
</style>
