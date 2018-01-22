
// Cache le bloc de prise de photo si streaming === false
document.getElementById('blocLeft').style.display = "none";
document.getElementById('blocRight').style.marginLeft = "-40px";

// Affiche le bloc de gauche
function loadLeftBloc() {
    // Affiche le bloc de prise de photo
    document.getElementById('blocLeft').style.display = "inline-block";
    document.getElementById('blocRight').style.marginLeft = "0px";

    // Cache le bouton d'upload en haut
    var uploadImg = document.getElementById('uploadImg');
    uploadImg.parentNode.removeChild(uploadImg);
    document.getElementById('blocLeft').appendChild(uploadImg);
}



/***************************************************************************/
/***************************** OBJETS VIDEOS *******************************/
/***************************************************************************/

var   streaming      = false,
video          = document.querySelector('#video'),
videoUnderMask = document.getElementsByClassName('videoUnderMask'),
thumbMask      = document.getElementsByClassName('mask'),
cover          = document.querySelector('#cover'),
picCanvas      = document.createElement('canvas'),
maskCanvas     = document.createElement('canvas'),
photo          = document.querySelector('#photo'),
startbutton    = document.querySelector('#startButton'),
displaySrtBtn  = false;
width          = 640,
height         = 0;

// Identifie le navigateur
navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    // Prepare le stream video pour le web
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function(stream) { // Defini l'url pour le stream
        if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
            for (var i = 0; i < videoUnderMask.length; i++) {
                videoUnderMask[i].mozSrcObject = stream;
            }
        } else {
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
            for (var i = 0; i < videoUnderMask.length; i++) {
                videoUnderMask[i].src = vendorURL.createObjectURL(stream);
            }
        }
        video.play(); // Lance le stream
        for (var i = 0; i < videoUnderMask.length; i++) {
            videoUnderMask[i].play();
        }
    },
    function(err) { // En cas d'erreur
    console.log("An error occured! " + err);
}
);

video.addEventListener('canplay', function(ev){
    if (!streaming) {
        // Recuperation des dimmensions d'originr de la vidéo
        height = video.videoHeight / (video.videoWidth/width);
        // Attribution des dimensions de la video dans l'objet video
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        //video.style.borderRadius = "10px";
        video.style.zIndex = "0";
        video.style.marginLeft = "auto";
        video.style.marginRight = "auto";
        video.style.position = "relative";
        video.style.marginTop = "0px";


        // Attribution des dimensions de la video dans l'objet videoUnderMask
        for (var i = 0; i < videoUnderMask.length; i++) {
            videoUnderMask[i].setAttribute('width', '100px');
            videoUnderMask[i].setAttribute('height', '75px');
            videoUnderMask[i].style.borderRadius = "5px";
            videoUnderMask[i].style.zIndex = "0";
            videoUnderMask[i].style.position = "relative";
            videoUnderMask[i].style.marginBottom = "-1px";
            thumbMask[i].style.marginTop = "-80px";
        }

        // Attribut les dimmensions des canvas
        picCanvas.setAttribute('width', width);
        picCanvas.setAttribute('height', height);
        maskCanvas.setAttribute('width', width);
        maskCanvas.setAttribute('height', height);
        streaming = true;
        displaySrtBtn = true;

        // Affiche le bloc de Gauche
        loadLeftBloc();
    }
}, false);

/* Div du masque */
var mask = document.createElement('img');
mask.setAttribute('width', 640);
mask.setAttribute('height', 481);
mask.setAttribute('src', '../img/Empty.png');
mask.setAttribute('id', 'mask');
mask.style.position = "relative";
mask.style.zIndex = "1";
mask.style.display = "block";
mask.style.marginTop = "-484px";
//mask.style.borderRadius = "10px";
document.getElementById('maskDiv').appendChild(mask);

/***************************************************************************/
/************************* bouton de prise de photo ************************/
/***************************************************************************/

function takepicture(){
    // Effecement des canvas
    picCanvas.getContext('2d').clearRect(0, 0, 640, 480);
    maskCanvas.getContext('2d').clearRect(0, 0, 640, 480);
    var selectedMask = document.createElement('img');
    selectedMask.setAttribute('src', document.getElementById('mask').getAttribute('src'));

    // ecris une reproduction de video/mask dans le canvas
    if (document.querySelector("#uploadPicCanvas")) {
        picCanvas.getContext('2d').drawImage(document.querySelector('#uploadPicCanvas'), 0, 0, 640, 480);
    } else {
        picCanvas.getContext('2d').drawImage(video, 0, 0, 640, 480);
    };
    maskCanvas.getContext('2d').drawImage(selectedMask, 0, 0, width, height);

    /* Fusion des deux image dans un canvas
    (c'est beaucoup plus propre meme si il est demandé de le faire coté php) */
    var canvasProper = document.createElement('canvas');
    canvasProper.setAttribute('width', 640);
    canvasProper.setAttribute('height', 480);
    if (document.querySelector("#uploadPicCanvas")) {
        canvasProper.getContext('2d').drawImage(document.querySelector('#uploadPicCanvas'), 0, 0, 640, 480);
        canvasProper.getContext('2d').drawImage(selectedMask, 0, 0, 640, 480);
    } else {
        canvasProper.getContext('2d').drawImage(video, 0, 0, 640, 480);
        canvasProper.getContext('2d').drawImage(selectedMask, 0, 0, 640, 480);
    };

    // Copie de la donnee image brut avec l'entete png dans data
    var picData = picCanvas.toDataURL('image/png');
    var maskData = maskCanvas.toDataURL('image/png');
    var properData = canvasProper.toDataURL('image/png');
    var retData = picData + ',' + maskData + ',' + properData;
    return encodeURIComponent(retData);
}

/****************************************************************************/
/***************** AFFICHE LES IMAGES USER DANS LA PELLICULE ****************/
/****************************************************************************/

function displayUserPictures(dbTable, object) {
    var data = JSON.parse(dbTable);

    for (var i = 0; i < data.length; i++) {
        // IMAGE DE BASE DANS PELLICULE
        var img = document.createElement('div');
        img.style.backgroundImage = 'url(\''+data[i]['url']+'\')';
        img.style.backgroundSize = 'contain';
        img.style.border = "2px solid";
        img.style.marginBottom = "7px";
        img.setAttribute('class', 'viewPic');
        img.setAttribute('target', data[i]['url']);
        img.setAttribute('id', data[i]['id']);

        // Boutton Delete
        var delBtn = document.createElement('img');
        delBtn.src = '../img/del.png';
        delBtn.setAttribute('class', 'delPicBtn');
        delBtn.setAttribute('alt', 'Delete');
        delBtn.style.width = "30px";
        delBtn.style.height = "30px";
        delBtn.style.float = "right";
        delBtn.style.display = "none";
        delBtn.style.cursor =  "pointer";
        delBtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        delBtn.style.borderRadius = "3px";
        delBtn.style.margin = "3px";

        // Boutton share
        var shareBtn = document.createElement('img');
        shareBtn.src = "../img/shr.png";
        shareBtn.setAttribute('class', 'shrPicBtn');
        shareBtn.style.width = "30px";
        shareBtn.style.height = "30px";
        shareBtn.style.float = "right";
        shareBtn.style.display = "none";
        shareBtn.style.cursor =  "pointer";
        if (data[i]['public'] == '0') {
            shareBtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        } else {
            shareBtn.style.backgroundColor = "rgba(50, 205, 50, 0.5)";
        }
        shareBtn.style.borderRadius = "3px";
        shareBtn.style.margin = "3px";
        shareBtn.style.marginLeft = "300px";

        // Bouton partage sur fb
        var fbBtn = document.createElement('div');
        fbBtn.style.float = "right";
        fbBtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        fbBtn.style.width = "30px";
        fbBtn.style.height = "30px";
        fbBtn.style.marginLeft = "300px";
        fbBtn.style.borderRadius = "3px";
        fbBtn.style.margin = "3px";
        var shrFbBtn = document.createElement('a');
        shrFbBtn.style.width = "30px";
        shrFbBtn.style.height = "30px";
        shrFbBtn.setAttribute('name', 'fb_share');
        shrFbBtn.setAttribute('type', 'box_count');
        shrFbBtn.setAttribute('share_url', "http://www.perdu.com/");
        shrFbBtn.textContent = 'FB';
        var fbScript = document.createElement('script');
        fbScript.setAttribute('src', 'http://static.ak.fbcdn.net/connect.php/js/FB.Share');
        fbScript.setAttribute('type', 'text/javascript');
        fbBtn.appendChild(shrFbBtn);
        fbBtn.appendChild(fbScript);


        // Nom de la photo
        var nameBtn = document.createElement('div');
        var textNameBtn = document.createElement('div');
        nameBtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        nameBtn.style.width = "100%";
        nameBtn.style.height = "50px";
        nameBtn.style.marginTop = "175px";
        nameBtn.style.borderRadius = "0px 0px 3px 3px";
        nameBtn.style.display = "none";
        textNameBtn.style.textAlign = "center";
        textNameBtn.style.fontSize = "18px";
        textNameBtn.style.fontWeight = "bold";
        textNameBtn.style.display = "inline-block";
        textNameBtn.style.color = "rgba(255, 255, 255, 0.7)";
        textNameBtn.style.padding = "15px";
        textNameBtn.textContent = data[i]['name'];
        nameBtn.appendChild(textNameBtn);

        // Inclusion des boutons dans la Div Photo
        img.appendChild(delBtn);
        img.appendChild(shareBtn);
        //img.appendChild(fbBtn);
        img.appendChild(nameBtn);



        // Event onclick bouton SHARE
        shareBtn.addEventListener('click', function(){
            var xhrImgID = new XMLHttpRequest(); // declaration d'une requete AJAX
            var id = this.parentNode.getAttribute('id');
            var url = this.parentNode.getAttribute('target');
            var req = encodeURIComponent(btoa(id));
            var shareBtn = this;

            xhrImgID.onreadystatechange = function (){ // Recuperation de la requete Ajax
                if (xhrImgID.readyState == 4 && (xhrImgID.status == 200 || xhrImgID.status == 0)) {
                    if (xhrImgID.responseText === '1') {
                        shareBtn.style.backgroundColor = "rgba(50, 205, 50, 0.5)";
                    } else {
                        shareBtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                    }
                };
            };

            xhrImgID.open("POST", "../php/db_sharepic.php", true); // envois des données
            xhrImgID.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrImgID.send('data=' + req);
        }, false);




        // Event onclick Bouton supprimer
        delBtn.addEventListener('click', function(){
            var xhrImgID = new XMLHttpRequest(); // declaration d'une requete AJAX
            var id = this.parentNode.getAttribute('id');
            var url = this.parentNode.getAttribute('target');
            var req = encodeURIComponent(btoa(id + ',' + url));

            xhrImgID.onreadystatechange = function (){ // Recuperation de la requete Ajax
                if (xhrImgID.readyState == 4 && (xhrImgID.status == 200 || xhrImgID.status == 0)) {
                    document.getElementById('pellicule').removeChild(document.getElementById(id));
                };
            };
            xhrImgID.open("POST", "../php/db_delpic.php", true); // envois des données
            xhrImgID.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrImgID.send('data=' + req);
        }, false);

        // Event Mouseenter Faire apparaitre la div de controle sous la souris
        img.addEventListener('mouseenter', function(){
            var childs = this.childNodes;
            for (var i = 0; i < childs.length; i++) {
                childs[i].style.display = "block";
            }
            this.style.border = "2px solid";
        }, false);

        // Event Mouseleave Faire disparaitre la div de controle sous la souris
        img.addEventListener('mouseleave', function(){
            var childs = this.childNodes;
            for (var i = 0; i < childs.length; i++) {
                childs[i].style.display = "none";
                this.style.border = "2px solid";
            }
        }, false);

        // Insertion de l'objet image dans la pellicule
        document.getElementById('pellicule').insertBefore(img, document.getElementById('pellicule').childNodes[0]);
    }
}

function loadUserPictures() {
    var xhr = new XMLHttpRequest(); // declaration d'une requete AJAX
    xhr.onreadystatechange = function (){ // Recuperation de la requete Ajax
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) { // si la requete est finit (readyState == 4) et qu'il n'y a pas eu d'erreurs (status == 200 || == 0)
        displayUserPictures(xhr.responseText, document.getElementById('pellicule')); // transformation du texte en un objet JSON.
    };
};
xhr.open("POST", "../php/db_query.php", true); // envois des données
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send('ask=1');
}
loadUserPictures();

/****************************************************************************/
/**************** ENVOYER LA PHOTO AU SERVER ET L'AFFICHER ******************/
/****************************************************************************/


function sendPictureData(data) {
    var xhr = new XMLHttpRequest(); // declaration d'une requete AJAX
    xhr.onreadystatechange = function (){ // Recuperation de la requete Ajax
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) { // si la requete est finit (readyState == 4) et qu'il n'y a pas eu d'erreurs (status == 200 || == 0)
            displayUserPictures(xhr.responseText, document.getElementById('pellicule')); // les donnees recuperez sont definis dans responseText.
        };
    };
    xhr.open("POST", "../php/img-treatment.php", true); // envois des données
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('picData=' + data);
}

startbutton.style.display = "none";

startbutton.addEventListener('click', function(ev){
    var imageBrute = takepicture(); // La photo est prise
    sendPictureData(imageBrute);
    ev.preventDefault();
}, false);

/****************************************************************************/
/***************************** Bouton Upload ********************************/
/****************************************************************************/

var fileInput    = document.querySelector( ".input-file" ),
uploadImgBtn = document.querySelector( ".input-file-trigger" ),
the_return   = document.querySelector(".file-return");

// action lorsque le label est cliqué
uploadImgBtn.addEventListener( "click", function( event ) {
    fileInput.focus();
    return false;
});

// affiche le chemin de l'image dès que input:file change
fileInput.addEventListener( "change", function( event ) {
    the_return.innerHTML = this.value;
});


/****************************************************************************/
/*********************** AFFICHE IMAGE UPLOAD *******************************/
/****************************************************************************/

document.querySelector('#my-file').addEventListener('change', function() {

    // Verification du type/MIME du fichier
    if (this.files[0].type !== 'image/png' &&
    this.files[0].type !== 'image/jpeg' &&
    this.files[0].type !== 'image/jpg') {
        alert(this.files[0].name+' n\'est pas un fichier image valide (ex: png/jpeg/jpg)');
        document.querySelector('#my-file').value = '';
        the_return.innerHTML = '';
    }


    // Cache la vidéo si elle est active
    var videoDiv = document.querySelector('#video');
    var thumbVid = document.getElementsByClassName('thumbVid');
    if (videoDiv) {
        videoDiv.remove();
    }
    if (videoDiv){
        for (var i = 0; i < thumbVid.length; i++) {
            thumbVid[i].childNodes[1].remove();
            if (thumbMask[i]){
                thumbMask[i].style.marginTop = "0px";
            }
            document.getElementsByClassName('mask').marginTop = "0px";
        }
    }

    //Affiche le cloc camera
    loadLeftBloc();
    displaySrtBtn = true;

    // Lecture du fichier uploadé et mise en place dans le DOM
    var reader = new FileReader;
    reader.onload = function(event) {
        var img = new Image();
        img.src = event.target.result;
        img.onload = function() {


            var width = 640;
            var height = 480;

            var canvasUploadDiv = document.querySelector('#uploadPicCanvas');
            if (canvasUploadDiv) {
                canvasUploadDiv.remove();
            }

            var canvas = document.createElement('canvas');
            canvas.id = "uploadPicCanvas";
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            canvas.style.borderRadius = "9px";
            canvas.style.zIndex = "0";
            canvas.style.marginLeft = "auto";
            canvas.style.marginRight = "auto";
            canvas.style.position = "relative";
            canvas.style.marginTop = "0px";
            canvas.getContext('2d').drawImage(img, 0, 0, 640, 480);

            // Applique l'image uploadé dans la zone camera
            document.querySelector('#maskDiv').appendChild(canvas);

            document.querySelector('#mask').remove();

            document.getElementById('maskDiv').appendChild(mask);

        };

    };
    reader.readAsDataURL(this.files[0]);
});

/****************************************************************************/

function maskSelect(url) {
    if (displaySrtBtn == true) {
        document.getElementById('mask').setAttribute('src', url);
        var title = document.getElementById('maskTitle');
        title.textContent = url.split('/').reverse()[0].split('.')[0];
        startbutton.style.display = "block";
    }
}
