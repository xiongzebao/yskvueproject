<template>
  <div id='smoothScroll'>
    <scroller ref="my_scroller">
      		<slot name='content' >
								<ul>
								
								</ul>
		       </slot>
      		
    </scroller>
  </div>
</template>
<style>
 
</style>
<script>
	
  export default {
  	name:'smoothScroll',
    data () {
      return {
        x: 0,
        y: 0,
        timer: 0
      }
    },

    mounted() {
     

      this.timer = setInterval(() => {
        let {left, top} = this.$refs.my_scroller.getPosition()

        this.x = left
        this.y = top
      }, 50)
    },

    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>
<style>
	/*高度自己需要修改  ._v-container样式top属性修改即可*/
	#smoothScroll{
		width:100%;	
		height: 100%;
        position: relative;
	}
</style>
