

function changeButtonAvailability() {
    const activation = (sessionStorage.authToken) ? false : true;
    Array.from(document.getElementsByTagName('button')).forEach(button => button.disabled = activation);
}


function createEvent() {

    const createURL = 'http://localhost:3030/data/catches';
    const createForm = document.getElementById('addForm');

    createForm.addEventListener('submit', async event => {
        event.preventDefault();
        const { angler, weight, species, location, bait, captureTime } = getDataFromForm(new FormData(createForm));

        try {
            if (!sessionStorage.authToken) {
                throw new Error('You have to login first!');
            }
            const response = await fetch(createURL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error occured!`);
            }

            loadAllCatches();

        } catch (error) {
            alert(error.message); return;
        }
    });
}


function createCatchCard(angler, weight, species, location, bait, captureTime, id) {
    let catchURL = 'http://localhost:3030/data/catches/' + id;

    const newCard = e('div', [['className', 'catch']],

        e('label', [['textContent', 'Angler']]),
        e('input', [['className', 'angler'], ['value', angler]]),
        e('hr', []),

        e('label', [['textContent', 'Weight']]),
        e('input', [['type', 'number'], ['className', 'weight'], ['value', weight]]),
        e('hr', []),

        e('label', [['textContent', 'Species']]),
        e('input', [['className', 'species'], ['value', species]]),
        e('hr', []),

        e('label', [['textContent', 'Location']]),
        e('input', [['className', 'location'], ['value', location]]),
        e('hr', []),

        e('label', [['textContent', 'Bait']]),
        e('input', [['className', 'bait'], ['value', bait]]),
        e('hr', []),

        e('label', [['textContent', 'Time']]),
        e('input', [['type', 'number'], ['className', 'captureTime'], ['value', captureTime]]),
        e('hr', []),
    );

    // update button
    const updateBtn = e('button', [['disabled', true], ['className', 'update'], ['textContent', 'Update']]);
    updateBtn.addEventListener('click', async event => {
        let angler = newCard.querySelector('input.angler').value;
        let weight = newCard.querySelector('input.weight').value;
        let species = newCard.querySelector('input.species').value;
        let location = newCard.querySelector('input.location').value;
        let bait = newCard.querySelector('input.bait').value;
        let captureTime = newCard.querySelector('input.captureTime').value;

        try {
            const response = await fetch(catchURL, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error occured!`);
            }

        } catch (error) {
            alert(error.message); return;
        }
    });

    // delete button
    const deleteBtn = e('button', [['disabled', true], ['className', 'delete'], ['textContent', 'Delete']]);
    deleteBtn.addEventListener('click', event => {
        if (!sessionStorage.authToken) {
            alert('You have to login first!'); return;
        }
        fetch(catchURL, {
            method: 'delete',
            headers: { 'X-Authorization': sessionStorage.authToken }
        });

        newCard.remove();
    });

    newCard.appendChild(updateBtn);
    newCard.appendChild(deleteBtn);

    return newCard;
}


async function loadAllCatches() {
    const catchesURL = 'http://localhost:3030/data/catches';
    const catchesHolder = document.getElementById('main');
    catchesHolder.innerHTML = '<legend>Catches</legend>';

    try {
        const response = await fetch(catchesURL);

        if (!response.ok) {

            if (response.status == '404') {
                catchesHolder.innerHTML += 'No added catches yet!';
                throw new Error(`You haven't added any records yet!`);
            }

            throw new Error(`${response.status} error has occured!`);
        }

        const data = await response.json();

        for (const content of data) {
            let { angler, weight, species, location, bait, captureTime } = content;
            catchesHolder.appendChild(
                createCatchCard(angler, weight, species, location, bait, captureTime, content._id)
            );
        }
        changeButtonAvailability();

    } catch (error) {
        alert(error.message); return;
    }
}


function loadBtnEvent() {
    const loadBtn = document.querySelector('aside button.load');
    loadBtn.addEventListener('click', loadAllCatches);
    loadBtn.disabled = false;
}


changeButtonAvailability();
createEvent();
loadBtnEvent();


function e(type, attributes, ...children) {

    // function for creating custom DOM elements

    const newElem = document.createElement(type);

    for (let [name, value] of attributes) {
        newElem[name] = value;
    }

    for (const elem of children) {
        newElem.appendChild(elem);
    }

    return newElem;
}
