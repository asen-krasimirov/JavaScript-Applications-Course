import { html, render } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { cats } from './catSeeder.js';


cats.forEach(c => c.isInfoVisible = false);


const catListTemplate = (catList) => html`
    <ul>
        ${catList.map(catCardTemplate)}
    </ul>
`;


const catCardTemplate = (cat) => html`
    <li>
        <img src=${'./images/' + cat.imageLocation + '.jpg'} width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <!-- <div class="status" style="display: none" id=${cat.id}> -->
            <div class="status" style=${styleMap(cat.isInfoVisible ? {display:'block'} : {display:'none'})} id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;




function solve() {
    const catStatusesHolder = document.getElementById('allCats');
    renderCats();

    catStatusesHolder.addEventListener('click', (event) => {
        let target = event.target;
        if (target.tagName != 'BUTTON') { return; }

        /* Solution #1 */
        // const isVisible = target.parentNode.querySelector('div.status').style.display == 'block';
        // target.parentNode.querySelector('div.status').style.display = (isVisible) ? 'none' : 'block';

        /* Solution #2 */
        let catId = target.parentNode.querySelector('.status').id;
        // cats.forEach(c => {
        //     if (c.id == catId) {
        //         c.isInfoVisible = !c.isInfoVisible;
        //     }
        // });
        let cat = cats.find(c => c.id == catId);
        cat.isInfoVisible = !cat.isInfoVisible;

        renderCats();
    });

    function renderCats() {
        render(catListTemplate(cats), catStatusesHolder);
    }
}




solve();