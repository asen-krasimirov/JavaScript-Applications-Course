import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';
import { showNotification } from '../notification.js';


const loginPageTemplate = (onSubmit) => html`
<section id="login">
    <form id="login-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;


export function showLoginPage(context) {
    context.renderContent(loginPageTemplate(onSubmit));
    context.setNavButtons();
    
    async function onSubmit(event) {
        event.preventDefault();
        
        const form = document.querySelector('form');
        const formData = new FormData(form);
        
        const email = formData.get('email');
        const password = formData.get('password');
        
        
        try {
            validateForm();
            await authenticate({ email, password }, false, context.setNavButtons);
        } catch (error) {
            showNotification(error.message);
        }

        function validateForm() {
            if (!email || !password) {
                throw new Error('All fields must be filled!');
            }
        }
    }
}