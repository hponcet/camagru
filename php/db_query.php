<?php
  include('../php/setup.php');
  header("Content-Type", "application/json");
  $SQLQuery = $db->prepare('SELECT * FROM img WHERE user_id = ? ORDER BY date');
  $SQLQuery->execute(array($_SESSION['id']));
  $data = array();
  if ($SQLQuery != NULL) { // je range dans un tableau ma réponse sql
  		while ($try = $SQLQuery->fetch()) {
    			$data[] = $try;
    	}
  		echo json_encode($data); // là je renvoie une réponse organisé avec JSON
  }
?>
