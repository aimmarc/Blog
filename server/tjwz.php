<?php 
session_start();
ini_set('session.gc_maxlifetime', 3600); 
require_once ("conect.php"); 
$action = $_GET["action"];
if($action=="sfdl"){
    if(empty ($_SESSION['id'])){
        $arr[] = array('sec' => '-1');
        echo json_encode($arr);
        exit; 
    }
    else{
        $arr[] = array('sec' => '1');
        //echo $_SESSION['id'];
        echo json_encode($arr);
        exit; 
    }
}
if($action == "tjwz"){
    $bt = stripslashes(trim($_POST["wzBt"]));
    $zw = stripslashes(trim($_POST["wzZW"]));
    $zt = stripslashes(trim($_POST["zt"]));
	$wzlb = stripslashes(trim($_POST["wzLb"]));
	$date = stripslashes(trim($_POST["date"]));
	$src = stripslashes(trim($_POST["src"]));
    $yhid = $_SESSION['id'];
	$wznr_txt = stripslashes(trim($_POST["wznr_txt"]));
    if(empty ($bt)){
        exit;
    }
    if(empty ($zw)){
        exit;
    }
    $query = mysql_query("INSERT INTO artic (wzbt,wznr,wzzt,yhid,wznr_txt,fbsj,wzlb,src) VALUES('$bt','$zw','$zt','$yhid','$wznr_txt','$date','$wzlb','$src')");
    if($query){
        $_SESSION["tjwzsec"] = 1;
        $arr["tjwzsec"] = $_SESSION["tjwzsec"];
    }
    else{
        $_SESSION["tjwzsec"] = 0;
        $arr["tjwzsec"] = $_SESSION["tjwzsec"];
    }    
    echo json_encode($arr);
}
?>