<?php
  include('../php/setup.php');
  header("Content-Type", "application/x-www-form-urlencoded");
  $data = base64_decode($_POST['data']);
  list($id, $url) = explode(",", $data);
  $SQLQuery = $db->prepare('DELETE FROM img WHERE id = ?');
  $SQLQuery->execute(array($id));
  unlink($url);
  echo $url;
?>
