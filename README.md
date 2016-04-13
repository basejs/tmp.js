## tmp.js 一个轻量的优雅的js模板库
tmp.js模板语法参照juicer.js设计，但是效率却比juicer.js提升1倍不止。

####用法演示
```html
<div id="tmpdom"></div>

<script type="text/template" id="tmp-test">
	<ul>
		{{ score>80 ? level.excellent : level.failed }}{{name}}
		{@each country as item, i}
		<li>
			国家名{{item}}
			{@if Object.prototype.toString.call(item) === '[object Array]'}
				{{item[0]}}{{name}}
			{@/if}
			<br>
			{@if i === 1}
				{@each city as item2, j}
					<a href="#">第个{{j}}城市{{item2}}</a><br>
				{@/each}
			{@else}
			<a href="javascript:;">没有循环</a>
			{@/if}
		</li>
		{@/each}
  </ul>
</script>
```

```javascript
	var html = document.getElementById('tmp-test').innerHTML;
	var data = {country:['中国','美国','俄罗斯',['英国','法国','德国']], city: ["164","203"], name: '张飞', level:{excellent: '80-100', failed: '0-80'}, score: 68};
	document.getElementById('tmpdom').innerHTML = tmp(html).render(data);
```


######变量输出
```javascript
//输出变量name，支持全局查找
{{name}}
//输出转译内容
{{=name}}//同{{unescape(name)}}
//三目输出
{{ typeof name === 'string' ? name : '默认名'}}
//其他全局方法同样适用
```

######if...else...
```javascript
//if中可以带括号也可以忽略，支持全局方法,else和else if非必须
{@if typeof name === '张三'}
  {{name}}一号
{@else if name === '李四'}
  {{name}}二号
{@else}
  {{name}}三号
{@/if}
```

######each
```javascript
 //第一个参数为数组，as后第一个参数为当前值，后一个值为索引, 注意中间空格不能少
  {@each ['赵','钱','孙','李'] as item, i}
		<span>百家姓第{{i+1}}个为{{item}}</span><br>
	{@/each}
```

######与其他引擎对比
项目中有一个tmphtml.html里边摘取了目前市面上比较好的几个模板引擎做了一个效率对比。
chrome的环境，i5的cpu+12g内存，10次两层each嵌套，每次循环1000+数据测试结果如下(随机取样不偏离事实)：

#####第一次
+tmpstart juicer: 94.398ms
+tmpstart artemplate: 76.437ms
+tmpstart tmp: 60.097ms
+tmpstart doT: 46.407ms

---------------------------------------

####第二次
tmpstart juicer: 95.132ms
tmpstart artemplate: 89.558ms
tmpstart tmp: 69.876ms
tmpstart doT: 58.088ms

####第三次
tmpstart juicer: 138.184ms

tmpstart artemplate: 92.126ms

tmpstart tmp: 59.014ms

tmpstart doT: 48.727ms


最优的是dot.js，其次是tmp.js，再次是arttemplate，性能最差的是juicer，更详细的情况，大家不妨下载我的tmphtml.html文件自行测试看看结果。

dot.js之所以性能最优是由于少了一步赋值的过程，它的变量输出以it为最高层，而不是window，所以解析更快，但是为了这个速度而放弃了优雅，我以为是不划算的。

说在最后，tmp.js是一个轻量级的模板引擎，没有针对ie8以下做任何优化，代码目前兼容到es5。
