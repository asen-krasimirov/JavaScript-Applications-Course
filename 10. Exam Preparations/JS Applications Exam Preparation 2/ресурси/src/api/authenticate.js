import { registerUser, loginUser } from './data.js';
import { page } from '../lib.js';


export async function authenticate(body, isRegistering=true) {
    let responseFunc = (isRegistering) ? registerUser : loginUser;
    let errorMessage = (isRegistering) ? 'You have already registered!' : 'You haven\'t registered yet!';

    try {
        let response = await (await responseFunc(body)).json();
        sessionStorage.authToken = response.accessToken;
        sessionStorage.userId = response._id;
        sessionStorage.userUsername = response.username;
    } catch(error) {
        throw new Error(errorMessage);
    }

    // sessionStorage.userEmail = response.email;
    
    page.redirect('/home');
}