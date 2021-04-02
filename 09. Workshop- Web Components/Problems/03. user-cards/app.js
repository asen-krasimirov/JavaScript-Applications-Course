import { html, render } from '../node_modules/lit-html/lit-html.js';


const userCardTemplate = (data) => html`
<style>
    .user-card {
        display: flex;
        font-family: 'Arial', sans-serif;
        background-color: #EEE;
        border-bottom: 5px solid darkorchid;
        width: 100%;
    }

    .user-card img {
        width: 200px;
        height: 200px;
        border: 1px solid darkorchid;
    }

    .info {
        display: flex;
        flex-direction: column;
    }

    .info h3 {
        font-weight: bold;
        margin-top: 1em;
        text-align: center;
    }

    .info button {
        outline: none;
        border: none;
        cursor: pointer;
        background-color: darkorchid;
        color: white;
        padding: 0.5em 1em;
    }

    @media only screen and (max-width: 500px) {
        .user-card {
            flex-direction: column;
            margin-bottom: 1em;
        }

        .user-card figure,
        .info button {
            align-self: center;
        }

        .info button {
            margin-bottom: 1em;
        }

        .info p {
            padding-left: 1em;
        }
    }
</style>

<div class="user-card">
    <figure>
        <img src=${data.avatar} />
    </figure>
    <div class="info">
        <h3>${data.userName}</h3>
        <div>
            <p>
                <slot name="email" ></slot>
            </p>
            <p>
                <slot name="phone" ></slot>
            </p>
        </div>

        <button class="toggle-info-btn" @click=${onToggle}>Hide Info</button>
    </div>
</div>`;



class UserCard extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const data = {
            avatar: this.getAttribute('avatarUrl'),
            userName: this.getAttribute('userName')
        }
        render(userCardTemplate(data), this._root, { eventContext: this });
    }
}


customElements.define('user-card', UserCard);


function onToggle(event) {
    const hiddenInfo = event.target.parentNode.querySelector('div');
    hiddenInfo.style.display = (hiddenInfo.style.display == 'block') ? 'none' : 'block';
    event.target.textContent = (hiddenInfo.style.display == 'block') ? 'Hide Info': 'Toggle Info';
}