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
 mysqli_set_charset($conn, "utf8");//!!
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql = "SELECT name FROM administrator WHERE account=".$account.";";
$result = $conn->query($sql);
while($row = mysqli_fetch_assoc($result)) {
    echo $row["name"];
}
?>