import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';
import { showNotification } from './component/notify.js';


const registerPageTemplate = (onSubmit) => html`
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form class="form-user col-md-7" @submit=${onSubmit}>
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            </div>
            <div class="form-label-group">
                <label for="inputEmail">Email</label>
                <input type="text" id="inputEmail" name="email" class="form-control" placeholder="Email" required=""
                    autofocus="">
            </div>
            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control"
                    placeholder="Password" required="">
            </div>
            <div class="form-label-group">
                <label for="inputRepeatPassword">Repeat Password</label>
                <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
            <div class="text-center mb-4">
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/login">Sign-In</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;


export function showRegisterPage(context) {
    context.renderContent(registerPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        try {
            validate();
            await authenticate({ email, password });

        } catch (error) {
            showNotification(error.message);
        }

        function validate() {
            /*
                - The email should be at least 3 characters long, have digits and special characters
                - The password should be at least 3 characters long
                - The repeat password should be equal to the password
            */

            let isEmailValid = (/[a-z1-9]{3,}@[a-z1-9]+\.[a-z]+/.test(email) && /[1-9]+/.test(email));
            let isPasswordValid = (/[\w]{3,}/.test(password));
            let doPasswordMach = (password === repeatPassword);

            if (!isEmailValid) throw new Error('The email should be at least 3 characters long, have digits and has to contain "@" and "."!');
            if (!isPasswordValid) throw new Error('The password should be at least 3 characters long!');
            if (!doPasswordMach) throw new Error('The repeat password should be equal to the password!');
        }
    }
}