function createFurnitureCard(name, price, factor, img, disableCheckboxes) {

    if (!img) {
        img = `https://www.tibs.org.tw/images/default.jpg`;
    }

    const newCard = e('tr', [], 
        e('td', [], 
            e('img', [['src', img]])
        ),
        e('td', [],
            e('p', [['textContent', name]])
        ),
        e('td', [],
            e('p', [['textContent', price]])
        ),
        e('td', [],
            e('p', [['textContent', factor]])
        ),
        e('td', [],
            e('input', [['type', 'checkbox'], ['disabled', disableCheckboxes]])
        ),
    );

    return newCard;
}

async function loadFurnitureElements(isLogged) {
    
    const furnitureTable = document.querySelector('.table tbody');
    furnitureTable.innerHTML = '';
    const furnitureURL = 'http://localhost:3030/data/furniture';

    try {
        const response = await fetch(furnitureURL);

        if (!response.ok) {
            if (response.status == '404') {
                furnitureTable.innerHTML = 'No furniture added yet.'; return;
            } 
            throw new Error(`${response.status} error has occured!`);
        }

        const disableCheckboxes = (!isLogged) ? true : false;

        const data = await response.json();    

        for (const content of data) {
            furnitureTable.appendChild(
                createFurnitureCard(content.name, content.price, content.factor, content.img, disableCheckboxes)
            );
        }

    } catch (error) {
        alert(error.message); return;
    }
}

// loadFurnitureElements();

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
