import { contacts } from './contacts.js';
import { createContactCard } from './templates.js';
import { render } from './node_modules/lite-html/lite-html.js';


function renderContacts() {
    const container = document.getElementById('contacts');
    const result = contacts.map(createContactCard);

    container.addEventListener('click', toggleDetails);

    render(result, container);
}


function toggleDetails(event) {
    const target = event.target;
    if (!Array.from(target.classList).includes('detailsBtn')) { return; }
    const curDisplay = target.parentNode.querySelector('div.details').style.display;
    target.parentNode.querySelector('div.details').style.display = (curDisplay == 'none') ? 'block' : 'none'; 
}


renderContacts();