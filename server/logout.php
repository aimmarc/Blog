<?php 
session_start(); 
session_destroy(); 
$action = $_GET["action"];
echo "location:../"+"$action"+".html";
header("location:../".$action.".html"); 
?> 