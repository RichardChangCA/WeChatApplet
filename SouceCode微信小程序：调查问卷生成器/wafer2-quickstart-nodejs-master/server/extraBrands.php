<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
	$result = mysqli_query($link,"SELECT * FROM goods");
	while($row = mysqli_fetch_array($result))
    {

    //echo " ";
    echo $row['productName'];
    echo "|";
  }
  mysqli_close($link);
}
?>
