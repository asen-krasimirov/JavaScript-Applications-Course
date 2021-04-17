import { html } from '../lib.js';
import { getPostsBySearchName } from '../api/data.js';


const searchPageTemplate = ({postsData, onSearch}) => html`
<div id="dashboard-holder">
   <div>
       <input id="searchInput" placeholder="Enter a Idea name...">
       <button @click=${(event) => onSearch(event.target.parentNode.children[0].value)}>Search</button>
   </div>

    ${
        (postsData.length > 0)
        ? html`${postsData.map(postTemplate)}`
        : html`<h1>Nothing was found in the database, try again!</h1>`
    }

</div>
`;


const postTemplate = (postData) => html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${postData.title}</p>
    </div>
    <img class="card-image" src=${postData.img} alt="Card image cap">
    <a class="btn" href=${'/details/' + postData._id}>Details</a>
</div>`;


export async function showSearchPage(context) {
    let searchInfo = context.querystring.split('=')[1];
    const postsData = (searchInfo != '') ? await getPostsBySearchName(searchInfo) : [];
    
    context.renderContent(searchPageTemplate({postsData, onSearch}));

    function onSearch(name) {
        context.pageContent('/search?ideaName=' + name);
    }
}
