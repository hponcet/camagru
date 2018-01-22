<?php
  include('../php/setup.php');
  header("Content-Type", "application/x-www-form-urlencoded");

  $msg = $_POST['comment'];
  $pseudo = $_POST['pseudo'];
  $img_id = $_POST['img_id'];
  $SQLQuery = $db->prepare('INSERT INTO comments (pseudo, content, img_id) VALUES(\''.$pseudo.'\', \''.$msg.'\', \''.$img_id.'\')');
  $SQLQuery->execute();

  $SQLQuery = $db->prepare('SELECT * FROM comments WHERE content = ?');
  $SQLQuery->execute(array($msg));
  $data = array();
  if ($SQLQuery != NULL) {
          while ($try = $SQLQuery->fetch()) {
              $data[] = $try;
      }
        echo json_encode($data);
  }
?>
