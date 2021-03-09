import { setUpDisplayNavButtons } from './customTools/displayButtns.js';
import { setUpHomePage, displayHomePage } from './homePage.js';
import { setUpLoginPage } from './login.js';
import { setUpRegisterPage } from './register.js';
import { setUpLogout } from './logout.js';
import { setUpCreatePage } from './create.js';
import { setUpDetailsPage } from './details.js';
import { setUpMainEditPage } from './edit.js';



// home page button
const homePageBtn = document.getElementById('homePageBtn');

const navigationBar = document.getElementById('navigationBar');

// navigation buttons
const welcomeBtn = navigationBar.querySelector('#welcomeBtn');
const logoutBtn = navigationBar.querySelector('#logoutBtn');
const loginBtn = navigationBar.querySelector('#loginBtn');
const registerBtn = navigationBar.querySelector('#registerBtn');

const homePage = document.getElementById('homePage');

// add movie button
const addMovieBtn = homePage.querySelector('section#add-movie-button a');

const addMoviePage = document.getElementById('add-moviePage');
const movieDetailsPage = document.getElementById('movie-examplePage');
const editMoviePage = document.getElementById('edit-moviePage');
const formLoginPage = document.getElementById('form-loginPage');
const formSignUpPage = document.getElementById('form-sign-upPage');
const main = document.getElementById('container');
main.innerHTML = '';


function setUpContent() {
    setUpDisplayNavButtons(addMovieBtn, [welcomeBtn, logoutBtn, loginBtn, registerBtn]);
    setUpHomePage(main, homePage, homePageBtn);
    setUpLoginPage(main, formLoginPage, loginBtn);
    setUpRegisterPage(main, formSignUpPage, registerBtn);
    setUpLogout(logoutBtn);
    setUpCreatePage(main, addMoviePage, addMovieBtn);
    setUpDetailsPage(main, movieDetailsPage);
    setUpMainEditPage(main, editMoviePage);
}


// set default values
setUpContent();

// start app
displayHomePage();