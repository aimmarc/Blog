<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php"); 
$action = $_GET["action"];
if($action=="dlyz"){
    if(empty ($_SESSION['id'])){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    else{
        $aid = stripslashes(trim($_POST["aid"]));
        $query = mysql_query("select * from artic where id = '$aid'");
        while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
            $arr[] = $row;
            echo json_encode($arr);
            exit;
        }
        if(empty ($row)){
            $arr[] = array('sec' => '-2');
            echo json_encode($arr);
            exit;
        }
    }
}
if($action=="update"){
    if(empty ($_SESSION['id'])){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    else{
        $bt = stripslashes(trim($_POST["wzBt"]));
        $nr = stripslashes(trim($_POST["wzZW"]));
        $zt = stripslashes(trim($_POST["zt"]));
        $aid = stripslashes(trim($_POST["aid"]));
		$lrtxt = stripslashes(trim($_POST["lrtxt"]));
        $query = mysql_query("update artic set wzzt='$zt',wzbt='$bt',wznr='$nr',wznr_txt='$lrtxt' where id='$aid'");
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
        //echo json_encode($arr);
    }
}
?>