<?php
  $sIBD = 'signupInputBadDescription';
?>
<div class="sign">

  <?php include("../php/errBloc.php"); ?>

  <span id="signupDescription"> Veuillez renseigner les champs ci-dessous. </span>
  <div class="blocSign">
    <form action="../php/check.php" method="POST">
      <table align="center">
        <tr>
          <td width="100px"><span class="signupInputDescription">Prénom</span></td><td><input class="signupInputs" type="text" name="firstname" value="<?php echo $_GET['FN']; ?>"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">Nom</span></td><td><input class="signupInputs" type="text" name="lastname" value="<?php echo $_GET['LN']; ?>"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">Pseudo*</span></td><td><input id="<?php if (stripos($_GET['e'], 'P') || stripos($_GET['e'], 'R')){echo $sIBD;}?>" class="signupInputs" type="text" name="pseudo" value="<?php echo $_GET['P']; ?>"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">E-mail*</span></td><td><input id="<?php if (stripos($_GET['e'], 'M') || stripos($_GET['e'], 'E') || stripos($_GET['e'], 'T') || stripos($_get['e'], 'H')){echo $sIBD;}?>" class="signupInputs" type="text" name="email" value="<?php echo $_GET['E']; ?>"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">Confirmer*</span></td><td><input id="<?php if (stripos($_GET['e'], 'E')){echo $sIBD;}?>" class="signupInputs" type="text" name="email2"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">Mot de passe*</span></td><td><input id="<?php if (stripos($_GET['e'], 'S') || strpos($_GET['e'], 'W')){echo $sIBD;}?>" class="signupInputs" type="password" name="password"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">Confirmer*</span></td><td><input id="<?php if (strpos($_GET['e'], 'W')){echo $sIBD;}?>" class="signupInputs" type="password" name="password2"/></td>
        </tr>
      </table>
      <input type="submit" class="button" value="Valider"/>
    </form>
  </div>
</div>
