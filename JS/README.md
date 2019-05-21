#### 1.getBoundingClientRect()

#### 2.获得鼠标的位置信息

#### 3.防抖

#### 4.节流

#### 5.懒加载

JavaScript 类数组对象

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

#### 6.无缝滚动——scrollTop/srollLeft

element.scrollLeft;滚动条到元素左边的距离

实现的无缝滚动，有两种基本的思想：
第一种：通过父元素的scrollLeft/scrollTop逐渐增加来实现；
第二种：通过css3的translate来实现，这里采用的第二种；

滚动动画实现：主要运用animation动画：

```
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