var nbPic = 0;
var nbEndPic = 9;
var nbCom = 0;
var data;
var like;
var selectedImg;

var paginationLink = document.createElement('button');

paginationLink.textContent = "Load 9 more pictures";
paginationLink.style.cursor = "pointer";
paginationLink.style.textAlign = "center";
paginationLink.id = "page-link";

// Recuperation des données de la base de donnée
function getPictures(){
    var db_img = new XMLHttpRequest(); // declaration d'une requete AJAX

    db_img.onreadystatechange = function (){ // Recuperation de la requete Ajax
        if (db_img.readyState == 4 && (db_img.status == 200 || db_img.status == 0)) {
            data = JSON.parse(db_img.responseText);
            displayUserPictures();
            addComments();
        };
    };
    db_img.open("POST", "../php/db_img_all.php", true); // envois des données
    db_img.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    db_img.send(null);
};


function addComment(destObject, comArray, from, nbToDisplay, place) {
    for (var i = from; i < nbToDisplay && i < comArray.length; i++) {
        var comCommentDiv = document.createElement('div');
        var comContent = document.createElement('div');
        var comAuthor = document.createElement('div');
        var comDate = document.createElement('div');
        var table = document.createElement('table');
        var tr = document.createElement('tr');
        var thLeft = document.createElement('th');
        var thRight = document.createElement('th');

        comCommentDiv.style.display = "block";
        //comCommentDiv.style.boxShadow = "-5px 0 50px #CECECE inset, 5px 0 50px #CECECE inset";
        comCommentDiv.style.marginTop = "1px";
        comCommentDiv.id = 'com_'+comArray[i]['id'];
        comCommentDiv.style.background = "linear-gradient(to right, #cecece 0%,#ADADAD 35%,#ADADAD 85%,#cecece 100%)";
        comCommentDiv.style.borderRadius = "3px";
        comCommentDiv.style.wordWrap = "break-word";
        comCommentDiv.style.position = "relative";
        comCommentDiv.style.zIndex = "-11";
        comCommentDiv.setAttribute('class', 'comCommentDiv');



        comContent.textContent = atob(comArray[i]['content']);
        comContent.style.display = "inline-block";
        comContent.style.padding = "5px";
        //comContent.style.boxShadow = "0px 0px 5px #D0D0D0 inset";
        comContent.style.textAlign = "left";
        comContent.style.backgroundColor = "inherit";
        comContent.style.borderRadius = "3px";
        comContent.style.margin = "5px";
        comContent.style.width = "90%";
        comContent.style.hyphens = "auto";
        comContent.style.fontWeight = "normal";
        comContent.style.color = "#404040";
        comContent.style.fontFamily = "arial";

        table.style.width = "100%";
        thRight.style.width = "90%";
        thLeft.style.width = "10%";

        comAuthor.textContent = comArray[i]['pseudo'];
        comAuthor.style.marginLeft = "50px";
        comAuthor.style.display = "inline-block";
        comAuthor.style.fontWeight = "bold";
        if (comArray[i]['pseudo'] === 'Guest') {
            comAuthor.style.color = "indianred";
        } else {
            comAuthor.style.color = "#0090C0";
        };
        comAuthor.style.fontSize = "14px";
        comAuthor.style.padding = "3px";
        comAuthor.style.valign = "center";

        comDate.textContent = comArray[i]['date'];
        comDate.style.padding = "0px";
        comDate.style.color = "#5e5e5e";
        comDate.style.fontSize = "9px";
        comDate.style.fontWeight = "normal";
        comDate.style.fontStyle = "italic";



        comAuthor.appendChild(comDate);
        thRight.appendChild(comContent);
        thLeft.appendChild(comAuthor);
        tr.appendChild(thLeft);
        tr.appendChild(thRight);
        table.appendChild(tr);
        comCommentDiv.appendChild(table);
        if (place === true) {
            destObject.insertBefore(comCommentDiv, destObject.childNodes[0]);
        } else {
            destObject.appendChild(comCommentDiv);
        };
    };
};



function displayUserPictures() {
    for (nbPic; nbPic < nbEndPic && nbPic < data.length; nbPic++) {
        // Div contenant l'image et les commentaires
        var imgDiv = document.createElement('div');
        imgDiv.style.display = 'inline-block';
        imgDiv.style.margin = '15px';
        imgDiv.setAttribute('class', 'pictureDiv');
        imgDiv.setAttribute('id', 'div'+data[nbPic]['id']);



        // IMAGE DE BASE
        var img = document.createElement('div');
        img.style.backgroundImage = 'url(\''+data[nbPic]['url']+'\')';
        img.style.backgroundSize = 'contain';
        img.style.width = '512px';
        img.style.height = '384px';
        img.style.display = 'block';
        img.style.position = "relative";
        // img.style.boxShadow = "3px 3px 3px grey";
        img.style.marginBottom = "5px";
        img.setAttribute('target', data[nbPic]['url']);
        img.setAttribute('id', data[nbPic]['id']);
        img.setAttribute('class', 'picture');


        // Nom de la photo
        var nameBtn = document.createElement('div');
        var textNameBtn = document.createElement('div');
        var textAuthor = document.createElement('div');
        nameBtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        nameBtn.style.width = "512px";
        nameBtn.style.height = "50px";
        nameBtn.style.marginTop = "334px";
        nameBtn.style.display = "none";
        nameBtn.style.position = "absolute";

        textAuthor.style.fontSize = "16px";
        textAuthor.style.position = "relative";
        textAuthor.style.display = "inline-block";
        textAuthor.style.color = "rgba(255, 255, 255, 0.7)";
        textAuthor.style.padding = "15px";
        textAuthor.textContent = "by "+data[nbPic]['pseudo'];

        textNameBtn.style.textAlign = "center";
        textNameBtn.style.fontSize = "18px";
        textNameBtn.style.position = "relative";
        textNameBtn.style.fontWeight = "bold";
        textNameBtn.style.display = "inline-block";
        textNameBtn.style.color = "rgba(255, 255, 255, 0.7)";
        textNameBtn.style.padding = "15px";
        textNameBtn.textContent = data[nbPic]['name'];
        textNameBtn.setAttribute('id', 'info_'+data[nbPic]['id']);
        nameBtn.appendChild(textAuthor);
        nameBtn.appendChild(textNameBtn);

        // Inclusion des boutons dans la Div Photo
        img.appendChild(nameBtn);
        imgDiv.appendChild(img);

        // Event Mouseenter Faire apparaitre la div de controle sous la souris
        img.addEventListener('mouseenter', function(){
            var childs = this.childNodes;
            for (var i = 0; i < childs.length; i++) {
                childs[i].style.display = "block";
            }
        }, false);

        // Event Mouseleave Faire disparaitre la div de controle sous la souris
        img.addEventListener('mouseleave', function(){
            var childs = this.childNodes;
            for (var i = 0; i < childs.length; i++) {
                childs[i].style.display = "none";
            }
        }, false);

        // Event Click Agrandir l'image avec un click
        img.addEventListener('click', function(){
            // Redimensionnement de la derniere picture cliqué
            if (selectedImg != null) {
                selectedImg.style.width = '512px';
                selectedImg.style.height = '384px';
                selectedImg.parentNode.style.display = "inline-block";
                selectedImg.getElementsByTagName('div')[0].style.marginTop = "334px";
                selectedImg.getElementsByTagName('div')[0].style.width = "512px";
                // Cache les commentaires
                document.getElementById('coms_'+selectedImg.getAttribute('id')).style.display = "none";
            }
            selectedImg = document.getElementById(this.id);
            console.log(this.id);
            selectedImg.style.width = '800px';
            selectedImg.style.height = '600px';
            selectedImg.parentNode.style.display = "block";
            selectedImg.getElementsByTagName('div')[0].style.marginTop = "550px";
            selectedImg.getElementsByTagName('div')[0].style.width = "800px";
            // Affiche les commentaires
            document.getElementById('coms_'+this.getAttribute('id')).style.display = "block";
            // Positionne la page sur l'iamge selectionnée
            window.scrollTo(0,this.offsetTop - 50);
        }, false);

        // Insertion de l'objet image dans la pellicule
        if (nbPic < data.length) {
            document.getElementById('blocPictures').appendChild(imgDiv);
        };
    };

    // Bouton de pagination
    if (nbPic < data.length) {
        paginationLink.remove();
        document.getElementById('blocPictures').appendChild(paginationLink);
        paginationLink.addEventListener('click', function(){
            displayUserPictures();
            addComments();
        }, false);
        nbEndPic += 9;
    };
    if (nbPic >= data.length) {
        paginationLink.remove();
    }
}

/********************** Commentaires *************************/
function addComments() {

    var picsDiv = document.getElementsByClassName('pictureDiv');
    for (nbCom; nbCom < picsDiv.length; nbCom++) {
        var id = picsDiv[nbCom].getAttribute('id').split('div')[1];

        var db_com = new XMLHttpRequest(); // declaration d'une requete AJAX
        db_com.onreadystatechange = function (){ // Recuperation de la requete Ajax
            if (db_com.readyState == 4 && (db_com.status == 200 || db_com.status == 0)) {
                var com = JSON.parse(db_com.responseText);

                var start = 0;
                var comDiv = document.createElement('div');
                var comSubDiv = document.createElement('div');
                var comNew = document.createElement('div');
                var comNewText = document.createElement('textarea');
                var comMoreBtn = document.createElement('div');
                var comNbCom = document.createElement('div');

                comDiv.style.width = "700px";
                comDiv.style.display = "none";
                comDiv.id = "coms_"+id;

                comMoreBtn.style.width = '20px';
                comMoreBtn.style.height = '13px';
                comMoreBtn.marginTop = "10px";
                comMoreBtn.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                comMoreBtn.style.boxShadow = "1px 1px 3px grey";
                comMoreBtn.style.backgroundSize = "20px 13px";
                comMoreBtn.style.borderRadius = "3px";
                comMoreBtn.style.padding = "1px";
                comMoreBtn.style.cursor = "pointer";
                comMoreBtn.style.color = "rgba(0, 0, 0, 1)";
                comMoreBtn.style.fontSize = "8px";
                comMoreBtn.style.fontWeight = "bold";
                comMoreBtn.textContent = "..."

                comNew.style.marginTop = "1px";
                comNew.style.background = "linear-gradient(to right, #cecece 0%,#ADADAD 35%,#ADADAD 85%,#cecece 100%)";
                comNew.style.position = "relative";
                comNew.setAttribute('class', 'comCommentDiv');



                comNewText.rows = "2";
                comNewText.cols = "50";
                comNewText.name = id;
                comNewText.style.display = "inline-block";
                comNewText.style.margin = "10px";
                comNewText.style.textDecoration = "none";
                comNewText.style.borderRadius = "3px";
                comNewText.style.border = "1px solid grey";
                comNewText.style.padding = "3px";
                comNewText.style.boxShadow = "0px 0px 3px grey inset";
                comNewText.style.backgroundColor = "#F0F0F0";

                comNbCom.style.color = "rgba(255, 255, 255, 0.6)";
                comNbCom.textContent = com.length+" comments";
                comNbCom.style.display = "inline-block";
                comNbCom.style.marginLeft = "150px";
                comNbCom.style.fontSize = "12px";
                comNbCom.style.fontWeight = "normal";


                // Ajout de tout les commentaires.
                addComment(comSubDiv, com, start, start + 5, true);
                start += 5;


                // Bouton: more comments
                if (com.length > 5) {
                    comDiv.appendChild(comMoreBtn);
                    comMoreBtn.addEventListener('click', function () {
                        addComment(comSubDiv, com, start, start + 5, true);
                        start += 5;
                        if (com.length <= start)
                            this.remove();
                    }, false);
                };


                // Key event du bouton entréé si selectionné
                comNewText.addEventListener('keyup', function(e) {
                    if (e.keyCode === 13 && this.value.length > 0 && this.value.charCodeAt(0) !== 10) {
                        var msg = encodeURIComponent(btoa(this.value));
                        this.value = null;
                        var pseudo = encodeURIComponent(document.getElementById('user').getAttribute('class'));
                        var imgId = encodeURIComponent(this.name);

                        var dbSendCom = new XMLHttpRequest();
                        dbSendCom.onreadystatechange = function (){
                            if (dbSendCom.readyState == 4 && (dbSendCom.status == 200 || dbSendCom.status == 0)) {
                                addComment(comSubDiv, JSON.parse(dbSendCom.responseText), 0, 1);
                                start++;
                            };
                        };
                        dbSendCom.open("POST", "../php/db_add_comments.php", false);
                        dbSendCom.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        dbSendCom.send('comment='+msg+'&pseudo='+pseudo+'&img_id='+imgId);
                    } else if (e.keyCode === 13 && this.value.length === 0) {
                        this.value = null;
                    };
                }, false);



                comNew.appendChild(comNewText);
                comDiv.appendChild(comSubDiv)
                comDiv.appendChild(comNew);
                objectDest.appendChild(comDiv);
                document.getElementById('info_'+id).appendChild(comNbCom);
            };
        };
        var objectDest = picsDiv[nbCom];
        db_com.open("POST", "../php/db_comments.php", false);
        db_com.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        db_com.send('id='+encodeURIComponent(objectDest.getAttribute('id').split('div')[1]));
    }; // fin du for
};
/**********************************************************************/

getPictures();
