import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';


const registerPageTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form id="register-form" @submit=${onSubmit}>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;


export function showRegsterPage(context) {
    context.renderContent(registerPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        
        const form = document.querySelector('form');
        const formData = new FormData(form);
       
        let username = formData.get('username');
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');

        try {
            validateInput();
            await authenticate({ username, password }, true);
        } catch(error) {
            alert(error.message);
        }

        function validateInput() {
            if ( !username || !password || !repeatPass ) {
                throw new Error('All fields must be filled!');
            } else if ( password !== repeatPass ) {
                throw new Error('Both passwords must match!');
            }
        }
    }
}