import { html } from '../node_modules/lit-html/lit-html.js';
import { api } from './api.js';


let booksURL = 'http://localhost:3030/jsonstore/collections/books/';


export const createHomeView = (isAdding) => html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    ${(isAdding) 
        ? createCreateForm()
        : createEditForm()
    }
`;


const createCreateForm = () => html`
    <form id="add-form" @submit=${createFormEvent}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;


async function createFormEvent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let [ title, author ] = (() => { const [titleData, authorData] = [...formData]; return [titleData[1], authorData[1]]})();

    if (!author || !title) { alert('All fileds must be filled!'); return; }
    api.postData(booksURL, JSON.stringify({ "author": author, "title": title }));
};


const createEditForm = () => html`
    <form id="edit-form" @submit=${editFormEvent}>
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;


async function editFormEvent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let [ id, title, author ] = (() => { const [idData, titleData, authorData] = [...formData]; return [idData[1], titleData[1], authorData[1]]})();

    if (!author || !title) { alert('All fileds must be filled!'); return; }
    api.updateRequest(booksURL + id, JSON.stringify({ "author": author, "title": title }));
};


export const createBookRow = (bookId, bookContent) => html`
    <tr id=${bookId}>
        <td>${bookContent.title}</td>
        <td>${bookContent.author}</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>
    </tr>
`;
