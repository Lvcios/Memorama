var cards = ['001.png', '002.png', '003.png', '004.png', '005.png', '006.png', '007.png', '008.png', '009.png'];
var renderedCards = [];
var difficult = 9;
var errors = 0;
var points = 0;
var attemps = 0;
var template = document.getElementById('template'); 

function fn_createTemplate(){
    for(var j = 0; j < 2; j++){
        for(var i = 0; i < difficult; i++){
            var div = document.createElement('div');
            var img = document.createElement('img');
            img.setAttribute('src','assets/cards/cover.png');
            img.setAttribute('onclick','fn_viewCard(event)');
            img.classList.add('selectable');
            var pair = fn_getRandomPair();
            img.setAttribute('data', pair)
            div.setAttribute('data', pair)
            div.appendChild(img);
            template.appendChild(div);
        }
        renderedCards = [];
    }
}

function fn_getRandomPair(){
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

function fn_checkResult(){
    if(points == difficult){
        alert("Ganaste! Lo lograste en " + attemps + " intentos y te equivocaste " + errors + " veces" );
    }
}


function fn_viewCard(event){
    var activeCards = document.getElementsByClassName('active');
    if(activeCards.length >= 2){
        return false;
    }
    event.target.classList.add('active');
    var selectedImg = event.path[0];
    selectedImg.setAttribute('src','assets/cards/' + selectedImg.getAttribute('data') + '.png')

    if(activeCards.length == 2){
        attemps++;
        var card1 = activeCards[0];
        var card2 = activeCards[1];
        window.setTimeout(function(){
            if(card1.getAttribute('data') == card2.getAttribute('data')){
                card1.setAttribute('onclick','');
                card2.setAttribute('onclick','');
                points++;
                fn_checkResult();
            }
            else{
                card1.setAttribute('src','assets/cards/cover.png');
                card2.setAttribute('src','assets/cards/cover.png');
                errors++;
            }
            card1.classList.remove('active');
            card2.classList.remove('active');
        },1500);
    }
}

function fn_setClass(inClass, outClass){
    var activeCards = document.getElementsByTagName('IMG');
    for(var i = 0; i < activeCards.length; i++){
        if(!activeCards[i].classList.contains('active')){
            activeCards[i].classList.remove(outClass);
            activeCards[i].classList.add(inClass);
        }
    }
}

fn_createTemplate();
