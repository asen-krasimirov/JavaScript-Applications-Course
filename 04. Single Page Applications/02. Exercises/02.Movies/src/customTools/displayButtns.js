
let addBtn;
let welcomeBtn; let logoutBtn; let loginBtn; let registerBtn; 

export function setUpDisplayNavButtons(addButton, navButtons) {
    [ welcomeBtn, logoutBtn, loginBtn, registerBtn] = navButtons;
    addBtn = addButton;
}


export function displayNavBtns() {
    let isLogged = sessionStorage.authToken;

    // logged in
    if (isLogged) {
        welcomeBtn.querySelector('a').textContent = `Welcome, ${sessionStorage.email}`;
    }
    welcomeBtn.style.display = isLogged ? 'inline' : 'none';
    logoutBtn.style.display = isLogged ? 'inline' : 'none';

    // guest
    loginBtn.style.display = !isLogged ? 'inline' : 'none';
    registerBtn.style.display = !isLogged ? 'inline' : 'none';

    // add movie button
    addBtn.style.display = isLogged ? 'inline-block' : 'none';

}