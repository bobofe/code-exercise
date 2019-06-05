[TOC]

## 1.getBoundingClientRect()

## 2.获得鼠标的位置信息

## 3.防抖

### 原理：

每次点击或滚动，都重新创建一个计时器，重新开始计时

```javascript
// 2、防抖功能函数，接受传参
function debounce(fn) {
    // 4、创建一个标记用来存放定时器的返回值
    let timer = null;
    return function() {
    // 5、每次当用户点击/输入的时候，把前一个定时器清除
        clearTimeout(timer);
       // 6、然后创建一个新的 setTimeout，这样就能保证点击按钮后的 interval 间隔内如果用户还点击了的话，就不会执行 fn 函数，并且会重新计算时间
       // 这是一个闭包，第一次点击，隔1s调用fn，如果在这之前点击第二次，会将上一个定时器清除掉，创建一个新的定时器
       // 总结：如果在time内点击多次，只有一次有效
       timeout = setTimeout(() => {
           fn.call(this, arguments);
       }, 1000);
    };
}
```

### 防抖库—underscore.js-debounce(_.debounce(function, wait, [immediate]))

## 4.节流

节流定时器写法：

```javascript
 // 2、节流函数体
    function throttle(fn) {
        // 4、通过闭包保存一个标记
        let canRun = true;
        return function() {
            // 5、在函数开头判断标志是否为 true，如果为false 则中断函数
            if(!canRun) {
                return;
            }
            // 6、将 canRun 设置为 false，防止执行之前再被执行
            // 第一次进来过if判断，给canRun赋值为false，接下来走定时器，在fn调用之前，如果再点击，
            // !canRun的值为true，跳出函数不执行后面
            // 总结：一个time之内只能执行一次事件处理函数
            canRun = false;
            // 7、定时器
            setTimeout( () => {
                fn.call(this, arguments);
                // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
                canRun = true;
            }, 1000);
        };
    }
```

### 防抖和节流对比

**函数防抖(debounce)**

**概念：** `在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。`

**生活中的实例：** `如果有人进电梯（触发事件），那电梯将在10秒钟后出发（执行事件监听器），这时如果又有人进电梯了（在10秒内再次触发该事件），我们又得等10秒再出发（重新计时）。`

**函数节流(throttle)**

**概念：** `规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。`

**生活中的实例：** `我们知道目前的一种说法是当 1 秒内连续播放 24 张以上的图片时，在人眼的视觉中就会形成一个连贯的动画，所以在电影的播放（以前是，现在不知道）中基本是以每秒 24 张的速度播放的，为什么不 100 张或更多是因为 24 张就可以满足人类视觉需求的时候，100 张就会显得很浪费资源。`

**应用场景**

对于函数防抖，有以下几种应用场景：

- 给按钮加函数防抖防止表单多次提交。
- 对于输入框连续输入进行AJAX验证时，用函数防抖能有效减少请求次数。
- 判断`scroll`是否滑到底部，`滚动事件`+`函数防抖`

> 总的来说，适合多次事件**一次响应**的情况

对于函数节流，有如下几个场景：

- 游戏中的刷新率
- DOM元素拖拽
- Canvas画笔功能

> 总的来说，适合**大量事件**按时间做**平均**分配触发。

**源码**

**函数防抖：**

```javascript
function debounce(fn, wait) {
  var timer = null;
  return function () {
      var context = this
      var args = arguments
      if (timer) {
          clearTimeout(timer);
          timer = null;
      }
      timer = setTimeout(function () {
          fn.apply(context, args)
      }, wait)
  }
}
/*要防抖的函数*/
var fn = function () {
  console.log('boom')
}

setInterval(debounce(fn,500),1000) // 第一次在1500ms后触发，之后每1000ms触发一次

setInterval(debounce(fn,2000),1000) // 不会触发一次（我把函数防抖看出技能读条，如果读条没完成就用技能，便会失败而且重新读条）
```

之所以返回一个函数，因为防抖本身更像是一个函数修饰，所以就做了一次函数柯里化。里面也用到了闭包，闭包的变量是`timer`。

**函数节流—时间戳写法**

```javascript
function throttle(fn, gapTime) {
  let _lastTime = null;
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime
    }
  }
}

let fn = ()=>{
  console.log('boom')
}

setInterval(throttle(fn,1000),10)
```

如图是实现的一个简单的函数节流，结果是`一秒打出一次boom`

**小结**

函数防抖和函数节流是**在时间轴上控制函数的执行次数**。防抖可以类比为`电梯不断上乘客`,节流可以看做`幻灯片限制频率播放电影`。

### 节流库—underscore.js-throttle(_.throttle(function, wait, [options]))

## 5.懒加载

JavaScript 类数组对象

类数组对象转数组有两种花方法

方法一：Array.from

方法二：Array.prototype.slice.call

1️⃣转换
如果类数组对象需要转化为数组，可以用 Array.prototype.slice.call

```javascript
var foo = {
    0: 'Java',
    1: 'Python',
    2: 'Scala',
    length: 3
}

var arr = Array.prototype.slice.call(foo);
```

第一， `foo` 本来是没有 `slice` 方法的， `Array.prototype.slice.call(foo)` 这个表达式相当于赋予 `foo` 这个对象 `slice` 方法。

第二， `Array.prototype.slice.call(foo);` 相当于 `Array.prototype.slice.call(foo, 0);` 是把取一个数组（或者类数组）的子集，并作为一个数组返回。所以当后面的作用对象是一个类数组时，就会把这个类数组对象转换为了一个新的数组。

2️⃣特性

类数组只有索引值和长度，没有数组的各种方法，所以如果要类数组调用数组的方法，就需要使用 `Array.prototype.method.call` 来实现。

例如，如果遍历一个类数组，可以这样实现：

```javascript
Array.prototype.forEach.call(foo, function(item){
    console.log(item);
});
```

添加一个元素

```javascript
Array.prototype.push.call(foo, 'PHP');
// foo = {0: "Java", 1: "Python", 2: "Scala 111", 3: "PHP", length: 4}
```

总结：

**call，apply，bind的本质是给对象添加一个新的方法，让这个对象能够调用这个方法**

### 懒加载原理

懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式。用户滚动到它们之前，可视区域外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。常适用图片很多，页面很长的电商网站场景中。

+ 将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中

+ 当页面滚动的时候需要去监听scroll事件,在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域
  + 如果图片在可视区内,将图片的 src 属性设置为data-original 的值,这样就可以实现延迟加载
  + 如果图片不在可视区不做处理

```HTML
<img src="" class="image-item" lazyload="true"  data-original="images/12.png"/>
```

```javascript
//获取可视区高度，documentElement表示html元素
var viewHeight =document.documentElement.clientHeight;
// 绑定到document对象上，和获得鼠标位置的点击事件相同
document.addEventListener("scroll",lazyload)
function lazyload(){
   var eles=document.querySelectorAll('img[data-original][lazyload]');
   //给eles执行forEach函数，elses是类数组对象，不能直接调用数组方法，这里用了借用方法，见类数组对象转数组
	 Array.prototype.forEach.call(eles,function(item,index){
      var rect;
      // 如果item.dataset.original===""，说明图片已经加载过了
      if(item.dataset.original===""){
           return;
      }
      // 获得元素相对于浏览器视窗的位置信息，包括width，height，top，left，bottom，right，x，y
      rect=item.getBoundingClientRect();
         // 如果占位图片的底边>=0,说明图片还没有向上移除视窗
         // 如果占位图片的上边<可视区高度，说明图片还没有向下移除视窗
         // 总结：图片刚好出现在视窗范围内
         if(rect.bottom> 0 && rect.top < viewHeight){
             // 将已经请求到浏览器的图片加载出来
             !function(){
                 var img=new Image()
                 img.src=item.dataset.original
                 // 当图片加载完成后执行
                 img.onload=function(){
                     item.src=img.src
                 }
                 item.removeAttribute("data-original")//移除属性，下次不再遍历
                 item.removeAttribute("lazyload")
            }()
        }
    })
}
lazyload()//刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
```

问题：为什么要新建一个img对象

## 6.无缝滚动——scrollTop/srollLeft

element.scrollLeft;滚动条到元素左边的距离

实现的无缝滚动，有两种基本的思想：
第一种：通过父元素的scrollLeft/scrollTop逐渐增加来实现；
第二种：通过css3的translate来实现，这里采用的第二种；

滚动动画实现：主要运用animation动画：

```css
    @keyframes move{
			0%{transform:translateX(0px);}
			100%{transform:translateX(-2400px);}
    }
```

这里100%的时候移动的距离是你一次性想要展示的所有图片的宽度，并不是ul的宽度；

(1)方法一：当滚动到末尾，将scrollLeft设为0

(2)方法二：利用两个内容相同的div，当第一个div消失，立即让第一个div的scrollLeft为0，由于有第二个一模一样的内容，所以看起来是连续的

这里有两个div，所以当wrap.scrollLeft >= startWidth时，第一个div完全移动到框外，视图区为第二个div，此时再移#回到第一个div

(3)实例三在实例二的基础上进行了部分改进，原理相同

## 7.无缝滚动插件——seamless-scroll

注：这是一个轻量级的小插件，非常适用于跑马灯等要求不高的无缝滚动，cdn有点问题，可以将插件的js**下载到本地使用

## 8.百度索索建议API

1️⃣直接返回json数据

http://suggestion.baidu.com/?wd=关键词&action=opensearch

2️⃣json数据当做回调函数的参数传回来
http://suggestion.baidu.com/?wd=关键词

默认回调函数名是window.baidu.sug

等价于

http://suggestion.baidu.com/?wd=关键词&cb=window.baidu.sug

3️⃣http://suggestion.baidu.com/?wd=关键词&cb=自定义函数名



遇到的问题：

```javascript
fetch('http://suggestion.baidu.com/?wd='+this.value+'&action=opensearch',
    {mode: 'no-cors'})
    .then(function (res) {
         return res.json()
    })
    .then(function (res_json) {
         console.log(res_json);
    })
```

后台服务器没设cors，mode="cors"，会报错。
这个时候，你 fetch 改成了mode='no-cors' 表示不垮域，可以请求成功，单你拿不到服务器返回数据，它被标记了'opaque'，network是有请求成功的记录

针对跨域请求，cors模式是常见跨域请求实现，但是fetch自带的no-cors跨域请求模式则较为陌生，该模式有一个比较明显的特点：

该模式允许浏览器发送本次跨域请求，但是不能访问响应返回的内容，这也是其response type为opaque透明的原因。

也就是说，**这个接口后台不支持跨域请求**

解决：其他跨域方法

方法一：jsonp，success

bug1：定义jsonp方法时，传到参数对象中的回调函数的属性名必须是cb(这个例子必须是)

bug2：调用jsonp方法时，传给回调函数代表的属性名的属性值必须是一个字符串

Bug3：批量插入多个元素时，用字符串拼接的方法，只在最后插入一次

方法二：nginx反向代理(这个只适合测试页面，实际项目中不可能启动一个nginx)

原理：通过nginx配置一个代理服务器，域名与本地相同，端口不同，设置为允许跨域，本地访问代理服务器，代理服务器访问要访问的地址。因为跨域是请求结果被浏览器拦截，不是请求失败，所以用服务器发起请求就不会被拦截，服务器接受到请求结果再把结果传给本地请求即可

安装nginx：brew install nginx 

配置文件地址： /usr/local/etc/nginx/nginx.conf

启动nginx：nginx

重新启动： nginx -s reload

测试nginx语法是否错误：nginx -t

关闭nginx： nginx -s stop

bug：配置nginx时，server_name可以是自定义的域名，可以是127.0.0.1，就是不能是**localhost**

## 9.秒表计时器

注意：(1)开始计时器要加清浮动，否则每次点击都会创建一个新的计时器，造成累加效果，秒表越跑越快

​            (2)时分秒在计算之后要取余，否则会超过60/24

## 10.轮播图



## 11.tab标签页

### （1）css实现标签页：

原理：利用display:none;或者position:absolute或opacity:0;，触发时display:block;或者z-index增大，display:none;布局更简单

以下都使用display:none;

#### 方法一：利用hover选择器 

- 缺点：只有鼠标在元素上面的时候才有效果，无法实现选中和默认显示某一个的效果

HTML布局：**滑动门布局**

原因：选择器只能拿到hover元素的子元素

![image-20190527182138619](images/tab1.png)

CSS：当鼠标移动到 li 上时，li 上有新样式并且li下的div显示出来，非当前li下的div都隐藏display:none;

难点：内容div要相对于tab进行布局

```css
            .tab {
                width: 600px;
                height: 300px;
                /* background: #fcf; */
                margin: 0 auto;
                position: relative;       /*做定位父元素*/
            }

            .tab_h {
                box-sizing: border-box;
                /* background: #acf; */
            }

            .tab_h li {
                padding: 10px 0;
                float: left;
                text-align: center;
                /* height: 0; */
            }
            .tab_h li a {
                display: inline-block;
                color: #ccc;
                padding: 5px 32px;
            }

            .tab_h li:hover a {
                border-radius: 20px;
                color: #5fc4f3;
                background: springgreen;
            }
            .tab_h li > div {
                height: 50px;
                line-height: 50px;
                position: absolute;
                left: 0;
                top: 50px;
                width: 600px;
                display: none;
            }
						/*当鼠标移动到li上，lix*/
            .tab_h li:hover > div {
                display: block;
            }
```



#### 方法二：利用a标签的锚点 + :target选择器

本质：锚点

- 缺点：因为锚点会将选中的元素滚动到页面最上面，每次切换位置都要移动，体验极差。
- 首次加载没有默认值

bug：写选择器时不能只写一个:target，必须加上父选择器，否则权重不够

```css
.tab_b>div:target {
    display: block;
}
```

样式会应用到锚点指定的内容区

#### 方法三：利用label和radio的绑定关系以及radio选中时的:checked

```css
/* 匹配任意被勾选/选中的radio(单选按钮),checkbox(复选框),或者option(select中的一项) */
```

来实现效果 

- 缺点：HTML结构元素更复杂

经过实验发现第三种方法达到的效果最好。所以下面讲一下第三种实现的方法。

这种方法的写法不固定，我查资料的时候各种各样的写法都有一度让我一头雾水的。最后看完发现总体思路都是一样的，无非就是下面的几个步骤。

1. 绑定label和radio：这个不用说id和for属性绑定
2. 隐藏radio按钮：这个方法有很多充分发挥你们的想象力就可以了，我见过的方法有设置`display:none;`隐藏的、设置**绝对定位，将left设置为很大的负值**，移动到页面外达到隐藏效果、设置**绝对定位：使元素脱离文档流，然后`opacity: 0;`**设置为透明来达到隐藏效果。
3. 隐藏多余的tab页：和上面同理，还可以通过`z-index`设置层级关系来相互遮挡。
4. 设置默认项：在默认按钮上添加`checked="checked"`属性
5. 设置选中效果：利用+选择器 和 ~选择器来设置选中对应元素时下方的tab页的样式，来达到选中的效果



问题1：div相对于公共父元素ul绝对定位，如果给li设置定位，选项卡不能压在div上，原因子压父，只有同一层级的可以设置层级进行比较，所以应该在div的同一层级设置z-index，应该设置在label上

![image-20190528090607246](images/tab2.png)

**在写样式时，如果有子元素，父元素只负责位置，具体样式都设置在子元素上**，在本例中，li只负责定位，具体样式设置在子元素label上

![image-20190528092724786](images/tab3.png)

问题2：当input:checked时，label显示左，上，右边框，去背景，其他label如果显示底边框会超出1px

解决：只有当label被激活时，再让它压div，否则，让div压label

问题3：给label设置了relative，div设置了absolute；本应该后一个压前一个，但是前一个压在了后一个上

```html
<label class="test-label" for="testTabRadio3">选项卡三</label>
<div class="tab-box">33333333333333</div>
```

![image-20190528105411992](images/tab4.png)

原因待查找。。。。

解决方法：将给label设置了relative移到激活状态下，或者给给label的relative和div的absolute；设置z-index

默认堆叠效果：1️⃣平级元素-后来者居上；2️⃣**子元素压在父元素之上----子压父**

注意：①取值可以为负，取值为负时，当前元素会位于页面正常显示内容之下

​            ②z-index 是无法改变父子关系的堆叠顺序：**子元素始终压在父元素之上------子压父**

​            ③只有有定位的元素可以使用z-index，只能作用在relative、absolute、fixed定位的元素上

### （2）js实现tab切换

#### 方法一：自写版本

HTML :

```html
    <div class="tab">
        <ul class="tab_h clear">
            <li class="attention"><a href="#" class="active">关注</a></li>
            <li class="video"><a href="#">视频</a></li>
            <li class="suggession"><a href="#">推荐</a></li>
            <li class="photo_service"><a href="#">图片社</a></li>
            <li class="novel"><a href="#">小说</a></li>
            <li class="hotspot"><a href="#">热点</a></li>
        </ul>
        <div class="tab_b">
            <div class="attention_b">
                我是关注
            </div>
            <div class="video_b">
                我是视频
            </div>
            <div class="suggession_b">
                我是推荐
            </div>
            <div class="suggession_b">
                我是图片社
            </div>
            <div class="suggession_b">
                我是小说
            </div>
            <div class="hotpot_b">
                我是热点
            </div>
        </div>
    </div>
```

CSS：布局——正常文档流

​           原理：控制li对应的div的display

css关键点：样式要设置在a标签上，不能写在li上，因为：我的点击事件是绑定到公共父元素ul上的(事件代理)，由于事件冒泡，这样在触发事件的时候，实际的target会是 a 元素或 li 元素，没办法获取到target

**在写样式时，如果有子元素，父元素只负责位置，具体样式都设置在子元素上**

需要优化的地方：

```css
.tab_b>div:not(:first-child){
    display: none;
}
```

**如果用js去操作元素css属性的切换时，最好是直接操作class，而不是操作某一个具体的元素或具体的属性**

```css
.on{
		display:block;
}
```

JS：

```javascript
    // 获取元素
    var tabHead = document.querySelector('.tab_h');
    // 这是一个类数组对象
    var tabItems = tabHead.children;
    var tabBody = document.querySelector('.tab_b');
    // 这是一个类数组对象
    var tabContents = tabBody.children;
    var aObjs = document.querySelectorAll('.tab_h>li>a');
        
		// 给tab_h下的所有li绑定事件
    tabHead.onclick = function (e) {
        // e.target会为a元素或li元素，只有e.target为li时成立，所以在a上触发，应该把css写在a上，不是li
        var index = Array.prototype.indexOf.call(tabItems, e.target.parentElement); 
            
        Array.prototype.forEach.call(tabContents,function(item){
           item.style.display = 'none';
        })

        Array.prototype.forEach.call(aObjs,function(item){
            item.classList.remove('active');
        })

        tabContents[index].style.display = 'block'; 
        e.target.classList.add('active');       
    }
```

问题1：样式的切换用class ，不要用js写

```javascript
tabHead.onclick = function (e) {
     // e.target会为a元素或li元素，只有e.target为li时成立，所以在a上触发，应该把css写在a上，不是li
     var index = Array.prototype.indexOf.call(tabItems, e.target.parentElement); 
            
     Array.prototype.forEach.call(tabContents,function(item){
         item.classList.remove('on');
     })

     Array.prototype.forEach.call(aObjs,function(item){
         item.classList.remove('active');
     })

     tabContents[index].classList.add('on');
     e.target.classList.add('active');       
}
```

问题2：在移除class执行的是相同的操作，可以用一个函数来封装

问题3：如何获取一个数组或类数组对象中的值的index

> var index = Array.prototype.indexOf.call(Items, item);

最终完成版本：

```javascript
     //获取元素
     var tabHead = document.querySelector('.tab_h');
     var tabBody = document.querySelector('.tab_b');
     var aObjs = document.querySelectorAll('.tab_h>li>a');
     var tabContent = tabBody.children;
     // 给tab_h下的所有li绑定事件
     tabHead.onclick = function (e) {
         // e.target会为a元素或li元素，只有e.target为a时成立，所以在a上触发，应该把css写在a上，不是li
         var index = Array.prototype.indexOf.call(tabHead.children, e.target.parentElement);

         removeClassName(aObjs,'active')
         removeClassName(tabContent,'on')

         tabContent[index].classList.add('on');
         e.target.classList.add('active');
    }

    // 批量移除一个元素下的子元素的某个class名
     function removeClassName(eles,classN) {
         Array.prototype.forEach.call(eles,function(item){
            item.classList.remove(classN);
         })
     }
```



#### 方法二：双层for循环

```javascript
for (var i = 0; i < myLi.length; i++) {
    // 自定义属性index，这个很常用
    myLi[i].index = i;
    myLi[i].onclick = function () {
        for (var j = 0; j < myLi.length; j++) {
            myLi[j].className = "off";
            myDiv[j].className = "hide";
        }
        this.className = "on";
        myDiv[this.index].className = "show";
    }
}
```

**自定义属性**：**js可以为任何HTML元素添加任意个自定义属性，且如同元素的本来属性一样进行操作**

数组元素本身没有index属性，自定义一个，比方法一获取index方便好用

> 对比方法一盒方法二：我觉得方法二更好，逻辑清晰，代码简单

## 12.全屏滚动

**全屏滚动原理**

全屏滚动插件的实现原理是：所有滚动页面包在一个直接父级容器main中，容器及容器内的页面取当前可视区高度，同时容器的直接父级元素wrap设置 `overflow` 属性值设为 `hidden`，通过更改容器 `transform` 属性的 `translate` 或者 `top` 的值实现全屏滚动效果。

### css全屏滚动

全屏滚动分为：横屏滚动和竖屏滚动

竖屏滚动：

html：

```html
<div id="wrap">
    <div id="main">
        <div id="page1" class="page"></div>
        <div id="page2" class="page"></div>
        <div id="page3" class="page"></div>
        <div id="page4" class="page"></div>
    </div>
</div>    
```

css

```css
html,body{
    margin: 0;
    padding: 0;
    height: 100%;
/*overflow: hidden;*/
}
#wrap{
    height: 100%;
    background: #ccc;
}
#main{
    height: 100%;
    background: brown;
}
.page{
    height: 100%;
}
#page1{
    background:#E4E;
}
#page2{
    background:#6CE26C;
}
#page3{
    background:#BF4938;
}
#page4{
    background:#2932E1;
}
```

横屏滚动：

在竖屏滚动的基础上，给wrap设置width:400%;给page设置width:25%;

问题1：html的代码为什么需要两个父元素？？

这是为js做准备，第一个设置让滚动条消失，始终在视窗位置，第二个做移动容器

问题2：设置overflow:hidden;的作用是去掉滚动条，这个属性设置在哪个元素上？？？

设置在固定容器上

### JS实现全屏滚动

原理：同胶片和相机的视窗一样，wrap始终不同，main整体移动

html：

```html
<div id="wrap">
    <div id="main">
        <div id="page1" class="page"></div>
        <div id="page2" class="page"></div>
        <div id="page3" class="page"></div>
        <div id="page4" class="page"></div>
    </div>
</div>    
```

wrap块为窗口可看到的部分，我们可以通过js获取窗口可视区的大小，并为其设置overflow: hidden属性，使得窗口不出现滚动条，只显示窗口大小的一页内容；

设置main定位为relative，通过改变main块的top属性实现不同页面的切换，具体的css代码如下：

```css
html,body{
    margin: 0;
    padding: 0;
}
/**/
#wrap{
	  width: 100%;   
	  overflow: hidden;
	  background: #ccc;
    /*给wrap元素设置定高后，子元素超出父元素后，父元素wrap上回产生滚动条，如果不想要滚动条，
    设置overflow:hidden;*/
}
/**/
#main{
	  width: 100%;
	  background: #ccc;
	  position: relative;
    /*父元素的高度被子元素撑开了，height等于4个子元素高度，这里相当于胶片在相机中的移动，
    wrap始终不动，main一格一格向上或向下，*/
}
.page{
    width:100%;
    margin:0;
}
#page1{
    background:#E4E6CE;
}
#page2{
    background:#6CE26C;
}
#page3{
    background:#BF4938;
}
#page4{
    background:#2932E1;
}
```

js代码的主要部分就是对滚动事件的函数绑定，大多数浏览器提供了 **“mousewheel” 事件**，Firefox 3.5+不支持，但支持相同作用的事件：”DOMMouseScroll”；
mousewheel事件的“event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动；

DOMMouseScroll事件“event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动;

Js:

```javascript
var wrap = document.getElementById("wrap");
var main = document.getElementById("main");
var pages = document.getElementsByClassName("page");
// 视口高度
var client_height = document.documentElement.clientHeight;

// 设置包裹容器的高度为视口的高度
wrap.style.height = client_height + "px";
for(var i=0; i<pages.length; i++){
    // 每个页面的高度也为视口高度
	  pages[i].style.height = client_height + "px";
}

// 浏览器兼容性
if(navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
	  document.addEventListener("DOMMouseScroll",scrollFun);
}else if(document.addEventListener){
	  document.addEventListener("mousewheel",scrollFun,false);
}else if(document.attachEvent){
	  document.attachEvent("onmousewheel",scrollFun);
}else{
	  document.onmousewheel = scrollFun;
}

//如果不加时间控制，滚动会过度灵敏，一次翻好几屏
var startTime = 0, //翻屏起始时间  
    endTime = 0,   //翻屏结束时间 
    now = 0;       //当前main的定位top值
/*
* 第一屏时，now = 0;
* 第二屏时，now = - client_height；
* 第三屏时，now = - 2*client_height；
* 第四屏时，now = - 3*client_height；
*/

//滚动事件处理函数
function scrollFun(e){
	  startTime = new Date().getTime();
	  var event = e || window.event;
//mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
//DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
	  var dir = event.detail || -event.wheelDelta;
    // 两次滚动的时间超过1s
	  if(startTime - endTime > 1000){
      	// 如果滚轮向上滚动
		    if(dir>0 && now > -3*client_height){
			      now -= client_height; 
			      main.style.top = now +"px";
			      endTime = new Date().getTime();
        // 滚轮向下滚动
		    }else if(dir<0 && now < 0){
			      now += client_height;
			      main.style.top = now +"px";
			      endTime = new Date().getTime();
		    }
	  }
}
```

### 插件实现全屏滚动——fullpage.js

https://github.com/alvarotrigo/fullpage.js

在3.0之前，3.0之后不需要依赖jQuery，但是需要许可证，fullPage.js 是一个基于 jQuery 的插件，它能够很方便、很轻松的制作出全屏网站，主要功能有：

- 支持鼠标滚动
- 支持前进后退和键盘控制
- 多个回调函数
- 支持手机、平板触摸事件
- 支持 CSS3 动画
- 支持窗口缩放
- 窗口缩放时自动调整
- 可设置滚动宽度、背景颜色、滚动速度、循环选项、回调、文本对齐方式等等

#### 兼容性

##### jQuery 兼容

兼容 jQuery 1.7+。

##### 浏览器兼容

| ![IE](http://cdn.dowebok.com/global/ie.png)                  | ![Chrome](http://cdn.dowebok.com/global/chrome.png)          | ![Firefox](http://cdn.dowebok.com/global/firefox.png)        | ![Opera](http://cdn.dowebok.com/global/opera.png)            | ![Safari](http://cdn.dowebok.com/global/safari.png)          |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE8+ ![✔](https://s.w.org/images/core/emoji/11/svg/2714.svg) | Chrome ![✔](https://s.w.org/images/core/emoji/11/svg/2714.svg) | Firefox ![✔](https://s.w.org/images/core/emoji/11/svg/2714.svg) | Opera ![✔](https://s.w.org/images/core/emoji/11/svg/2714.svg) | Safari ![✔](https://s.w.org/images/core/emoji/11/svg/2714.svg) |

#### 使用方法

##### 1、引入文件

```html
<link rel="stylesheet" href="css/jquery.fullPage.css">
<script src="js/jquery.min.js"></script>

<!-- jquery.easings.min.js 用于 easing 参数，也可以使用完整的 jQuery UI 代替，如果不需要设置 easing 参数，可去掉改文件 -->
<script src="js/jquery.easings.min.js"></script>

<!-- 如果 scrollOverflow 设置为 true，则需要引入 jquery.slimscroll.min.js，一般情况下不需要 -->
<script src="js/jquery.slimscroll.min.js"></script>

<script src="js/jquery.fullPage.js"></script>
```

##### 2、HTML

```html
<div id="dowebok">
    <div class="section">
        <h3>第一屏</h3>
    </div>
    <div class="section">
        <h3>第二屏</h3>
    </div>
    <div class="section">
        <h3>第三屏</h3>
    </div>
    <div class="section">
        <h3>第四屏</h3>
    </div>
</div>
```

每个 section 代表一屏，默认显示“第一屏”，如果要指定加载页面时显示的“屏幕”，可以在对应的 section 加上 class=”active”，如：

```html
<div class="section active">第三屏</div>
```

同时，可以在 section 内加入 slide，如：

```html
<div id="dowebok">
    <div class="section">第一屏</div>
    <div class="section">第二屏</div>
    <div class="section">
        <div class="slide">第三屏的第一屏</div>
        <div class="slide">第三屏的第二屏</div>
        <div class="slide">第三屏的第三屏</div>
        <div class="slide">第三屏的第四屏</div>
    </div>
    <div class="section">第四屏</div>
</div>
```

##### 3、JavaScript

```javascript
$(function(){
    $('#dowebok').fullpage();
});
```

#### 配置

##### 1、选项

| 选项                              | 类型   | 默认值      |                             说明                             |
| --------------------------------- | ------ | ----------- | :----------------------------------------------------------: |
| verticalCentered                  | 字符串 | true        |                       内容是否垂直居中                       |
| resize                            | 布尔值 | false       |                  字体是否随着窗口缩放而缩放                  |
| slidesColor                       | 数组   | 无          |                         设置背景颜色                         |
| anchors                           | 数组   | 无          |                          定义锚链接                          |
| scrollingSpeed                    | 整数   | 700         |                     滚动速度，单位为毫秒                     |
| easing                            | 字符串 | easeInQuart |                         滚动动画方式                         |
| menu                              | 布尔值 | false       | 绑定菜单，设定的相关属性与 anchors 的值对应后，菜单可以控制滚动 |
| navigation                        | 布尔值 | false       |                       是否显示项目导航                       |
| navigationPosition                | 字符串 | right       |              项目导航的位置，可选 left 或 right              |
| navigationColor                   | 字符串 | #000        |                        项目导航的颜色                        |
| navigationTooltips                | 数组   | 空          |                        项目导航的 tip                        |
| slidesNavigation                  | 布尔值 | false       |                  是否显示左右滑块的项目导航                  |
| slidesNavPosition                 | 字符串 | bottom      |         左右滑块的项目导航的位置，可选 top 或 bottom         |
| controlArrowColor                 | 字符串 | #fff        |                   左右滑块的箭头的背景颜色                   |
| loopBottom                        | 布尔值 | false       |                  滚动到最底部后是否滚回顶部                  |
| loopTop                           | 布尔值 | false       |                   滚动到最顶部后是否滚底部                   |
| loopHorizontal                    | 布尔值 | true        |                     左右滑块是否循环滑动                     |
| autoScrolling                     | 布尔值 | true        | 是否使用插件的滚动方式，如果选择 false，则会出现浏览器自带的滚动条 |
| scrollOverflow                    | 布尔值 | false       |                 内容超过满屏后是否显示滚动条                 |
| css3                              | 布尔值 | false       |                是否使用 CSS3 transforms 滚动                 |
| paddingTop                        | 字符串 | 0           |                         与顶部的距离                         |
| paddingBottom                     | 字符串 | 0           |                          与底部距离                          |
| fixedElements                     | 字符串 | 无          |                                                              |
| normalScrollElements              |        | 无          |                                                              |
| keyboardScrolling                 | 布尔值 | true        |                    是否使用键盘方向键导航                    |
| touchSensitivity                  | 整数   | 5           |                                                              |
| continuousVertical                | 布尔值 | false       |  是否在垂直方向上循环滚动，与 loopTop 及 loopBottom 不兼容   |
| animateAnchor                     | 布尔值 | true        |                                                              |
| normalScrollElementTouchThreshold | 整数   | 5           |                                                              |
| sectionsColor(同slidesColor)      | 数组   | 无          |                      给每一屏设置背景色                      |

##### 2、方法

| 名称                   | 说明                                     |
| ---------------------- | ---------------------------------------- |
| moveSectionUp()        | 向上滚动                                 |
| moveSectionDown()      | 向下滚动                                 |
| moveTo(section, slide) | 滚动到                                   |
| moveSlideRight()       | slide 向右滚动                           |
| moveSlideLeft()        | slide 向左滚动                           |
| setAutoScrolling()     | 设置页面滚动方式，设置为 true 时自动滚动 |
| setAllowScrolling()    | 添加或删除鼠标滚轮/触控板控制            |
| setKeyboardScrolling() | 添加或删除键盘方向键控制                 |
| setScrollingSpeed()    | 定义以毫秒为单位的滚动速度               |

##### 3、回调函数

| 名称           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| afterLoad      | 滚动到某一屏后的回调函数，接收 anchorLink 和 index 两个参数，anchorLink 是锚链接的名称，index 是序号，从1开始计算 |
| onLeave        | 滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：index 是离开的“页面”的序号，从1开始计算；nextIndex 是滚动到的“页面”的序号，从1开始计算；direction 判断往上滚动还是往下滚动，值是 up 或 down。 |
| afterRender    | 页面结构生成后的回调函数，或者说页面初始化完成后的回调函数   |
| afterSlideLoad | 滚动到某一水平滑块后的回调函数，与 afterLoad 类似，接收 anchorLink、index、slideIndex、direction 4个参数 |
| onSlideLeave   | 某一水平滑块滚动前的回调函数，与 onLeave 类似，接收 anchorLink、index、slideIndex、direction 4个参数 |

```javascript
var myFullpage = new fullpage('#fullpage', {
  // 1.导航
  menu: '#menu',  
  //绑定菜单，设定的相关属性与 anchors 的值对应后，菜单可以控制滚动
  lockAnchors: false, 
  //（默认为false）确定URL中的锚是否在库中完全有效。 您仍然可以在函数和回调内部使用锚，但是它们在滚动网站时不起任何作用。 如果你想在URL中使用锚点来将fullPage.js和其他插件结合起来，那就很有用。
  anchors:['firstPage', 'secondPage'], 
  //定义要在每个部分的URL上显示的锚链接（#example）。 锚点的值应该是独一无二的。 数组中的锚的位置将限定锚被应用于哪些部分。
  navigation: false, 
  //如果设置为true，则会显示一个由小圆圈组成的导航栏
  navigationPosition: 'right', 
  //（默认none）可以设置为left或right，并定义导航栏显示的位置（如果使用的话）
  navigationTooltips: ['firstSlide', 'secondSlide'], 
  //（默认为[]）定义要使用导航圈的工具提示。 如果您愿意，也可以在每个部分中使用属性data-tooltip来定义它们
  showActiveTooltip: false, 
  //显示垂直导航中主动查看节的持久工具提示
   slidesNavigation: false, 
  //如果设置为true，则会显示一个导航栏，该导航栏由站点上每个横向滑块的小圆圈组成。
  slidesNavPosition: 'bottom', 
  //定义滑块的横向导航栏的位置。 值为top和bottom。

  // 2.滚动
  css3: true, 
  //是否使用 CSS3 transforms 滚动
  scrollingSpeed: 700, 
  //滚动速度，单位为毫秒
  autoScrolling: true, 
  //是否使用插件的滚动方式，如果选择 false，则会出现浏览器自带的滚动条
  fitToSection: true, 
  //确定是否section放入视窗中
  fitToSectionDelay: 1000, 
  //如果fitToSection设置为true，则延迟 以毫秒为单位
  scrollBar: false, 
  //确定是否使用站点的滚动条。 在使用滚动条的情况下，autoScrolling功能仍将按预期工作。 用户也可以使用滚动条自由滚动网站，当滚动完成时，fullPage.js将适配屏幕上的部分。
  easing: 'easeInOutCubic', 
  //定义用于垂直和水平滚动的过渡效果。
  easingcss3: 'ease', 
  //定义在使用css3：true的情况下使用的过渡效果。
  loopBottom: false, 
  //滚动到最底部后是否滚回顶部
  loopTop: false, 
  //滚动到最顶部后是否滚底部
  loopHorizontal: true, 
  //定义水平滑块是否在到达上一张或上一张幻灯片后循环
  continuousVertical: false, 
  //是否循环滚动，与 loopTop 及 loopBottom 不兼容
  normalScrollElements: '#element1, .element2',
  //如果你想在滚动某些元素时避免自动滚动，这是你需要使用的选项
  scrollOverflow: false, 
  //内容超过满屏后是否显示滚动条
  touchSensitivity: 15, 
  //定义浏览器窗口宽度/高度的百分比，以及滑动到下一个节/幻灯片必须测量的距离
  normalScrollElementTouchThreshold: 5, 
  //定义html节点树的跳数阈值,Fullpage将测试normalScrollElements是否匹配，以允许在触摸设备上的div的滚动功能。
  bigSectionsDestination: null, 
  //定义如何滚动到比视口大的部分。 默认情况下，如果您来自目的地上方的部分，fullPage.js将滚动到顶部，如果您来自目的地之下的部分，则会滚动到底部。 可能的值是top，bottom，null。

  // 3.可访问
  keyboardScrolling: true, 
  //定义是否可以使用键盘浏览内容
  animateAnchor: true, 
  //定义给定锚点（＃）的站点的负载是否会随着动画滚动到其目的地或直接加载给定部分
  recordHistory: true, 
  //定义是否将网站的状态推送到浏览器的历史记录。 设置为true时，网站的每个部分/幻灯片将作为新页面，浏览器的后退和前进按钮将滚动部分/幻灯片以达到网站的上一个或下一个状态。 当设置为false时，URL将保持更改，但不会影响浏览器的历史记录。 使用autoScrolling：false时，该选项会自动关闭。

  // 4.设计
  controlArrows: true, 
  //确定是否将幻灯片的控制箭头向右或向左移动
  verticalCentered: true, 
  //在段落内部垂直居中。 当为true时，您的代码将被库包装。可考虑使用委托或在afterRender回调中加载其他脚本
  sectionsColor : ['#ccc', '#fff'],
  //为每个部分定义CSSbackground-color属性
  paddingTop: '3em', 
  //与顶部的距离
  paddingBottom: '10px', 
  //与底部距离
  fixedElements: '#header, .footer', 
  //定义当使用css3选项保持固定时，哪些元素将从插件的滚动结构中移除。 它需要一个字符串与这些元素的Javascript选择器。 （例如：fixedElements：'＃element1，.element2'）
  responsiveWidth: 0, 
  //一个正常的滚动（autoScrolling：false）将在定义的宽度下以像素为单位使用。 如果用户希望将自己的响应式CSS用于身体标记，则会将fp-responsive类添加到身体标记中。 例如，如果设置为900，则每当浏览器的宽度小于900时，插件将像正常站点一样滚动。
  responsiveHeight: 0, 
  //一个正常的滚动（autoScrolling：false）将在定义的高度下以像素为单位使用。 如果用户希望将自己的响应式CSS用于身体标记，则会将fp-responsive类添加到身体标记中。 例如，如果设置为900，则每当浏览器的高度小于900时，插件将像正常站点一样滚动。

  // 4.自定义选择器
  sectionSelector: '.section', 
  //定义用于插件部分的Javascript选择器。 有时可能需要更改，以避免与使用与fullpage.js相同的选择器的其他插件的问题。
  slideSelector: '.slide', 
  //定义用于插件幻灯片的Javascript选择器。 有时可能需要更改，以避免与使用与fullpage.js相同的选择器的其他插件的问题。

  lazyLoading: true, 
  //延迟加载默认是激活的，这意味着它会延迟加载包含属性data-src的任何媒体元素

  // 5.事件
  onLeave: function(index, nextIndex, direction){},
  //滚动前的回调函数，接收 index、nextIndex 和 direction 3个参数：index 是离开的“页面”的序号，从1开始；nextIndex 是滚动到的“页面”的序号，从1开始计算；direction 判断往上滚动还是往下滚动，值是 up 或 down。
  afterLoad: function(origin, destination, direction){}, 
  //滚动结束之后，一旦加载了节，就会触发回调。
  afterRender: function(){}, 
  //这个回调在页面结构生成后立即被触发,这是用来初始化其他插件的回调函数，或者触发任何需要文档准备就绪的代码
  afterResize: function(width, height){},
  //调整浏览器窗口大小后，会触发此回调。
  afterResponsive: function(isResponsive){}, 
  //在fullpage.js从正常模式变为响应模式或从响应模式变为正常模式之后，此回调将被触发
  afterSlideLoad: function(section, origin, destination, direction){}, 
  //滚动结束后，加载一个section的幻灯片后触发回调。
  onSlideLeave: function(section, origin, destination, direction){} 
  //一旦用户离开幻灯片转到另一个幻灯片，就会触发此回调。返回false将在移动发生之前取消移动。
});
```

##### 延迟加载

fullPage.js提供了一种延迟加载图像、视频和音频元素的方式，这样它们不会减慢网站的加载速度，也不会浪费数据传输。 当使用延迟加载时，所有这些元素只有在进入视口时才会加载。 要启用延迟加载，您只需将src属性更改为data-src，如下所示：

```html
<img data-src="image.png">
<video>
    <source data-src="video.webm" type="video/webm" />
    <source data-src="video.mp4" type="video/mp4" />
</video>
```

如果您已经使用另一个使用data-src的延迟加载解决方案，则可以通过设置 `lazyLoading: false`选项来禁用fullPage.js延迟加载。

##### 自动播放

对于视频或音频使用属性 autoplay，或者对于youtube iframe使用参数autoplay=1将使得在加载页面时播放媒体元素。 在段落/幻灯片载入使用而不是属性data-autoplay播放。 例如：

```html
<audio data-autoplay>
    <source src="http://metakoncept.hr/horse.ogg" type="audio/ogg">
</audio>
```

##### 暂停

嵌入式HTML5<video>/<audio>和Youtube iframe在离开某个段落或幻灯片时自动暂停。 可以通过使用属性data-keepplaying来禁用。 例如：

```html
<audio data-keepplaying>
    <source src="http://metakoncept.hr/horse.ogg" type="audio/ogg">
</audio>
```

此外，fullpage.js还可以使用扩展插件，更多详情请查看fullpage.js项目官网

### bootstrap实现滚动监听---scrollspy.js

## 13.模态框

### 遮罩层布局

#### 方法一：传统方法(增加额外元素)

增加一个额外的HTML元素用于遮挡背景

```html
<div class="overlay"></div>
<div class="lightbox">
    <div class="title">提示</div>
    <div class="content">即将推出，敬请期待</div>
    <div class="i_know">我知道了</div>
</div>
```

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,.8);
}
.lightbox { /*需要引起用户注意的元素*/
  width: 300px;
  height: 200px;
  background: red;
  /*相对于body定位*/
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -100px;
}
.lightbox:after{
  content: "×";
  width: 30px;
  height: 30px;
  background-color: black;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  position: absolute;
  top: -1rem;
  right: -1rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

lightbox盒子放在mask遮罩层之后，压在mask上

这个方法的优点：稳定可靠，缺点：需要增加额外的HTML。

#### 方法二：子压父

```html
<div class="mask">
    <div class="warn">
        <div class="title">提示</div>
        <div class="content">即将推出，敬请期待</div>
        <div class="i_know">我知道了</div>
    </div>
</div>
```

根据子压父原理，不需要设置层级关系

**该方法的特点是遮罩层和弹出框无法滚动，但是页面的内容可以滚动。**

如果想要出现遮罩层和弹框时页面禁止滚动，则可以使用如下方式：

**1、在pc端可以给body设置overflow:hidden;**

**2、在移动端则需要给遮罩层加一个在touchmove时禁止浏览器默认行为的操作：**

```javascript
$('.mask').on("touchmove",function(e){
    e.preventDefault();
});
```

#### 方法三：target方法

https://developer.mozilla.org/en-US/docs/Web/CSS/:target

**传统方法+target**

html

```html
<ul>
  <li><a href="#example1">Open example #1</a></li>
  <li><a href="#example2">Open example #2</a></li>
</ul>

<div class="lightbox" id="example1">
  <figure>
    <a href="#" class="close"></a>
    <figcaption>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec felis enim, placerat id eleifend eu, semper vel sem.</figcaption>
  </figure>
</div>

<div class="lightbox" id="example2">
  <figure>
    <a href="#" class="close"></a>
    <figcaption>Cras risus odio, pharetra nec ultricies et,
      mollis ac augue. Nunc et diam quis sapien dignissim auctor.
      Quisque quis neque arcu, nec gravida magna.</figcaption>
  </figure>
</div>
```

css

```css
/* Unopened lightbox */
.lightbox {
  display: none;
}

/* Opened lightbox */
.lightbox:target {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Lightbox content */
.lightbox figcaption {
  width: 25rem;
  position: relative;
  padding: 1.5em;
  background-color: lightpink;
}

/* Close button */
.lightbox .close {
  position: relative;
  display: block;
}

.lightbox .close::after {
  width: 2rem;
  height: 2rem;
  background-color: black;
  border-radius: 50%;
  color: white;
  content: "×";
  cursor: pointer;
  position: absolute;
  top: -1rem;
  right: -1rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Lightbox overlay */
.lightbox .close::before {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,.7);
  content: "";
  cursor: default;
}
```

效果图：

![img](images/遮罩1.png)

### 模态框实例

传统方法 