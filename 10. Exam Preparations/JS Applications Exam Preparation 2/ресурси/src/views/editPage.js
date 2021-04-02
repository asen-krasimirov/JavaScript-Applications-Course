import { editListing, getListingById } from '../api/data.js';
import { html, page } from '../lib.js';


const editPageTemplate = ({ listingData, onSubmit}) => html`
<section id="edit-listing">
    <div class="container">

        <form id="edit-form" @submit=${onSubmit}>
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value=${listingData.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value=${listingData.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value=${listingData.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value=${listingData.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${listingData.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value=${listingData.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;


export async function showEditPage(context) {
    const listingId = context.params.id;
    const listingData = await (await getListingById(listingId)).json();

    context.renderContent(editPageTemplate({ listingData, onSubmit }));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = formData.get('year');
        let imageUrl = formData.get('imageUrl');
        let price = formData.get('price');

        if (year) year = Number(year);
        if (price) price = Number(price);

        try {
            validateInput();
            await editListing(listingId, { brand, model, description, year, imageUrl, price });
            page.redirect('/browser');
        } catch (error) {
            alert(error.message);
        }

        function validateInput() {
            if ( !brand || !model || !description || !year || !imageUrl || !price ) {
                throw new Error('All fields must be filled!');
            } else if ( year < 0) {
                throw new Error('"Car Year" must be a positive value!');
            } else if ( price < 0) {
                throw new Error('"Car Price" must be a positive value!');
            }
        }
    }
}