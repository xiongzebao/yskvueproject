<template>
	<div id="nationChose">
	    <div class='nation-header'>
	        <mt-header  title="民族选择">
                <div slot="left" @click="nationBack">
                    <mt-button icon="back"></mt-button>
                </div>
		    </mt-header>
		    <input type="text" v-model="searchValue" placeholder="请输入关键词" maxlength="6" class='searchResult-nation'>
	    </div>
		
		
		<div class="searchResult">
           <template v-for='list in nationFilter'>
                <mt-cell  is-link @click.native="chooseNationlWay({value:list.value})">
                    <span>{{list.value}}</span>
                </mt-cell>
            </template>
				
			
		</div>
			
    </div>
</template>

<script>
	import Vue from 'vue'
	import { Button } from 'mint-ui';
    import { Search } from 'mint-ui';
	import { Cell } from 'mint-ui';
	import VueBus from 'vue-bus';
	
	Vue.component(Cell.name, Cell);
	Vue.component(Button.name, Button);
    Vue.component(Search.name, Search);
	Vue.use(VueBus);
	export default {
		name: 'nationChose',
		data() {
			return {
                searchValue:'',
                nationFilter:[],
				nationList: [
				    {
						value: "汉族",
						label: "汉族"
					},
					{
						value: "蒙古族",
						label: "蒙古族"
					},
					{
						value: "回族",
						label: "回族"
					},
					{
						value: "藏族",
						label: "藏族"
					},
					{
						value: "维吾尔族",
						label: "维吾尔族"
					},
					{
						value: "苗族",
						label: "苗族"
					},
					{
						value: "彝族",
						label: "彝族"
					},
					{
						value: "壮族",
						label: "壮族"
					},
					{
						value: "布依族",
						label: "布依族"
					},
					{
						value: "朝鲜族",
						label: "朝鲜族"
					},
					{
						value: "满族",
						label: "满族"
					},
					{
						value: "侗族",
						label: "侗族"
					},
					{
						value: "瑶族",
						label: "瑶族"
					},
					{
						value: "白族",
						label: "白族"
					},
					{
						value: "土家族",
						label: "土家族"
					},
					{
						value: "哈尼族",
						label: "哈尼族"
					},
					{
						value: "哈萨克族",
						label: "哈萨克族"
					},
					{
						value: "傣族",
						label: "傣族"
					},
					{
						value: "黎族",
						label: "黎族"
					},
					{
						value: "僳僳族",
						label: "僳僳族"
					},
					{
						value: "佤族",
						label: "佤族"
					},
					{
						value: "畲族",
						label: "畲族"
					},
					{
						value: "高山族",
						label: "高山族"
					},
					{
						value: "拉祜族",
						label: "拉祜族"
					},
					{
						value: "水族",
						label: "水族"
					},
					{
						value: "东乡族",
						label: "东乡族"
					},
					{
						value: "纳西族",
						label: "纳西族"
					},
					{
						value: "景颇族",
						label: "景颇族"
					},
					{
						value: "柯尔克孜族",
						label: "柯尔克孜族"
					},
					{
						value: "土族",
						label: "土族"
					},
					{
						value: "达斡尔族",
						label: "达斡尔族"
					},
					{
						value: "仫佬族",
						label: "仫佬族"
					},
					{
						value: "羌族",
						label: "羌族"
					},
					{
						value: "布朗族",
						label: "布朗族"
					},
					{
						value: "撒拉族",
						label: "撒拉族"
					},
					{
						value: "毛难族",
						label: "毛难族"
					},
					{
						value: "仡佬族",
						label: "仡佬族"
					},
					{
						value: "锡伯族",
						label: "锡伯族"
					},
					{
						value: "阿昌族",
						label: "阿昌族"
					},
					{
						value: "普米族",
						label: "普米族"
					},
					{
						value: "塔吉克族",
						label: "塔吉克族"
					},
					{
						value: "怒族",
						label: "怒族"
					},
					{
						value: "乌孜别克族",
						label: "乌孜别克族"
					},
					{
						value: "俄罗斯族",
						label: "俄罗斯族"
					},
					{
						value: "鄂温克族",
						label: "鄂温克族"
					},
					{
						value: "崩龙族",
						label: "崩龙族"
					},
					{
						value: "保安族",
						label: "保安族"
					},
					{
						value: "裕固族",
						label: "裕固族"
					},
					{
						value: "京族",
						label: "京族"
					},
					{
						value: "塔塔尔族",
						label: "塔塔尔族"
					},
					{
						value: "独龙族",
						label: "独龙族"
					},
					{
						value: "鄂伦春族",
						label: "鄂伦春族"
					},
					{
						value: "赫哲族",
						label: "赫哲族"
					},
					{
						value: "门巴族",
						label: "门巴族"
					},
					{
						value: "珞巴族",
						label: "珞巴族"
					},
					{
						value: "基诺族",
						label: "基诺族"
					},
					{
						value: "其他",
						label: "其他"
					},
					{
						value: "外国血统",
						label: "外国血统"
					}
					
				]

			}

		},
        mounted(){
           this.nationFilter=this.nationList; 
        },
        activated(){
           this.searchValue=''; 
           if(this.$route.params.text){
               this.choosedValue=this.$route.params.text;
           }
        },
		methods:{
            nationBack(){
                this.$router.go(-1);
            },
			chooseNationlWay(nationObj){
                this.$bus.emit("nationChoose",nationObj);
                this.$router.go(-1);
            }
		},
        watch:{
            searchValue:function(search){
                if(search){
                     let nationArr=[];
                     for(var index in this.nationList){
                        if(this.nationList[index].value.indexOf(search)!=-1){
                            nationArr.push({value:this.nationList[index].value,label:this.nationList[index].label});
                        }
                     }
                   this.nationFilter=nationArr;
                  console.log(nationArr)
                }else{
                   this.nationFilter=this.nationList; 
                }                
                
            }
        }
	}
</script>

<style>
    #nationChose{
        height: 100%;
    }
    #nationChose .nation-header{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        z-index:10;
        background: #f4f4f4;
    }
    #nationChose .searchResult{
        padding-top: 1.8rem;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
    }
    #inforPerfect #nationChose .searchResult-nation{
        font-size:0.27rem;
        width:80%;
        padding:0.2rem 0;
        margin: 0.1rem auto;
        text-indent: 8px;
        border-radius: 8px;
        
    }
    /*cell样式 title隐藏*/
    #nationChose .mint-cell-title{
       width:0;
    }
    #nationChose .mint-cell{
        min-height: 0.8rem;
    }
</style>