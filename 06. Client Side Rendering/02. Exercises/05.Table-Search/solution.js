import { html, render } from '../node_modules/lit-html/lit-html.js';


const resultsURL = 'http://localhost:3030/jsonstore/advanced/table/';


const createResultResultCard = (resultData, keyWord) => html`
   <tr class=${(resultContainsKeyWord(resultData, keyWord)) ? 'select' : ''}>
      <td>${resultData.firstName} ${resultData.lastName}</td>
      <td>${resultData.email}</td>
      <td>${resultData.course}</td>
   </tr>
`;


function resultContainsKeyWord(resultData, keyWord) {
      let doesContaint = false;
      [resultData.firstName, resultData.lastName, resultData.email, resultData.course].forEach(value => {
         if (value.includes(keyWord)) { doesContaint = true; return; }
      });
      return doesContaint;
}


function solve() {
   const container = document.querySelector('table.container tbody');
   const searchedDataInput = document.getElementById('searchField');
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   renderResults();

   function onClick() {
      renderResults(searchedDataInput.value);
      searchedDataInput.value = '';
   }

   async function renderResults(keyWord='123') {
      const results = Object.values((await (await fetch(resultsURL)).json()));
      render(results.map(result => createResultResultCard(result, keyWord)), container);
   }
}


solve();