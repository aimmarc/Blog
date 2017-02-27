<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php");
$action = $_GET["action"];
if($action == "getMain"){
	$qsts = stripslashes(trim($_POST["qsts"]));
	$zzts = stripslashes(trim($_POST["zzts"]));
	$query = mysql_query("select t.id,t.wzbt,t.fbsj,t.wzlb,t.wznr_txt from artic t where wzlb = 4 order by t.fbsj desc limit ".$qsts.",".$zzts);
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
	}
	echo json_encode($arr);
	exit;
}
if($action == "getRight"){
	$query = mysql_query("select t.id,t.wzbt,t.fbsj,t.wzlb,t.wznr_txt from artic t where t.wzlb = 4 and t.ydcs>10 order by t.ydcs ");
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
	}
	echo json_encode($arr);
	exit;
}
if($action == "getYS"){
	$query = mysql_query("select * from artic t where t.wzlb = 4");
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
		$ys =  sizeof($arr)/10;
	}
	echo $ys;
	exit;
}
php?>