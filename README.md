## tmp.js 一个轻量的优雅的js模板库
tmp.js模板语法参照juicer.js设计，但是效率却比juicer.js提升1倍不止。

####用法演示
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
{@if typeof name === '张三'}
  {{name}}一号
{@else if name === '李四'}
  {{name}}二号
{@else}
  {{name}}三号
{@/if}
```

