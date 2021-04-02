import { html } from '../lib.js';
import { getTeamById, editTeam } from '../api/data.js';


const editPageTemplate = (teamData, onSubmit) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form id="edit-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error"></div>
            <label>Team name: <input type="text" name="name" .value=${teamData.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${teamData.logoUrl}></label>
            <label>Description: <textarea name="description" .textContent=${teamData.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>`;


export async function loadEditPageContent(context) {
    let teamId = context.params.id;
    const team = await (await getTeamById(teamId)).json();
    context.renderContent(editPageTemplate(team, onSubmit));

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

            await editTeam(teamId, teamData);

            context.pageController.redirect('/details/' + teamId);
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
