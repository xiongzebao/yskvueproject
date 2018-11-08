<template>
	<div id="ExamineeSkills">
		<mt-header fixed title="考生特长">
			<div slot="left"  v-tap="{methods:handleClick,para:'3'}">
				<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="skill-content">
			<mt-checklist
			  v-model="value"
			  :options="['美术', '音乐', '舞蹈','体育']">
			</mt-checklist>
			<mt-field class="others" label="其他:" placeholder="没有则不用填写" v-model="otherVal">
				
			</mt-field>
			<mt-button  v-tap="{methods:handleClick,para:'1'}" type="primary" size="large">提交</mt-button>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Cell } from 'mint-ui';
	import { Checklist } from 'mint-ui';

	Vue.component(Checklist.name, Checklist);
	Vue.component(Cell.name, Cell);
	export default {
		name:'ExamSkills',
		data(){
			return {
				value:[],
				otherVal:'',
                arrSkill:[]
			}
		},
        activated(){
            let forteArr=this.$route.query.forteArr;
            if(forteArr.length==0){
                this.value=[];
                this.otherVal='';
                return ;
            }
            let forteArrinit=[];
            for(var index in forteArr){
                if(forteArr[index].indexOf('美术')!=-1){
                    forteArrinit.push(forteArr[index])
                }else if(forteArr[index].indexOf('音乐')!=-1){
                    forteArrinit.push(forteArr[index])
                }else if(forteArr[index].indexOf('舞蹈')!=-1){
                     forteArrinit.push(forteArr[index])
                }else if(forteArr[index].indexOf('体育')!=-1){
                     forteArrinit.push(forteArr[index])
                }else{
                    this.otherVal=forteArr[index];
                }
            }
           this.value=forteArrinit;
        },
		methods:{
			handleClick(value){
                /*3代表返回,1代表提交*/
				let type=value.para;
                if(type=='3'){
                  this.$router.push({path:'/Inforperfect/ExtendInforPefect',query:{back:'back'}});
                    return ;
                }
                /*其他需单独返回*/
                this.arrSkill=[];
                for(let i=0,len=this.value.length;i<len;i++){
                     this.arrSkill[i]=this.value[i]
                }
                let obj={
                    forteArr:this.arrSkill,
                    others:this.otherVal
                }
               
                if (type=='1') {
                    this.$bus.emit('fortesChoose',obj);
                     this.$router.push({path:'/Inforperfect/ExtendInforPefect',query:{back:'back'}});
                    return ;
                }
			}
		}
	}
</script>

<style>
#ExamineeSkills{
	position: fixed;
	top: 0;
	left:0;
	right: 0;
	bottom: 0;
	z-index: 9999999;
	background: #f4f4f4;
}
#ExamineeSkills .skill-content{
	width: 100%;
	height: 100%;
	margin-top: 0.9rem;
	background: #fff;
}
#ExamineeSkills .skill-content .others{
	border-bottom: 1px solid #d9d9d9;
}
    #ExamineeSkills .skill-content .others .mint-cell-title{
        flex: none;
    }
#ExamineeSkills .mint-cell-wrapper{
	margin: 0 18px;
	padding: 0;
} 
#ExamineeSkills .mint-button--large{
	width: 5.74rem;
    height: 0.85rem;
    margin: 0.46rem auto;
    background: #ff9f37;
}
#inforPerfect #ExamineeSkills .mint-field .mint-cell-title{
	width: 1.2rem;
}
#inforPerfect #ExamineeSkills .mint-cell-title {
    width:100%;
}
</style>