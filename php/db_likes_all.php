<?php
  include('../php/setup.php');
  header("Content-Type", "application/json");
  $SQLQuery = $db->prepare('SELECT * FROM likes');
  $SQLQuery->execute();
  $data = array();
  if ($SQLQuery != NULL) {
  		while ($try = $SQLQuery->fetch()) {
    			$data[] = $try;
    	}
        echo json_encode($data);
  }
?>
