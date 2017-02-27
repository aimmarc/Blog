<?php
	session_start();
	//ini_set('session.gc_maxlifetime', 1000);
	require_once ("conect.php");
	$action = $_GET["action"];
    if($action == "getgrxx"){
		
		if(empty ($_SESSION['id'])){
			$arr[] = array('sec' => '-1');
			echo json_encode($arr);
			exit; 
		}
		$user = $_SESSION['id'];
		$query = mysql_query(" select u.uasername,u.nickname from tb_system_user u where u.id='$user'");//加 LIMIT 20 表示前20条记录
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
?>
