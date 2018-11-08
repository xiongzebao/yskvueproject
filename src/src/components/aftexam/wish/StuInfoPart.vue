<template>
	<div id = "stuinfopart">
		
		<div class="label-item"><span>考生信息</span></div>
			<div class="content">
			    <section  class="content-item"> 
			    <label  class="half"><span class="value-item-span key-item" >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>  <span class="value-item-span"> {{student.kaoShengXM}}</span>  </label>
			    <label  ><span class="key-item short gender-show">性&nbsp;&nbsp;&nbsp;别:</span> <span class="value-item-span" id="sex">{{student.xingBie}}</span> </label>
			    </section>


			    <section class="content-item">
					<span class="key-item short">身份证号:</span>
			    	<span class="value-item-span" id="idNo"> {{student.shenFenZH}}</span>
				</section> 

			    <section class="content-item f-fixed"> 
			    	<label  class="half" >
				    	<span  class="key-item">省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
				    	<span class="value-item-span">{{student.gaoKaoSF}}</span>
			    	</label>

			    	<label    >
				    	<span class="key-item" >考生号:</span>
				    	<span class="value-item-span">{{student.kaoShengHao}}</span> 
			    	</label>
			    </section> 

			    <section>
			       <div class="content-item" id="canbaokao"> <div class="key-item">可报专业:</div></div> 
			       <div class="content-item" id="qualified"></div>
			     </section>

		    </div>	
	</div>

</template>


<script type="text/javascript">

	export default{
		props:["item"],

		beforeCreate(){
		
		},

		mounted(){
		 
			this.myitem = this.item.datas;
            this.student = this.myitem.student;
            this.showCanBaoProf();
		},

		data(){
			return{
				myitem:"",
				student:""
			}
		},

		methods:{
			showCanBaoProf(){
					//就是datas里的数据
					if(this.myitem.examCtrl.schoolId==10047){
						$('.kebaoprof').html("合格专业:");
					}
					var profList = this.myitem.profList;
					var noProfList = this.myitem.noProfList;
					var isShowSegment = this.myitem.isShowSegment;
					var schoolID = this.myitem.examCtrl.schoolId;
					var examID = this.myitem.examCtrl.examId;
					if (!!profList && profList.length > 0) {
						let $qualified = $("#qualified");
						$qualified.html("");
						var html = "";
						$.each(profList, function(index, data) {
							var itemHtml="<div class='content-item' style='text-indent:0.1rem'>";
							itemHtml += "<span class='content-item' style=' dispaly:inline-block'>"+data.zhuanYeMC;
							
							// 川美硬编码
							if (isShowSegment){
								
								var limit = data.wishAreaLimitDO;
								if (limit && limit.planRecNum) {
									itemHtml += "&nbsp;计划招生数:" + limit.planRecNum;
								}
								if (limit && limit.artsRecNum) {
									itemHtml += "&nbsp;文科招生数:" + limit.artsRecNum;
								}
								if (limit && limit.scienRecNum) {
									itemHtml += "&nbsp;理科招生数:" + limit.scienRecNum;
								}
								
								if(data.showSegment){
									//http://aftexam.51bm.net.cn/auth/util/common/print/h5/segmentPrint.htm
									//this.url=this.protocol+this.system+this.domain+this.path;
									ajaxMethod.judgmentDomain();
									let h = ajaxMethod.protocol+'aftexam'+ajaxMethod.domain

								    h += "/auth/util/common/print/h5/segmentPrint.htm";

									h += "?schoolId=" + schoolID;
									h += "&examId=" + examID;
									h += "&profId=" + data.zhuanYeID;

									// if(window.yksapp_user){
									// 		h += "&ticket="+yksapp_user.getTicket();
									// }
								
									itemHtml += "&nbsp;&nbsp;<a href='" + h + "' target='_blank' class='showSegment'>点击查看一分段表</a>";
								}
							}
							itemHtml+="</div>";
							html += itemHtml;
							itemHtml="";
						});
						$.each(noProfList, function(index, data) {
							html += "<div style='text-indent:0.1rem'>"+data.zhuanYeMC + '&nbsp;&nbsp;<b style="coloe:red;">[所在省份无招生计划]</b></div>';
						});
						
						$qualified.html(html);
					}
			}

		}


	}


</script>

<style   >
	#stuinfopart .half{
		display: inline-block;
		width: 40%;
	}

	 #stuinfopart .content{
		margin-left: 0.5rem;
		font-size: 0.25rem;
		margin-top: 0.2rem;
		box-sizing: border-box;

	}
	#stuinfopart .content-item{
		margin-top: 0.1rem;
	}

	#stuinfopart .label-item{
      font-size: 0.3rem;
   }
  #stuinfopart .key-item {
      font-size: 0.25rem;
        font-weight:600;
   }
   #stuinfopart  .showSegment{
   		color: #00f;

   }
</style>