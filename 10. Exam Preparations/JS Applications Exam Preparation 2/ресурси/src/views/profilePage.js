import { getListingMadeByUser } from '../api/data.js';
import { html } from '../lib.js';


const profilePageTemplate = (personalListingsData) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${
            (personalListingsData.length > 0)
            ? html`${personalListingsData.map(listingTemplate)}`
            : html`<p class="no-cars"> You haven't listed any cars yet.</p>`
        }

    </div>
</section>
`;


const listingTemplate = (listingData) => html`
<div class="listing">
    <div class="preview">
        <img src=${listingData.imageUrl}>
    </div>
    <h2>${listingData.brand} ${listingData.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${listingData.year}</h3>
            <h3>Price: ${listingData.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href=${'/details/' + listingData._id} class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;


export async function showProfilePage(context) {
    const personalListingsData = await (await getListingMadeByUser(sessionStorage.userId)).json();
    context.renderContent(profilePageTemplate(personalListingsData));
}