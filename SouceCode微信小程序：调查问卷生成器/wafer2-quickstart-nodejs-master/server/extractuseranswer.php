<?php 
header("content-type:text/html;charset=utf-8");
$userid=$_POST["userid"];
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
  $sql="select * from newinsert where id =".$userid.";";
  $name=mysqli_query($link, $sql);
  // echo $name;
  while($row = mysqli_fetch_array($name))
  {
    echo $row['one'];
    echo '|';
    echo $row['two'];
    echo '|';
    echo $row['three'];
    echo '|';
    echo $row['four'];
    echo '|';
    echo $row['five'];
    echo '|';
    echo $row['six'];
  }
  mysqli_close($link);
}
?>
