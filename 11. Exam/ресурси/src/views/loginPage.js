import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';


const loginPageTemplate = (onSubmit) => html`
<section id="login-page" class="content auth">
    <h1>Login</h1>

    <form id="login" @submit=${onSubmit}>
        <fieldset>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                increase in quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="login-pass">Password:</label>
                <input type="password" id="login-pass" name="password">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Log in">
            </p>
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;


export function showLoginPage(context) {
    context.renderContent(loginPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');

        try {
            validate();
            await authenticate({ email, password }, false);

        } catch (error) {
            alert(error.message);
        }

        function validate() {
            if (!email || !password) throw new Error('All fields are required!');
        }
    }
}