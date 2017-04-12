var cards = ['001.png', '002.png', '003.png', '004.png', '005.png', '006.png', '007.png', '008.png', '009.png'];
var renderedCards = [];
var difficult = 9;
var errors = 0;
var points = 0;
var attemps = 0;
var template = document.getElementById('template'); 

function createTemplate(){
    for(var j = 0; j < 2; j++){
        for(var i = 0; i < difficult; i++){
            var div = document.createElement('div');
            var img = document.createElement('img');
            img.setAttribute('src','assets/cards/cover.png');
            div.appendChild(img);
            div.setAttribute('class', 'card-div')
            var pair = getRandomPair();
            div.classList.add(pair)
            div.setAttribute('data', pair)
            template.appendChild(div);
        }
        renderedCards = [];
    }
}

function getRandomPair(){
    var close = true;
    var pair = '';
    while(close){
        var selected = Math.floor((Math.random() * difficult) + 1);
        pair = '00' + selected ;
        if(renderedCards.indexOf(pair) == -1) {
            renderedCards.push(pair);
            close = false;
        }
    }
    return pair;
}


function addListeners(){
    var cardDivs = document.getElementsByClassName('card-div');
    for(var i = 0; i < cardDivs.length; i++){
         cardDivs[i].addEventListener('click', function(event) {
            var selectedDiv = event.path[1];
            var selectedImg = event.path[0];
            attemps++;
            if(!selectedDiv.classList.contains('active')){
                //show pic
                selectedDiv.classList.add('active');
                selectedImg.setAttribute('src','assets/cards/' + selectedDiv.getAttribute('data') + '.png')
                //timer to see the pics
                window.setTimeout(function(){
                    var activeCars = document.getElementsByClassName('active');
                    if(activeCars.length > 1){
                        console.log("return false");
                    }
                    if(activeCars.length == 2){
                        if(activeCars[0].getAttribute('data') == activeCars[1].getAttribute('data')){
                            activeCars[0].addEventListener('click', function(){ return false;});
                            activeCars[1].addEventListener('click', function(){ return false;});
                            points++;
                            checkResult();
                        }
                        else{
                            activeCars[0].firstChild.setAttribute('src','assets/cards/cover.png');
                            activeCars[1].firstChild.setAttribute('src','assets/cards/cover.png');
                            errors++;
                        }    
                        activeCars[0].classList.remove('active');
                        activeCars[0].classList.remove('active');
                    }
                }, 1500);
            }
            else{
                //set active
                selectedDiv.classList.add('active');
                selectedImg.setAttribute('src','assets/cards/' + selectedDiv.getAttribute('data') + '.png')
            }
        });
    }
}

function checkResult(){
    if(points == difficult){
        alert("Ganaste! Lo lograste en " + attemps + " intentos y te equivocaste " + errors + " veces" );
    }
}

function setDisabled(){
    var cardDivs = document.getElementsByClassName('card-div');
    for(var i = 0; i < cardDivs.length; i++){
        cardDivs[i].set
    }
}

//Crea template aleatoria
createTemplate();

addListeners();
