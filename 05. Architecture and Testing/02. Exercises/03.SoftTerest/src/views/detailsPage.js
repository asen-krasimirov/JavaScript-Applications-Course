import { html } from '../lib.js';
import { getPostById, deletePost } from '../api/data.js';


const detailsPageTemplate = (postData, onDelete) => html`
 <div class="container home some">
    <img class="det-img" src=${postData.img} />
    <div class="desc">
        <h2 class="display-5">${postData.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">
        	${postData.description}
        </p>
    </div>
    
    ${
        (sessionStorage.userId === postData._ownerId)
        ? html`
        <div class="text-center">
            <a class="btn detb" href="javascript:void(0)" @click=${onDelete}>Delete</a>
        </div>`
        : ''
    }

</div>`;



export async function showDetailsPage(context) {
    const postId = context.params.id;
    const postData = await getPostById(postId);
    
    context.renderContent(detailsPageTemplate(postData, onDelete));

    async function onDelete() {
        let confirmed = confirm(`Are you sure you want to delete "${postData.title}"?`);
        if (confirmed) {
            await deletePost(postId); 
            context.pageContent.redirect('/dashboard');
        }
    }
}
