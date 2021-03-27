import { links } from './views/setUpViews.js';
import { page, render, until, html } from './dom.js';


const main = document.querySelector('div.container');
const nav = document.querySelector('nav');


const formEvents = {
    // 'register': onSubmit,
}


export function setUpRouter() {
    page('/catalog', loadContent)
    page('/register', loadContent)
    page('/login', loadContent)
    page('/create', loadContent)
    page('/details/:id', loadContent)
    page('/edit/:id', loadContent)
    page('/myFurniture/:id', loadContent)
    page.redirect('/', '/catalog');
    page.start();
}


const whileLoadingContent = html`<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;


async function loadContent(context) {
    const pathName = context.pathname.split('/')[1] || 'catalog'; 
    const supportId = context.params.id || context.querystring.split('=')[1] || '';
    // console.log(context)
    // console.log(supportId)
    render(until(getNeededViewContent(), whileLoadingContent), main);
    
    setNavBtnVisibillity();
    setTimeout(() => { if (Object.keys(formEvents).includes(pathName)) setUpForm(pathName); }, 1500)
    
    async function getNeededViewContent() { return await links[pathName](supportId); }
}


function setNavBtnVisibillity() {
    if (sessionStorage.authToken) {
        nav.querySelector('#user').style.display = 'inline-block';
        nav.querySelector('#guest').style.display = 'none';
        nav.querySelector('#myFurnitureLink').href = '/myFurniture/' + sessionStorage.userId;
    } else {
        nav.querySelector('#user').style.display = 'none';
        nav.querySelector('#guest').style.display = 'inline-block';
    }
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