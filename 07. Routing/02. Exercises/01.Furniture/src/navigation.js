import { links } from './views/setUpViews.js';
import { page, render } from './dom.js';
import { manualBtnSetter } from './buttonContoller.js';


const main = document.querySelector('div.container');
const nav = document.querySelector('nav');


const formEvents = {
    // 'register': onSubmit,
}


export function setUpRouter() {
    page('/catalog', loadContent, displayContent)
    page('/register', loadContent, displayContent)
    page('/login', loadContent, displayContent)
    page('/create', loadContent, displayContent)
    page('/details/:id', loadContent, displayContent)
    page('/edit/:id', loadContent, displayContent)
    page('/myFurniture/:id', loadContent, displayContent)
    page.redirect('/', '/catalog');
    page.start();
}


async function loadContent(context, next) {
    const pathName = context.pathname.split('/')[1] || 'catalog'; 
    const supportId = context.params.id;

    context.loadedContent = await links[pathName](supportId);
    context.pathName = pathName;
    next();
}


function displayContent(context) {
    const pathName = context.pathName;

    render(context.loadedContent, main);
    setNavBtnVisibillity(pathName);

    if (Object.keys(formEvents).includes(pathName)) {
        setUpForm(pathName);
    }
}


function setNavBtnVisibillity(pathName) {
    if (sessionStorage.authToken) {
        nav.querySelector('#user').style.display = 'inline-block';
        nav.querySelector('#guest').style.display = 'none';
        nav.querySelector('#myFurnitureLink').href = '/myFurniture/' + sessionStorage.userId;
    } else {
        nav.querySelector('#user').style.display = 'none';
        nav.querySelector('#guest').style.display = 'inline-block';
    }
    // if (['catalogLink', 'createLink', 'myFurnitureLink', 'loginLink', 'registerLink'].includes(pathName)) { manualBtnSetter(pathName); }
}


export function registerFormEvent(id, event) {
    formEvents[id] = event;
}


function setUpForm(id) {
    const onSubmit = formEvents[id];
    const form = document.querySelector('form');

    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);

        const data = Object.entries(Array.from(formData)).reduce((acc, curr) => {
            let [_, [key, value]] = curr;
            acc[key] = value;
            return acc;
        }, {});

        onSubmit(data);
    });
}