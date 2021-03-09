function attachEvents() {
    const messagesTextarea = document.getElementById('messages');
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');

    let messagesURL = 'http://localhost:3030/jsonstore/messenger/messenger';

    document.getElementById('refresh').addEventListener('click', async event => {
        try {
            const response = await fetch(messagesURL);

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }
            const messagesData = await response.json();

            messagesTextarea.textContent = '';
            for (let messageInformation of Object.values(messagesData)) {
                let {author, content} = messageInformation;
                messagesTextarea.textContent += `${author}: ${content}\n`;
            }
            
        } catch (error) {
            alert(error.message); return;
        }
    });

    document.getElementById('submit').addEventListener('click', async event => {
        let author = authorInput.value;
        let content = contentInput.value;

        contentInput.value = '';
        authorInput.value = '';

        if (!author || !content) {
            alert('All fields must be filled!'); return;
        }

        fetch(messagesURL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({author, content})
        });
    });
}

attachEvents();