var mainClass = (function () {
    var abq = undefined;
    var grxxRow = '';

    var init = function () {
        $("#editzz").hide();
        $("#logOut").hide();
        doValiDel();
        doPost();
        getWZ();
        getProvice();
    }

    var doValiDel = function () {
        $.ajax({
            type: "POST"
            , url: "./server/delArt.php?action=vali"
            , dataType: "json"
            , success: function (data) {
                if (data[0].sec == 1) {
                    alert("删除成功");
                    return
                }
                if (data[0].sec == -1) {
                    alert("删除失败");
                    return
                } else {
                    return
                }
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    /*获取个人信息*/
    var doPost = function () {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=vali"
            , dataType: "json"
            , success: function (data) {
                grxxRow = data;
                if (data[0].sec == 1) {
                    $("#welcome").html("<h1>" + data[1].nickname + ",欢迎您</h1>")
                    var ads = data[1].adress;
                    var sex = data[1].sex;
                    if (sex == 1) { sex = '男' }
                    else if (sex == 0) { sex = '女' }
                    else { sex = '' }
                    $("#yhName_right").append(data[1].nickname + "<br/>");
                    $("#grqm").append(data[1].grqm);
                    var grxx = ads + ' | ' + data[1].position + ' | ' + sex;
                    $("#adress").append(grxx);
                    bindEvents();
                }
                if (data[0].sec == -1) {
                    alert('登录失效，请重新登录');
                    window.location.href = "./login.html";
                }
                //alert('成功')
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    /*获取文章*/
    var getWZ = function () {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=getWZ"
            , dataType: "json"
            , success: function (data) {

                if (data[0].sec == -1) {
                    //alert(0);
                    $("#myTabContent").html("<div style='margin-top:20px;margin-left:20px'>这里什么都没有，赶快来<a href='./editart.html'>添加</a>吧</div>");
                } else {
                    $("#myTabContent").append("<div id='wzlist' class='list-group' style='box-shadow: 0 0 0'></div>");
                    for (var i in data) {
                        $("#wzlist").append(
                            "<div class='list-group-item' style='border-radius: 0;border:0' href='artic.html?type=" + data[i].id + "'>" +
                            "<span style='float:right'>" + data[i].fbsj + "</span>" +
                            "<h4 class=' list-group-item-heading'>" +
                                "<a class='list_font' href='artic.html?type=" + data[i].id + "'>" + data[i].wzbt + "</a>" +
                                "</h4>" + "<a style='float:right;margin-left:12px' onClick='mainClass.test(this)' data-target='#myModal' href=' javascript:void("
                                + data[i].id + ")'><img src='images/delete.png' style='width: 15px; margin: auto; opacity: 0.5; '></a>"
                                + "<a style='float:right' href='./modifyArt.html?id=" + data[i].id
                                + "'><img src='images/edit (1).png' style='width: 20px; margin: auto; opacity: 0.5; '></a>" +
                                "<p class='list-group-item-text list_son_font' >" +
                                    data[i].wznr_txt.slice(0, 40) + "..." +
                                "</p>" +

                            "</div>" +
                            "<hr style='margin:2px 15px' />");
                    }
                }
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    /*获取回复*/
    var getHF = function () {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=getHF"
            , dataType: "json"
            , success: function (data) {

                if (data[0].sec == -1) {
                    //alert(0);
                    $("#myTabContent").append("<div style='margin-top:20px;margin-left:20px'>这里什么都没有，赶快来<a href='./editart.html'>添加</a>吧</div>");
                } else {
                    $("#myTabContent").append("<div id='wzlist' class='list-group' style='box-shadow: 0 0 0'></div>");
                    for (var i in data) {
                        $("#wzlist").append(
                            "<div class='list-group-item' style='border-radius: 0;border:0' href='artic.html?type=" + data[i].id + "'>" +
                            "<span style='float:right'>" + data[i].fbsj + "</span>" +
                            "<h4 class=' list-group-item-heading'>" +
                                "<a class='list_font' href='artic.html?type=" + data[i].id + "'>" + data[i].wzbt + "</a>" +
                                "</h4>" + "<a style='float:right;margin-left:5px' onClick='mainClass.test(this)' data-target='#myModal' href=' javascript:void(" + data[i].id + ")'>" +
                                "<img src='images/guanbi.png' style='width: 20px; margin: auto; opacity: 0.5; '></a>" + "<a style='float:right' href='./modifyArt.html?id=" +
                                data[i].id + "'>编辑</a>" +
                                "<p class='list-group-item-text list_son_font' >" +
                                    data[i].wznr_txt.slice(0, 40) + "..." +
                                "</p>" +

                            "</div>" +
                            "<hr style='margin:2px 15px' />");
                    }
                }
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    /*获取个人信息*/
    var getGRXX = function () {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=getGR"
            , dataType: "json"
            , success: function (data) {
                grxxRow
                var adr = data[0].adress;
                adr = adr.split('-');
                //var ss = $("#country").val();
                var count = $("#country").get(0).options.length;
                for (var i = 0; i < count; i++) {
                    if ($("#country").get(0).options[i].text == adr[0]) {
                        $("#country").get(0).options[i].selected = true;
                        break;
                    }
                }
                if (adr[0] != '中华人民共和国') {
                    $("#province").hide();
                    $("#city").hide();
                }
                //var count = $("#province").get(0).options.length;
                //for (var i = 0; i < count; i++) {
                //    if ($("#province").get(0).options[i].text == adr[1]) {
                //        $("#province").get(0).options[i].selected = true;
                //        break;
                //    }
                //}
                $("#province").select('setValue', adr[1]);
                getCity($("#province").val());
                $("#city").select('setValue', adr[2]);
                $("#nickname").val(data[0].nickname);
                $("#trade").val(data[0].dept);
                $("#position").val(data[0].position);
                $("#signTXT").val(data[0].grqm);
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    /*获取省份*/
    var getProvice = function () {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=getCT"
            , dataType: "json"
            , success: function (data) {
                //alert("成功")
                //var str = '';
                //for (var i in data) {
                //    if (i == 0) { str += "<option value=\"" + '0000' + "\" >" + '--未选择省份--' + "</option>"; }
                //    else { str += "<option value=\"" + data[i].ProvinceID + "\" >" + data[i].ProvinceName + "</option>"; }
                //}
                //$("#province").html(str);
                $("#province").select('loadData', data, { text: 'ProvinceName', value: 'ProvinceID' });
                $("#province").show();
                getCity($("#province").val());
                $("#province").select('getSelected');
                $("#city").show();
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }

    /*获取城市*/
    var getCity = function (sid) {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=getCS"
            , dataType: "json",
            data: {
                "sid": sid
            }
            , success: function (data) {
                //alert("成功")
                //var str = '';
                //for (var i in data) {
                //    str += "<option value=\"" + data[i].CityID + "\" >" + data[i].CityName + "</option>";
                //}
                //$("#city").html(str);
                $("#city").select('loadData', data, {
                    value: 'CityID',
                    text: 'CityName'
                })
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }

    var tjGRXX = function (nkname, sex, trade, position, adress, sign) {
        $.ajax({
            type: "POST"
            , url: "./server/myself.php?action=tjgrxx"
            , dataType: "json",
            data: {
                "nkname": nkname,
                "sex": sex,
                "trade": trade,
                "position": position,
                "adress": adress,
                "sign": sign
            }
            , success: function (data) {
                if (data[0].sec == 1) { alert("成功") }
                else { alert("失败") }
            }
            , erro: function () {
                alert('出现未知错误，请重试或重新登录')
            }
        });
    }
    var bindEvents = function () {
        $("#logOut").bind('click', function () {
            //alert(1)
        });
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            if (activeTab == "文章") {
                $("#wzlist").remove();
                getWZ();
            } else if (activeTab == "回复") {
                $("#wzlist").remove();
                alert("这是2")
            } else if (activeTab == "动态") {
                $("#wzlist").remove();
                alert("这是3")
            }
        });
        $("#editzz").bind('click', function () {
            $("#warning").hide();
            clearForm();
            getGRXX();
            $('#editModal').modal({
                keyboard: true
            });
            $("#position").setValue('22');
            
        });
        $("#grxxPanl").hover(function () {
            $("#logOut").show();
            $("#editzz").show();
        }, function () {
            $("#editzz").hide();
            $("#logOut").hide();
        });
        $("#btnBC").bind('click', function () {
            //var value = $("#province").select('getSelected');
            $("#warning").hide();
            var nkname = $("#nickname").val();
            if (nkname == '' || nkname == undefined) {
                $('#nickname').focus();
                $("#warning").show();
                return
            }
            var sex = $("input[name='sex']:checked").val();
            var trade = $("#trade").val();
            var position = $("#position").val();
            var country = $("#country option:selected").text();
            var province = $("#province option:selected").text();
            var city = $("#city option:selected").text();
            var adress = country + "-" + province + "-" + city;
            var sign = $("#signTXT").val();

            tjGRXX(nkname, sex, trade, position, adress, sign);
        });
        $("#country").bind("change", function () {
            //alert($(this).val())
            if ($(this).val() == 1) {
                getProvice();
            } else {
                $("#province").hide();
                $("#city").hide();
            }
        });
        $("#province").bind("change", function () {
            getCity($(this).val());
        });

        var planMakeAreachild = $(':input', $("#grxxFrom"));
        for (var i = 0; i < planMakeAreachild.length; i++) {
            if (planMakeAreachild[i].required == true) {
                $(planMakeAreachild[i]).after("   <span style='color:red'>*</span>");
            }
        }
    }
    /*清空form*/
    var clearForm = function () {
        var rows = $(':input', $("#grxxFrom"));
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].type == "radio" || rows[i].type == "check") {
                continue
            } else { $(rows[i]).val("") }
        }
    }
    $(document).ready(function () {
        init();
    });


    return {
        test: function (hh) {
            abq = hh;
            $('#myModal').modal({
                keyboard: true
            })
            //alert("该操作无法撤销，确定删除吗？");
            $("#btnQD").bind('click', function () {
                var href = hh.href.split("(");
                href = href[1].split(")");
                hh.href = "./server/delArt.php?id=" + href;
                hh.click();
            })
        }
    }
}())