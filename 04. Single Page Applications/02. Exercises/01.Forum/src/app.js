import { setUpHomePage, loadHomePage } from './loadHomePage.js';
import { setUpInTopicPage } from './loadInTopicPage.js';


const topicsOverviewSection = document.getElementById('topicsOverviewSection');
const inTopicSection = document.getElementById('inTopicSection');
const main = document.querySelector('main');
main.innerHTML = '';


function setUpContents() {
    setUpHomePage(topicsOverviewSection, main);
    setUpInTopicPage(inTopicSection, main);
}


function displayContent(viewName) {
    const contentController = {
        'topicsOverview': loadHomePage,
    };

    contentController[viewName]();
}


setUpContents();

// start the app
displayContent('topicsOverview');

document.getElementById('homeBtn').addEventListener('click', event => {
    event.preventDefault();
    displayContent('topicsOverview');
});