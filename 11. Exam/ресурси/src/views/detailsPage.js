import { html } from '../lib.js';
import { deleteArticle, getArticleById } from '../api/data.js';


const detailsPageTemplate = ({ articleData, onDelete }) => html`
<section id="details-page" class="content details">
    <h1>${articleData.title}</h1>

    <div class="details-content">
        <strong>Published in category ${articleData.category}</strong>
        <p>
            ${articleData.content}
        </p>

        <div class="buttons">
            
            ${
                (articleData._ownerId === sessionStorage.userId)
                ? html`
                <a href="javascript:void(0)" class="btn delete" @click=${onDelete}>Delete</a>
                <a href=${ '/edit/' + articleData._id } class="btn edit">Edit</a>`
                : ''
            }

            <a href="/home" class="btn edit">Back</a>
        </div>
    </div>
</section>`;


export async function showDetailsPage(context) {
    let articleId = context.params.id;
    const articleData = await getArticleById(articleId);
    context.renderContent(detailsPageTemplate({ articleData, onDelete }));

    function onDelete() {
        let confirmed = confirm(`Are you sure you want to delete "${articleData.title}"`);
        if (confirmed) {
            deleteArticle(articleId);
            context.pageContent.redirect('/home');
        };
    }
}