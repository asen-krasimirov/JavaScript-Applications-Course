import { html } from '../lib.js';
import { getAllArticles } from '../api/data.js';


const cataloguePageTemplate = (articlesData) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>

    ${
        (articlesData.length > 0)
        ? html`${articlesData.map(articleTepmalte)}`
        : html`<h3 class="no-articles">No articles yet</h3>`
    }

</section>`;


const articleTepmalte = (articleData) => html`
<a class="article-preview" href=${'/details/' + articleData._id}>
    <article>
        <h3>Topic: <span>${articleData.title}</span></h3>
        <p>Category: <span>${articleData.category}</span></p>
    </article>
</a>`;


export async function showCataloguePage(context) {
    const articlesData = await getAllArticles();
    context.renderContent(cataloguePageTemplate(articlesData));
}