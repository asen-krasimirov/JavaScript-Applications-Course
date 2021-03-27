// import { repeat } from '../node_modules/lit-html/directives/repeat.js';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dropdownLink = 'http://localhost:3030/jsonstore/advanced/dropdown';

const optionTemplate = (data) => html`
    <option value=${data._id}>${data.text}</option>
`;


async function setDropdownOptions() {
    const optionsData = await (await fetch(dropdownLink)).json();
    const newData = Object.values(optionsData).map(optionTemplate);
    render(newData, document.getElementById('menu'));
}


function addSendEvent() {
    
    const inputText = document.getElementById('itemText');
    document.querySelector('input[type="submit"]').addEventListener('click', async event => {
        event.preventDefault();
        try {
            let text = inputText.value;
            inputText.value = '';

            const response = await fetch(dropdownLink, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({text: text})
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }
            
            setDropdownOptions();

        } catch (error) { alert(error.message); }
    });
}


addSendEvent();
setDropdownOptions();