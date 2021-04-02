import { render, page } from './lib.js';

import { loadHomePageContent } from './views/homePage.js';
import { loadRegisterPageContent } from './views/registerPage.js';
import { loadLoginPageContent } from './views/loginPage.js';
import { loadBrowserPageContent } from './views/browserPage.js';
import { loadCreatePageContent } from './views/createPage.js';
import { loadDetailsPageContent } from './views/detailsPage.js';
import { loadEditPageContent } from './views/editPage.js';
import { loadMyTeamsPageContent } from './views/myTeamsPage.js';

import { logOutUser } from './api/data.js';


const main = document.querySelector('main');
const nav = document.querySelector('nav');
document.getElementById('logoutBtn').addEventListener('click', executeLogout);

/* Router Set-Up */
page.redirect('/', '/home');
page('/home', decorateContent, loadHomePageContent);
page('/register', decorateContent, loadRegisterPageContent);
page('/login', decorateContent, loadLoginPageContent);
page('/browser', decorateContent, loadBrowserPageContent);
page('/create', decorateContent, loadCreatePageContent);
page('/details/:id', decorateContent, loadDetailsPageContent);
page('/edit/:id', decorateContent, loadEditPageContent);
page('/myTeams/:id', decorateContent, loadMyTeamsPageContent);

page.start();


function decorateContent(context, next) {

    context.renderContent = (content) => render(content, main);
    context.pageController = page;
    changeBtnVisibility();
    next();
}


/* Logout Set-Up */
function executeLogout() {
    logOutUser();
    sessionStorage.clear();
    document.getElementById('myTeamsBtn').href = '';
    page.redirect('/home');
}

function changeBtnVisibility() {
    let isLogged = sessionStorage.authToken;
    nav.querySelector('#guestBtns').style.display = (isLogged) ? 'none' : 'inline-block';
    nav.querySelector('#loggedBtns').style.display = (isLogged) ? 'inline-block' : 'none';

    /* adding the myTeams href */
    document.getElementById('myTeamsBtn').href = '/myTeams/' + sessionStorage.userId;
}