import { html, render } from '../node_modules/lit-html/lit-html.js';


const editableListTemplate = (state, context) => html`
<style>
    .container {
        max-width: 500px;
        margin: 50px auto;
        border-radius: 20px;
        border: solid 8px #2c3033;
        background: white;
        box-shadow: 0 0 0px 1px rgba(255, 255, 255, .4), 0 0 0px 3px #2c3033;
    }

    .editable-list-header {
        margin: 0;
        border-radius: 10px 10px 0 0px;
        background-image: linear-gradient(#687480 0%, #3b4755 100%);
        font: bold 18px/50px arial;
        text-align: center;
        color: white;
        box-shadow: inset 0 -2px 3px 2px rgba(0, 0, 0, .4), 0 2px 2px 2px rgba(0, 0, 0, .4);
    }

    .editable-list {
        padding-left: 0;
    }

    .editable-list>li,
    .editable-list-add-container {
        display: flex;
        align-items: center;
    }

    .editable-list>li {
        justify-content: space-between;
        padding: 0 1em;
    }

    .editable-list-add-container {
        justify-content: space-evenly;
    }

    .editable-list>li:nth-child(odd) {
        background-color: rgb(229, 229, 234);
    }

    .editable-list>li:nth-child(even) {
        background-color: rgb(255, 255, 255);
    }

    .editable-list-add-container>label {
        font-weight: bold;
        text-transform: uppercase;
    }

    .icon {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.8rem;
        outline: none;
    }
</style>

<article class="container">
    <h1 class="editable-list-header">${state.mainTitle}</h1>

    <ul class="editable-list">
        ${state.elementTitles.map(elemTitle => listElementTemplate(elemTitle, context))}
    </ul>

    <div class="editable-list-add-container">
        <label>${state.inputTitle}</label>
        <input class="add-new-list-item-input" type="text">
        <button class="editable-list-add-item icon" @click=${context._addElem}>&oplus;</button>
    </div>
</article>`;


const listElementTemplate = (elemTitle, context) => html`
<li>
    <p class="editable-list-item-value">${elemTitle}</p>
    <button class="editable-list-remove-item icon" @click=${() => context._removeElem(elemTitle)}>
        &ominus;
    </button>
</li>`;


class EditableList extends HTMLElement {
    constructor() {
        super();

        this.state ={
            mainTitle: this.getAttribute('mainTitle'),
            inputTitle: this.getAttribute('inputTitle'),
            initialAmount: this.getAttribute('initialAmount'),
            elementTitles: []
        };

        this._root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._renderList();
    }

    _addElem(event) {
        const target = event.target.parentNode.querySelector('.add-new-list-item-input');
        const newElemTitle = target.value;
        target.value = '';

        if (this.state.elementTitles.includes(newElemTitle)) {
            alert('Elem already in storage!'); return;
        } else if (newElemTitle == '') {
            alert('Name field is required!'); return;
        }

        this.state.elementTitles.push(newElemTitle);
        this._renderList();
    }

    _removeElem(removeName) {
        this.state.elementTitles = this.state.elementTitles.filter(elem => elem !== removeName);
        this._renderList();
    }

    _renderList() {
        render(editableListTemplate(this.state, this), this._root, { eventContext: this });
    }
}


customElements.define('edit-list', EditableList);