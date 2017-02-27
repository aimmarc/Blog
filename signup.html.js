var mainClass = (function () {
    var isValidate = 0;
    var init = function () {
            $("[data-toggle='popover']").popover();
            tipsdestroy();
            /*$('#tooltips').popover({
                trigger: 'click', 
                template: '', 
                html: true, 
                content: "哈哈哈哈", 
            });*/
            bindEvents();
        }
        /*按钮绑定*/
    var bindEvents = function () {
        $("#sign").bind('click', function () {
            //tipsdestroy();
            isVali();
            if (isValidate == 0) {
                var now = $("#password").val();
                var re = new RegExp("[a-zA-Z]");
                var len = re.test(now);
                re = new RegExp("[0-9]");
                len = re.test(now);
                re = new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])");
                len = re.test(now);
                if (len) {
                    doPost();
                    return true;
                }
                alert("密码强度不符合,请重新输入");
                $('#passtips').popover('show');
                isValidate = 1;
                return false;
            }else{
                return
            }
        });
        $("#usertips").bind('click', function () {
            var usr = $("#username").val();
            if (usr == '' || usr == undefined) {
                //$('#usertips').popover('show');
            }
            else {
                $('#usertips').popover('toggle')
            }
        });
        $('#passtips').bind('click', function () {
            var pass1 = $("#password").val();
            if (pass1 == '' || pass1 == undefined) {
                // $('#passtips').popover('show')
            }
            else {
                $('#passtips').popover('destroy')
            }
        });
        $('#passtips1').bind('click', function () {
            var pass2 = $("#password1").val();
            var pass1 = $("#password").val();
            if (pass2 != pass1 || pass2 == '') {
                //$('#passtips1').popover('show')
            }
            else {
                $('#passtips1').popover('destroy')
            }
        });
        $('#emailtips').bind('click', function () {
            var email = $("#email").val();
            var rows = email.split('@');
            if (email == '' || email == undefined) {
                // $('#emailtips').popover('show')
            }
            if (rows[0] == '' || rows[0] == undefined || rows[1] == '' || rows[1] == undefined) {
                //$('#emailtips').popover('show')
            }
            else {
                $('#emailtips').popover('destroy')
            }
        });
        $('#addresstips').bind('click', function () {
            var address = $("#address").val();
            if (address == '' || address == undefined) {
                // $('#addresstips').popover('show')
            }
            else {
                $('#addresstips').popover('hide')
            }
        });
    }
    var isVali = function () {
        var usr = $("#username").val();
        var pass1 = $("#password").val();
        var pass2 = $("#password1").val();
        var email = $("#email").val();
        var rows = email.split('@');
        var address = $("#address").val();
        //tipsdestroy();
        if (usr == '' || usr == undefined) {
            $('#usertips').popover('show')
            isValidate = 1;
        }
        else {
            isValidate = 0;
        }
        if (pass1 == '' || pass1 == undefined) {
            $('#passtips').popover('show')
            isValidate = 1;
        }
        else {
            isValidate = 0;
        }
        if (pass2 != pass1 || pass2 == '') {
            $('#passtips1').popover('show')
            isValidate = 1;
        }
        else {
            isValidate = 0;
        }
        if (email == '' || email == undefined) {
            $('#emailtips').popover('show')
            isValidate = 1;
        }
        else {
            isValidate = 0;
        }
        if (rows[0] == '' || rows[0] == undefined || rows[1] == '' || rows[1] == undefined) {
            $('#emailtips').popover('show')
            isValidate = 1;
        }
        else {
            isValidate = 0;
        }
        if (address == '' || address == undefined) {
            $('#addresstips').popover('show')
            isValidate = 1;
        }
        else {
            isValidate = 0;
        }
    }
    var doPost = function () {
        var usrname = $("#username").val();
        var psswd = $("#password").val();
        psswd = hex_md5(psswd);
        var email = $("#email").val();
        var address = $("#address").val();
        $.ajax({
            type: "POST"
            , url: "./server/signup.php?action=sign"
            , dataType: "json"
            , data: {
                "uasername": usrname
                , "password": psswd
                , "email": email
                , "address": address
            , }
            , success: function (data) {
                window.location.href = "./login.html";
            }
            , erro: function () {
                alert('发生未知错误，请稍后重试')
            }
        });
    }
    var tipsdestroy = function () {
        $('#usertips').popover('destroy');
        $('#passtips').popover('destroy')
        $('#passtips1').popover('destroy')
        $('#emailtips').popover('destroy')
        $('#addresstips').popover('destroy')
    }
    init();
}())