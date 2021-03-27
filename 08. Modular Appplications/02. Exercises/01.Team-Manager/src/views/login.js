import { html } from '../lib.js';
import { authenticate } from '../api/authenticate.js';


const loginPageTemplate = (onSubmit) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
            <div class="error"></div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`;


export function loadLoginPageContent(context) {
    context.renderContent(loginPageTemplate(onSubmit));
}


async function onSubmit(event) {
    event.preventDefault();
    const target = event.target;

    let { email, password } = [...(new FormData(target))].reduce((a, [key, value]) => {
        a[key] = value;
        return a;
    }, {});


    try {
        toggleInputs();
        validateForm();
        await authenticate({ email, password }, false);
    } catch (error) {
        target.querySelector('div.error').textContent = error.message;
    } finally {
        toggleInputs();
    }

    function toggleInputs() {
        [...target.children].forEach(elem => { elem.disabled = !elem.disabled;[...elem.children].forEach(elem => elem.disabled = !elem.disabled) });
    }

    function validateForm() {
        if (!email || !password) {
            throw new Error('All fields must be filled!');
        }
    }
}