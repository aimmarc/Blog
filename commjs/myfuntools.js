$.fn.setValue = function (value) {
    if (value == undefined) { return}
    return $(this).val(value);
}
/*select方法*/
$.fn.select = function (fun, parameter, arry) {
    var text, value;
    if (arry != undefined) { text = arry.text; value = arry.value }
    //加载数据
    if (fun == 'loadData') {
        var str = '';
        for (var i in parameter) {
            str += "<option value=\"" + parameter[i][value] + "\" >" + parameter[i][text] + "</option>"
        }
        return $(this).html(str);
    }
    //获取选中
    if (fun == 'getSelected') {
        var value = $(this).find("option:selected").val();
        var text = $(this).find("option:selected").text();
        return {value:value,text:text};
    }
    //设置选中
    if (fun == 'setValue') {
        var count = $(this).get(0).options.length;
        for (var i = 0; i < count; i++) {
            if ($(this).get(0).options[i].text == parameter) {
                $(this).get(0).options[i].selected = true;
                break;
            }
        }
    }
}
/*form 方法*/
$.fn.form = function (fun, arry) {
    //加载数据
    if (fun == 'loadData') {
        var options = $(this).find("input");
        for (var key in arry) {
            for (var j in options) {
                if (options[j].name == key) {
                    $(this).find("[name=" + options[j].name + "]").val(arry[key]);
                }
            }
        }
    }
    //获取数据
    if (fun == 'getData') {
        var options = $(this).find("input");
        var arry = {};
        for (var i = 0; i < options.length; i++) {
            arry[options[i].name] = $(this).find("[name=" + options[i].name + "]").val()
        }
        return arry;
    }
}
