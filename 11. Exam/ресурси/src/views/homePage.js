import { getRecentArticles } from '../api/data.js';
import { html } from '../lib.js';


const homePageTemplate = (articlesData) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    


    <section class="recent js">
        <h2>JavaScript</h2>
        ${recentArticleTemplate(articlesData.find(elem => elem.category == 'JavaScript'))}
    </section>

    <section class="recent csharp">
        <h2>C#</h2>
        ${recentArticleTemplate(articlesData.find(elem => elem.category == 'C#'))}
    </section>

    <section class="recent java">
        <h2>Java</h2>
        ${recentArticleTemplate(articlesData.find(elem => elem.category == 'Java'))}
    </section>

    <section class="recent python">
        <h2>Python</h2>
        ${recentArticleTemplate(articlesData.find(elem => elem.category == 'Python'))}
    </section>

</section>`;


const recentArticleTemplate = (articleData) => html`
${
    (articleData)
    ? html`
        <article>
            <h3>${articleData.title}</h3>
            <p>
                ${articleData.content}
            </p>
            <a href=${'/details/' + articleData._id} class="btn details-btn">Details</a>
        </article>`
    : html`<h3 class="no-articles">No articles yet</h3>`
}`;



export async function showHomePage(context) {
    const recentArticleData = await getRecentArticles();
    context.renderContent(homePageTemplate(recentArticleData));
}