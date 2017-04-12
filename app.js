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
            div.appendChild(img);
            div.setAttribute('class', 'card-div')
            div.setAttribute('onclick','fn_viewCard(event)');
            var pair = fn_getRandomPair();
            div.classList.add(pair)
            div.setAttribute('data', pair)
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
    var selectedDiv = event.path[1];
    var selectedImg = event.path[0];
    selectedImg.setAttribute('src','assets/cards/' + selectedDiv.getAttribute('data') + '.png')

    if(activeCards.length == 2){
        attemps++;
        var card1 = activeCards[0].parentElement;
        var card2 = activeCards[1].parentElement;
        if(card1.getAttribute('data') == card2.getAttribute('data')){
            card1.setAttribute('onclick','');
            card2.setAttribute('onclick','');
            points++;
            fn_checkResult();
        }
        else{
            card1.firstChild.setAttribute('src','assets/cards/cover.png');
            card2.firstChild.setAttribute('src','assets/cards/cover.png');
            errors++;
        }
        card1.classList.remove('active');
        card2.classList.remove('active');
    }
}


fn_createTemplate();
