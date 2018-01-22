<?php include("../php/includes.php"); ?>
<?php include("../php/header.php"); ?>
<div class="flexCenterContent" id="pageContent">
    <?php
    if (isset($_GET['p'])) {
        $page = htmlspecialchars($_GET['p']);
        switch ($page) {
            case 'signup':
                include("../php/signup.php");
                break;
            case 'signin':
                include("../php/signin.php");
                break;
            case 'camera':
                include("../php/camera.php");
                break;
            case 'index':
                include("../php/index.php");
                break;
            case 'disconnect':
                include("../php/disconnect.php");
                break;
            case 'showcase':
                include("../php/showcase.php");
                break;
            case 'galery':
                include("../php/galery.php");
                break;
            default:
                include('../php/404.php');
                break;
        }
    }
    else {
        include("../php/index.php");
    }
    ?>
</div>
<?php include("../php/footer.php"); ?>
