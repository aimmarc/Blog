/**
 * Created by 44719 on 2017/3/2.
 */
var mainClass = (function () {
    var init = function () {
        //$("#bbs").find('a').addClass("active-topbar");
        $("#backTop").hide();
        getGrxx();
        bindEvents();
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
                    $("#logedName").attr('href','../../login.html');
                    return
                } else {
                    $("#logedName").append(data[0].nickname);
                    $("#grzy").attr('href', '../../myself.html');
                    $("#navself").append("<li><a href='./server/logout.php?action=index'>退出登录</a></li>");
                }

            }
            , erro: function () {
                //alert("获取用户信息失败；请刷新或重新登录")
                $("#yhName_right").append("<a href='./login.html'>请登录" + "</a><br/>");
            }
        });
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
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            if (activeTab == "首页") {
                window.location.href = "bbsindex.html";
            } else if (activeTab == "安卓专区") {
                window.location.href = "./android.html";
            } else if (activeTab == "动态") {
                $("#wzlist").remove();
                alert("这是3")
            }
        });
    }
    $(document).ready(function () {
        init();
    });

}())