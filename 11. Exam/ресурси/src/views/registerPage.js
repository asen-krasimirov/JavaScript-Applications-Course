import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';


const registerPageTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <h1>Register</h1>

    <form id="register" @submit=${onSubmit}>
        <fieldset>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <label for="register-email">Email:</label>
                <input type="email" id="register-email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="register-pass">Password:</label>
                <input type="password" name="password" id="register-pass">
            </p>
            <p class="field password">
                <label for="register-rep-pass">Repeat password:</label>
                <input type="password" name="rep-pass" id="register-rep-pass">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Register">
            </p>
            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;


export function showRegisterPage(context) {
    context.renderContent(registerPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');
        let repPass = formData.get('rep-pass');

        try {
            validate();
            await authenticate({ email, password }, true);

        } catch (error) {
            alert(error.message);
        }

        function validate() {
            if (!email || !password || !repPass) throw new Error('All fields are required!');
            if (password !== repPass) throw new Error('Both password must match!');
        }
    }
}