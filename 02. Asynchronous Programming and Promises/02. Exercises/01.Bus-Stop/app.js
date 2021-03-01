async function getInfo() {
    const stopNameDiv = document.getElementById('stopName');
    const busStopUl = document.getElementById('buses');
    const stopIdInput = document.getElementById('stopId');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${Number(stopIdInput.value)}`;

    stopNameDiv.innerHTML = '';
    busStopUl.innerHTML = '';
    stopIdInput.value = '';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error occured!');
        }
        
        const data = await response.json();
    
        stopNameDiv.textContent = data.name;
        console.log(Object.entries(data.buses))
        Object.entries(data.buses).forEach(([id, time]) => {
            busStopUl.appendChild(
                e('li', [['textContent', `Bus ${id} arribes in ${time} minutes`]])
            );
        });  // creating new li elem for each bus

    } catch (error) {
        stopNameDiv.textContent = 'Error';
    }    
}



function e(type, attributes) {
    
    // function for creating custom DOM elements

    const newElem = document.createElement(type);

    for (let [name, value] of attributes) {
        newElem[name] = value;
    }

    return newElem;
}
