import { html, page } from '../dom.js';
import { getFurnitureDetails, deleteFurniture } from '../api/data.js';


const createDetailsPage = (furnitureData) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${furnitureData.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furnitureData.make}</span></p>
        <p>Model: <span>${furnitureData.model}</span></p>
        <p>Year: <span>${furnitureData.year}</span></p>
        <p>Description: <span>${furnitureData.description}</span></p>
        <p>Price: <span>${furnitureData.price} $</span></p>
        <p>Material: <span>${furnitureData.material}</span></p>
        <div>
            ${
                (furnitureData._ownerId == sessionStorage.userId) 
                ? html`
                <a href=${'/edit/' + furnitureData._id} class="btn btn-info">Edit</a>
                <a href='#' class="btn btn-red" @click=${event => {
                    event.preventDefault();
                    delFurniture(furnitureData._id, furnitureData.make);
                }}>Delete</a>
                `
                : ''
            }
        </div>
    </div>
</div>
`;


export function setUpDetailsPage() {
    return showDetailsPage;

    async function showDetailsPage(id) {
        const furnitureData = await getFurnitureDetails(id);
        return createDetailsPage(furnitureData);
    }
}


function delFurniture(id, name) {
    let isConfirmed = confirm(`Are you sure you want to delete ${name}?`);
    if (!isConfirmed) { return; }
    deleteFurniture(id);
    page.redirect('/');
}