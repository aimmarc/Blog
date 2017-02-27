var mainClass = (function () {
    var init = function () {
        $("#shoujk").addClass("active");
        $("#btnMenu1").hide();
        $("#btnMenu2").hide();
        $("#backTop").hide();
        $('#myCarousel').carousel({
            interval: 4000
        });
        bindEvents();
        getGrxx();
        getMainList();
    }

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
                    $("#navself").append("<li><a href='../../server/logout.php?action=web/mobile/mobile'>退出登录</a></li>");
                    $("#btnMenu1").show();
                }

            }
            , erro: function () {
                //alert("获取用户信息失败；请刷新或重新登录")
                $("#yhName_right").append("<a href='../../login.html'>请登录" + "</a><br/>");
            }
        });
    }

    var getMainList = function () {
        $.ajax({
            type: "POST"
            , url: "../../server/getlist.php?action=phone_main"
            , dataType: "json"
            , success: function (data) {
                var str = '';
                var str1 = '';
                for (var i in data) {
                    if (data[i].wzlb == 4) {
                        if (i < 5) {
                            str = str + "<a href='../../artic.html?type=" + data[i].id + "' class='list-group-item list_ligte'" +
                                " style=' border: 0; color: #8F5523'><img src='../../images/top.png' class='headico'>" +
                                "<span class='rightspan'>19日</span>" + data[i].wzbt + "</a>"
                        } else {
                            str = str + "<a href='../../artic.html?type=" + data[i].id + "' class='list-group-item list_ligte'" +
                                " style=' border: 0'>" +
                                "<span class='rightspan'>19日</span>" + data[i].wzbt + "</a>"
                        }
                    }
                    else {
                        str1 = str1 + "<li class='list-group-item list_ligte' style='border: 0'><a href='../../artic.html?type=" + data[i].id +
                            "' class='list_font'>" + data[i].wzbt + "</a></li>"
                    }
                }
                $("#mainList").html(str);
                $("#listRight").html(str1);
            }
            , erro: function () {
                alert(0)
            }
        });
    }
    $(document).ready(function () {
        init();
    });
}())