"use strict";

window.ctx = '';

function getData(url, callback, data, requesttype, dataType) {
	// var dataType = dataType ? dataType : 'json';
	// var requesttype = requesttype ? requesttype:'GET';
	if (!dataType) {
		dataType = "json";
	}
	if (!requesttype) {
		requesttype = "GET";
	}

console.log("99998493225555555555555555555555555")
	$.ajax({
		type : requesttype,
		url : url,
		data : data,
		timeout : 10000,
		dataType : dataType,
		beforeSend : function(request) {
			console.log("beforeSend");
			request.setRequestHeader("udid", $('#udid').val());
			$('.loading').show();
		},
		success : function(json) {
			console.log("test --------------------------");
			console.log(json);
			var data = {};
			if (typeof json == "string") {
				data = JSON.parse(json);

			} else if (typeof json == "object") {
				data = json;
			}
			$('.loading').hide();

			if (!(data.success)) {
				
				$('.certain').show();
				$('.a-content').html(data.message);
				$('.qr-btn').click(function() {
					$('.certain').hide();
				})
				return;
			}
			callback(data);
		},

		error : function(xhr, errorType, error) {
				console.log(error);
			alert("请求超时");
			
			$('.loading').hide();
		}
	});
}

var DataLoader = {

	getSchool : function(callback, data) {
		var url = ctx + "/auth/util/wishCollege.htm";
		getData(url, callback, data, 'POST');
	},

	getExam : function(callback, data) {
		var url = ctx + "/auth/student/doQueryExam.htm";
		getData(url, callback, data);
	},

	getWishInfo : function(callback, data) {
		var url = ctx + "/auth/student/doWishInfo.htm";
		getData(url, callback, data, "POST");
	},

 	getTest : function(callback, data) {
		var url = ctx + "http://hulaquan.51bm.net.cn/api/m/base/page/applyPage.htm";
		getData(url, callback, data, "POST");
	},


};


DataLoader.getTest(function(data){
	console.log("成功回调");
	console.log(data.message);
},{});

