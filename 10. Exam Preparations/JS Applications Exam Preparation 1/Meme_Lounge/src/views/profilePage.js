import { html, page } from '../lib.js';
import { getMemesByUserId } from '../api/data.js';


const profilePageTemplate = (memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info"> 
        <img id="user-avatar-url" alt="user-profile" src=${(sessionStorage.userGender == 'male') ? '/images/male.png' : '/images/female.png'}>
        <div class="user-content">
            <p>Username: ${sessionStorage.userUsername}</p>
            <p>Email: ${sessionStorage.userEmail}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

        ${
            (memes.length > 0)
            ? memes.map(memeTemplate)
            : html`<p class="no-memes">No memes in database.</p>`
        }

    </div>
</section>
`;


const memeTemplate = (memeData) => html`
<div class="user-meme">
    <p class="user-meme-title">${memeData.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${memeData.imageUrl}>
    <a class="button" href=${memeData._id}>Details</a>
</div>`;


export async function showProfilePage(context) {
    const myMemes = await (await getMemesByUserId(sessionStorage.userId)).json();

    context.renderContent(profilePageTemplate(myMemes));
    context.setNavButtons();
}