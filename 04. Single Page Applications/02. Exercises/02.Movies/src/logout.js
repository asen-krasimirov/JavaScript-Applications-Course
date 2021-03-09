import { displayLoginPage } from './login.js';


let logoutURL = `http://localhost:3030/users/logout/`;

export function setUpLogout(button) {

    button.addEventListener('click', async event => {
        event.preventDefault();

        try {
            const response = await fetch(logoutURL, {
                method: 'post',
                headers: { 'X-Authorization': sessionStorage.authToken }
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

        } catch (error) {
            alert(error.message);
        }
        sessionStorage.clear();
        displayLoginPage();
    });
}
