

function addEvents() {
    const registerForm = document.getElementById('RegisterForm');
    const loginForm = document.getElementById('LoginForm');
    const postForm = document.getElementById('PostForm');

    registerForm.addEventListener('submit', async event => {
        event.preventDefault();

        let url = 'http://localhost:3030/users/register';
        const data = getAllInputData(registerForm);
        let { email, password, repass } = data;

        if (email == '' || password == '') {
            alert('All fields must be filled!'); return;
        } else if (password !== repass) {
            alert('Both passwords must match!'); return;
        }

        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            sessionStorage.setItem('authToken', result.accessToken);
        } else {
            alert(result.message);
        }

    });

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();

        let url = 'http://localhost:3030/users/login';
        const data = getAllInputData(loginForm);
        let { email, password } = data;

        const response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json()
        if (response.ok) {
            sessionStorage.setItem('authToken', result.accessToken);
        } else {
            alert(result.message);
        }
    });

    postForm.addEventListener('submit', async event => {
        event.preventDefault();

        // posting info
        // http://localhost:3030/data/records

        if (!sessionStorage.authToken) {
            alert('Usert Authorised! Login Before you post!'); return;
        }
        let url = 'http://localhost:3030/data/records';
        const data = getAllInputData(postForm);
        let { name, value } = data;
        console.log(data);
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.authToken
            },
            body: JSON.stringify({ name, value })
        });
    })



    function getAllInputData(form) {
        const formData = new FormData(form);
        const combinedContent = {};

        for (let [name, value] of [...formData.entries()]) {
            combinedContent[name] = value;
        }

        return combinedContent;
    }
}

addEvents();