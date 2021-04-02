import { html, page } from '../lib.js';
import { editMeme, getMemeById } from '../api/data.js';
import { showNotification } from '../notification.js';


const editPageTemplate = (memeData, onSubmit) => html`
 <section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${memeData.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .textContent=${memeData.description}>
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${memeData.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
 `;


export async function showEditPage(context) {
    const memeId = context.params.id;
    const meme = await (await getMemeById(memeId)).json();

    context.renderContent(editPageTemplate(meme, onSubmit));
    context.setNavButtons();

    async function onSubmit(event) {
        event.preventDefault();
        
        const form = document.querySelector('form');
        const formData = new FormData(form);
        
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        
        try {
            validateForm();
            await editMeme( memeId, { title, description, imageUrl });
            page.redirect('/details/' + memeId);
        } catch (error) {
            showNotification(error.message);
        }

        function validateForm() {
            if (!title || !description || !imageUrl) {
                throw new Error('All fields must be filled!');
            }
        }
    }
}