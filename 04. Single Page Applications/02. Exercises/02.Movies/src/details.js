import { e } from './customTools/createCustomElem.js';
import { displayEditPage } from './edit.js';
import { displayHomePage } from './homePage.js';


let section;
let mainMain;
let likeURL = `http://localhost:3030/data/likes/`;
let movieURL = `http://localhost:3030/data/movies/`;

export function setUpDetailsPage(main, content) {
    section = content;
    mainMain = main;
}


export async function displayDetailsPage(title, discription, imgURL, ownerId, postId) {
    mainMain.innerHTML = '';

    const isOwner = sessionStorage.ownerId == ownerId;

    const newCard = e('div', { className: 'container' },
        e('div', { className: 'row bg-light text-dark' },
            e('h1', { textContent: 'Moview title: ' + title }),
            e('div', { className: 'col-md-8' },
                e('img', { className: 'img-thumbnail', src: imgURL, alt: 'Movie' })
            ),
            e('div', { className: 'col-md-4' },
                e('h3', { className: 'my-3', textContent: 'Movie Discription' }),
                e('p', { textContent: discription })
            ),
        )
    );

    const buttonContainer = newCard.querySelector('div.col-md-4');
    
    // array of liked users
    let usersCount = 0;
    let hasLiked = false;
    await fetch(likeURL)
    .then(response=> response.json())
    .then(data=> {
        data.forEach(likeRecord => {
            if(likeRecord.likedPost == postId) {
                usersCount += 1;
                if(likeRecord.likedBy == sessionStorage.email) {
                    hasLiked = true;
                }
            }
        });
    });

    const likeCounter = e('span', { className: 'enrolled-span', textContent: `Liked ${usersCount}`});

    if (isOwner) {
        // delete button
        const delBtn = e('a', { className: 'btn btn-danger', href: '#', textContent: 'Delete' });
        delBtn.addEventListener('click', event => {
            event.preventDefault();
            const confirmation = confirm(`Are you sure you want to delete ${title}?`);
            if (confirmation) {
                fetch(movieURL + postId, {
                    method: 'delete',
                    headers: {
                        'X-Authorization': sessionStorage.authToken
                    }
                });

                displayHomePage();
            }    
        });
        
        // edit button
        const editBtn = e('a', { className: 'btn btn-warning', href: '#', textContent: 'Edit' });
        editBtn.addEventListener('click', event => {
            event.preventDefault();
            displayEditPage(title, discription, imgURL, ownerId, postId);
        });
        buttonContainer.appendChild(delBtn);
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(likeCounter);

    } else {

        // like button (not available for the creator)
        const likeBtn = e('a', { className: 'btn btn-primary', href: '#', textContent: 'Like' });
        likeBtn.addEventListener('click', event => {
            event.preventDefault();
            likeCounter.textContent = `Liked ${usersCount + 1}`;
            likeBtn.parentNode.replaceChild(likeCounter, likeBtn);

            fetch(likeURL, {
                method: 'post',
                headers: {
                    'Content-Type': 'applicaiton/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ 'likedPost': postId, 'likedBy': sessionStorage.email })
            });

        });
        if(!hasLiked) {
            buttonContainer.appendChild(likeBtn);
        } else {
            buttonContainer.appendChild(likeCounter);
        }
    }

    mainMain.appendChild(newCard);
}

