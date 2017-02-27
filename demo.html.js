var mainClass = (function () {
    var myForm = $("#loginForm");
    //var obj = [{ username: '123', password: '123' }];
    //for (var key in obj) {
    //    alert("Key是:" + key);
    //    alert("对应的值是:" + obj[key]);
    //}
    var myData = { username: '123', password: '123' };
    myForm.form('loadData', myData);
    var getData = myForm.form('getData');
    var key = 'abc';
    var obj = { key: '值' }; // 好奇一下，你为什么会用 oBj 这么奇葩的大小写方式？

    // 复制原来的值
    obj[key] = obj['key'];
    // 删除原来的键
    delete obj['key'];
    // 检查效果
    alert(obj.abc);
    //var aa = getData
})()