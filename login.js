var indexClass = (function () {
    //alert(Math.random()*10)
    //$("#msgdiv").hide()
    var init = function () {
        bindevents();
    }
    var bindevents = function () {
        $("#login").bind('click', function () {
            $("#msg").remove();
            var valicode = $("#yzminput").val();
            if(valicode == ""||valicode==undefined){
                $("#msgdiv").append("<h5 style='color:red' id='msg'>请输入验证码</h5>");
                $("#yzm").click();
                return
            }
            valicode = valicode.toLowerCase();
            var usr = $("#username").val();
            var pass = $("#password").val();
            if (usr == '' || pass == '') {
                $("#msgdiv").show();
                $("#msgdiv").append("<h5 style='color:red' id='msg'>请输入用户名和密码</h5>");
                alert("请输入用户名和密码！");
                $("#yzm").click();
                return false;
            }
            pass = hex_md5(pass);
            $.ajax({
                type: "POST"
                , url: "./server/logincheck.php?action=login"
                , dataType: "json"
                , data: {
                    "uasername": usr
                    , "pass": pass
                    ,"valicode":valicode
                }
                , success: function (data) {
                    if (data.success == 1) {
                        window.location.href = "./index.html?id=" + data.id;
                        return true;
                    }
                    else if (data.success == 0) {
                        alert("用户名或密码错误");
                        $("#yzm").click();
                        return false;
                    }
                    else if(data[0].sec == -1){
                        alert("您已经登录过账号，请勿重复登录");
                        window.location.href = "./index.html";
                        return false;
                    }
                    else if(data[0].sec==-2){
                        alert("验证码错误，请重新输入");
                        $("#msgdiv").append("<h5 style='color:red' id='msg'>验证码错误</h5>");
                        $("#yzm").click();
                        $("#yzminput").val('');
                        return
                    }
                    else{
                        alert("未知错误，请稍后再试");
                        return false;
                    }
                }
                , error: function () {
                    alert(arguments[1]);
                }
            });
        });
    }
    init();
}())