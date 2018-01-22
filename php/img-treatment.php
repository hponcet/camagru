<?php include('../php/setup.php'); ?>

<?php
  header("Content-Type: text/plain");
  date_default_timezone_set('UTC+1');
  $date = date("d/m/y");

  $picRawData = (isset($_POST['picData'])) ? $_POST['picData'] : NULL;
  $picData = explode(",", $picRawData);
  $picture = base64_decode($picData[1]);
  $mask = base64_decode($picData[3]);

  $image = imagecreatefromstring($picture);
  $frame = imagecreatefromstring($mask);

  imagecopymerge($image, $frame, 0, 0, 0, 0, 640, 480, 50);
  // cree une url a partir d'un timestamp et de deux nombres random de 9 chiffres.
  $url = '../img/pictures/img_'.time().'_'.rand().rand().'.png';

  // decodage et creation de l'image au format bitmap
  $properPicture = base64_decode($picData[5]);
  $proper = imagecreatefromstring($properPicture);

  /* decommentez la ligne en dessous pour avoir le rendu de
  la fusion des images coté serveur */
  //imagepng($image, $url);
  imagepng($proper, $url);

  // Requete d'ecriture SQL
  $db->exec('INSERT INTO img(name, user_id, like_count, url, public, pseudo) VALUES(\''.$_SESSION['pseudo'].' '.$date.'\', \''.$_SESSION['id'].'\', \'0\', \''.$url.'\', \'1\', \''.$_SESSION['pseudo'].'\')');

  $SQLQuery = $db->prepare('SELECT * FROM img WHERE url = ?');
  $SQLQuery->execute(array($url));
  $data = array();
  if ($SQLQuery != NULL) { // je range dans un tableau ma réponse sql
      while ($try = $SQLQuery->fetch()) {
          $data[] = $try;
      }
      echo json_encode($data); // là je renvoie une réponse organisé avec JSON
  }
?>
