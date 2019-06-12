function accordion() {
    var Div = document.getElementById('c');
    var Divs = Div.getElementsByTagName('p');
    // 定时器
    var t = null;
    for(var i = 0; i < Divs.length; i++) {
        Divs[i].index = i;
        Divs[i].onmouseover = function() {
            var index = this.index;
            // 进来先清计时器
            if(t) {
                clearInterval(t);
            }
            
            t = setInterval(function() {
                var iWidth = 500;
                for(i = 0; i < Divs.length; i++) {
                    if(index != Divs[i].index) {
                        var iSpeed = (20 - Divs[i].offsetWidth) / 5;
                        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                        Divs[i].style.width = Divs[i].offsetWidth + iSpeed + 'px';
                        iWidth -= Divs[i].offsetWidth;
                    };
                };
                Divs[index].style.width = iWidth + 'px';
            }, 30);
        };
    }
}
accordion();