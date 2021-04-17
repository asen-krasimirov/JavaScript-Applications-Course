import { html } from '../lib.js';
import { getArticleById, editArticle } from '../api/data.js';


const editPageTemplate = ({ articleData, onSubmit }) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form id="edit" @submit=${onSubmit}>
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" value=${articleData.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" value=${articleData.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .textContent=${articleData.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;


export async function showEditPage(context) {
    let articleId = context.params.id;
    const articleData = await getArticleById(articleId);
    context.renderContent(editPageTemplate({ articleData, onSubmit }));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');

        try {
            validate();
            await editArticle(articleId, { title, category, content });
            context.pageContent.redirect('/details/' + articleId);
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