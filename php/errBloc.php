<div id="errBloc">
  <?php
    if (strpos($_GET['e'], "P")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Le champ pseudo n\'a pas été remplis.</div>';
    }
    if (strpos($_GET['e'], "M")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Le champ e-mail n\'a pas été remplis.</div>';
    }
    if (strpos($_GET['e'], "S")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Password manquant.</div>';
    }
    if (strpos($_GET['e'], "E")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Les e-mails ne concordent pas.</div>';
    }
    if (strpos($_GET['e'], "W")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Les mots de passe ne concordent pas.</div>';
    }
    if (strpos($_GET['e'], "H")) {
      echo '<div class="errBox"><img src="../img/err.png"/> L\'adresse e-mail n\'est pas au bon format.</div>';
    }
    if (strpos($_GET['e'], "R")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Ce pseudo existe déja.</div>';
    }
    if (strpos($_GET['e'], "T")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Cet e-mail éxiste déja.</div>';
    }
    if (strpos($_GET['e'], "X")) {
      echo '<div class="errBox"><img src="../img/err.png"/> Ce compte n\'éxiste pas où le mot de passe n\'est pas valide.</div>';
    }
  ?>
</div>
