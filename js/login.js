if(localStorage.getItem('token') != null){
    window.location.href = '/index.html';
}

async function login() {
    const body = new FormData(document.querySelector('form'));
    const plainFormData = Object.fromEntries(body.entries());
    let works = JSON.stringify(plainFormData); //
    let res = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json"
        },
        body: works
    })

    if(res.status === 401) {
        //Show invalid credentials message if the repsonse status is 401
        document.querySelector('#invalidCredentials').style.display = 'block'
    } else {
        //Hide the invalid credentials message if it's show
        document.querySelector('#invalidCredentials').style.display = 'none'

        //Store JWT token in localStorage
        let json = await res.json()
        localStorage.setItem('token', json.token)

        //redirect to the memory homepage
        window.location.href = '/index.html';

    }

}

document.getElementById('submit').addEventListener('click', evt => {
    evt.preventDefault();
    login();
});