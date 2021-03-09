import { displayHomePage } from './homePage.js';
import { getDataFromForm } from './customTools/getFormData.js';


let section;
let mainMain;
let createBtn;
let createURL = `http://localhost:3030/data/movies/`;


export function setUpCreatePage(main, content, button) {
    section = content;
    mainMain = main;
    createBtn = button;

    createBtn.addEventListener('click', event => {
        event.preventDefault();
        displayCreatePage();
    });

    addEventToCreateForm();
}


export function displayCreatePage() {

    mainMain.innerHTML = '';
    mainMain.appendChild(section);
}


function addEventToCreateForm() {
    const createForm = section.querySelector('form');

    createForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(createForm);
        let { title, description, imageUrl } = getDataFromForm(formData);
        let creator = sessionStorage.ownerId;
        let likedUsers = [];

        try {
            
            if (!title || !description || !imageUrl) {
                throw new Error('All fields must be filled!');
            }

            const response = await fetch(createURL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ title, description, img: imageUrl, creator, likedUsers })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            createForm.reset();
            displayHomePage();

        } catch (error) {
            alert(error.message);
        }

    });
}