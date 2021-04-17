import { html } from '../lib.js';
import { createPost } from '../api/data.js';
import { showNotification } from './component/notify.js';


const createPageTemplate = (onSubmit) => html`
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
        <div class="col-md-6">
            <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg" alt="">
        </div>
        <form class="form-idea col-md-5" action="#/create" method="post" @submit=${onSubmit}>
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
            </div>
            <div class="form-label-group">
                <label for="ideaTitle">Title</label>
                <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="ideaDescription">Description</label>
                <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required=""></textarea>
            </div>
            <div class="form-label-group">
                <label for="inputURL">Add Image</label>
                <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                    required="">

            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
        </form>
    </div>
</div>`;


export function showCreatePage(context) {
    context.renderContent(createPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageURL = formData.get('imageURL');

        try {
            validate();
            await createPost({ title, description, imageURL });
            context.pageContent.redirect('/dashboard');
            
        } catch (error) {
            showNotification(error.message);
        }

        function validate() {
            /*
                - The title should be at least 6 characters long.
                - The description should be at least 10 characters long.
                - The image should be at least 5 characters long.
            */

            let isTitleValid = (title.length >= 6);
            let isDescriptionValid = (description.length >= 10);
            let doImgageURLMach = (imageURL.length >= 5);

            if (!isTitleValid) throw new Error('The title should be at least 6 characters long!');
            if (!isDescriptionValid) throw new Error('The description should be at least 10 characters long!');
            if (!doImgageURLMach) throw new Error('The image should be at least 5 characters long!');
        }
    }
}