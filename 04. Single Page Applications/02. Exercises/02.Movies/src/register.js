import { displayHomePage } from './homePage.js';
import { getDataFromForm } from './customTools/getFormData.js';


let section;
let mainMain;
let registerBtn;
let registrationURL = `http://localhost:3030/users/register/`;


export function setUpRegisterPage(main, content, button) {
    section = content;
    mainMain = main;
    registerBtn = button;
    
    registerBtn.addEventListener('click', event => {
        event.preventDefault();
        displayregisterPage();
    });
    
    addEventToRegisterForm();
}


function displayregisterPage() {

    mainMain.innerHTML = '';
    mainMain.appendChild(section);
}


function addEventToRegisterForm() {
    const registerForm = section.querySelector('form');

    registerForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(registerForm);

        let { email, password, repeatPassword } = getDataFromForm(formData);
        try {

            if (!email || !password) {
                throw new Error('All fields must be filled!');
            } else if (password.length < 6) {
                throw new Error('Your password should have at least 6 characters!');
            } else if (password !== repeatPassword) {
                throw new Error('Both passwords must match!');
            }


            const response = await fetch(registrationURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            const responseData = await response.json();
            sessionStorage.authToken = responseData.accessToken;
            sessionStorage.ownerId = responseData._id;
            sessionStorage.email = email;

            registerForm.reset();
            displayHomePage();

        } catch (error) {
            alert(error.message);
        }

    });
}