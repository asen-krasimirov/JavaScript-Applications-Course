

async function loadCommits() {

    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const commitListElem = document.getElementById('commits');

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    commitListElem.innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status} (Not found)`);
        }
        const promise = await response.json();
        promise.forEach(commit => {
        let author = commit.commit.author.name;
        let message = commit.commit.message;
        let liMessage = `${author}: ${message}`;
    
        appendToList(liMessage);
        })
    } catch (error) {
        appendToList(error);
    }

    function appendToList(content) {
        const newElem = document.createElement('li');
        newElem.textContent = content;
        commitListElem.appendChild(newElem);
    }
}


// function loadCommits() {

//     const username = document.getElementById('username').value;
//     const repo = document.getElementById('repo').value;
//     const commitListElem = document.getElementById('commits');

//     let url = `https://api.github.com/repos/${username}/${repo}/commits`;

//     commitListElem.innerHTML = '';

//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 console.log(response);
//                 throw new Error(`${response.status} (Not found)`);
//             }
//             return response.json();
//         })
//         .then(promise => {
//             promise.forEach(commit => {
//                 let author = commit.commit.author.name;
//                 let message = commit.commit.message;
//                 let liMessage = `${author}: ${message}`;

//                 appendToList(liMessage);
//             })
//         })
//         .catch(error => appendToList(error));
    
//     function appendToList(content) {
//         const newElem = document.createElement('li');
//         newElem.textContent = content;
//         commitListElem.appendChild(newElem);
//     }
// }
