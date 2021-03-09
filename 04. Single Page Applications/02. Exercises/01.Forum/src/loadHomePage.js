import { getDataFromForm } from './getFormData.js';
import { e } from './createElem.js';
import { addComment, loadInTopicPage } from './loadInTopicPage.js';


let section;
let mainMain;
let postsURL = 'http://localhost:3030/jsonstore/collections/myboard/posts/';

export function setUpHomePage(content, main) {
    section = content;
    mainMain = main;
    const newTopicForm = section.querySelector('#newTopicForm');
    newTopicForm.addEventListener('submit', async event => {
        event.preventDefault();
    });

    newTopicForm.addEventListener('click', async event => {
        if (event.target.textContent == 'Cancel') {
            newTopicForm.reset(); return;
        } else if (event.target.textContent != 'Post') {
            return;
        }

        let { topicName, username, postText } = getDataFromForm(new FormData(newTopicForm));
        try {

            if (!topicName || !username || !postText) {
                throw new Error('All fields must be filled!');
            }

            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const createdTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' -> ' + time;

            const response = await fetch(postsURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topicName, username, postText, createdTime })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            newTopicForm.reset(main);
            addComment(username, postText, createdTime, (await response.json())._id);
            loadHomePage();
        } catch (error) {
            alert(error.message); return;
        }
    });

}

export function loadHomePage() {

    mainMain.innerHTML = '';
    mainMain.appendChild(section);
    addPostsToSection();
}


async function addPostsToSection() {

    const postsHolder = section.querySelector('#topicsHoler');
    postsHolder.innerHTML = '';

    try {
        const response = await fetch(postsURL);

        if (!response.ok) {
            throw new Error(`${response.status} error has occured!`);
        }

        const postsData = await response.json();
        const fragment = document.createDocumentFragment();
        for (const content of Object.values(postsData)) {
            fragment.appendChild(
                createTopicPostCard(content.topicName, content.username, content.postText, content.createdTime, content._id)
            );
        }

        postsHolder.appendChild(fragment);
        
    } catch (error) {
        alert(error.message); return;
    }
}


function createTopicPostCard(topicName, username, postText, createdTime, postId) {

    const newCard = e('div', { className: 'topic-container' },
        e('div', { className: 'topic-name-wrapper' },
            e('div', { className: 'topic-name' },
                e('a', { href: '#', className: 'normal' },
                    e('h2', { textContent: topicName })
                ),
                e('div', { className: 'colums' },
                    e('div', {}, 
                        e('p', { textContent: 'Date: '},
                            e('time', {textContent: createdTime})
                        ),
                        e('div', { className: 'nick-name'},
                            e('p', { textContent: 'Username: '},
                                e('span', { textContent: username})
                            )
                        )
                    )
                )
            )
        )
    );

    newCard.querySelector('a').addEventListener('click', event => {
        event.preventDefault();
        loadInTopicPage(postId)
    });

    // addComment(username, postText, createdTime, postId);

    return newCard;
}