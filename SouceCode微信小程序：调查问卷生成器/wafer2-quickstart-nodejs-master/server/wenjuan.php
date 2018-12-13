<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
	$sql="select * from ques_answ_rela";
	$name=mysqli_query($link, $sql);
	while($row_one = mysqli_fetch_array($name)){
		echo $row_one['ques_tablename'];
    echo "|";
		echo $row_one['id'];
    echo "|";
	}
  mysqli_close($link);
}
?>
