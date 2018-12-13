<?php
header("Content-type: text/html; charset=utf-8");
exec("python recommend.py",$array,$ret);
echo("result : $array");
echo("ret is $ret");
echo "啦啦啦";
?>