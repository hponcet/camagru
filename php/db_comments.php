<?php
  include('../php/setup.php');
  header("Content-Type", "application/json");
  $id = $_POST['id'];
  $SQLQuery = $db->prepare('SELECT * FROM comments WHERE img_id = ? ORDER BY id DESC');
  $SQLQuery->execute(array($id));
  $data = array();
  if ($SQLQuery != NULL) {
  		while ($try = $SQLQuery->fetch()) {
    			$data[] = $try;
    	}
        echo json_encode($data);
  }
?>
