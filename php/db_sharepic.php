<?php
  include('../php/setup.php');
  header("Content-Type", "application/x-www-form-urlencoded");
  $data = base64_decode($_POST['data']);
  list($id, $url) = explode(",", $data);
  $SQLQuery = $db->prepare('SELECT public FROM img WHERE id = ?');
  $SQLQuery->execute(array($id));
  $req = $SQLQuery->fetch();
  if ($req[0] == 0) {
    $req[0] = 1;
  } else {
    $req[0] = 0;
  }
  $SQLQuery = $db->prepare('UPDATE img SET public = ? WHERE id = ?');
  $SQLQuery->execute(array($req[0], $id));
  echo $req[0];
?>
