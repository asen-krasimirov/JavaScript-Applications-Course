const studentsURL = 'http://localhost:3030/jsonstore/collections/students';

function addEvents() {

    const addForm = document.getElementById('addStudenForm');
    addForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(addForm);
        let { ID, FirstName, LastName, FacultyNumber, Grade } = getDataFromForm(formData);

        try {

            // input data validation
            if (!ID || !FirstName || !LastName || !FacultyNumber || !Grade) {
                throw new Error('All fields must be filled!');
            } else if (String(Number(ID)) === 'NaN') {
                throw new Error('The ID must be an integer!');
            } else if (String(Number(FirstName)) !== 'NaN' || String(Number(LastName)) !== 'NaN') {
                throw new Error('The names must be strings!');
            } else if (String(Number(FacultyNumber)) === 'NaN') {
                throw new Error('Faculty number must a string of numbers!');
            } else if (String(Number(Grade)) === 'NaN') {
                throw new Error('Grade must a number!');
            }

            const response = await fetch(studentsURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ID, FirstName, LastName, FacultyNumber, Grade })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }
            
            loadStrudents();
        } catch (error) {
            alert(error.message); return;
        }
    });
}

function createStrudentCard(id, firstName, lastName, facultyNumber, grade) {

    return e('tr', [],
        e('td', [['textContent', id]]),
        e('td', [['textContent', firstName]]),
        e('td', [['textContent', lastName]]),
        e('td', [['textContent', facultyNumber]]),
        e('td', [['textContent', grade]]),
    );

}

async function loadStrudents() {
    const studentTable = document.querySelector('#results tbody');
    studentTable.innerHTML = '';

    try {
        const response = await fetch(studentsURL);
        const data = await response.json();

        for (const content of Object.values(data).sort((a, b) => a.ID - b.ID)) {
            studentTable.appendChild(
                createStrudentCard(content.ID, content.FirstName, content.LastName, content.FacultyNumber, content.Grade)
            );
        }
    } catch (error) {
        alert(error.message); return;
    }
}

addEvents();
loadStrudents();

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
