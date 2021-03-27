import { html } from '../dom.js';
import { getAllMyFurniture } from '../api/data.js';


const createMyPublicationsPage = (furnitureData) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
<!-- furniture goes here -->
${furnitureData.map(createFurnitureCard)}
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



export function setUpMyPublicationsPage() {
    return showMyPublicationsPage;

    async function showMyPublicationsPage(userId) {
        const furnitureData = await getAllMyFurniture(userId);
        return createMyPublicationsPage(furnitureData);
    }
}