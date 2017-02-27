var mainClass = (function () {
    var time;
    var init = function () {
        $("#addSrc").hide();
        $("#chooseSrc").change(function () {
            if ($("input[name='src']:checked").val() == 1) { $("#addSrc").hide(); }
            else { $("#addSrc").show(); }
        });
        sfDlu();
        bindEvents();
        initEditor();
        //getDate();
    }
    var bindEvents = function () {
        $("#addWz").bind('click', function () {
            var content = UE.getEditor('container').getContent();
            var wznr_txt = UE.getEditor('container').getContentTxt();
            var wzbt = $("#bt").val();
            var wznr = $("#zw").val();
            var wzlb = $("#wzlb").val();
            if (wzbt == "") {
                alert('请先输入标题');
                return
            }
            if (content == "") {
                alert('请先输入正文');
                return
            }
            if ($("input[name='src']:checked").val() == 1) { var src = "原创" }
            else {
                var src = $("#addSrc").val();
                if ($("#addSrc").val() == '' || $("#addSrc").val() == undefined) { alert("请选择或输入来源"); return }
            }
            getDate();
            tjWz(wzbt, content, wzlb, 1, wznr_txt, time, src);
        })
    }
    var tjWz = function (bt, zw, wzlb, wzzt, wznr_txt, date, src) {
        $.ajax({
            type: "POST"
            , url: "./server/tjwz.php?action=tjwz"
            , dataType: "json"
            , data: {
                "wzBt": bt
                , "wzZW": zw
                , "wzLb": wzlb
                , "zt": wzzt
                , "wznr_txt": wznr_txt
                , "date": date,
                "src": src
            ,
            }
            , success: function (data) {
                window.location.href = "./index.html";
                return
            }
            , error: function (err) {
                alert("登录状态错误，请重新登录");
                window.location.href = "./login.html";
                return
            }
        })
    }
    var sfDlu = function () {
        $.ajax({
            type: "POST"
            , url: "./server/tjwz.php?action=sfdl"
            , dataType: "json"
            , success: function (data) {
                if (data[0].sec == -1) {
                    alert("登录状态错误，请重新登录");
                    window.location.href = "./login.html";
                    return
                }
                else {
                    $("#yhName_right").append(data[0].uasername + "<br/>");
                    $("#nickname").append(data[0].nickname + "<br/>");
                    $("#adress").append("成都");
                    $("#zhiwei").append("web前端工程师");
                    return
                }
            }
            , error: function (err) {
                alert("发现未知错误，请重试或重新登录");
                return
            }
        })
    }

    var getDate = function () {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDay();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        m = m + 1;
        time = y + '-' + m + '-' + d + " " + hh + ":" + mm + ":" + ss;
    }
    //加载编辑器
    var initEditor = function () {
        var editor = UE.getEditor('container', {
            toolbars: [
    [
        'anchor', //锚点
        'undo', //撤销
        'redo', //重做
        'bold', //加粗
        'indent', //首行缩进
        'italic', //斜体
        'underline', //下划线
        'strikethrough', //删除线
        'subscript', //下标
        'fontborder', //字符边框
        'superscript', //上标
        'formatmatch', //格式刷
        'source', //源代码
        'pasteplain', //纯文本粘贴模式
        'selectall', //全选
        'print', //打印
        'preview', //预览
        'horizontal', //分隔线
        'removeformat', //清除格式
        'time', //时间
        'date', //日期
        'unlink', //取消链接
        'insertrow', //前插入行
        'insertcol', //前插入列
        'mergeright', //右合并单元格
        'mergedown', //下合并单元格
        'deleterow', //删除行
        'deletecol', //删除列
        'splittorows', //拆分成行
        'splittocols', //拆分成列
        'splittocells', //完全拆分单元格
        'deletecaption', //删除表格标题
        'inserttitle', //插入标题
        'mergecells', //合并多个单元格
        'deletetable', //删除表格
        'cleardoc', //清空文档
        'insertparagraphbeforetable', //"表格前插入行"
        'insertcode', //代码语言
        'fontfamily', //字体
        'fontsize', //字号
        'paragraph', //段落格式
        'simpleupload', //单图上传
        'edittable', //表格属性
        'edittd', //单元格属性
        'link', //超链接
        'emotion', //表情
        'spechars', //特殊字符
        'searchreplace', //查询替换
        'map', //Baidu地图
        'insertvideo', //视频
        'help', //帮助
        'justifyleft', //居左对齐
        'justifyright', //居右对齐
        'justifycenter', //居中对齐
        'justifyjustify', //两端对齐
        'forecolor', //字体颜色
        'backcolor', //背景色
        'insertorderedlist', //有序列表
        'insertunorderedlist', //无序列表
        'fullscreen', //全屏
        'directionalityltr', //从左向右输入
        'directionalityrtl', //从右向左输入
        'rowspacingtop', //段前距
        'rowspacingbottom', //段后距
        'pagebreak', //分页
        'insertframe', //插入Iframe
        'imagenone', //默认
        'imageleft', //左浮动
        'imageright', //右浮动
        'attachment', //附件
        'imagecenter', //居中
        'wordimage', //图片转存
        'lineheight', //行间距
        'edittip ', //编辑提示
        'customstyle', //自定义标题
        'autotypeset', //自动排版
        'touppercase', //字母大写
        'tolowercase', //字母小写
        'background', //背景
        'template', //模板
        'scrawl', //涂鸦
        'music', //音乐
        'inserttable', //插入表格
        'drafts', // 从草稿箱加载
        'charts', // 图表
    ]
            ]
        });
    }
    init();
}())