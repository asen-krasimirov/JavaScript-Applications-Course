import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';


const registerPageTemplate = (onSubmit) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>

        <form id="register-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error"></div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>

        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;


export function loadRegisterPageContent(context) {
    context.renderContent(registerPageTemplate(onSubmit));
}


async function onSubmit(event) {
    event.preventDefault();
    const target = event.target;

    let { email, username, password, repass } = [...(new FormData(target))].reduce((a, [key, value]) => {
        a[key] = value;
        return a;
    }, {});

    try {
        toggleInputs();
        validateForm();
        await authenticate({ email, password, username });
    } catch (error) {
        target.querySelector('div.error').textContent = error.message;
    } finally {
        toggleInputs();
    }

    function toggleInputs() {
        [...target.children].forEach(elem => { elem.disabled = !elem.disabled;[...elem.children].forEach(elem => elem.disabled = !elem.disabled) });
    }

    function validateForm() {
        if (!email || !username || !password || !repass) {
            throw new Error('All fields must be filled!');
        }
        else if (!email.includes('@')) {
            throw new Error('The email must be valid!');
        }
        else if (username.length < 3) {
            throw new Error('The username must be at least 3 characters long!');
        }
        else if (password.length < 3) {
            throw new Error('The password must be at least 3 characters long!');
        }
        else if (password !== repass) {
            throw new Error('Both passwords must match!');
        }
    }
}