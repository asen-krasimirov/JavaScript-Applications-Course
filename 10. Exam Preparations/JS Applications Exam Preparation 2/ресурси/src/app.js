import { render, page } from './lib.js';

import { logOutUser } from './api/data.js';

import { showHomePage } from './views/homePage.js';
import { showLoginPage } from './views/loginPage.js';
import { showRegsterPage } from './views/registerPage.js';
import { showBrowserPage } from './views/browserPage.js';
import { showCreatePage } from './views/createPage.js';
import { showDetailsPage } from './views/detailsPage.js';
import { showEditPage } from './views/editPage.js';
import { showProfilePage } from './views/profilePage.js';
import { showSearchPage } from './views/searchPage.js';


const main = document.getElementById('site-content');
const nav = document.querySelector('nav');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

/* Router Set-Up */
page.redirect('/', '/home');
page('/home', decorateContext, showHomePage);
page('/register', decorateContext, showRegsterPage);
page('/login', decorateContext, showLoginPage);
page('/browser', decorateContext, showBrowserPage);
page('/create', decorateContext, showCreatePage);
page('/details/:id', decorateContext, showDetailsPage);
page('/edit/:id', decorateContext, showEditPage);
page('/myProfile', decorateContext, showProfilePage);
page('/search', decorateContext, showSearchPage);

page.start();


function decorateContext(context, next) {
    context.renderContent = (content) => render(content, main);
    setUpNavButtons();
    next();
}


function setUpNavButtons() {
    nav.querySelector('#guest').style.display = (sessionStorage.authToken) ? 'none' : 'block';
    nav.querySelector('#profile').style.display = (sessionStorage.authToken) ? 'block' : 'none';

    if (sessionStorage.authToken) {
        nav.querySelector('div#profile a').textContent = `Welcome ${sessionStorage.userUsername}`;
    }
}


function onLogout() {
    logOutUser();
    sessionStorage.clear();
    page.redirect('/home');
}