import { html } from '../lib.js';
import { getArticlesByTitle } from '../api/data.js';


const searchPageTemplate = ({ results, onSearch }) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form" @submit=${onSearch}>
        <p class="field search">
            <input type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    
    <div class="search-container">
        ${
            (results.length > 0)
            ? html`${results.map(articleTepmalte)}`
            : html`<h3 class="no-articles">No matching articles</h3>`
        }
    </div>

</section>`;



const articleTepmalte = (articleData) => html`
<a class="article-preview" href=${'/details/' + articleData._id}>
    <article>
        <h3>Topic: <span>${articleData.title}</span></h3>
        <p>Category: <span>${articleData.category}</span></p>
    </article>
</a>`;


export async function showSearchPage(context) {
    let searchedTitle = context.querystring.split('=')[1] || '';
    const results = await getArticlesByTitle(searchedTitle);
    renderPage(results);
    
    function renderPage(results=[]) {
        context.renderContent(searchPageTemplate({ results, onSearch}));
    }

    function onSearch(event) {
        event.preventDefault();
        
        const form = document.querySelector('form');
        const formData = new FormData(form);

        let searchedResult = formData.get('search');
        context.pageContent.redirect('/search?title=' + searchedResult);
    }
}