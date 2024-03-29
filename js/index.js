let openCardSymbols = letters();
let previousOpenCard = "number::letter";
let currentOpenCard = "number::letter";
let useImages = false;
let foundpairs = 0;
let token = localStorage.getItem('token');
let expiredTokenInterval = null;
let expiredTokenCountdown = 10;
let cancelTokenCountdown = false;
let resetTimer = false;
let winner = false;
let time = 0;
let gameTimerBarInterval = null;
let verlopenTimeInterval = null;
let timeSyncReady = false;

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
            winner = true;
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
    foundpairs++;
    document.querySelector("span#foundPairs").innerHTML = foundpairs;
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
    foundpairs = 0;
    winner = false;
    document.querySelector("span#foundPairs").innerHTML = foundpairs;
    let gameboard = document.querySelector("div.gameBoard");
    gameboard.textContent = "";
    gameboard = addGridBoardCss(gameboard, size);
    let cards = generateHtmlCards(size);
    addBoard(cards, gameboard);
    removeWinMessage();
    startGameTimer();
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
        resetTimerFunction();
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
    resetTimerFunction();
    generateBoard(boardSize);
}

async function dogImages(apiCalls) {
    await Promise.all(apiCalls)
    .then(res => Promise.all(res.map( r => r.json())))
    .then(json => json.map(j => j.message))
    .then(urls => {
        urls = urls.concat(urls);
        openCardSymbols = urls;
    });
    
}

async function loremImages(apiCalls) {
    await Promise.all(apiCalls)
    .then(res => res.map(r => r.url))
    .then(urls =>{
        urls = urls.concat(urls);
        openCardSymbols = urls;
    });
}

/*
    Log out by removing the JWT token from storage
 */
function logout() {
    localStorage.removeItem('token');
    location.reload();
}

function getPlayerScores() {
    let playerScoresElement = document.querySelector('#playerScores')
    fetch('http://localhost:8000/scores', {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin'
    })
        .then(res => res.json())
        .then(json => {
            //Sort on top 5
            json.sort((a, b) => b.score - a.score);

            //Trim the list down to the top 5
            json = json.slice(-5, json.length)
            json.forEach(player => playerScoresElement.innerHTML += `<li>${player.username}: ${player.score}</li>`);
        })
}

function checkTokenValidity() {
    if(!tokenIsValid(token)) {
        // Stop checking for invalid token
        clearInterval(checkTokenInterval);
        
        // Clear Token
        token = null;
        localStorage.removeItem('token');

        //Token expired, redirect to login
        expiredTokenMessage();
    }
}

function expiredTokenMessage() {
    let smallDiv = document.querySelector('div#smallExpiredToken');
    let largeDiv = document.querySelector('div#largeExpiredToken');
    smallDiv.classList.remove('hide');
    largeDiv.classList.remove('hide');
    let smallMessage = smallDiv.firstChild
    let largeMessage = largeDiv.firstChild

    expiredTokenInterval = setInterval(() => {showExpiredTokenMessage(smallDiv, largeDiv, smallMessage, largeMessage)}, 1000);
}

function showExpiredTokenMessage(smallDiv, largeDiv, smallMessage, largeMessage) {
    if(cancelTokenCountdown){
        smallDiv.classList.add('hide');
        largeDiv.classList.add('hide');
        clearInterval(expiredTokenInterval);
        return;
    }

    if(expiredTokenCountdown == -1) {
        window.location = '/login.html';
    } else {
        smallMessage.innerHTML = `Sessie verlopen. Uw gaat naar login in ${expiredTokenCountdown} seconden`;
        largeMessage.innerHTML = `Sessie verlopen. Uw gaat naar login in ${expiredTokenCountdown} seconden`;
        expiredTokenCountdown--;
    }
}

function cancelExpiredTokenCountdown() {
    cancelTokenCountdown = true;
}

function startGameTimer() {
    timeSyncReady = false;
    setVerlopenTimeInterval();
    setGameTimerBarInterval();
    timeSyncReady = true;
}

function startGameTimerBar(timer, noPointsP) {
    timer.value = timer.value - 1;
    timer.ariaLabel = `${timer.value} seconden`;

    if(resetTimer) {
        resetTimer = false;
        return;
    }

    if(winner){
        clearInterval(gameTimerBarInterval);
        clearInterval(verlopenTimeInterval);
        gameTimerBarInterval = null;
        verlopenTimeInterval = null;
        return;
    }

    if(timer.value == 0){
        clearInterval(gameTimerBarInterval);
        gameTimerBarInterval = null;
        noPointsP.classList.remove('hide');
    }
}

function verlopenTime(verlopenTimer) {
    time++;
    verlopenTimer.innerHTML = time;
}

function resetTimerFunction() {
    if(!winner) {
        resetTimer = true;
    }
}

function isAdmin(token) {
    return parseJwt(token).roles.includes("ROLE_ADMIN");
}

// https://stackoverflow.com/questions/75608166/how-to-redirect-to-another-website-and-send-the-jwt-as-bearer-token-as-well-usin
function showAdminPanel(e) {
    let url = "http://localhost:4200?t="+token;
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
        })
      .then(() => {
        window.location.href = url;
      })
      .catch((error) => {
        console.error(error);
      });
}

if(!token) {   
    //Logged out, show login and register links
    document.querySelector('#smallLoginAndRegister').classList.remove('hide');
    document.querySelector('#largeLoginAndRegister').classList.remove('hide');
    
    //Hide logout button
    document.querySelector('#smallLoggedIn').classList.remove('flex-loggedin');
    document.querySelector('#largeLoggedIn').classList.remove('flex-loggedin');
    document.querySelector('#smallLoggedIn').classList.add('hide');
    document.querySelector('#largeLoggedIn').classList.add('hide');
} else {

    //Logged in, show logout button
    document.querySelector('#smallLoggedIn').classList.remove('hide');
    document.querySelector('#largeLoggedIn').classList.remove('hide');
    document.querySelector('#smallLoggedIn').classList.add('flex-loggedin');
    document.querySelector('#largeLoggedIn').classList.add('flex-loggedin');

    if(tokenIsValid(token)) {
        if(isAdmin(token)) {
            document.querySelector('div#smallAdmin').classList.remove('hide');
            document.querySelector('div#largeAdmin').classList.remove('hide');
        }

        let id = parseJwt(token).sub;

        fetch(`http://localhost:8000/api/player/${id}/preferences`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
                }
            }
        )
        .then(res => res.json())
        .then(preferences => {
            document.querySelector('input#standardCardColor').value = preferences.color_closed;
            document.querySelector('input#foundCardColor').value = preferences.color_found;

            let colors = document.querySelector(":root");
            colors.style.setProperty('--standard', preferences.color_closed);
            colors.style.setProperty('--found', preferences.color_found);

            if(preferences.preferred_api != 'letter') {
                let cardPicture = document.querySelector('select#cardPicture');
                cardPicture.value = preferences.preferred_api;
                changeOpenCardSymbolsAndResetBoard({target: cardPicture});
            }
        });
    }
}

function setVerlopenTimeInterval() {
    let timer = document.querySelector('span#verlopenTimer')
    timer.innerHTML = '0'
    time = 0;
    if(verlopenTimeInterval == null){
        verlopenTimeInterval = setInterval(() => {
            verlopenTime(timer);
        }, 1000);
    }
}

function setGameTimerBarInterval() {
    let timer = document.querySelector('progress#gameTimer');
    let noPointsP = document.querySelector('p#noPoints');
    noPointsP.classList.add('hide');
    timer.value = 300;
    timer.ariaLabel = `${timer.value} seconden`;
    if(gameTimerBarInterval == null){
        gameTimerBarInterval = setInterval(() => {startGameTimerBar(timer, noPointsP)}, 1000);
    }
}

//Check for JWT token validity
let checkTokenInterval = setInterval(() => {
    //Check validity of the token if it's set
    if(token) {
        checkTokenValidity(token);
    }
}, 10000);

//Get the top 5 player scores from the backend
getPlayerScores();

generateBoard(6);
document.querySelector("select#karakterSmallScreen").addEventListener('change', changeCharacterSmallScreen);
document.querySelector("select#karakterLargeScreen").addEventListener('change', changeCharacterLargeScreen);
document.querySelector("select#bordGroteSmallScreen").addEventListener('change', generateBoardSmallScreen);
document.querySelector("select#bordGroteLargeScreen").addEventListener('change', generateBoardLargeScreen);
document.querySelector("input#standardCardColor").addEventListener('change', changeStandardCardColor);
document.querySelector("input#openCardColor").addEventListener('change', changeOpenCardColor);
document.querySelector("input#foundCardColor").addEventListener('change', changeFoundCardColor);
document.querySelector("select#cardPicture").addEventListener('change', changeOpenCardSymbolsAndResetBoard);
document.querySelector('button#smallLogout').addEventListener('click', logout);
document.querySelector('button#largeLogout').addEventListener('click', logout);
document.querySelector('button#smallStartNewGame').addEventListener('click', startNewGame);
document.querySelector('button#largeStartNewGame').addEventListener('click', startNewGame);
document.querySelector('button#smallExpiredTokenButton').addEventListener('click', cancelExpiredTokenCountdown);
document.querySelector('button#largeExpiredTokenButton').addEventListener('click', cancelExpiredTokenCountdown);
document.querySelector('div#smallAdmin').addEventListener('click', showAdminPanel)
document.querySelector('div#largeAdmin').addEventListener('click', showAdminPanel)