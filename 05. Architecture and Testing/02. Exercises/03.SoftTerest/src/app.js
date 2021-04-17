import { logOutUser } from './api/data.js';
import { render, page } from './lib.js';
import { showCreatePage } from './views/createPage.js';
import { showDashboardPage } from './views/dashboardPage.js';
import { showDetailsPage } from './views/detailsPage.js';

import { showHomePage } from './views/homePage.js';
import { showLoginPage } from './views/loginPage.js';
import { showRegisterPage } from './views/registerPage.js';
import { showSearchPage } from './views/searchPage.js';


const main = document.getElementById('container');
const nav = document.getElementById('navbarResponsive');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

/* Router Set-Up */
setUpRouter();


function setUpRouter() {
    page('/home', decoreateContext, showHomePage);
    page('/register', decoreateContext, showRegisterPage);
    page('/login', decoreateContext, showLoginPage);
    page('/dashboard', decoreateContext, showDashboardPage);
    page('/create', decoreateContext, showCreatePage);
    page('/details/:id', decoreateContext, showDetailsPage);
    page('/search', decoreateContext, showSearchPage);
    
    page.redirect('/', '/home');
    page.start();
    
    function decoreateContext(context, next) {
        context.renderContent = (content) => render(content, main);
        context.pageContent = page;

        setNavButtons();
        next();
    }
}


function setNavButtons() {
    nav.querySelector('#loggedUsers').style.display = (sessionStorage.authToken) ? 'block' : 'none';
    nav.querySelector('#guestUsers').style.display = (sessionStorage.authToken) ? 'none' : 'block';
}


function onLogout() {
    logOutUser();
    sessionStorage.clear();
    page.redirect('/home');
}