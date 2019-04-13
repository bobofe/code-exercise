## 思路
点击按钮，将input框的内容添加到ul下的li中

1.数据和view之间不产生直接关系

遇到的问题：

①control.init的作用？

②view.init的作用？

③事件绑定函数定义在哪里？

解决：

①control.init中执行view.init()

②view.init中获取元素，给元素绑定事件，页面初始化

③事件处理函数定义在view.init中，在页面初始化时就执行了绑定
事件处理函数成为了触发页面渲染的新的操作点


