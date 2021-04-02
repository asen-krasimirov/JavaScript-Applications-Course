import { html, page } from '../lib.js';
import { getMemeById, deleteMeme } from '../api/data.js';


const detailsPageTemplate = (memeData, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${memeData.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${memeData.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${memeData.description}
            </p>

            ${
                (sessionStorage.userId == memeData._ownerId)
                ? html`
                <a class="button warning" href=${'/edit/' + memeData._id}>Edit</a>
                <button class="button danger" @click=${onDelete}>Delete</button>`
                : ''
            }
            
        </div>
    </div>
</section>
`;



export async function showDetailsPage(context) {
    const memeId = context.params.id;
    const memeData = await (await getMemeById(memeId)).json();

    context.renderContent(detailsPageTemplate(memeData, onDelete));
    context.setNavButtons();

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this meme?');
        if (confirmed) {
            await deleteMeme(memeId);
            page.redirect('/browser'); 
        }
    }
}