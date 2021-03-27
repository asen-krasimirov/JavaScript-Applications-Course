import { html } from '../node_modules/lit-html/lit-html.js';


export const townListCard = (names) => html`
    <ul>
        ${names.map(name => html`<li>${name}</li>`)}
    </ul>
`;