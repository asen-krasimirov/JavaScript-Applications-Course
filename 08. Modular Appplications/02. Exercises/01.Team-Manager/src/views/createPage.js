import { html } from '../lib.js';
import { createTeam, addUserToData, changeUserStatus } from '../api/data.js';


const createPageTemplate = (onSubmit) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form id="create-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error"></div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>
`;


export async function loadCreatePageContent(context) {
    context.renderContent(createPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const errorField = form.querySelector('div.error');

        const formData = new FormData(form);
        const teamData = {
            name: formData.get('name'),
            logoUrl: formData.get('logoUrl'),
            description: formData.get('description'),
        }
        let { name, logoUrl, description } = teamData;

        try {
            errorField.textContent = '';
            toggleInputFields();
            validateInputs();
            const response = await (await createTeam(teamData)).json();
            
            /* adding the member */
            const memberResponse = await (await addUserToData({ teamId: response._id })).json();
            await changeUserStatus(memberResponse._id, { status: 'member' });

            context.pageController.redirect('/details/' + response._id);
        } catch (error) {
            errorField.textContent = error.message;
        } finally {
            toggleInputFields();
        }

        function toggleInputFields() {
            [...form.children].forEach(elem => { elem.disabled = !elem.disabled;[...elem.children].forEach(child => child.disabled = !child.disabled) });
        }

        function validateInputs() {
            if (name === "" || logoUrl === "" || description === "") {
                throw new Error('All fields must be filled!');
            } else if (description.length < 10) {
                throw new Error('Description must be at least 10 characters long!');
            }
        }
    }

}
