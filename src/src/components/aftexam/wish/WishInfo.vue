
<template>
	
	<div id="wishinfo">
      <mt-header fixed title="志愿填报">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
       </mt-header>

     <div class="container">
  	 	 	<div class="label">学校选择</div>
        <div class="content">
    	   	<div class="line-item">
    	   		<span class="line-header">学&nbsp;&nbsp;校：</span>
    	   	  <div  class="select-query-input" @click="selSchool"> {{selSchoolValue}}</div>
    		  </div>
    	   	<div class="line-item">
    	   		<span class="line-header">考&nbsp;&nbsp;试：</span>
    	   		<div  class="select-query-input" @click="selExam"> {{selExamValue}}</div>
    	   	</div>
        </div>
  	   	
     
        <mt-button id="submit-query" type="primary"  size="large" @click.native = "commit" >查&nbsp;&nbsp;询</mt-button>

  	   	 
     </div>

     <div v-show="notice" class="notice"> 暂无需填报志愿信息 </div>

    <div class="prop">
       <mt-popup
    v-model="popupMajor"
    position="bottom"
   class="mint-pop-popupMajor"
    pop-transition='popup-fade'
    :closeOnClickModal="false"
    :showToolbar='false'>
      <mt-picker  :slots="chooseMajor" 
          :visibleItemCount="5"
         :itemHeight="50"
         @change="MajorValuesChange" 
         :showToolbar='true'>
        <span class="mint-datetime-action mint-datetime-cancel " @click="Cancle()">取消</span>
         <span class="mint-datetime-action mint-datetime-confirm" @click="Confirm()">确定</span>
       </mt-picker>
      </mt-popup>
    </div>

</div>
 
</template>

 
<script type="text/javascript">

  import Vue from 'vue'
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Button } from 'mint-ui';
  import { Picker } from 'mint-ui';
  import utils from './utils.js'
  // import './test.js'



  Vue.component(Picker.name, Picker);

export default {

	mounted(){
		console.log("mounted");
		let _this = this;
		ajaxMethod.doAjax("aftexam,/api/m/auth/vol/query_exam_new.htm",{},function(json){
				console.log(json);
 				_this.data = json.datas.list;
        _this.selSchoolValue = "请选择";
		});
	},

    data(){
    return {
      /*日程对话框相关属性*/
         chooseMajor:[{
                  flex: 1,
                  values: '' ,
                  className: 'slot1',
                  textAlign: 'center',
                  visibleItemCount:10,

              }],
            popupMajor:false,
            pickerValue:"",
            selSchoolValue:"",
            selExamValue:"",
            data:'',
            currentItem:"",
            mapSchool:"",
            mapExam:"",
            notice:false
           
      }
  },

  methods:{
  	
    selSchool(){
       this.currentItem = "selSchool";
       var schools = new Array();
       console.log(this.data.length);
       for (var i = 0;i<this.data.length;i++) {
       schools.push(this.data[i].schoolName);
       }
       this.chooseMajor[0].values = schools;
       this.popupMajor = true;
    },
    selExam(){
         if(this.selSchoolValue==""||this.selSchoolValue=="请选择"){
          Toast("请选择学校");
          return;
          }
        	this.currentItem = "selExam";
        	var _this = this;
        	$.each(this.data,function(index,item){
        		if(item.schoolName==_this.selSchoolValue){
        			var list  = new Array();
        			for (var i =  0; i < item.examList.length; i++) {
        				list.push(item.examList[i].kaoShiMC);
        			}
        			 _this.chooseMajor[0].values = list;
        		}
        	})
        	this.popupMajor = true;
      },
      Cancle(){
  	     this.popupMajor = false;
  	  },
	    Confirm(){
     		this.popupMajor = false;
	    },

	    commit(){
        if(this.selSchoolValue==""||this.selSchoolValue=="请选择"){
          Toast("请选择学校");
          return;
        }
        if(this.selExamValue==""||this.selExamValue=="请选择"){
          Toast("请选择考试");
          return;
        }
        this.commitAjax();
	    },

      commitAjax(){

           Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });

        var schoolID;
        var examID;
        var _this = this;
        console.log(this.data);
        for (var i =  0; i<this.data.length; i++) {
           if(this.data[i].schoolName==this.selSchoolValue){
            schoolID = this.data[i].schoolID;
            $.each(this.data[i].examList,function(index,item){
              if(item.kaoShiMC==_this.selExamValue){
                examID = item.kaoShiID;
              }
            });
           }
        }
        var p = {   
          "schoolID": schoolID, 
          "examID": examID,       
        } 
        console.log("-------------------p---------------------");
        console.log(p);
        utils.setKeyValue('schoolID',schoolID);
        utils.setKeyValue('examID', examID);

        //提交ajax模块
        ajaxMethod.doAjax("aftexam,/api/m/auth/vol/query.htm",p,function(data){

          //每次都弹出志愿须知
     
        if(data.datas.wishNote){
               MessageBox.alert('<div id="mymsgbox">'+data.datas.wishNote+'</div>','志愿填报须知').then(action => {
                ajaxMethod.doAjax("aftexam,/api/m/auth/vol/read_wish_notice.htm",null,function(data){
                   console.log("------------------返回read_wish_notice 成功----------------------");
                   console.log(data);
                });
              });
          }

        if(data.success==true){
              if(_this.isEmptyObject(data.datas)){
                 _this.notice = true; 
                  return;
              }
              var profList = data.datas.profList;
                  if (!profList || profList.length == 0) {
                    _this.notice = true;
                    return;
                  }
              utils.setKeyValue('wishinfo',data);
              _this.$router.push({path:'/WishInfoDetail'});
        }
        else{
           _this.notice = true; 
     
        }  
      },function(){Indicator.close()});

      },

	    MajorValuesChange(picker, values) {


     		if(this.currentItem=="selSchool"){
     			if(values[0]!=null){
     			this.selSchoolValue = values[0];
     			this.selExamValue = "请选择";
     			}

     		}else{
     			if(values[0]!=null){
     			  this.selExamValue = values[0];
     			}

     		}
     	},

      isEmptyObject(obj){
         for(var key in obj){
             return false;
          };
          return true;
      }


  },



}

</script>

<style type="text/css"  >
	
	@charset "UTF-8";

#wishinfo .container{
  margin-top: 1rem;
}
#wishinfo .container .label{
  color: #42cefc;
  position: relative;
  font-size: 0.3rem;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
}
#wishinfo .content{
  margin-left: 0.4rem;
  //margin-top: 0.05rem;
}
#wishinfo .notice{
  color: #f00;
  display: block;
  font-size: 0.3rem;
  margin-top: 0.3rem;
 /* margin:0 auto;*/
 text-align: center;
}


#wishinfo .line-item{
  height:0.7rem;
  font-size:0.35rem;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
}

 

#wishinfo .select-query-input{
  width: 70%;
  height: 0.6rem;
  border:1px solid;
  border-color: #42cefc; 
   appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
   background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
  display: flex;
  align-items: center;
  font-size: 0.25rem;
  padding-left: 0.2rem;
}

#wishinfo span.line-header{
  font-weight:600;
  font-size: 0.3rem;
}

#wishinfo #submit-query{
  width: 90%;
  height:0.75rem;
  line-height:0.75rem;
  display: block;
  background-color: #42cefc;
  color: #ffffff;
  font-size:0.28rem;
  border-radius:0.05rem;
  margin:0 auto;
  margin-top: 0.5rem;
}

#wishinfo .mint-datetime-action.mint-datetime-cancel
{
	font-size: 0.33rem;
}

#wishinfo .mint-datetime-action.mint-datetime-confirm{
	font-size: 0.33rem;
}

#wishinfo .prop.picker-toolbar{
	height: 1.5rem;
}

#wishinfo .prop .mint-popup-bottom{width:100%;}

#wishinfo .mint-pop-popupMajor{
  height: 60%;
  overflow:hidden; 
}

 #mymsgbox{
   
    max-height: 7.5rem;
  
    overflow-y: auto;

  }



</style>