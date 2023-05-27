let openCardSymbols = letters();
let previousOpenCard = "number::letter";
let currentOpenCard = "number::letter";
let useImages = false;

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
    for (let i = 0; i < size*size; i++) {
        let div = document.createElement('div');
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
    let openCardNumber = currentOpenCard.split("::")[0];

    // mag deze kaart niet klikken
    if(card.classList.contains("open") || card.classList.contains("found") || openCardNumber == number){
        return;
    }
    let openCardLetter = currentOpenCard.split("::")[1];
    let letter = openCardSymbols[number];
    
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
    currentOpenCard = number + "::" + letter;
    
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
    if(useImages){
        card.innerHTML = '';
        let img = document.createElement('img');
        img.src = letter;
        img.alt = card.id
        card.appendChild(img);
    } else{
        card.innerHTML = letter;
    }
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
    let winMessage = document.querySelector("div#winMessage");
    winMessage.innerHTML += '<h1 id="winMessage">Je hebt gewonnen!</h1>';
}

function removeWinMessage() {
    let winMessage = document.querySelector("h1#winMessage");
    if(winMessage != null){
        winMessage.parentNode.removeChild(winMessage);
    }
}

function generateBoard(size) {
    let gameboard = document.querySelector("div.gameBoard");
    gameboard.textContent = "";
    gameboard = addGridBoardCss(gameboard, size);
    let cards = generateHtmlCards(size);
    addBoard(cards, gameboard);
    removeWinMessage();
}

function generateBoardSmallScreen(e) {
    let size = e.target.value;
    document.querySelector("select#bordGroteLargeScreen").value = size;
    changeOpenCardSymbolsAndResetBoard({target: document.querySelector("select#cardPicture")});
}

function generateBoardLargeScreen(e) {
    let size = e.target.value;
    document.querySelector("select#bordGroteSmallScreen").value = size;
    changeOpenCardSymbolsAndResetBoard({target: document.querySelector("select#cardPicture")});
}

function startNewGame() {
    changeOpenCardSymbolsAndResetBoard({target: document.querySelector("select#cardPicture")});
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

function changeCharacter(character) {
    let gameboard = document.querySelector("div.gameBoard");
    let cards = gameboard.childNodes;
    cards.forEach(card => {
        if(card.classList.length == 0){
            card.innerHTML = character;
        }
    })
}

function changeCharacterSmallScreen(e) {
    let character = e.target.value;
    document.querySelector("select#karakterLargeScreen").value = character;
    changeCharacter(character);
}

function changeCharacterLargeScreen(e) {
    let character = e.target.value;
    document.querySelector("select#karakterSmallScreen").value = character;
    changeCharacter(character);
}

function changeStandardCardColor(e) {
    let color = e.target.value
    let colors = document.querySelector(":root");
    colors.style.setProperty('--standard', color);
}

function changeOpenCardColor(e) {
    let color = e.target.value;
    let colors = document.querySelector(":root");
    colors.style.setProperty('--open', color);
}

function changeFoundCardColor(e) {
    let color = e.target.value;
    let colors = document.querySelector(":root");
    colors.style.setProperty('--found', color);
}

async function changeOpenCardSymbolsAndResetBoard(e) {
    let picture = e.target.value;
    let boardSize = document.querySelector("select#bordGroteSmallScreen").value;
    if(picture == 'letter'){
        useImages = false;
        openCardSymbols = letters();
        generateBoard(boardSize);
        return;
    }

    let apiUrls = {dog: 'https://dog.ceo/api/breeds/image/random', lorem: 'https://picsum.photos/200/300'}
    arraySize = (boardSize * boardSize / 2);
    let apiCalls = [];
    for (let i = 0; i < arraySize; i++) {
        apiCalls.push(await fetch(apiUrls[picture]));
    }

    switch (picture) {
        case "dog":
            useImages = true;
            dogImages(apiCalls);
            break;
        case "lorem":
            useImages = true;
            loremImages(apiCalls);
            break;
        default:
            break;
    }
    generateBoard(boardSize);
}

function dogImages(apiCalls) {
    Promise.all(apiCalls)
    .then(res => Promise.all(res.map( r => r.json())))
    .then(json => json.map(j => j.message))
    .then(urls => {
        urls = urls.concat(urls);
        openCardSymbols = urls;
    });
    
}

function loremImages(apiCalls) {
    Promise.all(apiCalls)
    .then(res => res.map(r => r.url))
    .then(urls =>{
        urls = urls.concat(urls);
        openCardSymbols = urls;
    });
}

generateBoard(6);
document.querySelector("select#karakterSmallScreen").addEventListener('change', changeCharacterSmallScreen);
document.querySelector("select#karakterLargeScreen").addEventListener('change', changeCharacterLargeScreen);
document.querySelector("select#bordGroteSmallScreen").addEventListener('change', generateBoardSmallScreen);
document.querySelector("select#bordGroteLargeScreen").addEventListener('change', generateBoardLargeScreen);
document.querySelector("input#standardCardColor").addEventListener('change', changeStandardCardColor);
document.querySelector("input#openCardColor").addEventListener('change', changeOpenCardColor);
document.querySelector("input#foundCardColor").addEventListener('change', changeFoundCardColor);
document.querySelector("select#cardPicture").addEventListener('change', changeOpenCardSymbolsAndResetBoard);
document.querySelector('button#smallStartNewGame').addEventListener('click', startNewGame);
document.querySelector('button#largeStartNewGame').addEventListener('click', startNewGame);