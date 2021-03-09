import { displayMonth } from './monthSelector.js'


function getYearFromYearSelector(yearSelector, monthSelectors, dayCalendars) {

    document.body.appendChild(yearSelector);

    yearSelector.querySelectorAll('tbody td').forEach(elem => elem.addEventListener('click', event => {
        const target = event.target;
        let year = (target.className == 'day') ? target.children[0].textContent : target.textContent;
        year = `year-${year}`;

        // displaying the month selector
        document.body.innerHTML = '';
        getSelectedMonth(year);
    })
    )

    function getSelectedMonth(yearId) {
        monthSelectors.forEach(elem => {
            if (elem.id == yearId) {
                elem.querySelector('caption').addEventListener('click', () => {
                    document.body.innerHTML = '';
                    document.body.appendChild(yearSelector);
                });

                displayMonth(elem, dayCalendars);
                return;
            }
        });
    }
}


export {
    getYearFromYearSelector
}