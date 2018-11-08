"use strict";
/* <script>*/
		var documentEle=document.documentElement;
		documentEle.style.fontSize = documentEle.clientWidth / 6.4 + 'px';
		window.addEventListener('resize',function(){
		  documentEle.style.fontSize = documentEle.clientWidth / 6.4 + 'px';
		})
	/*</script>*/
/* Zepto 1.2.0 - zepto event ajax form ie touch - zeptojs.com/license */
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):e(t)}(this,function(t){var e=function(){function L(t){return null==t?String(t):S[j.call(t)]||"object"}function A(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function R(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function F(t){return"object"==L(t)}function k(t){return F(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function Z(t){var e=!!t&&"length"in t&&t.length,n=i.type(t);return"function"!=n&&!$(t)&&("array"==n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function z(t){return s.call(t,function(t){return null!=t})}function q(t){return t.length>0?i.fn.concat.apply([],t):t}function H(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function I(t){return t in l?l[t]:l[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function U(t,e){return"number"!=typeof e||h[H(t)]?e:e+"px"}function _(t){var e,n;return c[t]||(e=f.createElement(t),f.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),c[t]=n),c[t]}function X(t){return"children"in t?u.call(t.children):i.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function V(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(t,i,r){for(n in i)r&&(k(i[n])||D(i[n]))?(k(i[n])&&!k(t[n])&&(t[n]={}),D(i[n])&&!D(t[n])&&(t[n]=[]),B(t[n],i[n],r)):i[n]!==e&&(t[n]=i[n])}function Y(t,e){return null==e?i(t):i(t).filter(e)}function J(t,e,n,i){return A(e)?e.call(t,n,i):e}function G(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(t,n){var i=t.className||"",r=i&&i.baseVal!==e;return n===e?r?i.baseVal:i:void(r?i.baseVal=n:t.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?i.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var e,n,i,r,N,P,o=[],a=o.concat,s=o.filter,u=o.slice,f=t.document,c={},l={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,g=/^(?:body|html)$/i,v=/([A-Z])/g,y=["val","css","html","text","data","width","height","offset"],x=["after","prepend","before","append"],b=f.createElement("table"),E=f.createElement("tr"),T={tr:f.createElement("tbody"),tbody:b,thead:b,tfoot:b,td:E,th:E,"*":f.createElement("div")},w=/^[\w-]*$/,S={},j=S.toString,C={},O=f.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},D=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(t,n,r){var o,a,s;return d.test(t)&&(o=i(f.createElement(RegExp.$1))),o||(t.replace&&(t=t.replace(m,"<$1></$2>")),n===e&&(n=p.test(t)&&RegExp.$1),n in T||(n="*"),s=T[n],s.innerHTML=""+t,o=i.each(u.call(s.childNodes),function(){s.removeChild(this)})),k(r)&&(a=i(o),i.each(r,function(t,e){y.indexOf(t)>-1?a[t](e):a.attr(t,e)})),o},C.Z=function(t,e){return new V(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(t,n){var r;if(!t)return C.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&p.test(t))r=C.fragment(t,RegExp.$1,n),t=null;else{if(n!==e)return i(n).find(t);r=C.qsa(f,t)}else{if(A(t))return i(f).ready(t);if(C.isZ(t))return t;if(D(t))r=z(t);else if(F(t))r=[t],t=null;else if(p.test(t))r=C.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==e)return i(n).find(t);r=C.qsa(f,t)}}return C.Z(r,t)},i=function(t,e){return C.init(t,e)},i.extend=function(t){var e,n=u.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,a=w.test(o);return t.getElementById&&a&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:u.call(a&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},i.contains=f.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},i.type=L,i.isFunction=A,i.isWindow=$,i.isArray=D,i.isPlainObject=k,i.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},i.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},i.inArray=function(t,e,n){return o.indexOf.call(e,t,n)},i.camelCase=N,i.trim=function(t){return null==t?"":String.prototype.trim.call(t)},i.uuid=0,i.support={},i.expr={},i.noop=function(){},i.map=function(t,e){var n,r,o,i=[];if(Z(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return q(i)},i.each=function(t,e){var n,i;if(Z(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},i.grep=function(t,e){return s.call(t,e)},t.JSON&&(i.parseJSON=JSON.parse),i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){S["[object "+e+"]"]=e.toLowerCase()}),i.fn={constructor:C.Z,length:0,forEach:o.forEach,reduce:o.reduce,push:o.push,sort:o.sort,splice:o.splice,indexOf:o.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return a.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return i(i.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return i(u.apply(this,arguments))},ready:function(e){if("complete"===f.readyState||"loading"!==f.readyState&&!f.documentElement.doScroll)setTimeout(function(){e(i)},0);else{var n=function(){f.removeEventListener("DOMContentLoaded",n,!1),t.removeEventListener("load",n,!1),e(i)};f.addEventListener("DOMContentLoaded",n,!1),t.addEventListener("load",n,!1)}return this},get:function(t){return t===e?u.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return o.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return A(t)?this.not(this.not(t)):i(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return i(P(this.concat(i(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(t){var n=[];if(A(t)&&t.call!==e)this.each(function(e){t.call(this,e)||n.push(this)});else{var r="string"==typeof t?this.filter(t):Z(t)&&A(t.item)?u.call(t):i(t);this.forEach(function(t){r.indexOf(t)<0&&n.push(t)})}return i(n)},has:function(t){return this.filter(function(){return F(t)?i.contains(this,t):i(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!F(t)?t:i(t)},last:function(){var t=this[this.length-1];return t&&!F(t)?t:i(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?i(t).filter(function(){var t=this;return o.some.call(n,function(e){return i.contains(e,t)})}):1==this.length?i(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):i()},closest:function(t,e){var n=[],r="object"==typeof t&&i(t);return this.each(function(i,o){for(;o&&!(r?r.indexOf(o)>=0:C.matches(o,t));)o=o!==e&&!R(o)&&o.parentNode;o&&n.indexOf(o)<0&&n.push(o)}),i(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=i.map(n,function(t){return(t=t.parentNode)&&!R(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return Y(e,t)},parent:function(t){return Y(P(this.pluck("parentNode")),t)},children:function(t){return Y(this.map(function(){return X(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||u.call(this.childNodes)})},siblings:function(t){return Y(this.map(function(t,e){return s.call(X(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return i.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=_(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=A(t);if(this[0]&&!e)var n=i(t).get(0),r=n.parentNode||this.length>1;return this.each(function(o){i(this).wrapAll(e?t.call(this,o):r?n.cloneNode(!0):n)})},wrapAll:function(t){if(this[0]){i(this[0]).before(t=i(t));for(var e;(e=t.children()).length;)t=e.first();i(t).append(this)}return this},wrapInner:function(t){var e=A(t);return this.each(function(n){var r=i(this),o=r.contents(),a=e?t.call(this,n):t;o.length?o.wrapAll(a):r.append(a)})},unwrap:function(){return this.parent().each(function(){i(this).replaceWith(i(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=i(this);(t===e?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return i(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return i(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;i(this).empty().append(J(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,i){var r;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(F(t))for(n in t)G(this,n,t[n]);else G(this,t,J(this,i,e,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(r=this[0].getAttribute(t))?r:e},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){G(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=M[t]||t,this.each(function(){delete this[t]})},data:function(t,n){var i="data-"+t.replace(v,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):e},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=J(this,t,e,this.value)})):this[0]&&(this[0].multiple?i(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(e){if(e)return this.each(function(t){var n=i(this),r=J(this,e,t,n.offset()),o=n.offsetParent().offset(),a={top:r.top-o.top,left:r.left-o.left};"static"==n.css("position")&&(a.position="relative"),n.css(a)});if(!this.length)return null;if(f.documentElement!==this[0]&&!i.contains(f.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+t.pageXOffset,top:n.top+t.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(t,e){if(arguments.length<2){var r=this[0];if("string"==typeof t){if(!r)return;return r.style[N(t)]||getComputedStyle(r,"").getPropertyValue(t)}if(D(t)){if(!r)return;var o={},a=getComputedStyle(r,"");return i.each(t,function(t,e){o[e]=r.style[N(e)]||a.getPropertyValue(e)}),o}}var s="";if("string"==L(t))e||0===e?s=H(t)+":"+U(t,e):this.each(function(){this.style.removeProperty(H(t))});else for(n in t)t[n]||0===t[n]?s+=H(n)+":"+U(n,t[n])+";":this.each(function(){this.style.removeProperty(H(n))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(i(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?o.some.call(this,function(t){return this.test(W(t))},I(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){r=[];var n=W(this),o=J(this,t,e,n);o.split(/\s+/g).forEach(function(t){i(this).hasClass(t)||r.push(t)},this),r.length&&W(this,n+(n?" ":"")+r.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===e)return W(this,"");r=W(this),J(this,t,n,r).split(/\s+/g).forEach(function(t){r=r.replace(I(t)," ")}),W(this,r.trim())}})},toggleClass:function(t,n){return t?this.each(function(r){var o=i(this),a=J(this,t,r,W(this));a.split(/\s+/g).forEach(function(t){(n===e?!o.hasClass(t):n)?o.addClass(t):o.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===e?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===e?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),r=g.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(i(t).css("margin-top"))||0,n.left-=parseFloat(i(t).css("margin-left"))||0,r.top+=parseFloat(i(e[0]).css("border-top-width"))||0,r.left+=parseFloat(i(e[0]).css("border-left-width"))||0,{top:n.top-r.top,left:n.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||f.body;t&&!g.test(t.nodeName)&&"static"==i(t).css("position");)t=t.offsetParent;return t})}},i.fn.detach=i.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});i.fn[t]=function(r){var o,a=this[0];return r===e?$(a)?a["inner"+n]:R(a)?a.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(e){a=i(this),a.css(t,J(this,r,e,a[t]()))})}}),x.forEach(function(n,r){var o=r%2;i.fn[n]=function(){var n,s,a=i.map(arguments,function(t){var r=[];return n=L(t),"array"==n?(t.forEach(function(t){return t.nodeType!==e?r.push(t):i.zepto.isZ(t)?r=r.concat(t.get()):void(r=r.concat(C.fragment(t)))}),r):"object"==n||null==t?t:C.fragment(t)}),u=this.length>1;return a.length<1?this:this.each(function(e,n){s=o?n:n.parentNode,n=0==r?n.nextSibling:1==r?n.firstChild:2==r?n:null;var c=i.contains(f.documentElement,s);a.forEach(function(e){if(u)e=e.cloneNode(!0);else if(!s)return i(e).remove();s.insertBefore(e,n),c&&Q(e,function(e){if(!(null==e.nodeName||"SCRIPT"!==e.nodeName.toUpperCase()||e.type&&"text/javascript"!==e.type||e.src)){var n=e.ownerDocument?e.ownerDocument.defaultView:t;n.eval.call(n,e.innerHTML)}})})})},i.fn[o?n+"To":"insert"+(r?"Before":"After")]=function(t){return i(t)[n](this),this}}),C.Z.prototype=V.prototype=i.fn,C.uniq=P,C.deserializeValue=K,i.zepto=C,i}();return t.Zepto=e,void 0===t.$&&(t.$=e),function(e){function h(t){return t._zid||(t._zid=n++)}function p(t,e,n,i){if(e=d(e),e.ns)var r=m(e.ns);return(s[h(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||r.test(t.ns))&&(!n||h(t.fn)===h(n))&&(!i||t.sel==i)})}function d(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function m(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function g(t,e){return t.del&&!f&&t.e in c||!!e}function v(t){return l[t]||f&&c[t]||t}function y(t,n,r,o,a,u,f){var c=h(t),p=s[c]||(s[c]=[]);n.split(/\s/).forEach(function(n){if("ready"==n)return e(document).ready(r);var s=d(n);s.fn=r,s.sel=a,s.e in l&&(r=function(t){var n=t.relatedTarget;return!n||n!==this&&!e.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var c=u||r;s.proxy=function(e){if(e=S(e),!e.isImmediatePropagationStopped()){e.data=o;var n=c.apply(t,e._args==i?[e]:[e].concat(e._args));return n===!1&&(e.preventDefault(),e.stopPropagation()),n}},s.i=p.length,p.push(s),"addEventListener"in t&&t.addEventListener(v(s.e),s.proxy,g(s,f))})}function x(t,e,n,i,r){var o=h(t);(e||"").split(/\s/).forEach(function(e){p(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(v(e.e),e.proxy,g(e,r))})})}function S(t,n){if(n||!t.isDefaultPrevented){n||(n=t),e.each(w,function(e,i){var r=n[e];t[e]=function(){return this[i]=b,r&&r.apply(n,arguments)},t[i]=E});try{t.timeStamp||(t.timeStamp=Date.now())}catch(r){}(n.defaultPrevented!==i?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(t.isDefaultPrevented=b)}return t}function j(t){var e,n={originalEvent:t};for(e in t)T.test(e)||t[e]===i||(n[e]=t[e]);return S(n,t)}var i,n=1,r=Array.prototype.slice,o=e.isFunction,a=function(t){return"string"==typeof t},s={},u={},f="onfocusin"in t,c={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};u.click=u.mousedown=u.mouseup=u.mousemove="MouseEvents",e.event={add:y,remove:x},e.proxy=function(t,n){var i=2 in arguments&&r.call(arguments,2);if(o(t)){var s=function(){return t.apply(n,i?i.concat(r.call(arguments)):arguments)};return s._zid=h(t),s}if(a(n))return i?(i.unshift(t[n],t),e.proxy.apply(null,i)):e.proxy(t[n],t);throw new TypeError("expected function")},e.fn.bind=function(t,e,n){return this.on(t,e,n)},e.fn.unbind=function(t,e){return this.off(t,e)},e.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var b=function(){return!0},E=function(){return!1},T=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,w={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,e,n){return this.on(e,t,n)},e.fn.undelegate=function(t,e,n){return this.off(e,t,n)},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,s,u,f){var c,l,h=this;return t&&!a(t)?(e.each(t,function(t,e){h.on(t,n,s,e,f)}),h):(a(n)||o(u)||u===!1||(u=s,s=n,n=i),(u===i||s===!1)&&(u=s,s=i),u===!1&&(u=E),h.each(function(i,o){f&&(c=function(t){return x(o,t.type,u),u.apply(this,arguments)}),n&&(l=function(t){var i,a=e(t.target).closest(n,o).get(0);return a&&a!==o?(i=e.extend(j(t),{currentTarget:a,liveFired:o}),(c||u).apply(a,[i].concat(r.call(arguments,1)))):void 0}),y(o,t,u,s,n,l||c)}))},e.fn.off=function(t,n,r){var s=this;return t&&!a(t)?(e.each(t,function(t,e){s.off(t,n,e)}),s):(a(n)||o(r)||r===!1||(r=n,n=i),r===!1&&(r=E),s.each(function(){x(this,t,r,n)}))},e.fn.trigger=function(t,n){return t=a(t)||e.isPlainObject(t)?e.Event(t):S(t),t._args=n,this.each(function(){t.type in c&&"function"==typeof this[t.type]?this[t.type]():"dispatchEvent"in this?this.dispatchEvent(t):e(this).triggerHandler(t,n)})},e.fn.triggerHandler=function(t,n){var i,r;return this.each(function(o,s){i=j(a(t)?e.Event(t):t),i._args=n,i.target=s,e.each(p(s,t.type||t),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return 0 in arguments?this.bind(t,e):this.trigger(t)}}),e.Event=function(t,e){a(t)||(e=t,t=e.type);var n=document.createEvent(u[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),S(n)}}(e),function(e){function p(t,n,i){var r=e.Event(n);return e(t).trigger(r,i),!r.isDefaultPrevented()}function d(t,e,n,r){return t.global?p(e||i,n,r):void 0}function m(t){t.global&&0===e.active++&&d(t,null,"ajaxStart")}function g(t){t.global&&!--e.active&&d(t,null,"ajaxStop")}function v(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||d(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void d(e,n,"ajaxSend",[t,e])}function y(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),d(n,r,"ajaxSuccess",[e,n,t]),b(o,e,n)}function x(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),d(i,o,"ajaxError",[n,i,t||e]),b(e,n,i)}function b(t,e,n){var i=n.context;n.complete.call(i,e,t),d(n,i,"ajaxComplete",[e,n]),g(n)}function E(t,e,n){if(n.dataFilter==T)return t;var i=n.context;return n.dataFilter.call(i,t,e)}function T(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==c?"html":t==f?"json":s.test(t)?"script":u.test(t)&&"xml")||"text"}function S(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function j(t){t.processData&&t.data&&"string"!=e.type(t.data)&&(t.data=e.param(t.data,t.traditional)),!t.data||t.type&&"GET"!=t.type.toUpperCase()&&"jsonp"!=t.dataType||(t.url=S(t.url,t.data),t.data=void 0)}function C(t,n,i,r){return e.isFunction(n)&&(r=i,i=n,n=void 0),e.isFunction(i)||(r=i,i=void 0),{url:t,data:n,success:i,dataType:r}}function P(t,n,i,r){var o,a=e.isArray(n),s=e.isPlainObject(n);e.each(n,function(n,u){o=e.type(u),r&&(n=i?r:r+"["+(s||"object"==o||"array"==o?n:"")+"]"),!r&&a?t.add(u.name,u.value):"array"==o||!i&&"object"==o?P(t,u,i,n):t.add(n,u)})}var r,o,n=+new Date,i=t.document,a=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,u=/^(?:text|application)\/xml/i,f="application/json",c="text/html",l=/^\s*$/,h=i.createElement("a");h.href=t.location.href,e.active=0,e.ajaxJSONP=function(r,o){if(!("type"in r))return e.ajax(r);var c,p,a=r.jsonpCallback,s=(e.isFunction(a)?a():a)||"Zepto"+n++,u=i.createElement("script"),f=t[s],l=function(t){e(u).triggerHandler("error",t||"abort")},h={abort:l};return o&&o.promise(h),e(u).on("load error",function(n,i){clearTimeout(p),e(u).off().remove(),"error"!=n.type&&c?y(c[0],h,r,o):x(null,i||"error",h,r,o),t[s]=f,c&&e.isFunction(f)&&f(c[0]),f=c=void 0}),v(h,r)===!1?(l("abort"),h):(t[s]=function(){c=arguments},u.src=r.url.replace(/\?(.+)=\?/,"?$1="+s),i.head.appendChild(u),r.timeout>0&&(p=setTimeout(function(){l("timeout")},r.timeout)),h)},e.ajaxSettings={type:"GET",beforeSend:T,success:T,error:T,complete:T,context:null,global:!0,xhr:function(){return new t.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:f,xml:"application/xml, text/xml",html:c,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:T},e.ajax=function(n){var u,f,a=e.extend({},n||{}),s=e.Deferred&&e.Deferred();for(r in e.ajaxSettings)void 0===a[r]&&(a[r]=e.ajaxSettings[r]);m(a),a.crossDomain||(u=i.createElement("a"),u.href=a.url,u.href=u.href,a.crossDomain=h.protocol+"//"+h.host!=u.protocol+"//"+u.host),a.url||(a.url=t.location.toString()),(f=a.url.indexOf("#"))>-1&&(a.url=a.url.slice(0,f)),j(a);var c=a.dataType,p=/\?.+=\?/.test(a.url);if(p&&(c="jsonp"),a.cache!==!1&&(n&&n.cache===!0||"script"!=c&&"jsonp"!=c)||(a.url=S(a.url,"_="+Date.now())),"jsonp"==c)return p||(a.url=S(a.url,a.jsonp?a.jsonp+"=?":a.jsonp===!1?"":"callback=?")),e.ajaxJSONP(a,s);var O,d=a.accepts[c],g={},b=function(t,e){g[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(a.url)?RegExp.$1:t.location.protocol,N=a.xhr(),P=N.setRequestHeader;if(s&&s.promise(N),a.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",d||"*/*"),(d=a.mimeType||d)&&(d.indexOf(",")>-1&&(d=d.split(",",2)[0]),N.overrideMimeType&&N.overrideMimeType(d)),(a.contentType||a.contentType!==!1&&a.data&&"GET"!=a.type.toUpperCase())&&b("Content-Type",a.contentType||"application/x-www-form-urlencoded"),a.headers)for(o in a.headers)b(o,a.headers[o]);if(N.setRequestHeader=b,N.onreadystatechange=function(){if(4==N.readyState){N.onreadystatechange=T,clearTimeout(O);var t,n=!1;if(N.status>=200&&N.status<300||304==N.status||0==N.status&&"file:"==C){if(c=c||w(a.mimeType||N.getResponseHeader("content-type")),"arraybuffer"==N.responseType||"blob"==N.responseType)t=N.response;else{t=N.responseText;try{t=E(t,c,a),"script"==c?(1,eval)(t):"xml"==c?t=N.responseXML:"json"==c&&(t=l.test(t)?null:e.parseJSON(t))}catch(i){n=i}if(n)return x(n,"parsererror",N,a,s)}y(t,N,a,s)}else x(N.statusText||null,N.status?"error":"abort",N,a,s)}},v(N,a)===!1)return N.abort(),x(null,"abort",N,a,s),N;var M="async"in a?a.async:!0;if(N.open(a.type,a.url,M,a.username,a.password),a.xhrFields)for(o in a.xhrFields)N[o]=a.xhrFields[o];for(o in g)P.apply(N,g[o]);return a.timeout>0&&(O=setTimeout(function(){N.onreadystatechange=T,N.abort(),x(null,"timeout",N,a,s)},a.timeout)),N.send(a.data?a.data:null),N},e.get=function(){return e.ajax(C.apply(null,arguments))},e.post=function(){var t=C.apply(null,arguments);return t.type="POST",e.ajax(t)},e.getJSON=function(){var t=C.apply(null,arguments);return t.dataType="json",e.ajax(t)},e.fn.load=function(t,n,i){if(!this.length)return this;var s,r=this,o=t.split(/\s/),u=C(t,n,i),f=u.success;return o.length>1&&(u.url=o[0],s=o[1]),u.success=function(t){r.html(s?e("<div>").html(t.replace(a,"")).find(s):t),f&&f.apply(r,arguments)},e.ajax(u),this};var N=encodeURIComponent;e.param=function(t,n){var i=[];return i.add=function(t,n){e.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(N(t)+"="+N(n))},P(i,t,n),i.join("&").replace(/%20/g,"+")}}(e),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(e),function(){try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;t.getComputedStyle=function(t,e){try{return n(t,e)}catch(i){return null}}}}(),function(e){function f(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function c(){a=null,n.last&&(n.el.trigger("longTap"),n={})}function l(){a&&clearTimeout(a),a=null}function h(){i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),a&&clearTimeout(a),i=r=o=a=null,n={}}function p(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function d(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var i,r,o,a,u,n={},s=750;e(document).ready(function(){var m,g,x,b,v=0,y=0;"MSGesture"in t&&(u=new MSGesture,u.target=document.body),e(document).bind("MSGestureEnd",function(t){var e=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;e&&(n.el.trigger("swipe"),n.el.trigger("swipe"+e))}).on("touchstart MSPointerDown pointerdown",function(t){(!(b=d(t,"down"))||p(t))&&(x=b?t:t.touches[0],t.touches&&1===t.touches.length&&n.x2&&(n.x2=void 0,n.y2=void 0),m=Date.now(),g=m-(n.last||m),n.el=e("tagName"in x.target?x.target:x.target.parentNode),i&&clearTimeout(i),n.x1=x.pageX,n.y1=x.pageY,g>0&&250>=g&&(n.isDoubleTap=!0),n.last=m,a=setTimeout(c,s),u&&b&&u.addPointer(t.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(b=d(t,"move"))||p(t))&&(x=b?t:t.touches[0],l(),n.x2=x.pageX,n.y2=x.pageY,v+=Math.abs(n.x1-n.x2),y+=Math.abs(n.y1-n.y2))}).on("touchend MSPointerUp pointerup",function(t){(!(b=d(t,"up"))||p(t))&&(l(),n.x2&&Math.abs(n.x1-n.x2)>30||n.y2&&Math.abs(n.y1-n.y2)>30?o=setTimeout(function(){n.el&&(n.el.trigger("swipe"),n.el.trigger("swipe"+f(n.x1,n.x2,n.y1,n.y2))),n={}},0):"last"in n&&(30>v&&30>y?r=setTimeout(function(){var t=e.Event("tap");t.cancelTouch=h,n.el&&n.el.trigger(t),n.isDoubleTap?(n.el&&n.el.trigger("doubleTap"),n={}):i=setTimeout(function(){i=null,n.el&&n.el.trigger("singleTap"),n={}},250)},0):n={}),v=y=0)}).on("touchcancel MSPointerCancel pointercancel",h),e(t).on("scroll",h)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){e.fn[t]=function(e){return this.on(t,e)}})}(e),e});
  "use strict";

 //前三个参数必传
 //aUrl参数传系统名字和具体路径，用','隔开，例如：aUrl='aftexam,/auth/student/doQueryExam.htm'
 //datatype服务器数据返回数据类型
 //data发送到服务器的数据
 //requestType请求方法
 //callback成功的回调函数
var ajaxMethod={
	//协议根据环境不同手动切换
	protocol:"",
	//域名根据环境不同手动切换
	domain:"",

	system:'',
	path:'',
	url:'',
	uuid:'',
	ticket:'',
	platformType:'',
	// platform:'',
	datatype:'',
	requestType:'',
	init:function(){
		this.paramqs();
		this.judgmentDomain();
		//this.ticket=this.getCookie('ticket');
	},

	// 手机端检测
	isPc:function(){
		var userAgentInfo = navigator.userAgent.toLowerCase();
		var Agents = ["yks_andr","yks_ios"];
		var Pflag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) >=0) {
				Pflag = false;
				break;
			}
		}
		return Pflag;
	},
	// 判断域名
	judgmentDomain:function(){
		var lProtocol=window.location.protocol;
		if(lProtocol=="https:"){
			this.protocol='https://';
			this.domain='.artstudent.cn';
		}else {
			this.protocol='http://';
			this.domain='.51bm.net.cn';
		}
	},
	// 获取cookie方法
	getCookie:function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			// 隐身模式和非隐身模式下获取的ticket不一样，非隐身模式下的ticket为""sd*****DFGdfgdds""
			if(arr[2].substring(0,1)=='"'){
				var ptit=arr[2].replace(/"/g,'');
				return unescape(ptit);
		};
			return unescape(arr[2]);
		}else{
			return null;
		}
	},

	paramqs:function(){
//        alert('我要执行yksapp')
        
            if(!this.isPc()){
                this.uuid=yksapp.getUUID();
                this.ticket=yksapp_user.getTicket();
                this.platformType = yksapp.getPlatformType();//   TODO  新版本改回来
                // this.platformType = 1;
            }else{
                this.ticket=this.getCookie('ticket');
                this.platformType = 1;
            }
      
		
//        alert('yksapp执行完毕')
	},
	in_array:function(needle, haystack) {
	    for(var d in haystack) {
		    if(haystack[d] == needle) {
		    	return true;
		    }
	    }
	    return false;
    },
    iosAjax:function(aUrl,data,callback,completeFun,datatype,requestType,errorFun){
        var that=this;
        this.paramqs();
		this.judgmentDomain();//获取域名和协议
		var Params=data;
		var paramUrl=aUrl.split(',');
		var asd=arguments;
		this.system=paramUrl[0];
		this.path=paramUrl[1];
		this.url=this.protocol+this.system+this.domain+this.path;
	    // 手机端获取ticket和uuid
		//$.extend(Params,{ticket:this.ticket});
		// if( !that.ticket && !this.isPc()){
		// 	// window.localObj.goLogin();
		// 	yksapp.goPageWithParams("login",null)
		// 	return;
		// }
		// 参数判断
		var dataTyList=['json', 'jsonp', 'xml', 'html', 'text'];
		if(!arguments[3]){
			this.datatype="json";
			this.requestType='POST';
		};
		// var inner_style="position:fixed;top:50%;left:50%;margin-left:-.5rem;margin-top:-.5rem;border-width:2px;border-style:solid;border-color:#5DC596;width:1rem;height:1rem;border-radius:50%;border-bottom-color:transparent;border-top-color:transparent;"
		// var loadIngA="<div class='loremlorem' style='z-index:10000;position:fixed;top:0;bottom:0;right:0;left:0;background:rgba(0,0,0,.2)'></div><div class='lorem-inner' style="+inner_style+"></div>";
		if(!!arguments[3] && typeof arguments[3]=="function"){
			this.datatype="json";
			this.requestType='POST';
			// if(!this.in_array(arguments[3],dataTyList)){
			// 	throw 'The third parameter should be the data type';
			// }
		};
		if(!arguments[4]){
			this.datatype="json";
			this.requestType='POST';
		};
		if(!!arguments[4]){
			this.requestType='POST';
			if(!this.in_array(arguments[4],dataTyList)){
				throw 'The fouth parameter should be the data type';
			}
		};
		if(!!arguments[5]){
			this.requestType=arguments[5];
			if(!this.in_array(arguments[4],dataTyList)){
				throw 'The fouth parameter should be the data type';
			}
		};
		if(!!arguments[6]){
			this.datatype=arguments[4];
			this.requestType=arguments[5];
		}
		var checkLogin=true;
		$.ajax({
			url:this.url,
			type:this.requestType,
			dataType:this.datatype,
			data:{data:JSON.stringify({m:"",p:Params}),ticket:that.ticket},
			timeout:60000,
			beforeSend:function(request){
				// $('body').append(loadIngA)
				// alert(123)
				// 手机端设置请求头
				if(!that.isPc()){
					request.setRequestHeader("udid",that.uuid);
				}
				// pc和移动都设置tkn
				request.setRequestHeader("tkn","yx001");
				request.setRequestHeader("platformType",that.platformType);
	        },
	        success:function(datas){
	        	// $(".loremlorem").remove();
	        	// $(".lorem-inner").remove();
	        	var dataq = {};
				if (typeof datas == "string"){
					dataq = JSON.parse(datas);
				} else if (typeof datas == "object") {
					dataq = datas;
				}
				// 用户的ticket已失效或者没有登录
				if(!datas.success && datas.code=='011'){
					// yksapp.goPageWithParams("login", null);
					// return;
					checkLogin=false;
				}
	        	callback(dataq);
	        },
	        complete:function(xhr, status){
	        	//用户切换账号后ticket在APP里面没有立即清除，但是，
	        	//此时的ticket已经是无效的ticket，关闭webPage并跳转到原生登录界面
	        	//接口是否身份验证判断
	        	var  identity=new RegExp("m/auth");
	        	if(!identity.test(that.url)){
	        		
	        	}else{
	        		if(!checkLogin && !that.isPc()){
		        		yksapp.closeWebPage(); 
		        		yksapp.goPageWithParams("login", null);
		        		return;
		        	}
	        	}
	        	if(typeof asd[3]=="function"){
		        	completeFun();
	        	}
	        },
	        error:function(xhr, errorType, error){
	        	if(typeof asd[6]=="function"){
	        		errorFun();
	        	}
	        }
		})
    },
	doAjax:function(aUrl,data,callback,completeFun,datatype,requestType,errorFun){
		 var that=this;
         if(this.isPc()){
             this.iosAjax(aUrl,data,callback,completeFun,datatype,requestType,errorFun);
         }else{
             var timer=setInterval(function(){
                  if((window.yksapp)&&(window.yksapp_user)){
                         /* 清除定时器*/
                      timer && clearInterval(timer);
                      that.iosAjax(aUrl,data,callback,completeFun,datatype,requestType,errorFun);
                  }
             },100)
         }
       
//        this.paramqs();
//		this.judgmentDomain();//获取域名和协议
//		var Params=data;
//		var paramUrl=aUrl.split(',');
//		var asd=arguments;
//		this.system=paramUrl[0];
//		this.path=paramUrl[1];
//		this.url=this.protocol+this.system+this.domain+this.path;
//	    // 手机端获取ticket和uuid
//		//$.extend(Params,{ticket:this.ticket});
//		// if( !that.ticket && !this.isPc()){
//		// 	// window.localObj.goLogin();
//		// 	yksapp.goPageWithParams("login",null)
//		// 	return;
//		// }
//		// 参数判断
//		var dataTyList=['json', 'jsonp', 'xml', 'html', 'text'];
//		if(!arguments[3]){
//			this.datatype="json";
//			this.requestType='POST';
//		};
//		if(!!arguments[3] && typeof arguments[3]=="function"){
//			this.datatype="json";
//			this.requestType='POST';
//			// if(!this.in_array(arguments[3],dataTyList)){
//			// 	throw 'The third parameter should be the data type';
//			// }
//		};
//		if(!arguments[4]){
//			this.datatype="json";
//			this.requestType='POST';
//		};
//		if(!!arguments[4]){
//			this.requestType='POST';
//			if(!this.in_array(arguments[4],dataTyList)){
//				throw 'The fouth parameter should be the data type';
//			}
//		};
//		if(!!arguments[5]){
//			this.requestType=arguments[5];
//			if(!this.in_array(arguments[4],dataTyList)){
//				throw 'The fouth parameter should be the data type';
//			}
//		};
//		$.ajax({
//			url:this.url,
//			type:this.requestType,
//			dataType:this.datatype,
//			data:{data:JSON.stringify({m:"",p:Params}),ticket:that.ticket},
//			timeout:60000,
//			beforeSend:function(request){
//				
//				// 手机端设置请求头
//				if(!that.isPc()){
//					request.setRequestHeader("udid",that.uuid);
//				}
//				// pc和移动都设置tkn
//				request.setRequestHeader("tkn","yx001");
//				request.setRequestHeader("platformType",that.platformType);
//	        },
//	        success:function(datas){
//	        	
//	        	var dataq = {};
//				if (typeof datas == "string"){
//					dataq = JSON.parse(datas);
//				} else if (typeof datas == "object") {
//					dataq = datas;
//				}
//	        	callback(dataq);
//	        },
//	        complete:function(xhr, status){
//	        	if(typeof asd[3]=="function"){
//		        	completeFun();
//	        	}
//	        },
//	        error:function(xhr, errorType, error){
//	        	alert("请求超时");
//	        }
//		})
	}
};
$(function(){
    ajaxMethod.init();
})
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


};
(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;$(a).appendTo(this)})}})($);
