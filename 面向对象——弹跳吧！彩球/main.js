/**
 * @time 2019/5/22
 * @file 弹跳小球初级
 * @author lsb
 */


/**
 *准备工作
 */
// 设定画布
const canvas = document.querySelector('canvas');
// 画布上下文
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


/**
 * 生成随机数的函数
 * @param min 最小值
 * @param max 最大值
 * @returns {*}
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * 生成随机颜色的函数
 * @returns {string}
 */
function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}

/**
 * 需求：
 * 1，需要一个小球，draw方法
 * 2.小球会动，有速度，有左边，update方法事实更新小球的速度和位置
 * 3.小球碰了之后怎么办，collisionDetect，碰撞的小球都改变颜色
 */

/**
 * @param x 小球在屏幕中的初始横坐标，范围为 0-width
 * @param y 小球在屏幕中的初始纵坐标，范围为 0-width
 * @param velX 小球的水平速度
 * @param velY 小球的垂直速度
 * @param size 小球的半径
 * @param color 小球的颜色
 * @constructor 生成一个小球的构造函数
 */
function Ball(x, y, velX, velY, color,size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;
}


Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}


/**
 *检查小球的 x 坐标是否大于画布的宽度（小球会从右边缘离开）。
 *检查小球的 x 坐标是否小于0（小球会从左边缘离开）。
 *检查小球的 y 坐标是否大于画布的高度（小球会从下边缘离开）。
 *检查小球的 y 坐标是否小于0（小球会从上边缘离开）。
 */
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}


Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }
        }
    }
}

var balls = [];


/**
 * 使用 requestAnimationFrame() 方法再运行一次函数 —— 当一个函数正在运行时传递相同的函数名，
 * 从而每隔一小段时间都会运行一次这个函数，这样我们可以得到一个平滑的动画效果。这主要是通过递归
 * 完成的 —— 也就是说函数每次运行的时候都会调用自己，从而可以一遍又一遍得运行。
 */
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 100) {
        var ball = new Ball(
            random(0,width),
            random(0,height),
            random(-7,7),
            random(-7,7),
            randomColor(),
            random(10,20)
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();