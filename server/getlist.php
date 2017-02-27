<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php");
$action = $_GET["action"];
if($action == "phone_main"){
	$query = mysql_query("select t.id,t.wzbt,t.fbsj,t.wzlb from artic t where wzlb = 4 order by t.fbsj desc");
	$query1 = mysql_query("select t.id,t.wzbt,t.fbsj,t.wzlb from artic t where t.ydcs > 1 and wzlb!=4 order by t.ydcs desc");
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
	}
	while($row1 = mysql_fetch_array($query1,MYSQL_ASSOC)){
		$arr1[] = $row1;
	}
	$arr = array_slice($arr,0,30);
	$arr1 = array_slice($arr1,0,10);
	$arr = array_merge($arr,$arr1);
	echo json_encode($arr);
	exit;
}
php?>