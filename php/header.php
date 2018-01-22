<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../css/styleSh.css">
  <title>Camagru</title>
</head>

<body>
  <div id="menuBar">
    <?php
      if (isset($_SESSION['email']) && isset($_SESSION['pseudo'])) {
        echo '
          <li class="hrzMenu" id="home"><a href="index.php?p=index"></a></li>
          <li class="hrzMenu" id="exit"><a href="index.php?p=disconnect"></a></li>
          <li class="hrzMenu" id="account"><a href="index.php?p=#"></a></li>
          <li class="hrzMenu" id="photo"><a href="index.php?p=camera"></a></li>
          <li class="hrzMenu" id="caroussel"><a href="index.php?p=galery"></a></li>
        ';
      } else {
        echo '
          <li class="hrzMenu" id="home"><a href="index.php?p=index"></a></li>
          <li class="hrzMenu" id="sign"><a href="index.php?p=signup">Sign up</a></li>
          <li class="hrzMenu" id="auth"><a href="index.php?p=signin">Sign in</a></li>
        ';
      }
      ?>
</div>
