
/*回到顶部*/
function gotoTop(acceleration, stime) {
    acceleration = acceleration || 0.1;
    stime = stime || 10;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;

    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));

    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speeding = 1 + acceleration;
    window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));

    // 如果距离不为零, 继续调用函数
    if (x > 0 || y > 0) {
        var run = "gotoTop(" + acceleration + ", " + stime + ")";
        window.setTimeout(run, stime);
    }
}

function showTips(arry) {
    alert(arry.title + arry.content);
}
/*
arry为传入的数组属性，属性包括：top,left,width,height,title,
obj ...dialog对象
closable ...是否显示关闭按钮
*/
function dialog(arry) {
    var width, height, top, left, title, obj, closable, str;
    if (arry == undefined) {
        width = 260;
        height = 160;
        top = $(window).height()/2 - 80;
        left = $(window).width()/2 - 130;
    } else {
        if (arry.width == undefined) {
            width = 260;
        } else {
            width = arry.width;
        }
        if (arry.height == undefined) {
            height = 160;
        } else {
            height = arry.height;
        }
        if (arry.top == undefined) {
            top = $(window).height()/2 - 80;
        } else {
            top = arry.top;
        }
        if (arry.left == undefined) {
            left = $(window).width()/2 - 130;
        } else {
            left = arry.left;
        }
    }
    str = "<div style='width:" + width + "px;height:" + height + "px;position: absolute" + ";left:" + left + "px;top:" + top + "px;background-color: black;'>123</div>"
    $('body').append(str)
}

$.fn.myFunction = function () {
    return $(this).addClass('changed');
}