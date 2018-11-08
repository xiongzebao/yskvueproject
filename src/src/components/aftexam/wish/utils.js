

var utils={
  
  	setKeyValue:function(key,value){
  		var strdata = JSON.stringify(value);
          if(typeof(window.yksapp)!="undefined"){
                  window.yksapp.setKeyValue(key, strdata);
                }else{
                    window.localStorage.setItem(key,strdata);
                }
  	},
  	getValueByKey:function(key){
  		var strdata="";
  		if(typeof(window.yksapp)!="undefined"){
                 strdata= window.yksapp.getValueByKey(key);
           }else{
                  strdata = window.localStorage.getItem(key);
           }
           return JSON.parse(strdata);
  	},

    isEmptyObject:function(obj){
         for(var key in obj){
             return false;
          };
          return true;
    }


}


export default utils