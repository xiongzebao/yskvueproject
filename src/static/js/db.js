var regularMatch = {
    //是否为空字符串
    empty: function (str, len) {
        if (len) {
            len--;
        } else {
            len = 0
        };
        try {
            if (typeof str != 'string') {
                return true;
            }
            if (str.replace(/(^\s*)|(\s*$)/g, "")) {
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }

    },
	/*匹配中文姓名,符合返回true*/
	ChineseName:function(value){
		try{
			var reg=/^[\u4e00-\u9fa5]+([\u4e00-\u9fa5]|·)*[\u4e00-\u9fa5]+$/;
			if (reg.test(value)) {
                return true;
            }
            return false;
		}catch(e){
			return false;
		}
	},
	
    /*匹配数字和字母,为数字和字母返回true*/
    worldNumber:function(value){
        try {
            var reg = /^[a-zA-Z0-9]+$/;
            if (reg.test(value)) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    },
    /*返回去除空格的值*/
    trim:function(text){
        var  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        return text == null ? "" : ( text + "" ).replace( rtrim, "" );  
    },
	/*匹配是否为数字且前后空格去掉*/
	trimIntval:function(text){
		var value=this.trim(text);
		return this.noSpaceintval(value);
	},
    //国内手机号码
    isPhone: function (phone) {
        try {
            var reg = /^1\d{10}$/;
            //var reg=/^((1[0-9]{2})+\d{8})$/i;
            if (!reg.test(phone)) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    //是否为邮箱
    isEmail: function (email) {
        try {
            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!reg.test(email)) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    //是否为数字
    intval: function (str) {
        try {
            if (!isNaN(str)) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },
    /*全为数字不包含空格*/
    noSpaceintval:function(str){
        try {
            var reg = /^\d*$/;
            if (!reg.test(str)) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    /*匹配年月日日期格式*/
    birth: function (birth) {
        try {
            var reg = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;
            if (!reg.test(birth)) {
                return false;
            }
             return true;
            
        } catch (e) {
            return false;
        }
    },
    /*匹配最多一位小数的数字*/
    IntegerDecimal:function(value){
        try {
            var reg = /^\d+(\.\d{1})?$/;
            if (!reg.test(value)) {
                return false;
            }
             return true;
            
        } catch (e) {
            return false;
        }
    },
    /*匹配两位小数*/
    twoLengthdecimal:function(value){
        try {
            var reg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
            if (!reg.test(value)) {
                return false;
            }
             return true;
            
        } catch (e) {
            return false;
        }
    },
    /*匹配邮政编码*/
    Postcode:function(value){
         try {
            var reg = /^[0-9]\d{5}$/;
            if (!reg.test(value)) {
                return false;
            }
             return true;
            
        } catch (e) {
            return false;
        }
     },
    /*匹配身份证号*/
    shenFenZH:function(value){
        try {
            var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            if (!reg.test(value)) {
                return false;
            }
             return true;
            
        } catch (e) {
            return false;
        }
        
    },
    /*检测是否有表情 返回true则表示字符串中包含emoji字符*/
    emojiUtils:function(value){
        var emojsource = String(value); 
        for (var  i = 0,len=emojsource.length; i < len; i++) {
            var codePoint = emojsource.charCodeAt(i);
            if (!(this.isEmojiCharacter(codePoint))) { /*如果不能匹配,则该字符是Emoji表情*/
                return true;
            }
        }
        return false;
    },
    /*检测是否是表情*/
    isEmojiCharacter:function(codePoint) {
        return (codePoint == 0x0) || (codePoint == 0x9) || (codePoint == 0xA) ||
                (codePoint == 0xD) || ((codePoint >= 0x20) && (codePoint <= 0xD7FF)) ||
                ((codePoint >= 0xE000) && (codePoint <= 0xFFFD)) || ((codePoint >= 0x10000)
                && (codePoint <= 0x10FFFF));
    }


}