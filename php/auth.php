<?php include('../php/setup.php'); ?>
<?php
/* --- Authentification depuis la page signin.php --- */
/* Recuperation des donnees depuis POST */

$postEmail = strip_tags($_POST['email']);
$postMDP = hash('whirlpool', $_POST['password']);
/* Recherche des occurences dans la BDD */
$checkMDP = $db->prepare('SELECT * FROM users WHERE password = ?');
$checkMDP->execute(array($postMDP));
$checkEmail = $db->prepare('SELECT * FROM users WHERE email = ?');
$checkEmail->execute(array($postEmail));
$verifiedEmail = $checkEmail->rowCount();
$verifiedMDP = $checkMDP->rowCount();

if ($verifiedMDP > 0 && $verifiedEmail > 0) {
  /* Authentification reussie */
  session_start();
  $infoUser = $db->prepare('SELECT * FROM users WHERE email = ?');
  $infoUser->execute(array($postEmail));
  $fetchedInfoUser = $infoUser->fetch();
  $_SESSION['id'] = $fetchedInfoUser['id'];
  $_SESSION['firstname'] = $fetchedInfoUser['firstname'];
  $_SESSION['lastname'] = $fetchedInfoUser['lastname'];
  $_SESSION['pseudo'] = $fetchedInfoUser['pseudo'];
  $_SESSION['email'] = $fetchedInfoUser['email'];
  header ('Location: ../html/index.php?p=index');
} else {
  /* Preparation du retour d'erreur */
  $eRet = "e=Q";
  if (!filter_var($postEmail, FILTER_VALIDATE_EMAIL)) {
    $eRet .= "H";
  }
  if (empty($_POST['password'])){
    $eRet .= "S";
  }
  if (empty($_POST['email'])){
    $eRet .= "M";
  }
  if ($verifiedMDP === 0 || $verifiedEmail === 0) {
    $eRet .= "X";
  }
  header ('Location: ../html/index.php?p=signin&'.$eRet.'&mail='.$postEmail);
}
?>
