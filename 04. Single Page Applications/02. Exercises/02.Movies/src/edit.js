import { displayDetailsPage } from './details.js';
import { getDataFromForm } from './customTools/getFormData.js';


let section;
let mainMain;


let titleInput;
let descriptionInput;
let imgURLInput;

let curTitle;
let curDescription;
let curImgURL;
let curOwnerId;
let curPostId;

let editURL = `http://localhost:3030/data/movies/`;

export function setUpMainEditPage(main, content) {
    section = content;
    mainMain = main;

    titleInput = content.querySelector('input[name="title"]');
    descriptionInput = content.querySelector('textarea[name="description"]');
    imgURLInput = content.querySelector('input[name="imageUrl"]');


    addEventToEditForm();
}


export function displayEditPage(title, description, imgURL, ownerId, postId) {

    mainMain.innerHTML = '';
    mainMain.appendChild(section);

    
    titleInput.value = title;
    descriptionInput.textContent = description;
    imgURLInput.value = imgURL;
    
    curTitle = title;
    curDescription = description;
    curImgURL = imgURL;
    curOwnerId = ownerId;
    curPostId = postId;
}


function addEventToEditForm() {
    const editForm = section.querySelector('form');

    editForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(editForm);
        let { title, description, imageUrl } = getDataFromForm(formData);

        try {
            
            if (!title || !description || !imageUrl) {
                throw new Error('All fields must be filled!');
            }

            const response = await fetch(editURL + curPostId, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ title, description, img: imageUrl })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            const content = await response.json();

            editForm.reset();
            displayDetailsPage(content.title, content.description, content.img, content._ownerId, content._id);

        } catch (error) {
            alert(error.message);
        }

    });
}