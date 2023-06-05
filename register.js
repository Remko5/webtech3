//Get inputs from the DOM
function register() {

    //Validate input before POSTing
    if(document.querySelector('form').checkValidity()) {
        document.querySelector('#invalidCredentials').style.display = 'none';
        const body = new FormData(document.querySelector('form'));
        const plainFormData = Object.fromEntries(body.entries());
        let works = JSON.stringify(plainFormData);

        fetch('http://localhost:8000/register', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/json"
            },
            body: works
        })
            .then(() => window.location.href = '/login.html')

    } else {
        document.querySelector('#invalidCredentials').style.display = 'block';
    }




}

document.getElementById('submit').addEventListener('click', evt => {
    evt.preventDefault();
    register();
});