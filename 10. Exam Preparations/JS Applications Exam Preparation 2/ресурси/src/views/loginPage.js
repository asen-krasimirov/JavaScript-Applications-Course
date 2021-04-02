import { authenticate } from '../api/authenticate.js';
import { html } from '../lib.js';


const loginPageTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form id="login-form" action="#" method="post" @submit=${onSubmit}>
        <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;



export function showLoginPage(context) {
    context.renderContent(loginPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);
        
        let username = formData.get('username');
        let password = formData.get('password');

        try {
            validateInput();
            await authenticate({ username, password }, false);
        } catch (error) {
            alert(error.message);
        }

        function validateInput() {
            if ( !username || !password ) {
                throw new Error('All fields must be filled!');
            }
        }
    }
}