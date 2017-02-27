var ListRows;
var indexClass = (function () {
    //dialog({
    //    top:100
    //});
    var formRows;
    var isYema = 0;
    /*初始化*/
    var init = function () {
        $("#index").addClass("active");
        $("#btnMenu1").hide();
        $("#btnMenu2").hide();
        $("#backTop").hide();
        var url = window.location.href;
        var urlRow = url.split("=");
        var isLogin;
        isLogin = urlRow[1];
        $('#myCarousel').carousel({
            interval: 4000
        });
        Post();
        getGrxx();
    }
    var bindEvents = function () {
        $("#loGin").bind('click', function () {
            window.location.href = "./login.html";
        });
        $("#addNew").bind('click', function () {
            window.open("./editart.html")
        });
        $("#backTop").bind('click', function () {
            gotoTop(); return false;
        });
        /*页面滚动事件*/
        window.onscroll = function () {
            var top = document.body.scrollTop;
            if (top >= 200) {
                $("#backTop").show();
            }
            else { $("#backTop").hide(); }
        };
        $("#backTop").hover(function () {
            $("#bktopIMG").attr('src', "images/bktop(1).png");
        }, function () {
            $("#bktopIMG").attr('src', "images/bktop.png");
        });
        $("#guany").hover(function () {
            $("#navself").show();
            $("#usericon").attr('src', "images/user(1).png");
            $("#guany").addClass("active");
        }, function () {
            $("#navself").hide();
            $("#usericon").attr('src', "images/user.png");
            $("#guany").removeClass("active");
        });
        $("#guany").bind('click', function () {
            $("#guany").removeClass("active");
            $("#usericon").attr('src', "images/user(1).png");
        })
    }

    /*请求后端*/
    var Post = function () {
        $.ajax({
            type: "POST"
            , url: "./server/loading.php?action=loadAdmin"
            , dataType: "json"
            //, data: {
            //    "uaserid": usrId
            //}

            , success: function (data) {
                getRightList(data);
                ListRows = data;
                var addForm = [];
                var ys = Math.ceil(data.length / 10);
                fenYe(ys);
                //if (data.success == 1) {
                if (data[0].sec == -1) {
                    //alert(0)
                    //$("#mainPanel").append("<h1 style='margin:60px;margin-buttom:30px'>欢迎，这里没有任何内容</h1><p style='margin-left:60px'>如果你想发现更多精彩，请切换版块或" + "<a href='" + "./login.html'>登录</a>" + "</p>");
                    $("#yhName_right").append("<a href='./login.html'>请登录" + "</a><br/>");
                    $("#wznr").val(data[0].wznr);
                    appendForm();
                    var addForm = [];
                    var id = "id=";
                    $("#mainPanel").append("<div id='wzList'></div>");
                    $("#yema1").click();
                    $("#btnMenu2").show();
                    return
                }
                $("#wznr").val(data[0].wznr);
                appendForm();
                var addForm = [];
                var id = "id=";
                $("#mainPanel").append("<div id='wzList'></div>");
                $("#yema1").click();

                return true;
            }
            , error: function () {
                $("#mainPanel").append("<h1 style='margin:60px;margin-buttom:30px'>欢迎，这里没有任何内容</h1><p style='margin-left:60px'>如果你想发现更多精彩，请切换版块");
                $("#yhName_right").append("<a href='./login.html'>请登录" + "</a><br/>");
                $("#btnMenu1").show();
                return
            }
        })
    }
    /*加载右边的列表*/
    var getRightList = function (data) {
        var str = '';
        for (var i = 0; i < 7; i++) {
            if (data[i].ydcs >= 4) {
                if (i != 6) {
                    str = str + "<div style='float:left;width:20%;margin-top:3px'><img src='./images/SignUp.png' style='width: 55px; margin: 0; height: 40px; float: left; border-radius: 2px;'></div><div style='float:left;width:80%;height:40px, margin-left=10px'><a class='logo_font' style='font-size:16px' href='./artic.html?type=" +
                                        data[i].id + "'>" +
                                        data[i].wzbt.slice(0, 30) +
                                        "</a></div>" + "<hr style='width:85%;padding-left:20%;margin-right:-15px;margin-top:10px;margin-bottom:10px;float:right'>"
                } else {
                    str = str + "<div style='float:left;width:20%;margin-top:3px'><img src='./images/SignUp.png' style='width: 55px; margin: 0; height: 40px; float: left; border-radius: 2px;'></div><div style='float:left;width:80%;height:40px'><a class='logo_font' style='font-size:16px' href='./artic.html?type=" +
                        data[i].id + "'>" +
                        data[i].wzbt.slice(0, 30) +
                        "</a></div>"
                }
            }
            
        }
        $("#sonPanel").html(str)
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
                    $("#logedName").append('请登录');
                    $("#logedName").attr('href','./login.html');
                    return
                } else {
                    $("#logedName").append(data[0].nickname);
                    $("#grzy").attr('href', './myself.html');
                    $("#navself").append("<li><a href='./server/logout.php?action=index'>退出登录</a></li>");
                }

            }
            , erro: function () {
                //alert("获取用户信息失败；请刷新或重新登录")
                $("#yhName_right").append("<a href='./login.html'>请登录" + "</a><br/>");
            }
        });
    }
    /*分页*/
    var fenYe = function (yeshu) {
        for (var i = 0; i < yeshu; i++) {
            var yema = i + 1;
            $("#yeMa").append("<li id='YEMA" + yema + "'" + "><a id='yema" + yema + "'" + "href='#'>" + yema + "</a></li>");
            bindYema(i, yema);
        }
        $("#yeMa").append("<li class='next' id='qianjin'><a href='javascript:void(0);'>下一页 &rarr;</a></li>");
        $("#qianjin").bind('click', function () {
            if (ListRows.length / 10 - isYema <= 0) {
                alert("后面没有了")
                return
            }
            $("#yema" + (isYema + 1)).click();
        })
        $("#houtui").bind('click', function () {
            if (isYema - 1 == 0) {
                alert("前面没有了")
                return
            }
            $("#yema" + (isYema - 1)).click();
        })
    }
    //绑定分页按钮事件
    var bindYema = function (id, yema) {
        $("#yema" + yema).bind('click', ListRows, function (event) {

            $("#wzList").remove();
            var id = "id=";
            $("#mainPanel").append("<div id='wzList'></div>");
            for (var i = yema * 10 - 10; i < yema * 10; i++) {
                if (i == ListRows.length) { break }
                if (i == ListRows.length - 1 && ListRows.length >= (yema * 10 - 1)) {
                    addForm = formRows[0] + id + "'form" + i + "'" + formRows[1] + id + "'wzbt" + i + "'" + formRows[2] + id + "'yhname" + i + "'" + formRows[3] + id + "'wznr" + i + "'" + formRows[4];
                }
                else if (i == yema * 10 - 1) { addForm = formRows[0] + id + "'form" + i + "'" + formRows[1] + id + "'wzbt" + i + "'" + formRows[2] + id + "'yhname" + i + "'" + formRows[3] + id + "'wznr" + i + "'" + formRows[4]; }
                else {
                    addForm = formRows[0] + id + "'form" + i + "'" + formRows[1] + id + "'wzbt" + i + "'" + formRows[2] + id + "'yhname" + i + "'" + formRows[3] + id + "'wznr" + i + "'" + formRows[4] + " <hr style='width:100%;padding:0;margin:3'></hr>";
                }
                $("#wzList").append(addForm);
                $("#wzbt" + i).append("<a style ='color:#8F5523' href='" + "./artic.html?type=" + ListRows[i].id + "'>" + ListRows[i].wzbt + "</a>");
                $("#yhname" + i).append("<a style ='color:#8F5523' href='" + "./myself.html?type=" + ListRows[i].yhid + "'>" + ListRows[i].uasername + "</a>" + "<br/>");
                var rows = ListRows[i].wznr_txt;
                var wznr = rows.slice(0, 50)
                $("#wznr" + i).append(wznr + '...');
            }
            scrollTo(0, 0);
            isYema = yema;
            for (var j = 1; j <= ListRows.length / 10 + 1; j++) {
                $("#YEMA" + j).removeClass("active");
            }
            $("#YEMA" + (isYema)).addClass("active");
            return
        })
    }
    /*append主控件*/
    var appendForm = function () {
        var form = "<form id= style='100%'><table cellpadding='4' cellspacing='8'><tr><td align='center' style='width:10%'><a class='navbar-brand' href='#'> <img alt='logo' src='images/head_ico/head_mr.png' style='width:50px;height:50px;padding:0;margin:0'> </a></td><td align='left' style='width:80%;padding-top:12px' colspan='6'> <font size='4' id=></font></td></tr><tr><td></td><td align='left' style='width:80%;color:#8F5523' colspan='6'><div id=></div></td></tr><tr><td></td><td align='left' style='width:80%' colspan='6'><div style='width:95%;margin-top:10px' id=></div></td></tr><tr><td></td><td align='left' style='width:4%'><a class='navbar-brand' href='#'> <img alt='logo' src='images/time.png' style='width:20;height:20;padding:0;margin:0'> </a></td><td align='left' style='width:15%;padding:0;margin:0'>1分钟以前</td><td align='left' style='width:4%'><a class='navbar-brand' href='#'> <img alt='logo' src='images/read.png' style='width:20;height:20;padding:0;margin:0'> </a></td><td align='left' style='width:15%'>阅读（20）</td><td align='left' style='width:4%'><a class='navbar-brand' href='#'> <img alt='logo' src='images/comment.png' style='width:20;height:20;padding:0;margin:0'> </a></td><td align='left' style='width:15%'>评论（1）</td></tr></table></form>";
        formRows = form.split('id=');
    }
    init();
    bindEvents();
}())