## 基础功能思路
点击按钮，将input框的内容添加到ul下的li中

1、数据和view之间不产生直接关系

遇到的问题：

①control.init的作用？

②view.init的作用？

③事件绑定函数定义在哪里？

解决：

①control.init中执行view.init()

②view.init中获取元素，给元素绑定事件，页面初始化

③事件处理函数定义在view.init中，在页面初始化时就执行了绑定
事件处理函数成为了触发页面渲染的新的操作点

2、优化view.init()

view.init中主要是获取元素，不执行DOM操作,DOM操作在render中完成

3、数据操作都在control中完成，control中改变数据需要反映在data中

4、页面刷新问题
直接给button绑定事件会触发表单提交，导致重新刷新页面
解决：给button加上type="button"即可。

## 优化思路

MVC：

+ M：model——数据模型，包括来自服务器和自来用户的数据
+ V：view——视图，包括一切DOM元素
+ C：control——控制器

数据部分model

①**init(initNotes)**

将数据存储在一个数组中：[]

因为localstorage只能操作string类型的存储，所以需要对[]进行序列化;

**向localStorage中存储操作string，更改[]中的数据操作JSON**

localstorage.setItem("notes","[]");或localstorage.notes = JSON.stringify([]);

逻辑：如果localstorage.note无值，初始化localstorage.setItem("notes","[]");

②**set(addNote)**

③**getAll(AllNotes)**







