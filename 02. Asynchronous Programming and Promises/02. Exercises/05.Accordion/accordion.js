

async function solve() {
    const articleHolder = document.querySelector('body section');

    try {
        let url = `http://localhost:3030/jsonstore/advanced/articles/list`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error occured!');
        }
        const articleDatabase = await response.json();

        for (let articleData of articleDatabase) {
            let articleName = articleData.title;
            let articleId = articleData._id;
            const newAccordionElem = createAccordionElem(articleName, articleId);
            articleHolder.appendChild(newAccordionElem);
        }

    } catch (error) {
        alert(error.message);
    }

    function createAccordionElem(name, id) {
        const newElem = e('div', [['className', 'accordion']],
            e('div', [['className', 'head'], ['textContent', name]],
                e('span', [['className', 'button'], ['textContent', 'More']]),
            ),
        );

        const hiddenInfo = e('div', [['className', 'extra']],
            e('p', [])
        );
        hiddenInfo.style.display = 'none';
        newElem.appendChild(hiddenInfo);

        const hiddenContent = hiddenInfo.querySelector('p');
        const infoButton = newElem.querySelector('span');

        infoButton.addEventListener('click', showArticle);

        async function showArticle() {
            // make a request only if the content has not been loaded yet
            if (hiddenContent.textContent == '') {
                let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
                const response = await fetch(url);
                const data = await response.json();
                hiddenContent.textContent = data.content;
            }

            hiddenInfo.style.display = (hiddenInfo.style.display === 'block') ? 'none' : 'block';
            infoButton.textContent = (hiddenInfo.style.display === 'block') ? 'Less' : 'More';
        }

        return newElem;
    }
}

solve()


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
