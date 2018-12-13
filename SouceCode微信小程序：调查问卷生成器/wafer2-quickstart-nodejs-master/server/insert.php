<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
  //  if (isset($_POST['submit'])){
 //       if ($_POST['pw'] === $_POST['repw']){
    /*$query = "insert into result (one,two,three) values('{$_POST['gender']}','{$_POST['input']}','{$_POST['收入水平']}')";*/

    $query = "insert into result (one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen) values('{$_POST['gender']}','{$_POST['input']}','{$_POST['收入水平']}','{$_POST['职业']}','{$_POST['学历']}','{$_POST['婚姻状况']}','{$_POST['平均每月在服饰类的消费']}','{$_POST['平均每月在包包类的消费']}','{$_POST['平均每月在护肤彩妆类的消费']}','{$_POST['在微店的消费类型']}','{$_POST['在购物过程中会注重物品的哪方面']}','{$_POST['您平时喜欢购买的包包品牌']}','{$_POST['您平时喜欢购买的护肤品牌']}','{$_POST['您平时喜欢购买的彩妆品牌']}','{$_POST['您平时喜欢购买的鞋子品牌']}','{$_POST['您网上购物的频率']}','{$_POST['您喜欢在周末还是工作日刷淘宝或微店']}','{$_POST['您购物的时间']}','{$_POST['你在什么时候季节最喜欢买彩妆']}')";
    $result=mysqli_query($link, $query);
    echo "$result"; 
//    header("Location:register successfully.php");
//        }else {
//			header("location:register defeat.php");
//        }
  //  }
}
?>
