import { html } from './node_modules/lite-html/lite-html.js';


/*
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>

    <div class="info">
        <h2>Name: John</h2>
        <button class="detailsBtn">Details</button>
        <div class="details" id="1">
            <p>Phone number: 0847759632</p>
            <p>Email: john@john.com</p>
        </div>
    </div>

</div>
*/

export const createContactCard = (contact) => html`
    
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>

        <div class="info">
            <h2>Name: ${contact.name}</h2>
            <button class="detailsBtn">Details</button>
            
            <div class="details" id=${contact.id}>
                <p>Phone number: ${contact.phoneNumber}</p>
                <p>Email: ${contact.email}</p>
            </div>

        </div>
    </div>`;


// function toggleDetails(event) {
//     const curDisplay = event.target.parentNode.querySelector('div.details').style.display;
//     event.target.parentNode.querySelector('div.details').style.display = (curDisplay == 'none') ? 'block' : 'none'; 
// }