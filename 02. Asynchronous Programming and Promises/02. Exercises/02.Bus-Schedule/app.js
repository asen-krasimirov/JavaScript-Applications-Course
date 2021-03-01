function solve() {
    const informationDiv = document.querySelector('#info span');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');

    const buttonController = {
        departPress() {
            departButton.disabled = true;
            arriveButton.disabled = false;
        },
        arrivePress() {
            departButton.disabled = false;
            arriveButton.disabled = true;
        },
        errorPress() {
            departButton.disabled = true;
            arriveButton.disabled = true;
        }

    }

    let currentStop = 'Depot';
    let nextStop = 'depot';

    async function depart() {
        buttonController['departPress']();

        try {
            let url = `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`;
            let response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Error occured!');
            }

            let data = await response.json();

            currentStop = data.name;
            nextStop = data.next;
            informationDiv.textContent = `Next stop ${currentStop}`;
        } catch (error) {
            // if an error occurs both buttons get disabled
            buttonController['errorPress']();
            informationDiv.textContent = 'Error';
        }
    }

    async function arrive() {
        buttonController['arrivePress']();
        informationDiv.textContent = `Arriving at ${currentStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();