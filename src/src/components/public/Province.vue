<template>
	<div id="provinceChose">
		<mt-header fixed title="省份选择">
			<div slot="left"  v-tap="{methods:routerBack}">
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="province-local">
            <template v-for='list in provinceData'>
                   <template v-if='list.areaLimit==1'>
                   		<mt-cell  is-link
                       v-tap="{methods:chooseProvincelWay,params:{provinId:list.shengFenHao,proviname:list.shengFenMing,lianKaoHCD:list.lianKaoHCD,lianKaoHQZ:list.lianKaoHQZ,areaLimit:list.areaLimit}}">
                        <span>{{list.shengFenMing}}</span>
                    	</mt-cell>
                   </template>
                    <template v-else>
                    	<mt-cell  is-link
                       v-tap="{methods:chooseBacklWay,params:{provinId:list.shengFenHao,proviname:list.shengFenMing,lianKaoHCD:list.lianKaoHCD,lianKaoHQZ:list.lianKaoHQZ,areaLimit:list.areaLimit}}">
                        <span>{{list.shengFenMing}}</span>
                    	</mt-cell>
                    </template>
            </template>
		    <!---->
		</div>
		
		<loading v-if='loadingFlag'></loading>	
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Button } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import { Toast } from 'mint-ui';
    import loading from './Loading';
	Vue.component(Cell.name, Cell);
	Vue.component(Button.name, Button);
	export default {
		name: 'provinceChose',
		data() {
			return {
                provinceData:[],/*省份数据*/
                loadingFlag:true/*动画标志*/
			}

		},
        mounted(){
            var that = this;
				ajaxMethod.doAjax("base,/api/m/auth/province/query.htm",{}, function(database) {
					if(database.success) {
						if(database.datas) {
                        if(that.type){
                            for(var index in that.provinceList){
                                
                                if(that.provinceList[index].label.indexOf(that.$route.params.provin.text)!=-1){
                                    that.choosedValue=that.provinceList[index].value;
                                }
                            }
                        }
                            that.provinceData=database.datas.list;  
                             console.log(that.provinceData)
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
        },
        activated(){
				
        },
		computed: {
			
		},
		components:{
            loading
		},
		methods:{
            /*返回*/
            routerBack(){
                this.$router.go(-1);
            },
			chooseBacklWay(value){
				let dataobj=value.params;
                /*返回省份和地区*/
                let backData={};
                backData.province=dataobj;
                backData.college={};
                
                this.$bus.emit('provinceChoose',backData);
                this.$router.go(-1);
			},
            chooseProvincelWay(value){
				let dataobj=value.params;
                this.$router.push({path:'/Inforperfect/CollegeZone',query:{provion:JSON.stringify(dataobj)}})
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
   #inforPerfect  #provinceChose .mint-cell-title{
       width:0;
    }
    #provinceChose .mint-cell{
        min-height: 0.8rem;
    }
    
    
    
    
    
    
    
    
</style>