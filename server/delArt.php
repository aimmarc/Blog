<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php");
$action = $_GET["action"];
if($action == "vali") {
	if(empty($_SESSION["del"])){
		$arr[] = array('sec' => '3');
	}else if($_SESSION["del"] == -1){
		$_SESSION["del"] = 100;
		$arr[] = array('sec' => '-1');
	}else if($_SESSION["del"] == 1){
		$_SESSION["del"] = 100;
		$arr[] = array('sec' => '1');
	}else{
		$arr[] = array('sec' => '3');
	}
	echo json_encode($arr);
	exit;
}
else{
	$id = $_GET["id"];
	echo $id;
	$yhid = $_SESSION['id'];
	if(empty ($yhid)){
		header("location:../login.html"); 
		exit;
	}
	else{
		$query = mysql_query("select yhid from artic where id = '$id'");
		while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
			if($row["yhid"]==$yhid){
				$query = mysql_query("delete from artic where id = '$id'");
				$query1 = mysql_query("delete from comment where wzid = '$id'");
				if($query&&$query1){
					$_SESSION["del"] = 1;
					header("location:../myself.html"); 
					exit;
				}
				else{
					$_SESSION["del"] = -1;
					header("location:../myself.html"); 
					exit;
				}
			}
		
		}
	}
}

?>