import { getListingsByYear } from '../api/data.js';
import { html } from '../lib.js';


const searchPageTemplate = (listingsData, onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${(event) => onSearch(event.target.parentNode.querySelector('input').value)}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings" style="display: none">

        ${
            (listingsData.length > 0)
            ? html`${listingsData.map(listingTemplate)}`
            : html`<p class="no-cars"> No results.</p>`
        }

    </div>
</section>`;


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
</div>`;


export function showSearchPage(context) {
    renderPage();
    
    function renderPage(listingData=[]) {
        context.renderContent(searchPageTemplate(listingData, onSearch));
    }
    
    async function onSearch(year) {
        let listingsData = [];
        try {
            listingsData = await (await getListingsByYear(year)).json();
        } catch (error) {
            console.error(error.message);
        } finally {
            renderPage(listingsData);
            document.querySelector('div.listings').style.display = 'block';
        }
    }
}