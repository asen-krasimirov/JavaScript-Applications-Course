function attachEvents() {
    const phonebookList = document.getElementById('phonebook');
    let phonebookURL = 'http://localhost:3030/jsonstore/phonebook/phonebook/';

    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    document.getElementById('btnLoad').addEventListener('click', loadPhonebook)
    document.getElementById('btnCreate').addEventListener('click', addToPhoneBook);
    
    async function loadPhonebook() {
        phonebookList.innerHTML = '';

        try {
            const response = await fetch(phonebookURL);
            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }
            const phonebookData = await response.json();
            
            for (let [phonebookId, content] of Object.entries(phonebookData)) {
                createPhoneCard(content.person, content.phone, phonebookId);
            }

        } catch (error) {
            alert(error.message); return;
        }
    }

    async function createPhoneCard(person, phone, id) {
        const newPhoneLi = e('li', [['textContent', `${person}: ${phone}`]]);

        const delButton = e('button', [['textContent', 'Delete']]);
        delButton.addEventListener('click', async event => {
            try {

                const response = await fetch(phonebookURL + id, {
                    method: 'delete',
                });

                if (!response.ok) {
                    throw new Error(`${response.status} has occured!`);
                }

            } catch(error) {
                alert(error.message); return;
            }

            newPhoneLi.remove();
        });

        newPhoneLi.appendChild(delButton);

        phonebookList.appendChild(newPhoneLi);
    }

    async function addToPhoneBook() {
        let person = personInput.value;
        let phone = phoneInput.value;

        personInput.value = '';
        phoneInput.value = '';

        
        try {
            
            const response = await fetch(phonebookURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({person, phone})
            });

            if (!response.ok) {
                throw new Error(`${response.status} has occured!`);
            }

        } catch(error) {
            alert(error.message); return;
        }

        loadPhonebook();
    }

}

attachEvents();

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