import { createListing } from '../api/data.js';
import { html, page } from '../lib.js';


const createPageTemplate = (onSubmit) => html`
 <section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onSubmit}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;


export function showCreatePage(context) {
    context.renderContent(createPageTemplate(onSubmit));

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
            await createListing({ brand, model, description, year, imageUrl, price });
            page.redirect('/browser');
        } catch (error) {
            alert(error.message);
        }

        function validateInput() {
            if ( !brand || !model || !description || !year || !imageUrl || !price ) {
                throw new Error('All fields must be filled!');
            } else if ( Number(year) < 0 ) {
                throw new Error('"Car Year" must be a positive value!');
            } else if ( Number(price) < 0 ) {
                throw new Error('"Car Price" must be a positive value!');
            }
        }
    }
}