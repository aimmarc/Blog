<?php
	if(isset($_POST["ok"]) && $_POST["ok"] == "确定")  
	{
		$con = mysql_connect("localhost","root","root");
		if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
  else{
	  $user = $_POST["username"];  
        $psw = $_POST["password"];  
		if($user==''||$psw==''){
			echo('请输入用户名和密码');
			return;
		}
		mysql_select_db("blog",$con);
		//$result = mysql_query("SELECT * FROM TB_SYSTEM_USER where username = "+$user);
		$sql = "INSERT INTO TB_SYSTEM_USER(uasername,password) values('$user','$psw')";
		$query = mysql_query($sql);
		echo "注册成功";
	 }
  }
	mysql_close($con);
?>