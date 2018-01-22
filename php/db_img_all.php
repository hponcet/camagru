<?php
  include('../php/setup.php');
  header("Content-Type", "application/json");
  $SQLQuery = $db->prepare('SELECT * FROM img WHERE public = 1 ORDER BY date DESC');
  $SQLQuery->execute();
  $data = array();
  if ($SQLQuery != NULL) {
  		while ($try = $SQLQuery->fetch()) {
    			$data[] = $try;
    	}
        echo json_encode($data);
  }
?>
