import { render, page } from './lib.js';

import { logOutUser } from './api/data.js';

import { showLoginPage } from './views/loginPage.js';
import { showRegisterPage } from './views/registerPage.js';
import { showHomePage } from './views/homePage.js';
import { showCataloguePage } from './views/catalogue.js';
import { showDetailsPage } from './views/detailsPage.js';
import { showCreatePage } from './views/createPage.js';
import { showEditPage } from './views/editPage.js';
import { showSearchPage } from './views/searchPage.js';


const main = document.getElementById('main-content');
const nav = document.querySelector('nav');
nav.querySelector('#logoutBtn').addEventListener('click', onLogout);


/* Router Set-Up */
page.redirect('/', '/home');
page('/home', decorateContext, showHomePage);
page('/register', decorateContext, showRegisterPage);
page('/login', decorateContext, showLoginPage);
page('/catalogue', decorateContext, showCataloguePage);
page('/create', decorateContext, showCreatePage);
page('/details/:id', decorateContext, showDetailsPage);
page('/edit/:id', decorateContext, showEditPage);
page('/search', decorateContext, showSearchPage);

page.start();


function decorateContext(context, next) {
    context.renderContent = (content) => render(content, main);
    context.pageContent = page;
    setUpNavBtns();
    next();
}


function setUpNavBtns() {
    nav.querySelector('#user').style.display = (sessionStorage.authToken) ? 'block' : 'none';
    nav.querySelector('#guest').style.display = (sessionStorage.authToken) ? 'none' : 'block';
}


function onLogout() {
    logOutUser();
    sessionStorage.clear();
    page.redirect('/home');
}