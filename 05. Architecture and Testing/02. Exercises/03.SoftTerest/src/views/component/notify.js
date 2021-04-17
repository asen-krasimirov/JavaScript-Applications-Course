import { html, render } from '../../lib.js';


const notificationHolder = document.getElementById('notification-holder');

const notificationContentTemplate = (message) => html`
<div>
    <span>${message}</span>
</div>`;


export function showNotification(message) {
    render(notificationContentTemplate(message), notificationHolder);
    changeNotificationVisibility();

    setTimeout(changeNotificationVisibility, 3000);
}


function changeNotificationVisibility() {
    let isVisible = notificationHolder.style.display == 'block';
    notificationHolder.style.display = isVisible ? 'none': 'block';
}