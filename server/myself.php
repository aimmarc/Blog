<?php
session_start();
ini_set('session.gc_maxlifetime', 3600);
require_once ("conect.php");
$action = $_GET["action"];
if($action=="vali"){
    if(empty ($_SESSION['id'])){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit;
    }
    else{
		$uid = $_SESSION['id'];
		$query = mysql_query("select * from tb_system_user where id = '$uid'");
		while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
			$arr[] = array('sec' => '1','uid' => $_SESSION['id']);
			$arr[] = $row;
		}
        echo json_encode($arr);
        exit;
    }
}
if($action=="getWZ"){
	$uid = $_SESSION['id'];
	$query = mysql_query("select * from artic where yhid = '$uid'");
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		//$arr[] = array('sec' => '1','uid' => $_SESSION['id']);
		$arr[] = $row;
	}
	if(empty ($arr)){
		$arr[] = array('sec' => '-1');
		echo json_encode($arr);
		exit;
	}else{
		echo json_encode($arr);
		exit;
	}
}
if($action=="getCT"){
	//$uid = $_SESSION['id'];
	$query = mysql_query("select ProvinceID,ProvinceName from s_province");
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
	}
	if(empty ($arr)){
		$arr[] = array('sec' => '-1');
		echo json_encode($arr);
		exit;
	}else{
		echo json_encode($arr);
		exit;
	}
}
if($action=="getCS"){
	$ProvinceID = stripslashes(trim($_POST["sid"]));
	if($ProvinceID==1||$ProvinceID==22||$ProvinceID==2||$ProvinceID==9){
		$query = mysql_query("select DistrictID CityID,DistrictName CityName from s_district where CityID = '$ProvinceID'");
	}else{
		$query = mysql_query("select CityID,CityName from s_city where ProvinceID = '$ProvinceID'");
	}
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
	}
	if(empty ($arr)){
		$arr[] = array('sec' => '-1');
		echo json_encode($arr);
		exit;
	}else{
		echo json_encode($arr);
		exit;
	}
}
if($action=="getGR"){
	$yhid = $_SESSION['id'];
	$query = mysql_query("select * from tb_system_user where id = '$yhid'");
	while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
		$arr[] = $row;
	}
	if(empty ($arr)){
		$arr[] = array('sec' => '-1');
		echo json_encode($arr);
		exit;
	}else{
		echo json_encode($arr);
		exit;
	}
}
if($action=="tjgrxx"){
	$yhid = $_SESSION['id'];
	$nkname = stripslashes(trim($_POST["nkname"]));
	$sex = stripslashes(trim($_POST["sex"]));
	$position = stripslashes(trim($_POST["position"]));
	$adress = stripslashes(trim($_POST["adress"]));
	$sign = stripslashes(trim($_POST["sign"]));
	$trade = stripslashes(trim($_POST["trade"]));
	$query = mysql_query("update tb_system_user set nickname='$nkname', sex = '$sex',dept='$trade',adress='$adress',grqm='$sign',position='$position' where id = '$yhid'");
	if($query){
		$arr[] = array('sec' => '1');
		echo json_encode($arr);
		exit;
	}
	if(empty ($arr)){
		$arr[] = array('sec' => '-2');
		echo json_encode($arr);
		exit;
	}
}
?>