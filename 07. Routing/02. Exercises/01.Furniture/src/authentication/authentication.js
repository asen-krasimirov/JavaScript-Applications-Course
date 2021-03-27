import { registerUser, loginUser } from '../api/data.js';
import { page } from '../dom.js';
import { manualBtnSetter } from '../buttonContoller.js';


export async function authenticate(data, isRegistering=true) {

    const body = {
        email: data.email,
        password: data.password
    };

    let response;
    if (isRegistering) { response =  await registerUser(body);} 
    else { response =  await loginUser(body); }

    let errorMessage = (isRegistering) ? 'You have already registed!' : 'You haven\'t registered yet!';

    try {
        response = await response.json();
        sessionStorage.authToken = response.accessToken;
        sessionStorage.userId = response._id;
        page.redirect('/');
        manualBtnSetter();
    } catch (error) {
        alert(errorMessage); console.error(errorMessage); return;
    }
}