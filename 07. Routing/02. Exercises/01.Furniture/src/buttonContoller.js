
const nav = document.querySelector('nav');


export function setBtnActivityBtnListener() {
    nav.addEventListener('click', event => {
        const target = event.target;
        if (target.tagName != 'A') { return; }
        nav.querySelector('.active').className = '';
        target.className = 'active';
    });
}


export function manualBtnSetter(curId='catalogLink') {
    nav.querySelector('.active').className = '';
    nav.querySelector('#' + curId).className = 'active';
}