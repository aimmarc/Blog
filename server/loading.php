<?php
session_start();
ini_set('session.gc_maxlifetime', 1000);
//if(empty ($_SESSION['id'])){
    //$arr[] = array('sec' => '-1');
   // echo json_encode($arr);
   // exit; 
//}
//else{
   require_once ("conect.php");
    $action = $_GET["action"];
    if($action == "loadAdmin"){
    //$user = $_SESSION['id'];//stripslashes(trim($_POST["uaserid"]));
    //if (empty ($user)) { 
       // echo "获取用户信息异常"; 
       // exit; 
   // } 
    $query = mysql_query(" select t.*,u.uasername,u.nickname from artic t,tb_system_user u where t.wzzt = '1' and t.yhid = u.id order by id desc");//加 LIMIT 20 表示前20条记录
    while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
        $arr[] = $row;
        //$arr["success"] = "1";
    }
    echo json_encode($arr);
} 
    
//}

?>