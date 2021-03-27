import { logoutUser } from './api/data.js';
import { page } from './dom.js';
import { manualBtnSetter } from './buttonContoller.js';


export function logut() {
    logoutUser();
    sessionStorage.clear();
    page.redirect('/');
    manualBtnSetter();
}