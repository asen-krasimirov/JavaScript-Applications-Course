import { html, render } from '../node_modules/lit-html/lit-html.js';


const expandableListTemplate = () => html`
<style>
    ul {
        list-style-type: none;
    }

    li::before {
        display:inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.25rem;
        content:"";
    }

    .open::before,
    .closed::before {
        background-size: 1rem 1rem;
        position: relative;
        top: 0.25rem;
        opacity: 0.3;
    }

    .open::before {
        background-image: url(img/down.png);
    }

    .closed::before {
        background-image: url(img/right.png);
    }

    .closed .closed::before,
    .closed .open::before {
        display: none;
    }
</style>
<ul>
    <slot name="content"></slot>
</ul>`;


class ExpandableList extends HTMLUListElement {
    constructor() {
        self = super();
    }

    connectedCallback() {

    }
}


customElements.define('x-list', ExpandableList, { extends: 'ul' });