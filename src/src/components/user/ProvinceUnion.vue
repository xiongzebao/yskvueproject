<template>
    <div id="ProvinUnion">
        <mt-header class='introHeader' title="联考文件说明">
			<div slot="left"  v-tap="{ methods : provinceunback }">
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
       <div class="noteContent" v-html='innerHtml'>
       
       </div>
       <div class='btn-submitWrap'  v-tap="{ methods : provinceunEnsure }">
           <mt-button  class='btn-submit'>我已阅读并确认提交</mt-button>
       </div>
       <Loading v-if='loadingFlag'></Loading>
    </div>
</template>
<script>
	import Vue from 'vue';
	import { Header } from 'mint-ui';
    import { Button } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import Loading from '../public/Loading'
    Vue.component(Button.name, Button);
    Vue.component(Header.name, Header);

	export default {
            name:'ProvinUnion',
            data(){
                return {
                    innerHtml:'',
                    loadingFlag:true//动画控制标志
                }
            },
            props:['province'],
            components:{
                Loading
            },
            mounted(){
            var data={
                shengFenHao:this.province
            };
            var that=this;
            ajaxMethod.doAjax("base,/api/m/auth/province/query_exam_paper.htm",data, function(database) {
				
                    if(database.success){
                        console.log(database)
                        if(database.datas.obj){
                               that.innerHtml=database.datas.obj
                           }else{
                                that.$bus.emit('provinceUnion');
                           }
                        }else{
                                Toast({
                                message: database.message,
                                position: 'middle',
                                duration: 5000
                            });
                        }
                    


                },function(){
                    that.loadingFlag=false;
                });
            },
            methods:{
                provinceunback(){
                    
                    this.$router.go(-1);
                },
                provinceunEnsure(){
                   this.$bus.emit('provinceUnion');
                }
                
            }
    }
</script>
<style>
    #ProvinUnion{
        position: fixed;
        width:100%;
        top:0;
        left:0;
        z-index: 9999;
        background: #fff;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    #ProvinUnion .noteContent{
        flex-grow: 1;
        font-size:0.28rem;
        overflow-y: auto;
    }
    /*阅读提交样式*/
    #ProvinUnion .introHeader{
        flex-shrink: 0;
    }
    #ProvinUnion .btn-submitWrap{
        background:#fff;
        width:100%;
        flex-shrink: 0;
    }
    #ProvinUnion .btn-submitWrap .btn-submit{
        width:80%;
		height: 0.85rem;
		text-align: center;
		line-height: 0.85rem;
		background:#42cefc;
		color: #fff;
		margin: 0.2rem 10%;
		font-size:0.28rem;
        box-sizing: border-box;
    }
</style>