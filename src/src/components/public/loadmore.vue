<template>
	<scroller style="top:0.8rem" :on-refresh="refresh"  ref="my_scroller" class="my-scroller"  refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
     <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
	    <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
		<!--页面的省份和姓名-->
		<slot name='nameProvince' class='nameProvince'>

		</slot>
		<!--数据处理部分-->
		<slot name='content'>
		</slot>
		<!--数据提示部分-->
		<slot name='datalength' class='date-no-more'>
		</slot>
		<svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
	</scroller>
</template>
<script>
	import Vue from 'vue';
	import VueScroller from 'vue-scroller'
	import VueBus from 'vue-bus';
	Vue.use(VueBus);
	Vue.use(VueScroller);
	/*this方法中不能调用  提出来*/
	export default {
		name: 'my-scroller',
		data() {
			return {};
		},
		methods: {
			refresh(done) {
				/*this指向获取不到方法*/
				var that=this;
				setTimeout(function() {
					that.$bus.emit('pulldown');
					done();
					
				}, 1500)

		}
		},
		mounted() {

		}

	};
</script>
<style>
    #dateNoteNoMore{
		
		width:100%;
		text-align: center;
		height:0.7rem;
		line-height: 0.7rem;
		background: #fff;
		font-size:0.25rem;
		margin-top:2rem;
	}

    
</style>