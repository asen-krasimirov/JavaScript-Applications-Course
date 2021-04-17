import { html } from '../lib.js';
import { getPostsByPage, getPostsCount } from '../api/data.js';


const dashboardPageTemplate = ({postsData, pagesCount, curPage}) => html`
<div id="dashboard-holder">
    <div style="display: block">
        ${ (curPage-1 > 0) ? html`<a href=${"/dashboard?page=" + (curPage-1)}>&lt; Previous Page</a>` : '' }
        <span>Page ${curPage} / ${pagesCount}</span>
        ${ (curPage < pagesCount) ? html`<a href=${"/dashboard?page=" + (curPage+1)}>Next Page &gt;</a>` : '' }

    </div>
    ${
        (postsData.length > 0)
        ? html`${postsData.map(postTemplate)}`
        : html`<h1>No ideas yet! Be the first one :)</h1>`
    }

</div>`;


const postTemplate = (postData) => html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${postData.title}</p>
    </div>
    <img class="card-image" src=${postData.img} alt="Card image cap">
    <a class="btn" href=${'/details/' + postData._id}>Details</a>
</div>`;


export async function showDashboardPage(context) {

    let pagesCount = Math.ceil(await getPostsCount() / 3);
    let curPage = Number(context.querystring.split('=')[1]) || 1;

    const postsData = await getPostsByPage(curPage);
    
    context.renderContent(dashboardPageTemplate({postsData, pagesCount, curPage}));
}
