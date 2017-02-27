<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php");
$action = $_GET["action"];
//获取文章
if($action == "load"){
$aid = stripslashes(trim($_POST["articid"]));  //文章id
$query = mysql_query("select a.*,b.uasername from artic a,tb_system_user b where a.id = '$aid' and a.yhid and b.id=a.yhid");
while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
    $arr[] = $row;
}
if(empty ($row)){
    $arr[] = array('sec' => '-2');
}
echo json_encode($arr);
} 
//获取评论
if($action == 'getpl'){
    $wzid = stripslashes(trim($_POST["wzid"]));
    if (empty ($wzid)) { 
        echo "获取文章异常"; 
        exit; 
    } 
    $query = mysql_query("select a.*,b.uasername from comment a,tb_system_user b where wzid = '$wzid' and a.yhid = b.id");
    while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
        $arr[] = $row;
    }
    echo json_encode($arr);
}
//提交评论
if($action == 'sent'){
    if(empty ($_SESSION['id'])){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    $uid = $_SESSION['id'];
    $wid = stripslashes(trim($_POST["wzid"]));
    $plnr = stripslashes(trim($_POST["plnr"]));
    if (empty ($wid)) { 
        $arr[] = array('sec' => '-2');
        echo json_encode($arr);
        exit; 
    }
    $query = mysql_query("INSERT INTO comment (yhid,wzid,plnr) VALUES('$uid','$wid','$plnr')");
    if($query){
        $_SESSION["sec"] = 1;
        $arr["sec"] = $_SESSION["sec"];
    }
    else{
        $_SESSION["sec"] = 0;
        $arr["sec"] = $_SESSION["sec"];
    }    
    echo json_encode($arr);
    }
	if($action == 'getdjs'){
		$wzid = stripslashes(trim($_POST["articid"]));
		$query = mysql_query("select ydcs from artic where id = '$wzid'");
		while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
        $arr[] = $row;
    }
    echo json_encode($arr);
	}
	if($action == 'adddjs'){
		$wzid = stripslashes(trim($_POST["articid"]));
		$djs = stripslashes(trim($_POST["djs"]));
		$query = mysql_query("update artic set ydcs ='$djs' where id = '$wzid'");
		if($query){
			$arr[] = array('sec' => '1');
		}
		else{
			$arr[] = array('sec' => '-1');
		}    
		echo json_encode($arr);
		}
?>