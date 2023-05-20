let letterArray = letters();
let previousOpenCard = "number:letter";
let currentOpenCard = "number:letter";

function letters() {
    let size = document.querySelector("select#bordGroteSmallScreen").value;
    let letters = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0, size*size).split('');
    letters = shuffle(letters);
    return letters;
}

// Fisher Yates shuffle
// taken from: https://www.w3schools.com/js/js_array_sort.asp
function shuffle(letters) {
    for (let i = letters.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = letters[i];
        letters[i] = letters[j];
        letters[j] = k;
      }
    return letters;
}

function generateHtmlCards(size) {
    let array = [];
    let cards = document.querySelectorAll('div#card');
    for (let i = 0; i < size*size; i++) {
        let div = document.createElement('div'); //'<div aria-live="assertive" aria-label="Gesloten kaart">+</div>';
        div.ariaLive = "assertive";
        div.ariaLabel = "gesloten kaart";
        div.id = "card" + i;
        div.textContent = document.querySelector("select#karakterSmallScreen").value;
        div.addEventListener('click', () => {showCard(i)});
        array.push(div);
    }
    return array;
}

function showCard(number) {
    let card = document.querySelector("div#card" + number);
    let openCardNumber = currentOpenCard.split(":")[0];
    
    // mag deze kaart niet klikken
    if(card.classList.contains("open") || card.classList.contains("found") || openCardNumber == number){
        return;
    }
    let openCardLetter = currentOpenCard.split(":")[1];
    let letter = letterArray[number];
    
    // nieuwe kaart openen
    if(card.classList.length == 0){
        openCard(card, letter);
    }
    
    // sluit open kaarten
    let openCardElement = document.querySelector("div#card" + openCardNumber);
    let previousOpenCardElement = document.querySelector("div#card" + previousOpenCard.split(":")[0]);
    
    if(previousOpenCardElement != null && openCardElement != null){
        if(previousOpenCardElement != card && previousOpenCardElement.classList.contains("open") && openCardElement.classList.contains("open")){
            closeCards(openCardElement, previousOpenCardElement, card);
        }
    }
    // hou current en previous open kaart bij
    previousOpenCard = currentOpenCard;
    currentOpenCard = number + ":" + letter;
    
    // paar gevonden
    if(openCardLetter == letter && openCardElement.classList.contains("open")){
        foundPair(card, openCardElement);
        if(allPairFound()) {
            showWinMessage();
        }
    }
}

function openCard(card, letter){
    card.classList.add("open");
    card.innerHTML = letter;
}

function closeCards(openCardElement, previousOpenCardElement) {
    previousOpenCardElement.classList.remove("open");
    previousOpenCardElement.innerHTML = document.querySelector("select#karakterSmallScreen").value;
    openCardElement.classList.remove("open");
    openCardElement.innerHTML = document.querySelector("select#karakterSmallScreen").value;
}

function foundPair(card, openCardElement){
    card.classList.remove("open");
    card.classList.add("found");
    openCardElement.classList.remove("open");
    openCardElement.classList.add("found");
}

function allPairFound() {
    let cards = document.querySelector("div.gameBoard").childNodes;
    for (let i = 0; i < cards.length; i++) {
        if(!cards[i].classList.contains("found")){
            return false;
        }
    }
    return true;
}

function showWinMessage() {
    let parent = document.querySelector("div.gameBoardPosition");
    parent.innerHTML = '<h1 id="winMessage">Je hebt gewonnen!</h1>' + parent.innerHTML;
}

function removeWinMessage() {
    let winMessage = document.querySelector("h1#winMessage");
    if(winMessage != null){
        winMessage.parentNode.removeChild(winMessage);
    }
}

function generateBoard(size) {
    //let size = 4;
    let gameboard = document.querySelector("div.gameBoard");
    gameboard.textContent = "";
    gameboard = addGridBoardCss(gameboard, size);
    let cards = generateHtmlCards(size);
    letterArray = letters();
    addBoard(cards, gameboard);
    removeWinMessage();
    // voor testen
    //addVisibleBoard(cards, gameboard);
}

function generateBoardSmallScreen() {
    let size = document.querySelector("select#bordGroteSmallScreen").value;
    document.querySelector("select#bordGroteLargeScreen").value = size;
    generateBoard(size);
}

function generateBoardLargeScreen() {
    let size = document.querySelector("select#bordGroteLargeScreen").value;
    document.querySelector("select#bordGroteSmallScreen").value = size;
    generateBoard(size);
}

function addGridBoardCss(gameboard, size) {
    if(gameboard.classList.length == 1){
        gameboard.classList.add("gameBoardSize" + size)
    } else{
        gameboard.classList.replace(gameboard.classList[1], "gameBoardSize" + size)
    }
    return gameboard;
}

function addBoard(cards, gameboard) {
    cards.forEach(card => {
        gameboard.appendChild(card);
    });
}

function addVisibleBoard(cards, gameBoard) {
    let count = 0;
    cards.forEach(card => {
        card.innerHTML = letterArray[count];
        gameboard.appendChild(card);
        count++;
    });
}

function changeCharacter(character) {
    let gameboard = document.querySelector("div.gameBoard");
    let cards = gameboard.childNodes;
    cards.forEach(card => {
        if(card.classList.length == 0){
            card.innerHTML = character;
        }
    })
}

function changeCharacterSmallScreen() {
    let character = document.querySelector("select#karakterSmallScreen").value;
    document.querySelector("select#karakterLargeScreen").value = character;
    changeCharacter(character);
}

function changeCharacterLargeScreen() {
    let character = document.querySelector("select#karakterLargeScreen").value;
    document.querySelector("select#karakterSmallScreen").value = character;
    changeCharacter(character);
}

function changeStandardCardColor() {
    let color = document.querySelector("input#standardCardColor");
    let colors = document.querySelector(":root");
    colors.style.setProperty('--standard', color.value);
}

function changeOpenCardColor() {
    let color = document.querySelector("input#openCardColor");
    let colors = document.querySelector(":root");
    colors.style.setProperty('--open', color.value);
}

function changeFoundCardColor() {
    let color = document.querySelector("input#foundCardColor");
    let colors = document.querySelector(":root");
    colors.style.setProperty('--found', color.value);
}

generateBoard(6);
document.querySelector("select#karakterSmallScreen").addEventListener('change', changeCharacterSmallScreen);
document.querySelector("select#karakterLargeScreen").addEventListener('change', changeCharacterLargeScreen);
document.querySelector("select#bordGroteSmallScreen").addEventListener('change', generateBoardSmallScreen);
document.querySelector("select#bordGroteLargeScreen").addEventListener('change', generateBoardLargeScreen);
document.querySelector("input#standardCardColor").addEventListener('change', changeStandardCardColor);
document.querySelector("input#openCardColor").addEventListener('change', changeOpenCardColor);
document.querySelector("input#foundCardColor").addEventListener('change', changeFoundCardColor);