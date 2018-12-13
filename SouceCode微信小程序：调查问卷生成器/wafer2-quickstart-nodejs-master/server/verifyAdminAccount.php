<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$account=$_POST["account"];
$servername = "localhost";
$username = "root";
$password = "6cnPngqN";
 $dbname = "testresult";
// 创建连接
$conn = new mysqli($servername, $username, $password,$dbname);
 
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql = "SELECT password FROM administrator WHERE account=".$account.";";
$result = $conn->query($sql);
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
       echo "'".$row["password"]."'";
    }
} else {
    echo "账号错误";
}
?>