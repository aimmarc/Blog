<?php
session_start();
ini_set('session.gc_maxlifetime', 3600); 
$host="localhost";
$db_user="root";
$db_pass="root";
$db_name="blog";
$timezone="Asia/Shanghai";

$link=mysql_connect($host,$db_user,$db_pass);
mysql_select_db($db_name,$link);
mysql_query("SET names UTF8");

header("Content-Type: text/html; charset=utf-8");
date_default_timezone_set($timezone); //����ʱ��
?>