/*!
 * tmp.js v0.1.0
 * github https://github.com/basejs/tmp
 *
 * Copyright zhuqiang
 * Date: 2016/03/21
 */
;(function(exports) {
	var tmp = function(tmphtml,data) {
		tmp.tmphtml = tmphtml;

		if(Object.prototype.toString.call(data) === '[object Object]'){
			return tmp.render(data);
		}
		return tmp;
	};

	tmp.render = function(data){
		var newstr = 'var tmpstr ="";(function(){';
		for(var name in data){
			newstr += 'var '+ name +'=' + JSON.stringify(data[name])+';';
		}
		newstr += tmp.tmphtml.match(/((?:{)?[^{}]+(?:})?)/g).map(function(item){
			//需要单独处理的选项
			switch(true){

				case /^{@\/if[^{}]*}$/.test(item):
					return '}';
				case /^{@\/each[^{}]*}$/.test(item):
					return '}})();';
				case /^{@else[^{}]*}$/.test(item):
					return '}else{';
				case /^{@each[^{}]*}$/.test(item):
					//each返回for循环，尽量不要用t做索引
					return item.replace(/{@each\s+(\w+)\s+as\s+(\w+)\s*(?:,\s*(\w+)\s*)?}/,function($1,$2,$3,$4){
						//console.log($1+'-----'+$2+'-----'+$3+'-----'+$4);
						return '(function(){for(var t=0; t<'+ $2 +'.length; t++){'+ $3 +'=' + $2 +'[t];' + $4 +'=t;';
					});
				case /^{@if[^{}]*}$/.test(item):
					//if直接返回条件
					return item.replace(/{@if\s+?([^{}]+)\}/,'if($1){');
				case /^{[^{}]+}$/.test(item):
					//变量返回当前作用域或全局作用域
					item = item.replace(/{\s*([^{}]+)\s*}/g,'$1');
					//第一个字符为=时当做html渲染
					if(item.search(/^=/) !== -1){
						return 'tmpstr+=('+unescape(item).slice(1)+');';
					}
					return 'tmpstr+=('+item+');';
				default:
					return 'tmpstr+="' + item.replace(/\n\s+/g,'\\n').replace(/\"/g,'\\"') + '";';
			}
		}).join('');
		newstr += '})();return tmpstr;';
		return new Function(newstr)();
	};

	if (typeof define === 'function' && define.amd) { /* AMD support */
		define('tmp', [], function() {
			return tmp;
		});
	} else {
		exports.tmp = tmp;
	}
})(this);
