(function flexible (window, document) {
  var docEl = document.documentElement
  function setBodyFontSize () {
	var clientWidth = docEl.clientWidth;
       if (clientWidth){
			if(clientWidth>=750){
                   docEl.style.fontSize = '100px';
             }else{
                   docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
             }	
	  }else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();
  window.addEventListener('resize',function(){
  		setBodyFontSize();
  })
}(window, document))