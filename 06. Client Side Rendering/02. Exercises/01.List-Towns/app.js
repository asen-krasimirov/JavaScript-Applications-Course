import { render } from '../node_modules/lit-html/lit-html.js';
import { townListCard } from './template.js';


function solution() {
    document.getElementById('btnLoadTowns').addEventListener('click', event => {
        event.preventDefault();
        const towns = document.getElementById('towns').value.split(', ');
        render(townListCard(towns), document.getElementById('root'));
    });
}


solution();