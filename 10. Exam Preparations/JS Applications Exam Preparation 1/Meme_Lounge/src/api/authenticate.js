import { registerUser, loginUser } from './data.js';
import { page } from '../lib.js';


export async function authenticate(body, isRegistering=true, setBtns) {
    let responseFunc = (isRegistering) ? registerUser : loginUser;

    let response = await (await responseFunc(body)).json();

    sessionStorage.authToken = response.accessToken;
    sessionStorage.userId = response._id;
    sessionStorage.userEmail = response.email;
    sessionStorage.userUsername = response.username;
    sessionStorage.userGender = response.gender;
    
    setBtns();
    page.redirect('/browser');
}