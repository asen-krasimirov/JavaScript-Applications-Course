import { getDataFromForm } from './getFormData.js';
import { e } from './createElem.js';


let section;
let mainMain;
let curPostId;
let postsURL = 'http://localhost:3030/jsonstore/collections/myboard/posts/';
let commentsURL = 'http://localhost:3030/jsonstore/collections/myboard/comments/';


function createCommentCard(username, postText, createdTime) {

    const newCard = e('div', { className: 'comment' },
        e('header', { className: 'header' },
            e('p', { innerHTML: `<span></span> posted on <time>${createdTime}</time>` }),
        ),
        e('div', { className: 'comment-main' },
            e('div', { className: 'userdetails' },
                e('img', { src: './static/profile.png' })
            ),
            e('div', { className: 'post-content' },
                e('p', { textContent: postText })
            )
        )
    );

    newCard.querySelector('span').textContent = username;

    return newCard;
}

export async function addComment(username, postText, createdTime, postId) {

    try {
        const response = await fetch(commentsURL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, postText, createdTime, postId })
        });

        if (!response.ok) {
            throw new Error(`${response.status} error has occured!`);
        }

    } catch (error) {
        alert(error.message); return;
    }
}

export function setUpInTopicPage(content, main) {
    section = content;
    mainMain = main;
    const newCommentForm = section.querySelector('#newCommentForm');
    newCommentForm.addEventListener('submit', async event => {
        event.preventDefault();

        let { topicName, username, postText } = getDataFromForm(new FormData(newCommentForm));
        try {

            if (!username || !postText) {
                throw new Error('All fields must be filled!');
            }

            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const createdTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' -> ' + time;

            const response = await fetch(commentsURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topicName, username, postText, createdTime })
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            newCommentForm.reset(main);
            addComment(username, postText, createdTime, curPostId);
            loadInTopicPage(curPostId);
        } catch (error) {
            alert(error.message); return;
        }
    });

}

export function loadInTopicPage(postId) {
    curPostId = postId;
    mainMain.innerHTML = '';
    mainMain.appendChild(section);
    addCommentsToSection(curPostId);
    displayTopicInfo(curPostId);
}


async function displayTopicInfo() {

    try {
        const response = await fetch(postsURL + curPostId);

        if (!response.ok) {
            throw new Error(`${response.status} error has occured!`);
        }
        const data = await response.json();
        document.getElementById('infoTopicName').textContent = data.topicName;
        document.getElementById('infoTopicDate').textContent = data.createdTime;
    } catch (error) {
        alert(error.message); return;
    }

}


async function addCommentsToSection() {

    const commentsHolder = section.querySelector('#commentsHoler');
    commentsHolder.innerHTML = '';

    try {
        const response = await fetch(commentsURL);

        if (!response.ok) {
            throw new Error(`${response.status} error has occured!`);
        }

        const commentsData = await response.json();
        const fragment = document.createDocumentFragment();
        for (const content of Object.values(commentsData)) {
            if (content.postId != curPostId) {
                continue;
            }

            fragment.appendChild(
                createCommentCard(content.username, content.postText, content.createdTime)
            );
        }

        commentsHolder.appendChild(fragment);

    } catch (error) {
        alert(error.message); return;
    }
}