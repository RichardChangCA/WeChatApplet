<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$id=$_POST["id"];
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
//	echo $id."和";
	$sql="select * from ques_answ_rela where id =".$id.";";
//	echo $sql."和";
	$name=mysqli_query($link, $sql);
	while($row_one = mysqli_fetch_array($name)){
		$name=$row_one['ques_tablename'];
		$tag=$row_one['id'];
	}
	$result = mysqli_query($link,"SELECT * FROM ".$name.";");
	while($row = mysqli_fetch_array($result))
    {

    //echo " ";
    echo $row['questionname'];
    echo "|";
  }
  echo $tag;
  mysqli_close($link);
}
?>
