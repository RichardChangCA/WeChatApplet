<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
	$tag=$_POST['tag'];
//	echo "略".$tag."略";
	$sql="select * from ques_answ_rela where id=".$tag.";";
	$name=mysqli_query($link, $sql);
	while($row_one = mysqli_fetch_array($name)){
		$name=$row_one['answ_tablename'];
	}
	$sql_another="select count(*) count_num from ".$name.";";
	$num=mysqli_query($link, $sql_another);
	while($row_one = mysqli_fetch_array($num)){
		$num=$row_one['count_num'];
	}
	$num+=1;
//	echo "好".$num."好";
//	echo $name;
    $val = $_POST['mysubmit'];
 //   echo "拉拉".$val."拉拉";
    $query = "insert into ".$name." values('".$num."',".$val.")";//拼接
	if (mysqli_query($link, $query)) {
    	echo $num;
	} else {
    	echo "数据插入错误: " . mysqli_error($conn);
	}
}
?>
