import { html, page } from '../dom.js';
import { getAllFurniture } from '../api/data.js';


const createCatalogPage = (furnitureData) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
<!-- furniture goes here -->
${furnitureData.map(createFurnitureCard)}
</div>
<div id="search-field">
    <input type=text id="searchedResult">
    <button @click=${event => { const value = event.target.parentNode.children[0].value; page.redirect('/catalog/?where=' + value)}}>Search</button>
</div>
`;


const createFurnitureCard = (data) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src=${data.img} />
                <p>${data.description}</p>
                <footer>
                    <p>Price: <span>${data.price} $</span></p>
                </footer>
                <div>
                    <a href=${'/details/' + data._id} class="btn btn-info">Details</a>
                </div>
        </div>
    </div>
</div>
`;



export function setUpCatalogPage() {
    return showCatalogPage;

    async function showCatalogPage(name) {
        const furnitureData = await getAllFurniture(name);
        return createCatalogPage(furnitureData);
    }
}