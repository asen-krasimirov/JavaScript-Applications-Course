import { setUpView } from './views/setUpViews.js';
import { setUpRouter } from './navigation.js';
import { logut } from './logout.js';
import { setBtnActivityBtnListener } from './buttonContoller.js';


function initializaApp() {
    setUpView();
    setUpRouter();
    setBtnActivityBtnListener();
    document.getElementById('logoutBtn').addEventListener('click', () => {
        logut();
    });
}


initializaApp();