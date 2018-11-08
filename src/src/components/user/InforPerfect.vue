<template>
	<div id="inforPerfect">
         <keep-alive>
                 <router-view></router-view>
         </keep-alive>
	</div>
</template>

<script>
	import Vue from 'vue'
    import VueBus from 'vue-bus';
    Vue.use(VueBus);
	export default {
		name: 'inforPerfect',
		data() {
			return {
			}
		},
        watch:{
			$route(to,from,a){
                /*信息确认*/
                if(to.path.indexOf('InfoConfirm')!=-1){
                    /*联考文件组件重新渲染*/
                    this.$bus.emit('provinceUnion');
					return ;
				};
			}
		}
	}
</script>

<style>
	/*mint-ui样式更改*/
    #inforPerfect .mint-cell-allow-right:after{
            border-color:#42cefc;
    }
	#inforPerfect .mint-popup-bottom{
		width: 100%;
	}
	#inforPerfect textarea{
		word-break: break-all;
	}
	/*进度条样式*/
    #inforPerfect .introRange .intro-range{
        padding: 0 1rem;
    }
   #inforPerfect .introRange .intro-title{
        padding: 0 0.6rem;
    }
     #inforPerfect .introRange .intro-range,.introRange .intro-title{
        display: flex;
        align-items: center;
    }
     #inforPerfect .introRange .intro-range-round{
        width:0.2rem;
        height: 0.2rem;
        background-color: #999;
        flex-shrink: 0;
        border-radius: 100%;
    }
    #inforPerfect .introRange .intro-range-round-fill{
        background-color: #42cefc;
    }
    #inforPerfect  .introRange .intro-title-line{
        flex-grow: 1;
       
    }
     #inforPerfect .introRange .intro-title-note{
        height: 0.4rem;
        line-height: 0.4rem;
        flex-shrink: 0;
         border-bottom-color: #fff;
         border-bottom-width: 3px;
         border-bottom-style: solid;
    }
    #inforPerfect .introRange .intro-title-note-router{
         border-bottom-color: #42cefc;
    }
     #inforPerfect .introRange .intro-range-line{
        height: 1px;
        background-color: #999;
        flex-grow: 1;
    }
    #inforPerfect .introRange .intro-range-line-fill{
         background-color: #42cefc;
    }
	#inforPerfect  .noteInfor {
		background: #fff;
		font-size: 0.28rem;
	}
	
	#inforPerfect  .noteInfor ul li {
		height: 0.6rem;
		padding: 0 10px;
		box-sizing: border-box;
		overflow: hidden;
        display: flex;
        align-items: center;
    }
	
	#inforPerfect  .noteInfor ul li .iconfont {
		font-size: 0.25rem;
		padding-right: 8px;
        color:#42cefc;
	}
	#inforPerfect .special {
		color: #ff9f37
	}
	
	/*弹出框设置*/
    
	.mint-popup.Inforequire {
		width: 95%;
		border-radius: 8px;
		padding: 10px;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		font-size: 0.25rem;
		top: 1rem;
		right: 10px;
		box-sizing: border-box;
	}
	
	.mint-popup.Inforequire:before {
		display: inline-block;
		width: 0;
		height: 0;
		border: solid transparent;
		border-width: 10px;
		border-bottom-color: #fff;
		content: "";
		position: absolute;
		top: -20px;
		right: 10px;
	}
	
	.mint-popup.Inforequire h1 {
		font-weight: 700;
		font-size: 0.3rem;
		padding-bottom: 0.4rem;
	}
	
	.mint-popup.Inforequire p {
		line-height: 0.4rem;
	}  
    #inforPerfect{
        width:100%;
        height: 100%;
    }
    #inforPerfect .mint-popup .mint-cell-title {
         width:100%;
    }
    /*弹出框公共组件*/
	#inforPerfect .publicPopup{
		width:80%;
		max-height: 6rem;
        display: flex;
        flex-direction: column;
		
	}
	#inforPerfect .btnEnsure .mint-button--default{
		background: #dddddd;
	}
	#inforPerfect .publicPopup .mint-radiolist-title{
		display: none;
		
	}
	#inforPerfect .publicPopup  .mint-radiolist{
				flex-grow: 1;
                -webkit-overflow-scrolling: touch;
				overflow-y: auto;
	}
    #inforPerfect .publicPopup .mint-cell-title{
        flex:none;
    }
	#inforPerfect .publicPopup .popupTitle{
		font-size:0.3rem;
		height: 0.8rem;
		line-height: 0.8rem;
		color: #0c0c0c;
		background: #eeeeee;
		text-align: center;
        flex-shrink: 0;
        font-weight: bold;
	}
	#inforPerfect .publicPopup  .btnEnsure {
		background: #EEEEEE;
		height: 1.2rem;
		padding:0.2rem;
		box-sizing: border-box;
        flex-shrink: 0;
	}
	 #inforPerfect .publicPopup  .btnEnsure .btn{
  	    width: 100%;
		height: 0.8rem;
		text-align: center;
		line-height: 0.8rem;
		color: #fff;
		font-size:0.3rem;
		letter-spacing: 2px;
  }
	#inforPerfect .publicPopup .btnEnsure .btn-ensure {
		background: #42cefc;
	}
	#inforPerfect .publicPopup .btnEnsure .btn-disEnsure{
		background: #dddddd;
	}
	 /*单选框样式*/
    #inforPerfect .infor-ui-list {
        flex-grow: 1;
    }
	#inforPerfect .infor-ui-list .mint-cell{
		min-height: 0.45rem;
        width:50%;
		float: left;
	}
	#inforPerfect .infor-ui-list:after{
		content: "";
		display: block;
		height: 0;
		clear: both;
	}
     #inforPerfect .mint-cell-value .mint-radiolist-title{
        display: none;
    }
    
    #inforPerfect #baseinforFill .mint-cell-value .mint-checklist .mint-cell{
        width: 100%;
    }
    #inforPerfect .mint-cell-value .mint-cell-wrapper,#inforPerfect .mint-cell-value .mint-radiolist-label,#inforPerfect .mint-cell-value .mint-checklist-label {
        padding: 0 ;
    }
    #inforPerfect  .mint-cell-wrapper, #inforPerfect  .mint-cell:last-child {
        background-image: none;   
    }
    #inforPerfect  .mint-cell{
       border-bottom: 1px solid #f4f4f4;
    }
    #inforPerfect  .mint-cell .mint-cell{
        border-bottom: 0;
    }
	#inforPerfect .mint-cell-value{
		flex-grow: 1;
	}
	#inforPerfect .mint-header .mint-button{
		font-size: 0.35rem;
	} 
</style>