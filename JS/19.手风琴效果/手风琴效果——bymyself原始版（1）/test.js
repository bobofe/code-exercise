//鼠标移动到谁身上，谁的宽度就变宽
(function ac() {
    var c = document.querySelector('.c');
    var ps = document.querySelectorAll('div p');
    for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        // 
        var flag = true;
        // 点击p元素的时候，如果当前元素的宽度等于100，不做任何改变
        // 如果当前元素的宽度小于100，将当前元素的宽度增加100，同时将兄弟元素中宽度为100的减小到20
        p.onclick = move;
    }

    function move() {
        var style = getComputedStyle(this);
        var max;
        Array.prototype.forEach.call(this.parentNode.children, element => {
            if (getComputedStyle(element).width == '100px') {
                max = element;
            }
        });
        // 用offsetWidth 优于 width
        if (parseInt(style.width) < 100) {
            var step = 5;
            var that = this;
            var timer1 = setInterval(function () {
                that.style.width = parseInt(style.width) + step + 'px';
                max.style.width = parseInt(getComputedStyle(max).width) - step + 'px'
                if (parseInt(style.width) == 100 && parseInt(max.style.width) == 20) {
                    clearInterval(timer1)
                }
            }, 50)
        }
    }
})()