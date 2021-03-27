import { api } from './api.js';
import { render } from '../node_modules/lit-html/lit-html.js';
import { createHomeView, createBookRow } from './templates.js';


let booksURL = 'http://localhost:3030/jsonstore/collections/books/';


function solve() {
    
    // start the application
    renderHomePage();
    addBtnsEventListener();
    document.getElementById('loadBooks').addEventListener('click', loadBooks);
}

async function loadBooks() {
    const records = Object.entries(await api.getData(booksURL));
    render(records.map(([id, content]) => createBookRow(id, content)), document.querySelector('table tbody'));
}


function renderHomePage(isAdding=true) {
    render(createHomeView(isAdding), document.body);
}


function addBtnsEventListener() {
    document.body.addEventListener('click', async event => {
        const target = event.target;
        
        if (target.tagName != 'BUTTON') { return; }
        let bookId = target.parentNode.parentNode.id;
        const bookData = await api.getData(booksURL + bookId);

        if (target.textContent == 'Edit') {
            renderHomePage(false);

            addEditFormData(bookId, bookData);

        } else if ( target.textContent == 'Delete') {
            const confirmed = confirm(`Do you wish to delete ${bookData.title}?`);
            if (confirmed) { api.deleteRequest(booksURL + bookId); }
            loadBooks();
        }

    });
}


function addEditFormData(id, data) {

    const form = document.querySelector('form');
    form.querySelector('input[name="author"]').value = data.author;
    form.querySelector('input[name="title"]').value = data.title;
    form.querySelector('input[name="id"]').value = id;
    form.addEventListener('submit', () => {
        renderHomePage();
    });
};


solve();
