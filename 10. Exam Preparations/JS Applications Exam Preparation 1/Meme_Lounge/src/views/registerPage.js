import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';
import { showNotification } from '../notification.js';


const registerPageTemplate = (onSubmit) => html`
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;


export function showRegisterPage(context) {
    context.renderContent(registerPageTemplate(onSubmit));
    context.setNavButtons();

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('repeatPass');
        const gender = formData.get('gender');


        try {
            validateForm();
            await authenticate({ username, email, password, gender }, true, context.setNavButtons);
        } catch (error) {
            showNotification(error.message);
        }

        function validateForm() {
            if (!username || !email || !password || !repeatPass || !gender) {
                throw new Error('All fields must be filled!');
            } else if (password !== repeatPass) {
                throw new Error('Both passwords must match!');
            }
        }
    }
}