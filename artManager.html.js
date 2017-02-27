var mainClass = (function () {
    var uid;
    var thisGrid = $("#wzGrid");
    var thisGrid1 = $("#plGrid");
    var editIndex;
    
    var init = function () {
        thisGrid.datagrid({
            onLoadSuccess:function(data){
                thisGrid.datagrid("selectRow",0)
            },
            onSelect:function(rowIndex, rowData){
                getPl(rowData.id);
                editIndex = index;
            }
        })
        bindEvents();
        doPost();
    }
    /*绑定事件*/
    var bindEvents = function(){
        $("#linkEdit").bind('click',function(){
            //alert(0)
            var rows = thisGrid.datagrid("getSelected");
            if(rows==''||rows==undefined){
                alert("请选择需要修改的文章");
                return
            }
            window.location.href = "./modifyArt.html?id=" + rows.id;
        })
        $("#linkDel").bind('click',function(){
            var rows = thisGrid.datagrid('getSelected');
            if(rows==''||rows==undefined){
                alert("请选择需要删除的文章");
                return;
            }
            delArt(rows.id);
        })
    }
    /*验证登录状态*/
    var doPost = function () {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=vali"
            , dataType: "json"
            , success: function (data) {
                if (data[0].sec == 1) {
                    uid = data[0].uid;
                    if (uid == "" || uid == undefined) {
                        alert(0)
                    }
                    else{
                        getArt(uid)
                    }
                }
                //alert('成功')
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    /*获取文章*/
    var getArt = function(userid){
        $.ajax({
            type: "POST"
            , url: "./server/artManager.php?action=getart"
            , dataType: "json"
            ,data:{
                "uid":userid
            }
            , success: function (data) {
                thisGrid.datagrid('loadData',data);
                //alert('成功')
            }
            , erro: function () {
                alert('失败')
            }
        });
    }
    /*获取评论*/
    var getPl = function(artid){
        $.ajax({
            type: "POST"
            , url: "./server/artManager.php?action=getpl"
            , dataType: "json"
            ,data:{
                "uid":artid
            }
            , success: function (data) {
                if(data[0].sec==-1){
                    thisGrid1.datagrid('loadData',[]);
                    return
                }
                thisGrid1.datagrid('loadData',data);
                //alert('成功')
            }
            , erro: function () {
                alert('失败')
            }
        });
    }
    /*删除文章*/
    var delArt = function(aid){
        $.ajax({
            type: "POST"
            , url: "./server/artManager.php?action=del"
            , dataType: "json"
            ,data:{
                "aid":aid
            }
            , success: function (data) {
                if(data[0].sec==1){
                    alert("删除成功");
                    return
                }
                if(data[0].sec==-1){
                    alert("删除失败");
                    return
                }
            }
            , erro: function () {
                alert('失败')
            }
        });
    }
    init();
}())