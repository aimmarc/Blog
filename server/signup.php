<?php
session_start();
ini_set('session.gc_maxlifetime', 3600);
$action = $_GET["action"];
if($action=='sign'){
    require_once ("conect.php");
    $username = stripslashes(trim($_POST["uasername"]));
    $password = stripslashes(trim($_POST["password"]));
    $email = stripslashes(trim($_POST["email"]));
    $address = stripslashes(trim($_POST["address"]));
    $query = mysql_query("INSERT INTO TB_SYSTEM_USER (uasername,password,email,adress) VALUES('$username','$password','$email','$address')");
    if($query){
        $arr[] = array('sec' => '1');
    }else{
        $arr[] = array('sec' => '-1');
    }
    echo json_encode($arr);
}
?>