var mainClass = (function () {
    var url = window.location.href;
    var ULeows;
    var aid;
    //初始化
    var init = function () {
        var rows = url.split('?type=');
        aid = rows[1];
        if (aid == '' || aid == undefined) {
            window.location.href = "./404.html";
            return
        }
        getDjs();
        appendZj();
        doPost(aid);
        getGrxx()
        doGetPl(aid);
        bindEvents();
    }
    //绑定事件
    var bindEvents = function () {
        $("#addpl").bind('click', function () {
            var wzid = url.split('?type=')[1];
            if (wzid == '' || wzid == undefined) {
                alert("错误，请刷新后重试！");
                return
            }
            var plnr = $("#pl").val();
            if (plnr == '' || plnr == undefined) {
                alert('评论内容不能为空！');
                return;
            }
            doSent(plnr, wzid);
        });
        $("#addNew").bind('click', function () {
            window.open("./editart.html")
        });
    }
    //增加点击数
    var getDjs = function () {
        $.ajax({
            type: "POST"
            , url: "./server/artic_load.php?action=getdjs"
            , dataType: "json"
            , data: {
                "articid": aid
            }
            , success: function (data) {
                a = data[0].ydcs;
                a = parseInt(a) + 1;
                addDjs(a);
            }, erro: function () {
                alert(0)
            }
        });
    }

    var addDjs = function (djs) {
        $.ajax({
            type: "POST"
            , url: "./server/artic_load.php?action=adddjs"
            , dataType: "json"
            , data: {
                "articid": aid,
                "djs": djs
            }
            , success: function (data) {
                if (data[0].sec == 1) {
                    a = data[0].ydcs;
                    //alert("获取点击次数成功")
                } else {
                    alert("获取点击次数失败")
                }


            }, erro: function () {
                alert(0)
            }
        });
    }
    //请求后台
    var doPost = function (aid) {
        $.ajax({
            type: "POST"
            , url: "./server/artic_load.php?action=load"
            , dataType: "json"
            , data: {
                "articid": aid
            }
            , success: function (data) {
                if (data[0].sec == -2) {
                    window.location.href = "./404.html";
                    return
                }
                $("#title").append(data[0].wzbt);
                $("#zuoZhe").append(data[0].uasername);
                $("#ydCs").append(data[0].ydcs);
                $("#fbSj").append(data[0].fbsj);
                $("#wzsrc").html(data[0].src);
                $("#wzNr").append(data[0].wznr);
                document.title = data[0].wzbt;
            }
            , erro: function (err) {
                alert("发生未知错误，请重试");
                return
            }
        });
    }

    var getGrxx = function () {
        $.ajax({
            type: "POST"
            , url: "./server/getgrxx.php?action=getgrxx"
            , dataType: "json"
            //, data: {
            //    "uaserid": usrId
            //}

            , success: function (data) {
                if (data[0].sec == -1) {
                    $("#yhName_right").append("<a href='./login.html'>请登录" + "</a><br/>");
                    $("#navself").append("<li><a href='./login.html'>请登录</a></li>")
                    $("#btnMenu2").show();

                    return
                } else {
                    $("#yhName_right").append(data[0].uasername + "<br/>");
                    $("#nickname").append(data[0].nickname + "<br/>");
                    $("#adress").append("成都");
                    $("#zhiwei").append("web前端工程师");
                    $("#navself").append("<li><a href='./server/logout.php'>退出登录</a></li>")
                    $("#btnMenu1").show();
                }

            }
            , erro: function () {
                //alert("获取用户信息失败；请刷新或重新登录")
                $("#yhName_right").append("<a href='./login.html'>请登录" + "</a><br/>");
            }
        });
    }
    var doGetPl = function (wzid) {
        $.ajax({
            type: "POST"
            , url: "./server/artic_load.php?action=getpl"
            , dataType: "json"
            , data: {
                "wzid": wzid
            ,
            }
            , success: function (data) {
                //$("#plmk").append()
                for (var i in data) {
                    if (i == data.length - 1) {
                        $("#plmk").append(ULrows[0] + ">" + data[i].uasername + ULrows[1] + ">" + data[i].plnr + ULrows[2] + ">" + ULrows[3]);
                        return
                    }
                    $("#plmk").append(ULrows[0] + ">" + data[i].uasername + ULrows[1] + ">" + data[i].plnr + ULrows[2] + ">" + ULrows[3] + "<hr class='hr' />");
                }
            }
            , erro: function (err) {
                alert("发生未知错误，请重试");
                return
            }
        });
    }
    //提交评论
    var doSent = function (plnr, wzid) {
        $.ajax({
            type: "POST"
            , url: "./server/artic_load.php?action=sent"
            , dataType: "json"
            , data: {
                "plnr": plnr
                , "wzid": wzid
            ,
            }
            , success: function (data) {
                if (data.sec == -1) {
                    var mymessage = confirm("登录后才能添加评论，是否登录？");
                    if (mymessage == true) {
                        window.location.href = "./login.html";
                        return
                    }
                    else {
                        return
                    }
                }
                if (data.sec == -2) {
                    window.location.href = "./404.html";
                    return
                }
                window.location.href = "./artic.html?type=" + aid;
            }
            , erro: function (err) {
                alert("发生未知错误，请重试");
                return
            }
        });
    }
    var appendZj = function () {
        var ul = "<div><h4><a id></a></h4><h5 id></h5><h5 id>2016/10/12</h5></div>";
        var hx = "<hr class='hr' />"
        ULrows = ul.split('id>');
    }
    init();
}())