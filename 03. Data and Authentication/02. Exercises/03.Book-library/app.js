

function addEvents() {
    const bookHolderTable = document.getElementById('bookHolderTable');
    const bookCollectionURL = 'http://localhost:3030/jsonstore/collections/books/';

    const addBookForm = document.getElementById('createForm');
    const editBookForm = document.getElementById('editForm');
    editBookForm.style.display = 'none';

    addBookForm.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(addBookForm);
        let { author, title } = getDataFromForm(formData);

        try {
            if (!author || !title) {
                throw new Error('All fields must be filled!');
            }

            const response = await fetch(bookCollectionURL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, title })
            })

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }
            
            
        } catch (error) {
            alert(error.message); return;
        } finally {
            loadAllBooks();
        }
    });

    document.getElementById('loadBooks').addEventListener('click', loadAllBooks);

    async function loadAllBooks() {
        try {
            const response = await fetch(bookCollectionURL);

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            const bookData = await response.json();
            bookHolderTable.innerHTML = '';

            for (let [bookID, bookContent] of Object.entries(bookData)) {
                addBookCard(bookContent.author, bookContent.title, bookID);
            }
        } catch (error) {
            alert(error.message); return;
        }

    }

    function addBookCard(author, title, bookID) {

        const newElem = e('tr', [],
            e('td', [['textContent', title]]),
            e('td', [['textContent', author]]),
        );

        const buttonHolder = e('td', []);

        // edit button
        const editBtn = e('button', [['textContent', 'Edit']]);
        addEditBookListener(editBtn, bookID);

        // delete button
        const deleteBtn = e('button', [['textContent', 'Delete']]);
        deleteBtn.addEventListener('click', () => {
            deleteBook(bookID);
        })

        buttonHolder.appendChild(editBtn);
        buttonHolder.appendChild(deleteBtn);

        newElem.appendChild(buttonHolder);

        bookHolderTable.appendChild(newElem);
    }

    async function deleteBook(id) {
        try {
            const response = await fetch(bookCollectionURL + id, {
                method: 'delete'
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }
        } catch (error) {
            alert(error.message); return;
        }

        loadAllBooks();
    }

    function changeForms() {
        addBookForm.style.display = (addBookForm.style.display == 'none') ? 'block' : 'none';
        editBookForm.style.display = (editBookForm.style.display == 'none') ? 'block' : 'none';
    }

    function addEditBookListener(btn, id) {
        btn.addEventListener('click', () => {
            changeForms();
            editBookForm.addEventListener('submit', async event => {
                event.preventDefault();
                const formData = new FormData(editBookForm);
                let { author, title } = getDataFromForm(formData);
    
                try {
                    if (!author || !title) {
                        throw new Error('All fields must be filled!');
                    }
    
                    const response = await fetch(bookCollectionURL + id, {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ author, title })
                    })
    
                    if (!response.ok) {
                        throw new Error(`${response.status} error has occured!`);
                    }
    
                } catch (error) {
                    alert(error.message); return;
                } finally {
                    changeForms();
                    loadAllBooks();
                }
            });
        });
    }
}

addEvents();

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