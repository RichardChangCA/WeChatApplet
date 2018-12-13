<?php 
header("content-type:text/html;charset=utf-8");
$id=$_POST["id"];
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
  $sql="select * from ques_answ_rela where id =".$id.";";
  $name=mysqli_query($link, $sql);
  while($row_one = mysqli_fetch_array($name)){
    $name=$row_one['ques_tablename'];
  }
	$result = mysqli_query($link,"SELECT A,B,C,D,E,F,G,H FROM ".$name.";");
	while($row = mysqli_fetch_array($result))
    {
    if($row['A']!=null){
       echo $row['A']; 
       echo " ";
    }
    if($row['A']==null){
       echo " ";
    }
    if($row['B']!=null){
       echo $row['B']; 
       echo " ";
    }
    if($row['C']!=null){
       echo $row['C']; 
       echo " ";
    }
    if($row['D']!=null){
       echo $row['D']; 
       echo " ";
    }
    if($row['E']!=null){
       echo $row['E']; 
       echo " ";
    }
    if($row['F']!=null){
       echo $row['F']; 
       echo " ";
    }
    if($row['G']!=null){
       echo $row['G']; 
       echo " ";
    }
    if($row['H']!=null){
       echo $row['H']; 
       echo " ";
    }
    echo "|";
  }
  mysqli_close($link);
}
?>
