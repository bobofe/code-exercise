## 0.补充知识

### (1)网站logo部分的布局+样式

html:

将网站名称用h1包起来有利于搜索引擎，但是显示文字不美观，要用图片代替文字，同时隐藏文字

```html
    <div class="logo">
        <h1>
            <a href="">
                淘宝网
            </a>
        </h1>
    </div>
```

css：显示图片+隐藏文字

方法一

```css
.logo h1 a{
     display: block;
     width: 142px;
     height: 0;
     padding-top: 58px;
     background: url("images/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png") 0 0 no-repeat;
     overflow: hidden;
}
```

网上用的最多的方法，设置后文字溢出，截掉溢出后文字不显示

方法二

```css
.logo h a{
     display: block;
     width: 142px;
     height: 58px;
     background: url("images/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png") 0 0 no-repeat;
     text-indent: -9999px;
     outline:none; /* 解绝FF下有一个虚框的问题*/
}
```

**最佳方案**

## 1.网站分析

分为三个部分：

1.导航头

2.六个page组成的内容区

3.footer

## 2.导航头

分为左右两个部分，左边一个logo，右边一个导航

## 3.六个page组成的内容区

