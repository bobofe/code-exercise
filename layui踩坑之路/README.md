[TOC]

# layui

<https://www.layui.com/>

关键字：**模块化**  **前端**  **UI框架**

模块化：所谓模块化，就像积木一样，可以随时拿取任意一块单独使用。而不必一次将所有资源都引入项目中。

## 经典模块化前端UI框架

文件目录：

```
  ├─css //css目录
  │  │─modules //模块css目录（一般如果模块相对较大，我们会单独提取，比如下面三个：）
  │  │  ├─laydate
  │  │  ├─layer
  │  │  └─layim
  │  └─layui.css //核心样式文件
  ├─font  //字体图标目录
  ├─images //图片资源目录（目前只有layim和编辑器用到的GIF表情）
  │─lay //模块核心目录
  │  └─modules //各模块组件
  │─layui.js //基础核心库
  └─layui.all.js //包含layui.js和所有模块的合并文件
```

## 使用方法

获得 layui 后，将其完整地部署到你的项目目录（或静态资源服务器），你**只需要引入下述两个文件**，不用管其它任何文件。因为他们（比如各模块）都是在最终使用的时候才会自动加载。

```
./layui/css/layui.css
./layui/layui.js //提示：如果是采用非模块化方式（最下面有讲解），此处可换成：./layui/layui.all.js      
```

### 模块化写法

这是一个基本的入门页面：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>开始使用layui</title>
  <!-- 须引入：引入css基础文件 ->
  <link rel="stylesheet" href="../layui/css/layui.css">
</head>
<body>
 
<!-- 你的HTML代码 -->
<!-- 必须引入的js基础文件 -->
<script src="../layui/layui.js"></script>
<script>
//一般直接写在一个js文件中
layui.use(['layer', 'form'], function(){
  var layer = layui.layer
  ,form = layui.form;
  
  layer.msg('Hello World');
});
</script> 

</body>
</html>
```

### 非模块化写法

如果想采用非模块化方式（即**所有模块一次性加载**，尽管我们并不推荐你这么做），可以按照下面的方式使用：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>非模块化方式使用layui</title>
  <!--引入css文件-->
  <link rel="stylesheet" href="../layui/css/layui.css">
</head>
<body> 
<!-- 你的HTML代码 -->

<!-- 这里必须引入一个有所有模块的js文件 -->
<script src="../layui/layui.all.js"></script>
<script>
//由于模块都一次性加载，因此不用执行 layui.use() 来加载对应模块，直接使用即可：
;!function(){
  var layer = layui.layer
  ,form = layui.form;
  
  layer.msg('Hello World');
}();
</script> 
</body>
</html>
```

## 组件使用方法

以layer组件为例：

使用场景

由于layer可以独立使用，也可以通过Layui模块化使用。所以请按照你的实际需求来选择。

| 场景                | 用前准备                                                     | 调用方式                                                     |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. 作为独立组件使用 | 如果你只是单独想使用 layer，你可以去 [layer](http://layer.layui.com/) 独立版本官网下载组件包。你需要在你的页面引入*jQuery*1.8以上的任意版本，并引入*layer.js*。 | 通过script标签引入layer.js后，直接用即可。 参考：[快速上手](http://layer.layui.com/hello.html) |
| 2. layui 模块化使用 | 如果你使用的是 layui，那么你直接在官网下载 layui 框架即可，无需引入 jQuery 和 layer.js，但需要引入*layui.css*和*layui.js* | 通过*layui.use('layer', callback)*加载模块                   |

作为独立组件使用 ：layerlayui.code引入好layer.js后，直接用即可

```javascript
<script src="layer.js"></script>
<script>
	layer.msg('hello');
</script>                        
```

在 layui 模块化中使用 layerlayui.code

```javascript
layui.use('layer', function(){  
	var layer = layui.layer;
    layer.msg('hello');
});  
```

实际使用时应该采用预先加载方法加载模块，例如：

```javascript
/*应该在你js文件的代码最外层，就把需要用到的模块 layui.use以 一下，如：*/
 
//我们强烈推荐你在代码最外层把需要用到的模块先加载
layui.use(['layer', 'form', 'element'], function(){
  var layer = layui.layer
  ,form = layui.form
  ,element = layui.element
 
  //……
  //你的代码都应该写在这里面
});
      
```

**注意：代码必须写在layui.use的回调函数中，否则找不到相应的模块**