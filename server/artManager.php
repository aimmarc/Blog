<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php"); 
$action = $_GET["action"];
if($action=="getart"){
    $userid = stripslashes(trim($_POST["uid"]));
    if(empty ($userid)){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    else{
        $query = mysql_query("select t1.*,t2.uasername from artic t1,tb_system_user t2 where t1.yhid = t2.id and t1.yhid = '$userid'");
        while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
            $arr[] = $row;
        }
        echo json_encode($arr);
        }
}
if($action=="getpl"){
    $wzid = stripslashes(trim($_POST["uid"]));
    if(empty ($wzid)){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    else{
        $query = mysql_query("select t1.*,t2.uasername from comment t1,tb_system_user t2 where t1.yhid = t2.id and wzid = '$wzid'");
        while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
            $arr[] = $row;
        }
        if(empty ($arr)){
            $arr[] = array('sec' => '-1');
            echo json_encode($arr);
            exit;
        }
        echo json_encode($arr);
        //exit;
        /**/
    }
}
if($action=="del"){
    $wzid = stripslashes(trim($_POST["aid"]));
    if(empty ($wzid)){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    else{
        $query = mysql_query("delete from artic where id = '$wzid'");
        $query1 = mysql_query("delete from comment where wzid = '$wzid'");
        if(($query)&&($query1)){
            $arr[] = array('sec' => '1');
        }
        else{
            $arr[] = array('sec' => '-1');
        }
        echo json_encode($arr);
        exit;
    }
}
?>