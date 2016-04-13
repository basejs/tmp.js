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
