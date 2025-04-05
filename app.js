var cards = ['001.png', '002.png', '003.png', '004.png', '005.png', '006.png', '007.png', '008.png', '009.png'];
var renderedCards = [];
var difficult = 9;
var errors = 0;
var points = 0;
var attemps = 0;
var template = document.getElementById('template'); 

function fn_createTemplate(){
    renderedCards = [];
    for(var i = 0; i < difficult * 2; i++){
        var div = document.createElement('div');
        var img = document.createElement('img');
        img.setAttribute('src','assets/cards/cover.png');
        img.setAttribute('onclick','fn_viewCard(event)');
        img.classList.add('selectable');
        var pair = fn_getRandomPair();
        img.setAttribute('data', pair)
        div.setAttribute('data', pair)
        div.appendChild(img);
        div.classList.add('card-container');
        template.appendChild(div);
    }
}

function fn_getRandomPair(){
    var close = true;
    var pair = '';
    while(close){
        var selected = Math.floor((Math.random() * difficult) + 1);
        pair = '00' + selected ;
        if(renderedCards.filter(m => m == pair).length < 2){
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
    var selectedImg = event.target
    
    fn_flipCard(selectedImg);

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
                fn_flipCardBack(card1);
                fn_flipCardBack(card2);
                errors++;
            }
            card1.classList.remove('active');
            card2.classList.remove('active');
        },800);
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

function fn_flipCard(selectedImg){
    selectedImg.style.transition = 'opacity 0.3s ease';
    selectedImg.style.opacity = '0';

    setTimeout(() => {

        selectedImg.setAttribute('src','assets/cards/' + selectedImg.getAttribute('data') + '.png')
        // Step 3: Wait a frame, then fade back in
        requestAnimationFrame(() => {
            selectedImg.style.transition = 'opacity 0.3s ease';
            selectedImg.style.opacity = '1';
        });
    }, 300); // Match CSS transition duration
}

function fn_flipCardBack(selectedImg){
    selectedImg.style.transition = 'opacity 0.3s ease';
    selectedImg.style.opacity = '0';

    setTimeout(() => {

        selectedImg.setAttribute('src','assets/cards/cover.png');
        // Step 3: Wait a frame, then fade back in
        requestAnimationFrame(() => {
            selectedImg.style.transition = 'opacity 0.3s ease';
            selectedImg.style.opacity = '1';
        });
    }, 300); // Match CSS transition duration
}

function fn_resolve(){
    var cards = document.getElementsByClassName('selectable');
    for(var i = 0; i < cards.length; i++){
        fn_flipCard(cards[i]);
    }

}

fn_createTemplate();
