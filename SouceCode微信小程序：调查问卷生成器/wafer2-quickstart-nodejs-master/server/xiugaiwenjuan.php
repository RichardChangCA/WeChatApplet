<?php 
header("content-type:text/html;charset=utf-8");
//echo "enter"; 
$link = mysqli_connect('localhost', 'root', '6cnPngqN','testresult');
mysqli_set_charset($link, "utf8");//!!
if (!$link) {
    die('Could not connect: ' . mysql_error());
    echo "fail"; 
}else {
	$sql_five="select id from ques_answ_rela order by id desc LIMIT 1";
	$num=mysqli_query($link, $sql_five);
	while($row = mysqli_fetch_array($num)){
		$num=$row['id'];
	}
	$num += 1;
//	echo "哇".$num."哇";
	$wenti = "wenti".$num;
	$sql_one="CREATE TABLE ".$wenti." (
		id INT(200) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		questionname VARCHAR(200) NOT NULL,
		A VARCHAR(200),
		B VARCHAR(200),
		C VARCHAR(200),
		D VARCHAR(200),
		E VARCHAR(200),
		F VARCHAR(200),
		G VARCHAR(200),
		H VARCHAR(200)
		)";
	$daan = "daan".$num;
	$sql_three="CREATE TABLE ".$daan." (
		id INT(200) UNSIGNED AUTO_INCREMENT PRIMARY KEY
		)";
	if (mysqli_query($link, $sql_one)) {
    	echo "数据表问题表创建成功";
	} else {
    	echo "创建数据表问题表错误: " . mysqli_error($conn);
	}
	if (mysqli_query($link, $sql_three)) {
    	echo "数据表答案表创建成功";
	} else {
    	echo "创建数据表答案表错误: " . mysqli_error($conn);
	}
	$submit = $_POST["mysubmit"];
	$submit = split('[,]',$submit);
	$n=1;
	for($j=0;$j<count($submit);$j++){
	//	echo "啊".$submit[$j]."啊";
	//	echo stripos($submit[$j],"(单选)");
		if($j%9==0){
	//		echo "略略";
			if($submit[$j]=="''"){
		//		echo "亚希";
				$j+=8;
				continue;
			}
			if(stripos($submit[$j],"(单选)")==1 or stripos($submit[$j],"(多选)")==1 or stripos($submit[$j],"(输入)")==1){
			//	echo ("猪");
			}
			else {
			//	echo("狗");
				for($z=$j+1;$z<$j+9;$z++){
					if($submit[$z]!="''")break;
				}
				if($z==$j+9)$submit[$j]=$submit[$j][0]."(输入)".substr($submit[$j],1);
				else $submit[$j]=$submit[$j][0]."(单选)".substr($submit[$j],1);
			}
		//	echo "毒".$submit[$j]."毒";
			$i=0;
			$val_str = "";
			$val_str = $val_str.$submit[$j];
		}
		else $val_str = $val_str.','.$submit[$j];
//		echo $val_str."哈";
		$i++;
		if($i==9){
	//		echo "嘻嘻嘻";
			$sql_two = "insert into ".$wenti."(questionname,A,B,C,D,E,F,G,H) values(".$val_str.")";//拼接
			if (mysqli_query($link, $sql_two)) {
    			echo "数据插入成功";
			} else {
    			echo "数据插入错误: " . mysqli_error($conn);
			}
			$sql_four ="alter table ".$daan." ADD wenti".$n." VARCHAR(200);";
			if (mysqli_query($link, $sql_four)) {
    			echo "答案表修改成功";
			} else {
    			echo "答案表修改错误: " . mysqli_error($conn);
			}
			$n++;
		}
		
	}
}
$admin = $_POST["adminCode"];
$adminCode = $admin[1];
for($k=2;$k<9;$k++){
	$adminCode = $adminCode.$admin[$k];
}

$sql_six = "insert into ques_answ_rela(ques_tablename,answ_tablename,modi_admincode) values('".$wenti."','".$daan."','".$adminCode."');";
//echo $sql_six;
//echo "嘻".$adminCode."嘻";
if (mysqli_query($link, $sql_six)) {
    			echo "问题答案对应表修改成功";
			} else {
    			echo "问题答案对应表修改错误: " . mysqli_error($conn);
			}
mysqli_close($conn);
?>