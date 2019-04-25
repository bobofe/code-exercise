# 瀑布流

案例：蘑菇街、美丽说

特点：等宽不等高

实现方法：

+ JavaScript原生方法
+ JQuery方法
+ CSS3多栏布局

## JavaScript原生方法

HTML布局：

```html
<div class="main">
    <div class="box">
        <div class="pic">
            <img alt="我是图片">
        </div>
    </div>
</div>
```

CSS：

```css
.main{
    position:relative;
}
.box{    
    paddign:15px 0 0 15px;
}
```

main盒子作为最外层的盒子，除了包裹作用，为box的绝对定位设置定位父元素。

box盒子：设置padding，因为

## JQuery方法

## CSS3多栏布局