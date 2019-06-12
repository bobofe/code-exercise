//事件绑定方法
function bind(el, eventType, callback){
    if(typeof el.addEventListener === 'function'){
        //标准事件绑定方法
        el.addEventListener(eventType, callback, false);
    }else if(typeof el.attechEvent === 'function'){
        //IE事件绑定方法
        el.attachEvent('on' + eventType, callback);
    }
}

//鼠标悬停的处理函数
function mouseoverHandler(e){
    var target = e.target || e.srcElement;
    var outer = document.getElementById('.accordion');
    var list = document.querySelectorAll('li');

    //清空所有LI元素的class
    for(var i = 0; i < list.length; i++){
        list[i].className = '';
    }

    console.log('-----------')
    console.log('这是event.target')
    console.log(event.target);
    console.log('这是this')
    console.log(this);
    console.log('这是event.currentTarget')
    console.log(event.currentTarget);
    console.log(event.target.parentNode);
    //根据事件的冒泡原理，找到需要变更class 的LI元素
    // while(target.tagName != 'LI'){
    //     target = target.parentNode;
    //     console.log(target);
    // }

    // target.className = 'big';
    this.className = 'big';
}

function initList(){
    //取得外部元素
    var outer = document.getElementById('.accordion');
    //取得每个列表项
    var list = document.querySelectorAll('li');
    for(var i =0; i < list.length; i++){
        //对每个列表绑定鼠标悬停事件的监听
        bind(list[i],'mouseover',mouseoverHandler);
    }
}

//执行初始化函数
initList();