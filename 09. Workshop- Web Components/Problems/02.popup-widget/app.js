import { html, render } from '../node_modules/lit-html/lit-html.js';


const popupWidgetTemplate = (state) => html`
<style>
    .wrapper {
    position: relative;
    }

    .info {
    font-size: 0.8rem;
    width: 200px;
    display: inline-block;
    border: 1px solid black;
    padding: 10px;
    background: white;
    border-radius: 10px;
    opacity: 0;
    transition: 0.6s all;
    position: absolute;
    bottom: 20px;
    left: 10px;
    z-index: 3;
    }

    img {
    width: 1.2rem;
    }

    .icon:hover + .info, .icon:focus + .info {
    opacity: 1;
    }
</style>

<span class="wrapper">
    <span class="icon" tabindex="0">
    <img src=${state.sourceImg} alt=${state.altImg}>
    </span>

    <span class="info">
        <slot></slot>
    </span>
</span>`;


class PopupWidget extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const state = {
            sourceImg: this.getAttribute('sourceImg'),
            altImg: this.getAttribute('altImg')
        }
        render(popupWidgetTemplate(state), this._root, { eventContext: this });
    }
}


customElements.define('popup-widget', PopupWidget);