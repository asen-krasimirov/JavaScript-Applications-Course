import { render, page} from './lib.js';

import { logOutUser } from './api/data.js';

import { showHomePage } from './views/homePage.js';
import { showRegisterPage } from './views/registerPage.js';
import { showLoginPage } from './views/loginPage.js';
import { showBrowserPage } from './views/browserPage.js';
import { showCreatePage } from './views/createPage.js';
import { showDetailsPage } from './views/detailsPage.js';
import { showEditPage } from './views/editPage.js';
import { showProfilePage } from './views/profilePage.js';


const main = document.querySelector('main');
const nav = document.querySelector('nav');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

/* Router Set-Up */
page('/', '/home');
page('/home', decorateContext, loginVerigication, showHomePage);
page('/register', decorateContext, showRegisterPage);
page('/login', decorateContext, showLoginPage);
page('/browser', decorateContext, showBrowserPage);
page('/create', decorateContext, showCreatePage);
page('/details/:id', decorateContext, showDetailsPage);
page('/edit/:id', decorateContext, showEditPage);
page('/myProfile', decorateContext, showProfilePage);

page.start();


function decorateContext(context, next) {
    context.renderContent = (content) => render(content, main);
    context.setNavButtons = setNavBtns;
    next();
}


function loginVerigication(context, next) {
    if (sessionStorage.authToken) {
        page.redirect('/browser');
    } else {
        next();
    }
}


function setNavBtns() {
    const userView = nav.querySelector('div.user');
    const guestView = nav.querySelector('div.guest');

    if (sessionStorage.authToken) {
        userView.style.display = 'block';
        guestView.style.display = 'none';

        userView.querySelector('div span').textContent = `Welcome, ${sessionStorage.userEmail}`;
    } else {
        userView.style.display = 'none';
        guestView.style.display = 'block';
    }
}


function onLogout() {
    logOutUser();
    sessionStorage.clear();
    page.redirect('/home');
}