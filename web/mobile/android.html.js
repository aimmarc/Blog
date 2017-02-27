var mainClass = (function () {
    var isYema;
    var yeshu;

    var init = function () {
        $("#shoujk").addClass("active");
        $("#btnMenu1").hide();
        $("#btnMenu2").hide();
        $("#backTop").hide();
        $('#myCarousel').carousel({
            interval: 4000
        });

        isYema = 1;
        bindEvents();
        getGrxx();
        getMainList(1, 5);
        getRight();
        getYS();
    }
    /*绑定事件*/
    var bindEvents = function () {
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
            $("#bktopIMG").attr('src', "../../images/bktop(1).png");
        }, function () {
            $("#bktopIMG").attr('src', "../../images/bktop.png");
        });
        $("#guany").hover(function () {
            $("#navself").show();
            $("#usericon").attr('src', "../../images/user(1).png");
            $("#guany").addClass("active");
        }, function () {
            $("#navself").hide();
            $("#usericon").attr('src', "../../images/user.png");
            $("#guany").removeClass("active");
        });
        $("#guany").bind('click', function () {
            $("#guany").removeClass("active");
            $("#usericon").attr('src', "../../images/user(1).png");
        });
        $("#phoneImg").hover(function () {
            $("#phoneImg").attr('src', "../../images/phone (2).png");
        }, function () {
            $("#phoneImg").attr('src', "../../images/phone.png");
        });
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            if (activeTab == "手机控首页") {
                window.location.href = "./mobile.html";
            } else if (activeTab == "安卓专区") {
                window.location.href = "./android.html";
            } else if (activeTab == "动态") {
                $("#wzlist").remove();
                alert("这是3")
            }
        });
    }
    /*获取个人信息*/
    var getGrxx = function () {
        $.ajax({
            type: "POST"
            , url: "../../server/getgrxx.php?action=getgrxx"
            , dataType: "json"
            //, data: {
            //    "uaserid": usrId
            //}

            , success: function (data) {
                if (data[0].sec == -1) {
                    $("#logedName").append('请登录');
                    $("#logedName").attr('href', '../../login.html');
                    $("#guany").removeClass("dropdown");
                    $("#guany").html("<a href='../../login.html'>请登录</a>")
                    $("#btnMenu2").show();
                    return
                } else {
                    $("#logedName").append(data[0].nickname);
                    $("#grzy").attr('href', '../../myself.html');
                    $("#nickname").append(data[0].nickname + "<br/>");
                    $("#navself").append("<li><a href='../../server/logout.php?action=web/mobile/android'>退出登录</a></li>");
                    $("#btnMenu1").show();
                }

            }
            , erro: function () {
                //alert("获取用户信息失败；请刷新或重新登录")
                $("#yhName_right").append("<a href='../../login.html'>请登录" + "</a><br/>");
            }
        });
    }
    /*加载主列表*/
    var getMainList = function (qsts, zzts) {
        $.ajax({
            type: "POST"
            , url: "../../server/android.php?action=getMain"
            , dataType: "json"
            , data: {
                "qsts": qsts,
                "zzts": zzts,
            }
            , success: function (data) {
                var str = '';
                var str1 = '';
                for (var i in data) {
                    str = str + "<div class='panel panel-default listhover' style='border: 0; width: 100%; float: left; padding: 0 15px 15px; border-radius: 0; margin:0 0 10px'>" +
                        "<a class='logo_font' href='../../artic.html?type=" + data[i].id + "'><h3>" + data[i].wzbt + "</h3></a>" +
                        "<div style='float:left;width:20%'>" +
                            "<img src='../../images/SignUp.png' style='width: 150px; margin: 0; height: 90px; float: left; border-radius: 2px;'>" +
                        "</div>" +
                        "<div style='float:left;width:80%;height:100px'>" +
                            "<p class='fonts1' style='float: left; height: 90px'>" +
                                data[i].wznr_txt.slice(0, 100) + '...' +
                "</p>" +
            "</div>" +
            "<span style='float: left;font-size:14px'><img src='../../images/time.png' style='width: 20px; margin: 0; height: 20px; border-radius: 2px;margin-left:0'> (1分钟以前)</span>" +
            "<span style='float: left;font-size:14px'><img src='../../images/read.png' style='width: 20px; margin: 0; height: 20px; float: left; border-radius: 2px; margin-left: 50px; '> 阅读(25)</span>" +
            "<span style='float: left;font-size:14px'><img src='../../images/comment.png' style='width: 18px; margin: 0; height: 18px; float: left; border-radius: 2px; margin-left: 50px; '> 评论(12)</span>" +
            "<span style='float: left;font-size:14px'><img src='../../images/more.png' style='width: 20px; margin: 0; height: 20px; float: left; border-radius: 2px; margin-left: 50px;opacity: 0.5 '></span>" +
            "</div>"
                }
                $("#mainList").html(str);

                return true;
            }
            , erro: function () {
                alert("出现未知错误，请重试或重新登陆");
                return false;
            }
        });
    }
    /*加载右列表*/
    var getRight = function () {
        $.ajax({
            type: "POST"
            , url: "../../server/android.php?action=getRight"
            , dataType: "json"
            , success: function (data) {
                var str = '';
                for (var i in data) {
                    if (i != data.length - 1) {
                        str = str + "<div style='float:left;width:20%;margin-top:3px'><img src='../../images/SignUp.png' style='width: 55px; margin: 0; height: 40px; float: left; border-radius: 2px;'></div><div style='float:left;width:80%;height:40px'><a class='logo_font' style='font-size:16px' href='../../artic.html?type=" +
                            data[i].id + "'>" +
                            data[i].wzbt.slice(0, 30) +
                            "</a></div>" + "<hr style='width:85%;padding-left:20%;margin-right:-15px;margin-top:10px;margin-bottom:10px;float:right'>"
                    } else {
                        str = str + "<div style='float:left;width:20%;margin-top:3px'><img src='../../images/SignUp.png' style='width: 55px; margin: 0; height: 40px; float: left; border-radius: 2px;'></div><div style='float:left;width:80%;height:40px'><a class='logo_font' style='font-size:16px' href='../../artic.html?type=" +
                            data[i].id + "'>" +
                            data[i].wzbt.slice(0, 30) +
                            "</a></div>"
                    }
                }
                $("#listRight").html(str);
                return true;
            }
            , erro: function () {
                alert("出现未知错误，请重试或重新登陆");
                return false;
            }
        });
    }
    /*获取页数*/
    var getYS = function () {
        $.ajax({
            type: "POST"
            , url: "../../server/android.php?action=getYS"
            , dataType: "text"
            , success: function (data) {
                yeshu = parseInt(data);
                if( yeshu<data ){ yeshu = yeshu + 1}
                fenYe(yeshu);
                //$("#yema1").click();
                $("#YEMA1" ).addClass("active");
                return true;
            }
            , erro: function () {
                alert("出现未知错误，请重试或重新登陆");
                return false;
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
            if (yeshu - isYema <= 0) {
                alert("后面没有了")
                return
            }
            $("#mainList").html('')
            $("#yema" + (isYema + 1)).click();
        })
        $("#houtui").bind('click', function () {
            if (isYema - 1 == 0) {
                alert("前面没有了")
                return
            }
            $("#mainList").html('')
            $("#yema" + (isYema - 1)).click();
        })
    }
    //绑定分页按钮事件
    var bindYema = function (id, yema) {
        $("#yema" + yema).bind('click', function (event) {
            $("#wzList").remove();
            //var id = "id=";
            $("#mainPanel").append("<div id='wzList'></div>");
            getMainList((yema-1)*5+1, (yema-1)*5 + 5);
            scrollTo(0, 0);
            isYema = yema;
            for (var j = 1; j <= yeshu + 1; j++) {
                $("#YEMA" + j).removeClass("active");
            }
            $("#YEMA" + yema).addClass("active");
            isYema = yema;
            $("#mainList").html('');
        })
    }

    $(document).ready(function () {
        init();
    });
}())