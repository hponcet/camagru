<?php if (empty($_SESSION['id'])){ echo '<META HTTP-EQUIV="Refresh" CONTENT="0; URL=index.php?p=signin">';} else { ?>

    <div id="picPageContainer">
        <center>
            <form action="#" id="uploadImg">
                <div class="input-file-container">
                    <input class="input-file" id="my-file" type="file"  accept="image/*">
                    <label for="my-file" class="input-file-trigger" tabindex="0">Upload a file...</label>
                </div>
                <p class="file-return"></p>
            </form>
            <div id="blocLeft">
                <div id="blocCamera">
                    <div id="maskDiv">
                        <video id="video"></video>
                    </div>
                </div>
                <div id="maskTitle">Choose a mask for take a picture.</div>
                    <div id="blocMask">
                        <?php
                        $maskTab = $tools->filesByExtensionIntoDir("../img/mask/", "png");
                        for ($i=0; $i < count($maskTab); $i++) {
                            echo '<div class="thumbVid">
                            <video class="videoUnderMask"></video>
                            <img class="mask" src="'.$maskTab[$i].'" onclick="maskSelect(\''.$maskTab[$i].'\')"/>
                            </div>';}
                        ?>
                    </div>
                    <button id="startButton">Shoot !</button>
                </div>
                <div id="blocRight">
                    <div id="exitPellicule">
                        <div id="pellicule"></div>
                    </div>
                </div>
        </center>
    </div>
    <script src="../js/camera.js"></script>

<?php } ?>
