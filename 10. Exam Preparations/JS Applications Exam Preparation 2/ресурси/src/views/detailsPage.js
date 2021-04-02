import { deleteListing, getListingById } from '../api/data.js';
import { html, page } from '../lib.js';


const detailsPageTemplate = ({ listringData, onDelete }) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${listringData.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${listringData.brand}</li>
            <li><span>Model:</span>${listringData.model}</li>
            <li><span>Year:</span>${listringData.year}</li>
            <li><span>Price:</span>${listringData.price}$</li>
        </ul>

        <p class="description-para">
        ${listringData.description}
        </p>

        ${
            (sessionStorage.userId === listringData._ownerId)
            ? html`
            <div class="listings-buttons">
                <a href=${'/edit/' + listringData._id} class="button-list">Edit</a>
                <a href="javascript:void(0)" class="button-list" @click=${onDelete}>Delete</a>
            </div>`
            : ''
        }

    </div>
</section>`;


export async function showDetailsPage(context) {
    const listringId = context.params.id;
    const listringData = await (await getListingById(listringId)).json();

    context.renderContent(detailsPageTemplate({ listringData, onDelete }));

    async function onDelete() {
        let confirmed = confirm(`Are you sure you want to delete the listing of "${listringData.brand + ' ' + listringData.model}"`);
        if (confirmed) {
            await deleteListing(listringId);
            page.redirect('/browser');
        }
    }
}