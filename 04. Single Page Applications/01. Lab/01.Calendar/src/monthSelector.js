
function displayMonth(month, dayCalendars) {
    document.body.appendChild(month);

    const monthConvertor = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sept': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
    };

    month.querySelectorAll('tbody td').forEach(elem => elem.addEventListener('click', event => {
        const target = event.target;
        let monthId = (target.className == 'day') ? target.children[0].textContent : target.textContent;
        monthId = `month-${month.id.slice(5)}-${monthConvertor[monthId]}`;
        // month-2020-1

        // displaying per-day selector
        document.body.innerHTML = '';
        getSelectedMonthDays(monthId);
    }));

    function getSelectedMonthDays(monthId) {
        dayCalendars.forEach(elem => {
            if (elem.id == monthId) {
                elem.querySelector('caption').addEventListener('click', () => {
                    document.body.innerHTML = '';
                    document.body.appendChild(month);
                });
                document.body.appendChild(elem);
                return;
            }
        });
    }
}


export {
    displayMonth,
}