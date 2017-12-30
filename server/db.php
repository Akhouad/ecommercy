<?php
try{
	$conn = oci_connect('system', '123', 'localhost/XE');
}catch(PDOException $e){
	echo $e->getMessage();
}