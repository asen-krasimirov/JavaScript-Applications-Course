import { displayNavBtns } from './customTools/displayButtns.js';
import { getDataFromForm } from './customTools/getFormData.js';
import { displayHomePage } from './homePage.js';


let section;
let mainMain;
let loginBtn;
let loginURL = `http://localhost:3030/users/login/`;


export function setUpLoginPage(main, content, button) {
    section = content;
    mainMain = main;
    loginBtn = button;

    loginBtn.addEventListener('click', event => {
        event.preventDefault();
        displayLoginPage();
    });

    addEventToLoginForm();
}


export function displayLoginPage() {

    mainMain.innerHTML = '';
    mainMain.appendChild(section);
    displayNavBtns();
}


function addEventToLoginForm() {
    const loginForm = section.querySelector('form');

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(loginForm);

        let { email, password } = getDataFromForm(formData);

        if (!email || !password) {
            alert('All fields must be filled!'); return;
        }

        try {

            const response = await fetch(loginURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                let errorMessage = `${response.status} error has occured!`;
                if (response.status == '403') {
                    errorMessage = 'Make sure your password and email are correct!';
                }
                throw new Error(errorMessage);
            }

            const responseData = await response.json();
            if (responseData.accessToken) {
                sessionStorage.authToken = responseData.accessToken;
                sessionStorage.ownerId = responseData._id;
                sessionStorage.email = email;
            } else {
                throw new Error('This account does not exist!');
            }
            
            loginForm.reset();
            displayHomePage();

        } catch (error) {
            alert(error.message);
        }

    });
}