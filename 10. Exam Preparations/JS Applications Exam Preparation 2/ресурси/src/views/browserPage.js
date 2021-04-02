import { html } from '../lib.js';
import { getAllListings } from '../api/data.js';


const browserPageTemplate = (listingsData) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

        ${
            (listingsData.length > 0)
            ? html`${listingsData.map(listingTemplate)}`
            : html`<p class="no-cars">No cars in database.</p>`
        }

    </div>
</section>
`;


const listingTemplate = (listingData) => html`
<div class="listing">
    <div class="preview">
        <img src=${listingData.imageUrl}>
    </div>
    <h2>${listingData.brand + ' ' + listingData.model}</h2>
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


export async function showBrowserPage(context) {
    const listings = await (await getAllListings()).json();
    context.renderContent(browserPageTemplate(listings))
};