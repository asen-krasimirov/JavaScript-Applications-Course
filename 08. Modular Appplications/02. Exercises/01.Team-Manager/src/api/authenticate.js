import { registerUser, loginUser } from './data.js';
import { page } from '../lib.js';


export async function authenticate(body, isRegistering=true) {
    let responseFunc = (isRegistering) ? registerUser : loginUser;

    let response = await (await responseFunc(body)).json();
    sessionStorage.authToken = response.accessToken;
    sessionStorage.userId = response._id;
    page.redirect('/myTeams/' + response._id);
}