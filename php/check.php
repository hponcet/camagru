<?php include('../php/setup.php'); ?>
<?php
  /* Depuis le formulaire d'inscription signup.php */
  $postFN = strip_tags($_POST['firstname']);
  $postLN = strip_tags($_POST['lastname']);
  $postP = strip_tags($_POST['pseudo']);
  $postPW = hash('whirlpool', $_POST['password']);
  $postPW2 = hash('whirlpool', $_POST['password2']);
  $postE = strip_tags($_POST['email']);
  $postE2 = strip_tags($_POST['email2']);
  $checkPseudo = $db->prepare('SELECT * FROM users WHERE pseudo = ?');
  $checkPseudo->execute(array($postP));
  $checkEmail = $db->prepare('SELECT * FROM users WHERE email = ?');
  $checkEmail->execute(array($postE));
  $checkP = $checkPseudo->rowCount();
  $checkE = $checkEmail->rowCount();
  if (!empty($_POST['pseudo']) && !empty($_POST['password']) && !empty($_POST['email']) && $checkP == 0 && $checkE == 0 && $postE === $postE2 && $postPW === $postPW2)
  {
      $db->exec('INSERT INTO users (firstname, lastname, pseudo, password, email) VALUES (\''.$postFN.'\', \''.$postLN.'\', \''.$postP.'\', \''.$postPW.'\', \''.$postE.'\')');
      header ('Location: ../html/index.php');
  } else {
    $eRet = "e=Q";
    if (empty($_POST['pseudo'])){
      $eRet .= "P";
    }
    if (empty($_POST['password'])){
      $eRet .= "S";
    }
    if (empty($_POST['email'])){
      $eRet .= "M";
    }
    if ($postE !== $postE2){
      $eRet .= "E";
    }
    if ($postPW !== $postPW2){
      $eRet .= "W";
    }
    if (!filter_var($postE, FILTER_VALIDATE_EMAIL)) {
      $eRet .= "H";
    }
    if ($checkP > 0) {
      $eRet .= "R";
    }
    if ($checkE > 0) {
      $eRet .= "T";
    }
    header ('Location: ../html/index.php?p=signup&'.$eRet.'&FN='.$postFN.'&LN='.$postLN.'&P='.$postP.'&E='.$postE);
  }
?>
