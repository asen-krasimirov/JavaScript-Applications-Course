

function logoutSolution() {

    document.getElementById('logoutBtn').addEventListener('click', event => {
        sessionStorage.clear();
        window.location.href = "http://localhost:3000/home.html";
    });
}

function createSoluction() {
    let createURL = 'http://localhost:3030/data/furniture';

    const createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(createForm);
        let { name, price, factor, img } = getDataFromForm(formData);

        try {

            // input data validation
            if (!name || !price || !factor) {
                throw new Error('All fields must be filled!');
            } else if (String(Number(name)) !== 'NaN') {
                throw new Error('The name must be string!');
            } else if (String(Number(price)) === 'NaN') {
                throw new Error('The price must be an integer!');
            } else if (String(Number(factor)) === 'NaN') {
                throw new Error('The factor must be number!');
            }

            if (!sessionStorage.authToken) {
                throw new Error('Unotorized access!');
            }
            const response = await fetch(createURL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ name, price, factor, img })
            });

            if (!response.ok) {
                throw new Error(`${response.status} has occured!`);
            }

            loadFurnitureElements(true);

        } catch (error) {
            alert(error.message); return;
        }
    });
}

function buyFurniture() {

    let buyURL = 'http://localhost:3030/data/orders';

    document.getElementById('buyButton').addEventListener('click', async event => {
        const selectedElements = Array.from(document.querySelectorAll('input[type="checkbox"]'))
            .filter(elem => elem.checked)
            .map(elem => elem.parentNode.parentNode)
            .map(elem => {
                let [name, price, _] = Array.from(elem.querySelectorAll('td p'));
                name = name.textContent;
                price = Number(price.textContent);
                return { name, price };
            });

        try {

            if (!sessionStorage.authToken) {
                throw new Error('You have to login first!');
            }

            const response = await fetch(buyURL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.authToken
                },
                body: JSON.stringify({ 'orderedFurniture': selectedElements }),
            });

            if (!response.ok) {
                throw new Error(`${response.status} error has occured!`);
            }

            // getting the the user's id for displaying his orders
            sessionStorage.ownerId = (await response.json())._ownerId;

            // uncheck elements
            Array.from(document.querySelectorAll('input[type="checkbox"]'))
                .map(elem => elem.checked = false);

        } catch (error) {
            alert(error.message); return;
        }
    });
}

function displayOrders() {

    let orderedFurnitureURL = 'http://localhost:3030/data/orders';
    const [nameHolder, priceHolder] = Array.from(document.querySelectorAll('.orders p span'))

    document.querySelector('.orders button').addEventListener('click', async evnet => {
        nameHolder.textContent = '';
        priceHolder.textContent = '';

        try {

            if (!sessionStorage.authToken) {
                throw new Error('You have to login first!');
            }

            const response = await fetch(orderedFurnitureURL, {
                method: 'get',
                headers: { 'X-Authorization': sessionStorage.authToken }
            });

            if (!response.ok) {
                if (response.status == '404') {
                    throw new Error(`You have not made any orders yet.`);
                }
                throw new Error(`${response.status} error has occured!`);
            }

            const furnitureList = [];
            let totalSum = 0;

            // filtering all ownerIds because the url don't work (?where=_ownerId%3D);
            let ordersData = await response.json()
            ordersData = ordersData.filter(elem => elem._ownerId == sessionStorage.ownerId);

            for (const content of ordersData) {
                const orderedFurniture = content.orderedFurniture;
                for (let itemContent of orderedFurniture) {
                    furnitureList.push(itemContent.name);
                    totalSum += itemContent.price;
                }
            }

            nameHolder.textContent = furnitureList.join(', ');
            priceHolder.textContent = `${totalSum} $`;

        } catch (error) {
            alert(error.message); return;
        }
    });
}

logoutSolution();
createSoluction();
loadFurnitureElements(true);
buyFurniture();
displayOrders();

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
