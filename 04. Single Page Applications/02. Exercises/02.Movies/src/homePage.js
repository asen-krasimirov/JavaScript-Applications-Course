import { e } from './customTools/createCustomElem.js';
import { displayNavBtns } from './customTools/displayButtns.js';
import { displayDetailsPage } from './details.js';


let section;
let mainMain;
let movieHolder;
let moviesURL = 'http://localhost:3030/data/movies/';

export function setUpHomePage(main, content, homePageBtn) {
    section = content;
    mainMain = main;
    movieHolder = content.querySelector('#movieHolder');

    homePageBtn.addEventListener('click', event => {
        event.preventDefault();
        displayHomePage();
    });


}


export function displayHomePage() {

    mainMain.innerHTML = '';
    movieHolder.innerHTML = '';
    mainMain.appendChild(section);

    //display proper nav buttons
    displayNavBtns();
    // load moveis
    loadMovies();
}


async function loadMovies() {

    try {
        const response = await fetch(moviesURL);
        const data = await response.json();

        const fragment = document.createDocumentFragment();
        for (const content of data) {
            fragment.appendChild(
                createMovieCard(content.title, content.description, content.img, content._ownerId, content._id)
            );
        }

        movieHolder.appendChild(fragment);

    } catch (error) {
        alert(error.message);
    }

}


function createMovieCard(title, description, imgURL, ownerId, postId) {

    const newCard = e('div', { className: 'card md-4' },
        e('img', { className: 'card-img-top', src: imgURL, width: '400', alt: 'Card image cap' }),
        e('div', { className: 'card-body' },
            e('h4', { className: 'card-title', textContent: title })
        )
    );

    if (sessionStorage.authToken) {
        const detailsButton = e('div', { className: 'card-footer' },
            e('a', { href: '#' },
                e('button', { type: 'button', className: 'btn btn-info', textContent: 'Details' })
            )
        );

        detailsButton.querySelector('a').addEventListener('click', event => {
            displayDetailsPage(title, description, imgURL, ownerId, postId);
        });
        newCard.appendChild(detailsButton);
    }


    return newCard;

}