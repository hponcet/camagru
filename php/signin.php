
<div class="sign">
  <?php include("../php/errBloc.php"); ?>
  <center><span id="signupDescription"> Connexion </span></center>
  <div class="blocSign">
    <form action="../php/auth.php" method="POST">
      <table align="center">
        <tr>
          <td width="100px"><span class="signupInputDescription">E-mail</span></td><td><input  id="<?php if (stripos($_GET['e'], 'M') || stripos($_GET['e'], 'E') || stripos($_GET['e'], 'T') || stripos($_get['e'], 'H')){echo $sIBD;} ?>" class="signupInputs" type="text" name="email"/></td>
        </tr>
        <tr>
          <td width="100px"><span class="signupInputDescription">Password</span></td><td><input id="<?php if (stripos($_GET['e'], 'S') || strpos($_GET['e'], 'W')){echo $sIBD;}?>" class="signupInputs" type="password" name="password"/></td>
        </tr>
      </table>
      <input type="hidden" name="from" value="signin"/>
      <input type="submit" class="button" value="Valider"/>
    </form>
  </div>
</div>
