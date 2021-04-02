
const notificationHolder = document.getElementById('notifications');
const errorMessageHolder = notificationHolder.querySelector('#errorBox span');
notificationHolder.style.display = 'none';


export function showNotification(message) {
    errorMessageHolder.textContent = message;
    notificationHolder.style.display = 'block';

    setTimeout(() => {
        notificationHolder.style.display = 'none';
    }, 3000);
}