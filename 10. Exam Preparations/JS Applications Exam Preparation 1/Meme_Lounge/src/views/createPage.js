import { html, page } from '../lib.js';
import { createMeme } from '../api/data.js';
import { showNotification } from '../notification.js';


const createPageTemplate = (onSubmit) => html`
 <section id="create-meme">
    <form id="create-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;


export async function showCreatePage(context) {
    context.renderContent(createPageTemplate(onSubmit));
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
            await createMeme({ title, description, imageUrl });
            page.redirect('/browser');
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