function attachEvents() {
    const postTitlesHolder = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', loadSelectedPost);

    async function loadSelectedPost() {

        let postId = postTitlesHolder.value;

        let commentsURL = `http://localhost:3030/jsonstore/blog/comments`;
        let postURL = `http://localhost:3030/jsonstore/blog/posts/${postId}`;

        const [commentsResponse, postResponse] = await Promise.all([
            fetch(commentsURL),
            fetch(postURL)
        ]);

        const commentContents = [];
        const commentsData = await commentsResponse.json();

        for (let commentId in commentsData) {
            const curComment = commentsData[commentId];
            if (curComment.postId === postId) {
                commentContents.push([curComment.id, curComment.text]);
            }
        }

        const postData = await postResponse.json();
        let [postTitle, postBody] = [postData.title, postData.body];

        addPostInformation(postTitle, postBody, commentContents);
    }

    function addPostInformation(title, body, comments) {
        postBody.innerHTML = '';
        postTitle.innerHTML = '';
        postComments.innerHTML = '';

        postTitle.textContent = title.toUpperCase();
        postBody.textContent = body;

        for (let [commentId, content] of comments) {
            const newComment = e('li', [['id', commentId], ['textContent', content]]);
            postComments.appendChild(newComment);
        }
    }

    async function loadPosts() {
        postTitlesHolder.innerHTML = '';

        try {
            let url = `http://localhost:3030/jsonstore/blog/posts`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const posts = await response.json();

            addLoadedPostsTitles(posts);

        } catch (error) { alert(error.message); }

        function addLoadedPostsTitles(posts) {
            for (let postId in posts) {
                const post = posts[postId];
                const newPostOption = e('option', [['value', postId], ['textContent', post.title]]);
                postTitlesHolder.appendChild(newPostOption);
            }
        }
    }
}

attachEvents();

function e(type, attributes, ...children) {

    // function for creating custom DOM elements

    const newElem = document.createElement(type);

    for (let [name, value] of attributes) {
        newElem[name] = value;
    }

    for (const elem of children) {
        newElem.appendChild(elem);
    }

    return newElem;
}
