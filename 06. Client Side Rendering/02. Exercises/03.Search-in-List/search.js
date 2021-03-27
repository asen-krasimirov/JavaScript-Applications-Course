import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';


const townHolder = document.getElementById('towns');

const townListTemplate = (townNames, keyWord) => html`
   <ul>
      ${townNames.map(town => (!town.includes(keyWord)) ? html`<li>${town}</li>` : html`<li class="active">${town}</li>`)}
   </ul>
`; 


function setSearchEvent() {
   const searchInput = document.getElementById('searchText');
   document.querySelector('button').addEventListener('click', () => {
      renderTowns(searchInput.value);
   });
}


function renderTowns(keyWord='123') {
   render(townListTemplate(towns, keyWord), townHolder);
}


renderTowns();
setSearchEvent();