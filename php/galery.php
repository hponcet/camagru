<div id='user' class=<?php if (isset($_SESSION['pseudo'])) {echo '\''.$_SESSION['pseudo'].'\'';}else{echo '\'Guest\'';}; ?>></div>
<center>
    <div id='galery'>
        <div id="blocPictures" margin="15px">
        </div>
    </div>
</center>
<script src="../js/galery.js"></script>
