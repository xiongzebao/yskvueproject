<template>
	<div id="provinceChose">
		<mt-header fixed title="省份选择">
			<div slot="left" @click='routerBack'>
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="province-local">
            <template v-for='list in provinceData'>
                    <mt-cell  is-link @click.native="chooseProvincelWay({provinId:list.zoneNo,proviname:list.zoneName})">
                        <span>{{list.zoneName}}</span>
                    </mt-cell>
            </template>
		    <!---->
		</div>
		
		<loading v-if='loadingFlag'></loading>	
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Toast } from 'mint-ui';
    import loading from './Loading';
    import VueBus from 'vue-bus';
	Vue.component(Cell.name, Cell);
    Vue.use(VueBus);
	export default {
		name: 'provinceChose',
		data() {
			return {
                provinceData:[],/*省份数据*/
                loadingFlag:true/*动画标志*/
			}

		},
        mounted(){
            this.fixdata();
        },
        activated(){
            this.fixdata();   
        },
		components:{
            loading
		},
		methods:{
            /*返回*/
            routerBack(){
                this.$router.go(-1);
            },
            chooseProvincelWay(dataobj){
                
                /*返回省份和地区*/
                let backData={};
                backData.province=this.provinceobj;
                backData.college=dataobj;
                
                this.$bus.emit('provinceChoose',backData);
                this.$router.push({path:'/Inforperfect/ExtendInforPefect'});
            },
            fixdata(){
                this.provinceobj=JSON.parse(this.$route.query.provion);/*获取省份对象*/
                let provinId=this.provinceobj.provinId;
                var data = {
                        paZoneNo:provinId
                    };
                var that = this;
                ajaxMethod.doAjax("base,/api/m/auth/province/query_zone.htm", data, function(database) {
                      if(database.success) {
                            if(database.datas) {
                                    that.provinceData=database.datas.list;
                                    /*console.log(that.provinceData)*/
                            }
                      } else {
                            Toast({
                              message: database.message,
                              position: 'middle',
                              duration: 5000
                            });
                      }
                    }, function() {
                      
                      that.loadingFlag = false
                    })
            }
		}
	}
</script>
<!---->
<style>
    #provinceChose{
        height: 100%;
        font-size: 0.27rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    #provinceChose .province-local{
        padding-top: 0.8rem;
    }
    /*cell样式 title隐藏*/
    #provinceChose .mint-cell-title{
       width:0;
    }
    #provinceChose .mint-cell{
        min-height: 0.8rem;
    }
    
    
    
    
    
    
    
    
</style>