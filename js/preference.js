let token = localStorage.getItem('token');
if(token == null){
    window.location.href = '/index.html';
}

if(!tokenIsValid(token)){
    sendToLogin();
}

let id = parseJwt(token).sub;

//Get inputs from the DOM
async function updatePreferences() {
        if(!tokenIsValid(token)){
            sendToLogin();
        }

        document.querySelector('p#colorUpdated').classList.add('hide');
        
        const body = new FormData(document.querySelector('#preferencesForm'));
        const plainFormData = Object.fromEntries(body.entries());
        let works = JSON.stringify(plainFormData);
        await fetch(`http://localhost:8000/api/player/${id}/preferences`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: works
        })
        .then(() => document.querySelector('p#colorUpdated').classList.remove('hide'))
}

async function updateEmail() {
    if(!tokenIsValid(token)){
        sendToLogin();
    }

    //Validate input before PUTing
    if(document.querySelector('#emailForm').checkValidity()) {
        document.querySelector('#invalidCredentials').classList.add('hide');
        document.querySelector('p#emailUpdated').classList.add('hide')
        
        const body = new FormData(document.querySelector('#emailForm'));
        const plainFormData = Object.fromEntries(body.entries());
        let works = JSON.stringify(plainFormData);
        await fetch(`http://localhost:8000/api/player/${id}/email`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: works
        })
        .then(() => document.querySelector('p#emailUpdated').classList.remove('hide'))
    } else {
        document.querySelector('#invalidCredentials').classList.remove('hide')
    }
}

function sendToLogin() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

fetch(`http://localhost:8000/api/player/${id}/email`, {
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
.then(email => document.querySelector('input#email').value = email);

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
    document.querySelector('select#cardPicture').value = preferences.preferred_api;
    document.querySelector('input#standardCardColor').value = preferences.color_closed;
    document.querySelector('input#foundCardColor').value = preferences.color_found;
});

document.getElementById('updatePreferences').addEventListener('click', evt => {
    evt.preventDefault();
    updatePreferences();
});

document.getElementById('updateEmail').addEventListener('click', evt =>{
    evt.preventDefault();
    updateEmail();
});