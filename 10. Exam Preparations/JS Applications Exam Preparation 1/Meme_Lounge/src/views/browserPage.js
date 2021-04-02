import { html } from '../lib.js';
import { getMemes } from '../api/data.js';


const browserPageTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${
            (memes)
            ? html`${memes.map(memeTemplate)}`
            : html`<p class="no-memes">No memes in database.</p>`
        }
    </div>
</section>`;


const memeTemplate = (memeData) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${memeData.title}</p>
            <img class="meme-image" alt="meme-img" src=${memeData.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href=${'/details/' + memeData._id}>Details</a>
        </div>
    </div>
</div>`;

export async function showBrowserPage(context) {
    const memes = await (await getMemes()).json();
    context.renderContent(browserPageTemplate(memes));
    context.setNavButtons();
}