import { setUpCatalogPage } from './catalogView.js';
import { setUpRegisterPage } from './registerView.js';
import { setUpLoginPage } from './loginView.js';
import { setUpCreatePage } from './createView.js';
import { setUpDetailsPage } from './detailsView.js';
import { setUpEditPage } from './editView.js';
import { setUpMyPublicationsPage } from './myPublicationsView.js';


export const links = {
    // '/catalog': showCatalogContent(),
    // '/login': showLoginContent(),
}


export function setUpView() {
    links['catalog'] = setUpCatalogPage();
    links['register'] = setUpRegisterPage();
    links['login'] = setUpLoginPage();
    links['create'] = setUpCreatePage();
    links['details'] = setUpDetailsPage();
    links['edit'] = setUpEditPage();
    links['myFurniture'] = setUpMyPublicationsPage();
}
