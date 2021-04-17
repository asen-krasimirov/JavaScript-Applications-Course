import { html } from '../lib.js';
import { createNewArticle } from '../api/data.js';


const createPageTemplate = (onSubmit) => html`
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form id="create" @submit=${onSubmit}>
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>`;


export async function showCreatePage(context) {
    context.renderContent(createPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');

        try {
            validate();
            await createNewArticle({ title, category, content });
            context.pageContent.redirect('/home');
        } catch (error) {
            alert(error.message);
        }

        function validate() {
            const validCategories = ["JavaScript", "C#", "Java", "Python"];

            if (!title || !category || !content) throw new Error('All fields are required!');
            if (!validCategories.includes(category)) throw new Error(`The category must be one of ${validCategories.join(', ')}`);
        }
    }
}