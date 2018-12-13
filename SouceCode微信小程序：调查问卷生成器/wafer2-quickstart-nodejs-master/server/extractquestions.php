<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
	$sql="select * from ques_answ_rela order by id desc LIMIT 1";
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
