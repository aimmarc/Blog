<?php
session_start(); 
if(!(empty ($_SESSION["id"]))){
    $arr[] = array('sec' => '-1');
    echo json_encode($arr);
    exit;
}
ini_set('session.gc_maxlifetime', 1000); 
require_once ("conect.php");
$action = $_GET["action"];
if($action == "login"){
    $user = stripslashes(trim($_POST["uasername"]));
    $pass = stripslashes(trim($_POST["pass"]));
    $valicodepost = stripslashes(trim($_POST["valicode"]));
    $valicode = strtolower($_SESSION["VerifyCode"]);
    if($valicodepost==$valicode){
        if (empty ($user)) { 
        echo "用户名不能为空"; 
        exit; 
    } 
    if (empty ($pass)) { 
        echo "密码不能为空"; 
        exit; 
    } 
    $query = mysql_query(" select * from tb_system_user where uasername ='$user'");
    if($row = mysql_fetch_array($query)){
        if($row["password"]==$pass){
            $_SESSION["user"] = $row["uasername"];
            $_SESSION["id"] = $row["id"];
            $arr["success"] = 1;
            //$arr["msg"] = "登录成功";
            $arr["user"] = $_SESSION["user"];
            $arr["id"] = $_SESSION["id"];
            //$arr["yzm"] = session.getAttribute("rand");
        }
        else{
            $arr["success"] = 0;
        }
    }else{
        $arr["success"] = 0;
        //$arr["msg"] = "登录失败";
    }
    echo json_encode($arr);
    }
    else{
        $arr[] = array('sec' => '-2');
        echo json_encode($arr);
        exit; 
    }
}
if($action == "logout"){
    session_start(); 
    session_destroy(); 
    header("location:index.php"); 
}
?>